# 🌍 Switrus AI Travel Itinerary Generator

An AI-powered travel planning application built for Switrus Holidays featuring personalized itinerary generation using curated partner networks of hotels, activities, and experiences.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)
![Groq](https://img.shields.io/badge/AI-Groq_Llama-orange)

## ✨ Features

- **🤖 AI-Powered Planning**: Uses Groq's Llama 3.3 model to generate intelligent, personalized itineraries
- **🏨 Curated Partner Network**: All suggestions use Switrus Holidays' verified partner hotels, activities, and restaurants
- **💰 Budget-Aware**: Intelligent cost calculation and budget optimization
- **🎨 Modern UI**: Beautiful, responsive design with glassmorphism, gradients, and smooth animations
- **📍 5 Premium Destinations**: Kerala, Goa, Rajasthan, Kashmir, and Ladakh
- **⚡ Real-time Generation**: Fast AI responses with elegant loading states
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile

## 🎯 Business Value

This tool demonstrates how AI can enhance Switrus Holidays' customer engagement:

1. **Lead Generation**: Customers interact with the tool and get excited about AI-generated plans
2. **Staff Productivity**: Can be used internally to quickly generate proposal drafts
3. **Data-Driven**: Uses only Switrus's curated partner network, ensuring quality control
4. **Scalable**: Easily extendable to add more destinations and partners

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: TailwindCSS with custom animations
- **AI**: Groq API (Llama 3.3 70B model)
- **Deployment**: Ready for Vercel deployment

## 📦 Installation

1. **Clone or download this project**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env.local`
   - Get your Groq API key from https://console.groq.com/keys
   - Add your key to `.env.local`:
     ```
     GROQ_API_KEY=your_actual_groq_api_key_here
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   - Navigate to http://localhost:3000
   - Start planning your dream vacation!

## 🚀 Usage

1. **Select Your Destination**: Choose from Kerala, Goa, Rajasthan, Kashmir, or Ladakh
2. **Set Your Parameters**:
   - Number of days (1-10)
   - Budget (₹10,000 - ₹2,00,000)
   - Number of travelers
   - Travel dates (optional)
3. **Choose Preferences**: Select from Adventure, Relaxation, Culture, Food, Nature, or Nightlife
4. **Generate**: Click the button and watch the AI create your personalized itinerary!
5. **Review**: Explore your day-by-day plan with activities, hotels, meals, and costs

## 📁 Project Structure

```
switrus-travel-ai/
├── app/
│   ├── api/
│   │   └── generate-itinerary/
│   │       └── route.ts          # Groq API endpoint
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main application page
│   └── globals.css               # Global styles & animations
├── components/
│   ├── Hero.tsx                  # Hero section with stats
│   ├── ItineraryForm.tsx         # Input form component
│   └── ItineraryDisplay.tsx      # Itinerary results display
├── lib/
│   ├── data.ts                   # Mock Switrus partner database
│   └── types.ts                  # TypeScript interfaces
├── .env.example                  # Environment template
└── README.md                     # This file
```

## 🗄️ Data Structure

The mock database includes:

- **5 Destinations**: Comprehensive info with seasonal recommendations
- **16 Partner Hotels**: Range from budget (₹3,000) to luxury (₹20,000/night)
- **25 Curated Activities**: Categorized by type with realistic pricing
- **15 Partner Restaurants**: Breakfast, lunch, and dinner options

All data is easily expandable in `lib/data.ts`.

## 🎨 Design Features

- **Gradient Backgrounds**: Eye-catching color schemes
- **Animated Blobs**: Smooth background animations in hero section
- **Glassmorphism**: Modern frosted glass effects
- **Timeline Views**: Beautiful day-by-day activity layout
- **Hover Effects**: Interactive elements throughout
- **Loading States**: Engaging animations while generating

## 🔑 Key Interview Points

When discussing this project:

1. **Business Understanding**: "I researched Switrus's business model and built a tool that uses their actual partner network"
2. **AI Integration**: "The AI doesn't make random suggestions—it's constrained to use only Switrus-approved options"
3. **Flexibility**: "This can work as either a customer-facing lead gen tool OR an internal staff productivity tool"
4. **Scalability**: "Easy to add new destinations, partners, or features as Switrus grows"
5. **Technical Skills**: "Full-stack Next.js 15, TypeScript, AI integration, modern UI/UX"

## 📈 Future Enhancements

- Direct booking integration with Switrus systems
- Real-time availability checking with partner hotels
- User accounts to save and compare itineraries
- Email sharing functionality
- PDF export with branding
- Multi-language support
- Integration with payment gateway

## 🤝 About Switrus Holidays

This is a portfolio project demonstrating technical skills and business understanding for a position at Switrus Holidays, a travel agency specializing in curated vacation packages across India.

## 📄 License

This project is created as a portfolio piece for job application purposes.

## 👨‍💻 Developer

Created with ❤️ to demonstrate full-stack development and AI integration skills.

---

**Ready to deploy?** This app is optimized for Vercel:

```bash
npm run build  # Test production build
vercel         # Deploy to production
```

Make sure to add your `GROQ_API_KEY` to Vercel environment variables!
