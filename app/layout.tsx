import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import './globals.css'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import FloatButtons from '@/components/float-buttons'
import CustomCursor from '@/components/custom-cursor'
import RevealInit from '@/components/reveal-init'

export const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
})

export const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['500', '700'],
})

const SITE_URL = 'https://hudaconsultancy.com'
const SITE_NAME = 'Huda Consultancy'
const SITE_DESCRIPTION =
  'Huda Consultancy helps you start, manage and grow your business with confidence — business registration, GST and taxation, compliance, licenses, trademark and accounting. Based in Hyderabad, India.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Huda Consultancy — Build Your Business With Confidence',
    template: '%s | Huda Consultancy',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'business registration India',
    'GST registration Hyderabad',
    'GST filing',
    'business compliance',
    'trade license',
    'trademark registration',
    'accounting services',
    'Huda Consultancy',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  generator: 'v0.app',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Huda Consultancy — Build Your Business With Confidence',
    description: SITE_DESCRIPTION,
    images: [{ url: '/home-hero.jpg', width: 1672, height: 941, alt: 'Huda Consultancy — build your business with confidence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huda Consultancy — Build Your Business With Confidence',
    description: SITE_DESCRIPTION,
    images: ['/home-hero.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/huda-logo.svg',
    apple: '/huda-logo.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: 'hello@hudaconsultancy.com',
  telephone: '+91-8297397786',
  areaServed: ['Hyderabad', 'India'],
  knowsAbout: ['Business Registration', 'GST & Taxation', 'Compliance', 'Licenses', 'Trademark & IP', 'Accounting'],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable} bg-background`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <noscript><style>{`.reveal{opacity:1 !important;transform:none !important}`}</style></noscript>
      </head>
      <body className="antialiased font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <RevealInit />
        <div id="top">
          <a href="#main-content" className="skip-link">Skip to content</a>
          <div className="topbar">
            <div className="container topbar-inner">
              <p className="topbar-welcome"><Sparkles className="h-3.5 w-3.5" /> Welcome to Huda Consultancy — Hyderabad, India</p>
              <div className="topbar-right">
                <a href="mailto:hello@hudaconsultancy.com">hello@hudaconsultancy.com</a>
                <span className="topbar-dot" aria-hidden="true" />
                <a href="tel:+918297397786">+91 82973 97786</a>
                <span className="topbar-dot" aria-hidden="true" />
                <span className="topbar-hours">Mon – Sat, 10am – 7pm</span>
                <Link href="/contact" className="topbar-cta">Start a conversation <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          </div>
          <SiteHeader />
          <div id="main-content">{children}</div>
          <SiteFooter />
          <FloatButtons />
          <CustomCursor />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
