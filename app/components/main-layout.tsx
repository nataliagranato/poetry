'use client'

import { Navbar } from './nav'
import { Footer } from './footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
      <Navbar />
      {children}
      <Footer />
      <Analytics />
      <SpeedInsights />
    </main>
  )
} 