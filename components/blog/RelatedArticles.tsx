'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { HiOutlineClock, HiCalendar } from 'react-icons/hi';

// Komponen untuk setiap artikel
const RelatedArticleCard = ({ post }: { post: BlogPost }) => {
  const href = `/blog/${post.category.toLowerCase()}/${post.slug}`;

  return (
    <Link href={href} className="group block">
      <article className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6 lg:items-center py-3 border border-transparent hover:border-neutral-800/70 p-3 hover:bg-[#0a0a0a]/40 rounded-sm transition-all relative">
        {/* Garis dokumen header pada hover */}
        <div className="absolute top-0 left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/0 group-hover:via-emerald-500/20 to-transparent transition-colors"></div>

        {/* Image */}
        <figure className="isolate z-[1] pointer-events-none overflow-hidden rounded-sm lg:max-w-44 lg:w-full border border-neutral-800/40 group-hover:border-neutral-800/70 transition-colors">
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
          {/* Document ID & Date */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 ">
              {/* <HiDocumentText className="w-3.5 h-3.5 text-emerald-500/60" />
              <span>REF-{post.slug.substring(0, 3).toUpperCase()}</span> */}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <HiCalendar className="w-3.5 h-3.5 text-emerald-500/60" />
              <span className="">
                {new Date(post.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          <h3 className="mt-1 text-lg font-semibold text-neutral-300 group-hover:text-emerald-400 transition-colors">
            {post.title}
          </h3>

          <p className="text-sm text-neutral-400 mt-1 line-clamp-2 font-paragraf">
            {post.description || post.excerpt}
          </p>

          <div className="flex justify-between mt-3 items-center">
            <div className="flex items-center gap-2 border border-transparent group-hover:border-emerald-900/20 bg-transparent group-hover:bg-emerald-900/10 px-2 py-1 rounded-sm transition-all">
              <HiOutlineClock className="w-3.5 h-3.5 text-emerald-500/70" />
              <p className="text-xs text-neutral-400 font-mono">
                {post.readingTime} min read
              </p>
            </div>

            <div className="text-xs text-neutral-500 font-mono">
              {post.category}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export interface RelatedArticlesProps {
  currentPost: BlogPost;
  posts: BlogPost[];
}

const RelatedArticles = ({ currentPost, posts }: RelatedArticlesProps) => {
  // Filter related posts based on tags and category
  const relatedPosts = posts
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
    <div className="space-y-4">
      {relatedPosts.map((post, index) => (
        <div key={post.slug} data-fade={index + 1}>
          <RelatedArticleCard post={post} />
        </div>
      ))}
      {relatedPosts.length === 0 && (
        <div className="text-gray-400 text-center py-8 border border-neutral-800/40 rounded-sm p-6 relative">
          <p className="font-mono">No related articles found.</p>
        </div>
      )}
    </div>
  );
};

export default RelatedArticles;
