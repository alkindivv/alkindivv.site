import React, { useEffect, useState, lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import Head from 'next/head';
// import styles from '@/styles/Blog.module.css';
import { GetStaticProps } from 'next/types';
import BlogCard from '@/components/blog/BlogCard';
import Accent from '@/components/shared/Accent';
import {
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiLibrary,
  HiBookOpen,
  HiDocumentText,
  HiScale,
} from 'react-icons/hi';
import clsx from 'clsx';
// import { IconType } from 'react-icons/lib';
import { getAllPosts } from '@/lib/mdx';
import { BlogPost } from '@/types/blog';
import PowerfulSEO from '@/components/shared/PowerfulSEO';
import HighlightedText from '@/components/shared/HighlightedText';
import Image from 'next/image';
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

interface BlogPageProps {
  blogPosts: BlogPost[];
}

// interface SortOption {
//   id: string;
//   name: string;
//   icon: IconType;
// }

const BlogPage: React.FC<BlogPageProps> = ({ blogPosts }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
    setCurrentPage(1);
  };

  const checkTagged = (tag: string) => {
    return selectedTopic === tag.toLowerCase();
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
        !selectedTopic ||
        post.tags?.some(
          (tag) => tag.toLowerCase() === selectedTopic.toLowerCase()
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

  // Lazy load pagination component
  const PaginationControls = lazy(() =>
    Promise.resolve({
      default: ({
        currentPage,
        totalPages,
        onPageChange,
      }: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
      }) => (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => onPageChange(currentPage - 1)}
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
                  onClick={() => onPageChange(pageNum)}
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
            onClick={() => onPageChange(currentPage + 1)}
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
      ),
    })
  );

  return (
    <Layout>
      <Head>
        {/* Critical CSS untuk blog page */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .gradient-text {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
              .hero-text {
                color: #a3a3a3;
              }
            `,
          }}
        />
      </Head>

      <PowerfulSEO
        title="Blog"
        description="Thoughts, insights, and opinions about law, technology, and cryptocurrency. Explore articles on corporate law, capital markets, M&A, bankruptcy, and crypto regulations."
        type="website"
        tags={[
          'law',
          'corporate law',
          'capital markets',
          'M&A',
          'bankruptcy',
          'cryptocurrency',
          'legal technology',
        ]}
      />

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
              {/* <div className="flex items-center space-x-2 mb-2 justify-center">
                <HiLibrary className="text-emerald-400 w-5 h-5" />
                <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
                  Legal Journal
                </h2>
              </div> */}
              <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                Thoughts & <span className="gradient-text">Articles</span>
              </h3>
              <p className="text-neutral-400 leading-relaxed text-center">
                Thought, Opinion, and Insights about Law, Technology, and
                Cryptocurrency
              </p>

              {/* Document Number Line - Matching LatestBlogPosts */}
              {/* <div className="flex items-center my-8">
                <div className="h-px flex-grow bg-neutral-800/50"></div>
                <div className="px-4 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 rounded-sm bg-emerald-900/10">
                  ARTICLE INDEX
                </div>
                <div className="h-px flex-grow bg-neutral-800/50"></div>
              </div> */}
              <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
            </div>

            {/* Search Input - Matching LatestBlogPosts Legal Document Style */}
            <div className="mt-8 mb-8" data-fade="2">
              <div className="relative mx-auto max-w-2xl">
                <div className="relative group h-full border border-neutral-800/70 rounded-md overflow-hidden hover:border-emerald-500/30 transition-all duration-300 bg-neutral-900/20">
                  {/* Legal document styling */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                  {/* <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-emerald-500/30"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-emerald-500/30"></div> */}

                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Topics Section - Styled as Legal Document Tabs */}
            {/* <div className="mt-6 mb-8" data-fade="3">
              <div className="flex justify-between items-center border-t border-b border-neutral-800/50 py-2 overflow-x-auto no-scrollbar">
                <div className="flex items-center  text-sm"></div>
                <div className="flex flex-wrap gap-2 items-center overflow-x-auto no-scrollbar">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleTopicClick(topic)}
                      className={clsx(
                        'px-2 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap',
                        selectedTopic === topic
                          ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
                          : 'text-neutral-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20'
                      )}
                    >
                      <HighlightedText text={topic} searchQuery={searchQuery} />
                    </button>
                  ))}
                </div>
              </div> */}

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
                        : ' bg-[#17171799] font-medium text-[#7e7e7e] hover:text-neutral-50'
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

                {/* Corner decorations */}
                {/* <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-emerald-500/30"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-emerald-500/30"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-emerald-500/30"></div>  */}

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
                      <span className="gradient-text font-bold">
                        No articles found
                      </span>
                    </div>
                    <p className=" text-neutral-500 text-sm md:text-xl">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}

                {/* Document footer */}
                <div className="mt-8 text-end text-[10px] text-neutral-500 font-mono">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {/* <div className="h-px w-12 bg-neutral-800"></div> */}
                    {/* <HiScale className="w-4 h-4 text-emerald-500/40" /> */}
                    {/* <div className="h-px w-12 bg-neutral-800"></div> */}
                  </div>
                  ID: BLOG-{new Date().getFullYear()}
                </div>
              </div>
            </div>

            {/* Pagination - Only show if needed */}
            {totalPages > 1 && (
              <Suspense fallback={<div>Loading pagination...</div>}>
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Suspense>
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
              {/* <HiScale className="w-4 h-4 text-emerald-500/50" /> */}
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
