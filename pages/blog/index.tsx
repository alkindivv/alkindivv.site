import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
// import styles from '@/styles/Blog.module.css';
import { GetStaticProps } from 'next';
import BlogCard from '@/components/blog/BlogCard';
import Accent from '@/components/shared/Accent';
import { HiChevronLeft, HiChevronRight, HiSearch } from 'react-icons/hi';
import clsx from 'clsx';
// import { IconType } from 'react-icons/lib';
import { getAllPosts } from '@/lib/mdx';
import { BlogPost } from '@/types/blog';
import SEO from '@/components/shared/SEO';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
// import Link from 'next/link';
// import { usePageViews } from '@/lib/hooks/usePageViews';

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
  'restructuring',
  'capital_market',
  'merger',
  'competition',
  'banking',
  'investment',
  'fdi',
  'ip',
  'labor',
  'energy',
  'real_estate',
  'tax',
  'litigation',
  'dispute',
  'adr',
  'cryptocurrency',
  'blockchain',
  'smart_contract',
  'hackintosh',
  'macos',
];

interface BlogPageProps {
  blogPosts: BlogPost[];
}

// interface SortOption {
//   id: string;
//   name: string;
//   icon: IconType;
// }

const BlogPage: React.FC<BlogPageProps> = ({ blogPosts }) => {
  const { t } = useTranslation('common');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleTopicClick = (topic: string) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic);
      }
      return [...prev, topic];
    });
    setCurrentPage(1);
  };

  const checkTagged = (tag: string) => {
    return selectedTopics.includes(tag.toLowerCase());
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
      const matchesSearch = searchContent.includes(searchQuery.toLowerCase());
      const topicMatch =
        selectedTopics.length === 0 ||
        selectedTopics.every((selectedTopic) =>
          post.tags?.some(
            (tag) => tag.toLowerCase() === selectedTopic.toLowerCase()
          )
        );

      return matchesSearch && topicMatch;
    })
    .sort((a, b) => {
      // Selalu urutkan berdasarkan tanggal terbaru
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <SEO
        templateTitle="Blog"
        description="A collection of articles and blogs from my personal insights on corporate M&A, capital markets, bankruptcy & insolvency, and cryptocurrency regulation and its underlying technology."
      />
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
          'content-spacing max-w-[1200px] w-full relative overflow-hidden',
          !isLoaded && 'opacity-0'
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
                {t('blog.subtitle')}
              </p>
              <div className=" h-px max-w-md mx-auto bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            </div>

            {/* Search Input */}
            <div className="mt-8 mb-8" data-fade="2">
              <div className="relative mx-auto max-w-2xl">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder={t('blog.search.placeholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#111111] text-neutral-200 rounded-xl px-12 py-3
                      border border-gray-800/50 hover:border-emerald-500/50 focus:border-emerald-700
                      outline-none transition-all duration-300 text-sm md:text-base placeholder-neutral-600"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <HiSearch className="text-gray-400 text-lg" />
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-xs text-neutral-600">
                      ⌘ S
                    </div>
                  </div>
                  <LanguageSwitcher variant="blog" />
                </div>
                {searchQuery && (
                  <p className="mt-3 text-sm text-gray-400 text-center">
                    {t('blog.search.results')} {filteredPosts.length}{' '}
                    {t('blog.article.notfound')}
                    {filteredPosts.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Topics Section */}
            <div className="mt-6 mb-8" data-fade="3">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs md:text-sm text-neutral-50 mr-2">
                  {t('blog.topics.choose')}
                </span>
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicClick(topic)}
                    className={clsx(
                      'px-1.5 py-1 text-xs rounded-lg md:text-sm transition-all duration-300',
                      selectedTopics.includes(topic)
                        ? 'bg-emerald-500/10 text-neutral-50 '
                        : 'bg-[#17171799] text-[#7e7e7e] hover:text-neutral-200 '
                    )}
                  >
                    {t(`blog.topics.list.${topic}`)}
                  </button>
                ))}
              </div>

              {/* Active Filters */}
              {selectedTopics.length > 0 && (
                <div className="mt-4 flex items-center gap-2" data-fade="4">
                  <span className="text-xs md:text-sm text-neutral-50">
                    {t('blog.filters.active')}:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedTopics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center gap-1"
                      >
                        {t(`blog.topics.list.${topic}`)}
                        <button
                          onClick={() =>
                            setSelectedTopics((prev) =>
                              prev.filter((t) => t !== topic)
                            )
                          }
                          className="ml-1 hover:text-emerald-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => setSelectedTopics([])}
                      className="text-xs text-neutral-400 hover:text-emerald-400 transition-colors"
                    >
                      {t('blog.filters.reset')}
                    </button>
                  </div>
                </div>
              )}
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
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-8"
              data-fade="4"
            >
              {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    searchQuery={searchQuery}
                    checkTagged={checkTagged}
                    index={index}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-sm md:text-2xl 2xl:text-3xl font-bold mb-1">
                    {t('blog.article.notfound')}{' '}
                    <Accent>{t('blog.article.notfound')}</Accent>
                  </h3>
                  <p className="text-xs md:text-sm 2xl:text-base text-gray-400">
                    {t('blog.article.notfound.description')}
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

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  const blogPosts = await getAllPosts(locale);
  return {
    props: {
      blogPosts,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default BlogPage;
