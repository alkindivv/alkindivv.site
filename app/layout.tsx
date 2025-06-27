import './globals.css';
import './animations.css';
import 'nprogress/nprogress.css';
import './nprogress.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import GoogleAnalytics from '@/components/shared/GoogleAnalytics';
import { EventEmitter } from 'events';
import NavigationEvents from '@/components/shared/NavigationEvents';
import LoadingOverlay from '@/components/layout/LoadingOverlay';
import { PHASE_DEVELOPMENT_SERVER } from 'next/dist/shared/lib/constants';

// Increase MaxListeners limit to prevent memory leaks
if (typeof EventEmitter !== 'undefined') {
  EventEmitter.defaultMaxListeners = 20;
}

// Define viewport export
export const viewport: Viewport = {
  themeColor: '#08a875',
};

// Load Google Inter font (swap, preload)
const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true });

export const metadata: Metadata = {
  title: {
    default: 'AL KINDI - Law, Technology, and Cryptocurrency',
    template: '%s | AL KINDI',
  },
  description:
    'A personal blog about law, technology, and cryptocurrency — shaping the future of blockchain and tech law',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site'
  ),
  keywords: [
    // Primary Keywords
    'AL KINDI',
    'Corporate Law',
    'Technology Law',
    'Blockchain',
    'Cryptocurrency',
    'Mergers & Acquisitions',
    'Capital Markets',

    // Secondary Keywords
    'Legal Tech',
    'Smart Contracts',
    'DeFi',
    'Web3',
    'Corporate Legal',
    'Tech Lawyer',
    'Blockchain Law',
    'Crypto Regulations',
    'M&A Transactions',
    'Capital Markets Law',

    // Long-tail Keywords
    'Blockchain Legal Framework',
    'Cryptocurrency Regulations Indonesia',
    'Digital Asset Law',
    'Corporate Law Technology',
    'Legal Technology Solutions',
    'Mergers Acquisitions Technology Sector',

    // Indonesian Keywords
    'Hukum Teknologi',
    'Hukum Korporasi',
    'Blockchain Indonesia',
    'Regulasi Cryptocurrency Indonesia',
    'Merger dan Akuisisi',
    'Pasar Modal',
  ],
  authors: [{ name: 'AL KINDI', url: 'https://alkindivv.site' }],
  creator: 'AL KINDI',
  publisher: 'AL KINDI',
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
  openGraph: {
    title: 'AL KINDI - Law, Technology, and Cryptocurrency',
    description:
      'A personal blog about law, technology, and cryptocurrency — shaping the future of blockchain and tech law',
    url: 'https://alkindivv.site',
    siteName: 'AL KINDI',
    images: [
      {
        url: '/images/default.png',
        width: 1200,
        height: 630,
        alt: 'AL KINDI - Law, Technology, and Cryptocurrency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AL KINDI - Law, Technology, and Cryptocurrency',
    description:
      'A personal blog about law, technology, and cryptocurrency — shaping the future of blockchain and tech law',
    images: ['/images/default.png'],
  },
  icons: {
    icon: [
      '/favicon.ico',
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
    ],
    other: [
      {
        rel: 'shortcut icon',
        url: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        rel: 'ms-icon',
        url: '/ms-icon-150x150.png',
        sizes: '150x150',
        type: 'image/png',
      },
      {
        rel: 'ms-icon',
        url: '/ms-icon-310x310.png',
        sizes: '310x310',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'geo.region': 'ID',
    'geo.placename': 'Indonesia',
    'dc.language': 'id',
    'content-language': 'id',
    // 'google-site-verification': 'tLWZliQliSbsSXo5T_8Q2d2d5RRHTau1da3C5lt3pN8',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
      'application/atom+xml': '/atom.xml',
    },
  },
  category: 'Legal Technology',
};

// Generate default JSON-LD schema
function generateDefaultSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Website Schema
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'AL KINDI',
        description: ' s ',
        publisher: {
          '@id': `${baseUrl}/#person`,
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        ],
        inLanguage: 'id-ID',
      },
      // Person/Author Schema
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'AL KINDI',
        image: {
          '@type': 'ImageObject',
          '@id': `${baseUrl}/#personlogo`,
          inLanguage: 'id-ID',
          url: `${baseUrl}/images/AL-KINDI.png`,
          contentUrl: `${baseUrl}/images/AL-KINDI.png`,
          width: 400,
          height: 400,
          caption: 'AL KINDI',
        },
        description:
          'A law graduate focusing my expertise in corporate M&A, capital markets, cryptocurrency and blockchain technology',
        sameAs: [
          'https://twitter.com/alkindivv',
          'https://linkedin.com/in/alkindivv',
          'https://github.com/alkindivv',
        ],
        url: baseUrl,
        jobTitle: 'Legal Intern',
        worksFor: {
          '@type': 'Organization',
          name: 'Law Firm',
        },
        knowsAbout: [
          'Corporate Law',
          'Capital Markets',
          'Mergers and Acquisitions',
          'Bankruptcy Law',
          'Cryptocurrency Regulations',
          'Legal Technology',
          'Smart Contracts',
          'DeFi',
          'Web3',
          'Corporate Legal',
          'Tech Lawyer',
          'Blockchain Law',
          'Crypto Regulations',
          'web developer',
          'smart contract developer',
          'lawyer',
          'law firm',
          'law firm lawyer',
        ],
      },
      // Organization Schema
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'AL KINDI',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          inLanguage: 'id-ID',
          '@id': `${baseUrl}/#logo`,
          url: `${baseUrl}/images/default.png`,
          contentUrl: `${baseUrl}/images/default.png`,
          width: 1200,
          height: 630,
          caption: 'AL KINDI',
        },
        image: {
          '@id': `${baseUrl}/#logo`,
        },
        sameAs: [
          'https://twitter.com/alkindivv',
          'https://linkedin.com/in/alkindivv',
        ],
      },
    ],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Preconnect untuk performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preload critical resources */}
        <link
          rel="prefetch"
          href="/images/AL-KINDI.png"
          as="image"
          type="image/png"
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateDefaultSchema()),
          }}
        />
      </head>
      <body className={`${inter.className} text-white`}>
        <LoadingOverlay />
        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* Komponen untuk mendeteksi navigasi dan memicu NProgress */}
        <NavigationEvents />

        <main>{children}</main>
      </body>
    </html>
  );
}
