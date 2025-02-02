import '@/styles/globals.css';
import '@/styles/animations.css';

import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';
import dynamic from 'next/dynamic';

// Dynamic imports for non-critical components
const SEO = dynamic(() => import('@/components/shared/SEO'), {
  ssr: true,
});

const defaultSEOConfig = {
  title: 'AL KINDI - Personal Website and Blog',
  description:
    'Explore insights about law, technology, and their intersection. Articles about corporate mergers and acquisitions, capital markets, restructuring & insolvency, and legal tech innovations.',
  canonical: 'https://alkindivv.site',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://alkindivv.site',
    siteName: 'AL KINDI',
    title: 'AL KINDI - Personal Website and Blog',
    description:
      'Explore insights about law, technology, and their intersection. Articles about corporate law, capital markets, and legal tech innovations.',
    images: [
      {
        url: '/images/AL-KINDI.png',
        width: 1200,
        height: 630,
        alt: 'AL KINDI',
      },
    ],
  },
  twitter: {
    handle: '@alkindivv',
    site: '@alkindivv',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'theme-color',
      content: '#0a0a0a',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/images/AL-KINDI.png',
      sizes: '180x180',
    },
  ],
};

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();

  return (
    <SessionProvider>
      <DefaultSeo {...defaultSEOConfig} />
      <SEO />
      <main>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </SessionProvider>
  );
}

export default MyApp;
