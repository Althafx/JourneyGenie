import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JourneyGenie | AI Travel Planner",
  description: "AI-powered travel itinerary generator. Plan your perfect vacation to Kerala, Goa, Rajasthan, Kashmir, and Ladakh.",
  keywords: "travel planner, AI itinerary, Kerala, Goa, vacation planning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
