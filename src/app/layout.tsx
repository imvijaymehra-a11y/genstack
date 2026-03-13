import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'GenStacker - 41+ AI Tools for Content Creation & Marketing',
    template: '%s | GenStacker AI Tools'
  },
  description: 'Discover 41+ powerful AI tools for content creation, marketing, writing, coding, and more. Generate high-quality content, images, and marketing copy with advanced AI technology. Free and premium plans available.',
  keywords: [
    'AI tools',
    'AI content generator',
    'AI writing tools',
    'AI marketing tools',
    'content creation AI',
    'AI image generator',
    'AI copywriting',
    'AI SEO tools',
    'AI blog writer',
    'AI social media tools',
    'AI video generator',
    'AI code generator',
    'AI email marketing',
    'AI ad copy',
    'AI product descriptions',
    'AI headline generator',
    'AI paraphrasing tool',
    'AI summarizer',
    'AI translation',
    'AI proofreading',
    'free AI tools',
    'ChatGPT alternatives',
    'AI assistant',
    'artificial intelligence tools',
    'machine learning tools',
    'automation tools',
    'productivity AI',
    'business AI tools'
  ],
  authors: [{ name: 'GenStacker Team' }],
  creator: 'GenStacker',
  publisher: 'GenStacker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://genstacker.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-GB': '/en-GB',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://genstacker.com',
    title: 'GenStacker - 41+ AI Tools for Content Creation & Marketing',
    description: 'Discover 41+ powerful AI tools for content creation, marketing, writing, coding, and more. Generate high-quality content with advanced AI technology.',
    siteName: 'GenStacker',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GenStacker - AI Tools Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenStacker - 41+ AI Tools for Content Creation & Marketing',
    description: 'Discover 41+ powerful AI tools for content creation, marketing, writing, and more. Generate high-quality content with advanced AI technology.',
    images: ['/og-image.jpg'],
    creator: '@genstacker',
    site: '@genstacker',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GenStacker",
              "url": "https://genstacker.com",
              "logo": "https://genstacker.com/logo.png",
              "description": "AI-powered platform with 41+ tools for content creation, marketing, writing, and more.",
              "sameAs": [
                "https://twitter.com/genstacker",
                "https://facebook.com/genstacker",
                "https://linkedin.com/company/genstacker"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "support@genstacker.com"
              }
            })
          }}
        />
        
        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GenStacker",
              "url": "https://genstacker.com",
              "description": "AI-powered platform with 41+ tools for content creation, marketing, writing, and more.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://genstacker.com/tools?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* Structured Data for Software Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "GenStacker AI Tools",
              "description": "AI-powered platform with 41+ tools for content creation, marketing, writing, and more.",
              "url": "https://genstacker.com",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free plan with premium features available"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250",
                "bestRating": "5"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
