import '@/styles/globals.css';
import '@/styles/animations.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import GoogleAnalytics from '@/components/shared/GoogleAnalytics';
import { useRouterLoading } from '@/lib/hooks/useRouterLoading';

function MyApp({ Component, pageProps }: AppProps) {
  // Global router loading - hanya 1x untuk seluruh app
  useRouterLoading();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0a0a0a" />

        {/* Favicon */}
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
      </Head>

      {/* Google Analytics */}
      <GoogleAnalytics />

      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
