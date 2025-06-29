'use client';

import React, { memo } from 'react';
import Header from './Header';
import Footer from './Footer';
import clsx from 'clsx';
import { useIsLoading, useLoadingMessage } from '@/lib/stores/useLoadingStore';
// import PerformanceMonitor from '../shared/PerformanceMonitor';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  isHomePage?: boolean;
}

// Memoized loading overlay component
const LoadingOverlay = memo(
  ({
    isLoading,
    loadingMessage,
  }: {
    isLoading: boolean;
    loadingMessage?: string;
  }) => {
    if (!isLoading) return null;

    return (
      <div className="fixed inset-0 bg-black/3 backdrop-blur-[0.5px] z-40 pointer-events-none transition-opacity duration-300">
        {loadingMessage && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-emerald-500/20 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                {loadingMessage}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

LoadingOverlay.displayName = 'LoadingOverlay';

const Layout: React.FC<LayoutProps> = ({
  isHomePage,
  children,
  title = 'AL KINDI - Law, Technology, and Cryptocurrency',
}) => {
  // Use Zustand store selectors
  const isLoading = useIsLoading();
  const loadingMessage = useLoadingMessage();

  return (
    <div
      className={clsx('min-h-screen', isHomePage && 'h-screen overflow-hidden')}
    >
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Skip to main content
      </a>

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
          id="main-content"
          role="main"
          aria-label="Main content"
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
      {/* <LoadingOverlay isLoading={isLoading} loadingMessage={loadingMessage} /> */}

      {/* Performance Monitor - hanya di development */}
      {/* <PerformanceMonitor /> */}
    </div>
  );
};

export default memo(Layout);
