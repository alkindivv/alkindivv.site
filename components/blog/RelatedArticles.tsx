// 'use client';

import React from 'react';
import { BlogPost } from '@/types/blog';
import BlogCard from '@/components/blog/BlogCard';
import ArticleCardAlt from './ArticleCardAlt';

export interface RelatedArticlesProps {
  currentPost: BlogPost;
  posts: BlogPost[];
}

const RelatedArticles = ({ currentPost, posts }: RelatedArticlesProps) => {
  // Filter related posts based on tags and category
  const relatedPosts = posts
    .filter((post) => {
      if (post.slug === currentPost.slug) return false;

      const hasMatchingTag = currentPost.tags?.some((tag) =>
        post.tags?.includes(tag)
      );
      const isSameCategory = post.category === currentPost.category;

      return hasMatchingTag || isSameCategory;
    })
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {relatedPosts.map((post, index) => (
        <div key={post.slug} data-fade={index + 1}>
          <ArticleCardAlt key={post.slug} post={post} />
        </div>
      ))}
      {relatedPosts.length === 0 && (
        <div className="gradient-text text-center py-8 border border-neutral-800/40 rounded-sm p-6 relative">
          <p className="font-mono">No related articles found.</p>
        </div>
      )}
    </div>
  );
};

export default RelatedArticles;
