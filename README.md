# Weather Space 🌤️

A modern weather application built with Next.js, TypeScript, and TailwindCSS that provides real-time weather forecasts and beautiful visualizations.

## Features

- 🌍 Real-time weather data from WeatherAPI
- 📊 Interactive weather forecast charts
- 🌙 Dark/Light mode support
- 📱 Fully responsive design
- ♿ Accessibility focused
- 🎨 Modern and clean UI

## Tech Stack

- **Frontend:**
  - Next.js 14
  - TypeScript
  - TailwindCSS
  - Chart.js
  - React Icons

- **Development:**
  - ESLint
  - Jest
  - TypeScript
  - PostCSS

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-space.git
   cd weather-space
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Create a `.env.local` file in the frontend directory:
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run type-check` - Run TypeScript type checking

## Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables
4. Deploy!

### Railway
1. Create a new project on Railway
2. Connect your GitHub repository
3. Add your environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [WeatherAPI](https://www.weatherapi.com/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Charts powered by [Chart.js](https://www.chartjs.org/) 