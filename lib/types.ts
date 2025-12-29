// TypeScript interfaces for our travel data models

export interface PackageTier {
  name: "Economy" | "Standard" | "Luxury";
  price: number;
  description: string;
  inclusions: string[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  popularMonths: string[];
  averageBudget: {
    min: number;
    max: number;
  };
  packages: PackageTier[];
}

export interface Hotel {
  id: string;
  name: string;
  destination: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  type: "budget" | "mid-range" | "luxury";
  image: string;
}

export interface Activity {
  id: string;
  name: string;
  destination: string;
  price: number;
  duration: string;
  category: "adventure" | "relaxation" | "culture" | "food" | "nature" | "nightlife";
  description: string;
  bestTimeOfDay: "morning" | "afternoon" | "evening" | "any";
}

export interface Restaurant {
  id: string;
  name: string;
  destination: string;
  cuisine: string;
  priceRange: "₹" | "₹₹" | "₹₹₹";
  specialty: string;
  mealType: "breakfast" | "lunch" | "dinner" | "any";
}

export interface TravelPreferences {
  destination: string;
  days: number;
  budget: number;
  travelMonth: string;
  travelers: number;
  preferences: string[];
  includeFlights: boolean;
  departureCity?: string;
  packageTier: "Economy" | "Standard" | "Luxury";
  estimatedFlightCost?: number;
}

export interface ItineraryDay {
  day: number;
  date: string;
  morning: {
    activity: string;
    time: string;
    cost: number;
  };
  afternoon: {
    activity: string;
    time: string;
    cost: number;
  };
  evening: {
    activity: string;
    time: string;
    cost: number;
  };
  hotel: string;
  hotelCost: number;
  meals: {
    breakfast?: { item: string; cost: number };
    lunch?: { item: string; cost: number };
    dinner?: { item: string; cost: number };
  };
  mealsCost: number;
  totalCost: number;
}

export interface Itinerary {
  destination: string;
  days: number;
  totalBudget: number;
  travelers: number;
  travelMonth?: string;
  flightDetails?: {
    departureCity: string;
    estimatedCostPerPerson: number;
    totalFlightCost: number;
  };
  itinerary: ItineraryDay[];
  tips: string[];
}
