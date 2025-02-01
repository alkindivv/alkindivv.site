import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { FiArrowLeft } from 'react-icons/fi';
import Accent from '@/components/shared/Accent';
import Link from 'next/link';

export default function Custom500() {
  return (
    <main>
      <section className="min-h-screen flex flex-col items-center justify-center text-center">
        <div className="layout flex flex-col items-center gap-8 text-center">
          <RiAlarmWarningFill
            size={60}
            className="text-red-500 animate-pulse"
          />
          <h1 className="text-4xl md:text-6xl">
            <Accent>500</Accent> - Server Error
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Oops! Something went wrong on our server.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 font-medium transition-colors rounded-lg
                       bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          >
            <FiArrowLeft className="text-xl" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
