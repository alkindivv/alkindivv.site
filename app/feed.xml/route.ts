import { getAllPosts } from '@/lib/mdx';
import RSS from 'rss';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site';
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
  });

  // Add posts to feed
  sortedPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt || post.description || '',
      url: `${baseUrl}/blog/${post.category}/${post.slug}`,
      categories: [post.category, ...(post.tags || [])],
      author: post.author,
      date: new Date(post.date),
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
    },
  });
}
