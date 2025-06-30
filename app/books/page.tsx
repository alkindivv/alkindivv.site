import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import DimensionLink from '@/components/common/DimensionLink';
import StructuredData from '@/components/shared/StructuredData';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Books on law, business, and technology',
  openGraph: {
    title: 'Books | AL KINDI',
    description: 'Books on law, business, and technology',
    type: 'website',
    url: '/books/',
    images: [
      {
        url: '/images/default.png',
        width: 1200,
        height: 630,
        alt: 'Books',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Books | AL KINDI',
    description: 'Books on law, business, and technology',
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
      <StructuredData
        type="webPage"
        pageTitle="Books"
        pageDescription="Books on law, business, and technology"
        pagePath="/books/"
      />
      {/* Subtle background with gradient */}
      <div className="absolute inset-0 bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/5 to-neutral-950" />
      </div>

      {/* Content */}
      <main className="min-h-screen pt-40 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header - Legal Styled */}
          <div className="mb-12 max-w-2xl mx-auto" data-fade="1">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Books <span className="gradient-text">References</span>
            </h3>
            <p className="text-neutral-400 leading-relaxed text-center">
              Some of the books that I have read and annotated with my personal
              notes.
            </p>

            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>

          <div className=" mb-4">
            <Breadcrumb items={breadcrumbItems} pagePath="/books/" />
          </div>

          {/* Books List - Ultra Minimal */}
          <div className="space-y-12">
            {books.map((book) => (
              <div key={book.id} className="group">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                  {/* Book Cover - Smaller on mobile */}
                  <div className="col-span-1 aspect-[3/4] relative overflow-hidden rounded bg-neutral-900">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="col-span-2 md:col-span-3 space-y-2 md:space-y-3">
                    <div className="text-xs text-emerald-500">
                      {book.category}
                    </div>

                    <h2 className="text-lg md:text-xl text-white">
                      {book.title}
                    </h2>

                    <p className="text-xs md:text-sm text-neutral-400">
                      {book.author} • {book.publishYear}
                    </p>

                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                      {book.description}
                    </p>

                    {/* Simple link */}
                    {book.url && (
                      <div>
                        <DimensionLink
                          href={book.url}
                          className="text-xs md:text-sm text-neutral-500 py-1.5 rounded-full"
                        >
                          Reference
                        </DimensionLink>
                      </div>
                    )}
                  </div>
                </div>

                {/* Minimal separator */}
                <div className="mt-12 h-px bg-neutral-900 w-full" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
