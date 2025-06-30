import React, { Suspense } from 'react';
import { getAllPosts } from '@/lib/posts';
import BlogPageClient from './BlogPageClient';
import { viewport } from '../viewport';
import { Metadata } from 'next';
import StructuredData from '@/components/shared/StructuredData';
import { metadata as blogMetadata } from './metadata';

export { viewport };
export const metadata: Metadata = blogMetadata;

interface BlogPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Fetch blog posts on the server side
  const blogPosts = await getAllPosts();

  // Extract query parameters
  const search =
    typeof searchParams?.search === 'string' ? searchParams.search : '';
  const tag = typeof searchParams?.tag === 'string' ? searchParams.tag : '';
  const page =
    typeof searchParams?.page === 'string' ? parseInt(searchParams.page) : 1;

  // Kumpulkan semua tag unik untuk ditampilkan sebagai filter di client
  const uniqueTags = Array.from(
    new Set(
      blogPosts.flatMap((p) => p.tags ?? []).map((tg) => tg.toLowerCase())
    )
  ).sort();

  // Filter posts di server agar initial render sesuai query
  const filtered = blogPosts
    .filter((post) => {
      const searchContent = [
        post.title,
        post.description,
        post.excerpt,
        ...(post.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        !search || searchContent.includes(search.toLowerCase());
      const matchesTag =
        !tag || post.tags?.some((tg) => tg.toLowerCase() === tag.toLowerCase());

      return matchesSearch && matchesTag;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Suspense fallback={<BlogPageLoading />}>
      <BlogPageClient
        initialPosts={filtered}
        initialSearch={search}
        initialTag={tag}
        initialPage={page}
        tags={uniqueTags}
      />
      <StructuredData
        type="webPage"
        pageTitle="Blog - AL KINDI"
        pageDescription="Article, News, Thoughts, and Insights about law, technology, and cryptocurrency written by me based on my personal experiences and research"
        pagePath="/blog/"
      />
    </Suspense>
  );
}

function BlogPageLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="animate-pulse">
        <div className="h-10 bg-neutral-800 rounded w-1/3 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-neutral-800 rounded-lg p-6">
                <div className="h-40 bg-neutral-700 rounded-md mb-4"></div>
                <div className="h-6 bg-neutral-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
