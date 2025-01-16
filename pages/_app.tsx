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

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log(`App is changing to: ${url}`);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'id_ID',
          url: 'https://alkindivv.site',
          site_name: 'AL KINDI',
        }}
        twitter={{
          handle: '@alkindivv',
          site: '@alkindivv',
          cardType: 'summary_large_image',
        }}
      />
      <SEO />
      <main>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </SessionProvider>
  );
}

export default MyApp;
