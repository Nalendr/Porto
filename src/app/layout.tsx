import type { Metadata } from 'next'
import { Shippori_Mincho, Space_Grotesk } from 'next/font/google'
import DifferenceCursor from '@/components/DifferenceCursor'
import './globals.css'

const shippori = Shippori_Mincho({
  weight: ['400', '600', '800'],
  variable: '--font-shippori',
  display: 'swap',
  preload: false,
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fauzya Shubhi Nalendrasidi — Software Developer',
  description: 'Informatics student specializing in backend systems, RESTful API integration, and data-driven applications.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${shippori.variable} ${grotesk.variable}`}>
      <body>
        <DifferenceCursor />
        {children}
      </body>
    </html>
  )
}
