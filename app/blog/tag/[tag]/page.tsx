import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { slugify } from '@/lib/utils/slug';
import Layout from '@/components/layout/Layout';
import { HiTag } from 'react-icons/hi';
import Breadcrumb from '@/components/shared/Breadcrumb';
import ArticleCardAlt from '@/components/blog/ArticleCardAlt';

interface TagPageProps {
  params: { tag: string };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  const humanTag = tag.replace(/-/g, ' ');
  const title = `Posts tagged '${humanTag}'`;
  const description = `All the articles related to '${humanTag}' by AL KINDI.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/tag/${tag}/`,
    },
    openGraph: {
      title,
      description,
      url: `/blog/tag/${tag}/`,
      type: 'website',
      images: [
        {
          url: '/images/default.png',
          width: 1200,
          height: 630,
          alt: 'AL KINDI',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/default.png'],
    },
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: TagPageProps) {
  const decodedTag = params.tag;
  const posts = await getAllPosts();
  const filteredPosts = posts.filter((post) =>
    post.tags?.some((t) => slugify(t) === decodedTag)
  );

  if (!filteredPosts.length) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: `Tag: ${decodedTag.replace(/-/g, ' ')}` },
  ];

  return (
    <Layout>
      <main className="content-spacing min-h-screen pt-40">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <h1 className="text-4xl font-bold mb-8 flex items-center gap-2">
            <HiTag className="text-emerald-400 w-6 h-6" /> Tag:{' '}
            {decodedTag.replace(/-/g, ' ')}
          </h1>
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <ArticleCardAlt key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
