import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site';

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/', // semua halaman
        '/_next/static/', // JS, CSS, font
        '/_next/image/', // gambar yang di-optimize
      ],
      disallow: [
        '/api/', // endpoint API memang tak perlu di-crawl
        '/search', // halaman pencarian internal
        '/**/?*q=', // query pencarian
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
