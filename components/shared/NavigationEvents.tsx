'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoadingActions } from '@/lib/stores/useLoadingStore';
import NProgress from 'nprogress';

/**
 * Komponen ini mendeteksi perubahan navigasi di Next.js dan memicu NProgress.
 * Dioptimalkan untuk mengurangi delay dengan timeout yang lebih pendek.
 */
export default function NavigationEvents() {
  const pathname = usePathname();
  const { startLoading, stopLoading, setProgress } = useLoadingActions();

  useEffect(() => {
    startLoading('Navigating...');
    setProgress(20);

    const step2 = setTimeout(() => {
      setProgress(50);
    }, 300);

    const step3 = setTimeout(() => {
      setProgress(80);
    }, 600);

    const done = setTimeout(() => {
      setProgress(100);
      stopLoading();
    }, 900);

    return () => {
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(done);
    };
  }, [pathname, startLoading, stopLoading, setProgress]);

  return null; // Komponen ini tidak merender apa-apa
}
