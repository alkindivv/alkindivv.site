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
  const articleContentRef = useRef<HTMLDivElement>(null);
  const views = usePageViews(frontMatter.slug, true);

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

      {/* Hero Banner - Full Width */}
      <div className="relative h-[35vh] w-screen -mx-[calc((100vw-100%)/2)] -mt-[var(--header-height)] overflow-hidden">
        <div className="absolute inset-0 transform scale-110 motion-safe:animate-subtle-zoom">
          <Image
            src={frontMatter.featuredImage || ''}
            alt={frontMatter.title}
            fill
            className="object-cover brightness-[0.5] transition-transform duration-[20s]"
            priority
          />
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/50 via-[#111111]/80 to-[#111111]" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-[var(--max-width)] mx-auto -mt-48">
        {/* Title Section */}
        <div className="mb-12">
          {/* Category Tag */}
          <div className="mb-4" data-fade="2">
            <span className="inline-block px-3 py-1 text-xs tracking-wider uppercase text-gray-300 bg-gray-800/50 rounded-full">
              {frontMatter.category.toLowerCase()}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.2] tracking-tight mb-4 "
            data-fade="3"
          >
            {frontMatter.title}
          </h1>

          {/* Excerpt */}
          <p
            className="text-sm sm:text-base text-gray-300 font-light leading-relaxed tracking-wide"
            data-fade="4"
          >
            {frontMatter.excerpt}
          </p>
        </div>

        {/* Author Info & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 mb-2 border-y border-gray-800/50 gap-4">
          {/* Author & Date */}
          <div className="flex items-center gap-4" data-fade="5">
            <div className="relative w-10 h-10 overflow-hidden rounded-full ring-2 ring-gray-800">
              <Image
                src="/images/AL-KINDI.png"
                alt={frontMatter.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="uppercase text-sm sm:text-base font-medium text-white data-fade='6'">
                <Accent>{frontMatter.author}</Accent>
              </div>
              <div className="text-xs sm:text-sm text-gray-400 data-fade='7'">
                {formattedDate}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-400 data-fade='8'">
            <span className="flex items-center gap-2 hover:text-gray-300 transition-colors">
              <FaEye className="w-4 h-4" />
              {views} views
            </span>
            <span className="flex items-center gap-2">
              <FaClock className="w-4 h-4" />
              {frontMatter.readingTime} min read
            </span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="mb-0" data-fade="7">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Content Layout */}
        <div
          className="relative flex flex-col lg:flex-row gap-8 lg:gap-16"
          data-fade="8"
        >
          {/* Main Article */}
          <article className="flex-1">
            {/* Article Content */}
            <div
              className={`${styles.postContent} prose prose-sm sm:prose-base lg:prose-lg prose-invert prose-headings:scroll-mt-24 prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300 prose-img:rounded-xl max-w-none`}
              ref={articleContentRef}
              data-fade="8"
            >
              <MDXRemote {...mdxSource} components={mdxComponents} />
            </div>

            {/* Article Footer */}
            <div className="mt-16 pt-8 border-t border-gray-800" data-fade="9">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {frontMatter.tags?.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase()}`}
                    className="py-1.5 px-4 text-xs sm:text-sm bg-gray-800/50 hover:bg-gray-700 text-gray-300 rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Author Bio */}
              <div className="flex items-start gap-6 p-8 bg-gray-900/30 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 overflow-hidden rounded-xl ring-2 ring-gray-800">
                  <Image
                    src="/images/AL-KINDI.png"
                    alt={frontMatter.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    <Accent>{frontMatter.author}</Accent>
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Trainee Associate with focus on corporate law, capital
                    markets, and bankruptcy. Passionate about the intersection
                    of law and technology.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Table of Contents Sidebar - Hidden on Mobile */}
          <aside className="hidden lg:block lg:w-64 xl:w-72">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>

        {/* Comments Section */}
        <div className="mt-16 border-t border-gray-800 pt-8" data-fade="9">
          <Comments postSlug={frontMatter.slug} />
        </div>

        {/* Related Articles */}
        <div className="mt-16 border-t border-gray-800 pt-8" data-fade="10">
          <h2 className="text-xl sm:text-2xl font-bold mb-8">
            <Accent>Related Articles</Accent>
          </h2>
          <RelatedArticles currentPost={frontMatter} allPosts={allPosts} />
        </div>
      </div>
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
