import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'A&K Booking System',
  description: 'Professional property booking system with flexible weekly and short-term stay options',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-grotesk">
        {children}
      </body>
    </html>
  )
}
