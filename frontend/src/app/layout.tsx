// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'Weather Space',
  description: 'Get weather updates around the globe',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  )
}
