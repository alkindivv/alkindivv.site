import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { HiOutlineClock } from 'react-icons/hi';
import { format } from 'date-fns';
import { slugify } from '@/lib/utils/slug';

interface ArticleCardAltProps {
  post: BlogPost;
}

const ArticleCardAlt = ({ post }: ArticleCardAltProps) => {
  const href = `/blog/${post.category.toLowerCase()}/${post.slug}`;

  return (
    <Link href={href} className="group block">
      <article className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6 lg:items-start py-3 rounded-lg transition-colors hover:bg-[#0a0a0a]/40">
        {/* Image */}
        <figure className="hidden sm:block isolate z-[1] pointer-events-none overflow-hidden rounded-md lg:w-44 flex-shrink-0">
          <div className="relative pt-[60%] h-full w-full">
            <Image
              src={post.featuredImage || '/images/default-blog-image.jpg'}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 176px, 100vw"
              className="object-cover"
            />
          </div>
        </figure>

        {/* Content */}
        <div className="w-full">
          <p className="text-xs md:text-sm text-neutral-400 ">
            {format(new Date(post.date), 'MMMM dd, yyyy')}
          </p>

          <div className="mt-3 text-base md:text-xl font-semibold relative group-hover:text-emerald-500 transition-colors">
            <span
              className="bg-gradient-to-r from-emerald-500/30 via-emerald-500/90 to-emerald-500/30 box-decoration-clone group-hover:opacity-30 opacity-0 transition text-transparent"
              aria-hidden="true"
            >
              {post.title}
            </span>
            <span className="absolute left-0 top-0">{post.title}</span>
          </div>

          <p className="text-xs md:text-sm text-neutral-400 mt-1 line-clamp-2">
            {post.description || post.excerpt}
          </p>

          <div className="flex justify-between mt-5 flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <HiOutlineClock className="w-4 h-4 text-emerald-500" />
                <p className="text-xs md:text-sm text-neutral-400">
                  {post.readingTime} min read
                </p>
              </div>
            </div>

            {post.tags?.length ? (
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {post.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${slugify(tag)}`}
                    className="px-1.5 py-1 text-xs rounded-lg transition-all duration-300 tracking-widebg-[#17171799] font-medium text-[#9e9e9e] border-emerald-500 bg-emerald-500/10"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCardAlt;
