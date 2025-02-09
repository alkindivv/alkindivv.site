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

    if (onClick) {
      onClick();
      return;
    }

    const href = `/blog/${post.category.toLowerCase()}/${post.slug}`;

    try {
      // Tambahkan class untuk animasi fade out
      document.body.classList.add('fade-out');

      // Tunggu animasi fade out selesai
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Navigasi ke halaman artikel
      await router.push(href, undefined, { scroll: false });

      // Scroll ke atas dengan smooth
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Hapus class fade out
      document.body.classList.remove('fade-out');

      // Reload hanya jika ini adalah related article
      if (isRelated) {
        router.reload();
      }
    } catch (error) {
      console.error('Failed to navigate:', error);
      window.location.href = href;
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
                <div className="relative h-[150px] md:h-[170px] overflow-hidden rounded-t-lg">
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

              {/* Date */}
              <div className="flex-1 p-4 flex flex-col">
                <p className="text-xs md:text-sm text-[#737373] mb-2 transition-colors group-hover:text-neutral-200">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </p>

                {/* Title */}
                <h2 className="text-lg md:text-xl font-semibold text-neutral-50 mb-3 line-clamp-2 transition-colors group-hover:text-white">
                  <HighlightedText
                    text={post.title}
                    searchQuery={searchQuery}
                  />
                </h2>

                {/* Meta Info */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <HiOutlineClock className="w-4 h-4 text-emerald-500" />
                    <p className="text-xs md:text-sm text-neutral-50 font-medium">
                      {post.readingTime} min read
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
                <p className="text-sm md:text-base text-neutral-400 mb-6 line-clamp-3 transition-colors group-hover:text-neutral-300">
                  <HighlightedText
                    text={post.excerpt || ''}
                    searchQuery={searchQuery}
                  />
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags?.map((tag) => (
                    <Tag
                      key={tag}
                      variant={checkTagged?.(tag) ? 'gradient' : 'default'}
                      className={clsx(
                        'text-xs md:text-sm px-2 py-1',
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
