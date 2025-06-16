import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { Metadata } from 'next';
import { HiScale, HiOutlineHeart, HiOutlineCheck } from 'react-icons/hi';
import clsx from 'clsx';
import Breadcrumb from '@/components/shared/Breadcrumb';

export const metadata: Metadata = {
  title: 'Wishlist',
  description:
    'My personal wishlist of books, tools, and items I want to acquire for my legal practice and personal development.',
  openGraph: {
    title: 'Wishlist - AL KINDI',
    description: 'Life goals and aspirations of AL KINDI',
    type: 'website',
    url: '/wishlist/',
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
    title: 'Wishlist - AL KINDI',
    description: 'Life goals and aspirations of AL KINDI',
    images: ['/images/default.png'],
  },
  alternates: {
    canonical: '/wishlist/',
  },
};

interface WishlistItem {
  id: number;
  title: string;
  description: string;
  date?: string;
  imageUrl?: string;
  completed: boolean;
}

const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    title: 'Graduate from law school',
    description: 'Graduate from law school and pass the bar exam',
    date: '2023-12-31',
    // imageUrl: '/images/harvard-law.jpg',
    completed: true,
  },
  {
    id: 2,
    title: 'Join top tier corporate law firm',
    description: 'Joining a law firm and become a partner',
    // imageUrl: '/images/law-books.jpg',
    completed: false,
  },
  {
    id: 3,
    title: 'Travel to 10 countries',
    description: 'Travel to 10 countries and experience the culture and people',

    // imageUrl: '/images/legal-tech.jpg',
    completed: false,
  },
  // {
  //   id: 4,
  //   title: 'Publish Legal Research Paper',
  //   description:
  //     'Complete and publish my research paper on the legal implications of blockchain technology in Indonesian capital markets.',
  //   date: '2024-03-01',
  //   completed: false,
  // },
  {
    id: 4,
    title: 'Buy a house',
    description: 'Buy a house and build a family',
    completed: false,
  },
];

function WishlistCard({
  title,
  description,
  date,
  imageUrl,
  completed,
}: WishlistItem) {
  return (
    <div className="group relative backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

      {/* Status indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={clsx(
            'w-8 h-8 rounded-full flex items-center justify-center',
            completed
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-neutral-800/80 text-neutral-400'
          )}
        >
          {completed ? (
            <HiOutlineCheck className="w-4 h-4" />
          ) : (
            <HiOutlineHeart className="w-4 h-4" />
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Image (if available) */}
        {imageUrl && (
          <div className="md:w-1/3 h-[200px] md:h-auto relative">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </div>
        )}

        {/* Content */}
        <div
          className={clsx(
            'p-6 flex flex-col',
            imageUrl ? 'md:w-2/3' : 'w-full'
          )}
        >
          <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>

          {date && (
            <p className="text-xs text-neutral-500 mb-3">
              Target:{' '}
              {new Date(date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}

          <p className="text-neutral-400 text-sm flex-grow">{description}</p>

          <div className="mt-4 pt-4 border-t border-neutral-800/50">
            <span
              className={clsx(
                'text-xs font-medium px-2 py-1 rounded',
                completed
                  ? 'bg-emerald-900/30 text-emerald-400'
                  : 'bg-neutral-800/50 text-neutral-400'
              )}
            >
              {completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const breadcrumbItems = [{ label: 'Wishlist' }];
  return (
    <Layout title="Wishlist">
      <div
        className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950"
        style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="h-[900px] w-[950px] rounded-full bg-gradient-to-r from-[#2E996C]/70 to-[#0F3324]/10 blur-[150px] absolute top-0 -translate-y-full rotate-45 origin-left z-[-2] left-[15%]"
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
      </div>

      {/* Content */}
      <main className="min-h-screen pt-40 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header - Legal Styled */}
          <div className="mb-12 max-w-2xl mx-auto" data-fade="1">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              My <span className="gradient-text">Wishlist</span>
            </h3>
            <p className="text-neutral-400 leading-relaxed text-center">
              Professional goals, resources, and items I hope to acquire
            </p>

            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Wishlist Grid */}
          <div className="space-y-8 mb-12">
            {wishlistItems.map((item) => (
              <WishlistCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
