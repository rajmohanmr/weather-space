require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  weatherApiKey: process.env.WEATHER_API_KEY,
  weatherApiBaseUrl: 'https://api.weatherapi.com/v1',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  cacheDuration: 30 * 60 * 1000, // 30 minutes in milliseconds
  majorCities: [
    {
      city: "New York",
      key: "new-york",
      coordinates: { lat: 40.7128, lon: -74.0060 }
    },
    {
      city: "London",
      key: "london",
      coordinates: { lat: 51.5074, lon: -0.1278 }
    },
    {
      city: "Tokyo",
      key: "tokyo",
      coordinates: { lat: 35.6762, lon: 139.6503 }
    },
    {
      city: "Sydney",
      key: "sydney",
      coordinates: { lat: -33.8688, lon: 151.2093 }
    },
    {
      city: "Paris",
      key: "paris",
      coordinates: { lat: 48.8566, lon: 2.3522 }
    },
    {
      city: "Dubai",
      key: "dubai",
      coordinates: { lat: 25.2048, lon: 55.2708 }
    },
    {
      city: "Singapore",
      key: "singapore",
      coordinates: { lat: 1.3521, lon: 103.8198 }
    },
    {
      city: "Moscow",
      key: "moscow",
      coordinates: { lat: 55.7558, lon: 37.6173 }
    },
    {
      city: "Mumbai",
      key: "mumbai",
      coordinates: { lat: 19.0760, lon: 72.8777 }
    }
  ]
}; 