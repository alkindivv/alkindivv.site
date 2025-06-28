import Link from 'next/link';
import { Metadata } from 'next';
import { viewport } from './viewport';
import DimensionLinkNoArrow from '@/components/common/DimensionLinkNoArrow';
import GlowingButton from '@/components/shared/GlowingButton';

export { viewport };

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20 px-4 relative">
      {/* Subtle background with gradient */}
      <div className="absolute inset-0 bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/5 to-neutral-950" />
      </div>

      <div className="space-y-6 max-w-5xl text-center relative z-10">
        <div className="inline-block mb-2">
          <div className="relative">
            {/* <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-500 to-transparent absolute -top-6 left-1/2 transform -translate-x-1/2"></div>
            <h1 className="text-5xl font-light text-white">404</h1>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-500 to-transparent absolute -bottom-6 left-1/2 transform -translate-x-1/2"></div> */}
          </div>
        </div>
        {/* <h2 className="text-xl font-normal text-white">Page not found</h2> */}
        <p className="text-3xl md:text-4xl font-bold text-neutral-50 max-w-5xl mx-auto">
          Lost in the void? This page can't be found.
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
