import React, { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { BlogPost, BlogCategory } from '@/types/blog';
import SEO from '@/components/shared/SEO';
import BlogCard from '@/components/blog/BlogCard';
import { HiSearch, HiCalendar, HiClock, HiEye } from 'react-icons/hi';
import Accent from '@/components/shared/Accent';
import Tag from '@/components/shared/Tag';
import clsx from 'clsx';
import HighlightedText from '@/components/shared/HighlightedText';
import Breadcrumb from '@/components/shared/Breadcrumb';

interface CategoryPageProps {
  posts: BlogPost[];
  category: BlogCategory;
}

export default function CategoryPage({ posts, category }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const searchContent = [
      post.title,
      post.description,
      post.excerpt,
      ...(post.tags || []),
    ]
      .join(' ')
      .toLowerCase();

    return searchContent.includes(searchQuery.toLowerCase());
  });

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: category.name },
  ];

  return (
    <Layout>
      <SEO
        title={`${category.name} Articles - Al Kindi`}
        description={category.description}
      />
      <main
        className={clsx(
          'content-spacing fade-wrapper',
          !isLoaded && 'opacity-0'
        )}
      >
        <section className="bg-dark">
          <div className="layout py-3">
            {/* Breadcrumb */}

            <h1 className="mb-2 text-3xl md:text-4xl 2xl:text-5xl font-bold tracking-tight">
              <Accent>{category.name}</Accent> Articles
            </h1>
            <p className="mt-2text-sm md:text-base 2xl:text-lg font-light text-gray-400 leading-relaxed">
              {category.description}
            </p>

            {/* Search Section */}
            <div className="mt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-[#111111] border border-gray-800 rounded-lg
                            text-gray-200 placeholder-gray-400 focus:outline-none focus:border-emerald-500
                            transition-colors"
                />
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-gray-400">
                  Found {filteredPosts.length} article
                  {filteredPosts.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <div className="mb-6">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {/* Articles List */}
            <div className="mt-8 space-y-4">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  className="!block !p-5 !h-auto bg-[#111111] border border-gray-800 hover:border-gray-700 rounded-lg
                  transition"
                  searchQuery={searchQuery}
                  customContent={(
                    post,
                    views,
                    readingTimeMinutes,
                    publishedDate
                  ) => (
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 md:gap-x-3">
                          <time className="text-sm text-gray-400 flex items-center gap-1">
                            <HiCalendar className="inline" />
                            {new Date(publishedDate).toLocaleDateString(
                              'id-ID',
                              {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </time>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <HiClock className="inline" />
                            <Accent>{readingTimeMinutes} min read</Accent>
                          </span>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <HiEye className="inline" />
                            <Accent>{views} views</Accent>
                          </span>
                        </div>
                        <h2 className="mt-2 text-xl font-semibold text-white group-hover:text-emerald-500 transition">
                          <HighlightedText
                            text={post.title}
                            searchQuery={searchQuery}
                          />
                        </h2>
                        <p className="mt-2 text-gray-400 line-clamp-2">
                          <HighlightedText
                            text={post.description || post.excerpt || ''}
                            searchQuery={searchQuery}
                          />
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags?.map((tag) => (
                            <Tag
                              key={tag}
                              variant="default"
                              className={clsx(
                                'inline-block',
                                'px-1 py-0.5 text-xs md:text-sm',
                                'rounded-md border',
                                'bg-black border-gray-600 text-gray-200',
                                'hover:text-white',
                                'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                                'transition-colors'
                              )}
                            >
                              <HighlightedText
                                text={tag || ''}
                                searchQuery={searchQuery}
                              />
                            </Tag>
                          ))}
                        </div>
                      </div>
                      {post.featuredImage && (
                        <div className="w-full md:w-auto md:ml-4 md:flex-shrink-0 order-first md:order-last">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-48 md:w-24 md:h-24 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  )}
                />
              ))}

              {/* No Results Message */}
              {searchQuery && filteredPosts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-lg sm:text-xl 2xl:text-2xl font-semibold">
                    Sorry, <Accent>Article not found.</Accent>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getAllCategories();
  const paths = categories.map((category) => ({
    params: { category: category.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categories = getAllCategories();
  const category = categories.find((cat) => cat.slug === params?.category);

  if (!category) {
    return {
      notFound: true,
    };
  }

  const allPosts = await getAllPosts();
  const posts = allPosts.filter(
    (post) => post.category.toLowerCase() === category.slug.toLowerCase()
  );

  return {
    props: {
      posts,
      category,
    },
  };
};
