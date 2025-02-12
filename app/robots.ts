import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/admin/*',
          '/_next/*',
          '/*.json$',
          '/*.xml$',
          '/*/preview',
          '/search',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/*.xml$', // Izinkan Googlebot mengakses file XML
      },
    ],
    sitemap: 'https://alkindivv.site/sitemap.xml',
    host: 'https://alkindivv.site',
  };
}
