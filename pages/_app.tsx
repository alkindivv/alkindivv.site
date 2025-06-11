import '@/styles/globals.css';
import '@/styles/animations.css';
import '@/styles/nprogress.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import GoogleAnalytics from '@/components/shared/GoogleAnalytics';
import { useRouterLoading } from '@/lib/hooks/useRouterLoading';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { EventEmitter } from 'events';

// Meningkatkan batas MaxListeners untuk mencegah memory leak
if (typeof EventEmitter !== 'undefined') {
  // Meningkatkan batas default listener dari 10 menjadi 20
  EventEmitter.defaultMaxListeners = 20;
}

function MyApp({ Component, pageProps }: AppProps) {
  // Global router loading - hanya 1x untuk seluruh app
  useRouterLoading();

  // Memastikan NProgress terlihat di production
  useEffect(() => {
    // Force konfigurasi NProgress di client side
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.08,
      easing: 'ease',
      speed: 400,
    });

    // Force membersihkan NProgress jika ada instance sebelumnya
    NProgress.remove();

    // Log untuk debugging
    if (process.env.NODE_ENV === 'production') {
      console.log('[NProgress] Initialized in _app.tsx');
    }
  }, []);

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
