import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { baseUrl } from './sitemap'
import { MainLayout } from './components/main-layout'
import { themeScript } from './theme-script'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Natália Granato',
    template: '%s | Natália Granato',
  },
  description: 'A arte da palavra escrita, falada e cantada por @nataliagranato',
  openGraph: {
    title: 'Natália Granato',
    description: 'A arte da palavra escrita, falada e cantada por @nataliagranato',
    url: baseUrl,
    siteName: 'Natália Granato',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cx(
        'text-black bg-white',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
