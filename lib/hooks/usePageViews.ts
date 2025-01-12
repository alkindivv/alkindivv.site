import useSWR, { mutate } from 'swr';
import { useEffect, useRef } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePageViews(slug: string, increment: boolean = false) {
  const viewIncrementedRef = useRef(false);

  // Gunakan SWR untuk fetch dan cache data
  const { data, error } = useSWR(`/api/page-views/?slug=${slug}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Cache selama 1 menit
  });

  // Increment view once if increment is true
  useEffect(() => {
    const incrementView = async () => {
      if (!increment || viewIncrementedRef.current) return;
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
  }, [slug, data, increment]);

  return data?.views || 0;
}
