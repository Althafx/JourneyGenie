"use client";

import { Itinerary } from "@/lib/types";

interface ItineraryDisplayProps {
    itinerary: Itinerary;
    onReset: () => void;
}

export default function ItineraryDisplay({
    itinerary,
    onReset,
}: ItineraryDisplayProps) {
    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">
                            Your JourneyGenie Itinerary
                        </h2>
                        <p className="text-xl text-gray-600">
                            {itinerary.destination} • {itinerary.days} Days
                        </p>
                    </div>
                    <button
                        onClick={onReset}
                        className="mt-4 md:mt-0 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                    >
                        ← Plan Another Trip
                    </button>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Your {itinerary.destination} Journey
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                    <span className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full text-orange-700 font-medium">
                        🗓️ {itinerary.travelMonth || "Flexible"}
                    </span>
                    <span className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full text-orange-700 font-medium">
                        ⏱️ {itinerary.days} Days
                    </span>
                    {itinerary.flightDetails && (
                        <span className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full text-orange-700 font-medium">
                            ✈️ Flights Included
                        </span>
                    )}
                </div>

                {/* Total Cost Card */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-6 text-white shadow-xl mb-8 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <p className="text-orange-100 mb-1">Estimated Trip Total</p>
                        <p className="text-4xl font-bold">
                            ₹{((itinerary.itinerary.reduce((acc, day) => acc +
                                (day.morning?.cost || 0) +
                                (day.afternoon?.cost || 0) +
                                (day.evening?.cost || 0) +
                                (day.hotelCost || 0) +
                                (day.meals?.breakfast?.cost || 0) +
                                (day.meals?.lunch?.cost || 0) +
                                (day.meals?.dinner?.cost || 0), 0) + (itinerary.flightDetails?.totalFlightCost || 0))).toLocaleString()}
                        </p>
                        {itinerary.flightDetails && (
                            <p className="text-sm text-orange-100 mt-1">
                                Includes round-trip flights from {itinerary.flightDetails.departureCity} (₹{itinerary.flightDetails.totalFlightCost.toLocaleString()})
                            </p>
                        )}
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                        <p className="text-orange-100 mb-1">Per Person</p>
                        <p className="text-2xl font-semibold">
                            ₹{Math.round(((itinerary.itinerary.reduce((acc, day) => acc +
                                (day.morning?.cost || 0) +
                                (day.afternoon?.cost || 0) +
                                (day.evening?.cost || 0) +
                                (day.hotelCost || 0) +
                                (day.meals?.breakfast?.cost || 0) +
                                (day.meals?.lunch?.cost || 0) +
                                (day.meals?.dinner?.cost || 0), 0) + (itinerary.flightDetails?.totalFlightCost || 0)) / (itinerary.travelers || 1))).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="space-y-6 mb-8">
                {itinerary.itinerary?.map((day, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all"
                    >
                        {/* Day Header */}
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full w-16 h-16 flex items-center justify-center mr-4 shadow-lg">
                                <span className="text-2xl font-bold">{day.day}</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">Day {day.day}</h3>
                                <p className="text-gray-500">{day.date}</p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="text-sm text-gray-500">Day Total</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    ₹{((day.morning?.cost || 0) +
                                        (day.afternoon?.cost || 0) +
                                        (day.evening?.cost || 0) +
                                        (day.hotelCost || 0) +
                                        (day.meals?.breakfast?.cost || 0) +
                                        (day.meals?.lunch?.cost || 0) +
                                        (day.meals?.dinner?.cost || 0)).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Activities Timeline */}
                        <div className="space-y-4 mb-6">
                            {/* Morning & Breakfast */}
                            <div className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <span className="text-xl">🌅</span>
                                    </div>
                                    <div className="w-1 h-full bg-gradient-to-b from-yellow-200 to-orange-200 mt-2"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-lg font-bold text-gray-800">Morning</h4>
                                            <span className="text-sm font-semibold text-orange-600">
                                                {day.morning?.time || "09:00 AM"}
                                            </span>
                                        </div>

                                        {/* Breakfast */}
                                        {day.meals?.breakfast && (
                                            <div className="mb-4 pb-4 border-b border-orange-200/50">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs font-bold uppercase text-orange-400 tracking-wider">Breakfast</span>
                                                        <p className="text-gray-800 font-medium">{day.meals.breakfast.item}</p>
                                                    </div>
                                                    <p className="text-orange-600 font-bold whitespace-nowrap ml-4">
                                                        ₹{day.meals.breakfast.cost?.toLocaleString() || "0"}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Activity */}
                                        <div>
                                            <span className="text-xs font-bold uppercase text-orange-400 tracking-wider">Activity</span>
                                            <div className="flex justify-between items-start">
                                                <p className="text-gray-700">{day.morning?.activity}</p>
                                                <p className="text-orange-600 font-semibold whitespace-nowrap ml-4">
                                                    ₹{day.morning?.cost?.toLocaleString() || "0"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Afternoon & Lunch */}
                            <div className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-xl">☀️</span>
                                    </div>
                                    <div className="w-1 h-full bg-gradient-to-b from-blue-200 to-indigo-200 mt-2"></div>
                                </div>
                                <div className="flex-1 pb-4">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-lg font-bold text-gray-800">Noon</h4>
                                            <span className="text-sm font-semibold text-blue-600">
                                                {day.afternoon?.time || "01:00 PM"}
                                            </span>
                                        </div>

                                        {/* Lunch */}
                                        {day.meals?.lunch && (
                                            <div className="mb-4 pb-4 border-b border-blue-200/50">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs font-bold uppercase text-blue-400 tracking-wider">Lunch</span>
                                                        <p className="text-gray-800 font-medium">{day.meals.lunch.item}</p>
                                                    </div>
                                                    <p className="text-blue-600 font-bold whitespace-nowrap ml-4">
                                                        ₹{day.meals.lunch.cost?.toLocaleString() || "0"}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Activity */}
                                        <div>
                                            <span className="text-xs font-bold uppercase text-blue-400 tracking-wider">Activity</span>
                                            <div className="flex justify-between items-start">
                                                <p className="text-gray-700">{day.afternoon?.activity}</p>
                                                <p className="text-blue-600 font-semibold whitespace-nowrap ml-4">
                                                    ₹{day.afternoon?.cost?.toLocaleString() || "0"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Evening & Dinner */}
                            <div className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-xl">🌆</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-lg font-bold text-gray-800">Evening</h4>
                                            <span className="text-sm font-semibold text-purple-600">
                                                {day.evening?.time || "07:00 PM"}
                                            </span>
                                        </div>

                                        {/* Dinner */}
                                        {day.meals?.dinner && (
                                            <div className="mb-4 pb-4 border-b border-purple-200/50">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs font-bold uppercase text-purple-400 tracking-wider">Dinner</span>
                                                        <p className="text-gray-800 font-medium">{day.meals.dinner.item}</p>
                                                    </div>
                                                    <p className="text-purple-600 font-bold whitespace-nowrap ml-4">
                                                        ₹{day.meals.dinner.cost?.toLocaleString() || "0"}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Activity */}
                                        <div>
                                            <span className="text-xs font-bold uppercase text-purple-400 tracking-wider">Activity</span>
                                            <div className="flex justify-between items-start">
                                                <p className="text-gray-700">{day.evening?.activity}</p>
                                                <p className="text-purple-600 font-semibold whitespace-nowrap ml-4">
                                                    ₹{day.evening?.cost?.toLocaleString() || "0"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hotel Only */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-orange-100 px-3 py-1 rounded-bl-xl text-orange-700 font-bold text-sm">
                                    ₹{day.hotelCost?.toLocaleString() || "Included"}
                                </div>
                                <p className="text-sm text-gray-500 mb-1">🏨 Hotel</p>
                                <p className="font-semibold text-gray-800 pr-12">{day.hotel}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Travel Tips */}
            {itinerary.tips && itinerary.tips.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-3xl shadow-xl p-8 border border-green-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="text-3xl mr-3">💡</span>
                        Travel Tips
                    </h3>
                    <ul className="space-y-3">
                        {itinerary.tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-green-600 mr-3 mt-1">✓</span>
                                <span className="text-gray-700">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Ready to Book Your Dream Vacation?
                    </h3>
                    <p className="text-gray-600">
                        Contact our travel experts to customize and book this JourneyGenie itinerary
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                        📞 Book Your Trip
                    </button>
                    <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border-2 border-gray-300 transition-all">
                        📤 Share Itinerary
                    </button>
                    <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border-2 border-gray-300 transition-all">
                        📄 Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
