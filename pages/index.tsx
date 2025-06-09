import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/common/HeroSection';
import AboutPreview from '@/components/common/AboutPreview';
import LatestBlogPosts from '@/components/common/LatestBlogPosts';
import ChatPreview from '@/components/common/ChatPreview';
import GlossaryPreview from '@/components/common/GlossaryPreview';
import ResourcesPreview from '@/components/common/ResourcesPreview';
// import Footer from '@/components/common/Footer';
// import Particles from '@/components/common/Particles';
import { getAllPosts } from '@/lib/mdx';
import { BlogPost } from '@/types/blog';

// Type untuk resource preview - disesuaikan dengan komponen ResourcesPreview baru
type ResourcePreview = {
  title: string;
  description: string;
  type: 'document' | 'book' | 'form' | 'link';
  url: string;
};

// Data untuk glossary preview dari glossary.tsx
const glossaryItems = [
  {
    term: 'Blockchain',
    definition:
      'A digital ledger of transactions that is duplicated and distributed across a network of computer systems.',
    category: 'Tech',
    tags: ['Technology', 'Cryptocurrency'],
  },
  {
    term: 'Smart Contract',
    definition:
      'Self-executing contracts where the terms are directly written into code.',
    category: 'Tech',
    tags: ['Technology', 'Law'],
  },
  {
    term: 'Capital Market',
    definition:
      'A market where buyers and sellers engage in trade of financial securities.',
    category: 'Finance',
    tags: ['Finance', 'Investment'],
  },
  {
    term: 'M&A',
    definition:
      'Mergers and acquisitions referring to consolidation of companies or assets.',
    category: 'Corporate',
    tags: ['Corporate Law', 'Business'],
  },
];

// Data resources yang disesuaikan dengan struktur baru
const resourceItems: ResourcePreview[] = [
  {
    title: 'Legal Templates',
    description: 'Essential document templates for corporate legal matters',
    type: 'document',
    url: '/resources',
  },
  {
    title: 'Books Collection',
    description: 'Some of my favorite books that I have read and enjoyed ',
    type: 'book',
    url: '/books',
  },
  {
    title: 'Research Publications',
    description: 'Latest research papers and publications on legal technology',
    type: 'link',
    url: '/resources',
  },
];

interface HomePageProps {
  posts: BlogPost[];
}

export default function HomePage({ posts }: HomePageProps) {
  // Init fade animations on mount
  useEffect(() => {
    document.body.classList.add('fade-wrapper');

    return () => {
      document.body.classList.remove('fade-wrapper');
    };
  }, []);

  return (
    <Layout>
      {/* Background particles */}
      {/* <Particles /> */}

      <main className="relative min-h-screen flex flex-col -mt-16 md:mt-0">
        {/* Hero Content - Full Width */}
        <div className="w-full">
          <div className="max-w-[1100px] mx-auto">
            {/* Hero Section */}
            <HeroSection />
          </div>
        </div>

        {/* Content Sections Container */}
        <div id="content-sections" className="w-full">
          {/* About Preview - Full Width Section */}
          <AboutPreview />

          {/* Latest Blog Posts - Full Width Section with inner container */}
          <section className="w-full relative overflow-hidden">
            <div className="relative z-10">
              <LatestBlogPosts posts={posts} />
            </div>
          </section>

          {/* Glossary Preview - Full Width Section */}
          <GlossaryPreview items={glossaryItems} />

          {/* Resources Preview - Full Width Section */}
          <ResourcesPreview resources={resourceItems} />

          {/* Chat/AMA Preview - Full Width Section with inner container */}
          <section className="w-full relative overflow-hidden">
            <div className="relative z-10">
              <ChatPreview />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

// Get blog posts for the homepage
export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts: posts.slice(0, 3),
    },
  };
}
