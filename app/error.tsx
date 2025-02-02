'use client';

import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { FiArrowLeft } from 'react-icons/fi';
import Accent from '@/components/shared/Accent';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-emerald-500/2 to-transparent" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Content */}
        <div className="relative space-y-8">
          {/* 500 Text */}
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500/80 via-emerald-400 to-emerald-500/80 font-apple-homemade">
            500
          </h1>

          {/* Icon */}
          <div className="inline-block p-4 rounded-full bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20">
            <RiAlarmWarningFill
              size={48}
              className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
            />
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Server Error
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Oops! Something went wrong on our server.{' '}
              <Accent>Please try again later</Accent> or contact us if the
              problem persists.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-200 group"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-200 group"
            >
              <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Additional Links */}
          <div className="pt-8">
            <p className="text-gray-500 text-sm">
              You might want to check these pages:
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link
                href="/blog"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                Blog
              </Link>
              <span className="text-gray-700">•</span>
              <Link
                href="/about"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                About
              </Link>
              <span className="text-gray-700">•</span>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
