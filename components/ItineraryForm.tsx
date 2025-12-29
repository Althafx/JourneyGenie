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
        budget: 100000,
        travelers: 2,
        travelMonth: "",
        preferences: [] as string[],
        includeFlights: false,
        departureCity: "",
        packageTier: "",
        estimatedFlightCost: 0,
    });

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const departureCities = [
        "Mumbai", "Ahmedabad", "Kochi", "Kolkata", "Hyderabad", "Delhi", "Chennai", "Bangalore"
    ];

    const preferenceOptions = [
        { value: "adventure", label: "Adventure", icon: "🏔️" },
        { value: "relaxation", label: "Relaxation", icon: "🧘" },
        { value: "culture", label: "Culture", icon: "🏛️" },
        { value: "food", label: "Food", icon: "🍽️" },
        { value: "nature", label: "Nature", icon: "🌿" },
        { value: "nightlife", label: "Nightlife", icon: "🎉" },
    ];

    const [notification, setNotification] = useState<{ message: string; type: "error" | "success" } | null>(null);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const showNotification = (message: string, type: "error" | "success" = "error") => {
        setNotification({ message, type });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.travelMonth || !formData.days || !formData.destination) {
            showNotification("Please select a package, month, and duration.");
            return;
        }

        if (formData.includeFlights && !formData.departureCity) {
            showNotification("Please select a departure city.");
            return;
        }

        if (!formData.packageTier) {
            showNotification("Please select a package tier (Economy, Standard, or Luxury).");
            return;
        }

        let estimatedFlightCost = 0;
        if (formData.includeFlights && formData.departureCity) {
            const baseRates: Record<string, number> = {
                "europe_pkg": 65000, "paris_pkg": 65000, "swiss_pkg": 70000, "greece_pkg": 60000,
                "turkey_pkg": 50000, "dubai_pkg": 25000,
                "thailand_pkg": 30000, "bali_pkg": 40000, "singapore_pkg": 35000, "maldives_pkg": 25000
            };
            const cityMultipliers: Record<string, number> = {
                "Mumbai": 1.0, "Delhi": 1.0, "Bangalore": 1.1, "Chennai": 1.1,
                "Hyderabad": 1.15, "Kolkata": 1.2, "Ahmedabad": 1.15, "Kochi": 1.2
            };
            const base = baseRates[formData.destination] || 50000;
            const multiplier = cityMultipliers[formData.departureCity] || 1.1;
            const tierMultiplier = formData.packageTier === "Luxury" ? 1.5 : 1.0;
            estimatedFlightCost = Math.round(base * multiplier * tierMultiplier);
        }

        onSubmit({
            destination: formData.destination,
            days: formData.days,
            budget: formData.budget,
            travelers: formData.travelers,
            travelMonth: formData.travelMonth,
            preferences: formData.preferences,
            includeFlights: formData.includeFlights,
            departureCity: formData.departureCity,
            packageTier: formData.packageTier as "Economy" | "Standard" | "Luxury",
            estimatedFlightCost: estimatedFlightCost,
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
        <div className="max-w-4xl mx-auto relative">
            {/* Custom Notification Toast */}
            {notification && (
                <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border animate-in fade-in slide-in-from-top-4 duration-300 ${notification.type === "error"
                    ? "bg-red-500/90 text-white border-red-400"
                    : "bg-green-500/90 text-white border-green-400"
                    }`}>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{notification.type === "error" ? "⚠️" : "✅"}</span>
                        <p className="font-semibold">{notification.message}</p>
                        <button
                            onClick={() => setNotification(null)}
                            className="ml-4 opacity-70 hover:opacity-100 transition-opacity"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
            >
                {/* Package Selection */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Your Package
                    </label>
                    <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-gray-800 font-medium"
                        required
                    >
                        <option value="">Choose a destination package...</option>
                        {destinations.map((dest) => (
                            <option key={dest.id} value={dest.id}>
                                {dest.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Duration, Month, Travelers */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Duration
                        </label>
                        <select
                            value={formData.days || ""}
                            onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value), packageTier: "", budget: 0 })}
                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-gray-800 font-medium"
                            required
                        >
                            <option value="">Select duration...</option>
                            <option value="7">1 Week (7 Days)</option>
                            <option value="14">2 Weeks (14 Days)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Travel Month
                        </label>
                        <select
                            value={formData.travelMonth}
                            onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-gray-800 font-medium"
                            required
                        >
                            <option value="">Select month...</option>
                            {months.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Travelers
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
                </div>

                {/* Flights & Departure */}
                <div className="mb-8 p-6 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="flights"
                            checked={formData.includeFlights}
                            onChange={(e) => setFormData({ ...formData, includeFlights: e.target.checked })}
                            className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 cursor-pointer"
                        />
                        <label htmlFor="flights" className="ml-3 font-semibold text-gray-800 cursor-pointer select-none">
                            Include Flights ✈️
                        </label>
                    </div>

                    {formData.includeFlights && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Departure City
                            </label>
                            <select
                                value={formData.departureCity}
                                onChange={(e) => {
                                    const city = e.target.value;

                                    // Recalculate if we have a package selected
                                    let newBudget = formData.budget;
                                    let newFlightCost = 0;

                                    if (formData.packageTier && formData.destination) {
                                        const dest = destinations.find(d => d.id === formData.destination);
                                        const pkg = dest?.packages.find(p => p.name === formData.packageTier);

                                        if (pkg) {
                                            // Re-run calc logic (duplicated temporarily for safety)
                                            const baseRates: Record<string, number> = {
                                                "europe_pkg": 65000, "paris_pkg": 65000, "swiss_pkg": 70000, "greece_pkg": 60000,
                                                "turkey_pkg": 50000, "dubai_pkg": 25000,
                                                "thailand_pkg": 30000, "bali_pkg": 40000, "singapore_pkg": 35000, "maldives_pkg": 25000
                                            };
                                            const cityMultipliers: Record<string, number> = {
                                                "Mumbai": 1.0, "Delhi": 1.0, "Bangalore": 1.1, "Chennai": 1.1,
                                                "Hyderabad": 1.15, "Kolkata": 1.2, "Ahmedabad": 1.15, "Kochi": 1.2
                                            };

                                            const base = baseRates[formData.destination] || 50000;
                                            const multiplier = cityMultipliers[city] || 1.1;
                                            const tierMultiplier = formData.packageTier === "Luxury" ? 1.5 : 1.0;

                                            newFlightCost = Math.round(base * multiplier * tierMultiplier);

                                            const isTwoWeeks = formData.days === 14;
                                            const packagePrice = isTwoWeeks ? pkg.price * 1.8 : pkg.price;

                                            newBudget = packagePrice + newFlightCost;
                                        }
                                    }

                                    setFormData(prev => ({
                                        ...prev,
                                        departureCity: city,
                                        budget: newBudget,
                                        estimatedFlightCost: newFlightCost
                                    }));
                                }}
                                className="w-full px-6 py-4 bg-white border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-gray-800 font-medium mb-4"
                                required
                            >
                                <option value="">Select departure city...</option>
                                {departureCities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>

                            {formData.destination && formData.departureCity && (
                                <div className="bg-orange-100 rounded-xl p-4 flex items-center justify-between text-orange-800">
                                    <span className="font-medium">Estimated Round-Trip Flight Cost:</span>
                                    <span className="font-bold text-lg">
                                        ₹{(() => {
                                            // Simple flight cost estimator
                                            const baseRates: Record<string, number> = {
                                                "europe_pkg": 65000, "paris_pkg": 65000, "swiss_pkg": 70000, "greece_pkg": 60000,
                                                "turkey_pkg": 50000, "dubai_pkg": 25000,
                                                "thailand_pkg": 30000, "bali_pkg": 40000, "singapore_pkg": 35000, "maldives_pkg": 25000
                                            };

                                            const cityMultipliers: Record<string, number> = {
                                                "Mumbai": 1.0, "Delhi": 1.0, "Bangalore": 1.1, "Chennai": 1.1,
                                                "Hyderabad": 1.15, "Kolkata": 1.2, "Ahmedabad": 1.15, "Kochi": 1.2
                                            };

                                            const base = baseRates[formData.destination] || 50000;
                                            const multiplier = cityMultipliers[formData.departureCity] || 1.1;

                                            // Logic: Standard rate is for Economy. Luxury usually flies Business/Better airline (+50%)
                                            const tierMultiplier = formData.packageTier === "Luxury" ? 1.5 : 1.0;

                                            return Math.round(base * multiplier * tierMultiplier).toLocaleString();
                                        })()}
                                        <span className="text-xs font-normal ml-1">(per person)</span>
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Package Tier Selection */}
                {formData.destination && (
                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                            Select Your Experience Tier {formData.includeFlights && formData.departureCity && <span className="text-orange-600 text-xs ml-2">(Includes estimated flight costs)</span>}
                        </label>
                        <div className="grid md:grid-cols-3 gap-4">
                            {destinations.find(d => d.id === formData.destination)?.packages.map((pkg) => {
                                // 1. Calculate Package Price based on Duration
                                const isTwoWeeks = formData.days === 14;
                                const packagePrice = isTwoWeeks ? pkg.price * 1.8 : pkg.price;

                                // 2. Calculate Flight Cost if applicable
                                let flightCost = 0;
                                if (formData.includeFlights && formData.departureCity) {
                                    const baseRates: Record<string, number> = {
                                        "europe_pkg": 65000, "paris_pkg": 65000, "swiss_pkg": 70000, "greece_pkg": 60000,
                                        "turkey_pkg": 50000, "dubai_pkg": 25000,
                                        "thailand_pkg": 30000, "bali_pkg": 40000, "singapore_pkg": 35000, "maldives_pkg": 25000
                                    };
                                    const cityMultipliers: Record<string, number> = {
                                        "Mumbai": 1.0, "Delhi": 1.0, "Bangalore": 1.1, "Chennai": 1.1,
                                        "Hyderabad": 1.15, "Kolkata": 1.2, "Ahmedabad": 1.15, "Kochi": 1.2
                                    };

                                    const base = baseRates[formData.destination] || 50000;
                                    const multiplier = cityMultipliers[formData.departureCity] || 1.1;
                                    // Use the CURRENT package's tier for this specific card's calculation
                                    const tierMultiplier = pkg.name === "Luxury" ? 1.5 : 1.0;

                                    flightCost = Math.round(base * multiplier * tierMultiplier);
                                }

                                const totalPrice = packagePrice + flightCost;

                                return (
                                    <button
                                        key={pkg.name}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, budget: totalPrice, packageTier: pkg.name, estimatedFlightCost: flightCost })}
                                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${formData.packageTier === pkg.name
                                            ? "bg-orange-50 border-orange-500 shadow-md ring-2 ring-orange-200"
                                            : "bg-white border-gray-200 hover:border-orange-300"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${pkg.name === "Luxury" ? "bg-purple-100 text-purple-700" :
                                                pkg.name === "Standard" ? "bg-blue-100 text-blue-700" :
                                                    "bg-green-100 text-green-700"
                                                }`}>
                                                {pkg.name}
                                            </span>
                                            <div className="text-right">
                                                {/* Price hidden as per user request to imply dynamic pricing */}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            {pkg.inclusions.map((inc, i) => (
                                                <div key={i} className="text-xs text-gray-600 flex items-center">
                                                    <span className="mr-1 text-orange-500">✓</span> {inc}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-400 mt-3 italic">{pkg.description}</p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}

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
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating Plan...
                        </span>
                    ) : (
                        "✨ Generate My International Journey"
                    )}
                </button>
            </form>
        </div>
    );
}
