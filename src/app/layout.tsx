import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ContentForge - AI Content Generator for Social Media',
  description: 'Generate viral content for Twitter, LinkedIn, Instagram with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-white">{children}</body>
    </html>
  )
}
