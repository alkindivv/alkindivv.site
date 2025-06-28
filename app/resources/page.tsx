import React from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { HiDocumentText, HiBookOpen } from 'react-icons/hi';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import DimensionLink from '@/components/common/DimensionLink';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Curated collection of legal resources, templates, and references.',
  openGraph: {
    title: 'Resources | AL KINDI',
    description:
      'Curated collection of legal resources, templates, and references.',
    type: 'website',
    url: '/resources/',
    images: [
      {
        url: '/images/default.png',
        width: 1200,
        height: 630,
        alt: 'Legal Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | AL KINDI',
    description:
      'Curated collection of legal resources, templates, and references.',
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
    icon: <HiDocumentText className="w-6 h-6" />,
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
    icon: <HiDocumentText className="w-6 h-6" />,
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
    icon: <HiDocumentText className="w-6 h-6" />,
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
    icon: <HiDocumentText className="w-6 h-6" />,
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
    icon: <HiDocumentText className="w-6 h-6" />,
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
    icon: <HiDocumentText className="w-6 h-6" />,
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
    icon: <HiDocumentText className="w-6 h-6" />,
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
    icon: <HiBookOpen className="w-6 h-6" />,
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
    icon: <HiBookOpen className="w-6 h-6" />,
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
    icon: <HiDocumentText className="w-6 h-6" />,
    meta: 'External Resource',
    action: {
      label: 'Visit',
      url: '/blog/law/regulasi-aset-kripto',
    },
  },
];

export default function ResourcesPage() {
  const breadcrumbItems = [{ label: 'Resources' }];

  return (
    <Layout title="Resources" isHomePage={false}>
      {/* Subtle background */}
      <div className="absolute inset-0 bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/5 to-neutral-950" />
      </div>

      {/* Content */}
      <section className="min-h-screen max-w-3xl mx-auto pt-32 relative z-10 ">
        {/* Header - Legal Styled Matching Blog */}
        <div className="mb-12 max-w-3xl mx-auto text-center">
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

        {/* Resources grid - Minimal elegant design */}
        <div className="grid grid-cols-1 gap-8 mb-16">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="border-b border-neutral-900 pb-8 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                {/* Icon with subtle styling */}
                <div className="text-emerald-500/80  shrink-0 mt-1 bg-emerald-950/20 p-2 rounded-full">
                  {resource.icon}
                </div>

                {/* Content with clean typography */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-medium text-white text-lg md:text-xl">
                      {resource.title}
                    </h2>

                    {/* Move the DimensionLink to appear below the paragraph on mobile */}
                    <div className="hidden sm:block">
                      <DimensionLink
                        href={resource.action.url}
                        className="text-xs md:text-sm font-medium text-neutral-500"
                      >
                        {resource.action.label}
                      </DimensionLink>
                    </div>
                  </div>

                  {/* Description with improved readability */}
                  <p className="text-sm md:text-[0.9rem] text-neutral-400 leading-relaxed mt-1">
                    {resource.description}
                  </p>

                  {/* Show DimensionLink below paragraph on mobile */}
                  <div className="mt-2 sm:hidden">
                    <DimensionLink
                      href={resource.action.url}
                      className="text-xs md:text-sm font-medium text-neutral-500"
                    >
                      {resource.action.label}
                    </DimensionLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal footer with disclaimer */}
        <div className="mt-12 text-center border-t border-neutral-900 pt-8">
          <p className="text-xs text-neutral-600 max-w-md mx-auto">
            These resources are provided for informational purposes only. Always
            consult with a qualified professional before use.
          </p>
        </div>
      </section>
    </Layout>
  );
}
