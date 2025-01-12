import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alkindivv.site';

  // Base routes - static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  try {
    // Get all blog posts
    const posts = await getAllPosts();

    // Create category routes from unique categories in posts
    const categories = Array.from(
      new Set(posts.map((post) => post.category?.toLowerCase()))
    ).filter(Boolean);

    const categoryRoutes = categories.map((category) => ({
      url: `${baseUrl}/blog/${category}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Create routes for each blog post
    const postRoutes = posts
      .filter((post) => post.slug && post.category) // Only include posts with slug and category
      .map((post) => {
        const postDate = new Date(post.date);
        const isRecent =
          new Date().getTime() - postDate.getTime() < 30 * 24 * 60 * 60 * 1000; // 30 days

        return {
          url: `${baseUrl}/blog/${post.category.toLowerCase()}/${post.slug}`,
          lastModified: postDate.toISOString(),
          changeFrequency: isRecent ? ('daily' as const) : ('monthly' as const),
          priority: isRecent ? 0.9 : 0.7,
        };
      });

    // Combine all routes
    return [...routes, ...categoryRoutes, ...postRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return base routes if there's an error
    return routes;
  }
}
