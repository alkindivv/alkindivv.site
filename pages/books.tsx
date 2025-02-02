import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import SEO from '@/components/shared/SEO';
import { HiCalendar, HiAnnotation, HiAcademicCap } from 'react-icons/hi';
import clsx from 'clsx';

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  publishYear: string;
  category: string;
  description: string;
  readStatus?: 'Selesai' | 'Sedang Dibaca' | 'Rencana Dibaca';
  notes?: string;
  keyTakeaways?: string[];
  personalThoughts?: string;
}

const books: Book[] = [
  {
    id: 1,
    title: 'Hukum Perseroan Terbatas',
    author: 'M. Yahya Harahap, S.H.',
    coverImage: '/images/resources/buku-pt.jpg',
    publishYear: '2008',
    category: 'Corporate Law',
    description:
      'Buku ini memberikan pemahaman mendalam tentang aspek hukum Perseroan Terbatas di Indonesia, termasuk struktur organisasi, tata kelola, dan tanggung jawab hukum.',
    readStatus: 'Selesai',
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
    coverImage: '/images/resources/hukum-bisnis.jpg',
    publishYear: '2018',
    category: 'Business Law',
    description:
      'Membahas aspek-aspek penting dalam hukum bisnis seperti kontrak, kepailitan, merger & akuisisi, investasi asing dan penyelesaian sengketa alternatif.',
    readStatus: 'Selesai',
    personalThoughts:
      'Saya menemukan banyak wawasan baru tentang aspek praktis hukum bisnis, terutama dalam penanganan kasus-kasus nyata.',
    keyTakeaways: [
      'Dasar-dasar hukum kontrak',
      'Kerangka hukum M&A',
      'Prosedur kepailitan',
    ],
  },
  {
    id: 3,
    title: 'Design Patterns',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    coverImage: '/images/books/design-patterns.jpg',
    publishYear: '1994',
    category: 'Software Engineering',
    description:
      'Mengulas pola desain dalam pengembangan software berorientasi objek, menyajikan solusi untuk masalah desain yang umum ditemui.',
    readStatus: 'Rencana Dibaca',
    personalThoughts:
      'Buku ini direkomendasikan oleh mentor saya untuk memperdalam pemahaman tentang arsitektur software.',
    keyTakeaways: [
      'Fundamental design patterns dalam OOP',
      'Solusi untuk masalah desain yang umum',
      'Best practices dalam arsitektur software',
    ],
  },
];

const readStatuses = ['All', 'Selesai', 'Sedang Dibaca', 'Rencana Dibaca'];

export default function BooksPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredBooks = books.filter((book) => {
    return selectedStatus === 'All' || book.readStatus === selectedStatus;
  });

  return (
    <Layout title="Books | AL KINDI" isHomePage={false}>
      <SEO
        templateTitle="Reading Notes"
        description="books that i read to improve my knowledge and exploring a new things."
        canonical="https://alkindivv.site/books/"
      />

      <main className="content-spacing">
        {/* Background Effect */}
        <div className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950">
          <Image
            alt=""
            loading="lazy"
            width={1280}
            height={825}
            className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-20"
            src="/images/textures/crumpled.jpg"
          />
        </div>

        {/* Content */}
        <section className="min-h-screen pt-40 relative z-10">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="text-center space-y-4" data-fade="1">
              <h1 className="text-4xl md:text-5xl font-bold">
                Reading <span className="gradient-text">Notes</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Catatan pembelajaran dan ringkasan dari buku-buku yang saya baca
                tentang hukum, bisnis, dan teknologi.
              </p>
            </div>

            <div
              className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-10 mt-5"
              data-fade="2"
            />

            {/* Status Filter */}
            <div className="mb-8" data-fade="3">
              <div className="flex flex-wrap gap-2 justify-center">
                {readStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={clsx(
                      'px-4 py-2 rounded-lg text-sm transition-all',
                      selectedStatus === status
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'text-gray-400 hover:text-emerald-400 border border-gray-800'
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Books List */}
            <div className="space-y-6" data-fade="4">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 hover:border-emerald-500/20 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Cover (smaller) */}
                    <div className="md:w-1/4">
                      <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-3/4 space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                          {book.category}
                        </span>
                        {book.readStatus && (
                          <span className="text-xs text-gray-400 border border-gray-800 px-2 py-1 rounded">
                            {book.readStatus}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <HiCalendar className="w-4 h-4" />
                          {book.publishYear}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-xl text-gray-200">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          oleh {book.author}
                        </p>
                      </div>

                      <p className="text-sm text-gray-400">
                        {book.description}
                      </p>

                      {book.personalThoughts && (
                        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
                            <HiAnnotation className="w-4 h-4" />
                            Catatan Pribadi:
                          </h4>
                          <p className="text-sm text-gray-400">
                            {book.personalThoughts}
                          </p>
                        </div>
                      )}

                      {book.keyTakeaways && (
                        <div>
                          <h4 className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
                            <HiAcademicCap className="w-4 h-4" />
                            Poin Penting:
                          </h4>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {book.keyTakeaways.map((point, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-400 flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 mt-1.5" />
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
          </div>
        </section>
      </main>
    </Layout>
  );
}
