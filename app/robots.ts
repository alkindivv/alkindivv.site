import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/admin/*', '/_next/*', '/*.json$', '/*.xml$'],
    },
    sitemap: 'https://alkindivv.site/sitemap.xml',
  };
}
