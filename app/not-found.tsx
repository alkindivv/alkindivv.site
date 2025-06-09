import * as React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FiArrowLeft, FiHome, FiBookOpen, FiMail } from 'react-icons/fi';
import Accent from '@/components/shared/Accent';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | AL KINDI</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist or is under development."
        />
      </Head>

      <div className="min-h-screen bg-neutral-950 flex flex-col">
        {/* Background Effects - similar to other pages */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950 z-[1]" />
          <div
            aria-hidden="true"
            className="h-[900px] w-[950px] rounded-full bg-gradient-to-r from-[#2E996C]/20 to-[#0F3324]/20 blur-[150px] absolute top-0 -translate-y-1/2 z-[0] left-1/4"
          />
          <Image
            alt=""
            priority
            width={1280}
            height={825}
            className="pointer-events-none select-none absolute w-full inset-0 h-full object-cover opacity-20 mix-blend-overlay"
            src="/images/textures/crumpled.jpg"
          />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] z-[2]" />
        </div>

        {/* Content */}
        <main className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 pt-24 pb-20">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            {/* Animated Badge */}
            <div className="inline-flex gap-2 items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Page not available</span>
            </div>

            {/* 404 Text */}
            <h1 className="text-9xl md:text-[12rem] font-bold tracking-tighter">
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent animate-text-shimmer">
                404
              </span>
            </h1>

            {/* Icon */}
            <div className="inline-block p-5 rounded-full bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.1)]">
              <HiOutlineExclamationCircle
                size={56}
                className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
              />
            </div>

            {/* Message */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Page Not Found
              </h2>
              <p className="text-neutral-400 text-lg max-w-md mx-auto leading-relaxed">
                The page you're looking for is currently under{' '}
                <span className="text-emerald-400 font-medium">
                  development
                </span>{' '}
                or doesn't exist. Check the URL or navigate to another section.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="/"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-200 border border-emerald-500/20 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              >
                <FiHome className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>

              <Link
                href="/blog"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900/50 text-neutral-300 hover:text-emerald-400 hover:bg-neutral-800/50 transition-all duration-200 border border-neutral-800 hover:border-emerald-500/20"
              >
                <FiBookOpen className="w-5 h-5" />
                <span>Browse Blog</span>
              </Link>
            </div>

            {/* Additional Links */}
            <div className="pt-10">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-4">
                {[
                  {
                    href: '/about',
                    label: 'About',
                    icon: <FiHome className="w-4 h-4" />,
                  },
                  {
                    href: '/resources',
                    label: 'Resources',
                    icon: <FiBookOpen className="w-4 h-4" />,
                  },
                  {
                    href: '/contact',
                    label: 'Contact',
                    icon: <FiMail className="w-4 h-4" />,
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Simple Footer */}
        <footer className="relative z-10 py-6 text-center text-neutral-500 text-sm border-t border-neutral-800/50">
          <p>© {new Date().getFullYear()} AL KINDI • All rights reserved</p>
        </footer>
      </div>
    </>
  );
}
