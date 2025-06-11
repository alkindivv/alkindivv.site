import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLoadingStore } from '@/lib/stores/useLoadingStore';

export const useRouterLoading = () => {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isLoadingRef = useRef(false);
  const visitedRoutesRef = useRef<string[]>([]);

  // Stable reference to store actions
  const { startLoading, stopLoading, resetLoading } =
    useLoadingStore.getState();

  // Memoized handlers untuk mencegah re-subscription
  const handleStart = useCallback(
    (url: string) => {
      // Prevent multiple loading states
      if (isLoadingRef.current) return;

      // Untuk debugging di production
      if (process.env.NODE_ENV === 'production') {
        console.log('[Router] Navigation started:', url);

        // Mendeteksi potensi infinite redirect
        visitedRoutesRef.current.push(url);
        const recentVisits = visitedRoutesRef.current.slice(-10);
        const uniqueVisits = new Set(recentVisits);

        if (recentVisits.length > 5 && uniqueVisits.size < 3) {
          console.warn(
            '[Router] Possible infinite redirect detected!',
            recentVisits
          );
        }
      }

      isLoadingRef.current = true;

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Route-specific messages
      const routeMessages: Record<string, string> = {
        '/blog': 'Loading blog posts...',
        '/about': 'Loading about page...',
        '/contact': 'Loading contact page...',
        '/resources': 'Loading resources...',
        '/glossary': 'Loading glossary...',
        '/books': 'Loading books...',
        '/wishlist': 'Loading wishlist...',
      };

      const message = routeMessages[url] || 'Loading page...';
      startLoading(message);

      // Safety timeout - force stop loading after 10 seconds
      timeoutRef.current = setTimeout(() => {
        console.warn('Router loading timeout - forcing stop');
        isLoadingRef.current = false;
        resetLoading();
      }, 10000);
    },
    [startLoading, resetLoading]
  );

  const handleComplete = useCallback(
    (url: string) => {
      // Untuk debugging di production
      if (process.env.NODE_ENV === 'production') {
        console.log('[Router] Navigation completed to:', url);
      }

      isLoadingRef.current = false;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }

      stopLoading();
    },
    [stopLoading]
  );

  const handleError = useCallback(
    (error: Error, url: string) => {
      isLoadingRef.current = false;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }

      // Detail debug di production
      if (process.env.NODE_ENV === 'production') {
        console.error('[Router] Navigation error for URL:', url);
        console.error('[Router] Error details:', error);
      }

      resetLoading();
    },
    [resetLoading]
  );

  useEffect(() => {
    // Detail router state di awal
    if (process.env.NODE_ENV === 'production') {
      console.log('[Router] Initial router state:', {
        pathname: router.pathname,
        asPath: router.asPath,
        query: router.query,
      });
    }

    // Subscribe to router events
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    // Cleanup function
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);

      // Clear timeout on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    router.events,
    router.pathname,
    router.asPath,
    router.query,
    handleStart,
    handleComplete,
    handleError,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (isLoadingRef.current) {
        resetLoading();
      }
    };
  }, [resetLoading]);

  return {
    router,
  };
};
