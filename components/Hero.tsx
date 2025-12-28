export default function Hero() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white">
            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative container mx-auto px-4 py-20 max-w-7xl">
                <div className="text-center">
                    {/* Logo/Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                        </svg>
                        <span className="text-sm font-semibold">JourneyGenie AI</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Discover Your Next
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                            Adventure
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl mb-8 text-orange-50 max-w-3xl mx-auto">
                        Let our AI create personalized itineraries using JourneyGenie&apos;s
                        curated partner network of hotels, activities, and experiences
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mt-12">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">50+</div>
                            <div className="text-orange-100">Partner Hotels</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">100+</div>
                            <div className="text-orange-100">Curated Activities</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">5</div>
                            <div className="text-orange-100">Premium Destinations</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">10K+</div>
                            <div className="text-orange-100">Happy Travelers</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave SVG at bottom */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                        fill="rgb(240 249 255)"
                    />
                </svg>
            </div>
        </div>
    );
}
