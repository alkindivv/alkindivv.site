// 'use client';

// import { useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { useLoadingActions } from '@/lib/stores/useLoadingStore';
// import NProgress from 'nprogress';

// /**
//  * Komponen ini mendeteksi perubahan navigasi di Next.js dan memicu NProgress.
//  * Dioptimalkan untuk mengurangi delay dengan timeout yang lebih pendek.
//  */
// export default function NavigationEvents() {
//   const pathname = usePathname();
//   const { startLoading, stopLoading, setProgress } = useLoadingActions();

//   useEffect(() => {
//     startLoading('Navigating...');
//     setProgress(20);

//     const step2 = setTimeout(() => {
//       setProgress(50);
//     }, 50);

//     const step3 = setTimeout(() => {
//       setProgress(80);
//     }, 150);

//     const done = setTimeout(() => {
//       setProgress(100);
//       stopLoading();
//     }, 300);

//     return () => {
//       clearTimeout(step2);
//       clearTimeout(step3);
//       clearTimeout(done);
//     };
//   }, [pathname, startLoading, stopLoading, setProgress]);

//   return null; // Komponen ini tidak merender apa-apa
// }

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
      showSpinner: false, // sembunyikan spinner
      trickleSpeed: 120, // kecepatan gerak
      minimum: 0.1, // progress awal
      easing: 'ease', // animasi
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
