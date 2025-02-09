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

  const handleArticleClick = async (post: BlogPost) => {
    try {
      // Tambahkan class untuk animasi fade out
      document.body.classList.add('fade-out');

      // Tunggu animasi fade out selesai
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Navigasi ke artikel baru
      const href = `/blog/${post.category.toLowerCase()}/${post.slug}`;
      await router.push(href, undefined, { scroll: false });

      // Scroll ke atas dengan smooth
      // window.scrollTo({ top: 0, behavior: 'smooth' });

      // Hapus class fade out dan reload halaman
      document.body.classList.remove('fade-out');
      router.reload();
    } catch (error) {
      console.error('Failed to navigate:', error);
    }
  };

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
            onClick={() => handleArticleClick(post)}
            isRelated={true}
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
