import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import { HiSearch, HiChevronRight, HiX } from 'react-icons/hi';
import clsx from 'clsx';
import Image from 'next/image';
import Accent from '@/components/shared/Accent';

// Data istilah hukum
const legalTerms = [
  {
    term: 'Perseroan Terbatas (PT)',
    definition:
      'Badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian, melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham.',
    example:
      'PT Gojek Indonesia didirikan sebagai perseroan terbatas pada tahun 2010. Sebagai PT, Gojek dapat menerbitkan saham untuk pendanaan, memiliki aset atas nama perusahaan, dan memiliki tanggung jawab terbatas dimana pemegang saham hanya bertanggung jawab sebatas modal yang disetor.',
    tags: ['Hukum Perusahaan', 'Badan Hukum'],
  },
  {
    term: 'Merger',
    definition:
      'Perbuatan hukum yang dilakukan oleh satu perseroan atau lebih untuk menggabungkan diri dengan perseroan lain yang telah ada dan selanjutnya perseroan yang menggabungkan diri menjadi bubar.',
    example:
      'Merger antara Gojek dan Tokopedia pada tahun 2021 membentuk GoTo Group. Dalam proses ini, kedua perusahaan menggabungkan operasional, aset, dan struktur organisasi mereka menjadi satu entitas baru.',
    tags: ['Merger & Akuisisi', 'Restrukturisasi'],
  },
  {
    term: 'Kepailitan',
    definition:
      'Suatu keadaan di mana debitor tidak mampu untuk melakukan pembayaran terhadap utang-utang dari para kreditornya.',
    example:
      'Kasus kepailitan PT Asuransi Jiwasraya pada tahun 2020, dimana perusahaan tidak mampu membayar klaim nasabah senilai triliunan rupiah, menyebabkan pengadilan menyatakan perusahaan pailit dan menunjuk kurator untuk mengelola aset-asetnya.',
    tags: ['Hukum Kepailitan', 'Utang Piutang'],
  },
  {
    term: 'Akta Notaris',
    definition:
      'Dokumen resmi yang dibuat oleh atau di hadapan notaris menurut bentuk dan tata cara yang ditetapkan oleh undang-undang.',
    tags: ['Dokumen Hukum', 'Notaris'],
  },

  {
    term: 'Force Majeure',
    definition:
      'Keadaan memaksa atau keadaan darurat yang terjadi di luar kendali para pihak yang mengakibatkan tidak dapat dipenuhinya suatu perjanjian.',
    tags: ['Kontrak', 'Perjanjian'],
  },
  {
    term: 'Initial Public Offering (IPO)',
    definition:
      'Penawaran saham suatu perusahaan kepada publik untuk pertama kalinya di pasar modal.',
    tags: ['Pasar Modal', 'Saham'],
  },
  {
    term: 'Kurator',
    definition:
      'Pengurus yang ditunjuk oleh pengadilan niaga untuk mengurus dan membereskan harta debitor pailit.',
    tags: ['Hukum Kepailitan', 'Pengadilan'],
  },
  {
    term: 'Legal Due Diligence',
    definition:
      'Pemeriksaan aspek hukum perusahaan secara menyeluruh untuk mengidentifikasi potensi risiko hukum.',
    tags: ['Audit', 'Compliance'],
  },
  {
    term: 'Nominee',
    definition:
      'Pihak yang ditunjuk untuk bertindak atas nama pihak lain dalam kepemilikan saham atau aset.',
    tags: ['Hukum Perusahaan', 'Kepemilikan'],
  },
].sort((a, b) => a.term.localeCompare(b.term, 'id'));

// Generate unique tags from legal terms
const uniqueTags = Array.from(
  new Set(legalTerms.flatMap((term) => term.tags))
).sort();

// Generate alphabet array A-Z plus #
const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);
alphabet.push('#');

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  // Memoized filtered terms
  const filteredTerms = useMemo(() => {
    return legalTerms.filter((term) => {
      const matchesSearch =
        searchTerm === '' ||
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLetter =
        selectedLetter === '' ||
        term.term.charAt(0).toUpperCase() === selectedLetter ||
        (selectedLetter === '#' && /^[^a-zA-Z]/.test(term.term));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => term.tags.includes(tag));

      return matchesSearch && matchesLetter && matchesTags;
    });
  }, [searchTerm, selectedLetter, selectedTags]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLetter('');
    setSelectedTags([]);
  };

  return (
    <Layout title="Legal Glossary | AL KINDI" isHomePage={false}>
      <SEO
        templateTitle="Legal Glossary"
        description="all legal terms used in Indonesia and worldwide."
        canonical="https://alkindivv.site/glossary/"
      />

      <main className="content-spacing">
        {/* Background Effect */}
        <div
          className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950"
          style={{
            maskImage:
              'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
          }}
        >
          <div
            aria-hidden="true"
            className="h-[400px] w-[450px] rounded-full bg-gradient-to-r from-[#2E996C]/30 to-[#0F3324]/30 blur-[150px] absolute top-0 -translate-y-full rotate-45 origin-left z-[-2] left-[15%]"
          />

          <Image
            alt=""
            loading="lazy"
            width={1280}
            height={825}
            className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
            src=""
          />
        </div>

        {/* Content */}
        <section className="min-h-screen pt-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold" data-fade="1">
                Legal <span className="gradient-text">Glossary</span>
              </h1>
              <p className="hero-text mx-auto" data-fade="2">
                A comprehensive glossary of legal terms used in Indonesia.
              </p>
            </div>

            {/* Main Content with Sidebar Layout */}
            <div className="relative mt-12">
              {/* Search and Filters */}
              <div className="mb-8">
                {/* Search Bar */}
                <div className="mb-8" data-fade="3">
                  <div className="gradient-border p-[1px] rounded-xl hover:p-[1.5px] transition-all duration-300">
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Search keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0a0a0a] text-gray-200 rounded-xl px-12 py-3.5 outline-none
                          transition-all duration-300 text-sm md:text-base placeholder-gray-500
                          focus:bg-[#111111] group-hover:bg-[#0f0f0f]"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <HiSearch className="text-gray-200 text-lg" />
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="px-2 py-1 rounded-md bg-[#1a1a1a00] text-xs text-gray-500">
                          ⌘ S
                        </span>
                      </div>
                    </div>
                  </div>
                  {searchTerm && (
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-400">
                        Found {filteredTerms.length} terms
                        {filteredTerms.length !== 1 ? '' : ''}
                      </p>
                      {filteredTerms.length > 0 && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="mt-2 text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile Filters */}
                <div className="lg:hidden space-y-6 mb-8">
                  {/* Alphabet Filter */}
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-gray-200">
                      Filter Huruf
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {alphabet.map((letter) => (
                        <button
                          key={letter}
                          onClick={() =>
                            setSelectedLetter(
                              selectedLetter === letter ? '' : letter
                            )
                          }
                          className={clsx(
                            'w-8 h-8 rounded-full flex items-center justify-center text-xs text-[#525252]transition-colors',
                            selectedLetter === letter
                              ? 'bg-emerald-500/10 text-[#525252] border border-emerald-500/20'
                              : 'text-[#525252] hover:text-emerald-400 hover:bg-emerald-500/5'
                          )}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags Filter */}
                  <div className="space-y-3 pt-4 border-t border-gray-800">
                    <div className="text-sm font-semibold text-gray-200">
                      Filter Kategori
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {uniqueTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagSelect(tag)}
                          className={clsx(
                            'px-1.5 py-1 text-xs paragraph-text rounded-lg transition-colors',
                            selectedTags.includes(tag)
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'text-[#525252] hover:text-emerald-400 hover:border-emerald-500/20'
                          )}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {(selectedTags.length > 0 || selectedLetter || searchTerm) && (
                  <div className="flex flex-wrap gap-2 items-center mb-8">
                    <span className="text-sm text-gray-400">
                      Active Filters:
                    </span>
                    {selectedTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
                        className="px-3 py-1 text-sm bg-emerald-500/10 text-emerald-400 rounded-full
                               hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
                      >
                        {tag}
                        <HiX className="w-3 h-3" />
                      </button>
                    ))}
                    {selectedLetter && (
                      <button
                        onClick={() => setSelectedLetter('')}
                        className="px-3 py-1 text-sm bg-emerald-500/10 text-emerald-400 rounded-full
                               hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
                      >
                        Huruf: {selectedLetter}
                        <HiX className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={resetFilters}
                      className="text-sm text-gray-500 hover:text-emerald-400 transition-colors ml-auto"
                    >
                      Reset All
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 mx-auto lg:mx-0">
                  {/* Glossary Terms */}
                  <div className="space-y-4" data-fade="5">
                    {filteredTerms.map((item) => (
                      <div key={item.term} className="group ">
                        <button
                          onClick={() =>
                            setExpandedTerm(
                              expandedTerm === item.term ? null : item.term
                            )
                          }
                          className="w-full flex items-center justify-between p-4 border border-gray-900
                                  rounded-lg transition-colors text-left"
                        >
                          <div className="space-y-1 pr-4">
                            <h3 className="text-base font-semibold tracking-wide text-gray-200 group-hover:text-emerald-400 transition-colors">
                              {item.term}
                            </h3>
                            <p
                              className={clsx(
                                'text-sm paragraph-text transition-all duration-200',
                                expandedTerm === item.term ? '' : 'line-clamp-2'
                              )}
                            >
                              {item.definition}
                            </p>
                            {expandedTerm === item.term && (
                              <div className="space-y-4 mt-3 pt-3 border-t border-gray-800">
                                <div className="bg-transparent border border-transparent p-4">
                                  <h4 className="text-sm text-neutral-500 mb-2">
                                    example
                                  </h4>
                                  <p className="text-sm text-neutral-400 leading-relaxed">
                                    {item.example}
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {item.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 text-xs font-sans tracking-wide bg-transparent font-medium text-neutral-500 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <HiChevronRight
                            className={clsx(
                              'flex-shrink-0 w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-transform duration-200',
                              expandedTerm === item.term && 'rotate-90'
                            )}
                          />
                        </button>
                      </div>
                    ))}

                    {/* Empty State */}
                    {filteredTerms.length === 0 && (
                      <div className="text-center py-12 transition-opacity duration-200">
                        <p className="">
                          <Accent>No results found</Accent>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Sidebar Filter */}
                <div
                  className="hidden lg:block lg:w-72 lg:flex-shrink-0"
                  data-fade="6"
                >
                  <div className="sticky top-24 border border-[#2323219b] rounded-lg p-6 space-y-6">
                    {/* Alphabet Filter */}
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-gray-200">
                        Filter Huruf
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {alphabet.map((letter) => (
                          <button
                            key={letter}
                            onClick={() =>
                              setSelectedLetter(
                                selectedLetter === letter ? '' : letter
                              )
                            }
                            className={clsx(
                              'w-8 h-8 rounded-full flex items-center justify-center text-xs text-[#525252]transition-colors',
                              selectedLetter === letter
                                ? 'bg-emerald-500/10 text-[#525252] border border-emerald-500/20'
                                : 'text-[#525252] hover:text-emerald-400 hover:bg-emerald-500/5'
                            )}
                          >
                            {letter}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tags Filter */}
                    <div className="space-y-3 pt-4 border-t border-gray-800">
                      <div className="text-sm font-semibold text-gray-200">
                        Filter Kategori
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {uniqueTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagSelect(tag)}
                            className={clsx(
                              'px-1.5 py-1 text-xs paragraph-text rounded-lg transition-colors',
                              selectedTags.includes(tag)
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'text-[#525252] hover:text-emerald-400 hover:border-emerald-500/20'
                            )}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
