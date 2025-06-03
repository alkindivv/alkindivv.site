/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://alkindivv.site',
  generateRobotsTxt: false, // We have custom robots.ts
  generateIndexSitemap: true,
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/private/*',
    '/temp/*',
    '/draft/*',
    '/404',
    '/500',
  ],
  // Add XSL stylesheet for better browser display
  additionalSitemaps: [],
  additionalPaths: async (config) => {
    const result = [];

    // Add dynamic blog category pages
    const categories = ['law', 'cryptocurrency', 'technology'];
    categories.forEach((category) => {
      result.push({
        loc: `/blog/${category}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
    });

    // Add tag pages if you have them
    const tags = [
      'corporate-law',
      'blockchain',
      'capital-markets',
      'm-a',
      'cryptocurrency',
    ];
    tags.forEach((tag) => {
      result.push({
        loc: `/blog/tag/${tag}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      });
    });

    return result;
  },
  // Remove robotsTxtOptions since we have custom robots.ts
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7;
    let changefreq = 'monthly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/blog/')) {
      if (path.split('/').length === 3) {
        // Category pages
        priority = 0.9;
        changefreq = 'weekly';
      } else {
        // Individual blog posts
        priority = 0.8;
        changefreq = 'monthly';
      }
    } else if (['/about', '/contact', '/blog'].includes(path)) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (['/resources', '/books', '/glossary'].includes(path)) {
      priority = 0.7;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://alkindivv.site${path}`,
          hreflang: 'id',
        },
      ],
    };
  },
};
