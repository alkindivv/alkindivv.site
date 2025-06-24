'use client';

import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import {
  HiOutlineClock,
  HiOutlineEye,
  HiArrowRight,
  HiOutlineDocumentText,
  HiOutlineScale,
} from 'react-icons/hi';
import { GoLaw } from 'react-icons/go';
import { FaBitcoin } from 'react-icons/fa';
import Link from 'next/link';
import clsx from 'clsx';
import { BlogPost } from '@/types/blog';
import { useRouter } from 'next/navigation';
import HighlightedText from '@/components/shared/HighlightedText';
import { IoLogoBitcoin } from 'react-icons/io';
import { slugify } from '@/lib/utils/slug';
import AnimatedTooltip from '@/components/ui/AnimatedTooltip';
import { motion } from 'framer-motion';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  checkTagged?: (tag: string) => boolean;
  index?: number;
  isRelated?: boolean;
  searchQuery?: string;
  variant?: 'default' | 'featured' | 'compact' | 'minimal';
  priority?: boolean;
  hoveredIndex?: number | null;
  setHovered?: React.Dispatch<React.SetStateAction<number | null>>;
  setHoveredTags?: React.Dispatch<React.SetStateAction<string[] | null>>;
}

// Helper function to get the appropriate icon based on category
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'law':
      return <GoLaw className="w-3 h-3 text-emerald-400" />;
    case 'crypto':
    case 'cryptocurrency':
      return <IoLogoBitcoin className="w-3 h-3 text-emerald-400" />;
    default:
      return <HiOutlineDocumentText className="w-3 h-3 text-emerald-400" />;
  }
};

const BlogCard = ({
  post,
  className = '',
  checkTagged,
  index: _index,
  isRelated = false,
  searchQuery = '',
  variant = 'default',
  priority = false,
  hoveredIndex = null,
  setHovered,
  setHoveredTags,
}: BlogCardProps) => {
  const router = useRouter();
  const href = `/blog/${post.category.toLowerCase()}/${post.slug}`;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  // Get the appropriate icon for this post's category
  const categoryIcon = getCategoryIcon(post.category);

  // Default Card
  return (
    <motion.article
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
      onMouseEnter={() => {
        setHovered?.(_index ?? null);
        setHoveredTags?.(post.tags || []);
      }}
      onMouseLeave={() => {
        setHovered?.(null);
        setHoveredTags?.(null);
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--x', `${x}px`);
        e.currentTarget.style.setProperty('--y', `${y}px`);
      }}
      className={clsx(
        'group h-full flex flex-col bg-transparent rounded-lg transition-all duration-300 overflow-hidden relative cursor-pointer transform-gpu',
        hoveredIndex !== null &&
          hoveredIndex !== _index &&
          'blur-sm scale-[0.98]',
        className
      )}
    >
      {/* Spotlight Gradient */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(600px circle at var(--x) var(--y), rgba(34,211,151,0.15), transparent 40%)',
        }}
      />

      {/* === IMAGE WITH OVERLAY === */}
      {post.featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className=""
            priority={priority || (_index !== undefined && _index < 2)}
            quality={75}
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Category Badge - Legal document style */}
          <div className="absolute top-3 right-3">
            <span className="px-1 py-0.5 text-xs font-medium bg-black/40 backdrop-blur-sm text-neutral-200 rounded-lg border border-neutral-800/50 flex items-center gap-1.5">
              {categoryIcon}
              {post.category}
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 p-4 md:p-5 flex flex-col relative">
        {/* Watermark - Legal document style */}
        <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
          {post.category.toLowerCase() === 'law' ? (
            <GoLaw className="w-20 h-20" />
          ) : post.category.toLowerCase() === 'crypto' ||
            post.category.toLowerCase() === 'cryptocurrency' ? (
            <FaBitcoin className="w-20 h-20" />
          ) : (
            <HiOutlineScale className="w-20 h-20" />
          )}
        </div>

        {/* Date - Document filing style */}
        <div className="flex items-center gap-1.5 mb-2">
          {/* <div className="h-[1px] w-3 bg-neutral-700"></div> */}
          <p className="text-xs md:text-sm text-neutral-400 transition-colors group-hover:text-neutral-300 paragraph-text">
            {format(new Date(post.date), 'MMMM dd, yyyy')}
          </p>
          {/* <div className="h-[1px] flex-grow bg-neutral-700"></div> */}
        </div>

        {/* Title */}
        <h2 className="text-base md:text-lg font-semibold text-neutral-50 mb-3 line-clamp-2 transition-colors group-hover:text-white">
          <HighlightedText text={post.title} searchQuery={searchQuery} />
        </h2>

        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <HiOutlineClock className="w-3.5 h-3.5 text-[#08c488]" />
            <p className="text-xs md:text-sm text-neutral-200 font-medium">
              {post.readingTime} min read
            </p>
          </div>
        </div>

        {/* Excerpt */}
        <p className="excerpt mb-4 line-clamp-3 transition-colors group-hover:text-neutral-300">
          <HighlightedText
            text={post.excerpt || ''}
            searchQuery={searchQuery}
          />
        </p>

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-2">
          {post.tags?.slice(0, 3).map((tag) => (
            <button
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/blog/tag/${slugify(tag)}`);
              }}
              className={clsx(
                'px-1.5 py-1 text-xs rounded-lg transition-all duration-300',
                checkTagged?.(tag)
                  ? ' text-emerald-500 bg-emerald-500/10'
                  : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 border-neutral-800 hover:border-neutral-700'
              )}
            >
              <HighlightedText text={tag} searchQuery={searchQuery} />
            </button>
          ))}
        </div>

        {/* Bottom line - Document footer */}
        <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-neutral-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
