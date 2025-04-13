'use client'
import Link from 'next/link'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  currentPage?: string
}

export default function Navbar({ darkMode, setDarkMode, currentPage = '' }: NavbarProps) {
  return (
    <nav className={`px-6 py-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          WeatherSpace
        </Link>
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className={`hover:text-blue-500 transition ${
              currentPage === 'home' 
                ? `font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/weather" 
            className={`hover:text-blue-500 transition ${
              currentPage === 'weather'
                ? `font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}
          >
            Weather
          </Link>
          <Link 
            href="/history" 
            className={`hover:text-blue-500 transition ${
              currentPage === 'history'
                ? `font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}
          >
            History
          </Link>
          <Link 
            href="/about" 
            className={`hover:text-blue-500 transition ${
              currentPage === 'about'
                ? `font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}
          >
            About
          </Link>
          <button 
            onClick={() => setDarkMode(!darkMode)}
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
  )
} 