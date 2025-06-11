import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiTag } from 'react-icons/fi';
import BlogCard from '../blog/BlogCard';
import { BlogPost } from '@/types/blog';
import GlowingButton from '../shared/GlowingButton';
import { format } from 'date-fns';
import {
  HiBookOpen,
  HiScale,
  HiDocumentText,
  HiLibrary,
  HiChevronRight,
  HiOutlineClock,
} from 'react-icons/hi';

interface LatestBlogPostsProps {
  posts: BlogPost[];
}

const LatestBlogPosts = ({ posts }: LatestBlogPostsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const alphabetLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  useEffect(() => {
    // Observer untuk trigger animasi saat section masuk viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Target section untuk observe
    const section = document.querySelector('.latest-posts-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Fungsi untuk filter posts berdasarkan kategori
  const filteredPosts = selectedCategory
    ? posts.filter(
        (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : posts;

  // Dapatkan semua kategori unik
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <section className="w-full py-16 relative overflow-hidden latest-posts-section">
      {/* Clean minimal background */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle gradient background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#0a1015]/30 via-transparent to-[#081a17]/20" /> */}

        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(16,185,129,0.05) 1px, transparent 1px)',
            backgroundSize: '100% 28px',
            opacity: isVisible ? 0.03 : 0,
            transitionDelay: '300ms',
          }}
        />

        {/* Minimal decorative elements */}
        {/* Top horizontal line */}
        <div
          className="absolute top-[15%] left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '400ms',
          }}
        ></div>

        {/* Bottom horizontal line */}
        <div
          className="absolute bottom-[15%] left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '600ms',
          }}
        ></div>

        {/* Left vertical line */}
        <div
          className="absolute top-[15%] bottom-[15%] left-[10%] w-px hidden md:block"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '800ms',
            transformOrigin: 'top',
          }}
        ></div>

        {/* Right vertical line */}
        <div
          className="absolute top-[15%] bottom-[15%] right-[10%] w-px hidden md:block"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '1000ms',
            transformOrigin: 'top',
          }}
        ></div>

        {/* Simple blur spot top right */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transition: 'opacity 1.5s ease-out',
            transitionDelay: '300ms',
          }}
        ></div>

        {/* Simple blur spot bottom left */}
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transition: 'opacity 1.5s ease-out',
            transitionDelay: '500ms',
          }}
        ></div>
      </div>

      <div className="relative z-10 ">
        {/* Section Header - Clean & Minimal */}
        <div className="mb-12 max-w-2xl">
          <div
            className="flex items-center space-x-2 mb-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 700ms ease-out',
              transitionDelay: '400ms',
            }}
          >
            <HiLibrary className="text-emerald-400 w-5 h-5" />
            <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
              Legal Journal
            </h2>
          </div>
          <h3
            className="text-3xl font-bold mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '500ms',
            }}
          >
            Latest <span className="gradient-text">Legal Insights</span> &
            Articles
          </h3>
          <p
            className="text-neutral-400 leading-relaxed"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '600ms',
            }}
          >
            Thought, Opinion, and Insights about Law, Technology, and
            Cryptocurrency
          </p>
        </div>

        {/* Category Filter Bar - Clean & Minimal */}
        <div
          className="flex items-center justify-between border-t border-b border-neutral-800/30 py-2 px-2 mb-8 overflow-x-auto no-scrollbar"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 700ms ease-out, transform 700ms ease-out',
            transitionDelay: '700ms',
          }}
        >
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-neutral-400 whitespace-nowrap">
              Filter by:
            </span>
            <HiBookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                selectedCategory === null
                  ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
                  : 'text-neutral-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
                    : 'text-neutral-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post - Clean & Minimal Style */}
        {filteredPosts.length > 0 && (
          <div
            className="mb-10 group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '800ms',
            }}
          >
            <div className="relative transition-all duration-300 backdrop-blur-sm">
              {/* Top decoration */}
              {/* <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div> */}

              <div className="p-1">
                <BlogCard
                  post={filteredPosts[0]}
                  variant="featured"
                  index={0}
                  className="border-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Minimal divider */}
        <div
          className="flex items-center my-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 700ms ease-out',
            transitionDelay: '900ms',
          }}
        >
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-neutral-800/50 to-transparent"></div>
          <div className="px-4 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 rounded-sm bg-emerald-900/10">
            ARTICLE INDEX
          </div>
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-neutral-800/50 to-transparent"></div>
        </div>

        {/* Secondary Posts - Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredPosts.slice(1).map((post, index) => (
            <div
              key={post.slug}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                transitionDelay: `${1000 + index * 100}ms`,
              }}
              className="group"
            >
              <div className="relative h-full border hover:border-emerald-500/30  border-neutral-800/50 rounded-lg overflow-hidden transition-all duration-300 bg-neutral-900/20 backdrop-blur-sm">
                {/* Clean minimal styling */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {format(new Date(post.date), 'MMMM dd, yyyy')}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.category.toLowerCase()}/${post.slug}`}
                    className="block"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-neutral-500">
                        <HiOutlineClock className="w-3.5 h-3.5" />
                        <span>{post.readingTime} min read</span>
                      </div>
                      <span className="flex items-center gap-1 text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                        View Article <HiChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className="mt-12 flex justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 700ms ease-out',
            transitionDelay: '1500ms',
          }}
        >
          <Link href="/blog">
            <GlowingButton variant="small">
              <span className="flex items-center gap-2">
                Browse Complete Archives
              </span>
            </GlowingButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;
