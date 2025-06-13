'use client';

import { useIsLoading, useLoadingMessage } from '@/lib/stores/useLoadingStore';
import clsx from 'clsx';

export default function LoadingOverlay() {
  const isLoading = useIsLoading();
  const loadingMessage = useLoadingMessage();

  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40 pointer-events-none flex items-end justify-center pb-12">
      {loadingMessage && (
        <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-medium border border-emerald-500/20 shadow-lg flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          {loadingMessage}
        </div>
      )}
    </div>
  );
}
