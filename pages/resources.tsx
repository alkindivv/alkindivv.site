import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import {
  HiOutlineCalendar,
  HiOutlineUser,
  HiStar,
  HiOutlineBookOpen,
  HiOutlineExternalLink,
  HiDownload,
  HiBookOpen,
  HiTemplate,
  HiAcademicCap,
} from 'react-icons/hi';
import SEO from '@/components/shared/SEO';
import clsx from 'clsx';

// Interface untuk data buku
interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  publishYear: string;
  category: string;
  description: string;
  readStatus?: 'Selesai' | 'Sedang Dibaca' | 'Rencana Dibaca';
  rating?: number;
  notes?: string;
  keyTakeaways?: string[];
}

// Data buku
const books: Book[] = [
  {
    id: 1,
    title: 'Hukum Perseroan Terbatas',
    author: 'M. Yahya Harahap, S.H.',
    coverImage: '/images/resources/buku-pt.jpg',
    publishYear: '2008',
    category: 'Law',
    description: `one of my favorite book about law especially about company, this book has a lot of information about how company works, its structure, and many more`,
  },
  {
    id: 2,
    title: 'Hukum Bisnis',
    author: 'Dr. Rr. Rina Antasari, S.H., M.Hum. & Dra. Fauziah, M.Hum.',
    coverImage: '/images/resources/hukum-bisnis.jpg',
    publishYear: '2018',
    category: 'Law',
    description: `learn a lot about law especially in business law such as business contract, bankruptcy & insolvency, merger & acquisition, foreign investment and alternative dispute resolution. one of my best purchase this year`,
  },
  {
    id: 3,
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    coverImage: '/images/books/design-patterns.jpg',
    publishYear: '1994',
    category: 'Software Engineering',
    description:
      'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.',
    readStatus: 'Rencana Dibaca',
    keyTakeaways: [
      'Fundamental design patterns dalam OOP',
      'Solusi untuk masalah desain yang umum',
      'Best practices dalam arsitektur software',
    ],
  },
];

// Komponen BookCard
function BookCard({
  title,
  author,
  coverImage,
  publishYear,
  description,
  category,
  readStatus,
  rating,
  notes,
  keyTakeaways,
}: Book) {
  // Render stars based on rating
  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <HiStar
        key={index}
        className={`w-4 h-4 ${
          index < (rating || 0) ? 'text-yellow-400' : 'text-gray-600'
        }`}
      />
    ));
  };

  // Status color mapping
  const statusColors = {
    Selesai: 'bg-green-400/10 text-green-400',
    'Sedang Dibaca': 'bg-blue-400/10 text-blue-400',
    'Rencana Dibaca': 'bg-gray-400/10 text-gray-400',
  };

  return (
    <div className="group relative bg-[#0a0a0a]/50 rounded-lg border border-white/[0.05] overflow-hidden transition-all duration-300 hover:border-emerald-500/20 hover:bg-[#0a0a0a]/70">
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Book Cover */}
        <div className="relative w-full md:w-[120px] h-[180px] md:h-[180px] rounded-md overflow-hidden">
          <Image
            src={coverImage}
            alt={`${title} cover`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Book Info */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-sans leading-relaxed text-[1.25rem] md:text-[1.5rem] font-bold text-white group-hover:text-emerald-400 transition-colors">
              {title}
            </h3>
            {readStatus && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[readStatus as keyof typeof statusColors]
                }`}
              >
                {readStatus}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-[0.9rem] md:text-[0.975rem] text-gray-400/80">
            <div className="flex items-center gap-1.5">
              <HiOutlineUser className="w-4 h-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiOutlineCalendar className="w-4 h-4" />
              <span>{publishYear}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiOutlineBookOpen className="w-4 h-4" />
              <span>{category}</span>
            </div>
          </div>

          <p className="paragraph-text text-justify leading-relaxed">
            {description}
          </p>

          {notes && (
            <div className="paragraph-text text-justify leading-relaxed">
              <span className="font-semibold text-emerald-400">
                Catatan Pribadi:
              </span>
              <p className="mt-1">{notes}</p>
            </div>
          )}

          {keyTakeaways && keyTakeaways.length > 0 && (
            <div className="paragraph-text text-justify leading-relaxed">
              <span className="font-semibold text-emerald-400">
                Poin Penting:
              </span>
              <ul className="mt-1 space-y-4">
                {keyTakeaways.map((point, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/10 mt-2" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
    id: 'books',
    name: 'Legal Books',
    description: 'Curated collection of legal literature and references',
    icon: HiBookOpen,
    items: [
      {
        title: 'Corporate Law',
        description: 'Essential readings in corporate law',
        resources: [
          {
            name: 'Understanding Indonesian Company Law',
            author: 'Various Authors',
            year: '2023',
            link: '#',
          },
          {
            name: 'Capital Market Regulations',
            author: 'OJK',
            year: '2023',
            link: '#',
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('templates');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <SEO
        templateTitle="Legal Resources"
        description="Access professional legal resources, templates, and educational materials for legal practitioners and business professionals."
      />

      <main
        className={clsx(
          'content-spacing fade-wrapper',
          !isLoaded && 'opacity-0'
        )}
      >
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
              <h1 className="text-4xl md:text-5xl font-bold">
                Legal <span className="gradient-text">Resources</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Access professional legal templates, educational materials, and
                resources to support your legal practice and business needs.
              </p>
            </div>

            {/* Category Navigation */}
            <div className="mt-12">
              <div className="flex flex-wrap justify-center gap-4">
                {resourceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={clsx(
                      'px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                      activeCategory === category.id
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="w-4 h-4" />
                      {category.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resources Grid */}
            <div className="mt-12 grid gap-8">
              {resourceCategories
                .find((cat) => cat.id === activeCategory)
                ?.items.map((section, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {section.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {section.description}
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {section.resources.map((resource, resourceIdx) => (
                        <div
                          key={resourceIdx}
                          className="flex items-center justify-between p-4 bg-black/50 rounded-xl border border-gray-800/50 hover:border-emerald-500/20 transition-all duration-300"
                        >
                          <div>
                            <h4 className="font-medium text-white">
                              {resource.name}
                            </h4>
                            {'type' in resource && (
                              <p className="text-sm text-gray-400 mt-1">
                                {resource.type} • {resource.size}
                              </p>
                            )}
                            {'author' in resource && (
                              <p className="text-sm text-gray-400 mt-1">
                                {resource.author} • {resource.year}
                              </p>
                            )}
                            {'provider' in resource && (
                              <p className="text-sm text-gray-400 mt-1">
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
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
