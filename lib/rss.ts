import { Feed } from 'feed';
import { getAllPosts } from './posts';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkind.id';

// Shared feed configuration
const getFeedConfig = () => ({
  title: 'AL KINDI - Law, Technology, and Cryptocurrency',
  description:
    'A personal blog about law, technology, and cryptocurrency — shaping the future of blockchain and tech law. Insights on Corporate Law, M&A, Capital Markets, and Crypto Regulations.',
  id: baseUrl,
  link: baseUrl,
  language: 'id',
  image: `${baseUrl}/images/default.png`,
  favicon: `${baseUrl}/favicon.ico`,
  copyright: `© ${new Date().getFullYear()} AL KINDI. All rights reserved.`,
  updated: new Date(),
  generator: 'Next.js 14 with Feed',
  feedLinks: {
    rss2: `${baseUrl}/feed.xml`,
    atom: `${baseUrl}/atom.xml`,
    json: `${baseUrl}/feed.json`,
  },
  author: {
    name: 'AL KINDI',
    email: 'contact@alkind.id',
    link: baseUrl,
  },
  hub: `${baseUrl}/hub`,
  ttl: 60,
});

export async function generateRSSFeed() {
  const posts = await getAllPosts();
  const feed = new Feed(getFeedConfig());

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  sortedPosts.forEach((post) => {
    const postUrl = `${baseUrl}/blog/${post.category}/${post.slug}/`;
    const description =
      post.description || post.excerpt || `Read more about ${post.title}`;

    const imageUrl = post.featuredImage
      ? post.featuredImage.startsWith('http')
        ? post.featuredImage
        : `${baseUrl}${post.featuredImage}`
      : `${baseUrl}/images/default.png`;

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: description,
      content: post.excerpt || description,
      author: [
        {
          name: post.author || 'AL KINDI',
          email: 'contact@alkind.id',
          link: baseUrl,
        },
      ],
      date: new Date(post.date),
      published: new Date(post.date),
      image: imageUrl,
      category: [
        { name: post.category, domain: `${baseUrl}/blog/${post.category}/` },
        ...(post.tags?.map((tag) => ({
          name: tag,
          domain: `${baseUrl}/blog/tag/${tag}/`,
        })) || []),
      ],
      guid: postUrl,
      extensions: [
        {
          name: '_reading_time',
          objects: {
            value: post.readingTime ? `${post.readingTime} min` : '5 min',
          },
        },
      ],
    });
  });

  return feed.rss2();
}

export async function generateAtomFeed() {
  const posts = await getAllPosts();
  const feed = new Feed(getFeedConfig());

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  sortedPosts.forEach((post) => {
    const postUrl = `${baseUrl}/blog/${post.category}/${post.slug}/`;
    const description =
      post.description || post.excerpt || `Read more about ${post.title}`;

    const imageUrl = post.featuredImage
      ? post.featuredImage.startsWith('http')
        ? post.featuredImage
        : `${baseUrl}${post.featuredImage}`
      : `${baseUrl}/images/default.png`;

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: description,
      content: post.excerpt || description,
      author: [
        {
          name: post.author || 'AL KINDI',
          email: 'contact@alkind.id',
          link: baseUrl,
        },
      ],
      date: new Date(post.date),
      published: new Date(post.date),
      image: imageUrl,
      category: [
        { name: post.category, domain: `${baseUrl}/blog/${post.category}/` },
        ...(post.tags?.map((tag) => ({
          name: tag,
          domain: `${baseUrl}/blog/tag/${tag}/`,
        })) || []),
      ],
      guid: postUrl,
      extensions: [
        {
          name: '_reading_time',
          objects: {
            value: post.readingTime ? `${post.readingTime} min` : '5 min',
          },
        },
      ],
    });
  });

  return feed.atom1();
}
