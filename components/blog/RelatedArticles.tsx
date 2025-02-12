import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';
import { usePageViews } from '@/lib/hooks/usePageViews';
import { useRouter } from 'next/router';

// Komponen untuk setiap artikel
const RelatedArticleCard = ({ post }: { post: BlogPost }) => {
  const views = usePageViews(post.slug, false);
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const href = `/blog/${post.category.toLowerCase()}/${post.slug}`;

    try {
      // Karena kita tetap di halaman yang sama, kita perlu me-reload
      // agar useEffect di halaman artikel terpanggil ulang
      await router.push(href);
      router.reload();
    } catch (error) {
      console.error('Failed to navigate:', error);
      window.location.href = href;
    }
  };

  return (
    <Link
      href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
      className="block hover:bg-neutral-800/50"
      onClick={handleClick}
    >
      <article className="flex gap-6 items-center p-3">
        {/* Image */}
        <div className="w-44 h-28 relative rounded-md overflow-hidden">
          <Image
            src={post.featuredImage || ''}
            alt={post.title}
            fill
            className="object-cover"
            sizes="176px"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-sm text-neutral-400">
            {new Date(post.date).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <h3 className="mt-2 text-lg font-semibold text-neutral-200">
            {post.title}
          </h3>

          <p className="mt-1 text-sm text-neutral-400 line-clamp-2">
            {post.description || post.excerpt}
          </p>

          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <HiOutlineClock className="w-4 h-4 text-emerald-500" />
              <p className="text-xs text-neutral-400">
                {post.readingTime} min read
              </p>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineEye className="w-4 h-4 text-emerald-500" />
              <p className="text-xs text-neutral-400">{views} views</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

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
    <div className="space-y-6">
      {relatedPosts.map((post, index) => (
        <div key={post.slug} data-fade={index + 1}>
          <RelatedArticleCard post={post} />
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
