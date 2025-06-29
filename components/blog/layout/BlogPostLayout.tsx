'use client';
import React, { useEffect, useRef } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineClock } from 'react-icons/hi';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { MDXComponents } from '@/components/blog/mdx';
import { BlogPost } from '@/types/blog';
import {
  FiLinkedin,
  FiMail,
  FiTwitter,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi';
import AccentNormal from '@/components/shared/AccentNormal';
import { slugify } from '@/lib/utils/slug';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import FloatingShare from '@/components/blog/FloatingShare';

interface PostData extends BlogPost {
  readingTime: number;
  description?: string;
  excerpt?: string;
  [key: string]: any;
}

interface BlogPostLayoutProps {
  post: PostData;
  category: string;
  slug: string;
  allPosts: BlogPost[];
  headings: Array<{ id: string; title: string; level: number }>;
  children: React.ReactNode;
}

// Production debugging removed for performance

const TableOfContents = dynamic(
  () => import('@/components/blog/TableOfContents'),
  { ssr: false, loading: () => null }
);
const RelatedArticles = dynamic(
  () => import('@/components/blog/RelatedArticles'),
  { ssr: false, loading: () => null }
);
const ArticleNewsletterPopup = dynamic(
  () => import('@/components/blog/ArticleNewsletterPopup'),
  { ssr: false, loading: () => null }
);
const MobileFloatingToc = dynamic(
  () => import('@/components/blog/MobileFloatingToc'),
  { ssr: false }
);

export default function BlogPostLayout({
  post,
  category,
  slug,
  allPosts,
  headings,
  children,
}: BlogPostLayoutProps) {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Component mounted
  }, [slug]);

  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: post.category, href: `/blog/${post.category.toLowerCase()}` },
    { label: post.title },
  ];

  return (
    <div className="fade-wrapper max-w-[1400px] mx-auto">
      {/* Header */}

      <div className="mb-8 sm:mb-12 -mt-20 relative z-10">
        <h1
          className="text-2xl md:text-4xl font-bold text-white leading-[1.15] tracking-tight mb-2 sm:mb-2"
          data-fade="3"
        >
          {post.title}
        </h1>
        <p
          className="text-[0.825rem] md:text-[0.925rem] font-paragraf leading-relaxed tracking-wide text-[#A3A3A3]"
          data-fade="4"
        >
          {post.excerpt}
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
              alt={post.author}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm sm:text-base font-paragraf font-semibold ">
              <AccentNormal>{post.author}</AccentNormal>
            </div>
            <div className="text-xs md:text-xs font-paragraf text-neutral-300">
              {formattedDate}
            </div>
          </div>
        </div>
        <div
          className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm font-paragraf text-[#A3A3A3]"
          data-fade="5"
        >
          <span className="flex items-center gap-2">
            <HiOutlineClock className="w-4 h-4 text-[#08c488]" />
            <span className="text-xs md:text-md text-neutral-300 font-paragraf">
              {post.readingTime} min read
            </span>
          </span>
          {/* <span className="hidden sm:inline">•</span>
          <Link
            href={`/blog/${post.category.toLowerCase()}/`}
            className="text-emerald-400 hover:underline"
          >
            {post.category}
          </Link> */}
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

          {/* <ArticleNewsletterPopup slug={slug} /> */}

          <div className="relative group">
            {/* Gradient Border */}
            {/* <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" /> */}

            {/* Content Container */}
            {/* <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-8 p-6 sm:p-8 bg-[#0a0a0a]/90 backdrop-blur-md rounded-2xl border border-white/[0.05]"> */}
            {/* Author Image Container */}
            {/* <div className="relative sm:flex-shrink-0">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 overflow-hidden rounded-xl ring-1 ring-white/[0.05]">
                  <Image
                    src="/images/AL-KINDI.png"
                    alt={post.author || 'AL KINDI'}
                    fill
                    sizes="(max-width: 640px) 3rem, (max-width: 768px) 3rem, 6rem"
                    className="object-cover"
                    loading="eager"
                    quality={90}
                  />
                </div>
              </div> */}

            {/* Author Info */}
            {/* </div> */}
          </div>
          {post.tags?.length && (
            <div className="flex items-center gap-2 mt-2">
              {post.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${slugify(tag)}`}
                  className="px-1.5 py-1 text-xs rounded-lg md:text-sm transition-all duration-300 tracking-wide bg-[#17171799] font-medium text-[#9e9e9e] border-emerald-500 bg-emerald-500/10"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          <div className="mt-5" data-fade="2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </article>

        <aside className="hidden lg:block w-50">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>

      {/* Related Articles - placed below main flex so TOC height stops here */}
      <section className="mt-16" data-fade="9">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          <span className="gradient-text">Related Articles</span>
        </h2>
        <RelatedArticles currentPost={post} posts={allPosts} />
      </section>
      {/* Next / Previous navigation */}
      <div className="grid grid-cols-2 gap-4 mt-16 pt-8 border-t border-gray-800/50">
        {(() => {
          const sorted = [...allPosts].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const idx = sorted.findIndex((p) => p.slug === slug);
          const prevPost = sorted[idx - 1];
          const nextPost = sorted[idx + 1];

          return (
            <>
              {/* Previous */}
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.category}/${prevPost.slug}`}
                  className="group flex flex-col justify-between rounded-lg p-4 bg-[#0a0a0a]/80 border border-white/5 hover:border-neutral-800 hover:bg-[#0a0a0a]/60 transition-colors"
                >
                  <span className="flex items-center gap-2 text-xs text-neutral-400 group-hover:text-emerald-400">
                    <FiArrowLeft className="w-3 h-3" /> Previous
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-neutral-200 group-hover:text-white line-clamp-2">
                    {prevPost.title}
                  </h3>
                </Link>
              ) : (
                <div />
              )}

              {/* Next */}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.category}/${nextPost.slug}`}
                  className="group flex flex-col text-right justify-between rounded-lg p-4 bg-[#0a0a0a]/80 border border-white/5 hover:border-neutral-800 hover:bg-[#0a0a0a]/60 transition-colors"
                >
                  <span className="flex items-center gap-2 text-xs text-neutral-400 group-hover:text-emerald-400 justify-end">
                    Next <FiArrowRight className="w-3 h-3" />
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-neutral-200 group-hover:text-white line-clamp-2">
                    {nextPost.title}
                  </h3>
                </Link>
              ) : (
                <div />
              )}
            </>
          );
        })()}
      </div>
      <ArticleNewsletterPopup slug={post.slug} />
      <FloatingShare title={post.title} />
      <MobileFloatingToc headings={headings} />
    </div>
  );
}
