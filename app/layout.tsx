import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { SITE_NAME, SITE_TAGLINE, SITE_PHONE, SITE_ADDRESS } from '@/lib/constants'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `Professional residential and commercial cleaning services in West Point GA, LaGrange GA, Columbus GA, Opelika AL & Auburn AL. Call ${SITE_PHONE} for a free quote.`,
  keywords: ['cleaning service', 'house cleaning', 'maid service', 'West Point GA', 'LaGrange GA', 'Columbus GA', 'Auburn AL', 'Opelika AL'],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  metadataBase: new URL('https://rainwatershine.com'),
  alternates: {
    canonical: 'https://rainwatershine.com',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: `Professional residential and commercial cleaning in West Point GA, LaGrange GA, Columbus GA, Opelika AL & Auburn AL.`,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#E8368A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.className} bg-background`}>
      <body className="antialiased font-sans">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
