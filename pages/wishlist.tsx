import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import {
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineScale,
} from 'react-icons/hi';
import PowerfulSEO from '@/components/shared/PowerfulSEO';
import Accent from '@/components/shared/Accent';
import { HiOutlineExternalLink, HiOutlineHeart } from 'react-icons/hi';
import clsx from 'clsx';

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
    imageUrl: '',
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
    title:
      'Become a junior or trainee associate at a top tier corporate law firm',
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
    <div className="group flex items-start gap-4 py-4 relative">
      {/* Corner decorations - only visible on hover */}
      {/* <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors duration-300"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors duration-300"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors duration-300"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors duration-300"></div> */}

      {/* Checkbox - Legal styled */}
      <div
        className={`flex-shrink-0 w-6 h-6 mt-1 rounded-sm border ${
          completed ? 'border-emerald-800 bg-emerald-900/20' : 'border-gray-800'
        } flex items-center justify-center transition-all duration-300 group-hover:border-emerald-700`}
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
          <h3
            className={`text-base font-medium ${
              completed ? 'text-[#ffffff' : 'text-[#ffffff'
            } group-hover:text-emerald-300 transition-colors duration-300`}
          >
            {title}
          </h3>
        </div>

        <p
          className={`text-sm ${
            completed ? 'paragraph-text' : 'paragraph-text'
          } group-hover:text-neutral-300 transition-colors duration-300`}
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

const WishlistPage = () => {
  const completedCount = wishlistItems.filter((item) => item.completed).length;
  const totalCount = wishlistItems.length;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout>
      <PowerfulSEO
        title="Wishlist"
        description="AL KINDI's curated wishlist of books, gadgets, and tools for legal professionals. Discover recommended resources for law, technology, and professional development."
        image="/images/default.png"
      />
      {/* Background Effect - Legal Themed */}
      <div
        className="absolute inset-0 overflow-hidden h-[950px] bg-neutral-950"
        style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <div aria-hidden="true" className="" />
        <Image
          alt=""
          loading="lazy"
          width={1280}
          height={825}
          className="pointer-events-none select-none absolute w-full inset-0 h-[450px] object-cover z-[-1] opacity-40 mix-blend-overlay"
          src="/images/textures/crumpled-2.jpg"
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
        <div
          className="absolute bottom-20 right-20 opacity-0 transition-all duration-1500"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transform: isVisible ? 'translate(0, 0)' : 'translate(10px, 10px)',
            transitionDelay: '1200ms',
          }}
        >
          <div className="w-40 h-40 border-b-2 border-r-2 border-emerald-500/40 rounded-br-md"></div>
        </div>
      </div>

      <main className="min-h-screen pt-40 relative z-10">
        <div className="container max-w-4xl mx-auto px-4">
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
              <HiOutlineDocumentText className="text-emerald-400 w-5 h-5" />
              <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
                Personal Objectives
              </h2>
            </div>

            <h3
              className="text-4xl md:text-5xl font-bold mb-4 text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                transitionDelay: '500ms',
              }}
            >
              Professional <span className="gradient-text">Wishlist</span>
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
              Professional milestones and personal aspirations in my legal
              career journey
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
                PROFESSIONAL RECORD
              </div>
              <div className="h-px flex-grow bg-neutral-800/50"></div>
            </div>
          </div>

          {/* Content */}
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
            {/* <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-emerald-500/30"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-emerald-500/30"></div> */}

            <div className="">
              {/* Decorative header bar - Legal styled */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

              {/* Document title */}
              <div className="mb-6 border-b border-neutral-800/50 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HiOutlineScale className="text-emerald-400 w-5 h-5" />
                    <span className="text-sm font-medium text-emerald-400">
                      WISH LIST
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative border for the legal document look */}
              {/* <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent"></div> */}

              {/* Legal document watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                <div className="rotate-45">
                  <HiOutlineScale className="w-64 h-64" />
                </div>
              </div>

              {/* Legal document page numbers */}
              {/* <div className="absolute bottom-2 right-2 text-[10px] text-neutral-500 font-mono">
                Page 1 of 1
              </div> */}

              <div className="divide-y divide-gray-900">
                {wishlistItems.map((item, index) => (
                  <WishlistCard key={item.id} {...item} />
                ))}
              </div>

              {/* Progress */}
              <div
                className="mt-8 flex items-center justify-between border-t border-neutral-800/50 pt-4"
                data-fade="4"
              >
                <div className="text-xs text-neutral-500">
                  Filed:{' '}
                  {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                <div className="text-sm text-emerald-400">
                  {completedCount} out of {totalCount} completed
                </div>
              </div>

              {/* Legal signature line */}
              {/* <div className="mt-8 flex justify-end">
                <div className="w-48">
                  <div className="h-px bg-neutral-800"></div>
                  <div className="text-xs text-neutral-500 text-center mt-1">
                    Professional Signature
                  </div>
                </div>
              </div> */}
            </div>

            {/* Document footer */}
            <div className="mt-8 text-center text-[10px] text-neutral-500 font-mono">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-px w-12 bg-neutral-800"></div>
                <HiOutlineScale className="w-4 h-4 text-emerald-500/40" />
                <div className="h-px w-12 bg-neutral-800"></div>
              </div>
              WISHLIST-{new Date().getFullYear()}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default WishlistPage;
