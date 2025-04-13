# Weather Space 🌤️

A modern, responsive weather application that provides real-time weather information and forecasts for cities worldwide. Built with Next.js and Express, featuring a beautiful UI with dark mode support.

## Features ✨

- **Real-time Weather Data**: Get current weather conditions for any city
- **Weather Forecast**: View detailed 7-day weather forecasts
- **Major Cities**: Quick access to weather for major cities worldwide
- **Interactive Charts**: Visual representation of temperature and precipitation trends
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Beautiful UI that works on all devices
- **Search Functionality**: Search for any city's weather
- **Detailed Metrics**: View comprehensive weather data including:
  - Temperature
  - Humidity
  - Wind speed and direction
  - Pressure
  - Visibility
  - UV index
  - Precipitation

## Tech Stack 🛠️

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Chart.js
- React Icons
- Axios

### Backend
- Express.js
- Node.js
- WeatherAPI

## APIs Used 🌐

- [WeatherAPI](https://www.weatherapi.com/): For real-time weather data and forecasts
- OpenWeatherMap (optional): Backup weather data source

## Getting Started 🚀

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- WeatherAPI key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/weather-space.git
cd weather-space
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Set up environment variables

Frontend (.env):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
```

Backend (.env):
```env
PORT=3001
WEATHER_API_KEY=your_weather_api_key
```

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure 📁

```
weather-space/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── weather/
│   │   │   ├── about/
│   │   │   └── history/
│   │   ├── styles/
│   │   └── types/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
└── README.md
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 