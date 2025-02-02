import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
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
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: 'https://alkindivv.site',
  },
  category: 'Legal Technology',
  other: {
    'geo.region': 'ID',
    'geo.placename': 'Indonesia',
    'dc.language': 'id',
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
        <meta name="theme-color" content="#111111" />
      </head>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
