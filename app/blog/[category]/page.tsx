import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import Layout from '@/components/layout/Layout';
import { HiLibrary, HiSearch, HiScale } from 'react-icons/hi';
import clsx from 'clsx';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Accent from '@/components/shared/Accent';
import { viewport } from '../../viewport';
import ArticleCardAlt from '@/components/blog/ArticleCardAlt';

export { viewport };

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Tambahkan di bagian atas setelah imports
const debugProduction = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`[Category Page] ${message}`);
    if (data) {
      console.log(
        `[Category Page] Data:`,
        typeof data === 'object'
          ? JSON.stringify(data).substring(0, 200) + '...'
          : data
      );
    }
  }
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = params;
  const categories = await getAllCategories();
  const categoryData = categories.find((cat: any) => cat.slug === category);

  if (!categoryData) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found',
    };
  }

  return {
    title: `${categoryData.name} Articles`,
    description: `Explore ${categoryData.name.toLowerCase()} articles by AL KINDI. In-depth analysis and insights on ${categoryData.name.toLowerCase()} topics.`,
    alternates: {
      canonical: `/blog/${category}/`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const categories = await getAllCategories();
  const categoryData = categories.find((cat: any) => cat.slug === category);

  if (!categoryData) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const filteredPosts = allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );

  // Debug rendering dan data di production
  debugProduction('Component mounted with data', {
    categoryName: categoryData?.name,
    categorySlug: categoryData?.slug,
    postsCount: filteredPosts?.length,
  });

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: categoryData.name },
  ];

  return (
    <Layout>
      <main className={clsx('content-spacing')}>
        <section className="min-h-screen pt-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section - Matching Blog Style */}
            <div className="mb-12 max-w-2xl mx-auto text-center" data-fade="1">
              <div className="flex items-center space-x-2 mb-2 justify-center">
                <HiLibrary className="text-emerald-400 w-5 h-5" />
                <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
                  {categoryData.name} Article Collection
                </h2>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                <span className="gradient-text">{categoryData.name}</span>{' '}
                Articles
              </h3>
              <p className="text-neutral-400 leading-relaxed text-center">
                {categoryData.description}
              </p>

              {/* Document Number Line */}
            </div>

            <div className="mb-6">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {/* Search Input - Matching Blog Style */}
            <div className="mt-8 mb-8" data-fade="2">
              <div className="relative mx-auto max-w-2xl">
                <div className="relative group h-full border border-neutral-800/70 rounded-md overflow-hidden hover:border-emerald-500/30 transition-all duration-300 bg-neutral-900/20">
                  {/* Legal document styling */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full bg-transparent text-neutral-200 rounded-xl px-12 py-3 outline-none transition-all duration-300 text-sm md:text-base focus:outline-none focus:ring-0 placeholder-neutral-600"
                  />
                  <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>
              </div>
            </div>

            {/* Blog Posts List - Legal Styled */}
            <div className="relative mb-8" data-fade="3">
              {/* Legal document styling */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

              <div className="space-y-6 py-6">
                {filteredPosts?.length > 0 ? (
                  filteredPosts.map((post) => (
                    <ArticleCardAlt key={post.slug} post={post} />
                  ))
                ) : (
                  <div className="text-center py-10 border border-neutral-800/70 rounded-sm p-6 relative">
                    {/* Legal document styling */}

                    <h3 className="text-xl font-bold mb-1">
                      Sorry, <Accent>article not found</Accent>
                    </h3>
                    <p className="text-sm text-neutral-400">
                      No articles found for your search query
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category: any) => ({
    category: category.slug,
  }));
}
