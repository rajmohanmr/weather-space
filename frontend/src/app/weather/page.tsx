'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import WeatherForecastChart from '../components/WeatherForecastChart'

interface WeatherData {
  city: string
  country: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  windDirection: string
  pressure: number
  visibility: number
  uvIndex: number
  icon: string
  feelsLike: number
  observationTime: string
}

interface MajorCity {
  city: string
  key: string
  coordinates: {
    lat: number
    lon: number
  }
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [majorCities, setMajorCities] = useState<MajorCity[]>([
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
  ])
  const [majorCitiesWeather, setMajorCitiesWeather] = useState<Record<string, WeatherData>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  // Get weather icon with fallback
  const getWeatherIcon = (iconUrl?: string) => {
    if (!iconUrl) return '/weather-icons/default.svg'
    return iconUrl.startsWith('//') ? `https:${iconUrl}` : iconUrl
  }

  // Set initial dark mode preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)
  }, [])

  // Fetch weather for major cities
  useEffect(() => {
    const fetchMajorCitiesWeather = async () => {
      try {
        const weatherPromises = majorCities.map(async (city) => {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=3adf7b53882242608a2170921251204&q=${city.coordinates.lat},${city.coordinates.lon}`
          )
          const data = await response.json()
          return {
            key: city.key,
            data: {
              city: data.location.name,
              country: data.location.country,
              temperature: data.current.temp_c,
              condition: data.current.condition.text,
              humidity: data.current.humidity,
              windSpeed: data.current.wind_kph,
              windDirection: data.current.wind_dir,
              pressure: data.current.pressure_mb,
              visibility: data.current.vis_km,
              uvIndex: data.current.uv,
              icon: data.current.condition.icon,
              feelsLike: data.current.feelslike_c,
              observationTime: data.current.last_updated
            }
          }
        })

        const results = await Promise.all(weatherPromises)
        const weatherMap = results.reduce((acc, { key, data }) => {
          acc[key] = data
          return acc
        }, {} as Record<string, WeatherData>)
        
        setMajorCitiesWeather(weatherMap)
      } catch (err) {
        console.error('Failed to fetch major cities weather:', err)
      }
    }

    fetchMajorCitiesWeather()
    // Refresh every 30 minutes
    const interval = setInterval(fetchMajorCitiesWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [majorCities])

  // Mock API fetch function
  const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData: WeatherData = {
          city: city,
          country: city === "New York" ? "USA" : 
                  city === "London" ? "UK" : 
                  city === "Tokyo" ? "Japan" : 
                  city === "Sydney" ? "Australia" : 
                  city === "Paris" ? "France" : 
                  city === "Dubai" ? "UAE" : 
                  city === "Singapore" ? "Singapore" : 
                  city === "Moscow" ? "Russia" : "Country",
          temperature: Math.floor(Math.random() * 30) + 10,
          condition: ["Sunny", "Cloudy", "Rainy", "Thunderstorm", "Snowy"][Math.floor(Math.random() * 5)],
          humidity: Math.floor(Math.random() * 50) + 30,
          windSpeed: Math.floor(Math.random() * 30) + 5,
          windDirection: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
          pressure: Math.floor(Math.random() * 30) + 990,
          visibility: Math.floor(Math.random() * 10) + 5,
          uvIndex: Math.floor(Math.random() * 10) + 1,
          icon: ["https://cdn.weatherapi.com/weather/64x64/day/113.png",
                "https://cdn.weatherapi.com/weather/64x64/day/116.png",
                "https://cdn.weatherapi.com/weather/64x64/day/119.png",
                "https://cdn.weatherapi.com/weather/64x64/day/176.png",
                "https://cdn.weatherapi.com/weather/64x64/day/179.png",
                "https://cdn.weatherapi.com/weather/64x64/day/200.png"][Math.floor(Math.random() * 6)],
          feelsLike: Math.floor(Math.random() * 30) + 10,
          observationTime: new Date().toISOString()
        }
        resolve(mockData)
      }, 800)
    })
  }

  // Handle city search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    try {
      setLoading(true)
      setError('')
      
      const data = await fetchWeatherData(searchQuery)
      setWeather(data)
      setSearchQuery('')
    } catch (err) {
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  // Handle major city click
  const handleCityClick = async (city: string) => {
    try {
      setLoading(true)
      setError('')
      setSelectedCity(city)
      
      const cityData = majorCitiesWeather[city.toLowerCase().replace(/\s+/g, '-')]
      if (cityData) {
        setWeather(cityData)
      } else {
        const data = await fetchWeatherData(city)
        setWeather(data)
      }
    } catch (err) {
      setError('Failed to fetch city data')
    } finally {
      setLoading(false)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Current'
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-blue-200 text-gray-800'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        {selectedCity ? (
          <>
            <div className="mb-8">
              <button
                onClick={() => setSelectedCity(null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                } shadow-lg`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Cities
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`p-8 rounded-2xl shadow-xl backdrop-blur-sm ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
                <h2 className="text-3xl font-bold mb-6">{selectedCity}</h2>
                {weather && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50/50'}`}>
                          <img
                            src={getWeatherIcon(weather.icon)}
                            alt={weather.condition}
                            className="w-20 h-20"
                          />
                        </div>
                        <div>
                          <p className="text-5xl font-bold mb-2">{Math.round(weather.temperature)}°C</p>
                          <p className="text-xl text-blue-500">{weather.condition}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg mb-1">Feels like {Math.round(weather.feelsLike)}°C</p>
                        <p className="text-lg">Humidity: {Math.round(weather.humidity)}%</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-blue-50/50 hover:bg-blue-50'}`}>
                        <p className="text-lg font-medium mb-2">Wind</p>
                        <p className="text-3xl font-bold mb-2">{Math.round(weather.windSpeed)} km/h</p>
                        <p className="text-blue-500">{weather.windDirection}</p>
                      </div>
                      <div className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-blue-50/50 hover:bg-blue-50'}`}>
                        <p className="text-lg font-medium mb-2">Precipitation</p>
                        <p className="text-3xl font-bold mb-2">{Math.round(weather.pressure)} hPa</p>
                        <p className="text-blue-500">Last updated: {formatDate(weather.observationTime)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className={`p-8 rounded-2xl shadow-xl backdrop-blur-sm ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
                <WeatherForecastChart city={selectedCity} darkMode={darkMode} />
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a city..."
                  className={`flex-1 p-4 pl-12 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white font-medium shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Weather Details Section */}
        {loading && !weather ? (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${darkMode ? 'border-blue-400' : 'border-blue-500'}`}></div>
          </div>
        ) : error ? (
          <div className={`max-w-md mx-auto p-6 rounded-xl text-center ${darkMode ? 'bg-red-900/50 text-red-100' : 'bg-red-100 text-red-800'}`}>
            <p className="text-xl mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className={`px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                darkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-200 hover:bg-red-300'
              }`}
            >
              Reload Page
            </button>
          </div>
        ) : weather ? (
          <div className={`max-w-4xl mx-auto rounded-2xl shadow-xl p-8 mb-12 backdrop-blur-sm ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {weather.city}, {weather.country}
                </h1>
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formatDate(weather.observationTime)}
                </p>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <div className={`p-4 rounded-xl mr-4 ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50/50'}`}>
                  <Image
                    src={getWeatherIcon(weather.icon)}
                    alt={weather.condition}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-6xl font-bold mb-2">{weather.temperature}°C</div>
                  <div className="text-2xl text-blue-500 capitalize">{weather.condition}</div>
                </div>
              </div>
            </div>

            {/* Weather Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-blue-50/50 hover:bg-blue-50'}`}>
                <h3 className="text-lg font-medium text-gray-500 mb-2">Feels Like</h3>
                <div className="text-3xl font-bold">{weather.feelsLike}°C</div>
              </div>
              <div className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-blue-50/50 hover:bg-blue-50'}`}>
                <h3 className="text-lg font-medium text-gray-500 mb-2">Humidity</h3>
                <div className="text-3xl font-bold">{weather.humidity}%</div>
              </div>
              <div className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-blue-50/50 hover:bg-blue-50'}`}>
                <h3 className="text-lg font-medium text-gray-500 mb-2">Wind</h3>
                <div className="text-3xl font-bold">{weather.windSpeed} km/h</div>
                <div className="text-blue-500">{weather.windDirection}</div>
              </div>
              <div className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-blue-50/50 hover:bg-blue-50'}`}>
                <h3 className="text-lg font-medium text-gray-500 mb-2">Pressure</h3>
                <div className="text-3xl font-bold">{weather.pressure} hPa</div>
              </div>
              <div className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-blue-50/50 hover:bg-blue-50'}`}>
                <h3 className="text-lg font-medium text-gray-500 mb-2">Visibility</h3>
                <div className="text-3xl font-bold">{weather.visibility} km</div>
              </div>
              <div className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-blue-50/50 hover:bg-blue-50'}`}>
                <h3 className="text-lg font-medium text-gray-500 mb-2">UV Index</h3>
                <div className="text-3xl font-bold">{weather.uvIndex}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`max-w-md mx-auto p-8 rounded-xl text-center mb-12 backdrop-blur-sm ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} shadow-xl`}>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Search for a city or click on a major city to see weather</p>
          </div>
        )}

        {/* Major Cities Section */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Major Cities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {majorCities.map((city) => {
              const cityWeather = majorCitiesWeather[city.key]
              return (
                <div
                  key={city.key}
                  onClick={() => handleCityClick(city.city)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                    darkMode ? 'bg-gray-800/90 hover:bg-gray-700/90' : 'bg-white/90 hover:bg-blue-50/90'
                  } shadow-xl backdrop-blur-sm`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{city.city}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {cityWeather ? cityWeather.condition : 'Loading...'}
                      </p>
                    </div>
                    {cityWeather && (
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50/50'}`}>
                        <Image
                          src={getWeatherIcon(cityWeather.icon)}
                          alt={cityWeather.condition}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-4xl font-bold">
                    {cityWeather ? `${cityWeather.temperature}°C` : '--'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}