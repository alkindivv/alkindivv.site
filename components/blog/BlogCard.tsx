import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';
import Link from 'next/link';
import Accent from '@/components/shared/Accent';
import Tag from '@/components/shared/Tag';
import styles from '@/styles/Blog.module.css';
import clsx from 'clsx';
import useSWR from 'swr';
import { BlogPost } from '@/types/blog';
import { useRouter } from 'next/router';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  checkTagged?: (tag: string) => boolean;
  onClick?: () => void;
  index?: number;
  isRelated?: boolean;
}

const BlogCard = ({
  post,
  className = '',
  checkTagged,
  onClick,
  index: _index,
  isRelated = false,
}: BlogCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const { data: viewsData, mutate } = useSWR(
    `/api/page-views/?slug=${post.slug}`,
    async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch views');
      return res.json();
    },
    {
      refreshInterval: 30000,
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      revalidateOnMount: true,
    }
  );

  const views = viewsData?.views ?? '–';

  useEffect(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (cardRef.current) {
              cardRef.current.style.opacity = '1';
              cardRef.current.style.transform = 'translateY(0)';
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const readingTimeMinutes = post.readingTime;
  const publishedDate = post.date;

  const handleClick = async () => {
    if (isRelated) {
      // Reset scroll and clear observers
      window.scrollTo(0, 0);
      const observers = (window as any).__observers__;
      if (observers) {
        Object.values(observers).forEach((observer: any) => {
          observer.disconnect();
        });
        (window as any).__observers__ = {};
      }
    }

    // Call parent onClick if provided
    onClick?.();

    if (isRelated) {
      // Force a hard navigation for related posts
      await router.push(`/blog/${post.category.toLowerCase()}/${post.slug}`);
      router.reload();
    }
  };

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${className}`}
      style={{
        opacity: 0,
        transform: 'translateY(10px)',
        transition: 'all 0.3s ease-out',
      }}
      onClick={handleClick}
    >
      {!isRelated ? (
        <Link
          href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
          className="block h-full focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
        >
          <BlogCardContent
            post={post}
            views={views}
            readingTimeMinutes={readingTimeMinutes}
            publishedDate={publishedDate}
            checkTagged={checkTagged}
          />
        </Link>
      ) : (
        <div className="block h-full">
          <BlogCardContent
            post={post}
            views={views}
            readingTimeMinutes={readingTimeMinutes}
            publishedDate={publishedDate}
            checkTagged={checkTagged}
          />
        </div>
      )}
    </article>
  );
};

// Separate component for card content to avoid duplication
const BlogCardContent = ({
  post,
  views,
  readingTimeMinutes,
  publishedDate,
  checkTagged,
}: {
  post: BlogPost;
  views: number | string;
  readingTimeMinutes: number;
  publishedDate: string;
  checkTagged?: (tag: string) => boolean;
}) => (
  <div className="relative flex flex-col h-full rounded-xl border border-gray-700 overflow-hidden group transition-all duration-300">
    <div className="relative h-48 overflow-hidden">
      <Image
        src={post.featuredImage || ''}
        alt={post.title}
        fill
        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 backdrop-blur-[0px] opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute bottom-0.5 right-1.5 flex flex-wrap gap-1 justify-end">
        {Array.isArray(post.tags)
          ? post.tags.map((tag) => (
              <Tag
                key={tag}
                variant={checkTagged?.(tag) ? 'gradient' : 'default'}
                className={clsx(
                  'inline-block',
                  'px-1 py-0.5 text-xs md:text-sm 2xl:text-sm',
                  'rounded-md border',
                  'bg-black border-gray-600 text-gray-200',
                  'hover:text-white',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                  checkTagged?.(tag) && 'bg-emerald-500 text-white',
                  'transition-colors'
                )}
              >
                {tag}
              </Tag>
            ))
          : null}
      </div>
    </div>

    <div className={styles.content}>
      <h4 className={styles.title}>{post.title}</h4>

      <div className={styles.meta}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <HiOutlineClock className="text-base" />
            <Accent>{readingTimeMinutes} min read</Accent>
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineEye className="text-base" />
            <Accent>{views} views</Accent>
          </div>
        </div>
      </div>

      <p className={styles.date}>
        {format(new Date(publishedDate), 'MMMM dd, yyyy')}
      </p>

      <p className="text-sm md:text-base text-gray-400 line-clamp-2">
        {post.excerpt}
      </p>
    </div>
  </div>
);

export default BlogCard;
