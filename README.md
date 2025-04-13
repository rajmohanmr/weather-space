# 🌤️ Weather Space

A modern, responsive weather application that provides real-time weather information and forecasts for cities worldwide. Built with Next.js and TypeScript, featuring a beautiful UI with dark mode support.

![Weather Space Screenshot](screenshot.png)

## ✨ Features

- **Real-time Weather Data**
  - Current temperature, conditions, and weather details
  - Feels like temperature
  - Humidity and wind information
  - UV index and visibility
  - Pressure and precipitation data

- **Weather Forecasts**
  - 7-day weather forecast
  - Temperature trends
  - Chance of rain
  - Daily weather conditions

- **City Management**
  - Search for any city worldwide
  - Quick access to major cities
  - Detailed city weather information
  - Easy navigation between cities

- **User Experience**
  - Responsive design for all devices
  - Dark mode support
  - Beautiful, modern UI
  - Smooth animations and transitions
  - Interactive weather cards
  - Real-time data updates

## 🎨 Design & Accessibility

- **Aesthetic Layout**
  - Clean, minimalist design with ample white space
  - Consistent color palette with weather-appropriate themes
  - Glass-morphism effects for depth and visual interest
  - Subtle shadows and rounded corners for a modern look
  - Typography hierarchy for improved readability

- **Responsiveness**
  - Mobile-first approach with progressive enhancement
  - Fluid layouts that adapt to all screen sizes
  - Responsive typography that scales appropriately
  - Optimized touch targets for mobile devices
  - Collapsible sections for smaller screens

- **Accessibility**
  - WCAG 2.1 AA compliance
  - Semantic HTML structure
  - Proper ARIA attributes for interactive elements
  - Keyboard navigation support
  - High contrast mode for visually impaired users
  - Screen reader compatibility

## 🏗️ Code Architecture

- **Organized Structure**
  - Feature-based folder organization
  - Clear separation of concerns
  - Consistent file naming conventions
  - Well-documented code with JSDoc comments

- **Modularity**
  - Reusable components with single responsibility
  - Custom hooks for shared logic
  - Context providers for global state
  - Utility functions for common operations

- **Performance**
  - Code splitting for faster initial load
  - Image optimization with Next.js Image component
  - Memoization for expensive calculations
  - Efficient state management
  - Lazy loading for off-screen content

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Chart.js for weather visualizations
  - React Icons

- **Backend**
  - Node.js
  - Express.js
  - MongoDB for data storage
  - RESTful API architecture

- **APIs**
  - WeatherAPI.com for weather data

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- MongoDB installed and running locally (or MongoDB Atlas account)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-space.git
   cd weather-space
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   # or
   yarn install
   ```

4. Create a `.env` file in the backend directory:
   ```
   WEATHER_API_KEY=your_weather_api_key
   MONGO_URI=mongodb://localhost:27017/weatherDB
   ```

5. Create a `.env` file in the frontend directory:
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=3adf7b53882242608a2170921251204
   ```

6. Start the backend server:
   ```bash
   cd backend
   node index.js
   ```

7. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   # or
   yarn dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 API Documentation

### WeatherAPI.com
- Base URL: `https://api.weatherapi.com/v1`
- Endpoints used:
  - Current weather: `/current.json`
  - Forecast: `/forecast.json`
- Rate limit: 1,000,000 calls per month (free tier)

### Backend API Endpoints
- Health check: `GET /api/health`
- Weather data: `GET /api/weather?city=London`
- Search weather: `GET /api/weather/search?city=London`
- Search history: `GET /api/weather/history`
- Clear history: `DELETE /api/weather/history`

## 🎨 Features in Detail

### Weather Display
- Real-time temperature updates
- Weather condition icons
- Detailed weather metrics
- Responsive layout

### City Management
- Search functionality
- Major cities quick access
- City weather details
- Easy navigation

### Forecast Charts
- Temperature trends
- Precipitation probability
- Daily forecasts
- Interactive charts

### User Interface
- Dark/Light mode
- Responsive design
- Modern UI components
- Smooth animations

## 📁 Project Structure

```
weather-space/
├── frontend/            # Frontend application
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── app/         # Next.js app router
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   ├── utils/       # Utility functions
│   │   │   ├── types/       # TypeScript type definitions
│   │   │   ├── styles/      # Global styles
│   │   │   ├── weather/     # Weather page
│   │   │   ├── about/       # About page
│   │   │   └── layout.tsx   # Root layout
│   │   └── lib/         # Shared libraries
│   ├── .env             # Frontend environment variables
│   ├── package.json     # Frontend dependencies
│   └── ...              # Other frontend config files
├── backend/             # Backend application
│   ├── index.js         # Main server file
│   ├── .env             # Backend environment variables
│   ├── package.json     # Backend dependencies
│   └── ...              # Other backend files
└── README.md            # Documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- WeatherAPI.com for providing weather data
- Next.js team for the amazing framework
- All contributors and supporters 