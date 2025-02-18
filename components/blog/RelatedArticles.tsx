import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';
import { usePageViews } from '@/lib/hooks/usePageViews';
import { useRouter } from 'next/router';

// Komponen untuk setiap artikel
const RelatedArticleCard = ({ post }: { post: BlogPost }) => {
  const views = usePageViews(post.slug);
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const href = `/blog/${post.category.toLowerCase()}/${post.slug}`;

    try {
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
      className="group block"
      onClick={handleClick}
    >
      <article className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6 lg:items-center py-3 rounded-lg transition-colors">
        {/* Image */}
        <figure className="isolate z-[1] pointer-events-none overflow-hidden rounded-md lg:max-w-44 lg:w-full">
          <div className="relative pt-[60%]">
            <div className="absolute left-0 top-0 w-full h-full">
              <Image
                src={post.featuredImage || ''}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 176px, 100vw"
              />
            </div>
          </div>
        </figure>

        {/* Content */}
        <div className="w-full">
          <div className="flex items-center gap-3">
            <p className="text-sm text-neutral-400">
              {new Date(post.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <h3 className="mt-3 text-xl font-semibold relative group-hover:text-emerald-500 transition-colors">
            <span
              className="bg-gradient-to-r from-emerald-500/30 via-emerald-500/90 to-emerald-500/30 box-decoration-clone group-hover:opacity-30 opacity-0 transition text-transparent"
              aria-hidden="true"
            >
              {post.title}
            </span>
            <span className="absolute left-0 top-0">{post.title}</span>
          </h3>

          <p className="text-sm text-neutral-400 mt-1 line-clamp-2">
            {post.description || post.excerpt}
          </p>

          <div className="flex justify-between mt-5 flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-5">
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
