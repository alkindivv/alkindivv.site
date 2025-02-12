import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

// Helper function untuk generate URL berdasarkan locale
function generateLocalizedUrl(baseUrl: string, path: string, locale: string) {
  if (locale === 'en') {
    return `${baseUrl}${path}`;
  }
  return `${baseUrl}/${locale}${path}`;
}

// Helper function untuk generate alternateRefs
function generateAlternateRefs(
  baseUrl: string,
  path: string,
  languages: string[]
) {
  return {
    languages: {
      'id-ID': generateLocalizedUrl(baseUrl, path, 'id'),
      'en-US': generateLocalizedUrl(baseUrl, path, 'en'),
    },
    canonical: generateLocalizedUrl(baseUrl, path, 'en'),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alkindivv.site';
  const languages = ['id', 'en'];

  // Get all blog posts for each language
  const allLanguagePosts = await Promise.all(
    languages.map(async (lang) => ({
      lang,
      posts: await getAllPosts(lang),
    }))
  );

  // Generate blog URLs for all languages
  const blogUrls = allLanguagePosts.flatMap(({ lang, posts }) =>
    posts.map((post) => {
      const path = `/blog/${post.category}/${post.slug}`;
      const alternates = generateAlternateRefs(baseUrl, path, languages);

      return {
        url: generateLocalizedUrl(baseUrl, path, lang),
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates,
      };
    })
  );

  // Get all unique categories
  const categories = Array.from(
    new Set(
      allLanguagePosts.flatMap(({ posts }) =>
        posts.map((post) => post.category)
      )
    )
  );

  // Generate category URLs
  const categoryUrls = categories.flatMap((category) => {
    const path = `/blog/${category}`;
    const alternates = generateAlternateRefs(baseUrl, path, languages);

    return languages.map((lang) => ({
      url: generateLocalizedUrl(baseUrl, path, lang),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates,
    }));
  });

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/blog', priority: 0.9, changeFreq: 'daily' as const },
    { path: '/books', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/resources', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/glossary', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/wishlist', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/docs', priority: 0.7, changeFreq: 'weekly' as const },
  ].flatMap(({ path, priority, changeFreq }) => {
    const alternates = generateAlternateRefs(baseUrl, path, languages);

    return languages.map((lang) => ({
      url: generateLocalizedUrl(baseUrl, path, lang),
      lastModified: new Date(),
      changeFrequency: changeFreq,
      priority,
      alternates,
    }));
  });

  // Sitemap index
  const sitemapIndex = {
    url: `${baseUrl}/sitemap.xml`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  };

  return [sitemapIndex, ...staticPages, ...categoryUrls, ...blogUrls];
}
