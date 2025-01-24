import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import NProgress from 'nprogress';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  isHomePage?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  isHomePage,
  children,
  title = 'AL KINDI - Law, Technology, and Cryptocurrency',
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Konfigurasi NProgress
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.3,
    });

    const handleStart = () => {
      setIsLoading(true);
      NProgress.start();
    };

    const handleComplete = () => {
      setIsLoading(false);
      NProgress.done();
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div
      className={clsx('min-h-screen', isHomePage && 'h-screen overflow-hidden')}
    >
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="AL KINDI - Exploring the future of legal technology focus on corporate, bankruptcy and capital markets and blockchain technology."
        />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preload" as="style" href="/styles/globals.css" />

        {/* Custom styles untuk NProgress */}
        <style>{`
          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: linear-gradient(to right, #08c488, #59fbbf);
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
          }

          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px #08c488, 0 0 5px #08c488;
            opacity: 1.0;
            transform: rotate(3deg) translate(0px, -4px);
          }
        `}</style>
      </Head>
      <div
        className={clsx(
          'layout-container',
          isHomePage && 'h-screen overflow-hidden',
          isLoading ? 'opacity-80' : 'opacity-100',
          'transition-opacity duration-75 ease-in-out'
        )}
      >
        <Header />
        <main
          className={clsx(
            isLoading && 'pointer-events-none',
            isHomePage && 'h-full overflow-hidden'
          )}
        >
          {children}
        </main>
        {!isHomePage && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
