import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';
import Link from 'next/link';
import Accent from './Accent';
import Tag from './Tag';
import styles from '../styles/Blog.module.css';
import clsx from 'clsx';
import useSWR from 'swr';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  checkTagged?: (tag: string) => boolean;
  onClick?: (_: any) => void;
  index?: number;
}

const BlogCard = ({
  post,
  className = '',
  checkTagged,
  onClick: _onClick,
  index: _index,
}: BlogCardProps) => {
  const cardRef = useRef<HTMLElement>(null);

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

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${className}`}
      style={{
        opacity: 0,
        transform: 'translateY(10px)',
        transition: 'all 0.3s ease-out',
      }}
    >
      <Link
        href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
        className="block h-full focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
      >
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

            <p className={styles.excerpt}>{post.excerpt}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
