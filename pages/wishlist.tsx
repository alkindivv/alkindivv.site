import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { HiOutlineCalendar } from 'react-icons/hi';
import SEO from '@/components/shared/SEO';

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
      'Graduate from islamic university of indonesia with a degree in law.',
    date: 'August 2023',
    imageUrl: '/images/AL-KINDI.png',
    completed: true,
  },
  {
    id: 2,
    title:
      'Become a junior or trainee associate at a top tier corporate law firm',
    description: '',

    completed: false,
  },
  {
    id: 3,
    title: 'Pass the bar exam',
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
    title: 'Speak at an international conference',
    description: '',
    completed: false,
  },
  {
    id: 6,
    title: 'Solo travel to another country',
    description: '',
    completed: false,
  },
  {
    id: 7,
    title: 'Establish my own corporate law firm',
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
        className={`flex-shrink-0 w-6 h-6 mt-1 rounded-sm border ${completed ? ' border-emerald-800' : 'border-gray-800'} flex items-center justify-center`}
      >
        {completed && (
          <svg
            className="w-6 h-6 text-white"
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
          <h3
            className={`text-base font-medium ${completed ? 'text-[#ffffff' : 'text-[#ffffff'}`}
          >
            {title}
          </h3>
        </div>

        <p
          className={`text-sm  ${completed ? 'paragraph-text' : 'paragraph-text'}`}
        >
          {description}
        </p>

        {date && (
          <div className="flex mt-2 items-center gap-2 text-xs paragraph-text">
            <HiOutlineCalendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        )}
      </div>

      {/* Images */}
      {imageUrl && completed && (
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
  const completedCount = wishlistItems.filter((item) => item.completed).length;
  const totalCount = wishlistItems.length;

  return (
    <Layout title="Wishlist | AL KINDI" isHomePage={false}>
      <SEO
        templateTitle="Wishlist"
        description="Things I want to achieve and experience in life"
        canonical="https://alkindivv.site/wishlist/"
      />
      {/* Background Effect */}
      <div
        className="absolute inset-0 overflow-hidden h-[450px] bg-neutral-950"
        style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
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

      <main className="min-h-screen pt-40 relative z-10">
        <div className="container max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="mt-14 relative space-y-4 text-center">
            <h1
              className="-mb-3 text-center font-sans text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold tracking-tight leading-tight"
              data-fade="1"
            >
              My <span className="gradient-text">Wishlist</span>
            </h1>
            <p
              className="hero-text leading-relaxed text-center text-[0.95rem] md:text-[1.05rem]"
              data-fade="2"
            >
              Things I want to achieve and experience in life
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-14 mt-3" />

          {/* Content */}
          <div className="mt-20 mx-auto" data-fade="3">
            <div className="divide-y divide-gray-900">
              {wishlistItems.map((item) => (
                <WishlistCard key={item.id} {...item} />
              ))}
            </div>

            {/* Progress */}
            <div
              className="mt-8 text-sm text-gray-600 text-right"
              data-fade="4"
            >
              {completedCount} out of {totalCount} completed.
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
