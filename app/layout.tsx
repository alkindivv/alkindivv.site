import { Metadata, Viewport } from 'next';
import './globals.css';
import { headers } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://alkindivv.site'),
    title: {
      template: '%s | AL KINDI',
      default: 'AL KINDI - Law, Technology & Blockchain Expert',
    },
    description:
      'Personal website of AL KINDI - A professional with expertise in Corporate Law, Technology, and Blockchain. Sharing insights on Mergers & Acquisitions, Capital Markets, and Cryptocurrency.',
    applicationName: 'AL KINDI Website',
    referrer: 'origin-when-cross-origin',
    keywords: [
      'AL KINDI',
      'Corporate Law',
      'Technology Law',
      'Blockchain',
      'Cryptocurrency',
      'Mergers & Acquisitions',
      'Capital Markets',
      'Legal Tech',
      'Smart Contracts',
      'DeFi',
      'Web3',
    ],
    authors: [{ name: 'AL KINDI', url: 'https://alkindivv.site' }],
    creator: 'AL KINDI',
    publisher: 'AL KINDI',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    manifest: '/site.webmanifest',
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
    alternates: {
      canonical: 'https://alkindivv.site',
      languages: {
        'id-ID': '/id',
        'en-US': '/',
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
          url: '/opengraph-image.png',
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
      images: ['/opengraph-image.png'],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    category: 'Legal Technology',
    other: {
      'geo.region': 'ID',
      'geo.placename': 'Indonesia',
      'dc.language': 'id',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': 'AL KINDI',
    },
    appleWebApp: {
      capable: true,
      title: 'AL KINDI',
      statusBarStyle: 'black-translucent',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const locale = headersList.get('accept-language')?.split(',')[0] || 'id';

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />
        <meta name="dc.language" content={locale} />
        <meta httpEquiv="content-language" content={locale} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
      </head>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
