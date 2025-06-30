'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoadingActions } from '@/lib/stores/useLoadingStore';
import NProgress from 'nprogress';

/**
 * NavigationEvents dengan integrasi useLoadingStore + NProgress.
 * Menampilkan progress bar tipis dan tetap menjaga granularitas loading store
 * tanpa overlay.
 */
export default function NavigationEvents() {
  const pathname = usePathname();
  const { startLoading, stopLoading, setProgress } = useLoadingActions();

  useEffect(() => {
    // Konfigurasi NProgress (jika belum) sekali saja
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 150,
      minimum: 0.08,
      easing: 'ease',
    });

    startLoading();
    setProgress(20);
    const step2 = setTimeout(() => setProgress(50), 60);
    const step3 = setTimeout(() => setProgress(80), 140);

    // Selesai
    const done = setTimeout(() => {
      setProgress(100);
      NProgress.done();
      stopLoading();
    }, 260);

    // Mulai NProgress awal
    NProgress.start();

    return () => {
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(done);
    };
  }, [pathname, startLoading, stopLoading, setProgress]);

  return null;
}
