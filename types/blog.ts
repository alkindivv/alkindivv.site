export interface ReadingTimeResult {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface BlogPost {
  // Required fields
  title: string;
  date: string;
  author: string;
  category: string;
  slug: string;
  readingTime: number;

  // Optional fields
  excerpt?: string;
  description?: string;
  tags?: string[];
  featuredImage?: string;
  banner?: string;
  views?: number;
  publishedAt?: string;
  image?: string;
}

export type BlogCategory = {
  name: string;
  description: string;
  slug: string;
  count: number;
};
