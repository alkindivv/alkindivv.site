import { GetServerSideProps } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';

const Sitemap = () => null;

// Fungsi untuk mengenkode karakter khusus XML
const encodeXMLChars = (str: string) => {
  if (!str) return '';
  return str
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, '&amp;') // Replace & not part of existing entities
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '') // Hanya izinkan ASCII dan Latin-1
    .trim();
};

// Fungsi untuk memvalidasi URL
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return url.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/i) !== null;
  } catch {
    return false;
  }
};

// Fungsi untuk membersihkan URL
const cleanUrl = (url: string) => {
  if (!url) return '';
  return url
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-_.~/]/g, '')
    .toLowerCase();
};

// Fungsi untuk memvalidasi dan membersihkan URL gambar
const cleanImageUrl = (imageUrl: string, baseUrl: string) => {
  if (!imageUrl) return '';

  // Jika URL dimulai dengan https://images.unsplash.com, gunakan URL lengkap
  if (imageUrl.startsWith('https://images.unsplash.com')) {
    return imageUrl;
  }

  // Jika URL sudah memiliki baseUrl, jangan tambahkan lagi
  if (imageUrl.startsWith(baseUrl)) {
    return imageUrl;
  }

  // Jika URL dimulai dengan https://, kembalikan apa adanya
  if (imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Jika URL dimulai dengan //, tambahkan https:
  if (imageUrl.startsWith('//')) {
    return `https:${imageUrl}`;
  }

  // Jika URL dimulai dengan /, gabungkan dengan baseUrl
  if (imageUrl.startsWith('/')) {
    return `${baseUrl}${imageUrl}`;
  }

  // Default: tambahkan baseUrl dan /
  return `${baseUrl}/${imageUrl}`;
};

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
      <image:loc>${cleanImageUrl('/images/ALKINDI-bg.PNG', baseUrl)}</image:loc>
      <image:title>${encodeXMLChars('AL KINDI - Law, Technology, and Cryptocurrency')}</image:title>
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
    .filter((category) => category.slug)
    .map(
      (category) => `
  <url>
    <loc>${baseUrl}/blog/${cleanUrl(category.slug)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n')}

  <!-- Blog Posts -->
  ${posts
    .filter((post) => post.slug && post.category)
    .map((post) => {
      const postDate = new Date(post.date);
      const isRecent =
        new Date().getTime() - postDate.getTime() < 60 * 24 * 60 * 60 * 1000; // 60 days

      const postUrl = `${baseUrl}/blog/${cleanUrl(post.category)}/${cleanUrl(
        post.slug
      )}`;

      if (!isValidUrl(postUrl)) return '';

      const imageSection = post.featuredImage
        ? `
    <image:image>
      <image:loc>${cleanImageUrl(post.featuredImage, baseUrl)}</image:loc>
      <image:title>${encodeXMLChars(post.title)}</image:title>
      ${
        post.excerpt
          ? `<image:caption>${encodeXMLChars(post.excerpt)}</image:caption>`
          : ''
      }
    </image:image>`
        : '';

      const newsSection = isRecent
        ? `
    <news:news>
      <news:publication>
        <news:name>AL KINDI</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.date).toISOString()}</news:publication_date>
      <news:title>${encodeXMLChars(post.title)}</news:title>
    </news:news>`
        : '';

      return `
  <url>
    <loc>${postUrl}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>${isRecent ? 'daily' : 'weekly'}</changefreq>
    <priority>${isRecent ? '0.8' : '0.6'}</priority>${imageSection}${newsSection}
  </url>`;
    })
    .filter(Boolean)
    .join('\n')}
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
