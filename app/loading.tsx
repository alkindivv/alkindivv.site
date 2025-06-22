import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Loading() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-20 px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-lg text-emerald-500">Loading content...</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
