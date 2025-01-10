import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/static/',
        '/admin/',
        '/draft/',
        '/preview/',
      ],
    },
    sitemap: 'https://alkindivv.site/sitemap.xml',
  };
}