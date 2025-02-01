import React from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types/blog';
import { useRouter } from 'next/router';

interface RelatedArticlesProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

const RelatedArticles = ({ currentPost, allPosts }: RelatedArticlesProps) => {
  const router = useRouter();

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

  const handlePostClick = (slug: string, category: string) => {
    // Add fade out effect before navigation
    document.body.classList.add('loading');
    setTimeout(() => {
      router.push(`/blog/${category.toLowerCase()}/${slug}`);
    }, 300);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {relatedPosts.map((post, index) => (
        <div
          key={post.slug}
          className="transform transition-all duration-300 ease-in-out hover:-translate-y-1"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <BlogCard
            post={post}
            onClick={() => handlePostClick(post.slug, post.category)}
            isRelated
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
