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
  // Calculate relevance score for each post
  const getRelevanceScore = (post: BlogPost) => {
    let score = 0;

    // Same category gets highest score
    if (post.category === currentPost.category) {
      score += 5;
    }

    // Matching tags
    const currentTags = new Set(currentPost.tags || []);
    (post.tags || []).forEach((tag) => {
      if (currentTags.has(tag)) {
        score += 2;
      }
    });

    // Recent posts get a bonus
    const postDate = new Date(post.date);
    const currentDate = new Date();
    const daysDifference =
      (currentDate.getTime() - postDate.getTime()) / (1000 * 3600 * 24);
    if (daysDifference < 30) {
      score += 1;
    }

    return score;
  };

  // Get related posts
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug) // Exclude current post
    .map((post) => ({
      ...post,
      relevanceScore: getRelevanceScore(post),
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3); // Get top 3 related posts

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
