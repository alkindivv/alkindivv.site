export interface BlogPost {
  // Required fields
  title: string;
  date: string;
  author: string;
  category: string;
  slug: string;
  readingTime: number;
  excerpt: string;

  // Optional fields
  description?: string;
  tags?: string[];
  featuredImage?: string;
  banner?: string;
  views?: number;
  publishedAt?: string;
  image?: string;
  originalSlug?: string;
  isFallback?: boolean;
  originalLocale?: string;
}

export type BlogCategory = {
  name: string;
  description: string;
  slug: string;
  count: number;
};

export interface SEOProps {
  templateTitle?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    type?: string;
    title?: string;
    description?: string;
    images?: Array<{ url: string }>;
    article?: {
      publishedTime?: string;
      authors?: string[];
      tags?: string[];
    };
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: Array<{ url: string }>;
  };
}
