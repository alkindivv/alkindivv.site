import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Blog.module.css';
import { GetStaticProps } from 'next';
import { getAllCategories, getPostsByCategory } from '../../lib/posts';
import BlogCard from '@/components/BlogCard';
import Accent from '@/components/Accent';
import { HiCalendar, HiEye } from 'react-icons/hi';
import clsx from 'clsx';
import { IconType } from 'react-icons/lib';
import { getAllPosts } from '@/lib/mdx';
import { BlogPost } from '@/types/blog';

const topics = [
  'retro',
  'testnet',
  'web3',
  'blockchain',
  'cryptocurrency',
  'law',
  'hackintosh',
  'smart contract',
  'bankruptcy',
  'corporate law',
  'company law',
  'law firm',
  'lawyer',
  'capital market',
  'ojk',
  'investment',
  'macos',
  'linux',
];

interface BlogPageProps {
  blogPosts: BlogPost[];
}

// Define interfaces
interface SortOption {
  id: string;
  name: string;
  icon: IconType;
}

// Define sort options
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
  const [sortOrder, setSortOrder] = useState<SortOption>(sortOptions[0]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
  };

  const checkTagged = (tag: string) => {
    return selectedTopic === tag.toLowerCase();
  };

  const filteredAndSortedPosts = blogPosts
    .filter((post) => {
      if (!selectedTopic) return true;
      return (
        post.tags?.some(
          (tag) => tag.toLowerCase() === selectedTopic.toLowerCase()
        ) ?? false
      );
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

  return (
    <Layout title="Blog | alkindivv.site">
      <main
        className={clsx(
          'mt-5 sm:-mt-12 md:-mt-10 2xl:-mt-30 fade-wrapper',
          !isLoaded && 'opacity-0'
        )}
      >
        {/* Header Section */}
        <div className="mt-10" data-fade="1">
          <h1 className="mb-2 text-3xl md:text-4xl 2xl:text-5xl  font-bold tracking-tight">
            Personal <Accent>Blog</Accent>
          </h1>
          <p className="text-sm md:text-base 2xl:text-lg font-light text-gray-200">
            Thoughts, and tutorials about law, hackintosh, blockchain and smart
            contract development.
          </p>
        </div>

        {/* Search Input */}
        <div className="mt-4" data-fade="2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-gray-200 border border-gray-600
              rounded-md px-4 py-2 outline-none hover:border-emerald-500 transition-colors"
          />
        </div>

        {/* Topics Section */}
        <div className="mt-2" data-fade="3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-200">Choose topic:</span>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={clsx(
                  'px-1 py-0.5 text-xs md:text-sm 2xl:text-sm rounded-md border transition-colors',
                  // text-sm md:text-md 2xl:text-md
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

        {/* Controls Section */}
        <div
          className="flex justify-between items-center mt-6 mb-2"
          data-fade="4"
        >
          <button className="text-sm text-gray-300 border border-gray-600 rounded-md px-3 py-2 hover:border-emerald-500 transition-colors">
            Read in Indonesia
          </button>

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
          {filteredAndSortedPosts.length > 0 ? (
            filteredAndSortedPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                checkTagged={checkTagged}
                className="transition-all duration-300 hover:translate-y-[-0.5px]"
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-2xl md:text-4xl 2xl:text-4xl font-bold mb-2">
                Sorry, <Accent>article not found</Accent>
              </h3>
              <p className="text-gray-400 text-sm md:text-base 2xl:text-base">
                No articles found for topic: <Accent>{selectedTopic}</Accent>
              </p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = getAllCategories();
  const blogPosts = categories.flatMap((category) =>
    getPostsByCategory(category).map((post) => ({
      ...post,
      // author: post.author || 'Al Kindi',
      readingTime:
        typeof post.readingTime === 'number'
          ? post.readingTime
          : typeof post.readingTime === 'string'
            ? parseInt(post.readingTime)
            : 1,
    }))
  );

  blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    props: {
      blogPosts,
    },
  };
};

export default BlogPage;
