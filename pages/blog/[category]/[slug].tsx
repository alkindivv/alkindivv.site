import React, { useEffect, useState, useRef } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '@/components/layout/Layout';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/mdx';
import { MDXComponents } from '@/components/blog/BlogContent';
import Accent from '@/components/shared/Accent';
import PowerfulSEO from '@/components/shared/PowerfulSEO';
import { Metadata } from 'next';
import type { BlogPost } from '@/types/blog';

import Image from 'next/image';

import TableOfContents from '@/components/blog/TableOfContents';
import RelatedArticles from '@/components/blog/RelatedArticles';
import Breadcrumb from '@/components/shared/Breadcrumb';
import clsx from 'clsx';
import { HiOutlineClock } from 'react-icons/hi';
import Link from 'next/link';
import ArticleNewsletterPopup from '@/components/blog/ArticleNewsletterPopup';

interface FrontMatter extends Omit<BlogPost, 'readingTime'> {
  readingTime?: number;
}

interface BlogPostProps {
  frontMatter: FrontMatter;
  mdxSource: any;
  allPosts: BlogPost[];
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Definisikan komponen MDX yang akan digunakan dengan ID
const mdxComponents = {
  ...MDXComponents,
  h2: ({ children, ...props }: any) => {
    const id = children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return MDXComponents.h2({ ...props, id, children });
  },
  h3: ({ children, ...props }: any) => {
    const id = children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return MDXComponents.h3({ ...props, id, children });
  },
};

export default function BlogPost({
  frontMatter,
  mdxSource,
  allPosts,
}: BlogPostProps) {
  const [headings, setHeadings] = useState<
    Array<{ id: string; title: string; level: number }>
  >([]);
  const articleContentRef = useRef<HTMLDivElement>(null);
  const [] = useState(false);

  // Extract headings from content
  useEffect(() => {
    if (!articleContentRef.current) return;

    const elements = Array.from(
      articleContentRef.current.querySelectorAll('h2, h3')
    ).filter(
      (elem): elem is HTMLElement =>
        elem instanceof HTMLElement &&
        elem.textContent !== 'Table of Contents' &&
        elem.textContent !== 'Related Articles' &&
        elem.textContent !== 'AL KINDI' &&
        elem.textContent !== 'Quick Links' &&
        elem.textContent !== 'Services' &&
        elem.textContent !== 'Contact'
    );

    const items = elements.map((element) => ({
      id: element.id,
      title: element.textContent || '',
      level: Number(element.tagName.charAt(1)),
    }));

    setHeadings(items);
  }, []);

  // Format tanggal
  const formattedDate = new Date(frontMatter.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Blog', href: '/blog' },
    {
      label: frontMatter.category,
      href: `/blog/${frontMatter.category.toLowerCase()}`,
    },
    { label: frontMatter.title },
  ];

  return (
    <Layout>
      <PowerfulSEO
        title={frontMatter.title}
        description={
          frontMatter.excerpt ||
          `${frontMatter.title} - Article by ${frontMatter.author}`
        }
        image={frontMatter.featuredImage}
        type="article"
        publishedTime={frontMatter.date}
        modifiedTime={frontMatter.date}
        category={frontMatter.category}
        tags={frontMatter.tags}
        author={frontMatter.author}
        readingTime={frontMatter.readingTime}
        wordCount={frontMatter.excerpt?.split(' ').length}
      />

      <main className={clsx('content-spacing')}>
        {/* Hero Banner - Optimize dengan priority loading */}
        <div className="relative h-[30vh] md:h-[40vh] w-screen -mx-[calc((100vw-100%)/2)] overflow-hidden">
          <div className="absolute inset-0 transform scale-110">
            <Image
              src={frontMatter.featuredImage || ''}
              alt={frontMatter.title}
              fill
              sizes="100vw"
              className="object-cover brightness-[0.5] contrast-[1.1]"
              priority
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/0 via-[#0a0a0a]/60 to-[#0a0a0a]" />
            {/* <div className="absolute inset-0 bg-[#0a0a0a]/10" /> */}
          </div>
        </div>

        {/* Main Content Container */}
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
                href={`/blog/${frontMatter.category.toLowerCase()}`}
                className="inline-block py-1.5 px-4 text-sm tracking-wider text-emerald-300 bg-emerald-900/30 hover:bg-emerald-900/50 rounded-full transition-colors"
              >
                {frontMatter.category.toLowerCase()}
              </Link>
            </div> */}

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-2 sm:mb-2"
              data-fade="3"
            >
              {frontMatter.title}
            </h1>

            {/* Excerpt */}
            <p
              className="text-[0.825rem] md:text-[0.925rem] font-paragraf leading-relaxed tracking-wide text-[#A3A3A3] "
              data-fade="4"
            >
              {frontMatter.excerpt}
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
                  alt={frontMatter.author || 'AL KINDI'}
                  fill
                  sizes="(max-width: 640px) 3rem, (max-width: 768px) 3rem, 6rem"
                  className="object-cover"
                  loading="eager"
                  quality={90}
                />
              </div>
              <div>
                <div className="text-sm sm:text-base font-paragraf font-semibold gradient-text">
                  {frontMatter.author}
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
                  {frontMatter.readingTime} min read
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
                <MDXRemote {...mdxSource} components={mdxComponents} />
              </div>

              {/* Article Footer */}
              <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-800">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-10 sm:mb-14">
                  {frontMatter.tags?.map((tag) => (
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
                          alt={frontMatter.author || 'AL KINDI'}
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
                            {frontMatter.author}
                          </span>
                        </h3>
                        <p className="text-[13px] text-gray-300 font-medium tracking-wide">
                          Trainee Associate
                        </p>
                      </div>

                      {/* Bio */}
                      <p className="text-[13px] sm:text-[14px] text-[#A3A3A3]leading-relaxed font-paragraf">
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
                          className="flex items-center gap-2 text-[13px] text-gray-400/80 transition-colors duration-300"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          <span className="font-medium">@alkindivv</span>
                        </a>
                        <a
                          href="https://linkedin.com/in/alkindivv"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[13px] text-gray-400/80 hover:text-emerald-400/90 transition-colors duration-300"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                          </svg>
                          <span className="font-medium">LinkedIn</span>
                        </a>
                        <a
                          href="mailto:alkindivv@gmail.com"
                          className="flex items-center gap-2 text-[13px] text-gray-400/80 hover:text-emerald-400/90 transition-colors duration-300"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-medium">Email</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
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
                    ...frontMatter,
                    readingTime: frontMatter.readingTime || 0,
                  }}
                  allPosts={allPosts}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <ArticleNewsletterPopup slug={frontMatter.slug} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category, slug } = params as { category: string; slug: string };
  const { frontMatter, mdxSource } = await getPostBySlug(category, slug);
  const allPosts = await getAllPosts();

  const enhancedFrontMatter = {
    ...frontMatter,
    slug,
  };

  return {
    props: {
      frontMatter: enhancedFrontMatter,
      mdxSource,
      allPosts,
    },
  };
};

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const { frontMatter } = await getPostBySlug(params.category, params.slug);
  const fm = frontMatter as FrontMatter;
  const defaultImage = 'https://alkindivv.site/images/default.png';

  return {
    title: `${fm.title} | AL KINDI`,
    description: fm.excerpt || `${fm.title} - Article by ${fm.author}`,
    openGraph: {
      title: fm.title,
      description: fm.excerpt || '',
      images: [{ url: fm.featuredImage || defaultImage }],
      type: 'article',
      authors: [fm.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: fm.title,
      description: fm.excerpt || '',
      images: [{ url: fm.featuredImage || defaultImage }],
    },
    other: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  };
}
