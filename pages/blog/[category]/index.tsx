import React, { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { BlogPost } from '@/types/blog';
import SEO from '@/components/shared/SEO';

import { HiSearch } from 'react-icons/hi';
import Accent from '@/components/shared/Accent';

import clsx from 'clsx';

import Breadcrumb from '@/components/shared/Breadcrumb';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi2';
import { usePageViews } from '@/lib/hooks/usePageViews';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Metadata } from 'next';

// Komponen untuk setiap post
const BlogPostCard = ({ post }: { post: BlogPost }) => {
  const views = usePageViews(post.slug);

  return (
    <Link
      key={post.slug}
      href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
      className="group block"
    >
      <article className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6 lg:items-center py-3 hover:bg-white/[0.02] rounded-lg transition-colors">
        {/* Image */}
        <figure className="isolate z-[1] pointer-events-none overflow-hidden rounded-md lg:max-w-44 lg:w-full">
          <div className="relative pt-[60%]">
            <div className="absolute left-0 top-0 w-full h-full">
              <Image
                src={post.featuredImage || ''}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(min-width: 1024px) 176px, 100vw"
              />
            </div>
          </div>
        </figure>

        {/* Content */}
        <div className="w-full">
          <div className="flex items-center gap-3">
            <p className="text-sm text-neutral-400">
              {new Date(post.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <h3 className="mt-3 text-xl font-semibold relative group-hover:text-emerald-500 transition-colors">
            <span
              className="bg-gradient-to-r from-emerald-500/30 via-emerald-500/90 to-emerald-500/30 box-decoration-clone group-hover:opacity-30 opacity-0 transition text-transparent"
              aria-hidden="true"
            >
              {post.title}
            </span>
            <span className="absolute left-0 top-0">{post.title}</span>
          </h3>

          <p className="text-sm text-neutral-400 mt-1 line-clamp-2">
            {post.description || post.excerpt}
          </p>

          <div className="flex justify-between mt-5 flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <HiOutlineClock className="w-4 h-4 text-emerald-500" />
                <p className="text-xs text-neutral-400">
                  {post.readingTime} min read
                </p>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineEye className="w-4 h-4 text-emerald-500" />
                <p className="text-xs text-neutral-400">{views} views</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-md px-1.5 py-0.5 text-xs font-medium bg-neutral-900 text-neutral-400 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

interface BlogCategory {
  name: string;
  slug: string;
  description: string;
}

interface CategoryPageProps {
  posts: BlogPost[];
  category: BlogCategory;
}

export default function CategoryPage({ posts, category }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = posts
    .filter((post) => {
      const searchContent = [
        post.title,
        post.description,
        post.excerpt,
        ...(post.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return searchContent.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      // Selalu urutkan berdasarkan tanggal terbaru
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: category.name },
  ];

  return (
    <Layout>
      <SEO
        templateTitle={`${category.name} Articles - Al Kindi`}
        description={`Read articles about ${category.name.toLowerCase()} from Al Kindi`}
      />
      <main className={clsx('content-spacing', !isLoaded && 'opacity-0')}>
        <section className="min-h-screen pt-40">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className="mt-0 relative space-y-2" data-fade="1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                <Accent>{category.name}</Accent> Articles
              </h1>
              <p className="text-sm md:text-base text-neutral-400 max-w-2xl">
                {category.description}
              </p>
              <div className="h-px max-w-md bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            </div>

            {/* Search Input */}
            <div className="mt-8 mb-8" data-fade="2">
              <div className="relative mx-auto max-w-2xl">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#111111] text-neutral-200 rounded-xl px-12 py-3
                    border border-gray-800/50 hover:border-emerald-500/50 focus:border-emerald-700
                    outline-none transition-all duration-300 text-sm md:text-base placeholder-neutral-600"
                />
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                {searchQuery && (
                  <p className="mt-3 text-sm text-gray-400 text-center">
                    Found {filteredPosts.length} article
                    {filteredPosts.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Blog Posts List */}
            <div className="space-y-8 mt-12" data-fade="3">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-xl font-bold mb-1">
                    Sorry, <Accent>article not found</Accent>
                  </h3>
                  <p className="text-sm text-neutral-400">
                    No articles found for your search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const paths = [];

  for (const locale of locales) {
    const categories = await getAllCategories(locale);
    const localePaths = categories.map((category) => ({
      params: { category: category.slug },
      locale,
    }));
    paths.push(...localePaths);
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale = 'en',
}) => {
  const categories = await getAllCategories(locale);
  const category = categories.find((cat) => cat.slug === params?.category);

  if (!category) {
    return {
      notFound: true,
    };
  }

  const allPosts = await getAllPosts(locale);
  const posts = allPosts.filter(
    (post) => post.category.toLowerCase() === category.slug.toLowerCase()
  );

  return {
    props: {
      posts,
      category,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const categoryName =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return {
    title: `${categoryName} Articles`,
    description: `Read articles about ${params.category.toLowerCase()} from AL KINDI. Expert insights on ${params.category} topics.`,
    openGraph: {
      title: `${categoryName} Articles - AL KINDI`,
      description: `Read articles about ${params.category.toLowerCase()} from AL KINDI. Expert insights on ${params.category} topics.`,
      images: [
        {
          url: '/images/AL-KINDI.png',
          width: 1200,
          height: 630,
          alt: `${categoryName} Articles by AL KINDI`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} Articles - AL KINDI`,
      description: `Read articles about ${params.category.toLowerCase()} from AL KINDI. Expert insights on ${params.category} topics.`,
      images: ['/images/AL-KINDI.png'],
    },
    alternates: {
      canonical: `https://alkindivv.site/blog/${params.category}`,
      languages: {
        'id-ID': `/id/blog/${params.category}`,
        'en-US': `/en/blog/${params.category}`,
      },
    },
    keywords: [
      `${params.category}`,
      'articles',
      'blog',
      'AL KINDI',
      `${params.category} expert`,
    ],
  };
}
