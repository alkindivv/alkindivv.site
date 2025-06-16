'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  HiSearch,
  HiChevronRight,
  HiX,
  HiFilter,
  HiScale,
  HiDocumentText,
} from 'react-icons/hi';
import clsx from 'clsx';
import Image from 'next/image';
import Accent from '@/components/shared/Accent';
import Link from 'next/link';
import GlowingButton from '@/components/shared/GlowingButton';
import Breadcrumb from '@/components/shared/Breadcrumb';

// Data istilah hukum
const legalTerms = [
  // PERSEROAN TERBATAS
  {
    term: 'Perseroan Terbatas (PT)',
    definition:
      'Badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian antar 2 orang atau lebih dan melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham, dan saham-saham tersebut hanya dimiliki oleh orang-orang tertentu atau terdekat saja seperti saudara atau keluarga',
    tags: ['Hukum Perusahaan', 'Badan Hukum', 'Toha'],
  },
  {
    term: 'Perseroan Terbuka (Tbk)',
    definition:
      'Badan Hukum yang  sudah melakukan IPO sehingga sahamnya dapat dibeli dan dimilikioleh publik',
    tags: ['Hukum Perusahaan', 'Badan Hukum'],
  },

  {
    term: 'Badan Usaha Milik Negara (BUMN) ',
    definition:
      'adalah suatu perusahaan yang sebagaian besar sahamnya atau seluruhnya dimiliki oleh Negara, dan segala keuntungan dianggap sebagai pendapatan Negara, begitupun dengan kerugiannya yang dianggap sebagai kerugian Negara',
    tags: ['Hukum Perusahaan', 'Badan Hukum'],
  },

  {
    term: 'Perusahaan Jawatan (Perjan)',
    definition:
      'adalah Perusahaan Badan Usaha Milik Negara (BUMN) yang bergerak dibidang penyediaan jasa masyarakat dan tujuan kegiatan usahanya tidak mengutamakan keuntungan',
    tags: ['Hukum Perusahaan', 'Badan Hukum'],
  },

  {
    term: 'Perusahaan Umum (Perum)',
    definition:
      'adalah Perusahaan Badan Usaha Milik Negara (BUMN) yang bergerak di bidang palayanan bagi kemanfaatan masyarakat umum',
    tags: ['Hukum Perusahaan', 'Badan Hukum'],
  },

  {
    term: 'Perusahaan Perseroan (Persero)',
    definition:
      'adalah Perusahaan Badan Usaha Milik Negara (BUMN) yang bergerak disektor swasta dan koperasi dan diutamakan dalam kegiatan usaha untuk mendapatkan keuntungan',
    tags: ['Hukum Perusahaan', 'Badan Hukum'],
  },

  {
    term: 'Rapat Umum Pemegang Saham (RUPS)',
    definition:
      'adalah salah satu organ perusahaan yang mempunyai kekuasaan tertinggi dalam sebuah perusahaan, RUPS terdiri dari RUPS Biasa (Tahunan) dan RUPS luar biasa ',
    tags: ['Hukum Perusahaan', 'Badan Hukum'],
  },

  {
    term: 'Direksi (Director)',
    definition:
      'adalah merupakan organ perusahaan yang memiliki tugas dan wewenang untuk mengatur jalannya perusahaan dan bertindak untuk mewakili perusahaan baik di dalam maupun diluar persidangan',
    tags: ['Hukum Perusahaan'],
  },

  {
    term: 'Komisaris',
    definition:
      'adalah organ perusahaan yang bertugas untuk mengawasi direksi perusahaan dalam menjalankan tugasnya, dan bertanggung jawab kapada Rapat Umum Pemegang Saham (RUPS)',
    tags: ['Hukum Perusahaan'],
  },

  // MERGER & AKUSISI

  {
    term: 'Merger (Penggabungan)',
    definition:
      'Perbuatan hukum yang dilakukan oleh satu perseroan atau lebih untuk menggabungkan diri dengan perseroan lain yang telah ada dan selanjutnya perseroan yang menggabungkan diri menjadi bubar.',
    example:
      'Merger antara Gojek dan Tokopedia pada tahun 2021 membentuk GoTo Group. Dalam proses ini, kedua perusahaan menggabungkan operasional, aset, dan struktur organisasi mereka menjadi satu entitas baru.',
    tags: ['Merger & Akuisisi', 'Restrukturisasi'],
  },

  {
    term: 'Akuisisi (Pengambilalihan)',
    definition:
      'yaitu merupakan suatu strategi bisnis untuk mengambil alih kontrol terhadap suatu PT yaitu dengan cara mengakuisisi saham ataupun aset dari PT sebuah PT, dalam proses Akuisis PT yang saham atau asetnya diakuisisi akan tetap exist dan menjalankan kegiatan usahanya sama seperti sebelumnya, yang berubah hanya kontrol atas PT tersebut',
    tags: ['Hukum Perusahaan', 'M&A'],
    example:
      'PT A memgakuisisi saham PT B sebesar 60% sehingga mengakibatkan berpindahnya kontrol terhadap PT B tersebut kepada PT A',
  },

  {
    term: 'Konsilidasi (Peleburan)',
    definition:
      'pada prinsipnya secara definsi hampir sama dengan Merger (Penggabungan) namun dalam hal ini Konsilidasi adalah bergabungnya 2 (dua) atau lebih aktiva dan pasiva perusahaan dan kemudian menciptakan suatu entitas/perusahaan baru, dan setelahnya dua perusahaan atau lebih yang menggabungkan diri tersebut dianggap bubar demi hukum baik dengan atau tanpa likuidasi ',
    tags: ['Hukum Perusahaan', 'M&A'],
    example:
      'PT A dan PT B bergabung sehingga membentuk PT baru yaitu PT C, dan kemudian PT A dan B menjadi bubar',
  },

  {
    term: 'Spin-off (Pemisahan)',
    definition:
      'suatu perbuatan hukum yang dilakukan oleh PT untuk memisahkan usahanya yang mengakibatkan seluruh atau sebagian aktiva dan pasivanya beralih ke 2 (dua) atau lebih PT, jika seluruh aktiva dan pasiva tersebut beralih ke 2 PT atau lebih maka perusahaan yang melakukan spin-off tersebut akan bubar, namun jika hanya sebagian aktiva dan pasiva yang beralhi ke 2 atau lebih PT maka perusahaan yang melakukan spin-off tersebut akan tetap eksis.',
    tags: ['Hukum Perusahaan', 'M&A', 'Restrukturisasi'],
    example: '',
  },

  {
    term: 'Laverage Buyouts (LBO) ',
    definition:
      'LBO merupakan salah satu variasi dari akuisisi yaitu dengan cara membeli suatu perusahaan yang kemudian perusahaan tersebut diperbaiki secara keseluruhan baik dari struktur organisasi, kegiatan usaha dll. dan kemudian setelah perusahaan itu diperbaiki/dipermak maka selanjutnya perusahaan tersebut kepada pihak ketiga. kegiatan LBO ini sering disebut sebagai pancaplokan perusahaan (Corporade Raiders)',
    tags: ['Hukum Perusahaan', 'M&A'],
    example:
      'PT A membeli PT B yang sedang mengalami berbagai masalah dan kemudian seluruh permasalahan tersebut diperbaiki oleh PT A, setelah dirasa cukup dan sudah tidak memiliki masalah maka selanjutnya PT A menjual PT B tersebut kepada pihak ke-3',
  },
  {
    term: 'Management Buyouts (MBO) ',
    definition:
      'MBO ini secara prinsip segala prosesnya sama dengan LBO, yang membedakan adalah dalam MBO yang melakukan pembelian terhadap PT yang bermasalah tersebut adalah pihak management dari PT itu sendiri baik PT yang sedang ia pimpin ataupun PT dalam 1 grup dengan PT yang dipimpinnya',
    tags: ['Hukum Perusahaan', 'M&A'],
  },

  {
    term: 'Monopoli',
    definition:
      'Penguasaan atas produksi atau pemasaran barang atau pengguaan jasa tertentu yang hanya dilakukan oleh 1 (satu) pelaku usaha atau 1 (satu) kelompok pelaku usaha, sehingga menimbulkan suatu persaingan usaha yang tidak sehat dan merugikan kepentingan umum akibat adanya pemusatan ekonomi yang dikuasai hanya oleh 1 (satu) pelaku usaha atau 1 (satu) kelompok pelaku usaha.',
    tags: ['Hukum Perusahaan'],
  },

  {
    term: 'Antitrust (Persaingan curang)',
    definition:
      'Persaingan antar pelaku usaha dalam menjalankan kegiatan produksi atau pemeasaran barang atau jasa uang dilakukan dengan cara-cara yang tidak jujur dan melawan hukum.',
    tags: ['Hukum Perusahaan'],
  },

  // HUKUM KEPAILITAN

  {
    term: 'Kepailitan',
    definition:
      'Suatu keadaan di mana debitor tidak mampu untuk melakukan pembayaran terhadap utang-utang dari para kreditornya.',
    example:
      'Kasus kepailitan PT Asuransi Jiwasraya pada tahun 2020, dimana perusahaan tidak mampu membayar klaim nasabah senilai triliunan rupiah, menyebabkan pengadilan menyatakan perusahaan pailit dan menunjuk kurator untuk mengelola aset-asetnya.',
    tags: ['Hukum Kepailitan', 'Utang Piutang'],
  },

  {
    term: 'Kurator (receiver)',
    definition:
      'Pengurus yang ditunjuk oleh Pengadilan Niaga untuk mengurus dan membereskan harta debitor yang telah dinyatakan pailit oleh Pengadilan Niaga.',
    tags: ['Hukum Kepailitan'],
  },
  {
    term: 'Kurator Sementara (interim receiver)',
    definition:
      'adalah pengurus sementara yang diangkat sebelum debitur dinyatakan pailit (tidak wajib), yang bertujuan untuk mengurus seluruh aset dan harta perusahaan yang akan pailit sehingga tidak disalahgunakan oleh debitur, dan setelah perusahaan dinyatakan pailit oleh pengadilan niaga maka kurator sementara ini akan digantikan olek kurator tetap',
    tags: ['Hukum Kepailitan'],
  },

  // DOKUMEN ATAU SURAT HUKUM
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

  // PASAR MODAL
  {
    term: 'Initial Public Offering (IPO)',
    definition:
      'Penawaran saham suatu perusahaan kepada publik untuk pertama kalinya di pasar modal .',
    tags: ['Pasar Modal', 'Saham'],
  },

  {
    term: 'Emitem',
    definition:
      'merupakan perusahaan terbuka (PT tbk) yang sahamnya dapat diperjualbelikan oleh publik/masyarakat melalui pasar modal',
    tags: ['Pasar Modal', 'Saham'],
    example: '',
  },

  {
    term: 'Legal Due Diligence (LDD)',
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

  // {
  //   term: '',
  //   definition: '',
  //   tags: [''],
  //   example: '',
  // },
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

export default function GlossaryClient() {
  const breadcrumbItems = [{ label: 'Glossary' }];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  // Refs for alphabet navigation
  const alphabetNavRef = useRef<HTMLDivElement | null>(null);
  const [isNavSticky, setIsNavSticky] = useState(false);

  // Effect untuk mengatur sticky nav
  useEffect(() => {
    const handleScroll = () => {
      if (alphabetNavRef.current) {
        const { top } = alphabetNavRef.current.getBoundingClientRect();
        setIsNavSticky(top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function untuk memeriksa apakah ada istilah untuk huruf tertentu
  const hasTermsForLetter = (letter: string, terms: typeof legalTerms) => {
    if (letter === '#') {
      return terms.some((term) => /^[^A-Za-z]/.test(term.term.charAt(0)));
    }

    return terms.some((term) => term.term.charAt(0).toUpperCase() === letter);
  };

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

  // Memoized terms grouped by letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof legalTerms> = {};

    filteredTerms.forEach((term) => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });

    // Sort by letter
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredTerms]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLetter('');
    setSelectedTags([]);
    setExpandedTerm(null);
  };

  return (
    <>
      <div
        className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950"
        style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="h-[300px] w-[450px] rounded-full bg-gradient-to-r from-[#2E996C]/70 to-[#0F3324]/10 blur-[150px] absolute top-0 -translate-y-full rotate-45 origin-left z-[-2] left-[15%]"
        />
        <Image
          alt=""
          width={1280}
          height={825}
          className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
          src="/images/textures/crumpled-3.jpg"
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

        {/* Legal document corner decorations */}
        <div className="absolute top-24 left-24 opacity-15">
          <div className="w-40 h-40 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-md"></div>
        </div>
        <div className="absolute bottom-24 right-24 opacity-15">
          <div className="w-40 h-40 border-b-2 border-r-2 border-emerald-500/40 rounded-br-md"></div>
        </div>
      </div>

      {/* Content */}
      <main className="min-h-screen pt-40 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header - Matching Blog Style */}
          <div className="mb-12 max-w-4xl mx-auto" data-fade="1">
            {/* <div className="flex items-center space-x-2 mb-2 justify-center">
              <HiScale className="text-emerald-400 w-5 h-5" />
              <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
                Legal References
              </h2>
            </div> */}
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="gradient-text">Legal Glossary </span>Dictionary
            </h3>
            <p className="text-neutral-400 leading-relaxed text-center">
              A glossary of legal terms related to technology law, corporate and
              commercial transactions, with explanations in Indonesian language.
            </p>
            {/* Document Number Line */}
            {/* <div className="flex items-center my-8">
              <div className="h-px flex-grow bg-neutral-800/50"></div>
              <div className="px-4 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 rounded-sm bg-emerald-900/10">
                TERMS
              </div>
              <div className="h-px flex-grow bg-neutral-800/50"></div>
            </div> */}
            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>

          {/* <div
            className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-10 mt-5"
            data-fade="2"
          /> */}

          <div className=" mb-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Main Content with Sidebar Layout */}
          <div className="relative mt-12">
            {/* Search and Filters */}
            <div className="mb-8">
              {/* Search Bar - Matching Blog Style */}
              <div className="mb-8" data-fade="3">
                <div className="relative">
                  <div className="relative group h-full border border-neutral-800/70 rounded-md overflow-hidden hover:border-emerald-500/30 transition-all duration-300 bg-neutral-900/20">
                    {/* Legal document styling */}

                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

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

              {/* Mobile Filters button styled as legal tabs */}
              <div
                className="lg:hidden mb-4 flex justify-between items-center border-t border-b border-neutral-800/50 py-2 px-2"
                data-fade="4"
              >
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-neutral-400 whitespace-nowrap">
                    Filters:
                  </span>
                  <HiFilter className="w-4 h-4 text-emerald-400" />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3 py-1 text-xs font-medium rounded-sm text-neutral-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20 transition-colors whitespace-nowrap flex items-center gap-2"
                >
                  <span>Show Filters</span>
                  {selectedTags.length > 0 && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">
                      {selectedTags.length}
                    </span>
                  )}
                </button>

                {(selectedTags.length > 0 || selectedLetter || searchTerm) && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-emerald-500 hover:text-emerald-400"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Mobile Filters */}
              <div
                className={clsx(
                  'lg:hidden space-y-6 mb-8 overflow-hidden transition-all duration-300',
                  showFilters
                    ? 'max-h-[500px] opacity-100'
                    : 'max-h-0 opacity-0'
                )}
                data-fade="5"
              >
                {/* Alphabet Filter */}
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-gray-200">
                    Filter Huruf
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {alphabet.map((letter) => {
                      const hasTerms = hasTermsForLetter(letter, filteredTerms);
                      return (
                        <button
                          key={letter}
                          onClick={() => {
                            if (hasTerms) {
                              // Hanya toggle letter selection tanpa scroll
                              setSelectedLetter(
                                selectedLetter === letter ? '' : letter
                              );

                              // Toggle off menunjukkan mobile filters
                              setShowFilters(false);
                            }
                          }}
                          disabled={!hasTerms}
                          className={clsx(
                            'w-8 h-8 rounded-sm flex items-center justify-center text-xs transition-colors',
                            selectedLetter === letter
                              ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
                              : hasTerms
                                ? 'text-neutral-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20'
                                : 'opacity-30 cursor-not-allowed'
                          )}
                        >
                          {letter}
                        </button>
                      );
                    })}
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
                          'px-3 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap',
                          selectedTags.includes(tag)
                            ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
                            : 'text-neutral-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20'
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters - Styled as tags */}
              {(selectedTags.length > 0 || selectedLetter || searchTerm) && (
                <div
                  className="flex flex-wrap gap-2 items-center mb-8 border-t border-b border-neutral-800/50 py-2 px-2"
                  data-fade="6"
                >
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-neutral-400 whitespace-nowrap">
                      Active:
                    </span>
                    <HiDocumentText className="w-4 h-4 text-emerald-400" />
                  </div>
                  {selectedTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      className="px-3 py-1 text-xs font-medium rounded-sm bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/40 transition-colors flex items-center gap-1"
                    >
                      {tag}
                      <HiX className="w-3 h-3" />
                    </button>
                  ))}
                  {selectedLetter && (
                    <button
                      onClick={() => setSelectedLetter('')}
                      className="px-3 py-1 text-xs font-medium rounded-sm bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/40 transition-colors flex items-center gap-1"
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

              {/* Alphabet navigation - styled as legal tabs */}
              <div
                ref={alphabetNavRef}
                className="mb-8 hidden md:block"
                data-fade="7"
              >
                <div
                  className={clsx(
                    'flex flex-wrap justify-center gap-1 py-2 bg-[#0a0a0a] rounded-lg transition-all duration-300 z-20 border-t border-b border-neutral-800/50',
                    isNavSticky ? 'sticky top-16 shadow-lg' : ''
                  )}
                >
                  {alphabet.map((letter) => {
                    const hasTerms = hasTermsForLetter(letter, filteredTerms);
                    return (
                      <button
                        key={letter}
                        onClick={() => {
                          if (hasTerms) {
                            // Hanya toggle letter selection tanpa scroll
                            setSelectedLetter(
                              selectedLetter === letter ? '' : letter
                            );
                          }
                        }}
                        disabled={!hasTerms}
                        className={clsx(
                          'w-8 h-8 flex items-center justify-center rounded-sm transition-colors',
                          !hasTerms ? 'opacity-30 cursor-not-allowed' : '',
                          selectedLetter === letter
                            ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
                            : hasTerms
                              ? 'text-neutral-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20'
                              : ''
                        )}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 mx-auto lg:mx-0" data-fade="8">
                {filteredTerms.length > 0 ? (
                  <div className="space-y-10 relative">
                    {/* Legal document styling */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                    {/* <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-emerald-500/30"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-emerald-500/30"></div> */}

                    {groupedTerms.map(([letter, terms]) => (
                      <div key={letter} className="scroll-mt-32" data-fade="9">
                        <div className="flex items-center gap-3 mb-4">
                          <h2 className="text-3xl font-bold">
                            <span className="gradient-text">{letter}</span>
                          </h2>
                          <div className="h-px flex-grow bg-gradient-to-r from-emerald-500/30 to-transparent"></div>
                        </div>

                        <div className="space-y-4">
                          {terms.map((item) => (
                            <div
                              key={item.term}
                              className="group transition-all duration-200"
                              data-fade="10"
                            >
                              <button
                                onClick={() =>
                                  setExpandedTerm(
                                    expandedTerm === item.term
                                      ? null
                                      : item.term
                                  )
                                }
                                className={clsx(
                                  'w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 text-left',
                                  expandedTerm === item.term
                                    ? 'border border-emerald-800/30'
                                    : 'bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#232323]'
                                )}
                              >
                                <div className="space-y-1 pr-4">
                                  <h3
                                    className={clsx(
                                      'text-base font-semibold tracking-wide transition-colors',
                                      expandedTerm === item.term
                                        ? 'gradient-text'
                                        : 'text-gray-200 group-hover:text-emerald-400'
                                    )}
                                  >
                                    {item.term}
                                  </h3>
                                  <p
                                    className={clsx(
                                      'text-sm paragraph-text transition-all duration-200',
                                      expandedTerm === item.term
                                        ? ''
                                        : 'line-clamp-2'
                                    )}
                                  >
                                    {item.definition}
                                  </p>
                                  {expandedTerm === item.term && (
                                    <div className="space-y-4 mt-3 pt-3 border-t border-emerald-900/30">
                                      {item.example && (
                                        <div className="rounded-lg p-4 border border-emerald-900/20 relative">
                                          {/* Corner decorations - legal document style */}
                                          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/30"></div>
                                          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/30"></div>
                                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500/30"></div>
                                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500/30"></div>

                                          <h4 className="text-sm font-medium text-emerald-400 mb-2">
                                            Example:
                                          </h4>
                                          <p className="text-sm text-neutral-400 leading-relaxed">
                                            {item.example}
                                          </p>
                                        </div>
                                      )}
                                      <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag) => (
                                          <span
                                            key={tag}
                                            className="px-2 py-1 text-xs font-medium text-neutral-400 border border-neutral-800 rounded-full
                                              hover:border-emerald-500/30 hover:text-emerald-400 cursor-pointer transition-colors"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (!selectedTags.includes(tag)) {
                                                handleTagSelect(tag);
                                              }
                                            }}
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
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="text-center py-12 relative border border-neutral-800/70 rounded-lg overflow-hidden bg-neutral-900/5"
                    data-fade="11"
                  >
                    {/* Legal document styling */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-emerald-500/30"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-emerald-500/30"></div>

                    <p className="text-xl mb-3">
                      <Accent>No results found</Accent>
                    </p>
                    <p className="text-neutral-400 mb-6">
                      Try adjusting your filters or search query
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-sm border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
                    >
                      Reset Filters
                    </button>

                    {/* Document footer */}
                    <div className="mt-8 text-center text-[10px] text-neutral-500 font-mono">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="h-px w-12 bg-neutral-800"></div>
                        <HiScale className="w-4 h-4 text-emerald-500/40" />
                        <div className="h-px w-12 bg-neutral-800"></div>
                      </div>
                      GLOSSARY ID: GLO-{new Date().getFullYear()}
                    </div>
                  </div>
                )}

                {/* Document footer */}
                <div className="mt-12 text-end text-[10px] text-neutral-500 font-mono">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {/* <div className="h-px w-12 bg-neutral-800"></div>
                    <HiScale className="w-4 h-4 text-emerald-500/40" />
                    <div className="h-px w-12 bg-neutral-800"></div> */}
                  </div>
                  ID: GLOSSARY-{new Date().getFullYear()}
                </div>
                <div
                  className="mt-16 text-center opacity-0 transition-opacity duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: '1200ms',
                  }}
                >
                  <p className="text-xs md:text-sm text-neutral-500 max-w-xl font-light italic mx-auto mb-6">
                    This glossary is continuously updated with new legal terms
                    and definitions. Check back regularly for the latest
                    additions.
                  </p>
                  <Link href="/contact">
                    <GlowingButton
                      variant="small"
                      className="text-xs md:text-sm"
                    >
                      <span className="flex items-center gap-2">
                        Suggest a Term
                      </span>
                    </GlowingButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
