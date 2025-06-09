import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

interface NavigationMetrics {
  route: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  status: 'loading' | 'complete' | 'error' | 'timeout';
}

const LoadingDiagnostics: React.FC<{ enabled?: boolean }> = ({
  enabled = process.env.NODE_ENV === 'development',
}) => {
  const router = useRouter();
  const [metrics, setMetrics] = useState<NavigationMetrics[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let currentNavigation: NavigationMetrics | null = null;
    let timeoutId: NodeJS.Timeout;

    const handleStart = (url: string) => {
      // Clear previous timeout
      if (timeoutId) clearTimeout(timeoutId);

      currentNavigation = {
        route: url,
        startTime: Date.now(),
        status: 'loading',
      };

      // Set timeout untuk detect stuck loading
      timeoutId = setTimeout(() => {
        if (currentNavigation && currentNavigation.status === 'loading') {
          const timeoutNavigation = {
            ...currentNavigation,
            endTime: Date.now(),
            duration: Date.now() - currentNavigation.startTime,
            status: 'timeout' as const,
          };

          setMetrics((prev) => [timeoutNavigation, ...prev.slice(0, 9)]);
          console.error('Navigation timeout detected:', timeoutNavigation);
        }
      }, 8000);
    };

    const handleComplete = () => {
      if (timeoutId) clearTimeout(timeoutId);

      if (currentNavigation) {
        const completedNavigation = {
          ...currentNavigation,
          endTime: Date.now(),
          duration: Date.now() - currentNavigation.startTime,
          status: 'complete' as const,
        };

        setMetrics((prev) => [completedNavigation, ...prev.slice(0, 9)]);

        // Log slow navigations
        if (
          completedNavigation.duration &&
          completedNavigation.duration > 3000
        ) {
          console.warn('Slow navigation detected:', completedNavigation);
        }

        currentNavigation = null;
      }
    };

    const handleError = () => {
      if (timeoutId) clearTimeout(timeoutId);

      if (currentNavigation) {
        const errorNavigation = {
          ...currentNavigation,
          endTime: Date.now(),
          duration: Date.now() - currentNavigation.startTime,
          status: 'error' as const,
        };

        setMetrics((prev) => [errorNavigation, ...prev.slice(0, 9)]);
        console.error('Navigation error:', errorNavigation);
        currentNavigation = null;
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [router.events, enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 left-4 z-50 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-2 shadow-xl hover:bg-neutral-800/90 transition-colors"
        title="Toggle Loading Diagnostics"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="text-emerald-400"
        >
          <path
            d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Diagnostics Panel */}
      {isVisible && (
        <div className="fixed bottom-16 left-4 z-50 bg-neutral-900/95 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-4 shadow-xl max-w-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">
                Navigation Metrics
              </h3>
              <button
                onClick={() => setMetrics([])}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {metrics.length === 0 ? (
                <p className="text-xs text-neutral-500">No navigation data</p>
              ) : (
                metrics.map((metric, index) => (
                  <div
                    key={index}
                    className={clsx(
                      'p-2 rounded text-xs border',
                      metric.status === 'complete' &&
                        'bg-emerald-900/20 border-emerald-500/30',
                      metric.status === 'loading' &&
                        'bg-blue-900/20 border-blue-500/30',
                      metric.status === 'error' &&
                        'bg-red-900/20 border-red-500/30',
                      metric.status === 'timeout' &&
                        'bg-yellow-900/20 border-yellow-500/30'
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-white font-medium truncate">
                        {metric.route}
                      </span>
                      <span
                        className={clsx(
                          'text-xs px-1.5 py-0.5 rounded',
                          metric.status === 'complete' &&
                            'bg-emerald-500/20 text-emerald-300',
                          metric.status === 'loading' &&
                            'bg-blue-500/20 text-blue-300',
                          metric.status === 'error' &&
                            'bg-red-500/20 text-red-300',
                          metric.status === 'timeout' &&
                            'bg-yellow-500/20 text-yellow-300'
                        )}
                      >
                        {metric.status}
                      </span>
                    </div>
                    {metric.duration && (
                      <div className="mt-1 text-neutral-400">
                        {metric.duration}ms
                        {metric.duration > 3000 && (
                          <span className="text-yellow-400 ml-1">⚠️</span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Performance Summary */}
            {metrics.length > 0 && (
              <div className="border-t border-neutral-700 pt-2">
                <div className="text-xs text-neutral-400">
                  <div>
                    Avg:{' '}
                    {Math.round(
                      metrics
                        .filter((m) => m.duration)
                        .reduce((acc, m) => acc + (m.duration || 0), 0) /
                        metrics.filter((m) => m.duration).length
                    )}
                    ms
                  </div>
                  <div>
                    Slow:{' '}
                    {
                      metrics.filter((m) => m.duration && m.duration > 3000)
                        .length
                    }
                  </div>
                  <div>
                    Errors:{' '}
                    {
                      metrics.filter(
                        (m) => m.status === 'error' || m.status === 'timeout'
                      ).length
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingDiagnostics;
