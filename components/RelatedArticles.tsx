import React from "react";
import BlogCard from "./BlogCard";

// Definisikan interface untuk tipe BlogPost
interface BlogPost {
  publishedAt: string;
  banner: string;
  description: string;
  readingTime: string | { text: string };
  views: number;
  category: string;
  slug: string;
  title: string;
  tags: string[];
  excerpt: string;
  featuredImage: string;
  date: string;
  author?: string;
}

interface RelatedArticlesProps {
  currentPost: {
    title: string;
    date: string;
    author: string;
    excerpt?: string;
    tags?: string[];
    featuredImage?: string;
    category: string;
    views?: number;
  };
  allPosts: BlogPost[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentPost,
  allPosts,
}) => {
  // Filter posts berdasarkan kesamaan tags dan category
  const relatedPosts = allPosts
    .filter((post) => {
      // Jangan tampilkan artikel yang sama
      if (post.title === currentPost.title) return false;

      // Cek kesamaan kategori
      const sameCategory = post.category === currentPost.category;

      // Cek kesamaan tag
      const currentTags = currentPost.tags || [];
      const postTags = post.tags || [];
      const hasCommonTags = postTags.some((tag) => currentTags.includes(tag));

      // Tampilkan jika kategori sama atau memiliki tag yang sama
      return sameCategory || hasCommonTags;
    })
    .sort((a, b) => {
      // Hitung jumlah tag yang sama
      const aTags = a.tags || [];
      const bTags = b.tags || [];
      const currentTags = currentPost.tags || [];

      const aMatchCount = aTags.filter((tag) =>
        currentTags.includes(tag)
      ).length;
      const bMatchCount = bTags.filter((tag) =>
        currentTags.includes(tag)
      ).length;

      // Sort berdasarkan jumlah tag yang cocok (descending)
      return bMatchCount - aMatchCount;
    })
    .slice(0, 3); // Ambil 3 artikel teratas

  if (relatedPosts.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No related articles found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {relatedPosts.map((post, index) => (
        <BlogCard
          key={post.slug}
          post={post}
          index={index}
          className="transition-all duration-300"
        />
      ))}
    </div>
  );
};

export default RelatedArticles;
