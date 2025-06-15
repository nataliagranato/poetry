'use client'

import { ThemeProvider } from './theme-provider'
import { ThemeToggle } from './theme-toggle'
import { Navbar } from './nav'
import Footer from './footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </main>
    </ThemeProvider>
  )
} 