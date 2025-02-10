import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';
import Link from 'next/link';
import clsx from 'clsx';
import { BlogPost } from '@/types/blog';
import { useRouter } from 'next/router';
import HighlightedText from '@/components/shared/HighlightedText';
import { usePageViews } from '@/lib/hooks/usePageViews';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  checkTagged?: (tag: string) => boolean;
  index?: number;
  isRelated?: boolean;
  searchQuery?: string;
}

const BlogCard = ({
  post,
  className = '',
  checkTagged,
  index: _index,
  isRelated = false,
  searchQuery = '',
}: BlogCardProps) => {
  const router = useRouter();
  const views = usePageViews(post.slug, false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const href = `/blog/${post.category.toLowerCase()}/${post.slug}`;

    try {
      await router.push(href);
    } catch (error) {
      console.error('Failed to navigate:', error);
      window.location.href = href;
    }
  };

  return (
    <article className={className}>
      <Link
        href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
        className="group h-full bg-transparent border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors block"
        onClick={handleClick}
      >
        <div className="h-full flex flex-col">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform group-hover:scale-105"
                priority={_index !== undefined && _index < 3}
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          <div className="flex-1 p-4 flex flex-col">
            <p className="text-xs md:text-sm text-neutral-400 mb-2 transition-colors group-hover:text-neutral-300">
              {format(new Date(post.date), 'MMMM dd, yyyy')}
            </p>

            {/* Title */}
            <h2 className="text-base md:text-lg font-semibold text-neutral-50 mb-3 line-clamp-2 transition-colors group-hover:text-white">
              <HighlightedText text={post.title} searchQuery={searchQuery} />
            </h2>

            {/* Meta Info */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <HiOutlineClock className="w-3.5 h-3.5 text-emerald-600" />
                <p className="text-xs md:text-sm text-neutral-50 font-medium">
                  {post.readingTime} min read
                </p>
              </div>
              <div className="flex items-center gap-1">
                <HiOutlineEye className="w-4 h-4 text-emerald-600" />
                <p className="text-xs md:text-sm text-neutral-200 font-medium">
                  {views} views
                </p>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-xs md:text-sm text-neutral-400 mb-4 line-clamp-3 transition-colors group-hover:text-neutral-300">
              <HighlightedText
                text={post.excerpt || ''}
                searchQuery={searchQuery}
              />
            </p>

            {/* Tags */}
            <div className="mt-auto flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className={clsx(
                    'px-1.5 py-0.5 text-xs rounded-lg transition-colors',
                    checkTagged?.(tag)
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-neutral-900 text-neutral-400'
                  )}
                >
                  <HighlightedText text={tag} searchQuery={searchQuery} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
