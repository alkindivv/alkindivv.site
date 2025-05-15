import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import BlogCard from '../blog/BlogCard';
import { BlogPost } from '@/types/blog';

interface LatestBlogPostsProps {
  posts: BlogPost[];
}

const LatestBlogPosts = ({ posts }: LatestBlogPostsProps) => {
  // Pastikan posts ada minimal 3 item untuk layout optimal
  const hasFeaturedPost = posts.length > 0;
  const hasSecondaryPosts = posts.length > 1;

  return (
    <section className="py-16 w-full latest-posts-section">
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div className="space-y-2">
            <h2
              className="text-2xl md:text-3xl font-semibold text-white/90"
              data-fade="1"
            >
              Latest Articles
            </h2>
            <div
              className="h-px max-w-[120px] w-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-transparent"
              data-fade="2"
            />
            <p className="text-neutral-400 text-sm md:text-base" data-fade="3">
              Thoughts, stories, and ideas
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors duration-300"
            data-fade="4"
          >
            <span>View all articles</span>
            <FiArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog Post Grid - Modern Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Post - Spans 2/3 width on large screens */}
          {hasFeaturedPost && (
            <div className="lg:col-span-8" data-fade="5">
              <BlogCard
                post={posts[0]}
                variant="featured"
                index={0}
                className="h-full"
              />
            </div>
          )}

          {/* Secondary Posts - Stack vertically in 1/3 column */}
          {hasSecondaryPosts && (
            <div className="lg:col-span-4 grid grid-cols-1 gap-6">
              {posts.slice(1, 3).map((post, index) => (
                <div key={post.slug} data-fade={(6 + index).toString()}>
                  <BlogCard
                    post={post}
                    variant="compact"
                    index={index + 1}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Additional Posts on Mobile Only - Hidden on Desktop */}
          <div className="block lg:hidden space-y-4">
            {posts.slice(3, 5).map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                variant="compact"
                index={index + 3}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;
