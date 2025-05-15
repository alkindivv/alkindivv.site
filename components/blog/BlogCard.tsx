import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { HiOutlineClock, HiOutlineEye, HiArrowRight } from 'react-icons/hi';
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
  variant?: 'default' | 'featured' | 'compact' | 'minimal';
}

const BlogCard = ({
  post,
  className = '',
  checkTagged,
  index: _index,
  isRelated = false,
  searchQuery = '',
  variant = 'default',
}: BlogCardProps) => {
  const router = useRouter();
  const views = usePageViews(post.slug);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const href = `/blog/${post.category.toLowerCase()}/${post.slug}`;

    try {
      await router.push(href);
      // Reload hanya jika ini adalah related article untuk memperbarui views
      if (isRelated) {
        router.reload();
      }
    } catch (error) {
      console.error('Failed to navigate:', error);
      window.location.href = href;
    }
  };

  // Featured Card (untuk artikel unggulan)
  if (variant === 'featured') {
    return (
      <article className={clsx('relative h-full', className)}>
        <Link
          href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
          className="group h-full flex flex-col relative overflow-hidden rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
          onClick={handleClick}
        >
          {/* Background Image with Overlay */}
          {post.featuredImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={_index !== undefined && _index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 group-hover:via-black/70 transition-all duration-300" />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
            <div className="flex-1 flex flex-col">
              {/* Category & Date */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-300 rounded-full">
                  {post.category}
                </span>
                <p className="text-xs text-neutral-400">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </p>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 line-clamp-2 transition-colors group-hover:text-emerald-300">
                <HighlightedText text={post.title} searchQuery={searchQuery} />
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-neutral-300 mb-6 line-clamp-3">
                <HighlightedText
                  text={post.excerpt || ''}
                  searchQuery={searchQuery}
                />
              </p>

              {/* Meta & CTA */}
              <div className="mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <HiOutlineClock className="w-3.5 h-3.5 text-emerald-500" />
                      <p className="text-xs text-neutral-300">
                        {post.readingTime} min
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiOutlineEye className="w-4 h-4 text-emerald-500" />
                      <p className="text-xs text-neutral-300">{views} views</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-emerald-400 group-hover:translate-x-0.5 transition-transform duration-300">
                    Read <HiArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Compact Card (untuk tampilan list)
  if (variant === 'compact') {
    return (
      <article className={clsx('h-full', className)}>
        <Link
          href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
          className="group h-full flex gap-4 p-3 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-black/20 hover:bg-black/40 transition-all duration-300"
          onClick={handleClick}
        >
          {/* Thumbnail */}
          {post.featuredImage && (
            <div className="relative flex-shrink-0 h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-md">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 80px, 64px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col flex-1">
            <h3 className="text-sm md:text-base font-semibold text-neutral-100 mb-1 line-clamp-2 group-hover:text-emerald-400 transition-colors">
              <HighlightedText text={post.title} searchQuery={searchQuery} />
            </h3>
            <div className="flex items-center gap-3 mt-auto text-xs text-neutral-400">
              <span>{format(new Date(post.date), 'MMM dd, yyyy')}</span>
              <span className="flex items-center gap-1">
                <HiOutlineClock className="w-3 h-3" />
                {post.readingTime} min
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Minimal Card (untuk sidebar atau related posts)
  if (variant === 'minimal') {
    return (
      <article className={clsx('h-full', className)}>
        <Link
          href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
          className="group flex flex-col p-4 rounded-lg hover:bg-neutral-900/30 transition-all duration-300"
          onClick={handleClick}
        >
          <h3 className="text-sm font-medium text-neutral-200 mb-1 line-clamp-2 group-hover:text-emerald-400 transition-colors">
            <HighlightedText text={post.title} searchQuery={searchQuery} />
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
            <span>{format(new Date(post.date), 'MMM dd')}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <HiOutlineClock className="w-3 h-3" />
              {post.readingTime}m
            </span>
          </div>
        </Link>
      </article>
    );
  }

  // Default Card
  return (
    <article className={clsx('h-full', className)}>
      <Link
        href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
        className="group h-full flex flex-col bg-transparent border border-neutral-800 hover:border-neutral-700 hover:shadow-md hover:shadow-emerald-900/5 rounded-lg transition-all duration-300 overflow-hidden"
        onClick={handleClick}
      >
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={_index !== undefined && _index < 3}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-medium bg-black/40 backdrop-blur-sm text-neutral-200 rounded-md border border-neutral-800/50">
                {post.category}
              </span>
            </div>
          </div>
        )}

        <div className="flex-1 p-4 md:p-5 flex flex-col">
          {/* Date */}
          <p className="text-xs text-neutral-400 mb-2 transition-colors group-hover:text-neutral-300">
            {format(new Date(post.date), 'MMMM dd, yyyy')}
          </p>

          {/* Title */}
          <h2 className="text-base md:text-lg font-semibold text-neutral-50 mb-3 line-clamp-2 transition-colors group-hover:text-white">
            <HighlightedText text={post.title} searchQuery={searchQuery} />
          </h2>

          {/* Meta Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <HiOutlineClock className="w-3.5 h-3.5 text-emerald-500" />
              <p className="text-xs md:text-sm text-neutral-200 font-medium">
                {post.readingTime} min
              </p>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineEye className="w-4 h-4 text-emerald-500" />
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
            {post.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={clsx(
                  'px-1.5 py-0.5 text-xs rounded-lg transition-colors',
                  checkTagged?.(tag)
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-neutral-900 text-neutral-400 group-hover:bg-neutral-800 group-hover:text-neutral-300'
                )}
              >
                <HighlightedText text={tag} searchQuery={searchQuery} />
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
