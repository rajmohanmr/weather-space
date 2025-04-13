'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  currentPage?: string
}

export default function Navbar({ darkMode, setDarkMode, currentPage = '' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest('.navbar-menu') && !target.closest('.navbar-toggle')) {
        setIsMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  return (
    <nav 
      className={`sticky top-0 z-50 px-4 py-3 transition-all duration-300 ${
        isScrolled 
          ? `${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} shadow-lg backdrop-blur-sm` 
          : `${darkMode ? 'bg-gray-800' : 'bg-white'}`
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          aria-label="WeatherSpace Home"
        >
          WeatherSpace
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="navbar-toggle md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        {/* Desktop navigation */}
        <div className="navbar-menu hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className={`hover:text-blue-500 transition-all duration-200 ${
              currentPage === 'home' 
                ? `font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}
            aria-current={currentPage === 'home' ? 'page' : undefined}
          >
            Home
          </Link>
          <Link 
            href="/weather" 
            className={`hover:text-blue-500 transition-all duration-200 ${
              currentPage === 'weather'
                ? `font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}
            aria-current={currentPage === 'weather' ? 'page' : undefined}
          >
            Weather
          </Link>
          <Link 
            href="/history" 
            className={`hover:text-blue-500 transition-all duration-200 ${
              currentPage === 'history'
                ? `font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}
            aria-current={currentPage === 'history' ? 'page' : undefined}
          >
            History
          </Link>
          <Link 
            href="/about" 
            className={`hover:text-blue-500 transition-all duration-200 ${
              currentPage === 'about'
                ? `font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
            }`}
            aria-current={currentPage === 'about' ? 'page' : undefined}
          >
            About
          </Link>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        id="navbar-menu"
        className={`navbar-menu md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-64 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}
      >
        <div className={`px-2 pt-2 pb-3 space-y-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-b-lg shadow-lg`}>
          <Link 
            href="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
              currentPage === 'home' 
                ? `${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-current={currentPage === 'home' ? 'page' : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/weather" 
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
              currentPage === 'weather'
                ? `${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-current={currentPage === 'weather' ? 'page' : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            Weather
          </Link>
          <Link 
            href="/history" 
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
              currentPage === 'history'
                ? `${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-current={currentPage === 'history' ? 'page' : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            History
          </Link>
          <Link 
            href="/about" 
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
              currentPage === 'about'
                ? `${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`
                : darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-current={currentPage === 'about' ? 'page' : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <button 
            onClick={() => {
              setDarkMode(!darkMode)
              setIsMenuOpen(false)
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
              darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  )
} 