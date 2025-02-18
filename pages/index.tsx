import React from 'react';
import Layout from '@/components/layout/Layout';
import Accent from '@/components/shared/Accent';
import SEO from '@/components/shared/SEO';
import SocialMedia from '@/components/social/SocialMedia';
import GlowingButton from '@/components/shared/GlowingButton';
import { Metadata } from 'next';

export default function HomePage() {
  return (
    <Layout isHomePage>
      <SEO />
      <div className="fixed inset-0 bg-black" />

      <main className="relative min-h-screen flex flex-col items-center justify-center -mt-20">
        {/* Hero Content */}
        <div className="w-full">
          <div className="max-w-[1100px] mx-auto space-y-8">
            {/* Title & Description */}
            <div className="space-y-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-emerald-500/5 text-emerald-300/90">
                  <span className="relative flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-400" />
                  </span>
                  <span
                    className="text-xs md:text-sm font-light tracking-wide"
                    data-fade="1"
                  >
                    Available for new opportunities
                  </span>
                </div>
                <h1
                  className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-white"
                  data-fade="2"
                >
                  <Accent className="gradient-text animate-text-shimmer font-bold">
                    AL KINDI
                  </Accent>
                </h1>
                <div
                  className="h-px max-w-[120px] md:max-w-[340px] w-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-transparent"
                  data-fade="2"
                />
              </div>

              <p
                className="text-sm md:text-base text-neutral-400 leading-relaxed font-light max-w-[540px]"
                data-fade="3"
              >
                Welcome to my personal website. I'm a professional with
                expertise in Corporate Law, Technology, and Blockchain. Explore
                my articles and insights about these topics.
              </p>
            </div>

            {/* Actions & Social */}
            <div className="flex flex-col gap-8" data-fade="4">
              {/* Actions */}
              <div className="flex items-center gap-4">
                <GlowingButton variant="small" href="/blog">
                  Read Blog
                </GlowingButton>
                <GlowingButton variant="small" href="/glossary">
                  Legal Glossary
                </GlowingButton>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4" data-fade="5">
                <div className="flex items-center gap-1 py-1 px-1 rounded-full">
                  <SocialMedia />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AL KINDI - Software Engineer & Tech Blog',
    description:
      "Welcome to AL KINDI's personal website. Explore tech articles, software development insights, and professional experiences of a passionate software engineer.",
    openGraph: {
      title: 'AL KINDI - Software Engineer & Tech Blog',
      description:
        "Welcome to AL KINDI's personal website. Explore tech articles, software development insights, and professional experiences of a passionate software engineer.",
      images: [
        {
          url: '/images/AL-KINDI.png',
          width: 1200,
          height: 630,
          alt: 'AL KINDI Website',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AL KINDI - Software Engineer & Tech Blog',
      description:
        "Welcome to AL KINDI's personal website. Explore tech articles, software development insights, and professional experiences of a passionate software engineer.",
      images: ['/images/AL-KINDI.png'],
    },
    alternates: {
      canonical: 'https://alkindivv.site',
      languages: {
        'id-ID': '/id',
        'en-US': '/en',
      },
    },
    keywords: [
      'AL KINDI',
      'software engineer',
      'tech blog',
      'web development',
      'programming',
      'tech articles',
      'software development insights',
    ],
  };
}
