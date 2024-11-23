import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import '../styles/animations.css';
import { DefaultSeo } from 'next-seo';
import SEO from '@/components/SEO';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Fungsi untuk handle route change
    const handleRouteChange = (url: string) => {
      // Tambahkan analytics atau tracking di sini jika diperlukan
      console.log(`App is changing to: ${url}`);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
