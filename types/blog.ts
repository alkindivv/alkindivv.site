export interface BlogPost {
  title: string;
  date: string;
  author: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: string;
  category: string;
  views?: number;
  slug: string;
  readingTime: number;
}
