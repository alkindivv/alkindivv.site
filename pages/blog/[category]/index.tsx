import React, { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { BlogPost } from '@/types/blog';
import PowerfulSEO from '@/components/shared/PowerfulSEO';

import {
  HiSearch,
  HiLibrary,
  HiBookOpen,
  HiDocumentText,
  HiScale,
} from 'react-icons/hi';
import Accent from '@/components/shared/Accent';

import clsx from 'clsx';

import Breadcrumb from '@/components/shared/Breadcrumb';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineClock } from 'react-icons/hi2';

// Tambahkan di bagian atas setelah imports
const debugProduction = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`[Category Page] ${message}`);
    if (data) {
      console.log(
        `[Category Page] Data:`,
        typeof data === 'object'
          ? JSON.stringify(data).substring(0, 200) + '...'
          : data
      );
    }
  }
};

// Komponen untuk setiap post
const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link
      key={post.slug}
      href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
      className="group block relative"
    >
      <article className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6 lg:items-center py-4 px-4 rounded-sm transition-colors border border-neutral-800/70 hover:border-emerald-500/30 relative">
        {/* Legal document styling */}
        {/* <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors"></div> */}

        {/* Document filing number - legal style */}
        <div className="absolute top-2 right-2 z-10">
          <div className="text-[10px] text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono">
            REF-{post.slug.substring(0, 2).toUpperCase()}/
            {new Date(post.date).getFullYear().toString().substring(2)}
          </div>
        </div>

        {/* Image */}
        <figure className="isolate z-[1] pointer-events-none overflow-hidden rounded-sm lg:max-w-44 lg:w-full">
          <div className="relative pt-[60%]">
            <div className="absolute left-0 top-0 w-full h-full">
              <Image
                src={post.featuredImage || ''}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 176px, 100vw"
              />
            </div>
          </div>
        </figure>

        {/* Content */}
        <div className="w-full">
          <div className="flex items-center gap-3">
            <p className="text-sm text-neutral-400 font-mono flex items-center gap-1.5">
              <span className="h-[1px] w-3 bg-neutral-700"></span>
              {new Date(post.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              <span className="h-[1px] flex-grow bg-neutral-700"></span>
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
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-sm px-1.5 py-0.5 text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800 group-hover:border-neutral-700 transition-colors"
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

  // Debug rendering dan data di production
  useEffect(() => {
    debugProduction('Component mounted with data', {
      categoryName: category?.name,
      categorySlug: category?.slug,
      postsCount: posts?.length,
    });
  }, [category, posts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      debugProduction('Component fully loaded');
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
      <PowerfulSEO
        title={`${category.name} Articles`}
        description={`Explore ${category.name.toLowerCase()} articles by AL KINDI. In-depth analysis and insights on ${category.name.toLowerCase()} topics.`}
        image="/images/default.png"
      />

      {/* Background Effect */}
      <div
        className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950"
        style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="h-[400px] w-[550px] rounded-full bg-gradient-to-r from-[#2E996C]/70 to-[#0F3324]/10 blur-[150px] absolute top-0 -translate-y-full rotate-45 origin-left z-[-2] left-[15%]"
        />
        <Image
          alt=""
          width={1280}
          height={825}
          className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
          src="/images/textures/crumpled-3.jpg"
          priority
        />

        {/* Legal paper texture */}
        <div className="absolute inset-0 opacity-10">
          <div
            style={{
              backgroundImage:
                'linear-gradient(0deg, rgba(16,185,129,0.08) 1px, transparent 1px)',
              backgroundSize: '100% 28px',
            }}
            className="h-full w-full"
          />
        </div>

        {/* Legal document corner decorations */}
        <div className="absolute top-24 left-24 opacity-15">
          <div className="w-40 h-40 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-md"></div>
        </div>
        <div className="absolute bottom-24 right-24 opacity-15">
          <div className="w-40 h-40 border-b-2 border-r-2 border-emerald-500/40 rounded-br-md"></div>
        </div>
      </div>

      <main className={clsx('content-spacing', !isLoaded && 'opacity-0')}>
        <section className="min-h-screen pt-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section - Matching Blog Style */}
            <div className="mb-12 max-w-2xl mx-auto text-center" data-fade="1">
              <div className="flex items-center space-x-2 mb-2 justify-center">
                <HiLibrary className="text-emerald-400 w-5 h-5" />
                <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
                  {category.name} Collection
                </h2>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                <span className="gradient-text">{category.name}</span> Articles
              </h3>
              <p className="text-neutral-400 leading-relaxed text-center">
                {category.description}
              </p>

              {/* Document Number Line */}
              <div className="flex items-center my-8">
                <div className="h-px flex-grow bg-neutral-800/50"></div>
                <div className="px-4 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 rounded-sm bg-emerald-900/10">
                  CATEGORY INDEX
                </div>
                <div className="h-px flex-grow bg-neutral-800/50"></div>
              </div>
            </div>

            <div className="mb-6">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {/* Search Input - Matching Blog Style */}
            <div className="mt-8 mb-8" data-fade="2">
              <div className="relative mx-auto max-w-2xl">
                <div className="relative group h-full border border-neutral-800/70 rounded-md overflow-hidden hover:border-emerald-500/30 transition-all duration-300 bg-neutral-900/20">
                  {/* Legal document styling */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                  {/* <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-emerald-500/30"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-emerald-500/30"></div> */}

                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-neutral-200 rounded-xl px-12 py-3 outline-none transition-all duration-300 text-sm md:text-base placeholder-neutral-600"
                  />
                  <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>
                {searchQuery && (
                  <p className="mt-3 text-sm text-gray-400 text-center">
                    Found {filteredPosts.length} article
                    {filteredPosts.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Blog Posts List - Legal Styled */}
            <div className="relative mb-8" data-fade="3">
              {/* Legal document styling */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
              {/* <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-emerald-500/30"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-emerald-500/30"></div> */}

              <div className="space-y-6 py-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                  ))
                ) : (
                  <div className="text-center py-10 border border-neutral-800/70 rounded-sm p-6 relative">
                    {/* Legal document styling */}
                    {/* <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-emerald-500/30"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-emerald-500/30"></div> */}

                    <h3 className="text-xl font-bold mb-1">
                      Sorry, <Accent>article not found</Accent>
                    </h3>
                    <p className="text-sm text-neutral-400">
                      No articles found for your search query
                    </p>
                  </div>
                )}
              </div>

              {/* Document footer */}
              <div className="mt-8 text-center text-[10px] text-neutral-500 font-mono">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="h-px w-12 bg-neutral-800"></div>
                  <HiScale className="w-4 h-4 text-emerald-500/40" />
                  <div className="h-px w-12 bg-neutral-800"></div>
                </div>
                BLOG- {category.slug.toUpperCase()}-{new Date().getFullYear()}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await getAllCategories();
    const paths = categories.map((category: BlogCategory) => ({
      params: { category: category.slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const categories = await getAllCategories();
    const category = categories.find(
      (cat: BlogCategory) => cat.slug === params?.category
    );

    if (!category) {
      return {
        notFound: true,
      };
    }

    const allPosts = await getAllPosts();
    const posts = allPosts.filter(
      (post) => post.category.toLowerCase() === category.slug.toLowerCase()
    );

    return {
      props: {
        posts,
        category,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
};
