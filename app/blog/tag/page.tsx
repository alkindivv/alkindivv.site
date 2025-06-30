import React from 'react';
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import Layout from '@/components/layout/Layout';
import Breadcrumb from '@/components/shared/Breadcrumb';
import StructuredData from '@/components/shared/StructuredData';
import Link from 'next/link';
import { FiHash } from 'react-icons/fi';
import Image from 'next/image';
import { viewport } from '../../viewport';

export { viewport };

// Metadata untuk halaman tag index
export const metadata: Metadata = {
  title: 'Tags',
  description: 'explore all article tags',
  alternates: {
    canonical: '/blog/tag',
  },
  openGraph: {
    title: 'Tags',
    description: 'explore all article tags',
    url: 'https://alkindi.id/blog/tag',
    type: 'website',
  },
};

interface TagWithCount {
  name: string;
  slug: string;
  count: number;
}

function getTagsWithCount(posts: any[]): TagWithCount[] {
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags?.forEach((tag: string) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export default async function TagIndexPage() {
  const posts = await getAllPosts();
  const tags = getTagsWithCount(posts);

  return (
    <>
      <StructuredData
        type="webPage"
        pageTitle="Tags"
        pageDescription="explore all article tags"
        pagePath="/blog/tag"
      />

      <Layout>
        {/* Optimized Background Effect - Matching Blog Page */}
        <div
          className="absolute inset-0 overflow-hidden h-[950px] bg-neutral-950"
          style={{
            maskImage:
              'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
          }}
        >
          <div
            aria-hidden="true"
            className="h-[900px] w-[950px] rounded-full bg-gradient-to-r from-[#2E996C]/70 to-[#0F3324]/10 blur-[150px] absolute top-0 -translate-y-full rotate-55 origin-left z-[-2] left-[5%]"
          />
          <Image
            alt=""
            width={10}
            height={25}
            className="pointer-events-none select-none absolute w-full inset-0 h-[950px] object-cover z-[-1] opacity-40 mix-blend-overlay"
            src="/images/textures/crumpled-3.jpg"
            priority
          />
        </div>

        <main className="">
          <section className="min-h-screen pt-40 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Header Section - Matching Blog Page Style */}
              <div className="mb-12 max-w-2xl mx-auto" data-fade="1">
                <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                  All <span className="gradient-text">Tags</span>
                </h3>
                <p className="text-neutral-400 leading-relaxed text-center">
                  Explore articles by tags
                </p>
                <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
              </div>

              <div className="mb-4" data-fade="2">
                <Breadcrumb
                  items={[
                    { label: 'Blog', href: '/blog' },
                    { label: 'Tag', href: '/blog/tag' },
                  ]}
                  pagePath="/blog/tag"
                />
              </div>

              {/* Tags Grid - Legal Document Style */}
              <div className="space-y-6 py-6" data-fade="3">
                {tags.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/blog/tag/${tag.slug}`}
                        className="group block p-4 bg-[#0a0a0a]/80 border border-white/5 rounded-lg hover:border-neutral-800 hover:bg-[#0a0a0a]/60 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <FiHash className="text-emerald-400/60 text-xl group-hover:text-emerald-400 transition-colors" />
                          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                            {tag.count}
                          </span>
                        </div>

                        <h3 className="font-semibold text-neutral-200 group-hover:text-white transition-colors mb-1">
                          {tag.name}
                        </h3>

                        <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                          {tag.count} articles available
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-[#0a0a0a]/80 border border-white/5 rounded-lg p-6">
                    <FiHash className="w-16 h-16 text-neutral-600 mx-auto mb-6" />
                    <h3 className="text-xl font-medium text-neutral-300 mb-3">
                      No tags available
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      Tags will appear after the first article is published
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
