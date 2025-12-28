"use client";

import { useState, useEffect } from "react";
import { destinations } from "@/lib/data";
import { TravelPreferences } from "@/lib/types";

interface ItineraryFormProps {
    onSubmit: (preferences: TravelPreferences) => void;
    loading: boolean;
    error: string;
}

export default function ItineraryForm({ onSubmit, loading, error }: ItineraryFormProps) {
    const [formData, setFormData] = useState({
        destination: "",
        days: 0,
        budget: 50000,
        travelers: 2,
        startDate: "",
        endDate: "",
        preferences: [] as string[],
    });



    const preferenceOptions = [
        { value: "adventure", label: "Adventure", icon: "🏔️" },
        { value: "relaxation", label: "Relaxation", icon: "🧘" },
        { value: "culture", label: "Culture", icon: "🏛️" },
        { value: "food", label: "Food", icon: "🍽️" },
        { value: "nature", label: "Nature", icon: "🌿" },
        { value: "nightlife", label: "Nightlife", icon: "🎉" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Additional validation for dates
        if (!formData.startDate || !formData.days) {
            alert("Please select a start date and a package.");
            return;
        }





        onSubmit({
            destination: formData.destination,
            days: formData.days,
            budget: formData.budget,
            travelers: formData.travelers,
            travelDates: {
                start: formData.startDate,
                end: formData.endDate,
            },
            preferences: formData.preferences,
        });
    };

    const togglePreference = (pref: string) => {
        setFormData((prev) => ({
            ...prev,
            preferences: prev.preferences.includes(pref)
                ? prev.preferences.filter((p) => p !== pref)
                : [...prev.preferences, pref],
        }));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
            >
                {/* Destination */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Choose Your Destination
                    </label>
                    <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-gray-800 font-medium"
                        required
                    >
                        <option value="">Select a destination...</option>
                        {destinations.map((dest) => (
                            <option key={dest.id} value={dest.id}>
                                {dest.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Travelers & Calculated Duration */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Number of Travelers
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={formData.travelers}
                            onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-gray-800 font-medium"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Trip Duration
                        </label>
                        <div className="w-full px-6 py-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed">
                            {formData.startDate && formData.endDate
                                ? `${formData.days} Days (${new Date(formData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(formData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`
                                : "Select start date & package"}
                        </div>
                    </div>
                </div>

                {/* Travel Dates & Package - REQUIRED */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => {
                                const newStart = e.target.value;
                                setFormData(prev => {
                                    // Recalculate end date if a package is already selected
                                    let newEnd = prev.endDate;
                                    if (prev.days > 0 && newStart) {
                                        const start = new Date(newStart);
                                        const end = new Date(start);
                                        end.setDate(start.getDate() + (prev.days - 1));
                                        newEnd = end.toISOString().split('T')[0];
                                    }
                                    return { ...prev, startDate: newStart, endDate: newEnd };
                                });
                            }}
                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-gray-800 font-medium"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Select Package <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.days || ""}
                            onChange={(e) => {
                                const days = parseInt(e.target.value);
                                setFormData(prev => {
                                    // Calculate new end date based on start date + days
                                    let newEnd = "";
                                    if (prev.startDate && days > 0) {
                                        const start = new Date(prev.startDate);
                                        const end = new Date(start);
                                        end.setDate(start.getDate() + (days - 1));
                                        newEnd = end.toISOString().split('T')[0];
                                    }
                                    return { ...prev, days: days, endDate: newEnd };
                                });
                            }}
                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-gray-800 font-medium"
                            required
                        >
                            <option value="">Choose a duration...</option>
                            <option value="7">1 Week (7 Days)</option>
                            <option value="14">2 Weeks (14 Days)</option>
                        </select>
                    </div>
                </div>

                {/* Budget */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Total Budget: ₹{formData.budget.toLocaleString()}
                    </label>
                    <input
                        type="range"
                        min="10000"
                        max="300000"
                        step="5000"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                        className="w-full h-3 bg-gradient-to-r from-orange-200 to-orange-500 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>₹10,000</span>
                        <span>₹3,00,000</span>
                    </div>
                </div>

                {/* Preferences */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Travel Preferences (Optional)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {preferenceOptions.map((pref) => (
                            <button
                                key={pref.value}
                                type="button"
                                onClick={() => togglePreference(pref.value)}
                                className={`px-6 py-4 rounded-xl border-2 transition-all transform hover:scale-105 ${formData.preferences.includes(pref.value)
                                    ? "bg-orange-500 border-orange-600 text-white shadow-lg"
                                    : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
                                    }`}
                            >
                                <div className="text-2xl mb-1">{pref.icon}</div>
                                <div className="text-sm font-semibold">{pref.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Generating Plan...
                        </span>
                    ) : (
                        "✨ Generate My Perfect Journey"
                    )}
                </button>
            </form>
        </div>
    );
}
