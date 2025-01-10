import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';

type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alkindivv.site';
  const posts = getAllPosts();
  const categories = getAllCategories();

  // Homepage
  const homeRoute = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  };

  // Main pages
  const mainRoutes = [
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Category pages
  const categoryRoutes = categories
    .filter((category) => category.slug)
    .map((category) => ({
      url: `${baseUrl}/blog/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Blog posts
  const postRoutes = posts
    .filter((post) => post.slug && post.category)
    .map((post) => {
      const postDate = new Date(post.date);
      const isRecent =
        new Date().getTime() - postDate.getTime() < 60 * 24 * 60 * 60 * 1000;
      const changeFrequency: ChangeFreq = isRecent ? 'daily' : 'weekly';

      return {
        url: `${baseUrl}/blog/${post.category}/${post.slug}`,
        lastModified: postDate,
        changeFrequency,
        priority: isRecent ? 0.8 : 0.6,
        ...(post.featuredImage && {
          images: [`${baseUrl}${post.featuredImage}`],
        }),
      };
    });

  return [homeRoute, ...mainRoutes, ...categoryRoutes, ...postRoutes];
}
