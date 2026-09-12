import type { Metadata } from 'next'
import './globals.css'

import { Navbar } from '@/components/layout/Navbar'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { GSAPInit } from '@/components/layout/GSAPInit'
import { Toaster } from 'react-hot-toast'

// ✅ Next.js Font Optimization
import { Syne, DM_Sans } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-head',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Zenvy Digital — We Build Digital Experiences That Convert',
  description:
    'Zenvy Digital crafts high-performance websites, e-commerce stores, brand identities, SEO strategies, and digital marketing solutions for startups and growing businesses.',
  keywords: [
    'digital agency',
    'web design',
    'web development',
    'SEO',
    'branding',
    'UI/UX design',
    'digital marketing',
  ],
  openGraph: {
    title: 'Zenvy Digital',
    description: 'We Build Digital Experiences That Convert',
    url: 'https://zenvy.digital',
    siteName: 'Zenvy Digital',
    type: 'website',
  },
}

// ✅ Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body">
        {/* GSAP Init first */}
        <GSAPInit />

        {/* UI Enhancements */}
        <CustomCursor />
        <ScrollProgress />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main style={{ paddingTop: 'var(--navbar-height, 68px)' }}>
          {children}
        </main>

        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
            },
          }}
        />
      </body>
    </html>
  )
}