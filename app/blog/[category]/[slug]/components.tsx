'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from '@/components/blog/BlogContent';
import { TOCProvider } from '@/components/blog/TOCContext';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedArticles from '@/components/blog/RelatedArticles';
import Breadcrumb from '@/components/shared/Breadcrumb';
import ArticleNewsletterPopup from '@/components/blog/ArticleNewsletterPopup';
import { HiOutlineClock } from 'react-icons/hi';
import { FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import Accent from '@/components/shared/Accent';
import clsx from 'clsx';
import { BlogPost } from '@/types/blog';

// Define the breadcrumb item interface
interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Define the frontMatter type
interface FrontMatter extends BlogPost {
  readingTime: number;
  slug: string;
  description?: string;
  excerpt?: string;
  [key: string]: any;
}

interface BlogPostContentProps {
  typedFrontMatter: FrontMatter;
  children: React.ReactNode;
  category: string;
  slug: string;
  allPosts: BlogPost[];
  headings: Array<{ id: string; title: string; level: number }>;
}

const debugProduction = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`[Post Page] ${message}`);
    if (data) {
      const truncated =
        typeof data === 'object'
          ? JSON.stringify(data).substring(0, 200) + '...'
          : data;
      console.log(`[Post Page] Data:`, truncated);
    }
  }
};

export function BlogPostContent({
  typedFrontMatter,
  children,
  category,
  slug,
  allPosts,
  headings,
}: BlogPostContentProps) {
  const { headings: headingsFromProps } = arguments[0];
  const articleContentRef = useRef<HTMLDivElement>(null);

  // Debug data di mode production
  useEffect(() => {
    debugProduction('BlogPost component mounted', {
      title: typedFrontMatter?.title,
      category: typedFrontMatter?.category,
      slug: typedFrontMatter?.slug,
      hasMdxSource: true,
      relatedPostsCount: allPosts?.length,
    });
  }, [typedFrontMatter, allPosts]);

  // Format date
  const formattedDate = new Date(typedFrontMatter.date).toLocaleDateString(
    'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  );

  // Create breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Blog', href: '/blog' },
    {
      label: typedFrontMatter.category,
      href: `/blog/${typedFrontMatter.category.toLowerCase()}`,
    },
    { label: typedFrontMatter.title },
  ];

  // Define the MDX components with ID
  const mdxComponents = MDXComponents;

  return (
    <TOCProvider>
      <div className="fade-wrapper max-w-[1400px] mx-auto">
        {/* Title Section */}
        <div className="mb-8 sm:mb-12 -mt-20 relative z-10">
          {/* Category Tag */}
          {/* Breadcrumb */}
          <div className="mb-1" data-fade="2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          {/* <div className="mb-2" data-fade="2">
            <Link
              href={`/blog/${typedFrontMatter.category.toLowerCase()}`}
              className="inline-block py-1.5 px-4 text-sm tracking-wider text-emerald-300 bg-emerald-900/30 hover:bg-emerald-900/50 rounded-full transition-colors"
            >
              {typedFrontMatter.category.toLowerCase()}
            </Link>
          </div> */}

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-2 sm:mb-2"
            data-fade="3"
          >
            {typedFrontMatter.title}
          </h1>

          {/* Excerpt */}
          <p
            className="text-[0.825rem] md:text-[0.925rem] font-paragraf leading-relaxed tracking-wide text-[#A3A3A3] "
            data-fade="4"
          >
            {typedFrontMatter.excerpt}
          </p>
        </div>

        {/* Author Info & Stats */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-4 mb-8 sm:mb-4 border-y border-gray-800/50 gap-4"
          data-fade="5"
        >
          {/* Author & Date */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 overflow-hidden rounded-full ring-5 ">
              <Image
                src="/images/AL-KINDI.png"
                alt={typedFrontMatter.author || 'AL KINDI'}
                fill
                sizes="(max-width: 640px) 3rem, (max-width: 768px) 3rem, 6rem"
                className="object-cover"
                loading="eager"
                quality={90}
              />
            </div>
            <div>
              <div className="text-sm sm:text-base font-paragraf font-semibold gradient-text">
                {typedFrontMatter.author}
              </div>
              <div className="text-xs md:text-xs font-paragraf text-neutral-300">
                {formattedDate}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-3 text-xs sm:text-sm font-paragraf text-[#A3A3A3]"
            data-fade="5"
          >
            <span className="flex items-center gap-2">
              <HiOutlineClock className="w-4 h-4 text-emerald-600" />
              <span className="text-xs md:text-md text-neutral-300 font-paragraf">
                {typedFrontMatter.readingTime} min read
              </span>
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div
          className="relative flex flex-col-reverse lg:flex-row gap-8 lg:gap-12"
          data-fade="8"
        >
          {/* Main Article */}
          <article className="flex-1 max-w-[1200px]">
            {/* Article Content */}
            <div
              className={`prose prose-lg prose-invert
                                    prose-headings:scroll-mt-24
                 prose-a:no-underline
                max-w-none`}
              ref={articleContentRef}
            >
              {children}
            </div>

            {/* Article Footer */}
            <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-800">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10 sm:mb-14">
                {typedFrontMatter.tags?.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase()}`}
                    className="px-4 py-1.5 text-xs tracking-wide bg-[#0d1117]/80 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 rounded-full border border-white/5 hover:border-emerald-500/20 transition-all duration-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Author Bio */}
              <div className="relative group">
                {/* Gradient Border */}
                {/* <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" /> */}

                {/* Content Container */}
                <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-8 p-6 sm:p-8 bg-[#0a0a0a]/90 backdrop-blur-md rounded-2xl border border-white/[0.05]">
                  {/* Author Image Container */}
                  <div className="relative sm:flex-shrink-0">
                    {/* Image Glow Effect */}
                    {/* <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/30 to-emerald-500/0 rounded-xl blur-sm opacity-0 group-hover:opacity-20 transition-all duration-700" /> */}

                    {/* Image */}
                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 overflow-hidden rounded-xl ring-1 ring-white/[0.05]">
                      <Image
                        src="/images/AL-KINDI.png"
                        alt={typedFrontMatter.author || 'AL KINDI'}
                        fill
                        sizes="(max-width: 640px) 3rem, (max-width: 768px) 3rem, 6rem"
                        className="object-cover"
                        loading="eager"
                        quality={90}
                      />
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex-1 space-y-1">
                    {/* Name and Role */}
                    <div className="space-y-0">
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                        <span className="gradient-text">
                          {typedFrontMatter.author}
                        </span>
                      </h3>
                      <p className="text-[13px] text-neutral-50  font-medium tracking-wide">
                        Trainee Associate
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-[13px] sm:text-[14px] text-[#A3A3A3] leading-relaxed font-paragraf">
                      Focus on corporate law, capital markets, and bankruptcy.
                      Passionate about the intersection of law and technology,
                      exploring innovative solutions in legal practice.
                    </p>

                    {/* Social Links */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                      <a
                        href="https://twitter.com/alkindivv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[13px] text-neutral-400 hover:text-white transition-colors"
                      >
                        <FiTwitter size={18} />
                        <span className="font-medium">@alkindivv</span>
                      </a>
                      <a
                        href="https://linkedin.com/in/alkindivv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[13px] text-neutral-400 hover:text-white transition-colors"
                      >
                        <FiLinkedin size={18} />
                        <span className="font-medium">LinkedIn</span>
                      </a>
                      <a
                        href="mailto:alkindivv@gmail.com"
                        className="flex items-center gap-2 text-[13px] text-neutral-400 hover:text-white transition-colors"
                      >
                        <FiMail size={18} />
                        <span className="font-medium">Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Prev / Next Article Navigation */}
            </div>
          </article>

          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block w-50">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>

        {/* Comments & Related Articles */}
        <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12 transition-all duration-500 ease-in-out">
          {/* Related Articles */}
          <div className="fade-in-bottom">
            <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">
              <Accent>Related Articles</Accent>
            </h2>
            <div className="transition-all duration-300 ease-in-out transform hover:translate-y-0">
              <RelatedArticles
                currentPost={{
                  ...typedFrontMatter,
                  readingTime: typedFrontMatter.readingTime || 0,
                }}
                posts={allPosts}
              />
            </div>
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-800/50">
              {(() => {
                // Urutkan semua post berdasarkan tanggal
                const sorted = [...allPosts].sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                const currentIndex = sorted.findIndex((p) => p.slug === slug);

                const prevPost = sorted[currentIndex - 1]; // Lebih baru
                const nextPost = sorted[currentIndex + 1]; // Lebih lama

                return (
                  <>
                    {prevPost ? (
                      <Link
                        href={`/blog/${prevPost.category}/${prevPost.slug}`}
                        className="group flex-1 max-w-[280px] pr-4 hover:underline"
                      >
                        <p className="text-xs text-neutral-400 mb-1 group-hover:text-emerald-400 transition-colors">
                          Artikel Sebelumnya
                        </p>
                        <span className="text-sm font-semibold text-neutral-200 group-hover:text-white line-clamp-2">
                          {prevPost.title}
                        </span>
                      </Link>
                    ) : (
                      <div />
                    )}

                    {nextPost ? (
                      <Link
                        href={`/blog/${nextPost.category}/${nextPost.slug}`}
                        className="group flex-1 max-w-[280px] text-right pl-4 hover:underline"
                      >
                        <p className="text-xs text-neutral-400 mb-1 group-hover:text-emerald-400 transition-colors">
                          Artikel Selanjutnya
                        </p>
                        <span className="text-sm font-semibold text-neutral-200 group-hover:text-white line-clamp-2">
                          {nextPost.title}
                        </span>
                      </Link>
                    ) : (
                      <div />
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </TOCProvider>
  );
}
