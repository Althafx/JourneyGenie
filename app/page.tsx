"use client";

import { useState } from "react";
import { destinations } from "@/lib/data";
import { TravelPreferences, Itinerary } from "@/lib/types";
import ItineraryForm from "@/components/ItineraryForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import Hero from "@/components/Hero";

export default function Home() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateItinerary = async (preferences: TravelPreferences) => {
    setLoading(true);
    setError("");
    setItinerary(null);

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      const data = await response.json();
      setItinerary(data);
    } catch (err) {
      setError("Failed to generate itinerary. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setItinerary(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {!itinerary ? (
          <div className="space-y-8">
            {/* Introduction */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Plan Your Dream Vacation
              </h2>
              <p className="text-lg text-gray-600">
                Our AI-powered planner uses JourneyGenie&apos;s curated partner network
                to create the perfect itinerary tailored to your preferences and budget.
              </p>
            </div>

            {/* Form */}
            <ItineraryForm
              onSubmit={handleGenerateItinerary}
              loading={loading}
              error={error}
            />

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      className="w-8 h-8 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                </div>
                <p className="mt-6 text-xl font-semibold text-gray-700">
                  Crafting your perfect itinerary...
                </p>
                <p className="mt-2 text-gray-500">
                  Our AI is selecting the best hotels, activities, and experiences for you
                </p>
              </div>
            )}
          </div>
        ) : (
          <ItineraryDisplay itinerary={itinerary} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-900 to-amber-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">JourneyGenie</h3>
              <p className="text-orange-100">
                Your dream trip, planned in seconds
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-orange-100">Email: hello@journeygenie.ai</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-orange-700 text-center text-orange-200">
            <p>© 2024 JourneyGenie. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Powered by AI • Created with Next.js & Groq
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
