import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

type GlossaryItem = {
  term: string;
  definition: string;
  category?: string;
};

interface GlossaryPreviewProps {
  items: GlossaryItem[];
}

const GlossaryPreview = ({ items = [] }: GlossaryPreviewProps) => {
  // Fallback items jika tidak ada data
  const previewItems =
    items.length > 0
      ? items.slice(0, 4)
      : [
          {
            term: 'Blockchain',
            definition:
              'A digital ledger of transactions that is duplicated and distributed across a network of computer systems.',
          },
          {
            term: 'Smart Contract',
            definition:
              'Self-executing contracts where the terms are directly written into code.',
          },
          {
            term: 'Capital Market',
            definition:
              'A market where buyers and sellers engage in trade of financial securities.',
          },
          {
            term: 'M&A',
            definition:
              'Mergers and acquisitions referring to consolidation of companies or assets.',
          },
        ];

  return (
    <section className="py-16 w-full">
      <div className="relative z-10">
        {/* Decorative elements */}
        <div className="absolute -right-12 -top-20 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl -z-10 hidden md:block"></div>
        <div className="absolute right-0 top-0 w-32 h-32 rounded-full border border-emerald-500/10 -z-10 hidden md:block"></div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.75 2.75V4.5h1.975c.351 0 .694.106.984.303l1.697 1.154c.041.028.09.043.14.043h4.102a.75.75 0 0 1 0 1.5H20.07l3.366 7.68a.749.749 0 0 1-.23.896c-.1.074-.203.143-.31.206a6.296 6.296 0 0 1-.79.399 7.349 7.349 0 0 1-2.856.569 7.343 7.343 0 0 1-2.855-.568 6.205 6.205 0 0 1-.79-.4 3.205 3.205 0 0 1-.307-.202l-.005-.004a.749.749 0 0 1-.23-.896l3.368-7.68h-.886c-.351 0-.694-.106-.984-.303l-1.697-1.154a.246.246 0 0 0-.14-.043H12.75v14.5h4.487a.75.75 0 0 1 0 1.5H6.763a.75.75 0 0 1 0-1.5h4.487V6H9.275a.249.249 0 0 0-.14.043L7.439 7.197c-.29.197-.633.303-.984.303h-.886l3.368 7.68a.75.75 0 0 1-.209.878c-.08.065-.16.126-.31.223a6.077 6.077 0 0 1-.792.433 6.924 6.924 0 0 1-2.876.62 6.913 6.913 0 0 1-2.876-.62 6.077 6.077 0 0 1-.792-.433 3.483 3.483 0 0 1-.309-.221.762.762 0 0 1-.21-.88L3.93 7.5H2.353a.75.75 0 0 1 0-1.5h4.102c.05 0 .099-.015.141-.043l1.695-1.154c.29-.198.634-.303.985-.303h1.974V2.75a.75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              <h2
                className="text-2xl md:text-3xl font-semibold text-white/90"
                data-fade="1"
              >
                Legal Glossary
              </h2>
            </div>
            <div
              className="h-px max-w-[120px] w-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-transparent ml-11"
              data-fade="2"
            />
            <p
              className="text-neutral-400 text-sm md:text-base ml-11"
              data-fade="3"
            >
              Key terms and definitions in law and technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-fade="4">
            {previewItems.map((item, _index) => (
              <div
                key={item.term}
                className="group relative p-5 border border-neutral-800 hover:border-emerald-600/30 bg-neutral-900/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] overflow-hidden"
              >
                {/* Gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col gap-3">
                  <h3 className="text-lg font-medium text-white group-hover:text-emerald-300 transition-colors duration-300">
                    {item.term}
                    {item.category && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400">
                        {item.category}
                      </span>
                    )}
                  </h3>
                  <div className="w-16 h-px bg-gradient-to-r from-emerald-500/40 to-transparent"></div>
                  <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                    {item.definition}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 self-end" data-fade="5">
            <Link
              href="/glossary"
              className="group inline-flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-lg text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300"
            >
              <span>View all terms</span>
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <FiArrowRight className="h-3 w-3" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlossaryPreview;
