import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import { HiSearch, HiChevronRight, HiX } from 'react-icons/hi';
import clsx from 'clsx';
import Image from 'next/image';
import Accent from '@/components/shared/Accent';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

interface LegalTerm {
  term: string;
  definition: string;
  tags: string[];
  example?: string;
}

const GlossaryPage = () => {
  const { t } = useTranslation('common');

  const legalTerms = useMemo<LegalTerm[]>(
    () =>
      [
        {
          term: 'pt',
          definition: t('glossary.content.terms.pt.definition'),
          tags: ['corporate_law', 'legal_entity'],
        },
        {
          term: 'tbk',
          definition: t('glossary.content.terms.tbk.definition'),
          tags: ['corporate_law', 'legal_entity'],
        },
        {
          term: 'bumn',
          definition: t('glossary.content.terms.bumn.definition'),
          tags: ['corporate_law', 'state_owned'],
        },
        {
          term: 'perjan',
          definition: t('glossary.content.terms.perjan.definition'),
          tags: ['corporate_law', 'state_owned'],
        },
        {
          term: 'perum',
          definition: t('glossary.content.terms.perum.definition'),
          tags: ['corporate_law', 'state_owned'],
        },
        {
          term: 'persero',
          definition: t('glossary.content.terms.persero.definition'),
          tags: ['corporate_law', 'state_owned'],
        },
        {
          term: 'rups',
          definition: t('glossary.content.terms.rups.definition'),
          tags: ['corporate_law'],
        },
        {
          term: 'merger',
          definition: t('glossary.content.terms.merger.definition'),
          example: t('glossary.content.terms.merger.example'),
          tags: ['corporate_law', 'ma', 'restructuring'],
        },
      ].sort((a, b) =>
        t(`glossary.content.terms.${a.term}.title`).localeCompare(
          t(`glossary.content.terms.${b.term}.title`)
        )
      ),
    [t]
  );

  // Generate unique tags from legal terms
  const uniqueTags = useMemo(
    () => Array.from(new Set(legalTerms.flatMap((term) => term.tags))).sort(),
    [legalTerms]
  );

  // Generate alphabet array A-Z plus #
  const alphabet = useMemo(() => {
    const letters = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );
    letters.push('#');
    return letters;
  }, []);

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
  }, [legalTerms, searchTerm, selectedLetter, selectedTags]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLetter('');
    setSelectedTags([]);
  };

  return (
    <Layout title={`${t('glossary.title')} | AL KINDI`} isHomePage={false}>
      <SEO
        templateTitle={t('glossary.title')}
        description={t('glossary.meta.description')}
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
            priority
            width={1280}
            height={825}
            className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
            src="/images/glossary-bg.jpg"
          />
        </div>

        {/* Content */}
        <section className="min-h-screen pt-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mt-14 relative space-y-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold">
                {t('glossary.title')}{' '}
                <span className="gradient-text">{t('glossary.subtitle')}</span>
              </h1>
              <p className="hero-text max-w-2xl mx-auto">
                {t('glossary.description')}
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
                        placeholder={t('glossary.search.placeholder')}
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
                        {t('glossary.search.results', {
                          count: filteredTerms.length,
                        })}
                      </p>
                      {filteredTerms.length > 0 && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="mt-2 text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                        >
                          {t('glossary.content.clearSearch')}
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
                      {t('glossary.filters.letters')}
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
                            'w-8 h-8 rounded-full flex items-center justify-center text-xs text-[#525252] transition-colors',
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
                      {t('glossary.filters.categories')}
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
                      {t('glossary.filters.active')}:
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
                        {t('glossary.filters.letters')}: {selectedLetter}
                        <HiX className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={resetFilters}
                      className="text-sm text-gray-500 hover:text-emerald-400 transition-colors ml-auto"
                    >
                      {t('glossary.filters.reset')}
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
                      <div key={item.term} className="group">
                        <button
                          onClick={() =>
                            setExpandedTerm(
                              expandedTerm === item.term ? null : item.term
                            )
                          }
                          className="w-full flex items-center justify-between p-4 border border-gray-900
                                  rounded-lg transition-colors text-left hover:bg-[#111111] hover:border-emerald-500/20"
                        >
                          <div className="space-y-1 pr-4">
                            <h3 className="text-base font-semibold tracking-wide text-gray-200 group-hover:text-emerald-400 transition-colors">
                              {t(`glossary.content.terms.${item.term}.title`)}
                            </h3>
                            <p
                              className={clsx(
                                'text-sm paragraph-text transition-all duration-200',
                                expandedTerm === item.term ? '' : 'line-clamp-4'
                              )}
                            >
                              {item.definition}
                            </p>
                            {expandedTerm === item.term && item.example && (
                              <div className="space-y-4 mt-3 pt-3 border-t border-gray-800">
                                <div className="bg-transparent border border-transparent p-4">
                                  <h4 className="text-sm text-neutral-500 mb-2">
                                    {t('glossary.content.example')}
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
                                      {t(`glossary.tags.${tag.toLowerCase()}`)}
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
                          <Accent>{t('glossary.content.noResults')}</Accent>
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
                        {t('glossary.filters.letters')}
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
                              'w-8 h-8 rounded-full flex items-center justify-center text-xs text-[#525252] transition-colors',
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
                        {t('glossary.filters.categories')}
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
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['common'])),
    },
  };
};

export default GlossaryPage;
