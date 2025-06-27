import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { Metadata } from 'next';
import { HiOutlineCalendar } from 'react-icons/hi';

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
    title: 'Graduate from university',
    description:
      'Graduate from Islamic University of Indonesia with a degree in law.',
    date: 'August 2023',
    completed: true,
  },
  {
    id: 2,
    title: 'Pass the bar exam',
    date: 'February 2025',
    description: 'Pass the bar exam from the Indonesian Bar Association',
    completed: true,
  },
  {
    id: 3,
    title: 'Become an associate at a top-tier corporate law firm',
    description: '',
    completed: false,
  },
  {
    id: 4,
    title: 'Buy a house',
    description: '',
    completed: false,
  },

  {
    id: 5,
    title: 'Solo travel to another country',
    description: '',
    completed: false,
  },
  {
    id: 6,
    title: 'Become a partner at a top-tier corporate law firm in Indonesia',
    description: '',
    completed: false,
  },
  {
    id: 7,
    title: 'Being recognized as one of Indonesian Top 100 Lawyers (A-List)',
    description: '',
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
    <div className="group flex items-start gap-4 py-4">
      {/* Checkbox */}
      <div
        className={`flex-shrink-0 w-6 h-6 mt-1 rounded-sm border ${completed ? 'border-emerald-800' : 'border-gray-800'} flex items-center justify-center`}
      >
        {completed && (
          <svg
            className="w-5 h-5 text-emerald-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className={`text-base font-medium text-white`}>{title}</h3>
        </div>
        {description && (
          <p className="text-sm paragraph-text text-neutral-400">
            {description}
          </p>
        )}
        {date && (
          <div className="flex mt-2 items-center gap-2 text-xs paragraph-text text-neutral-500">
            <HiOutlineCalendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        )}
      </div>

      {/* Image */}
      {imageUrl && (
        <div className="flex-shrink-0 w-24 h-16 rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={96}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
}

export default function WishlistPage() {
  const completedCount = wishlistItems.filter((i) => i.completed).length;
  const breadcrumbItems = [{ label: 'Wishlist' }];
  return (
    <Layout title="Wishlist | AL KINDI" isHomePage={false}>
      {/* Background */}
      <div
        className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950"
        style={{
          WebkitMaskImage:
            'linear-gradient(rgb(0,0,0) 80%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(rgb(0,0,0) 80%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="h-[400px] w-[650px] rounded-full bg-gradient-to-r from-[#2E996C]/30 to-[#0F3324]/30 blur-[150px] absolute top-0 -translate-y-full rotate-45 origin-left z-[-2] left-[15%]"
        />
      </div>
      <main className="min-h-screen pt-40 relative z-10">
        <div className=" max-w-4xl mx-auto ">
          {/* Header */}
          <div className="mb-12 space-y-4 text-center">
            <h1 className="font-sans text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold leading-tight">
              My <span className="gradient-text">Wishlist</span>
            </h1>
            <p className="text-neutral-400 leading-relaxed text-center ">
              Things I want to achieve and experience in life
            </p>
            <div className="relative mt-5 top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Content */}
          <div>
            <div className="divide-y divide-gray-900">
              {wishlistItems.map((item) => (
                <WishlistCard key={item.id} {...item} />
              ))}
            </div>
            <div className="mt-8 text-sm text-neutral-500 text-right">
              {completedCount} of {wishlistItems.length} completed.
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
