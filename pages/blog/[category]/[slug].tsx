import React, { useEffect, useState, useRef } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../../components/Layout';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/mdx';
import { H1, MDXComponents } from '@/components/BlogContent';
import Accent from '@/components/Accent';

import styles from '../../../styles/Blog.module.css';
import Image from 'next/image';
import { FaClock, FaEye } from 'react-icons/fa';
import TableOfContents from '@/components/TableOfContents';
import RelatedArticles from '@/components/RelatedArticles';
import Comments from '@/components/Comments';

interface ReadingTimeResult {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

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
  const [activeId, setActiveId] = useState<string>('');
  const articleContentRef = useRef<HTMLDivElement>(null);
  const [hasIncremented, setHasIncremented] = useState(false);
  const [views, setViews] = useState(0);
  const viewIncrementedRef = useRef(false);

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

    if (items.length > 0) {
      setActiveId(items[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  // Convert readingTime to number
  const readingTimeMinutes = !frontMatter.readingTime
    ? 0
    : typeof frontMatter.readingTime === 'number'
      ? frontMatter.readingTime
      : 0;

  // Format tanggal
  const formattedDate = new Date(frontMatter.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Fetch initial views
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/page-views/?slug=${frontMatter.slug}`);
        const data = await res.json();
        setViews(data.views);
      } catch (error) {
        console.error('Failed to fetch views:', error);
      }
    };

    fetchViews();
  }, [frontMatter.slug]);

  // Increment view once
  useEffect(() => {
    const incrementView = async () => {
      if (viewIncrementedRef.current) return;
      viewIncrementedRef.current = true;

      try {
        const res = await fetch('/api/page-views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug: frontMatter.slug,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error('Failed to increment view:', error);
      }
    };

    incrementView();
  }, [frontMatter.slug]);

  return (
    <Layout>
      <div className="min-h-screen max-w-[var(--max-width)] mx-auto -translate-y-[50px]">
        {/* Banner Image */}
        <div className="w-full mt-14 md:mt-0 2xl:mt-0" data-fade="1">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={frontMatter.featuredImage || ''}
              alt={frontMatter.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Main Content Container */}
        {/* <div className="mt-4">

          <header className="space-y-2 -mb-2">
            <div data-fade="2">
              <H1 className="mb-2">{frontMatter.title}</H1>
            </div>
            <div
              className={`mt-2 mb-6 md:mt-2 md:mb-8 font-normal text-sm md:text-md lg:text-md text-gray-300`}
              data-fade="3"
            >
              Written on {formattedDate} by{' '}
              <Accent>{frontMatter.author}</Accent>
            </div>
            <div className="flex items-center gap-4" data-fade="4">
              <span className="flex items-center gap-2">
                <FaClock />
                <Accent>{readingTimeMinutes} min read</Accent>
              </span>
              <span className="flex items-center gap-2">
                <FaEye />
                <Accent>{views} views</Accent>
              </span>
            </div>
            <div className="border-b border-gray-700" data-fade="5" />
          </header> */}

        {/* Main Content Container */}
        <div className="mt-4">
          {/* Article Header */}
          <header className="space-y-2 -mb-2">
            <div data-fade="2">
              <H1 className="text-2xl md:text-3xl lg:text-4xl">
                {frontMatter.title}
              </H1>
            </div>
            <div
              className={`mt-10 mb-6 md:mt-10 md:mb-8 font-normal text-sm md:text-md lg:text-md text-gray-300`}
              data-fade="3"
            >
              Written on {formattedDate} by{' '}
              <Accent>{frontMatter.author}</Accent>
            </div>
            <div
              className="flex items-center gap-4 text-sm md:text-md lg:text-md text-gray-400"
              data-fade="4"
            >
              <span className="font-normal mt-2 flex items-center gap-2">
                <FaClock />
                <Accent>{readingTimeMinutes} min read</Accent>
              </span>
              <span className="font-normal mt-2 flex items-center gap-2 text-sm md:text-md lg:text-md">
                <FaEye className="font-normal text-sm md:text-md lg:text-md" />
                <Accent>{views} views</Accent>
              </span>
            </div>
            <div className="border-b border-gray-700" data-fade="5" />
          </header>

          {/* Content Layout */}
          <div
            className="relative flex flex-col lg:flex-row gap-8 lg:gap-2"
            data-fade="6"
          >
            {/* Main Article */}
            <article className="flex-1 lg:max-w-[calc(100%-0px)]">
              <div className={`${styles.postContent}`} ref={articleContentRef}>
                <MDXRemote {...mdxSource} components={mdxComponents} />
              </div>
            </article>

            {/* Table of Contents */}
            <TableOfContents headings={headings} activeId={activeId} />
          </div>

          {/* Add Comments section before Related Articles */}
          <div className="mt-16 border-t border-gray-700 pt-8" data-fade="6">
            <Comments postSlug={frontMatter.slug} />
          </div>

          {/* Related Articles */}
          <div className="mt-16 border-t border-gray-700 pt-8" data-fade="7">
            <h2 className="text-2xl font-bold mb-8">
              <Accent>Related Articles</Accent>
            </h2>
            <RelatedArticles currentPost={frontMatter} allPosts={allPosts} />
          </div>
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

  // Hitung reading time dari konten lengkap
  // const stats = readingTime(mdxSource.compiledSource);
  // const readingTimeMinutes = Math.ceil(stats.minutes);

  const enhancedFrontMatter = {
    ...frontMatter,
    slug,
    // readingTime: readingTimeMinutes.toString(),
  };

  return {
    props: {
      frontMatter: enhancedFrontMatter,
      mdxSource,
      allPosts: getAllPosts(),
    },
  };
};
