'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import useSectionInView from '@/lib/hooks/useSectionInView';

import { BlogPost } from '@/types/blog';
import GlowingButton from '../shared/GlowingButton';

import ArticleCardAlt from '../blog/ArticleCardAlt';

interface LatestBlogPostsProps {
  posts: BlogPost[];
}

const LatestBlogPosts = ({ posts }: LatestBlogPostsProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isVisible = useSectionInView(sectionRef);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const alphabetLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  // Fungsi untuk filter posts berdasarkan kategori
  const filteredPosts = selectedCategory
    ? posts.filter(
        (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : posts;

  // Urutkan berdasarkan tanggal terbaru
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Dapatkan semua kategori unik
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 relative overflow-hidden latest-posts-section"
    >
      {/* Clean minimal background */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle gradient background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#0a1015]/30 via-transparent to-[#081a17]/20" /> */}

        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(16,185,129,0.05) 1px, transparent 1px)',
            backgroundSize: '100% 28px',
            opacity: isVisible ? 0.03 : 0,
            transitionDelay: '300ms',
          }}
        />

        {/* Minimal decorative elements */}
        {/* Top horizontal line */}
        <div
          className="absolute top-[15%] left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '400ms',
          }}
        ></div>

        {/* Bottom horizontal line */}
        <div
          className="absolute bottom-[15%] left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '600ms',
          }}
        ></div>

        {/* Left vertical line */}
        <div
          className="absolute top-[15%] bottom-[15%] left-[10%] w-px hidden md:block"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '800ms',
            transformOrigin: 'top',
          }}
        ></div>

        {/* Right vertical line */}
        <div
          className="absolute top-[15%] bottom-[15%] right-[10%] w-px hidden md:block"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '1000ms',
            transformOrigin: 'top',
          }}
        ></div>

        {/* Simple blur spot top right */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transition: 'opacity 1.5s ease-out',
            transitionDelay: '300ms',
          }}
        ></div>

        {/* Simple blur spot bottom left */}
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transition: 'opacity 1.5s ease-out',
            transitionDelay: '500ms',
          }}
        ></div>
      </div>

      <div className="relative z-10 ">
        {/* Section Header - Clean & Minimal */}
        <div className="mb-12 max-w-2xl">
          <div
            className="flex items-center space-x-2 mb-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 700ms ease-out',
              transitionDelay: '400ms',
            }}
          ></div>
          <h3
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '500ms',
            }}
          >
            <span className="gradient-text">Featured</span> Articles
          </h3>
          <p
            className="text-neutral-400 text-sm md:text-base leading-relaxed"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '600ms',
            }}
          >
            Thought, Opinion, and Insights about Law, Technology, and
            Cryptocurrency
          </p>
        </div>

        {/* Latest 3 posts  */}
        <div className="space-y-6">
          {sortedPosts.slice(0, 3).map((post, index) => (
            <div
              key={post.slug}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                transitionDelay: `${800 + index * 150}ms`,
              }}
            >
              <ArticleCardAlt post={post} />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className="mt-12 flex justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 700ms ease-out',
            transitionDelay: '1500ms',
          }}
        >
          <Link href="/blog">
            <GlowingButton variant="small">
              <span className="flex items-center gap-2">
                View More Articles
              </span>
            </GlowingButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;
