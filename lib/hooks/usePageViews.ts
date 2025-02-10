import { useEffect, useRef } from 'react';
import { create } from 'zustand';

interface ViewsStore {
  views: Record<string, number>;
  setViews: (slug: string, count: number) => void;
  getViews: (slug: string) => number;
  initializeViews: (views: Record<string, number>) => void;
  isInitialized: boolean;
}

const useViewsStore = create<ViewsStore>((set, get) => ({
  views: {},
  isInitialized: false,
  setViews: (slug, count) =>
    set((state) => ({
      views: { ...state.views, [slug]: count },
    })),
  getViews: (slug) => get().views[slug] || 0,
  initializeViews: (views) => set({ views, isInitialized: true }),
}));

// Fungsi untuk fetch views dari API
async function fetchViews() {
  try {
    const res = await fetch('/api/page-views');
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.views as Record<string, number>;
  } catch (error) {
    console.error('Failed to fetch views:', error);
    return {};
  }
}

// Fungsi untuk increment view
async function incrementView(slug: string) {
  try {
    const res = await fetch('/api/page-views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.views as number;
  } catch (error) {
    console.error('Failed to increment view:', error);
    return 0;
  }
}

// Hook untuk menggunakan views
export function usePageViews(slug: string, shouldIncrement = false) {
  const incrementRef = useRef(false);
  const { views, setViews, getViews, isInitialized, initializeViews } =
    useViewsStore();

  // Initialize views on first mount
  useEffect(() => {
    if (isInitialized) return;

    fetchViews().then((views) => {
      initializeViews(views);
    });
  }, [isInitialized, initializeViews]);

  // Handle increment
  useEffect(() => {
    if (shouldIncrement && !incrementRef.current) {
      incrementRef.current = true;
      incrementView(slug).then((newCount) => {
        setViews(slug, newCount);
      });
    }
  }, [slug, shouldIncrement, setViews]);

  return getViews(slug);
}
