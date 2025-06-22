import React from 'react';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';
import AboutPreview from '@/components/common/AboutPreview';
import LatestBlogPosts from '@/components/common/LatestBlogPosts';

import GlossaryPreview from '@/components/common/GlossaryPreview';
import ResourcesPreview from '@/components/common/ResourcesPreview';
import DiscussionPreview from '@/components/common/DiscussionPreview';

import { getAllPosts } from '@/lib/posts';

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
    term: 'Merger',
    definition:
      'Perbuatan hukum yang dilakukan oleh satu perseroan atau lebih untuk menggabungkan diri dengan perseroan lain yang telah ada dan selanjutnya perseroan yang menggabungkan diri menjadi bubar.',
    category: 'Law',
    tags: ['Merger & Akuisisi', 'Restrukturisasi'],
  },
  {
    term: 'Akuisisi',
    definition:
      'yaitu merupakan suatu strategi bisnis untuk mengambil alih kontrol terhadap suatu PT yaitu dengan cara mengakuisisi saham ataupun aset dari PT sebuah PT, dalam proses Akuisis PT yang saham atau asetnya diakuisisi akan tetap exist dan menjalankan kegiatan usahanya sama seperti sebelumnya, yang berubah hanya kontrol atas PT tersebut',
    category: 'Law',
    tags: ['Hukum Perusahaan', 'M&A'],
  },
  {
    term: 'Komisaris',
    definition:
      'adalah organ perusahaan yang bertugas untuk mengawasi direksi perusahaan dalam menjalankan tugasnya, dan bertanggung jawab kapada Rapat Umum Pemegang Saham (RUPS)',
    category: 'Law',
    tags: ['Hukum Perusahaan', 'M&A'],
  },
  {
    term: 'Direksi',
    definition:
      'adalah merupakan organ perusahaan yang memiliki tugas dan wewenang untuk mengatur jalannya perusahaan dan bertindak untuk mewakili perusahaan baik di dalam maupun diluar persidangan',
    category: 'Law',
    tags: ['Hukum Perusahaan'],
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

const HeroSection = dynamic(() => import('@/components/common/HeroSection'), {
  ssr: false,
  loading: () => null,
});

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <Layout>
      <main className="relative min-h-screen flex flex-col -mt-16 md:mt-0">
        {/* Hero Content - Full Width */}
        <div className="w-full">
          <div className="">
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
              <LatestBlogPosts posts={posts.slice(0, 3)} />
            </div>
          </section>

          {/* Glossary Preview - Full Width Section */}
          <GlossaryPreview items={glossaryItems} />

          {/* Resources Preview - Full Width Section */}
          <ResourcesPreview resources={resourceItems} />

          {/* Discussion Preview - Full Width Section */}
          <section className="w-full relative overflow-hidden">
            <div className="relative z-10">
              <DiscussionPreview />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
