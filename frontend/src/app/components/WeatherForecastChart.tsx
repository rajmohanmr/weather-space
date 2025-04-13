'use client'
import { useEffect, useState } from 'react'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  BarElement
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ForecastData {
  date: string
  maxTemp: number
  minTemp: number
  condition: string
  icon: string
  humidity: number
  chanceOfRain: number
}

interface WeatherForecastChartProps {
  city: string
  darkMode: boolean
}

export default function WeatherForecastChart({ city, darkMode }: WeatherForecastChartProps) {
  const [forecast, setForecast] = useState<ForecastData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) return
      
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=3adf7b53882242608a2170921251204&q=${city}&days=7`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch forecast data')
        }
        
        const data = await response.json()
        
        const forecastData = data.forecast.forecastday.map((day: any) => ({
          date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
          maxTemp: day.day.maxtemp_c,
          minTemp: day.day.mintemp_c,
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
          humidity: day.day.avghumidity,
          chanceOfRain: day.day.daily_chance_of_rain
        }))
        
        setForecast(forecastData)
      } catch (err) {
        setError('Failed to load forecast data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchForecast()
  }, [city])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-500'}`}></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'}`}>
        <p>{error}</p>
      </div>
    )
  }

  if (forecast.length === 0) {
    return null
  }

  // Temperature chart data
  const temperatureData = {
    labels: forecast.map(day => day.date),
    datasets: [
      {
        label: 'Max Temperature (°C)',
        data: forecast.map(day => day.maxTemp),
        borderColor: darkMode ? 'rgb(59, 130, 246)' : 'rgb(37, 99, 235)',
        backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.5)',
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Min Temperature (°C)',
        data: forecast.map(day => day.minTemp),
        borderColor: darkMode ? 'rgb(147, 197, 253)' : 'rgb(96, 165, 250)',
        backgroundColor: darkMode ? 'rgba(147, 197, 253, 0.5)' : 'rgba(96, 165, 250, 0.5)',
        tension: 0.3,
        yAxisID: 'y',
      },
    ],
  }

  // Rain chance chart data
  const rainData = {
    labels: forecast.map(day => day.date),
    datasets: [
      {
        label: 'Chance of Rain (%)',
        data: forecast.map(day => day.chanceOfRain),
        backgroundColor: darkMode ? 'rgba(147, 197, 253, 0.7)' : 'rgba(96, 165, 250, 0.7)',
        borderColor: darkMode ? 'rgb(147, 197, 253)' : 'rgb(96, 165, 250)',
        borderWidth: 1,
      },
    ],
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? 'rgb(229, 231, 235)' : 'rgb(31, 41, 55)',
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)',
        },
        ticks: {
          color: darkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
        },
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.5)',
        },
        ticks: {
          color: darkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
        },
      },
    },
  }

  return (
    <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        7-Day Forecast for {city}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Temperature Trend
          </h3>
          <div className="h-64">
            <Line data={temperatureData} options={chartOptions} />
          </div>
        </div>
        
        <div>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Chance of Rain
          </h3>
          <div className="h-64">
            <Bar data={rainData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Daily Forecast
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {forecast.map((day, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}
            >
              <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {day.date}
              </p>
              <div className="flex items-center justify-center my-2">
                <img 
                  src={day.icon} 
                  alt={day.condition} 
                  className="w-12 h-12"
                />
              </div>
              <div className="text-center">
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(day.maxTemp)}°C
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {Math.round(day.minTemp)}°C
                </p>
              </div>
              <p className={`text-xs text-center mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {day.condition}
              </p>
              <div className="mt-2 flex justify-between text-xs">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Humidity: {day.humidity}%
                </span>
                <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>
                  Rain: {day.chanceOfRain}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 