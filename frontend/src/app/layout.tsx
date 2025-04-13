// app/layout.tsx
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weather Space',
  description: 'Get weather updates around the globe',
  icons: {
    icon: '/weather-space-logo.svg',
    apple: '/weather-space-logo.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  )
}
