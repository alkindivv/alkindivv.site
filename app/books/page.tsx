import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { Metadata } from 'next';
import { HiOutlineBookOpen } from 'react-icons/hi';
import Breadcrumb from '@/components/shared/Breadcrumb';
import DimensionLink from '@/components/common/DimensionLink';

export const metadata: Metadata = {
  title: 'Books Collection',
  description:
    'Some of the books that I have read and annotated with my personal notes and takeaways.',
  openGraph: {
    title: 'Books Collection',
    description:
      'Some of the books that I have read and annotated with my personal notes and takeaways.',
    type: 'website',
    url: '/books/',
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
    title: 'Books Collection',
    description:
      'Some of the books that I have read and annotated with my personal notes and takeaways.',
    images: ['/images/default.png'],
  },
  alternates: {
    canonical: '/books/',
  },
};

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  publishYear: string;
  category: string;
  description: string;
  keyTakeaways?: string[];
  personalThoughts?: string;
  url?: string;
}

const books: Book[] = [
  {
    id: 1,
    title: 'Hukum Perseroan Terbatas',
    author: 'M. Yahya Harahap, S.H.',
    coverImage: '/images/hk-pt.jpg',
    publishYear: '2008',
    category: 'Corporate Law',
    description:
      'A comprehensive guide to the legal aspects of limited liability companies in Indonesia, covering company structure, governance, and legal liabilities.',
    personalThoughts:
      'This book has greatly helped me understand the basics of PT, especially in the aspects of director and supervisory board responsibilities.',
    keyTakeaways: [
      'Comprehensive understanding of PT structure',
      'Company governance principles',
      'Shareholder rights and obligations',
    ],
    url: 'https://simpus.mkri.id/opac/detail-opac?id=7162',
  },
  {
    id: 2,
    title: 'Hukum Bisnis',
    author: 'Dr. Rr. Rina Antasari, S.H., M.Hum. & Dra. Fauziah, M.Hum.',
    coverImage: '/images/hk-bisnis.png',
    publishYear: '2018',
    category: 'Business Law',
    description:
      'Discusses important aspects of business law such as contracts, bankruptcy, mergers & acquisitions, foreign investment, and alternative dispute resolution.',
    personalThoughts:
      'I found many new insights about practical aspects of business law, especially in handling real-life cases.',
    keyTakeaways: [
      'Basic principles of contract law',
      'Framework of M&A',
      'Bankruptcy procedures',
    ],
    url: 'https://perpus.s1.fisip.hangtuah.ac.id/index.php?p=show_detail&id=2744&keywords=',
  },
];

export default function BooksPage() {
  const breadcrumbItems = [{ label: 'Books' }];
  return (
    <Layout title="Books">
      <div
        className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950"
        style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="h-[900px] w-[950px] rounded-full bg-gradient-to-r from-[#2E996C]/70 to-[#0F3324]/10 blur-[150px] absolute top-0 -translate-y-full rotate-45 origin-left z-[-2] left-[15%]"
        />
        <Image
          alt=""
          width={1280}
          height={825}
          className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
          src="/images/textures/crumpled.jpg"
          priority
        />

        {/* Legal paper texture */}
        <div
          className="absolute inset-0 opacity-10 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(16,185,129,0.08) 1px, transparent 1px)',
            backgroundSize: '100% 28px',
          }}
        />
      </div>

      {/* Content */}
      <main className="min-h-screen pt-40 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header - Legal Styled */}
          <div className="mb-12 max-w-2xl mx-auto" data-fade="1">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Books <span className="gradient-text">Refrences</span>
            </h3>
            <p className="text-neutral-400 leading-relaxed text-center">
              Some of the books that I have read and annotated with my personal
              notes.
            </p>

            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>

          <div className=" mb-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Books List - Simple & Elegant */}
          <ul className="divide-y divide-neutral-800/60">
            {books.map((book) => (
              <li key={book.id} className="py-6 flex items-start gap-6">
                {/* Cover thumbnail */}
                <div className="shrink-0 hidden md:block">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={124}
                    height={96}
                    className="object-cover rounded"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h4 className="text-lg md:text-2xl font-semibold text-white leading-snug">
                    <DimensionLink href={book.url || ''}>
                      {book.title}
                    </DimensionLink>
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-500 mb-2">
                    {book.author} • {book.publishYear} • {book.category}
                  </p>
                  <p className="paragraph-text leading-relaxed">
                    {book.description}
                  </p>

                  {book.keyTakeaways && (
                    <ul className="mt-3 list-disc list-inside space-y-1 paragraph-text leading-relaxed">
                      {book.keyTakeaways.map((take, idx) => (
                        <li key={idx}>{take}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Legal footer */}
          {/* <div className="mt-12 text-end text-[10px] text-neutral-500 font-mono">
            BOOKS-{new Date().getFullYear()}
          </div> */}
          <div className="mt-16 text-center relative">
            {/* Law scale divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-neutral-800"></div>
              <div className="mx-4">
                <HiOutlineBookOpen className="w-8 h-8 text-emerald-500/30" />
              </div>
              <div className="h-px w-16 bg-neutral-800"></div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
              <HiOutlineBookOpen className="w-4 h-4 text-emerald-500/50" />
              <span>For professional reference only</span>
            </div>

            {/* Legal disclaimer */}
            <p className="mt-4 text-[10px] text-neutral-600 max-w-lg mx-auto">
              These are provided for informational purposes only and do not
              constitute legal advice. Always consult with a qualified legal
              professional before using these for references.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
