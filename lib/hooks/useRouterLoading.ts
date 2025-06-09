import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLoadingStore } from '@/lib/stores/useLoadingStore';

export const useRouterLoading = () => {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isLoadingRef = useRef(false);

  // Stable reference to store actions
  const { startLoading, stopLoading, resetLoading } =
    useLoadingStore.getState();

  // Memoized handlers untuk mencegah re-subscription
  const handleStart = useCallback(
    (url: string) => {
      // Prevent multiple loading states
      if (isLoadingRef.current) return;

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

  const handleComplete = useCallback(() => {
    isLoadingRef.current = false;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    stopLoading();
  }, [stopLoading]);

  const handleError = useCallback(() => {
    isLoadingRef.current = false;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    resetLoading();
  }, [resetLoading]);

  useEffect(() => {
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
  }, [router.events, handleStart, handleComplete, handleError]);

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
