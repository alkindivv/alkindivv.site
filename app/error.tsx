'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-20 px-4 text-center">
        <div className="space-y-8 max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold text-red-500">Error</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Something went wrong
          </h2>
          <p className="text-xl text-neutral-300">
            We apologize for the inconvenience. An error has occurred while
            loading this page.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
