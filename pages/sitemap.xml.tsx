import { GetServerSideProps } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://alkindivv.site';
  const posts = getAllPosts();
  const categories = getAllCategories();
  const currentDate = new Date().toISOString();

  // Generate sitemap XML with advanced features
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

      <!-- Homepage -->
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        <image:image>
          <image:loc>${baseUrl}/images/ALKINDI-bg.PNG</image:loc>
          <image:title>AL KINDI - Law, Technology, and Cryptocurrency</image:title>
        </image:image>
      </url>

      <!-- Main Pages -->
      <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>

      <url>
        <loc>${baseUrl}/blog</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>

      <url>
        <loc>${baseUrl}/contact</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>

      <!-- Category Pages -->
      ${categories
        .map(
          (category) => `
        <url>
          <loc>${baseUrl}/blog/${category.slug}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join('')}

      <!-- Blog Posts -->
      ${posts
        .map((post) => {
          const postDate = new Date(post.date);
          const isRecent =
            new Date().getTime() - postDate.getTime() <
            60 * 24 * 60 * 60 * 1000; // 60 days

          return `
          <url>
            <loc>${baseUrl}/blog/${post.category}/${post.slug}</loc>
            <lastmod>${new Date(post.date).toISOString()}</lastmod>
            <changefreq>${isRecent ? 'daily' : 'weekly'}</changefreq>
            <priority>${isRecent ? '0.8' : '0.6'}</priority>
            ${
              post.featuredImage
                ? `
            <image:image>
              <image:loc>${baseUrl}${post.featuredImage}</image:loc>
              <image:title>${post.title}</image:title>
              <image:caption>${post.excerpt || post.title}</image:caption>
            </image:image>
            `
                : ''
            }
            ${
              isRecent
                ? `
            <news:news>
              <news:publication>
                <news:name>AL KINDI</news:name>
                <news:language>id</news:language>
              </news:publication>
              <news:publication_date>${new Date(post.date).toISOString()}</news:publication_date>
              <news:title>${post.title}</news:title>
            </news:news>
            `
                : ''
            }
          </url>
        `;
        })
        .join('')}
    </urlset>`;

  // Set cache headers for better performance
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
