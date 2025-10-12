import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Finance Dashboard',
  description: 'Your personal finance dashboard',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-200`}>{children}</body>
      </html>
  )
}