import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReduxProvider from '../redux/provider'
import '98.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MineSweeper Game Online',
  description: 'classic minesweeper game online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
