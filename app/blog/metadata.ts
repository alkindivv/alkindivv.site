import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Article, News, Thoughts, and Insights about law, technology, and cryptocurrency written by me based on my personal experiences and research',
  alternates: {
    canonical: '/blog/',
  },
  openGraph: {
    title: 'Blog - AL KINDI',
    description:
      'Article, News, Thoughts, and Insights about law, technology, and cryptocurrency written by me based on my personal experiences and research',
    url: 'https://alkindi.id/blog/',
    type: 'website',
    images: [
      {
        url: '/images/default.png',
        width: 1200,
        height: 630,
        alt: 'Blog – AL KINDI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - AL KINDI',
    description:
      'Article, News, Thoughts, and Insights about law, technology, and cryptocurrency written by me based on my personal experiences and research',
    images: ['/images/default.png'],
  },
};
