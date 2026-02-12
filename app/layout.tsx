import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Design Impact - Environmental Assessment Tool',
  description: 'A design focused impact and life cycle assessment program for hardware products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
