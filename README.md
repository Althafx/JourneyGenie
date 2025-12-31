<div align="center">

# ✨ JourneyGenie

### *Your Dream Trip, Planned in Seconds.*

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-AI-f3d03e?style=for-the-badge&logo=groq)](https://groq.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

JourneyGenie is an intelligent, AI-powered travel planning assistant that creates personalized, budget-conscious itineraries using the Llama-3.3-70b model. Whether you're looking for a luxury escape or a budget adventure, JourneyGenie crafts the perfect plan in seconds.

[Explore Features](#-key-features) • [Installation](#-getting-started) • [Tech Stack](#%EF%B8%8F-tech-stack)

</div>

---

## 🚀 Key Features

- **🤖 AI-Driven Itineraries**: Leveraging Groq's `llama-3.3-70b-versatile` model for hyper-realistic and logical travel plans.
- **💰 Budget-Smart Planning**: Dynamic cost estimation including hotels, meals, and activities within your specified budget tier.
- **🏨 Curated Partner Network**: Integrates with a pre-validated database of hotels, restaurants, and activities to ensure high-quality recommendations.
- **✈️ Flight Integration**: Optional flight cost estimation from your departure city.
- **📅 Smart Day-by-Day View**: Organized breakdown of morning, afternoon, and evening activities with specific dishes and restaurant names.
- **💡 Local Insights**: Real-time practical travel tips specific to your destination and month of travel.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) (Next-gen styling utility)
- **AI Infrastructure**: [Groq SDK](https://groq.com/) (Llama-3.3-70b-versatile)
- **State Management**: React Hooks (useState)
- **Data Validation**: Custom logic for curated partner data integration

---

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- A Groq API Key (Get one at [console.groq.com](https://console.groq.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/journeygenie.git
   cd journeygenie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the magic!

---

## 📂 Project Structure

```text
JourneyGenie/
├── app/                  # Next.js App Router
│   ├── api/              # AI Generation Endpoints
│   ├── layout.tsx        # Global Layout
│   └── page.tsx          # Main Application Page
├── components/           # Reusable UI Components
│   ├── Hero.tsx          # Premium Visual Header
│   ├── ItineraryForm.tsx # User Input & Preference Engine
│   └── ItineraryDisplay.tsx # AI Response Renderer
├── lib/                  # Utilities, Types & Mock Data
├── public/               # Static Assets
└── tailwind.config.ts    # Styling Configuration
```

---

## 🌟 Showcase

> **Note**: For the best experience, use clear preferences when generating. JourneyGenie likes to be specific!

### How it works:
1. **Selection**: Choose your destination, dates, and budget.
2. **Analysis**: JourneyGenie cross-references your preferences with curated partner data.
3. **Generation**: The Llama model synthesizes a complete, day-by-day JSON itinerary.
4. **Delivery**: A beautiful, interactive dashboard displays your upcoming adventure.

---

## 👨‍💻 Created By

**Althaf**  


