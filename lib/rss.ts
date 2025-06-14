import { Feed } from 'feed';
import { getAllPosts } from './posts';

export async function generateRSSFeed() {
  const baseUrl = 'https://alkindivv.site';
  const posts = await getAllPosts();

  const feed = new Feed({
    title: 'AL KINDI - Law, Technology & Blockchain Expert',
    description:
      'Personal website of AL KINDI - A professional with expertise in Corporate Law, Technology, and Blockchain. Sharing insights on Mergers & Acquisitions, Capital Markets, and Cryptocurrency.',
    id: baseUrl,
    link: baseUrl,
    language: 'id',
    image: `${baseUrl}/images/AL-KINDI.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} AL KINDI. All rights reserved.`,
    updated: new Date(),
    generator: 'Next.js Feed Generator',
    feedLinks: {
      rss2: `${baseUrl}/feed.xml`,
      atom: `${baseUrl}/atom.xml`,
    },
    author: {
      name: 'AL KINDI',
      email: 'alkindivv@gmail.com',
      link: baseUrl,
    },
  });

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  sortedPosts.forEach((post) => {
    const postUrl = `${baseUrl}/blog/${post.category}/${post.slug}`;
    const description =
      post.description || post.excerpt || `Read more about ${post.title}`;

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: description,
      content: post.excerpt || description,
      author: [
        {
          name: post.author || 'AL KINDI',
          email: 'alkindivv@gmail.com',
          link: baseUrl,
        },
      ],
      date: new Date(post.date),
      category: post.tags?.map((tag) => ({ name: tag })) || [
        { name: post.category },
      ],
    });
  });

  return feed.rss2();
}

export async function generateAtomFeed() {
  const baseUrl = 'https://alkindivv.site';
  const posts = await getAllPosts();

  const feed = new Feed({
    title: 'AL KINDI - Law, Technology & Blockchain Expert',
    description:
      'Personal website of AL KINDI - A professional with expertise in Corporate Law, Technology, and Blockchain. Sharing insights on Mergers & Acquisitions, Capital Markets, and Cryptocurrency.',
    id: baseUrl,
    link: baseUrl,
    language: 'id',
    image: `${baseUrl}/images/AL-KINDI.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} AL KINDI. All rights reserved.`,
    updated: new Date(),
    generator: 'Next.js Feed Generator',
    feedLinks: {
      rss2: `${baseUrl}/feed.xml`,
      atom: `${baseUrl}/atom.xml`,
    },
    author: {
      name: 'AL KINDI',
      email: 'alkindivv@gmail.com',
      link: baseUrl,
    },
  });

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  sortedPosts.forEach((post) => {
    const postUrl = `${baseUrl}/blog/${post.category}/${post.slug}`;
    const description =
      post.description || post.excerpt || `Read more about ${post.title}`;

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: description,
      content: post.excerpt || description,
      author: [
        {
          name: post.author || 'AL KINDI',
          email: 'alkindivv@gmail.com',
          link: baseUrl,
        },
      ],
      date: new Date(post.date),
      category: post.tags?.map((tag) => ({ name: tag })) || [
        { name: post.category },
      ],
    });
  });

  return feed.atom1();
}
