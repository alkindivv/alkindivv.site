import React from 'react';
import { getAllPosts } from '@/lib/posts';
import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';
import { viewport } from '../viewport';

export { viewport };

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Article, News, Thoughts, and Insights about law, technology, and cryptocurrency written by me based on my personal experiences and research',
  alternates: {
    canonical: '/blog/',
  },
  openGraph: {
    title: 'Blog - AL KINDI',
    description:
      'Article, News, Thoughts, and Insights about law, technology, and cryptocurrency written by me based on my personal experiences and research',
    url: 'https://alkindivv.site/blog/',
    type: 'website',
    images: [
      {
        url: '/images/default.png',
        width: 1200,
        height: 630,
        alt: 'AL KINDI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - AL KINDI',
    description:
      'Article, News, Thoughts, and Insights about law, technology, and cryptocurrency written by me based on my personal experiences and research',
    images: ['/images/default.png'],
  },
};

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
    <BlogPageClient
      initialPosts={filtered}
      initialSearch={search}
      initialTag={tag}
      initialPage={page}
    />
  );
}
