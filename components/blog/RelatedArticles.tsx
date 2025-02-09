import React from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types/blog';

interface RelatedArticlesProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

const RelatedArticles = ({ currentPost, allPosts }: RelatedArticlesProps) => {
  // Filter related posts based on tags and category
  const relatedPosts = allPosts
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
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
      {relatedPosts.map((post, index) => (
        <div
          key={post.slug}
          className="transform transition-all duration-300 ease-in-out hover:-translate-y-1"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <BlogCard
            post={post}
            className="h-full bg-transparent border border-neutral-800 hover:border-neutral-700 rounded-lg transition-all duration-300"
          />
        </div>
      ))}
      {relatedPosts.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          No related articles found.
        </p>
      )}
    </div>
  );
};

export default RelatedArticles;
