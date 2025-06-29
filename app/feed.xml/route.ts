import { getAllPosts } from '@/lib/posts';
import RSS from 'rss';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkind.id';
  const posts = await getAllPosts();

  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Create RSS feed
  const feed = new RSS({
    title: 'AL KINDI - Law, Technology, and Cryptocurrency',
    description:
      'Insights and articles on law, technology, and cryptocurrency by AL KINDI',
    site_url: baseUrl,
    feed_url: `${baseUrl}/feed.xml`,
    image_url: `${baseUrl}/images/default.png`,
    language: 'id',
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} AL KINDI`,
    managingEditor: 'alkindivv@gmail.com (AL KINDI)',
    webMaster: 'alkindivv@gmail.com (AL KINDI)',
    ttl: 60,
    generator: 'Next.js RSS Generator',
    docs: 'https://www.rssboard.org/rss-specification',
    custom_namespaces: {
      dc: 'http://purl.org/dc/elements/1.1/',
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom',
    },
    custom_elements: [
      {
        'atom:link': {
          _attr: {
            href: `${baseUrl}/feed.xml`,
            rel: 'self',
            type: 'application/rss+xml',
          },
        },
      },
      { 'dc:creator': 'AL KINDI' },
      { 'dc:rights': `© ${new Date().getFullYear()} AL KINDI` },
      { 'dc:language': 'id' },
    ],
  });

  // Add posts to feed
  sortedPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt || post.description || '',
      url: `${baseUrl}/blog/${post.category}/${post.slug}`,
      categories: [post.category, ...(post.tags || [])],
      author: `${post.author} <alkindivv@gmail.com>`,
      date: new Date(post.date),
      guid: `${baseUrl}/blog/${post.category}/${post.slug}`,
      custom_elements: [
        { 'dc:creator': post.author },
        {
          'content:encoded': { _cdata: post.excerpt || post.description || '' },
        },
        ...(post.readingTime
          ? [{ 'dc:format': `${post.readingTime} min read` }]
          : []),
      ],
      enclosure: post.featuredImage
        ? {
            url: post.featuredImage.startsWith('http')
              ? post.featuredImage
              : `${baseUrl}${post.featuredImage}`,
            type: 'image/jpeg',
          }
        : undefined,
    });
  });

  // Return the feed
  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=3600, s-maxage=3600',
    },
  });
}
