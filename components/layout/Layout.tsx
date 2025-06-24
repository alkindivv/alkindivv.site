'use client';

import React, { memo } from 'react';
import Header from './Header';
import Footer from './Footer';
import clsx from 'clsx';
import { useIsLoading } from '@/lib/stores/useLoadingStore';
// import PerformanceMonitor from '../shared/PerformanceMonitor';
import SharedLoadingOverlay from './LoadingOverlay';

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
  // Use Zustand store selectors
  const isLoading = useIsLoading();

  return (
    <div
      className={clsx('min-h-screen', isHomePage && 'h-screen overflow-hidden')}
    >
      <div
        className={clsx(
          'layout-container',
          isHomePage && 'h-screen overflow-hidden',
          // Subtle opacity change saat loading
          'transition-opacity duration-300 ease-in-out'
        )}
        style={{ opacity: isLoading ? 0.98 : 1 }}
      >
        <Header />
        <main
          id="content"
          className={clsx(
            // Disable interactions saat loading
            isLoading && 'pointer-events-none select-none',
            isHomePage && 'h-full overflow-hidden',
            'transition-all duration-300 ease-in-out'
          )}
        >
          {children}
        </main>
        {!isHomePage && <Footer />}
      </div>

      {/* Optimized Loading overlay */}
      <SharedLoadingOverlay />

      {/* Performance Monitor - hanya di development */}
      {/* <PerformanceMonitor /> */}
    </div>
  );
};

export default memo(Layout);
