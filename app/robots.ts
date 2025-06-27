import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site';

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/', // semua halaman
      ],
      disallow: [
        '/api/', // endpoint API memang tak perlu di-crawl
        '/**/?*q=', // query pencarian
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
