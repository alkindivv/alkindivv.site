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
} from 'react-icons/hi';
import clsx from 'clsx';
import { IconType } from 'react-icons/lib';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { BlogPost } from '@/types/blog';
import SEO from '@/components/shared/SEO';
import HighlightedText from '@/components/shared/HighlightedText';

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

      <main
        className={clsx(
          'content-spacing fade-wrapper',
          !isLoaded && 'opacity-0'
        )}
      >
        {/* Header Section */}
        <div className="mt-24" data-fade="1">
          <h1 className="font-sans mb-2 text-3xl md:text-4xl 2xl:text-5xl font-bold tracking-tight">
            Personal <Accent>Blog</Accent>
          </h1>
          <p className="text-sm md:text-base 2xl:text-lg font-light text-gray-400">
            Thoughts, insights, and knowledge about law, technology, and crypto
            assets.
          </p>
        </div>

        {/* Search Input */}
        <div className="mt-4" data-fade="2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-gray-200 border border-gray-600
                rounded-md px-4 py-2 pl-10 outline-none hover:border-emerald-500 transition-colors"
            />
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-400">
              Found {filteredAndSortedPosts.length} article
              {filteredAndSortedPosts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Topics Section */}
        <div className="mt-2" data-fade="3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-400">Choose topic:</span>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={clsx(
                  'px-1 py-0.5 text-gray-300 text-xs md:text-sm 2xl:text-sm rounded-md border transition-colors',
                  selectedTopic === topic
                    ? 'border-emerald-500 text-emerald-500'
                    : 'border-gray-600 text-gray-300 hover:border-emerald-500'
                )}
              >
                <HighlightedText text={topic} searchQuery={searchQuery} />
              </button>
            ))}
          </div>
        </div>

        {/* Controls Section */}
        <div
          className="flex justify-between items-center mt-6 mb-2"
          data-fade="4"
        >
          <div className="relative w-[140px]">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent text-sm text-gray-300 border border-gray-600
                rounded-md pl-3 pr-10 py-2 outline-none focus:border-emerald-500
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

          <div className="relative w-[140px]">
            <select
              value={sortOrder.id}
              onChange={(e) => {
                const selected = sortOptions.find(
                  (opt) => opt.id === e.target.value
                );
                setSortOrder(selected || sortOptions[0]);
              }}
              className="w-full bg-transparent text-sm text-gray-300 border border-gray-600
                rounded-md pl-3 pr-10 py-2 outline-none focus:border-emerald-500
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

        {/* Blog Grid */}
        <div className={styles.blogGrid} data-fade="5">
          {currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                checkTagged={checkTagged}
                className="transition-all duration-300 hover:translate-y-[-0.5px]"
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
                No articles found for topic: <Accent>{selectedTopic}</Accent>
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={clsx(
                'p-2 rounded-md text-xs md:text-sm 2xl:text-base transition-colors',
                currentPage === 1
                  ? 'border-gray-700 text-gray-700 cursor-not-allowed'
                  : 'border-gray-600 text-gray-300 hover:border-emerald-500'
              )}
            >
              <HiChevronLeft className="text-xs" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={clsx(
                  'px-3 py-1 text-xs md:text-sm 2xl:text-base rounded-md border transition-colors',
                  currentPage === page
                    ? 'border-emerald-500 text-emerald-500'
                    : 'border-gray-600 text-gray-300 hover:border-emerald-500'
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={clsx(
                'p-2 rounded-md transition-colors',
                currentPage === totalPages
                  ? 'border-gray-700 text-gray-700 cursor-not-allowed'
                  : 'border-gray-600 text-gray-300 hover:border-emerald-500'
              )}
            >
              <HiChevronRight className="text-xs" />
            </button>
          </div>
        )}
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
