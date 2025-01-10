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
        userAgent: 'Googlebot',
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
        allow: [
          '/images/',
          '/*.jpg',
          '/*.jpeg',
          '/*.gif',
          '/*.png',
          '/*.webp',
          '/*.svg',
        ],
        disallow: '/',
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/blog/',
        disallow: '/',
      },
    ],
    sitemap: 'https://alkindivv.site/sitemap.xml',
    host: 'https://alkindivv.site',
  };
}
