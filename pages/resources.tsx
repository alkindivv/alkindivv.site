import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import {
  HiTemplate,
  HiDocumentText,
  HiBookOpen,
  HiDownload,
  HiExternalLink,
  HiLibrary,
  HiScale,
  HiOutlineDocumentSearch,
} from 'react-icons/hi';
import PowerfulSEO from '@/components/shared/PowerfulSEO';
import Link from 'next/link';

// Simplified resource type - unified structure for all resources
type Resource = {
  title: string;
  description: string;
  type: 'document' | 'book' | 'form' | 'link';
  icon: React.ReactNode;
  meta: string; // format/size for documents, provider for courses, etc.
  action: {
    label: string;
    url: string;
  };
};

// Unified resources list
const resources: Resource[] = [
  // Documents
  {
    title: 'Lawsuit Petition',
    description: 'Template for filing a lawsuit in Indonesia',
    type: 'document',
    icon: <HiDocumentText className="w-5 h-5" />,
    meta: 'DOCX',
    action: {
      label: 'Download',
      url: '/resources/documents/somasi.docx',
    },
  },
  {
    title: 'Shareholders Agreement (SHA)',
    description: 'Comprehensive template for regulating shareholder relations',
    type: 'document',
    icon: <HiDocumentText className="w-5 h-5" />,
    meta: 'DOCX • 180 KB',
    action: {
      label: 'Download',
      url: '/resources/documents/example-document.txt',
    },
  },
  {
    title: 'Service Agreement',
    description: 'Standard template for service provision contracts',
    type: 'document',
    icon: <HiDocumentText className="w-5 h-5" />,
    meta: 'DOCX • 156 KB',
    action: {
      label: 'Download',
      url: '/resources/documents/service-agreement.docx',
    },
  },
  {
    title: 'NDA Template',
    description: 'Professional non-disclosure agreement for business use',
    type: 'document',
    icon: <HiDocumentText className="w-5 h-5" />,
    meta: 'DOCX • 120 KB',
    action: {
      label: 'Download',
      url: '/resources/documents/nda-template.docx',
    },
  },

  // Forms
  {
    title: 'Annual Report Form',
    description: 'Standard form for annual corporate reporting',
    type: 'form',
    icon: <HiDocumentText className="w-5 h-5" />,
    meta: 'DOCX • 180 KB',
    action: {
      label: 'Download',
      url: '/resources/forms/annual-report-form.docx',
    },
  },
  {
    title: 'Board Resolution Form',
    description: 'Template for documenting board decisions',
    type: 'form',
    icon: <HiDocumentText className="w-5 h-5" />,
    meta: 'DOCX • 150 KB',
    action: {
      label: 'Download',
      url: '/resources/forms/board-resolution-form.docx',
    },
  },
  {
    title: 'Due Diligence Checklist',
    description: 'Comprehensive checklist for legal due diligence process',
    type: 'form',
    icon: <HiDocumentText className="w-5 h-5" />,
    meta: 'DOCX • 200 KB',
    action: {
      label: 'Download',
      url: '/resources/forms/due-diligence-checklist.docx',
    },
  },

  // Books
  {
    title: 'Hukum Perseroan Terbatas',
    description: 'Comprehensive guide to Indonesian corporate law principles',
    type: 'book',
    icon: <HiBookOpen className="w-5 h-5" />,
    meta: 'M. Yahya Harahap, S.H.',
    action: {
      label: 'View Book',
      url: '/books',
    },
  },
  {
    title: 'Hukum Bisnis',
    description:
      'Essential legal framework for business operations in Indonesia',
    type: 'book',
    icon: <HiBookOpen className="w-5 h-5" />,
    meta: 'Dr. Rr. Rina Antasari, S.H., M.Hum.',
    action: {
      label: 'View Book',
      url: '/books',
    },
  },

  // Links
  {
    title: 'Cryptocurrency Regulations in Indonesia',
    description:
      'Comprehensive analysis of digital asset regulations in Indonesia',
    type: 'link',
    icon: <HiExternalLink className="w-5 h-5" />,
    meta: 'External Resource',
    action: {
      label: 'Visit',
      url: '#',
    },
  },
];

// Halaman Resources yang lebih simpel dan modern
export default function ResourcesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout title="Legal Resources | AL KINDI" isHomePage={false}>
      <PowerfulSEO
        title="Resources"
        description="Curated collection of legal resources, tools, and references for corporate law, capital markets, M&A, bankruptcy, and cryptocurrency regulations."
        image="/images/default.png"
      />

      <main className="content-spacing">
        {/* Simplified Background with Legal Theme */}
        <div className="absolute inset-0 overflow-hidden h-[300px] bg-neutral-950">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950 z-[1]" />
          <div
            aria-hidden="true"
            className="h-[300px] w-[600px] rounded-full bg-gradient-to-r from-[#2E996C]/20 to-[#0F3324]/20 blur-[100px] absolute top-0 -translate-y-1/2 z-[0] left-1/4"
          />
          <Image
            alt=""
            priority
            width={1280}
            height={825}
            className="pointer-events-none select-none absolute w-full inset-0 h-full object-cover opacity-20 mix-blend-overlay"
            src="/images/textures/crumpled.jpg"
          />

          {/* Legal paper texture */}
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

          {/* Legal document corner decorations */}
          <div
            className="absolute top-20 left-20 opacity-0 transition-all duration-1500"
            style={{
              opacity: isVisible ? 0.15 : 0,
              transform: isVisible
                ? 'translate(0, 0)'
                : 'translate(-10px, -10px)',
              transitionDelay: '1000ms',
            }}
          >
            <div className="w-40 h-40 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-md"></div>
          </div>
        </div>

        {/* Content */}
        <section className="min-h-screen pt-32 relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Legal Styled Matching Blog */}
          <div className="mb-12 max-w-2xl mx-auto text-center">
            <div
              className="flex items-center space-x-2 mb-2 justify-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 700ms ease-out',
                transitionDelay: '400ms',
              }}
            >
              <HiLibrary className="text-emerald-400 w-5 h-5" />
              <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
                Legal Documents
              </h2>
            </div>

            <h3
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                transitionDelay: '500ms',
              }}
            >
              Legal <span className="gradient-text">Resources</span>
            </h3>
            <p
              className="text-neutral-400 leading-relaxed text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                transitionDelay: '600ms',
              }}
            >
              A curated collection of legal templates, documents, and reference
              materials
            </p>

            <div
              className="flex items-center my-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 700ms ease-out',
                transitionDelay: '700ms',
              }}
            >
              <div className="h-px flex-grow bg-neutral-800/50"></div>
              <div className="px-4 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 rounded-sm bg-emerald-900/10">
                PRACTITIONER RESOURCES
              </div>
              <div className="h-px flex-grow bg-neutral-800/50"></div>
            </div>
          </div>

          {/* Resources Grid - Legal Styled - Match Blog */}
          <div
            className="relative mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 800ms ease-out, transform 800ms ease-out',
              transitionDelay: '800ms',
            }}
          >
            {/* Legal document styling */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-emerald-500/30"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-emerald-500/30"></div>

            {/* Resources grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="group h-full flex flex-col bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-sm p-6 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(16,185,129,0.1)] relative"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition:
                      'opacity 800ms ease-out, transform 800ms ease-out',
                    transitionDelay: `${800 + index * 100}ms`,
                  }}
                >
                  {/* Corner decorations - legal document style */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors duration-300"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors duration-300"></div>

                  {/* Decorative top bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Header with Icon and Title */}
                  <div className="flex items-center space-x-4 mb-5">
                    <div className="p-3 rounded-sm bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors duration-300">
                      {resource.icon}
                    </div>
                    <h3 className="font-medium text-lg text-white group-hover:text-emerald-300 transition-colors duration-300">
                      {resource.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm mb-6 flex-grow group-hover:text-neutral-300 transition-colors duration-300">
                    {resource.description}
                  </p>

                  {/* Footer with Meta and Action */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-800/60">
                    <span className="text-xs text-neutral-500">
                      {resource.meta}
                    </span>
                    <Link
                      href={resource.action.url}
                      className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                    >
                      <span className="mr-2">{resource.action.label}</span>
                      {resource.type === 'document' ||
                      resource.type === 'form' ? (
                        <HiDownload className="w-4 h-4" />
                      ) : (
                        <HiExternalLink className="w-4 h-4" />
                      )}
                    </Link>
                  </div>

                  {/* Document filing number - legal style */}
                  <div className="absolute top-3 right-3">
                    <div className="text-[10px] text-neutral-500 font-mono">
                      {resource.type === 'document'
                        ? 'DOC-'
                        : resource.type === 'form'
                          ? 'FRM-'
                          : resource.type === 'book'
                            ? 'BK-'
                            : 'REF-'}
                      {index + 1}/
                      {new Date().getFullYear().toString().substring(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Document footer */}
            <div className="mt-8 text-center text-[10px] text-neutral-500 font-mono">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-px w-12 bg-neutral-800"></div>
                <HiScale className="w-4 h-4 text-emerald-500/40" />
                <div className="h-px w-12 bg-neutral-800"></div>
              </div>
              DOCUMENT ID: RES-{new Date().getFullYear()}
            </div>
          </div>

          {/* Legal footer */}
          <div
            className="mt-16 text-center relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 800ms ease-out',
              transitionDelay: '1400ms',
            }}
          >
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
              These resources are provided for informational purposes only and
              do not constitute legal advice. Always consult with a qualified
              legal professional before using these documents.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
