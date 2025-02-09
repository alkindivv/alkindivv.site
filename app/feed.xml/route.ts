import { getAllPosts } from '@/lib/mdx';
import RSS from 'rss';

export async function GET() {
  try {
    const posts = await getAllPosts();
    const site_url =
      process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site';

    const feedOptions = {
      title: 'AL KINDI Blog | RSS Feed',
      description:
        'Articles about law, technology, and cryptocurrency by AL KINDI. Exploring corporate law, capital markets, M&A, and blockchain technology.',
      generator: 'AL KINDI Blog RSS Feed',
      site_url,
      feed_url: `${site_url}/feed.xml`,
      image_url: `${site_url}/images/AL-KINDI.png`,
      pubDate: new Date(),
      copyright: `All rights reserved ${new Date().getFullYear()}, AL KINDI`,
      language: 'id',
      categories: [
        'Law',
        'Technology',
        'Cryptocurrency',
        'Capital Markets',
        'M&A',
        'Blockchain',
        'Corporate Law',
      ],
      custom_namespaces: {
        dc: 'http://purl.org/dc/elements/1.1/',
        content: 'http://purl.org/rss/1.0/modules/content/',
        atom: 'http://www.w3.org/2005/Atom',
      },
    };

    const feed = new RSS(feedOptions);

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Add items to feed
    sortedPosts.forEach((post) => {
      feed.item({
        title: post.title,
        description: post.description || post.excerpt || '',
        url: `${site_url}/blog/${post.category}/${post.slug}`,
        guid: `${site_url}/blog/${post.category}/${post.slug}`,
        categories: [post.category, ...(post.tags || [])],
        author: post.author,
        date: new Date(post.date),
        custom_elements: [
          { 'dc:creator': post.author },
          { pubDate: new Date(post.date).toUTCString() },
          { 'content:encoded': post.description || post.excerpt || '' },
          { 'atom:updated': new Date(post.date).toISOString() },
        ],
        enclosure: post.featuredImage
          ? {
              url: `${site_url}${post.featuredImage}`,
              type: 'image/jpeg',
            }
          : undefined,
      });
    });

    // Return the feed with proper headers
    return new Response(feed.xml({ indent: true }), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=21600',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}
