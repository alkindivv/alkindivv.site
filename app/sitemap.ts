import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alkindivv.site';

  // Get all blog posts
  const posts = await getAllPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Get all categories
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const latestPostDates = categories.reduce(
    (acc, category) => {
      const categoryPosts = posts.filter((post) => post.category === category);
      const latestPost = categoryPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
      acc[category] = latestPost.date;
      return acc;
    },
    {} as Record<string, string>
  );

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/blog/${category}`,
    lastModified: new Date(latestPostDates[category]),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(
        Math.max(...posts.map((p) => new Date(p.date).getTime()))
      ),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    // Halaman baru
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wishlist`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  return [...staticPages, ...categoryUrls, ...blogUrls];
}
