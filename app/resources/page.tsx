import React from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import {
  HiDocumentText,
  HiBookOpen,
  HiDownload,
  HiExternalLink,
  HiScale,
} from 'react-icons/hi';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Curated collection of legal resources, templates, and references for corporate law, capital markets, M&A, bankruptcy, and cryptocurrency regulations.',
  openGraph: {
    title: 'Resources',
    description:
      'Curated collection of legal resources, templates, and references for corporate law, capital markets, M&A, bankruptcy, and cryptocurrency regulations.',
    type: 'website',
    url: '/resources/',
    images: [
      {
        url: '/images/default.png',
        width: 1200,
        height: 630,
        alt: 'AL KINDI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources',
    description:
      'Curated collection of legal resources, templates, and references for corporate law, capital markets, M&A, bankruptcy, and cryptocurrency regulations.',
    images: ['/images/default.png'],
  },
  alternates: {
    canonical: '/resources/',
  },
};

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
      url: '/resources/documents/tets.docx',
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
      url: '/books/',
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
      url: '/books/',
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
  const breadcrumbItems = [{ label: 'Resources' }];
  return (
    <Layout title="Legal Resources" isHomePage={false}>
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
            }}
          />

          {/* Legal document corner decorations */}
          <div className="absolute top-20 left-20 opacity-15">
            <div className="w-40 h-40 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-md"></div>
          </div>
        </div>

        {/* Content */}
        <section className="min-h-screen pt-32 relative z-10 ">
          {/* Header - Legal Styled Matching Blog */}
          <div className="mb-12 max-w-2xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              Legal <span className="gradient-text">Resources</span>
            </h3>
            <p className="text-neutral-400 leading-relaxed text-center">
              A curated collection of legal templates, documents, and reference
              materials
            </p>

            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>
          <div className=" mb-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Resources List - Simple & Elegant */}
          <div className="relative mb-16">
            <ul className="space-y-4 divide-y divide-neutral-800/60">
              {resources.map((resource, index) => (
                <li
                  key={index}
                  className="pt-4 first:pt-0 flex items-start gap-4"
                >
                  {/* Icon */}
                  <div className="text-emerald-400 shrink-0 mt-1">
                    {resource.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h4 className="font-medium  border-decoration-bottom text-white text-lg md:text-xl">
                        {resource.title}
                      </h4>
                      <Link
                        href={resource.action.url}
                        className="inline-flex items-center text-sm font-medium text-emerald-500 hover:text-emerald-300"
                      >
                        {resource.action.label}
                        {resource.type === 'document' ||
                        resource.type === 'form' ? (
                          <HiDownload className="w-4 h-4 ml-1" />
                        ) : (
                          <HiExternalLink className="w-4 h-4 ml-1" />
                        )}
                      </Link>
                    </div>
                    <p className="paragraph-text leading-relaxed mt-1">
                      {resource.description}
                    </p>
                    <span className="text-xs text-neutral-500 mt-1 inline-block">
                      {resource.meta}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal footer */}
          <div className="mt-16 text-center relative">
            {/* Law scale divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-neutral-800"></div>
              <div className="mx-4">
                <HiDocumentText className="w-8 h-8 text-emerald-500/30" />
              </div>
              <div className="h-px w-16 bg-neutral-800"></div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
              <HiDocumentText className="w-4 h-4 text-emerald-500/50" />
              <span>For reference only</span>
            </div>

            {/* Legal disclaimer */}
            <p className="mt-4 text-[10px] text-neutral-600 max-w-lg mx-auto">
              These resources are provided for informational purposes only and
              do not constitute legal advice. Always consult with a qualified
              professional before using these documents.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
