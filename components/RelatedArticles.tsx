import React from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types/blog';

interface RelatedArticlesProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentPost,
  allPosts,
}) => {
  // Filter posts berdasarkan kesamaan tags dan category
  const relatedPosts = allPosts
    .filter((post) => {
      if (post.slug === currentPost.slug) return false;

      const sameCategory = post.category === currentPost.category;
      const currentTags = currentPost.tags || [];
      const postTags = post.tags || [];
      const hasCommonTags = postTags.some((tag) => currentTags.includes(tag));

      return sameCategory || hasCommonTags;
    })
    .sort((a, b) => {
      const aTags = a.tags || [];
      const bTags = b.tags || [];
      const currentTags = currentPost.tags || [];

      const aMatchCount = aTags.filter((tag) =>
        currentTags.includes(tag)
      ).length;
      const bMatchCount = bTags.filter((tag) =>
        currentTags.includes(tag)
      ).length;

      return bMatchCount - aMatchCount;
    })
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No related articles found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {relatedPosts.map((post) => (
        <BlogCard
          key={post.slug}
          post={post}
          className="transition-all duration-300"
        />
      ))}
    </div>
  );
};

export default RelatedArticles;
