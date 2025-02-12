import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';

const errors = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 15 }, // Naik ke 15 users dalam 2 menit
    { duration: '5m', target: 15 }, // Bertahan di 15 users selama 5 menit
    { duration: '2m', target: 0 }, // Turun ke 0 users dalam 2 menit
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'], // 95% request harus selesai dalam 800ms
    errors: ['rate<0.1'], // Error rate harus di bawah 10%
  },
};

const BASE_URL = 'https://alkindivv.site';

const STATIC_PAGES = [
  '/', // Home
  '/about', // About
  '/blog', // Blog
  '/contact', // Contact
  '/books', // Books
  '/resources', // Resources
  '/glossary', // Glossary
  '/wishlist', // Wishlist
  '/docs', // Docs
];

const BLOG_CATEGORIES = ['law', 'corporate', 'cryptocurrency', 'technology'];

export default function () {
  group('Static Pages', function () {
    for (const page of STATIC_PAGES) {
      const res = http.get(`${BASE_URL}${page}`);
      check(res, {
        [`${page} status is 200`]: (r) => r.status === 200,
        [`${page} loads correctly`]: (r) => r.body.includes('AL KINDI'),
      }) || errors.add(1);
      sleep(1);
    }
  });

  group('Blog Categories', function () {
    for (const category of BLOG_CATEGORIES) {
      const res = http.get(`${BASE_URL}/blog/${category}`);
      check(res, {
        [`${category} category status is 200`]: (r) => r.status === 200,
        [`${category} category loads`]: (r) => r.body.includes('Articles'),
      }) || errors.add(1);
      sleep(1);
    }
  });

  group('Multi-language Support', function () {
    const languages = ['id', 'en'];
    const testPages = ['/', '/about', '/blog'];

    for (const lang of languages) {
      for (const page of testPages) {
        const res = http.get(`${BASE_URL}/${lang}${page}`);
        check(res, {
          [`${lang}${page} status is 200`]: (r) => r.status === 200,
        }) || errors.add(1);
      }
      sleep(1);
    }
  });

  group('API Endpoints', function () {
    // Test GET page views
    const viewsRes = http.get(`${BASE_URL}/api/page-views`);
    check(viewsRes, {
      'page-views GET status is 200': (r) => r.status === 200,
      'page-views returns valid JSON': (r) => {
        try {
          const body = JSON.parse(r.body);
          return body.hasOwnProperty('views');
        } catch {
          return false;
        }
      },
    }) || errors.add(1);

    // Test POST page view
    const payload = JSON.stringify({ slug: 'test-page' });
    const params = {
      headers: { 'Content-Type': 'application/json' },
    };

    const incrementRes = http.post(
      `${BASE_URL}/api/page-views`,
      payload,
      params
    );
    check(incrementRes, {
      'page-views POST status is 200': (r) => r.status === 200,
      'page-views increment successful': (r) => {
        try {
          const body = JSON.parse(r.body);
          return typeof body.views === 'number';
        } catch {
          return false;
        }
      },
    }) || errors.add(1);

    sleep(1);
  });

  group('RSS and Sitemap', function () {
    // Test RSS feed
    const rssRes = http.get(`${BASE_URL}/feed.xml`);
    check(rssRes, {
      'RSS feed status is 200': (r) => r.status === 200,
      'RSS feed is XML': (r) => r.headers['Content-Type'].includes('xml'),
    }) || errors.add(1);

    // Test Sitemaps
    const sitemaps = ['/sitemap.xml', '/sitemap-id.xml', '/sitemap-en.xml'];

    for (const sitemap of sitemaps) {
      const sitemapRes = http.get(`${BASE_URL}${sitemap}`);
      check(sitemapRes, {
        [`${sitemap} status is 200`]: (r) => r.status === 200,
        [`${sitemap} is XML`]: (r) => r.headers['Content-Type'].includes('xml'),
      }) || errors.add(1);
    }

    sleep(1);
  });
}
