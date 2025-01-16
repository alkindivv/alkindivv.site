import React, { useEffect, useRef, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '@/components/layout/Layout';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/mdx';
import { H1, MDXComponents } from '@/components/blog/BlogContent';
import Accent from '@/components/shared/Accent';
import SEO from '@/components/shared/SEO';
import styles from '@/styles/Blog.module.css';
import Image from 'next/image';
import { FaClock, FaEye } from 'react-icons/fa';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedArticles from '@/components/blog/RelatedArticles';
import Comments from '@/components/Comments';
import { usePageViews } from '@/lib/hooks/usePageViews';
import { formatDate } from '@/lib/utils/date';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Link from 'next/link';
import clsx from 'clsx';

interface BlogPostProps {
  frontMatter: {
    title: string;
    date: string;
    author: string;
    excerpt?: string;
    tags?: string[];
    featuredImage?: string;
    category: string;
    views?: number;
    slug: string;
    readingTime: number;
  };
  mdxSource: any;
  allPosts: any[];
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
  const [isLoaded, setIsLoaded] = useState(false);
  const articleContentRef = useRef<HTMLDivElement>(null);
  const views = usePageViews(frontMatter.slug, true);

  // Add isLoaded effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

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
  const formattedDate = formatDate(frontMatter.date);

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    {
      label: frontMatter.category,
      href: `/blog/${frontMatter.category.toLowerCase()}`,
    },
    { label: frontMatter.title },
  ];

  return (
    <Layout>
      <SEO
        templateTitle={frontMatter.title}
        description={
          frontMatter.excerpt ||
          `${frontMatter.title} - Article by ${frontMatter.author}`
        }
        banner={frontMatter.featuredImage}
        isBlog={true}
        date={frontMatter.date}
        category={frontMatter.category}
        tags={frontMatter.tags}
        readingTime={frontMatter.readingTime}
      />
      <main
        className={clsx(
          'content-spacing fade-wrapper',
          !isLoaded && 'opacity-0'
        )}
      >
        {/* Hero Banner - Full Width */}
        <div className="relative h-[15vh] sm:h-[20vh] w-screen -mx-[calc((100vw-100%)/2)] overflow-hidden">
          <div className="absolute inset-0 transform scale-110 motion-safe:animate-subtle-zoom">
            <Image
              src={frontMatter.featuredImage || ''}
              alt={frontMatter.title}
              fill
              className="object-cover brightness-[0.4] transition-transform duration-[20s]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/20 via-[#111111]/40 to-[#111111]" />
          </div>
        </div>

        {/* Main Content Container */}
        <div className="fade-wrapper">
          {/* Title Section */}
          <div className="mb-4 sm:mb-8">
            {/* Category Tag */}
            <div className="mb-3 sm:mb-2" data-fade="2">
              <span className="inline-block py-1 text-xs sm:text-sm tracking-wider text-gray-300 bg-gray-800/50 rounded-full">
                {frontMatter.category.toLowerCase()}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-1 sm:mb-3"
              data-fade="3"
            >
              {frontMatter.title}
            </h1>

            {/* Excerpt */}
            <p
              className="text-xs sm:text-sm md:text-base leading-relaxed tracking-wide max-w-3xl"
              data-fade="4"
            >
              {frontMatter.excerpt}
            </p>
          </div>

          {/* Author Info & Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:py-4 mb-4 sm:mb-4 border-y border-gray-800/50 gap-3 sm:gap-4">
            {/* Author & Date */}
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-full ring-2 ring-gray-800">
                <Image
                  src="/images/AL-KINDI.png"
                  alt={frontMatter.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-white">
                  <Accent>{frontMatter.author}</Accent>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400">
                  {formattedDate}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-[10px] sm:text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                {views} views
              </span>
              <span className="flex items-center gap-1.5">
                <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />
                {frontMatter.readingTime} min read
              </span>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="mb-6" data-fade="7">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Content Layout */}
          <span className="">
            <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Main Article */}
              <article className="flex-1 max-w-[1200px]">
                {/* Article Content */}
                <div
                  className={`prose prose-sm sm:prose-base lg:prose-lg prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300 prose-img:rounded-xl max-w-none`}
                  ref={articleContentRef}
                >
                  <MDXRemote {...mdxSource} components={mdxComponents} />
                </div>

                {/* Article Footer */}
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                    {frontMatter.tags?.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag.toLowerCase()}`}
                        className="py-1 sm:py-1.5 text-[10px] sm:text-xs bg-gray-800/50 hover:bg-gray-700 text-gray-300 rounded-full transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  {/* Author Bio */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 bg-gray-900/30 rounded-xl border border-gray-800/50 backdrop-blur-sm">
                    <div className="relative w-14 h-14 sm:w-20 sm:h-20 overflow-hidden rounded-xl ring-2 ring-gray-800">
                      <Image
                        src="/images/AL-KINDI.png"
                        alt={frontMatter.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-semibold mb-2">
                        <Accent>{frontMatter.author}</Accent>
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                        Trainee Associate with focus on corporate law, capital
                        markets, and bankruptcy. Passionate about the
                        intersection of law and technology.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Table of Contents Sidebar */}
              <aside className="hidden lg:block w-[240px] shrink-0 ">
                <div className="sticky top-24 rounded-xl  border border-gray-800/50">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            </div>
          </span>

          {/* Comments & Related Articles */}
          <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12">
            {/* Comments Section */}
            <div>
              <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">
                <Accent>Comments</Accent>
              </h2>
              <Comments postSlug={frontMatter.slug} />
            </div>

            {/* Related Articles */}
            <div>
              <h2 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">
                <Accent>Related Articles</Accent>
              </h2>
              <RelatedArticles currentPost={frontMatter} allPosts={allPosts} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
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
