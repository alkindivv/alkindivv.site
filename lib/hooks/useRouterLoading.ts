'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLoadingStore } from '@/lib/stores/useLoadingStore';

export const useRouterLoading = () => {
  const pathname = usePathname();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isLoadingRef = useRef(false);
  const prevPathRef = useRef<string | undefined>();

  // Store actions
  const { startLoading, stopLoading, resetLoading } =
    useLoadingStore.getState();

  // Helper untuk memulai loading
  const begin = useCallback(
    (url: string) => {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;
      startLoading('Navigating...');
      // Safety timeout
      timeoutRef.current = setTimeout(() => {
        resetLoading();
        isLoadingRef.current = false;
      }, 10000);
    },
    [startLoading, resetLoading]
  );

  const finish = useCallback(
    (url: string) => {
      if (!isLoadingRef.current) return;
      isLoadingRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
      stopLoading();
    },
    [stopLoading]
  );

  useEffect(() => {
    if (prevPathRef.current !== undefined && prevPathRef.current !== pathname) {
      begin(pathname);
      // Simulasikan selesai setelah render selesai
      const t = setTimeout(() => finish(pathname), 300);
      return () => clearTimeout(t);
    }
    prevPathRef.current = pathname;
  }, [pathname, begin, finish]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { router };
};
