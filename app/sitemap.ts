import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site';

  // Helper to ensure trailing slash (Next.js config `trailingSlash: true`)
  const withSlash = (url: string) => (url.endsWith('/') ? url : `${url}/`);

  // Get all blog posts
  const posts = await getAllPosts();
  const blogUrls = posts.map((post) => ({
    url: withSlash(`${baseUrl}/blog/${post.category}/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Get all categories
  const categories = await getAllCategories();
  const categoryUrls = categories.map((category) => ({
    url: withSlash(`${baseUrl}/blog/${category.slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Get all tags
  const tags = await getAllTags();
  const tagUrls = tags.map((tag) => {
    return {
      url: withSlash(`${baseUrl}/blog/tag/${tag}`),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    };
  });

  // Static pages
  const staticPages = [
    {
      url: withSlash(baseUrl),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: withSlash(`${baseUrl}/about`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: withSlash(`${baseUrl}/blog`),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: withSlash(`${baseUrl}/resources`),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: withSlash(`${baseUrl}/contact`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: withSlash(`${baseUrl}/books`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: withSlash(`${baseUrl}/glossary`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: withSlash(`${baseUrl}/wishlist`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: withSlash(`${baseUrl}/feed.xml`),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.4,
    },
    {
      url: withSlash(`${baseUrl}/atom.xml`),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.4,
    },
  ];

  return [...staticPages, ...categoryUrls, ...tagUrls, ...blogUrls];
}
