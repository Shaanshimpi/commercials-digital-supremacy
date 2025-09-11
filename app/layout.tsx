import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Digital Supremacy - Outcome-Based Marketing & Web Solutions',
  description: 'We don\'t sell services. We deliver outcomes. Websites that convert, marketing that scales, and governance that keeps us accountable.',
  generator: 'Digital Supremacy',
  icons: {
    icon: '/white-logo.png',
    shortcut: '/white-logo.png',
    apple: '/white-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
