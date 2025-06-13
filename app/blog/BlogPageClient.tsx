'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import BlogCard from '@/components/blog/BlogCard';

import {
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiScale,
} from 'react-icons/hi';
import clsx from 'clsx';
import HighlightedText from '@/components/shared/HighlightedText';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';

const topics = [
  'banking & finance',
  'bankruptcy',
  'blockchain',
  'capital market',
  'competition & antitrust',
  'cryptocurrency',
  'dispute resolution',
  'energy',
  'fintech',
  'hackintosh',
  'intellectual property',
  'investment',
  'labor',
  'litigation',
  'macos',
  'merger & acquisition',
  'smart contract',
  'tech law',
];

const POSTS_PER_PAGE = 9;

interface BlogPageClientProps {
  initialPosts: BlogPost[];
  initialSearch?: string;
  initialTopic?: string;
  initialPage?: number;
}

export default function BlogPageClient({
  initialPosts,
  initialSearch = '',
  initialTopic = '',
  initialPage = 1,
}: BlogPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(
    initialTopic || null
  );
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isVisible, setIsVisible] = useState(true);
  const [blogPosts] = useState<BlogPost[]>(initialPosts);

  // Sync URL with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedTopic) params.set('topic', selectedTopic);
    if (currentPage > 1) params.set('page', currentPage.toString());

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [searchQuery, selectedTopic, currentPage, pathname, router]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
    setCurrentPage(1);
  };

  const filteredPosts = blogPosts
    .filter((post) => {
      const searchContent = [
        post.title,
        post.description,
        post.excerpt,
        ...(post.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        !searchQuery || searchContent.includes(searchQuery.toLowerCase());
      const matchesTopic =
        !selectedTopic ||
        post.tags?.some(
          (tag) => tag.toLowerCase() === selectedTopic.toLowerCase()
        );

      return matchesSearch && matchesTopic;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Pagination calculations
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Optimized Background Effect */}
      <div
        className="absolute inset-0 overflow-hidden h-[950px] bg-neutral-950"
        style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="h-[900px] w-[950px] rounded-full bg-gradient-to-r from-[#2E996C]/70 to-[#0F3324]/10 blur-[150px] absolute top-0 -translate-y-full rotate-55 origin-left z-[-2] left-[5%]"
        />
        <Image
          alt=""
          width={1280}
          height={825}
          className="pointer-events-none select-none absolute w-full inset-0 h-[950px] object-cover z-[-1] opacity-40 mix-blend-overlay"
          src="/images/textures/crumpled-3.jpg"
          priority
        />
      </div>

      <main className="content-spacing relative overflow-hidden">
        {/* Content - Immediate Load */}
        <section className="min-h-screen pt-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section - Matching LatestBlogPosts Style */}
            <div className="mb-12 max-w-2xl mx-auto" data-fade="1">
              <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                Thoughts & <span className="gradient-text">Articles</span>
              </h3>
              <p className="text-neutral-400 leading-relaxed text-center">
                Thought, Opinion, and Insights about Law, Technology, and
                Cryptocurrency
              </p>
              <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
            </div>

            {/* Search Input - Matching LatestBlogPosts Legal Document Style */}
            <div className="mt-8 mb-8" data-fade="2">
              <div className="relative mx-auto max-w-2xl">
                <div className="relative group h-full border border-neutral-800/70 rounded-md overflow-hidden hover:border-emerald-500/30 transition-all duration-300 bg-neutral-900/20">
                  {/* Legal document styling */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full bg-transparent text-neutral-200 rounded-xl px-12 py-3
                    outline-none transition-all duration-300 text-sm md:text-base placeholder-neutral-600"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <HiSearch className="text-gray-400 text-lg" />
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-gray-500">
                    ⌘ S
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-8" data-fade="3">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs md:text-sm text-neutral-50 mr-2">
                  choose topic:
                </span>
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicClick(topic)}
                    className={clsx(
                      'px-1.5 py-1 text-xs rounded-lg md:text-sm transition-all duration-300',
                      selectedTopic === topic
                        ? 'border-emerald-500 text-neutral-50 bg-emerald-500/10'
                        : ' bg-[#17171799] font-medium text-[#9e9e9e] hover:text-neutral-50'
                    )}
                  >
                    <HighlightedText text={topic} searchQuery={searchQuery} />
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid - Legal Document Style */}
            <div className="mb-12" data-fade="5">
              {/* Legal document corner decorations */}
              <div className="relative mb-8">
                {/* Top decoration */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                {currentPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {currentPosts.map((post, index) => (
                      <BlogCard
                        key={post.slug}
                        post={post}
                        searchQuery={searchQuery}
                        priority={index < 3} // Priority loading for first 3 cards
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-1 text-2xl md:text-3xl">
                      <span className="gradient-text">No articles found</span>
                    </div>
                    <p className=" text-neutral-500 text-sm md:text-xl">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}

                {/* Document footer */}
                <div className="mt-8 text-end text-[10px] text-neutral-500 font-mono">
                  <div className="flex items-center justify-center gap-2 mb-1"></div>
                  ID: BLOG-{new Date().getFullYear()}
                </div>
              </div>
            </div>

            {/* Pagination - Only show if needed */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={clsx(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all',
                    currentPage === 1
                      ? 'text-neutral-600 cursor-not-allowed'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  )}
                >
                  <HiChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={clsx(
                          'w-8 h-8 rounded-lg text-sm transition-all',
                          currentPage === pageNum
                            ? 'bg-emerald-600 text-white'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                        )}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={clsx(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all',
                    currentPage === totalPages
                      ? 'text-neutral-600 cursor-not-allowed'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  )}
                >
                  Next
                  <HiChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          {/* Legal footer */}
          <div
            className="mt-16 text-center relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 800ms ease-out',
              transitionDelay: '1400ms',
            }}
          >
            {/* Law scale divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-neutral-800"></div>
              <div className="mx-4">
                <HiScale className="w-8 h-8 text-emerald-500/30" />
              </div>
              <div className="h-px w-16 bg-neutral-800"></div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
              <span>For professional reference only</span>
            </div>

            {/* Legal disclaimer */}
            <p className="mt-4 text-[10px] text-neutral-600 max-w-lg mx-auto">
              These resources are provided for informational purposes only and
              do not constitute legal advice. Always consult with a qualified
              legal professional before using these documents.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
