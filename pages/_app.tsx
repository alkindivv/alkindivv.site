import '@/styles/globals.css';
import '@/styles/animations.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
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
    'Explore insights about law, technology, and their intersection. Articles about corporate law, capital markets, and legal tech innovations.',
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
  const router = useRouter();

  // Add loading indicator
  useEffect(() => {
    const handleStart = () => {
      document.body.classList.add('loading');
    };
    const handleComplete = () => {
      document.body.classList.remove('loading');
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

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
