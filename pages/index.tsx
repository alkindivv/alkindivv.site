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

// Type untuk ResourceIcon
type ResourceIcon = 'book' | 'file' | 'link' | 'database';

// Type untuk Resource
type Resource = {
  title: string;
  description: string;
  icon: ResourceIcon;
  url: string;
};

// Data untuk resource preview dari resources.tsx
const resourceItems: Resource[] = [
  {
    title: 'Legal Templates',
    description:
      'Essential legal document templates for various corporate needs.',
    icon: 'file',
    url: '/resources#templates',
  },
  {
    title: 'Book Recommendations',
    description: 'Curated list of books on corporate law and fintech.',
    icon: 'book',
    url: '/books',
  },
  {
    title: 'Research Publications',
    description: 'Latest research papers and publications on legal tech.',
    icon: 'database',
    url: '/resources#research',
  },
  {
    title: 'Learning Resources',
    description:
      'Courses, webinars, and learning materials on various legal topics.',
    icon: 'link',
    url: '/resources#learning',
  },
];

// Data untuk glossary preview dari glossary.tsx
const glossaryItems = [
  {
    term: 'Blockchain',
    definition:
      'A digital ledger of transactions that is duplicated and distributed across a network of computer systems.',
    category: 'Tech',
  },
  {
    term: 'Smart Contract',
    definition:
      'Self-executing contracts where the terms are directly written into code.',
    category: 'Tech',
  },
  {
    term: 'Capital Market',
    definition:
      'A market where buyers and sellers engage in trade of financial securities.',
    category: 'Finance',
  },
  {
    term: 'M&A',
    definition:
      'Mergers and acquisitions referring to consolidation of companies or assets.',
    category: 'Corporate',
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

      <main className="relative min-h-screen flex flex-col items-center justify-center -mt-16 md:mt-0">
        {/* Hero Content */}
        <div className="w-full">
          <div className="max-w-[1100px] mx-auto space-y-8">
            {/* Hero Section */}
            <HeroSection />

            {/* Content Sections */}
            <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
              {/* About Preview */}
              <AboutPreview />

              {/* Latest Blog Posts */}
              <LatestBlogPosts posts={posts} />

              {/* Glossary Preview */}
              <GlossaryPreview items={glossaryItems} />

              {/* Resources Preview */}
              <ResourcesPreview resources={resourceItems} />

              {/* Chat/AMA Preview */}
              <ChatPreview />

              {/* Footer */}
              {/* <Footer /> */}
            </div>
          </div>
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
