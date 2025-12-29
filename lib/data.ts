import { Destination, Hotel, Activity, Restaurant } from "./types";

// Mock International Packages
export const destinations: Destination[] = [
    {
        id: "europe_pkg",
        name: "Grand Europe Tour",
        description: "Experience the best of France, Italy, and Switzerland",
        image: "/destinations/europe.jpg",
        popularMonths: ["May", "June", "July", "August", "September"],
        averageBudget: { min: 150000, max: 400000 },
        packages: [
            { name: "Economy", price: 150000, description: "Hostels, Public Transport, Walking Tours", inclusions: ["Hostels", "Walking Tours"] },
            { name: "Standard", price: 250000, description: "3-Star Hotels, City Pass, Guided Tours", inclusions: ["3-Star Hotels", "City Pass"] },
            { name: "Luxury", price: 400000, description: "4-5 Star Hotels, Private Transfers, Fine Dining", inclusions: ["Luxury Hotels", "Private Transfers"] }
        ]
    },
    {
        id: "turkey_pkg",
        name: "Turkey - East Meets West",
        description: "Istanbul, Cappadocia history, and Mediterranean beaches",
        image: "/destinations/turkey.jpg",
        popularMonths: ["April", "May", "September", "October"],
        averageBudget: { min: 80000, max: 200000 },
        packages: [
            { name: "Economy", price: 80000, description: "Budget Caves, Shared Shuttles", inclusions: ["Cave Hostels", "Shared Shuttle"] },
            { name: "Standard", price: 140000, description: "Boutique Cave Hotels, Small Group Tours", inclusions: ["Boutique Hotel", "Group Tours"] },
            { name: "Luxury", price: 200000, description: "Luxury Suites, Private Balloon Ride", inclusions: ["Luxury Suites", "Balloon Ride"] }
        ]
    },
    {
        id: "greece_pkg",
        name: "Greece - Myths & Islands",
        description: "Athens ancient history and Santorini sunsets",
        image: "/destinations/greece.jpg",
        popularMonths: ["May", "June", "September", "October"],
        averageBudget: { min: 100000, max: 250000 },
        packages: [
            { name: "Economy", price: 100000, description: "Basic Ferry, Local Guesthouses", inclusions: ["Ferry Tickets", "Guesthouses"] },
            { name: "Standard", price: 180000, description: "Fast Ferry, Caldera View Hotels", inclusions: ["Fast Ferry", "View Hotels"] },
            { name: "Luxury", price: 250000, description: "Private Yacht, 5-Star Santorinian Suites", inclusions: ["Private Yacht", "5-Star Suites"] }
        ]
    },
    {
        id: "paris_pkg",
        name: "Paris - City of Light",
        description: "Romance, art, fashion, and culinary delights",
        image: "/destinations/paris.jpg",
        popularMonths: ["April", "May", "June", "September", "October"],
        averageBudget: { min: 90000, max: 220000 },
        packages: [
            { name: "Economy", price: 90000, description: "Metro Access Hotels, Self-Guided", inclusions: ["Metro Hotel", "Museum Pass"] },
            { name: "Standard", price: 150000, description: "Central Hotels, Seine Cruise", inclusions: ["Central Hotel", "Seine Cruise"] },
            { name: "Luxury", price: 220000, description: "Eiffel View Suites, Michelin Dining", inclusions: ["Eiffel Suites", "Michelin Dinner"] }
        ]
    },
    {
        id: "swiss_pkg",
        name: "Switzerland - Alpine Dream",
        description: "Majestic Alps, pristine lakes, and Swiss chocolates",
        image: "/destinations/swiss.jpg",
        popularMonths: ["June", "July", "August", "December", "January"],
        averageBudget: { min: 120000, max: 300000 },
        packages: [
            { name: "Economy", price: 120000, description: "Swiss Pass 2nd Class, Chalet Hostels", inclusions: ["Swiss Pass 2nd", "Hostels"] },
            { name: "Standard", price: 200000, description: "Swiss Pass 1st Class, 3-Star Hotels", inclusions: ["Swiss Pass 1st", "3-Star Hotels"] },
            { name: "Luxury", price: 300000, description: "Private Drivers, Lake View 5-Star", inclusions: ["Private Driver", "5-Star Lake View"] }
        ]
    },
    {
        id: "bali_pkg",
        name: "Bali - Island of Gods",
        description: "Tropical beaches, lush rice terraces, and temples",
        image: "/destinations/bali.jpg",
        popularMonths: ["April", "May", "June", "September"],
        averageBudget: { min: 60000, max: 150000 },
        packages: [
            { name: "Economy", price: 60000, description: "Homestays, Scooter Rental", inclusions: ["Homestay", "Scooter"] },
            { name: "Standard", price: 100000, description: "Private Villas, Car with Driver", inclusions: ["Private Villa", "Driver"] },
            { name: "Luxury", price: 150000, description: "Luxury Beachfront Resorts, Spa Package", inclusions: ["Luxury Resort", "Daily Spa"] }
        ]
    },
    {
        id: "thailand_pkg",
        name: "Thailand - Land of Smiles",
        description: "Bangkok bustle, Chiang Mai culture, and Islands",
        image: "/destinations/thailand.jpg",
        popularMonths: ["November", "December", "January", "February"],
        averageBudget: { min: 50000, max: 120000 },
        packages: [
            { name: "Economy", price: 50000, description: "Street Food Tours, Hostels", inclusions: ["Street Food", "Hostels"] },
            { name: "Standard", price: 80000, description: "4-Star Hotels, Island Speedboats", inclusions: ["4-Star Hotel", "Speedboat"] },
            { name: "Luxury", price: 120000, description: "Rooftop Bars, Private Island Resorts", inclusions: ["Rooftop Bar", "Private Island"] }
        ]
    },
    {
        id: "dubai_pkg",
        name: "Dubai - Future City",
        description: "Skyscrapers, desert safaris, and luxury shopping",
        image: "/destinations/dubai.jpg",
        popularMonths: ["November", "December", "January", "February", "March"],
        averageBudget: { min: 70000, max: 200000 },
        packages: [
            { name: "Economy", price: 70000, description: "Citymax Hotels, Metro", inclusions: ["City Hotel", "Metro Card"] },
            { name: "Standard", price: 120000, description: "Marina View Hotels, Desert Safari", inclusions: ["Marina Hotel", "Safari"] },
            { name: "Luxury", price: 200000, description: "Palm Atlantis, Helicopter Tour", inclusions: ["Atlantis Stay", "Heli Tour"] }
        ]
    },
    {
        id: "singapore_pkg",
        name: "Singapore - Garden City",
        description: "Futuristic gardens, diverse food, and vibrant culture",
        image: "/destinations/singapore.jpg",
        popularMonths: ["February", "March", "April"],
        averageBudget: { min: 80000, max: 180000 },
        packages: [
            { name: "Economy", price: 80000, description: "Pod Hotels, Hawker Centers", inclusions: ["Pod Hotel", "Hawker Food"] },
            { name: "Standard", price: 130000, description: "Orchard Road Hotels, Sentosa Pass", inclusions: ["Orchard Hotel", "Sentosa Pass"] },
            { name: "Luxury", price: 180000, description: "Marina Bay Sands, Private Tours", inclusions: ["MBS Stay", "Private Guide"] }
        ]
    },
    {
        id: "maldives_pkg",
        name: "Maldives - Tropical Paradise",
        description: "Overwater villas, crystal clear water, and relaxation",
        image: "/destinations/maldives.jpg",
        popularMonths: ["November", "December", "January", "February", "March"],
        averageBudget: { min: 100000, max: 350000 },
        packages: [
            { name: "Economy", price: 100000, description: "Local Island Guesthouses", inclusions: ["Guesthouse", "Public ferry"] },
            { name: "Standard", price: 200000, description: "Beach Villas, Speedboat Transfer", inclusions: ["Beach Villa", "Speedboat"] },
            { name: "Luxury", price: 350000, description: "Overwater Villas, Seaplane", inclusions: ["Water Villa", "Seaplane"] }
        ]
    },
];

export const hotels: Hotel[] = [
    // Europe
    { id: "h_eu1", name: "Novotel Paris Centre", destination: "europe_pkg", pricePerNight: 12000, rating: 4.2, amenities: ["City View", "Metro Access"], type: "mid-range", image: "/hotels/novotel.jpg" },
    { id: "h_eu2", name: "Hotel Danieli Venice", destination: "europe_pkg", pricePerNight: 45000, rating: 4.8, amenities: ["Canal View", "Luxury", "History"], type: "luxury", image: "/hotels/danieli.jpg" },
    { id: "h_eu3", name: "Ibis Amsterdam Centre", destination: "europe_pkg", pricePerNight: 8000, rating: 3.8, amenities: ["Central Station", "Wifi"], type: "budget", image: "/hotels/ibis.jpg" },

    // Turkey
    { id: "h_tr1", name: "Sultan Cave Suites", destination: "turkey_pkg", pricePerNight: 15000, rating: 4.7, amenities: ["Cave Room", "Rooftop View"], type: "luxury", image: "/hotels/cave.jpg" },
    { id: "h_tr2", name: "Pera Palace Istanbul", destination: "turkey_pkg", pricePerNight: 20000, rating: 4.6, amenities: ["Historic", "Spa", "Central"], type: "luxury", image: "/hotels/pera.jpg" },
    { id: "h_tr3", name: "Antique Stone House", destination: "turkey_pkg", pricePerNight: 5000, rating: 4.0, amenities: ["Authentic", "Breakfast"], type: "budget", image: "/hotels/stone.jpg" },

    // Greece
    { id: "h_gr1", name: "Cavo Tagoo Mykonos", destination: "greece_pkg", pricePerNight: 50000, rating: 4.9, amenities: ["Private Pool", "Sunset View"], type: "luxury", image: "/hotels/cavo.jpg" },
    { id: "h_gr2", name: "Plaka Hotel Athens", destination: "greece_pkg", pricePerNight: 10000, rating: 4.3, amenities: ["Acropolis View", "Rooftop"], type: "mid-range", image: "/hotels/plaka.jpg" },

    // Paris
    { id: "h_pa1", name: "Pullman Tour Eiffel", destination: "paris_pkg", pricePerNight: 18000, rating: 4.4, amenities: ["Eiffel View", "Gym"], type: "luxury", image: "/hotels/pullman.jpg" },
    { id: "h_pa2", name: "Hotel Saint-Louis", destination: "paris_pkg", pricePerNight: 9000, rating: 4.0, amenities: ["Marais District", "Charm"], type: "mid-range", image: "/hotels/stlouis.jpg" },

    // Switzerland
    { id: "h_sw1", name: "Badrutt's Palace", destination: "swiss_pkg", pricePerNight: 60000, rating: 4.9, amenities: ["Lake View", "Luxury Spa"], type: "luxury", image: "/hotels/badrutt.jpg" },
    { id: "h_sw2", name: "Hotel Interlaken", destination: "swiss_pkg", pricePerNight: 15000, rating: 4.2, amenities: ["Mountain View", "Central"], type: "mid-range", image: "/hotels/interlaken.jpg" },

    // Bali
    { id: "h_ba1", name: "Ayana Resort", destination: "bali_pkg", pricePerNight: 18000, rating: 4.7, amenities: ["Rock Bar", "Pools", "Spa"], type: "luxury", image: "/hotels/ayana.jpg" },
    { id: "h_ba2", name: "Ubud Village Hotel", destination: "bali_pkg", pricePerNight: 6000, rating: 4.3, amenities: ["Rice Fields", "Culture"], type: "mid-range", image: "/hotels/ubud.jpg" },

    // Thailand
    { id: "h_th1", name: "Lebua at State Tower", destination: "thailand_pkg", pricePerNight: 12000, rating: 4.6, amenities: ["Sky Bar", "City View"], type: "luxury", image: "/hotels/lebua.jpg" },
    { id: "h_th2", name: "Holiday Inn Phuket", destination: "thailand_pkg", pricePerNight: 5000, rating: 4.1, amenities: ["Beachfront", "Family"], type: "mid-range", image: "/hotels/holidayinn.jpg" },

    // Dubai
    { id: "h_du1", name: "Atlantis The Palm", destination: "dubai_pkg", pricePerNight: 35000, rating: 4.8, amenities: ["Waterpark", "Aquarium"], type: "luxury", image: "/hotels/atlantis.jpg" },
    { id: "h_du2", name: "Rove Downtown", destination: "dubai_pkg", pricePerNight: 6000, rating: 4.4, amenities: ["Burj View", "Hip"], type: "mid-range", image: "/hotels/rove.jpg" },

    // Singapore
    { id: "h_si1", name: "Marina Bay Sands", destination: "singapore_pkg", pricePerNight: 40000, rating: 4.8, amenities: ["Infinity Pool", "Casino"], type: "luxury", image: "/hotels/mbs.jpg" },
    { id: "h_si2", name: "Hotel Boss", destination: "singapore_pkg", pricePerNight: 7000, rating: 3.9, amenities: ["Pool", "City Access"], type: "budget", image: "/hotels/boss.jpg" },

    // Maldives
    { id: "h_ma1", name: "Soneva Jani", destination: "maldives_pkg", pricePerNight: 150000, rating: 5.0, amenities: ["Water Slide", "Stargazing"], type: "luxury", image: "/hotels/soneva.jpg" },
    { id: "h_ma2", name: "Hard Rock Hotel", destination: "maldives_pkg", pricePerNight: 25000, rating: 4.5, amenities: ["Music", "Water Sports"], type: "luxury", image: "/hotels/hardrock.jpg" },
];

export const activities: Activity[] = [
    // Europe
    { id: "a_eu1", name: "Eiffel Tower Summit", destination: "europe_pkg", price: 2500, duration: "3 hours", category: "culture", description: "Top floor access with champagne", bestTimeOfDay: "evening" },
    { id: "a_eu2", name: "Gondola Ride in Venice", destination: "europe_pkg", price: 8000, duration: "1 hour", category: "relaxation", description: "Private gondola through canals", bestTimeOfDay: "afternoon" },
    { id: "a_eu3", name: "Colosseum Tour", destination: "europe_pkg", price: 4000, duration: "3 hours", category: "culture", description: "Ancient Rome guided walking tour", bestTimeOfDay: "morning" },

    // Turkey
    { id: "a_tr1", name: "Cappadocia Hot Air Balloon", destination: "turkey_pkg", price: 15000, duration: "3 hours", category: "adventure", description: "Sunrise flight over fairy chimneys", bestTimeOfDay: "morning" },
    { id: "a_tr2", name: "Blue Mosque Visit", destination: "turkey_pkg", price: 0, duration: "1 hour", category: "culture", description: "Iconic Ottoman architecture", bestTimeOfDay: "morning" },

    // Greece
    { id: "a_gr1", name: "Oia Sunset View", destination: "greece_pkg", price: 0, duration: "2 hours", category: "relaxation", description: "Famous Santorini sunset spot", bestTimeOfDay: "evening" },
    { id: "a_gr2", name: "Acropolis Tour", destination: "greece_pkg", price: 3000, duration: "3 hours", category: "culture", description: "Parthenon and ancient citadel", bestTimeOfDay: "morning" },

    // Paris
    { id: "a_pa1", name: "Louvre Museum", destination: "paris_pkg", price: 1800, duration: "4 hours", category: "culture", description: "See the Mona Lisa and vast art", bestTimeOfDay: "morning" },
    { id: "a_pa2", name: "Seine River Cruise", destination: "paris_pkg", price: 1500, duration: "1.5 hours", category: "relaxation", description: "Sightseeing cruise by night", bestTimeOfDay: "evening" },

    // Switzerland
    { id: "a_sw1", name: "Jungfraujoch Train", destination: "swiss_pkg", price: 15000, duration: "6 hours", category: "adventure", description: "Top of Europe train journey", bestTimeOfDay: "morning" },
    { id: "a_sw2", name: "Lake Brienz Boat", destination: "swiss_pkg", price: 3000, duration: "2 hours", category: "nature", description: "Turquoise water cruise", bestTimeOfDay: "afternoon" },

    // Bali
    { id: "a_ba1", name: "Uluwatu Temple & Kechak", destination: "bali_pkg", price: 1500, duration: "3 hours", category: "culture", description: "Cliff temple with fire dance", bestTimeOfDay: "evening" },
    { id: "a_ba2", name: "Tegalalang Rice Terrace", destination: "bali_pkg", price: 500, duration: "2 hours", category: "nature", description: "Famous green rice paddies swing", bestTimeOfDay: "morning" },

    // Thailand
    { id: "a_th1", name: "Phi Phi Island Tour", destination: "thailand_pkg", price: 4000, duration: "8 hours", category: "adventure", description: "Speedboat tour to Maya Bay", bestTimeOfDay: "morning" },
    { id: "a_th2", name: "Wat Arun Visit", destination: "thailand_pkg", price: 200, duration: "1 hour", category: "culture", description: "Temple of Dawn by the river", bestTimeOfDay: "afternoon" },

    // Dubai
    { id: "a_du1", name: "Burj Khalifa At The Top", destination: "dubai_pkg", price: 3500, duration: "2 hours", category: "culture", description: "World's highest observation deck", bestTimeOfDay: "evening" },
    { id: "a_du2", name: "Desert Safari", destination: "dubai_pkg", price: 3000, duration: "6 hours", category: "adventure", description: "Dune bashing and BBQ dinner", bestTimeOfDay: "afternoon" },

    // Singapore
    { id: "a_si1", name: "Gardens by the Bay", destination: "singapore_pkg", price: 2000, duration: "3 hours", category: "nature", description: "Cloud Forest and Supertrees", bestTimeOfDay: "evening" },
    { id: "a_si2", name: "Universal Studios", destination: "singapore_pkg", price: 6000, duration: "Full Day", category: "adventure", description: "Theme park on Sentosa Island", bestTimeOfDay: "morning" },

    // Maldives
    { id: "a_ma1", name: "Snorkeling Safari", destination: "maldives_pkg", price: 4000, duration: "3 hours", category: "adventure", description: "Swim with turtles and rays", bestTimeOfDay: "morning" },
    { id: "a_ma2", name: "Sunset Dolphin Cruise", destination: "maldives_pkg", price: 5000, duration: "2 hours", category: "nature", description: "Spot dolphins at golden hour", bestTimeOfDay: "evening" },
];

export const restaurants: Restaurant[] = [
    // Europe
    { id: "r_eu1", name: "Le Jules Verne", destination: "europe_pkg", cuisine: "French", priceRange: "₹₹₹", specialty: "Fine Dining", mealType: "dinner" },
    { id: "r_eu2", name: "Trattoria Al Gato", destination: "europe_pkg", cuisine: "Italian", priceRange: "₹₹", specialty: "Pasta", mealType: "lunch" },

    // Turkey
    { id: "r_tr1", name: "Nusr-Et Steakhouse", destination: "turkey_pkg", cuisine: "Steak", priceRange: "₹₹₹", specialty: "Gold Steak", mealType: "dinner" },
    { id: "r_tr2", name: "Hafiz Mustafa", destination: "turkey_pkg", cuisine: "Dessert", priceRange: "₹", specialty: "Baklava", mealType: "breakfast" },

    // Greece
    { id: "r_gr1", name: "Kiki's Tavern", destination: "greece_pkg", cuisine: "Greek", priceRange: "₹₹", specialty: "Grilled Octopus", mealType: "lunch" },
    { id: "r_gr2", name: "Ambrosia", destination: "greece_pkg", cuisine: "Mediterranean", priceRange: "₹₹₹", specialty: "Seafood", mealType: "dinner" },

    // Paris
    { id: "r_pa1", name: "Cafe de Flore", destination: "paris_pkg", cuisine: "Cafe", priceRange: "₹₹", specialty: "Hot Chocolate", mealType: "breakfast" },
    { id: "r_pa2", name: "L'Ambroisie", destination: "paris_pkg", cuisine: "French", priceRange: "₹₹₹", specialty: "Haute Cuisine", mealType: "dinner" },

    // Switzerland
    { id: "r_sw1", name: "Restaurant Chalet", destination: "swiss_pkg", cuisine: "Swiss", priceRange: "₹₹", specialty: "Cheese Fondue", mealType: "dinner" },
    { id: "r_sw2", name: "Confiserie Sprungli", destination: "swiss_pkg", cuisine: "Cafe", priceRange: "₹₹", specialty: "Luxemburgerli", mealType: "breakfast" },

    // Bali
    { id: "r_ba1", name: "Potato Head Beach Club", destination: "bali_pkg", cuisine: "International", priceRange: "₹₹", specialty: "Cocktails", mealType: "dinner" },
    { id: "r_ba2", name: "Naughty Nuri's", destination: "bali_pkg", cuisine: "BBQ", priceRange: "₹", specialty: "Ribs", mealType: "lunch" },

    // Thailand
    { id: "r_th1", name: "Jay Fai", destination: "thailand_pkg", cuisine: "Street Food", priceRange: "₹₹", specialty: "Crab Omelette", mealType: "lunch" },
    { id: "r_th2", name: "Blue Elephant", destination: "thailand_pkg", cuisine: "Thai", priceRange: "₹₹₹", specialty: "Royal Thai Cuisine", mealType: "dinner" },

    // Dubai
    { id: "r_du1", name: "Pierchic", destination: "dubai_pkg", cuisine: "Seafood", priceRange: "₹₹₹", specialty: "Overwater Dining", mealType: "dinner" },
    { id: "r_du2", name: "Arabian Tea House", destination: "dubai_pkg", cuisine: "Emirati", priceRange: "₹₹", specialty: "Traditional Breakfast", mealType: "breakfast" },

    // Singapore
    { id: "r_si1", name: "Jumbo Seafood", destination: "singapore_pkg", cuisine: "Seafood", priceRange: "₹₹", specialty: "Chilli Crab", mealType: "dinner" },
    { id: "r_si2", name: "Tian Tian Chicken Rice", destination: "singapore_pkg", cuisine: "Hawker", priceRange: "₹", specialty: "Hainanese Chicken", mealType: "lunch" },

    // Maldives
    { id: "r_ma1", name: "Ithaa Undersea", destination: "maldives_pkg", cuisine: "European", priceRange: "₹₹₹", specialty: "Underwater View", mealType: "dinner" },
    { id: "r_ma2", name: "Muraka", destination: "maldives_pkg", cuisine: "Seafood", priceRange: "₹₹₹", specialty: "Sunset Dinner", mealType: "dinner" },
];

// Re-export helpers
export const getHotelsByDestination = (destinationId: string) => hotels.filter((hotel) => hotel.destination === destinationId);
export const getActivitiesByDestination = (destinationId: string) => activities.filter((activity) => activity.destination === destinationId);
export const getRestaurantsByDestination = (destinationId: string) => restaurants.filter((restaurant) => restaurant.destination === destinationId);
export const getDestinationById = (id: string) => destinations.find((dest) => dest.id === id);
