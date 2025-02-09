import useSWR, { mutate } from 'swr';
import { useEffect, useRef } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePageViews(slug: string, increment: boolean = false) {
  const viewIncrementedRef = useRef(false);

  // Gunakan SWR dengan konfigurasi yang lebih optimal
  const { data, error: _error } = useSWR(
    `/api/page-views/?slug=${slug}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache selama 1 menit
      keepPreviousData: true, // Gunakan data sebelumnya saat revalidasi
      errorRetryCount: 2, // Batasi retry saat error
    }
  );

  // Increment view sekali saja
  useEffect(() => {
    const incrementView = async () => {
      if (!increment || viewIncrementedRef.current) return;
      viewIncrementedRef.current = true;

      try {
        // Optimistic update
        const currentViews = data?.views ?? 0;
        mutate(
          `/api/page-views/?slug=${slug}`,
          { views: currentViews + 1 },
          false
        );

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
        mutate(`/api/page-views/?slug=${slug}`, newData);

        return () => controller.abort();
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error('Failed to increment view:', error);
        // Rollback optimistic update jika gagal
        mutate(`/api/page-views/?slug=${slug}`);
      }
    };

    incrementView();
  }, [slug, data, increment]);

  return data?.views ?? 0;
}
