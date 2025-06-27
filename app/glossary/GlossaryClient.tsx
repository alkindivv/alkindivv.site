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
import { FaTags } from 'react-icons/fa';
import clsx from 'clsx';
import Image from 'next/image';
import Accent from '@/components/shared/Accent';
import Link from 'next/link';
import GlowingButton from '@/components/shared/GlowingButton';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { GlossaryTerm } from '@/types/glossary';
import { slugify } from '@/lib/utils/slug';
import { useRouter, usePathname } from 'next/navigation';

// Generate alphabet array A-Z plus #
const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);
alphabet.push('#');

// Helper scroll to anchor hanya jika di luar viewport
function scrollToHashIfNeeded(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const rect = el.getBoundingClientRect();
    // Hanya scroll jika elemen berada di luar viewport
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

export default function GlossaryClient({ terms }: { terms: GlossaryTerm[] }) {
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
  const router = useRouter();
  const pathname = usePathname();

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

  // Effect untuk mengatur expanded term dari hash URL
  useEffect(() => {
    // Check if URL has hash
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Find term that matches hash
        const matchingTerm = terms.find((term) => slugify(term.term) === hash);
        if (matchingTerm) {
          setExpandedTerm(matchingTerm.term);
          // Delay scroll to ensure component is rendered
          setTimeout(() => scrollToHashIfNeeded(hash), 300);
        }
      }
    }
  }, [terms]);

  // Helper function untuk memeriksa apakah ada istilah untuk huruf tertentu
  const hasTermsForLetter = (letter: string, list: GlossaryTerm[]) => {
    if (letter === '#') {
      return list.some((term) => /^[^A-Za-z]/.test(term.term.charAt(0)));
    }

    return list.some((term) => term.term.charAt(0).toUpperCase() === letter);
  };

  // Unique tags dari data
  const uniqueTags = useMemo(
    () =>
      Array.from(new Set(terms.flatMap((t) => t.tags))).sort((a, b) =>
        a.localeCompare(b, 'id')
      ),
    [terms]
  );

  // Memoized filtered terms
  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
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
  }, [searchTerm, selectedLetter, selectedTags, terms]);

  // Memoized terms grouped by letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};

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

  // Handle expand/collapse term dengan URL hash
  const handleTermClick = (term: GlossaryTerm) => {
    const slug = slugify(term.term);

    if (expandedTerm === term.term) {
      setExpandedTerm(null);
      // Gunakan replace untuk menghindari scroll ke atas
      router.replace(pathname, { scroll: false });
    } else {
      setExpandedTerm(term.term);
      // Update URL dengan hash tanpa scroll
      router.replace(`${pathname}#${slug}`, { scroll: false });
      // Scroll ke elemen hanya jika perlu
      setTimeout(() => scrollToHashIfNeeded(slug), 100);
    }
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
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="gradient-text">Legal </span>Glossary
            </h3>
            <p className="text-neutral-400 leading-relaxed text-center">
              A glossary of legal terms related to law & cryptocurrency.
            </p>

            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>

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

                    {/* <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div> */}

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
                        className="mt-2 text-xs md:text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
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
                    {selectedTags.map((tag) => (
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
                    {/* <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div> */}

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
                            <button
                              key={item.term}
                              onClick={() => handleTermClick(item)}
                              aria-expanded={expandedTerm === item.term}
                              aria-controls={slugify(item.term)}
                              className={clsx(
                                'w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 text-left',
                                expandedTerm === item.term ? '' : ''
                              )}
                            >
                              <div className="space-y-1 pr-4">
                                <h3
                                  className={clsx(
                                    'text-lg md:text-xl font-semibold tracking-wide transition-colors  underline underline-offset-2 decoration-[#4e4e4e] decoration-2 hover:decoration-white',
                                    expandedTerm === item.term
                                      ? 'inline-block underline-offset-2 decoration-white decoration-2'
                                      : 'text-gray-200'
                                  )}
                                >
                                  {item.term}
                                </h3>
                                <p
                                  id={slugify(item.term)}
                                  className={clsx(
                                    'glossary-text transition-all duration-200',
                                    expandedTerm === item.term
                                      ? ''
                                      : 'line-clamp-3'
                                  )}
                                >
                                  {item.definition}
                                </p>
                                {expandedTerm === item.term && (
                                  <div className="space-y-4 mt-3 pt-3 border-t border-emerald-900/30">
                                    {item.example && (
                                      <div className="rounded-lg p-4 border border-emerald-900/20 relative">
                                        {/* Corner decorations - legal document style */}

                                        <h4 className="text-sm font-medium text-neutral-50 mb-2">
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
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="text-center py-12 relative overflow-hidden"
                    data-fade="11"
                  >
                    <p className="gradient-text text-2xl md:text-3xl font-bold mb-3">
                      No results found
                    </p>
                    <p className="text-neutral-400 mb-6 text-xs md:text-base">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                )}

                {/* Document footer */}

                <div
                  className="mt-16 text-center opacity-0 transition-opacity duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: '1200ms',
                  }}
                >
                  <p className="text-xs md:text-sm text-neutral-500 max-w-xl font-light italic mx-auto mb-6">
                    This glossary is continuously updated. Check back regularly
                    for the latest additions.
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
