import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import NProgress from 'nprogress';

interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
  progress: number;
  startTime?: number;
}

interface LoadingActions {
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  setProgress: (progress: number) => void;
  resetLoading: () => void;
}

type LoadingStore = LoadingState & LoadingActions;

// Configure NProgress globally dengan optimasi
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
  easing: 'ease',
  speed: 400,
  trickle: true,
});

// Debounce untuk mencegah multiple rapid calls
let loadingTimeout: NodeJS.Timeout | null = null;
let progressTimeout: NodeJS.Timeout | null = null;

export const useLoadingStore = create<LoadingStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      isLoading: false,
      loadingMessage: undefined,
      progress: 0,
      startTime: undefined,

      // Actions
      startLoading: (message?: string) => {
        const currentState = get();

        // Prevent multiple loading states
        if (currentState.isLoading) {
          return;
        }

        // Clear any existing timeouts
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
          loadingTimeout = null;
        }

        set(
          {
            isLoading: true,
            loadingMessage: message,
            progress: 0,
            startTime: Date.now(),
          },
          false,
          'startLoading'
        );

        // Start NProgress dengan delay untuk mencegah flicker pada navigasi cepat
        loadingTimeout = setTimeout(() => {
          NProgress.start();
        }, 100);
      },

      stopLoading: () => {
        const currentState = get();

        // Clear timeouts
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
          loadingTimeout = null;
        }
        if (progressTimeout) {
          clearTimeout(progressTimeout);
          progressTimeout = null;
        }

        // Calculate loading duration untuk debugging
        const duration = currentState.startTime
          ? Date.now() - currentState.startTime
          : 0;

        if (duration > 5000) {
          console.warn(`Slow navigation detected: ${duration}ms`);
        }

        set(
          {
            isLoading: false,
            loadingMessage: undefined,
            progress: 100,
            startTime: undefined,
          },
          false,
          'stopLoading'
        );

        NProgress.done();

        // Smooth scroll to top setelah navigation dengan delay
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 50);
        }
      },

      setProgress: (progress: number) => {
        const clampedProgress = Math.min(Math.max(progress, 0), 100);

        // Debounce progress updates
        if (progressTimeout) {
          clearTimeout(progressTimeout);
        }

        progressTimeout = setTimeout(() => {
          set({ progress: clampedProgress }, false, 'setProgress');
          NProgress.set(clampedProgress / 100);
        }, 50);
      },

      resetLoading: () => {
        // Clear all timeouts
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
          loadingTimeout = null;
        }
        if (progressTimeout) {
          clearTimeout(progressTimeout);
          progressTimeout = null;
        }

        set(
          {
            isLoading: false,
            loadingMessage: undefined,
            progress: 0,
            startTime: undefined,
          },
          false,
          'resetLoading'
        );

        // Force remove NProgress
        NProgress.remove();
      },
    }),
    {
      name: 'loading-store',
    }
  )
);

// Optimized selectors dengan shallow comparison
export const useIsLoading = () => useLoadingStore((state) => state.isLoading);
export const useLoadingMessage = () =>
  useLoadingStore((state) => state.loadingMessage);
export const useProgress = () => useLoadingStore((state) => state.progress);

// Stable actions selectors
export const useLoadingActions = () => {
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  const setProgress = useLoadingStore((state) => state.setProgress);
  const resetLoading = useLoadingStore((state) => state.resetLoading);

  return {
    startLoading,
    stopLoading,
    setProgress,
    resetLoading,
  };
};
