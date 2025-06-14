'use client';
import React, { useEffect, useRef } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineClock } from 'react-icons/hi';
import clsx from 'clsx';
import Breadcrumb from '@/components/shared/Breadcrumb';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedArticles from '@/components/blog/RelatedArticles';
import ArticleNewsletterPopup from '@/components/blog/ArticleNewsletterPopup';
import Accent from '@/components/shared/Accent';
import { MDXComponents } from '@/components/blog/mdx';
import { BlogPost } from '@/types/blog';

interface FrontMatter extends BlogPost {
  readingTime: number;
  description?: string;
  excerpt?: string;
  [key: string]: any;
}

interface BlogPostLayoutProps {
  meta: FrontMatter;
  category: string;
  slug: string;
  allPosts: BlogPost[];
  headings: Array<{ id: string; title: string; level: number }>;
  children: React.ReactNode;
}

const debugProd = (msg: string, data?: any) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`[PostLayout] ${msg}`, data);
  }
};

export default function BlogPostLayout({
  meta,
  category,
  slug,
  allPosts,
  headings,
  children,
}: BlogPostLayoutProps) {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    debugProd('mounted', { slug });
  }, [slug]);

  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: meta.category, href: `/blog/${meta.category.toLowerCase()}` },
    { label: meta.title },
  ];

  return (
    <div className="fade-wrapper max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8 sm:mb-12 -mt-20 relative z-10">
        <div className="mb-1" data-fade="2">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-2 sm:mb-2"
          data-fade="3"
        >
          {meta.title}
        </h1>
        <p
          className="text-[0.825rem] md:text-[0.925rem] font-paragraf leading-relaxed tracking-wide text-[#A3A3A3]"
          data-fade="4"
        >
          {meta.excerpt}
        </p>
      </div>

      {/* Author / Stats */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-4 mb-8 sm:mb-4 border-y border-gray-800/50 gap-4"
        data-fade="5"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 overflow-hidden rounded-full ring-5 ">
            <Image
              src="/images/AL-KINDI.png"
              alt={meta.author}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm sm:text-base font-paragraf font-semibold gradient-text">
              {meta.author}
            </div>
            <div className="text-xs md:text-xs font-paragraf text-neutral-300">
              {formattedDate}
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-3 text-xs sm:text-sm font-paragraf text-[#A3A3A3]"
          data-fade="5"
        >
          <span className="flex items-center gap-2">
            <HiOutlineClock className="w-4 h-4 text-emerald-600" />
            <span className="text-xs md:text-md text-neutral-300 font-paragraf">
              {meta.readingTime} min read
            </span>
          </span>
        </div>
      </div>

      {/* Body + TOC */}
      <div
        className="relative flex flex-col-reverse lg:flex-row gap-8 lg:gap-12"
        data-fade="8"
      >
        <article className="flex-1 max-w-[1200px]">
          <div
            className="prose prose-lg prose-invert prose-headings:scroll-mt-24 max-w-none"
            ref={articleRef}
          >
            <MDXProvider components={MDXComponents as any}>
              {children}
            </MDXProvider>
          </div>
          {/* Tags */}
          {meta.tags?.length && (
            <div className="flex flex-wrap gap-2 mb-10 sm:mb-14 mt-12">
              {meta.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                  className="px-4 py-1.5 text-xs tracking-wide bg-[#0d1117]/80 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 rounded-full border border-white/5 hover:border-emerald-500/20 transition-all duration-300"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
          {/* <ArticleNewsletterPopup slug={slug} /> */}
        </article>

        <aside className="hidden lg:block w-50">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>

      {/* Related Articles - placed below main flex so TOC height stops here */}
      <section className="mt-16" data-fade="9">
        <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">
          <Accent>Related Articles</Accent>
        </h2>
        <RelatedArticles
          currentPost={{ ...meta, readingTime: meta.readingTime }}
          posts={allPosts}
        />
      </section>
      <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-800/50">
        {(() => {
          // Urutkan semua post berdasarkan tanggal
          const sorted = [...allPosts].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
      <ArticleNewsletterPopup slug={meta.slug} />
    </div>
  );
}
