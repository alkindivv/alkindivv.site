import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '/admin/',
          '/draft/',
          '/preview/',
          '/*?*',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        disallow: ['/'],
        allow: [
          '/images/*',
          '*.jpg',
          '*.jpeg',
          '*.gif',
          '*.png',
          '*.webp',
          '*.svg',
        ],
      },
      {
        userAgent: 'Googlebot-News',
        disallow: ['/'],
        allow: ['/blog/*'],
      },
    ],
    sitemap: 'https://alkindivv.site/sitemap.xml',
    host: 'https://alkindivv.site',
  };
}
