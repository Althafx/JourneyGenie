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

        // Create AI prompt with Switrus data
        const prompt = `You are a travel planning AI for Switrus Holidays, a premium travel agency. Generate a detailed ${days}-day itinerary for ${destinationData.name} for ${travelers} traveler(s) with a total budget of ₹${budget.toLocaleString()}.

IMPORTANT: Use ONLY the following Switrus partner options:

HOTELS (Select based on budget):
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
  "totalBudget": <calculated total>,
  "itinerary": [
    {
      "day": 1,
      "date": "Day 1",
      "morning": {
        "activity": "<activity name from the list above>",
        "time": "<time>",
        "cost": <cost>
      },
      "afternoon": {
        "activity": "<activity name from the list above>",
        "time": "<time>",
        "cost": <cost>
      },
      "evening": {
        "activity": "<activity name from the list above>",
        "time": "<time>",
        "cost": <cost>
      },
      "hotel": "<hotel name from the list above>",
      "meals": {
        "breakfast": "<restaurant name>",
        "lunch": "<restaurant name>",
        "dinner": "<restaurant name>"
      },
      "totalCost": <sum of all costs for the day>
    }
  ],
  "tips": [
    "<travel tip 1>",
    "<travel tip 2>",
    "<travel tip 3>",
    "<travel tip 4>",
    "<travel tip 5>"
  ]
}

CRITICAL RULES:
1. Use ONLY hotels, activities, and restaurants from the lists provided above
2. Ensure total budget stays within ₹${budget} (±10% is acceptable)
3. Select hotel based on budget: budget hotels for low budgets, luxury for high budgets
4. Distribute activities smartly: morning activities best done in morning, etc.
5. Don't repeat the same activity
6. Include realistic costs for each activity
7. Make sure meals match the restaurant's mealType
8. Provide 5 practical travel tips specific to ${destinationData.name}
9. Return ONLY valid JSON, no additional text

Generate the complete itinerary now:`;

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
