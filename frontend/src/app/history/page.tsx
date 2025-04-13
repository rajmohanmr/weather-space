'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface WeatherHistory {
  _id: string
  city: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  date: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<WeatherHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [flippedCard, setFlippedCard] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for user's preferred color scheme
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)
  }, [])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/weather/history')
        if (!response.ok) throw new Error('Failed to load history')
        const data = await response.json()
        setHistory(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load history')
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const handleCardClick = (id: string) => {
    setFlippedCard(flippedCard === id ? null : id)
  }

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes('rain')) return 'https://cdn.weatherapi.com/weather/64x64/day/176.png'
    if (lowerCondition.includes('cloud')) return 'https://cdn.weatherapi.com/weather/64x64/day/119.png'
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) return 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
    if (lowerCondition.includes('snow')) return 'https://cdn.weatherapi.com/weather/64x64/day/179.png'
    if (lowerCondition.includes('thunder')) return 'https://cdn.weatherapi.com/weather/64x64/day/200.png'
    return 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800'}`}>
      {/* Navbar */}
      <nav className={`px-6 py-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            WeatherSpace
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className={`hover:text-blue-500 transition ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Home</Link>
            <Link href="/weather" className={`hover:text-blue-500 transition ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Weather</Link>
            <Link href="/history" className="font-medium text-blue-500">History</Link>
            <Link href="/about" className={`hover:text-blue-500 transition ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>About</Link>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Weather History</h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your recently searched locations
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-500'}`}></div>
          </div>
        ) : error ? (
          <div className={`max-w-md mx-auto p-4 rounded-lg ${darkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'}`}>
            <p>{error}</p>
          </div>
        ) : history.length === 0 ? (
          <div className={`max-w-md mx-auto p-8 text-center rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No search history yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {history.map((item) => (
              <div 
                key={item._id}
                className={`relative w-full max-w-xs h-80 cursor-pointer transition-all duration-500 [transform-style:preserve-3d] ${
                  flippedCard === item._id ? '[transform:rotateY(180deg)]' : ''
                }`}
                onClick={() => handleCardClick(item._id)}
              >
                {/* Front of Card (City Name) */}
                <div className={`absolute inset-0 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center [backface-visibility:hidden] ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}>
                  <div className="relative w-24 h-24 mb-6">
                    <Image
                      src={getWeatherIcon(item.condition)}
                      alt={item.condition}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-center">{item.city}</h3>
                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click to see details</p>
                  <div className="absolute bottom-4 right-4 text-sm opacity-70">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>

                {/* Back of Card (Weather Details) */}
                <div className={`absolute inset-0 rounded-xl shadow-lg p-6 flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                  darkMode ? 'bg-gray-700' : 'bg-blue-100'
                }`}>
                  <h3 className="text-xl font-bold mb-4">{item.city}</h3>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {item.temperature}°C
                    </span>
                    <div className="relative w-16 h-16">
                      <Image
                        src={getWeatherIcon(item.condition)}
                        alt={item.condition}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className={`space-y-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Condition:</span>
                      <span className="capitalize">{item.condition}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Humidity:</span>
                      <span>{item.humidity}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Wind:</span>
                      <span>{item.windSpeed} km/h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Updated:</span>
                      <span>{new Date(item.date).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}