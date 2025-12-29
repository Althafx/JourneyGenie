import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import {
    getHotelsByDestination,
    getActivitiesByDestination,
    getRestaurantsByDestination,
    getDestinationById,
} from "@/lib/data";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { destination, days, budget, preferences, travelers } = body;

        // Validation
        if (!destination || !days || !budget) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Get Switrus data for the destination
        const destinationData = getDestinationById(destination);
        const hotels = getHotelsByDestination(destination);
        const activities = getActivitiesByDestination(destination);
        const restaurants = getRestaurantsByDestination(destination);

        if (!destinationData) {
            return NextResponse.json(
                { error: "Invalid destination" },
                { status: 400 }
            );
        }

        // Filter activities by preferences if provided
        const relevantActivities = preferences.length > 0
            ? activities.filter((activity) => preferences.includes(activity.category))
            : activities;

        // Create AI prompt with JourneyGenie data
        const prompt = `You are JourneyGenie, an expert international travel planner. Generate a detailed ${days}-day itinerary for ${destinationData.name} for ${travelers} traveler(s) in ${body.travelMonth}.
        
        SELECTED PACKAGE TIER: ${body.packageTier} (Budget Limit: ₹${budget.toLocaleString()})
        ${body.includeFlights ? `IMPORTANT: The user wants to fly from ${body.departureCity}. 
        USE THIS EXACT ESTIMATED FLIGHT COST: ₹${body.estimatedFlightCost} per person.
        Add this to the total itinerary cost. The package budget of ₹${budget} is for LAND arrangements only.` : "Flights are NOT included."}

IMPORTANT: Use ONLY the following curated partner options matching the ${body.packageTier} tier:

HOTELS (Prioritize ${body.packageTier === "Luxury" ? "Luxury/5-Star" : body.packageTier === "Standard" ? "Mid-range/4-Star" : "Budget/Hostels"}):
${hotels.map(h => `- ${h.name} (₹${h.pricePerNight}/night, ${h.type}, Rating: ${h.rating}/5, Amenities: ${h.amenities.join(", ")})`).join("\n")}

ACTIVITIES (Select based on preferences):
${relevantActivities.map(a => `- ${a.name} (₹${a.price}, ${a.duration}, Best time: ${a.bestTimeOfDay}) - ${a.description}`).join("\n")}

RESTAURANTS:
${restaurants.map(r => `- ${r.name} (${r.cuisine}, ${r.priceRange}, ${r.specialty}, Best for: ${r.mealType})`).join("\n")}

User Preferences: ${preferences.join(", ") || "No specific preferences"}

Create a day-by-day itinerary in JSON format with the following structure:
{
  "destination": "${destinationData.name}",
  "days": ${days},
  "travelers": ${travelers},
  "travelMonth": "${body.travelMonth}",
  ${body.includeFlights ? `"flightDetails": { "departureCity": "${body.departureCity}", "estimatedCostPerPerson": ${body.estimatedFlightCost}, "totalFlightCost": ${body.estimatedFlightCost! * travelers} },` : ""}
  "itinerary": [
    {
      "day": 1,
      "date": "Day 1",
      "morning": { "activity": "...", "time": "...", "cost": ... },
      "afternoon": { "activity": "...", "time": "...", "cost": ... },
      "evening": { "activity": "...", "time": "...", "cost": ... },
      "hotel": "...",
      "hotelCost": ...,
      "meals": { 
        "breakfast": { "item": "...", "cost": ... }, 
        "lunch": { "item": "...", "cost": ... }, 
        "dinner": { "item": "...", "cost": ... } 
      },
      "totalCost": ...
    }
  ],
  "tips": ["..."]
}

CRITICAL RULES:
1. Use curated partner options where possible, BUT YOU MUST GENERATE other highly-rated, real-world authentic options matching the ${body.packageTier} tier to fill the itinerary.
2. Ensure total budget stays within ₹${budget}.
3. **HOTEL LOGIC**: If the itinerary moves to a new city, YOU MUST SWITCH to a hotel in that city. Use real hotel names.
4. **ZERO REPETITION**: NEVER repeat a restaurant name. Suggest a DIFFERENT authentic spot for every single meal.
5. **AUTHENTICITY**: For 'item', write the specific dish AND restaurant (e.g., "Masala Dosa at Saravana Bhavan").
6. **DISTINCT ACTIVITIES**: 'Morning', 'Afternoon', and 'Evening' activities MUST be non-meal experiences (sightseeing, adventure, culture). DO NOT duplicate the meal as the activity.
7. Provide 5 practical travel tips specific to ${destinationData.name} in ${body.travelMonth}
8. Return ONLY valid JSON, no additional text`;

        // Call Groq API
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a professional travel planner for Switrus Holidays. Always return valid JSON responses for itinerary requests.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 4000,
        });

        const responseText = completion.choices[0]?.message?.content || "";

        // Extract JSON from response (in case AI adds extra text)
        let itinerary;
        try {
            // Try to find JSON in the response
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                itinerary = JSON.parse(jsonMatch[0]);
            } else {
                itinerary = JSON.parse(responseText);
            }
        } catch (parseError) {
            console.error("Failed to parse AI response:", parseError);
            return NextResponse.json(
                { error: "Failed to generate itinerary. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json(itinerary);
    } catch (error) {
        console.error("Error generating itinerary:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
