import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
// import styles from '@/styles/Blog.module.css';
import { GetStaticProps } from 'next';
import BlogCard from '@/components/blog/BlogCard';
import Accent from '@/components/shared/Accent';
import {
  HiCalendar,
  HiEye,
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
} from 'react-icons/hi';
import clsx from 'clsx';
import { IconType } from 'react-icons/lib';
import { getAllPosts } from '@/lib/mdx';
import { BlogPost } from '@/types/blog';
import SEO from '@/components/shared/SEO';
import HighlightedText from '@/components/shared/HighlightedText';
import Image from 'next/image';

const POSTS_PER_PAGE = 9;

// const categories = [
//   { name: 'All Categories', path: '/blog/' },
//   { name: 'Law', path: '/blog/law/' },
//   { name: 'Cryptocurrency', path: '/blog/cryptocurrency/' },
//   { name: 'Hackintosh', path: '/blog/hackintosh/' },
// ];

const topics = [
  'law',
  'corporate',
  'restructuring & bankruptcy',
  'capital market',
  'merger & acquisition',
  'competition & antitrust',
  'banking & finance',
  'investment law',
  'foreign direct investment',
  'intellectual property',
  'labor law',
  'energy, oil & gas',
  'real estate',
  'tax',
  'litigation',
  'dispute resolution',
  'alternative dispute resolution',
  'cryptocurrency',
  // 'airdrop',
  // 'retro',
  // 'testnet',
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
  const [selectedCategory] = useState('All Categories');
  const [sortOrder] = useState<SortOption>(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

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
          className="h-[200px] w-[550px] rounded-full bg-gradient-to-r from-[#2E996C]/90 to-[#0F3324]/10 blur-[150px] absolute top-0 -translate-y-full rotate-55 origin-left z-[-2] left-[55%]"
        />
        <Image
          alt=""
          width={1280}
          height={825}
          className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
          src="/images/textures/crumpled.jpg"
          priority
        />
      </div>

      <main
        className={clsx(
          'content-spacing max-w-[1200px] w-full relative overflow-hidden'
        )}
      >
        {/* Content */}
        <section className="min-h-screen pt-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mt-0 relative space-y-2 text-center" data-fade="1">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Personal <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-sm md:text-lg hero-text max-w-2xl mx-auto">
                Thoughts, Insights, and Opinions about Law, Tech, and Crypto
              </p>
              <div className=" h-px max-w-md mx-auto bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            </div>

            {/* Search Input */}
            <div className="mt-8 mb-8" data-fade="2">
              <div className="relative mx-auto max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#111111] text-neutral-200 rounded-xl px-12 py-3
                    border border-gray-800/50 hover:border-emerald-500/50 focus:border-emerald-700
                    outline-none transition-all duration-300 text-sm md:text-base placeholder-neutral-600"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <HiSearch className="text-gray-400 text-lg" />
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md ] text-xs text-neutral-600">
                    ⌘ S
                  </div>
                </div>
                {searchQuery && (
                  <p className="mt-3 text-sm text-gray-400 text-center">
                    Found {filteredAndSortedPosts.length} article
                    {filteredAndSortedPosts.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Topics Section */}
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
                        : ' bg-[#17171799] font-medium text-[#737373] hover:text-neutral-50'
                    )}
                  >
                    <HighlightedText text={topic} searchQuery={searchQuery} />
                  </button>
                ))}
              </div>
            </div>

            {/* Controls Section */}
            {/* <div
              className="flex justify-between items-center mt-6 mb-2"
              data-fade="4"
            >
              <div className="relative w-[140px]">
                <div className="gradient-border ">
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
            </div> */}

            {/* Blog Grid */}
            {/* <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-8"
              data-fade="4"
            >
              {currentPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  className="h-full bg-transparent border border-neutral-800 hover:border-neutral-700 rounded-lg transition-all  duration-300 hover:translate-y-[-0.5px]"
                  checkTagged={checkTagged}
                  index={index}
                  searchQuery={searchQuery}
                />
              ))

               ) : (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-sm md:text-2xl 2xl:text-3xl font-bold mb-1">
                    Sorry, <Accent>article not found</Accent>
                  </h3>
                  <p className="text-xs md:text-sm 2xl:text-base text-gray-400">
                    No articles found for topic:{' '}
                    <Accent>{selectedTopic}</Accent>
                  </p>
                </div>
              )}
            </div> */}

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-8"
              data-fade="4"
            >
              {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    className="h-full bg-transparent border border-neutral-800 hover:border-neutral-700 rounded-lg transition-all duration-300 hover:translate-y-[-0.5px]"
                    checkTagged={checkTagged}
                    index={index}
                    searchQuery={searchQuery}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-sm md:text-2xl 2xl:text-3xl font-bold mb-1">
                    Sorry, <Accent>article not found</Accent>
                  </h3>
                  <p className="text-xs md:text-sm 2xl:text-base text-gray-400">
                    No articles found for topic:{' '}
                    <Accent>{selectedTopic}</Accent>
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
                    'p-2.5 rounded-lg border transition-all duration-300',
                    currentPage === 1
                      ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                      : 'border-gray-800 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-500'
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
                        'px-4 py-2 text-sm rounded-lg border transition-all duration-300',
                        currentPage === page
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                          : 'border-gray-800 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-500'
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
                    'p-2.5 rounded-lg border transition-all duration-300',
                    currentPage === totalPages
                      ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                      : 'border-gray-800 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-500'
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
