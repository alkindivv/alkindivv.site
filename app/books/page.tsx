import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  HiOutlineCalendar,
  HiOutlineTag,
  HiLibrary,
  HiOutlineBookOpen,
  HiScale,
} from 'react-icons/hi';
import { IoBookSharp } from 'react-icons/io5';

export const metadata: Metadata = {
  title: 'Books Collection | AL KINDI',
  description:
    'A curated collection of legal and technology books with personal notes and takeaways.',
  openGraph: {
    title: 'Books Collection | AL KINDI',
    description:
      'A curated collection of legal and technology books with personal notes and takeaways.',
    type: 'website',
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
      'Buku ini memberikan pemahaman mendalam tentang aspek hukum Perseroan Terbatas di Indonesia, termasuk struktur organisasi, tata kelola, dan tanggung jawab hukum.',
    personalThoughts:
      'Buku ini sangat membantu saya memahami konsep dasar PT, terutama dalam aspek tanggung jawab direksi dan dewan komisaris.',
    keyTakeaways: [
      'Pemahaman komprehensif struktur PT',
      'Prinsip tata kelola perusahaan',
      'Hak dan kewajiban pemegang saham',
    ],
  },
  {
    id: 2,
    title: 'Hukum Bisnis',
    author: 'Dr. Rr. Rina Antasari, S.H., M.Hum. & Dra. Fauziah, M.Hum.',
    coverImage: '/images/hk-bisnis.png',
    publishYear: '2018',
    category: 'Business Law',
    description:
      'Membahas aspek-aspek penting dalam hukum bisnis seperti kontrak, kepailitan, merger & akuisisi, investasi asing dan penyelesaian sengketa alternatif.',
    personalThoughts:
      'Saya menemukan banyak wawasan baru tentang aspek praktis hukum bisnis, terutama dalam penanganan kasus-kasus nyata.',
    keyTakeaways: [
      'Dasar-dasar hukum kontrak',
      'Kerangka hukum M&A',
      'Prosedur kepailitan',
    ],
  },
];

export default function BooksPage() {
  return (
    <Layout title="Books | AL KINDI">
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
              My Books <span className="gradient-text">Refrences</span>
            </h3>
            <p className="text-neutral-400 leading-relaxed text-center">
              Essential legal textbooks with personal annotations and key points
            </p>

            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>

          {/* Books Grid - Legal Styled */}
          <div className="grid grid-cols-1 gap-8">
            {books.map((book, index) => (
              <div
                key={book.id}
                className="relative backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]"
              >
                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

                {/* Document number */}
                <div className="absolute top-3 right-3">
                  <div className="text-[10px] text-neutral-500 font-mono">
                    REF-BK-{index + 1}/
                    {new Date().getFullYear().toString().substring(2)}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  {/* Book Cover */}
                  <div className="md:w-1/4 h-[300px] md:h-auto relative">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />

                    {/* Legal seal overlay */}
                    <div className="absolute bottom-3 right-3 w-16 h-16 rounded-full border-2 border-emerald-500/20 flex items-center justify-center">
                      <HiScale className="w-8 h-8 text-emerald-500/20" />
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="md:w-3/4 p-6 flex flex-col">
                    {/* Meta Information */}
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="flex items-center text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                        <HiOutlineTag className="w-3 h-3 mr-1" />
                        {book.category}
                      </span>
                      <span className="flex items-center text-xs text-neutral-400">
                        <HiOutlineCalendar className="w-3 h-3 mr-1" />
                        {book.publishYear}
                      </span>
                    </div>

                    {/* Title and Author */}
                    <h2 className="text-xl font-semibold text-white mb-1">
                      {book.title}
                    </h2>
                    <p className="text-sm text-neutral-400 mb-4 flex items-center">
                      <HiOutlineBookOpen className="w-3 h-3 mr-1 inline" />
                      {book.author}
                    </p>

                    {/* Description */}
                    <p className="text-neutral-400 text-sm mb-4">
                      {book.description}
                    </p>

                    {/* Key Takeaways */}
                    {book.keyTakeaways && (
                      <div className="mt-auto">
                        <div className="flex items-center mb-2">
                          <div className="h-px flex-grow bg-neutral-800/30 mr-3"></div>
                          <h3 className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                            Key Legal Principles
                          </h3>
                          <div className="h-px flex-grow bg-neutral-800/30 ml-3"></div>
                        </div>
                        <ul className="grid grid-cols-1 gap-2">
                          {book.keyTakeaways.map((point, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-neutral-400 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legal footer */}
          <div className="mt-12 text-end text-[10px] text-neutral-500 font-mono">
            BOOKS-{new Date().getFullYear()}
          </div>
          <div className="mt-16 text-center relative">
            {/* Law scale divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-neutral-800"></div>
              <div className="mx-4">
                <HiScale className="w-8 h-8 text-emerald-500/30" />
              </div>
              <div className="h-px w-16 bg-neutral-800"></div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
              <HiScale className="w-4 h-4 text-emerald-500/50" />
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
