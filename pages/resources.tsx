import React, { useState } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import {
  HiTemplate,
  HiAcademicCap,
  HiDocumentText,
  HiBookOpen,
  HiDownload,
} from 'react-icons/hi';
import SEO from '@/components/shared/SEO';
import clsx from 'clsx';

// Data buku

const resourceCategories = [
  {
    id: 'templates',
    name: 'Legal Templates',
    description: 'Professional legal document templates for various purposes',
    icon: HiTemplate,
    items: [
      {
        title: 'Corporate Documents',
        description: 'Essential templates for corporate legal matters',
        resources: [
          {
            name: 'Company Establishment Agreement',
            type: 'DOCX',
            size: '245 KB',
            downloadUrl: '#',
          },
          {
            name: 'Shareholders Agreement',
            type: 'DOCX',
            size: '180 KB',
            downloadUrl: '#',
          },
        ],
      },
      {
        title: 'Contract Templates',
        description: 'Standard contract templates for business use',
        resources: [
          {
            name: 'Service Agreement',
            type: 'DOCX',
            size: '156 KB',
            downloadUrl: '#',
          },
          {
            name: 'NDA Template',
            type: 'DOCX',
            size: '120 KB',
            downloadUrl: '#',
          },
        ],
      },
    ],
  },
  {
    id: 'forms',
    name: 'Legal Forms',
    description: 'Ready-to-use legal forms and filing documents',
    icon: HiDocumentText,
    items: [
      {
        title: 'Corporate Filing Forms',
        description: 'Standard forms for corporate legal compliance',
        resources: [
          {
            name: 'Annual Report Form',
            type: 'DOCX',
            size: '180 KB',
            downloadUrl: '#',
          },
          {
            name: 'Board Resolution Form',
            type: 'DOCX',
            size: '150 KB',
            downloadUrl: '#',
          },
          {
            name: 'Share Transfer Form',
            type: 'DOCX',
            size: '120 KB',
            downloadUrl: '#',
          },
        ],
      },
      {
        title: 'Legal Compliance Forms',
        description: 'Essential forms for legal compliance and reporting',
        resources: [
          {
            name: 'Due Diligence Checklist',
            type: 'DOCX',
            size: '200 KB',
            downloadUrl: '#',
          },
          {
            name: 'Compliance Report Template',
            type: 'DOCX',
            size: '175 KB',
            downloadUrl: '#',
          },
          {
            name: 'Legal Audit Form',
            type: 'DOCX',
            size: '190 KB',
            downloadUrl: '#',
          },
        ],
      },
    ],
  },
  {
    id: 'courses',
    name: 'Online Courses',
    description: 'Professional development courses in legal practice',
    icon: HiAcademicCap,
    items: [
      {
        title: 'Legal Practice',
        description: 'Enhance your legal practice skills',
        resources: [
          {
            name: 'Capital Market Professional Course',
            provider: 'HKHPM',
            duration: '3 months',
            link: '#',
          },
          {
            name: 'Legal Auditor Certification',
            provider: 'ASAHI',
            duration: '6 months',
            link: '#',
          },
        ],
      },
    ],
  },
];

// Halaman Resources
export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('templates');

  return (
    <Layout title="Legal Resources | AL KINDI" isHomePage={false}>
      <SEO
        templateTitle="Legal Resources"
        description="Access professional legal resources, templates, and educational materials for legal practitioners and business professionals."
        canonical="https://alkindivv.site/resources/"
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
            className="h-[400px] w-[650px] rounded-full bg-gradient-to-r from-[#2E996C]/30 to-[#0F3324]/30 blur-[150px] absolute top-0 -translate-y-full rotate-45 origin-left z-[-2] left-[15%]"
          />
          <Image
            alt=""
            priority
            width={1280}
            height={825}
            className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
            src="/images/textures/crumpled.jpg"
          />
        </div>

        {/* Content */}
        <section className="min-h-screen pt-40 relative z-10">
          <div className=" mx-auto ">
            {/* Header */}
            <div className="text-center space-y-4" data-fade="1">
              <h1 className="text-4xl md:text-5xl font-bold">
                Legal <span className="gradient-text">Resources</span>
              </h1>
              <p className="hero-text max-w-2xl mx-auto">
                Explore a complete repository of legal documents and resources
              </p>
            </div>

            <div
              className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-10 mt-5"
              data-fade="2"
            />

            {/* Category Navigation */}
            <div className="mt-12" data-fade="3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resourceCategories.map((category, idx) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={clsx(
                      'p-6 rounded-xl border transition-all duration-300 text-left group hover:bg-[#111111]',
                      activeCategory === category.id
                        ? 'border-emerald-500/20 bg-emerald-500/5'
                        : 'border-neutral-800 hover:border-emerald-500/20'
                    )}
                    data-fade={4 + idx}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-emerald-500/10">
                        <category.icon className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-neutral-50 group-hover:text-emerald-400 transition-colors">
                          {category.name}
                        </h3>
                        <p className="mt-1 text-sm paragraph-text ">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Resources Content */}
              <div className="mt-12" data-fade="7">
                {resourceCategories
                  .find((cat) => cat.id === activeCategory)
                  ?.items.map((section, idx) => (
                    <div
                      key={idx}
                      className="mb-12 last:mb-0"
                      data-fade={8 + idx}
                    >
                      <div className="border-b border-neutral-800 pb-4 mb-6">
                        <h2 className="text-xl font-bold text-neutral-50">
                          {section.title}
                        </h2>
                        <p className="mt-1 text-sm paragraph-text ">
                          {section.description}
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {section.resources.map((resource, resourceIdx) => (
                          <div
                            key={resourceIdx}
                            className="group bg-[#0a0a0a] border border-neutral-800 rounded-xl p-6 hover:border-emerald-500/20 hover:bg-[#111111] transition-all duration-300"
                            data-fade={10 + resourceIdx}
                          >
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h3 className="font-medium text-neutral-50 group-hover:text-emerald-400 transition-colors">
                                  {resource.name}
                                </h3>
                                {'type' in resource && (
                                  <p className="text-sm paragraph-text ">
                                    {resource.type} • {resource.size}
                                  </p>
                                )}
                                {'provider' in resource && (
                                  <p className="text-sm paragraph-text ">
                                    {resource.provider} • {resource.duration}
                                  </p>
                                )}
                              </div>
                              <a
                                href={
                                  'downloadUrl' in resource
                                    ? resource.downloadUrl
                                    : resource.link
                                }
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                              >
                                {'downloadUrl' in resource ? (
                                  <>
                                    <HiDownload className="w-4 h-4" />
                                    Download
                                  </>
                                ) : (
                                  <>
                                    <HiBookOpen className="w-4 h-4" />
                                    View
                                  </>
                                )}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
