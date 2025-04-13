'use client'
import Image from 'next/image'

export default function WeatherCard({
  title,
  data,
  loading,
  error,
  darkMode
}: {
  title: string
  data: any
  loading: boolean
  error: string
  darkMode: boolean
}) {
  const getWeatherIcon = (condition?: string) => {
    if (!condition) return '/weather-icons/default.svg'
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes('rain')) return '/weather-icons/rain.svg'
    if (lowerCondition.includes('cloud')) return '/weather-icons/cloud.svg'
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) return '/weather-icons/sun.svg'
    return '/weather-icons/default.svg'
  }

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : data ? (
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {data.current.temp_c}°C
            </p>
            <p className={`capitalize ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {data.current.condition.text}
            </p>
          </div>
          <div className="relative w-16 h-16">
            <Image
              src={getWeatherIcon(data.current?.condition?.text)}
              alt={data.current?.condition?.text || 'Weather icon'}
              fill
              className="object-contain"
            />
          </div>
        </div>
      ) : (
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No data available</p>
      )}
    </div>
  )
}