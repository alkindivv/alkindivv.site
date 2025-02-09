import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';
import Link from 'next/link';
import Accent from '@/components/shared/Accent';
import Tag from '@/components/shared/Tag';
import clsx from 'clsx';
import { BlogPost } from '@/types/blog';
import { useRouter } from 'next/router';
import HighlightedText from '@/components/shared/HighlightedText';
import { usePageViews } from '@/lib/hooks/usePageViews';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  checkTagged?: (tag: string) => boolean;
  onClick?: () => void;
  index?: number;
  isRelated?: boolean;
  _customContent?: (
    post: BlogPost,
    views: number | string,
    readingTimeMinutes: number,
    publishedDate: string
  ) => React.ReactNode;
  searchQuery?: string;
}

const BlogCard = ({
  post,
  className = '',
  checkTagged,
  onClick,
  index: _index,
  isRelated = false,
  _customContent: customContent,
  searchQuery = '',
}: BlogCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const views = usePageViews(post.slug);

  useEffect(() => {
    let rafId: number;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardRef.current) {
            rafId = requestAnimationFrame(() => {
              cardRef.current?.classList.add('animate-in');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();

    try {
      if (isRelated) {
        window.scrollTo(0, 0);
        await router.push(`/blog/${post.category.toLowerCase()}/${post.slug}`);
        router.reload();
      } else {
        window.location.href = `/blog/${post.category.toLowerCase()}/${post.slug}`;
      }
    } catch (error) {
      console.error('Failed to navigate:', error);
      window.location.href = `/blog/${post.category.toLowerCase()}/${post.slug}`;
    }
  };

  return (
    <article
      ref={cardRef}
      className={clsx(
        className,
        'opacity-0 translate-y-4',
        'transition-all duration-500 ease-out'
      )}
    >
      <div className="relative flex flex-col h-full">
        <Link
          href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
          className="block h-full group focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
          onClick={handleClick}
        >
          {customContent ? (
            customContent(post, views, post.readingTime, post.date)
          ) : (
            <>
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative h-[130px] md:h-[170px] overflow-hidden rounded-t-lg">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={_index !== undefined && _index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/5 via-[#0a0a0a]/50 to-[#0a0a0a] opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col">
                {/* Meta Info */}
                <div className="flex items-center gap-3 text-sm text-[#737373] mb-2 transition-colors group-hover:text-neutral-300">
                  <time className="flex items-center gap-1">
                    <HiOutlineClock className="inline w-[1rem] h-[1rem]" />
                    <Accent className="text-xs md:text-sm">
                      {post.readingTime} min read
                    </Accent>
                  </time>
                  <div className="flex items-center gap-1">
                    <HiOutlineEye className="inline w-[1.1rem] h-[1.1rem]" />
                    <Accent className="text-xs md:text-sm">
                      {views} views
                    </Accent>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-base md:text-lg font-semibold text-neutral-50 mb-1 line-clamp-2 transition-colors group-hover:text-white">
                  <HighlightedText
                    text={post.title}
                    searchQuery={searchQuery}
                  />
                </h2>

                {/* Date */}
                <p className="text-xs md:text-sm text-[#737373] font-medium mb-2 transition-colors group-hover:text-neutral-200">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </p>

                {/* Excerpt */}
                <p className="text-xs md:text-sm text-neutral-400 mb-3 line-clamp-2 md:line-clamp-3 transition-colors group-hover:text-neutral-300">
                  <HighlightedText
                    text={post.excerpt || ''}
                    searchQuery={searchQuery}
                  />
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {post.tags?.map((tag) => (
                    <Tag
                      key={tag}
                      variant={checkTagged?.(tag) ? 'gradient' : 'default'}
                      className={clsx(
                        'text-xs md:text-sm px-2 py-0.5',
                        'rounded-md',
                        'bg-[#17171799] text-[#737373]',
                        'hover:text-emerald-500 hover:border-emerald-500/50',
                        'transition-colors',
                        'group-hover:text-neutral-300',
                        checkTagged?.(tag) &&
                          'bg-emerald-500/20 text-emerald-100'
                      )}
                    >
                      <HighlightedText text={tag} searchQuery={searchQuery} />
                    </Tag>
                  ))}
                </div>
              </div>
            </>
          )}
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
