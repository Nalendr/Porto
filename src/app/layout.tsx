import type { Metadata } from 'next'
import { Shippori_Mincho, Space_Grotesk } from 'next/font/google'
import './globals.css'

const shippori = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-shippori',
  display: 'swap',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yuki Kawamoto — Software Developer',
  description: 'Full-stack software developer. Precision engineering, from architecture to interaction.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${shippori.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  )
}
