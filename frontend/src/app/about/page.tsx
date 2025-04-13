'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(true)

  // Check for saved theme preference or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem('weatherSpaceDarkMode')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(savedMode ? savedMode === 'true' : systemPrefersDark)
  }, [])

  // Apply dark mode class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('weatherSpaceDarkMode', darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
    }`}>
      {/* Navbar */}
      <nav className={`px-6 py-4 shadow-md ${
        darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            WeatherSpace
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className={`hover:text-blue-500 transition ${
              darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}>
              Home
            </Link>
            <Link href="/weather" className={`hover:text-blue-500 transition ${
              darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}>
              Weather
            </Link>
            <Link href="/history" className={`hover:text-blue-500 transition ${
              darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}>
              History
            </Link>
            <Link href="/about" className={`font-medium ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              About
            </Link>
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition ${
                darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          About WeatherSpace
        </h1>

        <div className="space-y-8">
          {/* App Description Card */}
          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <h2 className="text-2xl font-semibold mb-4">Our Weather Application</h2>
            <p className="mb-4">
              WeatherSpace provides accurate, real-time weather information with a beautiful and intuitive interface.
            </p>
            <p>
              Whether you're planning your day or traveling to new locations, our app delivers reliable forecasts
              and historical weather data at your fingertips.
            </p>
          </div>

          {/* Technology Stack Card */}
          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Frontend</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Next.js 13+ (App Router)</li>
                  <li>React 18</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Backend</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB</li>
                  <li>WeatherAPI.com</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Weather APIs Card */}
          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <h2 className="text-2xl font-semibold mb-4">Weather Data Sources</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 relative mr-4">
                  <Image
                    src={darkMode ? '/weather-api-logo-light.png' : '/weather-api-logo-dark.png'}
                    alt="WeatherAPI Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">WeatherAPI.com</h3>
                  <p className="mt-1">
                    Our primary source for current weather data, forecasts, and location-based weather information.
                  </p>
                  <a 
                    href="https://www.weatherapi.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-500 hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 relative mr-4">
                  <Image
                    src={darkMode ? '/openweather-logo-light.png' : '/openweather-logo-dark.png'}
                    alt="OpenWeatherMap Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">OpenWeatherMap</h3>
                  <p className="mt-1">
                    Secondary source providing additional weather data and historical information.
                  </p>
                  <a 
                    href="https://openweathermap.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-500 hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Card */}
          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <h2 className="text-2xl font-semibold mb-4">How Weather Data is Fetched</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li className="pl-2">
                <span className="font-medium">User Request:</span> When you search for a location or allow geolocation access.
              </li>
              <li className="pl-2">
                <span className="font-medium">API Call:</span> Our server fetches data from weather APIs with proper authentication.
              </li>
              <li className="pl-2">
                <span className="font-medium">Data Processing:</span> Raw weather data is processed for optimal display.
              </li>
              <li className="pl-2">
                <span className="font-medium">Display:</span> Processed data is shown in an easy-to-understand format.
              </li>
            </ol>
          </div>

          {/* Privacy Card */}
          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <h2 className="text-2xl font-semibold mb-4">Privacy & Data Usage</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Location data is only used to fetch weather information</li>
              <li>Search history is stored locally unless you create an account</li>
              <li>We don't share your personal data with third parties</li>
              <li>All API communications are encrypted</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}