import useSWR, { mutate } from 'swr';
import { useEffect, useRef } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Konfigurasi SWR yang konsisten untuk semua penggunaan
const SWR_CONFIG = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 5000, // Polling setiap 5 detik
  dedupingInterval: 2000, // Deduping interval yang lebih pendek
  keepPreviousData: true,
};

// Key untuk cache SWR
export const getViewsKey = (slug: string) => `/api/page-views/?slug=${slug}`;

export function usePageViews(slug: string, increment: boolean = false) {
  const viewIncrementedRef = useRef(false);

  const { data } = useSWR(getViewsKey(slug), fetcher, SWR_CONFIG);

  // Increment view sekali saja
  useEffect(() => {
    const incrementView = async () => {
      if (!increment || viewIncrementedRef.current) return;
      viewIncrementedRef.current = true;

      try {
        // Optimistic update untuk semua instance yang menggunakan slug yang sama
        const currentViews = data?.views ?? 0;
        await mutate(getViewsKey(slug), { views: currentViews + 1 }, false);

        // Gunakan AbortController untuk membatalkan request jika komponen unmount
        const controller = new AbortController();
        const res = await fetch('/api/page-views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
          signal: controller.signal,
        });

        if (!res.ok) throw new Error('Failed to increment view');

        const newData = await res.json();

        // Update cache dengan data baru
        await mutate(getViewsKey(slug), newData, true);

        return () => controller.abort();
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') return;
        console.error('Failed to increment view:', error);
        // Rollback optimistic update
        await mutate(getViewsKey(slug));
      }
    };

    incrementView();
  }, [slug, data, increment]);

  return data?.views ?? 0;
}
