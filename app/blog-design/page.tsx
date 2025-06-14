import React from 'react';
import { getAllPosts } from '@/lib/posts';
import Layout from '@/components/layout/Layout';
import ArticleCardAlt from '@/components/blog/ArticleCardAlt';

export const metadata = {
  title: 'Blog Design Showcase',
  description: 'Alternative blog card design preview',
};

export default async function BlogDesignPage() {
  const posts = await getAllPosts();

  return (
    <Layout>
      <main className="content-spacing min-h-screen pt-40">
        <h1 className="text-4xl font-bold mb-10">Blog Design Showcase</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <ArticleCardAlt key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
