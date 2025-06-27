import React from 'react';
import { getAllPosts } from '@/lib/posts';
import BlogPageClient from './BlogPageClient';
import { viewport } from '../viewport';

export { viewport };

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
