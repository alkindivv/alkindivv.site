'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface WebVitals {
  fcp?: number;
  lcp?: number;
  cls?: number;
  fid?: number;
  ttfb?: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = process.env.NODE_ENV === 'development',
}) => {
  const pathname = usePathname();
  const [vitals, setVitals] = useState<WebVitals>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              setVitals((prev) => ({ ...prev, fcp: entry.startTime }));
            }
            break;
          case 'largest-contentful-paint':
            setVitals((prev) => ({ ...prev, lcp: entry.startTime }));
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              setVitals((prev) => ({
                ...prev,
                cls: (prev.cls || 0) + (entry as any).value,
              }));
            }
            break;
          case 'first-input':
            setVitals((prev) => ({
              ...prev,
              fid: (entry as any).processingStart - entry.startTime,
            }));
            break;
          case 'navigation':
            setVitals((prev) => ({
              ...prev,
              ttfb: (entry as any).responseStart,
            }));
            break;
        }
      }
    });

    // Observe different entry types
    try {
      observer.observe({
        entryTypes: [
          'paint',
          'largest-contentful-paint',
          'layout-shift',
          'first-input',
          'navigation',
        ],
      });
    } catch (e) {
      console.warn('Performance Observer not supported:', e);
    }

    return () => observer.disconnect();
  }, [enabled]);

  // Auto-show if performance is poor
  useEffect(() => {
    if (vitals.lcp && vitals.lcp > 2500) {
      setIsVisible(true);
    }
  }, [vitals.lcp]);

  if (!enabled) return null;

  const getScoreColor = (metric: string, value: number) => {
    const thresholds: Record<string, [number, number]> = {
      fcp: [1800, 3000],
      lcp: [2500, 4000],
      cls: [0.1, 0.25],
      fid: [100, 300],
      ttfb: [800, 1800],
    };

    const [good, poor] = thresholds[metric] || [0, 0];
    if (value <= good) return 'text-green-400';
    if (value <= poor) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatValue = (metric: string, value: number) => {
    if (metric === 'cls') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-2 shadow-xl hover:bg-neutral-800/90 transition-colors"
        title="Toggle Performance Monitor"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="text-blue-400"
        >
          <path
            d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Performance Panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-50 bg-neutral-900/95 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-4 shadow-xl max-w-xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Web Vitals</h3>
              <span className="text-xs text-neutral-400">{pathname}</span>
            </div>

            <div className="space-y-2">
              {Object.entries(vitals).map(([metric, value]) => (
                <div key={metric} className="flex justify-between items-center">
                  <span className="text-xs text-neutral-400 uppercase">
                    {metric}
                  </span>
                  <span
                    className={`text-xs font-mono ${getScoreColor(metric, value)}`}
                  >
                    {formatValue(metric, value)}
                  </span>
                </div>
              ))}
            </div>

            {/* Performance Score */}
            {vitals.lcp && (
              <div className="border-t border-neutral-700 pt-2">
                <div className="text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>LCP Score:</span>
                    <span className={getScoreColor('lcp', vitals.lcp)}>
                      {vitals.lcp <= 2500
                        ? 'Good'
                        : vitals.lcp <= 4000
                          ? 'Needs Improvement'
                          : 'Poor'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Lighthouse-style recommendations */}
            {vitals.lcp && vitals.lcp > 2500 && (
              <div className="border-t border-neutral-700 pt-2">
                <div className="text-xs text-yellow-400">
                  ⚠️ LCP {'>'}2.5s - Check image optimization
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PerformanceMonitor;
