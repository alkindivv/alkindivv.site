'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import {
  HiSearch,
  HiChevronRight,
  HiBookOpen,
  HiDocumentText,
  HiScale,
  HiLibrary,
} from 'react-icons/hi';
import Accent from '../shared/Accent';
import clsx from 'clsx';
import GlowingButton from '../shared/GlowingButton';

type GlossaryItem = {
  term: string;
  definition: string;
  tags: string[];
  example?: string;
};

interface GlossaryPreviewProps {
  items: GlossaryItem[];
}

const GlossaryPreview = ({ items = [] }: GlossaryPreviewProps) => {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const alphabetLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Observer untuk trigger animasi saat section masuk viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Target section untuk observe
    const section = document.querySelector('.glossary-preview-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Fallback items matching the full glossary style - limited to 4 terms for preview
  const previewItems =
    items.length > 0
      ? items
          .slice(0, 4)
          .map((item) => ({
            ...item,
            tags: item.tags || [], // Ensure tags is always an array
          }))
          .sort((a, b) => a.term.localeCompare(b.term))
      : [
          {
            term: 'Akuisisi (Pengambilalihan)',
            definition:
              'Suatu strategi bisnis untuk mengambil alih kontrol terhadap suatu PT yaitu dengan cara mengakuisisi saham ataupun aset dari PT sebuah PT.',
            tags: ['Hukum Perusahaan', 'M&A'],
            example:
              'PT A mengakuisisi saham PT B sebesar 60% sehingga mengakibatkan berpindahnya kontrol terhadap PT B tersebut kepada PT A',
          },
          {
            term: 'Due Diligence',
            definition:
              'Pemeriksaan aspek hukum perusahaan secara menyeluruh untuk mengidentifikasi potensi risiko hukum.',
            tags: ['Audit', 'Compliance'],
          },
          {
            term: 'Merger (Penggabungan)',
            definition:
              'Perbuatan hukum yang dilakukan oleh satu perseroan atau lebih untuk menggabungkan diri dengan perseroan lain yang telah ada.',
            tags: ['Merger & Akuisisi', 'Restrukturisasi'],
            example:
              'Merger antara Gojek dan Tokopedia pada tahun 2021 membentuk GoTo Group.',
          },
          {
            term: 'Perseroan Terbatas (PT)',
            definition:
              'Badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian antar 2 orang atau lebih dan melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham.',
            tags: ['Hukum Perusahaan', 'Badan Hukum'],
          },
        ].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <section className="w-full py-24 relative overflow-hidden glossary-preview-section">
      {/* Legal themed decorative elements */}
      <div className="absolute inset-0 -z-10">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(16,185,129,0.08) 1px, transparent 1px)',
            backgroundSize: '100% 28px',
            opacity: isVisible ? 0.03 : 0,
            transitionDelay: '300ms',
          }}
        />

        {/* Law book spines - left decoration */}
        <div
          className="absolute left-8 top-1/4 bottom-1/4 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isVisible ? 0.1 : 0, transitionDelay: '400ms' }}
        >
          <div
            className="w-6 h-full flex flex-col gap-1"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: '500ms' }}
          >
            {alphabetLetters.map((letter, index) => (
              <div
                key={letter}
                className="h-14 border-r-2 border-emerald-500/40 relative flex items-center justify-end pr-1 transform origin-right scale-x-0 transition-transform duration-700 ease-out"
                style={{
                  transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                  transitionDelay: `${500 + index * 100}ms`,
                }}
              >
                <span className="text-xs font-mono text-emerald-500/40">
                  {letter}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legal document corner decorations */}
        <div
          className="absolute top-20 left-20 opacity-0 transition-all duration-1500"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transform: isVisible
              ? 'translate(0, 0)'
              : 'translate(-10px, -10px)',
            transitionDelay: '600ms',
          }}
        >
          <div className="w-40 h-40 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-md"></div>
        </div>

        <div
          className="absolute bottom-20 right-20 opacity-0 transition-all duration-1500"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transform: isVisible ? 'translate(0, 0)' : 'translate(10px, 10px)',
            transitionDelay: '700ms',
          }}
        >
          <div className="w-40 h-40 border-b-2 border-r-2 border-emerald-500/40 rounded-br-md"></div>
        </div>

        {/* Legal scale decoration - simplified and animated */}
        <div
          className="absolute top-1/4 right-1/4 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isVisible ? 0.1 : 0, transitionDelay: '800ms' }}
        >
          <div
            className="w-[2px] h-40 bg-emerald-500/40 absolute left-20 top-0 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '900ms',
            }}
          ></div>
          <div
            className="w-40 h-[2px] bg-emerald-500/40 absolute left-0 top-40 transform origin-left scale-x-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '1000ms',
            }}
          ></div>
          <div
            className="w-10 h-10 rounded-full border-2 border-emerald-500/40 absolute left-16 top-36 opacity-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.5)',
              transitionDelay: '1100ms',
            }}
          ></div>
          <div
            className="w-10 h-10 rounded-full border-2 border-emerald-500/40 absolute right-0 top-36 opacity-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.5)',
              transitionDelay: '1200ms',
            }}
          ></div>
        </div>

        {/* Document lines - decorative */}
        <div
          className="absolute top-1/3 left-[5%] opacity-0 transition-opacity duration-1500"
          style={{ opacity: isVisible ? 0.15 : 0, transitionDelay: '900ms' }}
        >
          <div className="w-40 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[2px] w-full bg-emerald-500/40 transform origin-left scale-x-0 transition-transform duration-1000 ease-out"
                style={{
                  transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                  width: `${100 - i * 15}%`,
                  transitionDelay: `${1000 + i * 100}ms`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <div
            className="flex items-center space-x-2 mb-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 700ms ease-out',
              transitionDelay: '400ms',
            }}
          >
            {/* <HiBookOpen className="text-emerald-400 w-5 h-5" />
            <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
              Legal Glossary
            </h2> */}
          </div>
          <h3
            className="text-3xl md:text-5xl font-bold mb-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '500ms',
            }}
          >
            Legal<span className="gradient-text"> Dictionary</span>
          </h3>
          <p
            className="text-neutral-400 leading-relaxed"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '600ms',
            }}
          >
            A glossary of legal terms related to technology law, corporate and
            commercial transactions, with explanations in Indonesian language.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* A-Z Index Bar - Legal Styled */}
          <div
            className="flex items-center justify-between border-t border-b border-neutral-800/50 py-2 px-2 mb-8 overflow-x-auto no-scrollbar"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '700ms',
            }}
          >
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-neutral-400 whitespace-nowrap">
                Filter by:
              </span>
              <HiSearch className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
              {alphabetLetters.map((letter) => (
                <button
                  key={letter}
                  className="w-7 h-7 flex items-center justify-center text-xs font-medium rounded hover:bg-emerald-900/20 text-neutral-400 hover:text-emerald-400 transition-colors"
                >
                  {letter}
                </button>
              ))}
              <div className="pl-1 text-neutral-600">...</div>
            </div>
          </div>

          {/* Glossary Items */}
          <div className="space-y-4 mb-10">
            {previewItems.map((item, index) => (
              <div
                key={item.term}
                className="group transition-all duration-200 opacity-0 transform translate-y-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition:
                    'opacity 700ms ease-out, transform 700ms ease-out',
                  transitionDelay: `${800 + index * 150}ms`,
                }}
              >
                <button
                  onClick={() =>
                    setExpandedTerm(
                      expandedTerm === item.term ? null : item.term
                    )
                  }
                  className={clsx(
                    'w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 text-left',
                    expandedTerm === item.term
                      ? 'border border-emerald-800/20 bg-emerald-900/5'
                      : 'bg-[#080b0e]/60 border border-[#1a1a1a]/40 hover:border-[#232323]'
                  )}
                >
                  <div className="space-y-1 pr-4 flex-1">
                    <h4
                      className={clsx(
                        'text-base font-semibold tracking-wide transition-colors',
                        expandedTerm === item.term
                          ? 'gradient-text'
                          : 'text-gray-200 group-hover:text-emerald-400'
                      )}
                    >
                      {item.term}
                    </h4>
                    <p
                      className={clsx(
                        'text-sm text-neutral-400 transition-all duration-200',
                        expandedTerm === item.term ? '' : 'line-clamp-2'
                      )}
                    >
                      {item.definition}
                    </p>

                    {expandedTerm === item.term && (
                      <div className="space-y-4 mt-3 pt-3 border-t border-emerald-900/20">
                        {item.example && (
                          <div className="rounded-lg p-4 border border-emerald-900/10 bg-[#080b0e]/60">
                            <h5 className="text-sm font-medium text-emerald-400 mb-2 flex items-center">
                              <span className="inline-block w-4 h-4 mr-1 border-t border-l border-emerald-900/40"></span>
                              Case Example:
                            </h5>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                              {item.example}
                            </p>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {(item.tags || []).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs font-medium text-neutral-400 border border-neutral-800/60 rounded-sm
                              hover:border-emerald-500/20 hover:text-emerald-400 cursor-pointer transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={clsx(
                      'w-6 h-6 rounded-full flex items-center justify-center transition-colors',
                      expandedTerm === item.term
                        ? 'bg-emerald-900/20 text-emerald-400'
                        : 'bg-neutral-800/40 text-neutral-400 group-hover:bg-emerald-900/20 group-hover:text-emerald-400'
                    )}
                  >
                    <HiChevronRight
                      className={clsx(
                        'w-4 h-4 transition-transform',
                        expandedTerm === item.term ? 'rotate-90' : ''
                      )}
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* CTA - View Full Glossary */}
          <div
            className="flex justify-center pt-4 opacity-0 transition-opacity duration-700 ease-out"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: '1500ms' }}
          >
            <Link href="/glossary">
              <GlowingButton variant="minimal">
                <span className="flex items-center gap-2">
                  Complete Glossary
                </span>
              </GlowingButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlossaryPreview;
