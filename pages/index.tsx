import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Accent from '@/components/shared/Accent';
import SEO from '@/components/shared/SEO';
import SocialMedia from '@/components/social/SocialMedia';
import Link from 'next/link';
import clsx from 'clsx';
import { HiArrowDown, HiArrowRight } from 'react-icons/hi';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout isHomePage>
      <SEO />
      <main
        className={clsx(
          'h-[70vh] overflow-hidden flex flex-col justify-center items-center ',
          isLoaded && 'fade-wrapper'
        )}
      >
        <div className="max-w-[1100px] w-full space-y-3">
          {/* Name Section */}
          <div className="relative" data-fade="2">
            <div className="text-4xl md:text-5xl 2xl:text-6xl font-bold tracking-tight">
              I'm <Accent className="gradient-text">AL KINDI</Accent>
            </div>
          </div>

          {/* Main paragraph */}
          <div className="relative" data-fade="4">
            <p className="leading-relaxed text-sm md:text-base 2xl:text-lg max-w-[800px]">
              I am passionate about law, focusing my expertise in coroporate
              M&A, capital market, restructing & insolvency and as well as
              crypto assets regulation in Indonesia.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="relative animate-bounce" data-fade="6">
            <div className="flex gap-3 md:gap-4">
              <Link
                href="/blog"
                className="gradient-border font-semibold text-sm md:text-base 2xl:text-lg px-3 md:px-3 py-1.5 md:py-2.5 inline-flex items-center gap-2"
              >
                Read the blog
                <HiArrowDown className="w-4 h-4 animate-bounce" />
              </Link>
              <Link
                href="/about"
                className="no-gradient-button rounded-md font-semibold text-sm md:text-base 2xl:text-lg px-3 md:px-3 py-1.5 md:py-2.5"
              >
                Learn more about me
              </Link>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="relative" data-fade="7">
            <SocialMedia variant="default" />
          </div>
        </div>
      </main>
    </Layout>
  );
}
