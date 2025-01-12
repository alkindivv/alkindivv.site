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
} from 'react-icons/hi';
import clsx from 'clsx';
import { IconType } from 'react-icons/lib';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { BlogPost } from '@/types/blog';
import SEO from '@/components/shared/SEO';

const POSTS_PER_PAGE = 9;

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

const categories = ['Category', 'Law', 'Technology', 'Blockchain', 'Tutorial'];

const BlogPage: React.FC<BlogPageProps> = ({ blogPosts }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOption>(sortOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
      // Filter by topic
      const topicMatch =
        !selectedTopic ||
        post.tags?.some(
          (tag) => tag.toLowerCase() === selectedTopic.toLowerCase()
        );

      // Filter by category
      const categoryMatch =
        selectedCategory === 'All' ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      return topicMatch && categoryMatch;
    })
    .sort((a, b) => {
      if (sortOrder.id === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortOrder.id === 'views') {
        return (b.views || 0) - (a.views || 0);
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

      <main className={clsx('fade-wrapper', !isLoaded && 'opacity-0')}>
        {/* Header Section - more compact */}
        <div className="mb-4" data-fade="1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Personal <Accent>Blog</Accent>
          </h1>
          <p className="text-sm text-gray-400">
            Thoughts, insights, and knowledge about law, technology, and crypto
            assets.
          </p>
        </div>

        {/* Search Input - reduced margin */}
        <div className="mb-3" data-fade="2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-gray-200 border border-gray-600
              rounded-md px-3 py-1.5 text-sm outline-none hover:border-emerald-500 transition-colors"
          />
        </div>

        {/* Topics Section - reduced spacing */}
        <div className="mb-3" data-fade="3">
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-gray-400">Choose topic:</span>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={clsx(
                  'px-2 py-0.5 text-xs rounded-md border transition-colors',
                  selectedTopic === topic
                    ? 'border-emerald-500 text-emerald-500'
                    : 'border-gray-600 text-gray-300 hover:border-emerald-500'
                )}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Controls Section - reduced height and spacing */}
        <div className="flex justify-between items-center mb-4" data-fade="4">
          <div className="relative w-[120px]">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent text-xs text-gray-300 border border-gray-600
                rounded-md px-2 py-1.5 outline-none focus:border-emerald-500
                appearance-none cursor-pointer transition-colors"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="bg-[#111111]"
                >
                  {category}
                </option>
              ))}
            </select>
            <HiChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm" />
          </div>

          <div className="relative w-[120px]">
            <select
              value={sortOrder.id}
              onChange={(e) => {
                const selected = sortOptions.find(
                  (opt) => opt.id === e.target.value
                );
                setSortOrder(selected || sortOptions[0]);
              }}
              className="w-full bg-transparent text-xs text-gray-300 border border-gray-600
                rounded-md px-2 py-1.5 outline-none focus:border-emerald-500
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
                'absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm',
            })}
          </div>
        </div>

        {/* Blog Grid - adjusted gap */}
        <div className={clsx(styles.blogGrid, 'gap-3')} data-fade="5">
          {currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                checkTagged={checkTagged}
                className="transition-all duration-300 hover:translate-y-[-0.5px]"
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h3 className="text-xl font-bold mb-1">
                Sorry, <Accent>article not found</Accent>
              </h3>
              <p className="text-sm text-gray-400">
                No articles found for topic: <Accent>{selectedTopic}</Accent>
              </p>
            </div>
          )}
        </div>

        {/* Pagination - more compact */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={clsx(
                'p-1 rounded-md border transition-colors',
                currentPage === 1
                  ? 'border-gray-700 text-gray-700 cursor-not-allowed'
                  : 'border-gray-600 text-gray-300 hover:border-emerald-500'
              )}
            >
              <HiChevronLeft className="text-base" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={clsx(
                  'px-3 py-1 text-sm rounded-md border transition-colors',
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
                'p-1 rounded-md border transition-colors',
                currentPage === totalPages
                  ? 'border-gray-700 text-gray-700 cursor-not-allowed'
                  : 'border-gray-600 text-gray-300 hover:border-emerald-500'
              )}
            >
              <HiChevronRight className="text-base" />
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
