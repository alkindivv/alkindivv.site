import useSWR, { mutate } from 'swr';
import { useEffect, useRef } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePageViews(slug: string) {
  const viewIncrementedRef = useRef(false);

  // Gunakan SWR untuk fetch dan cache data
  const { data, error } = useSWR(`/api/page-views/?slug=${slug}`, fetcher, {
    refreshInterval: 5000, // Refresh setiap 5 detik
    revalidateOnFocus: false,
    dedupingInterval: 5000,
  });

  // Increment view once
  useEffect(() => {
    const incrementView = async () => {
      if (viewIncrementedRef.current) return;
      viewIncrementedRef.current = true;

      try {
        // Optimistic update
        const currentViews = data?.views || 0;
        mutate(
          `/api/page-views/?slug=${slug}`,
          { views: currentViews + 1 },
          false
        );

        const res = await fetch('/api/page-views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });

        if (res.ok) {
          const newData = await res.json();
          mutate(`/api/page-views/?slug=${slug}`, newData);
        }
      } catch (error) {
        console.error('Failed to increment view:', error);
        // Rollback optimistic update jika gagal
        mutate(`/api/page-views/?slug=${slug}`);
      }
    };

    incrementView();
  }, [slug, data]);

  return data?.views || 0;
}
