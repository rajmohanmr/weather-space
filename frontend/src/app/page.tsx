'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from './components/Navbar'

export default function Home() {
  const [search, setSearch] = useState('')
  const [locationWeather, setLocationWeather] = useState<any>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [searchedCityWeather, setSearchedCityWeather] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])
  const [darkMode, setDarkMode] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // Check for user's preferred color scheme
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)
  }, [])

  // Fetch weather for current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const res = await fetch(
              `https://api.weatherapi.com/v1/current.json?key=3adf7b53882242608a2170921251204&q=${latitude},${longitude}`
            )
            const data = await res.json()
            setLocationWeather(data)
          } catch (error) {
            setLocationError('Failed to fetch weather data.')
          }
        },
        () => {
          setLocationError('Location permission denied.')
        }
      )
    } else {
      setLocationError('Geolocation is not supported.')
    }

    // Fetch search history from the server
    const fetchHistory = async () => {
      const response = await fetch('http://localhost:5000/api/weather/history');
      const data = await response.json();
      setHistory(data);
    };

    fetchHistory();
  }, [])

  const handleSearch = async () => {
    if (search.trim()) {
      const res = await fetch(`http://localhost:5000/api/weather/search?city=${search.trim()}`);
      const data = await res.json();
      setSearchedCityWeather(data);
    }
  }

  

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('weatherSpaceDarkMode', darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800'
    }`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} currentPage="home" />
      
      {/* Main Content */}
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <div className="flex justify-center mt-8">
          <input
            type="text"
            placeholder="Search for a city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`px-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-l-md w-full max-w-md`}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
          >
            Search
          </button>
        </div>

        {/* Current Location Weather Card */}
        <div className={`rounded-2xl shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-center`}>
          <h2 className="text-xl font-semibold mb-2">Current Location</h2>
          {locationError ? (
            <p className="text-red-500">{locationError}</p>
          ) : locationWeather ? (
            <>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {locationWeather.location.name}, {locationWeather.location.region}
              </p>
              <div className="mt-4">
                <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {locationWeather.current.temp_c}°C
                </p>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {locationWeather.current.condition.text}
                </p>
              </div>
            </>
          ) : (
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Detecting...</p>
          )}
        </div>

        {/* Searched City Weather */}
        {searchedCityWeather && (
          <div className={`rounded-2xl shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-center`}>
            <h2 className="text-xl font-semibold mb-2">Searched City: {searchedCityWeather.location.name}</h2>
            <div className="mt-4">
              <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {searchedCityWeather.current.temp_c}°C
              </p>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                {searchedCityWeather.current.condition.text}
              </p>
            </div>
          </div>
        )}

        {/* History */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Search History</h2>
          {history.length === 0 ? (
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No search history available.</p>
          ) : (
            history.map((item: any, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-50'} transition-colors cursor-pointer`}
                onClick={() => router.push(`/weather?city=${item.city}`)}
              >
                <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.city}</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.temperature}°C - {item.condition}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}