import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow:
        '/api/\n/private/\n/_next/\n/static/\n/admin/\n/draft/\n/preview/',
    },
    sitemap: 'https://alkindivv.site/sitemap.xml',
  };
}
