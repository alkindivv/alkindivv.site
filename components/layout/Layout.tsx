import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
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
      </Head>
      <div
        className={clsx(
          'layout-container',
          isHomePage && 'h-screen overflow-hidden'
        )}
      >
        <Header />
        <main className={clsx(isHomePage && 'h-full overflow-hidden')}>
          {children}
        </main>
        {!isHomePage && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
