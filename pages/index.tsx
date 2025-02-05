import React from 'react';
import Layout from '@/components/layout/Layout';
import Accent from '@/components/shared/Accent';
import SEO from '@/components/shared/SEO';
import SocialMedia from '@/components/social/SocialMedia';
import Link from 'next/link';
import GlowingButton from '@/components/shared/GlowingButton';

export default function HomePage() {
  return (
    <Layout isHomePage>
      <SEO />
      <main className="h-[70vh] overflow-hidden flex flex-col justify-center items-center">
        <div className="max-w-[1100px] w-full space-y-3">
          {/* Name Section */}
          <div className="relative" data-fade="2">
            <div className="text-4xl md:text-5xl 2xl:text-6xl font-bold tracking-tight">
              I'm <Accent className="gradient-text">AL KINDI</Accent>
            </div>
          </div>

          {/* Main paragraph */}
          <div className="relative" data-fade="4">
            <p className="  paragraph-text leading-relaxed text-sm md:text-base 2xl:text-lg max-w-[800px]">
              I am passionate about law, focusing my expertise in coroporate
              M&A, capital market, restructing & insolvency and as well as
              crypto assets regulation in Indonesia.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="relative" data-fade="6">
            <div className="flex gap-3 md:gap-4">
              <GlowingButton href="/blog">Read the blog</GlowingButton>

              <Link
                href="/about"
                className=" border border-[#313131] font-normal px-4 py-3 rounded-xl"
              >
                Learn more about me
              </Link>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="relative" data-fade="7">
            <SocialMedia />
          </div>
        </div>
      </main>
    </Layout>
  );
}
