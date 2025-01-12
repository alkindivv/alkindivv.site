import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { FiArrowLeft } from 'react-icons/fi';
import Accent from '@/components/shared/Accent';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dark flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 py-2 text-center relative">
        {/* Simple Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />

        {/* Content */}
        <div className="relative space-y-6">
          {/* Icon */}
          <div className="inline-block">
            <RiAlarmWarningFill
              size={58}
              className="text-emerald-500 drop-shadow-glow"
            />
          </div>

          {/* Message */}
          <p className="text-xl font-medium text-gray-300">
            This Page is not found and currently under{' '}
            <Accent>Development</Accent>
          </p>

          {/* Arrow Only */}
          <Link
            href="/"
            className="inline-block hover:-translate-x-2 transition-all"
          >
            <FiArrowLeft className="w-6 h-6 text-gray-300 hover:text-emerald-400" />
          </Link>
        </div>
      </div>
    </main>
  );
}
