import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import styles from '@/styles/Blog.module.css';
import { GetStaticProps } from 'next';
import BlogCard from '@/components/blog/BlogCard';
import Accent from '@/components/shared/Accent';
import {
  HiCalendar,
  HiEye,
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiOutlineDocumentText,
} from 'react-icons/hi';
import clsx from 'clsx';
import { IconType } from 'react-icons/lib';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { BlogPost } from '@/types/blog';
import SEO from '@/components/shared/SEO';
import HighlightedText from '@/components/shared/HighlightedText';
import Image from 'next/image';

const POSTS_PER_PAGE = 9;

const categories = [
  { name: 'All Categories', path: '/blog/' },
  { name: 'Law', path: '/blog/law/' },
  { name: 'Cryptocurrency', path: '/blog/cryptocurrency/' },
  { name: 'Hackintosh', path: '/blog/hackintosh/' },
];

const topics = [
  'law',
  'corporate law',
  'lawyer',
  'capital market',
  'm&a',
  'bankruptcy',
  'ojk',
  'web3',
  'cryptocurrency',
  'airdrop',
  'retro',
  'testnet',
  'blockchain',
  'smart contract',
  'hackintosh',
  'macos',
];

interface BlogPageProps {
  blogPosts: BlogPost[];
}

interface SortOption {
  id: string;
  name: string;
  icon: IconType;
}

const sortOptions: SortOption[] = [
  {
    id: 'date',
    name: 'Sort by date',
    icon: HiCalendar,
  },
  {
    id: 'views',
    name: 'Sort by views',
    icon: HiEye,
  },
];

const BlogPage: React.FC<BlogPageProps> = ({ blogPosts }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortOrder, setSortOrder] = useState<SortOption>(sortOptions[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
    setCurrentPage(1); // Reset to first page when changing topic
  };

  const checkTagged = (tag: string) => {
    return selectedTopic === tag.toLowerCase();
  };

  const filteredAndSortedPosts = blogPosts
    .filter((post) => {
      // Filter by search query
      const searchContent = [
        post.title,
        post.description,
        post.excerpt,
        ...(post.tags || []),
      ]
        .join(' ')
        .toLowerCase();
      const matchesSearch = searchContent.includes(searchQuery.toLowerCase());

      // Filter by topic
      const topicMatch =
        !selectedTopic ||
        post.tags?.some(
          (tag) => tag.toLowerCase() === selectedTopic.toLowerCase()
        );

      // Filter by category
      const categoryMatch =
        selectedCategory === 'All Categories' ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && topicMatch && categoryMatch;
    })
    .sort((a, b) => {
      if (sortOrder.id === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      }
      if (sortOrder.id === 'views') {
        const viewsA = a.views || 0;
        const viewsB = b.views || 0;
        return viewsB - viewsA;
      }
      return 0;
    });

  // Pagination calculations
  const totalPosts = filteredAndSortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredAndSortedPosts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <SEO templateTitle="Blog" />

      {/* Background Effect */}
      <div
        className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950"
        style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="h-[400px] w-[650px] rounded-full bg-gradient-to-r from-[#2E996C]/30 to-[#0F3324]/30 blur-[150px] absolute top-0 -translate-y-full rotate-45 origin-left z-[-2] left-[15%]"
        />
        <Image
          alt=""
          loading="lazy"
          width={1280}
          height={825}
          className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
          src="/images/textures/crumpled-paper.png"
        />
      </div>

      <main
        className={clsx(
          'content-spacing fade-wrapper relative overflow-hidden',
          !isLoaded && 'opacity-0'
        )}
      >
        {/* Content */}
        <section className="min-h-screen pt-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mt-10 relative space-y-1 text-center" data-fade="1">
              <h1 className="text-center font-sans text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight leading-tight">
                Personal <span className="gradient-text">Blog</span>
              </h1>
              <p className="hero-text font-medium leading-relaxed text-center text-[0.95rem] md:text-[1.05rem]">
                Thoughts, Insights, and Opinions about Law, Tech, and Crypto
              </p>
            </div>

            <div
              className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-10 mt-5"
              data-fade="2"
            />

            {/* Search and Filter Section */}
            <div className="mt-6" data-fade="2">
              {/* Search Input */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="gradient-border p-[1px] rounded-xl hover:p-[1.5px] transition-all duration-300">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0a0a0a] text-gray-200 rounded-xl px-12 py-3.5 outline-none
                        transition-all duration-300 text-sm md:text-base placeholder-gray-600
                        focus:bg-[#111111] group-hover:bg-[#0f0f0f]"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <HiSearch className="text-gray-500 text-lg" />
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="px-2 py-1 rounded-md bg-[#1a1a1a00] text-xs text-emerald-500/70">
                        ⌘ S
                      </span>
                    </div>
                  </div>
                </div>
                {searchQuery && (
                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-400">
                      Found {filteredAndSortedPosts.length} article
                      {filteredAndSortedPosts.length !== 1 ? 's' : ''}
                    </p>
                    {filteredAndSortedPosts.length > 0 && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-2 text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Filter Controls */}
              <div className="space-y-6 -mt-10" data-fade="3">
                {/* Topics */}
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-400">Choose topic:</p>
                    {selectedTopic && (
                      <button
                        onClick={() => handleTopicClick(selectedTopic)}
                        className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                      >
                        Clear selection
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTopicClick(topic)}
                        className={clsx(
                          'px-2 py-1.5 text-sm border rounded-lg transition-all duration-300',
                          selectedTopic === topic
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                            : 'border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-gray-400 hover:text-emerald-400'
                        )}
                      >
                        <HighlightedText
                          text={topic}
                          searchQuery={searchQuery}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls Section */}
                <div
                  className="flex justify-between items-center"
                  data-fade="4"
                >
                  <div className="relative w-[140px]">
                    <div className="gradient-border p-[1px] rounded-xl">
                      <select
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full bg-[#111111] text-sm text-gray-300
                          rounded-xl pl-3 pr-10 py-2 outline-none
                          appearance-none cursor-pointer transition-colors"
                      >
                        {categories.map((category) => (
                          <option
                            key={category.name}
                            value={category.name}
                            className="bg-[#111111]"
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <HiChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg" />
                    </div>
                  </div>

                  <div className="relative w-[140px]">
                    <div className="gradient-border p-[1px] rounded-xl">
                      <select
                        value={sortOrder.id}
                        onChange={(e) => {
                          const selected = sortOptions.find(
                            (opt) => opt.id === e.target.value
                          );
                          setSortOrder(selected || sortOptions[0]);
                        }}
                        className="w-full bg-[#111111] text-sm text-gray-300
                          rounded-xl pl-3 pr-10 py-2 outline-none
                          appearance-none cursor-pointer transition-colors"
                      >
                        {sortOptions.map((option) => (
                          <option
                            key={option.id}
                            value={option.id}
                            className="bg-[#111111]"
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>
                      {React.createElement(sortOrder.icon, {
                        className:
                          'absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="mt-6" data-fade="5">
              {currentPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPosts.map((post, index) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      checkTagged={checkTagged}
                      className="transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5"
                      index={index}
                      searchQuery={searchQuery}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-[#0a0a0a]/50 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-bold mb-2">
                    Sorry, <Accent>no articles found</Accent>
                  </h3>
                  <p className="text-gray-400">
                    No articles found for topic:{' '}
                    <span className="text-emerald-400">{selectedTopic}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                className="flex justify-center items-center mt-12 gap-2"
                data-fade="6"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={clsx(
                    'p-2 rounded-lg border transition-all duration-300',
                    currentPage === 1
                      ? 'border-gray-800 text-gray-700 cursor-not-allowed'
                      : 'border-gray-800 hover:border-emerald-500 text-gray-400 hover:text-emerald-400'
                  )}
                >
                  <HiChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={clsx(
                        'w-10 h-10 rounded-lg border text-sm transition-all duration-300',
                        currentPage === page
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-gray-800 hover:border-emerald-500 text-gray-400 hover:text-emerald-400'
                      )}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={clsx(
                    'p-2 rounded-lg border transition-all duration-300',
                    currentPage === totalPages
                      ? 'border-gray-800 text-gray-700 cursor-not-allowed'
                      : 'border-gray-800 hover:border-emerald-500 text-gray-400 hover:text-emerald-400'
                  )}
                >
                  <HiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogPosts = await getAllPosts();
  return {
    props: {
      blogPosts,
    },
  };
};
export default BlogPage;
