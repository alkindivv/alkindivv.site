import type { Metadata } from 'next';
import './globals.css';
import StructuredData from '@/components/shared/StructuredData';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'AL KINDI - Law, Technology & Blockchain Expert',
    template: '%s | AL KINDI',
  },
  description:
    'Personal website of AL KINDI - A professional with expertise in Corporate Law, Technology, and Blockchain. Sharing insights on Mergers & Acquisitions, Capital Markets, and Cryptocurrency.',
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
    type: 'website',
    locale: 'id_ID',
    alternateLocale: 'en_US',
    url: 'https://alkindivv.site',
    siteName: 'AL KINDI',
    title: 'AL KINDI - Law, Technology & Blockchain Expert',
    description:
      'Personal website of AL KINDI - A professional with expertise in Corporate Law, Technology, and Blockchain. Sharing insights on Mergers & Acquisitions, Capital Markets, and Cryptocurrency.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AL KINDI - Law, Technology & Blockchain Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AL KINDI - Law, Technology & Blockchain Expert',
    description:
      'Personal website of AL KINDI - A professional with expertise in Corporate Law, Technology, and Blockchain. Sharing insights on Mergers & Acquisitions, Capital Markets, and Cryptocurrency.',
    creator: '@alkindivv',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'tLWZliQliSbsSXo5T_8Q2d2d5RRHTau1da3C5lt3pN8',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://alkindivv.site',
    languages: {
      'id-ID': 'https://alkindivv.site',
      'en-US': 'https://alkindivv.site/en',
    },
  },
  category: 'Legal Technology',
  other: {
    'geo.region': 'ID',
    'geo.placename': 'Indonesia',
    'dc.language': 'id',
    'article:author': 'AL KINDI',
    'article:publisher': 'https://alkindivv.site',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />
        <meta name="dc.language" content="id" />
        <meta httpEquiv="content-language" content="id" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/images/AL-KINDI.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Critical CSS inline */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
              background: #000000;
              color: #ffffff;
              font-family: ui-sans-serif, system-ui, sans-serif;
            }
            .gradient-text {
              background: linear-gradient(135deg, #10b981, #34d399);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
          `,
          }}
        />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="AL KINDI Blog RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="AL KINDI Blog Atom Feed"
          href="/atom.xml"
        />
        <meta name="theme-color" content="#111111" />
        <meta name="msapplication-TileColor" content="#111111" />

        {/* Structured Data */}
        <StructuredData type="website" />
        <StructuredData type="person" />
        <StructuredData type="organization" />
      </head>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
