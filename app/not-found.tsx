import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { viewport } from './viewport';

export { viewport };

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-20 px-4 text-center">
        <div className="space-y-8 max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold text-emerald-500">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-xl text-neutral-300">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
