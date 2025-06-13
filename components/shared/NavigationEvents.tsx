'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

/**
 * Komponen ini mendeteksi perubahan navigasi di Next.js dan memicu NProgress.
 * Dioptimalkan untuk mengurangi delay dengan timeout yang lebih pendek.
 */
export default function NavigationEvents() {
  const pathname = usePathname();

  useEffect(() => {
    // Konfigurasi NProgress untuk performa yang lebih baik
    NProgress.configure({
      minimum: 0.1,
      trickleSpeed: 200,
      showSpinner: false,
    });

    // Mulai progress bar ketika halaman berganti
    NProgress.start();

    // Selesai setelah komponen di-render (simulasi penyelesaian navigasi)
    const timer = setTimeout(() => {
      NProgress.done();
    }, 100); // Mengurangi timeout dari 300ms menjadi 100ms

    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // Komponen ini tidak merender apa-apa
}
