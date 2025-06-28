'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import DimensionLinkNoArrow from '@/components/common/DimensionLinkNoArrow';
import GlowingButton from '@/components/shared/GlowingButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20 px-4 relative">
      {/* Subtle background with gradient */}
      <div className="absolute inset-0 bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/5 to-neutral-950" />
      </div>

      <div className="space-y-6 max-w-5xl text-center relative z-10">
        <p className="text-3xl md:text-4xl font-bold text-neutral-50 max-w-5xl mx-auto">
          Oops! Even the best systems have bad days.
        </p>
        <div className="pt-6">
          <span className=" items-center gap-2">
            <DimensionLinkNoArrow href="/">Return home</DimensionLinkNoArrow>
          </span>
        </div>
      </div>
    </main>
  );
}
