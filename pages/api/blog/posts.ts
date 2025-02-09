import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { withErrorHandler } from '@/lib/api-middleware';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Helper function to create SEO-friendly slug
function createSEOSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&]/g, '-and-')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { category, slug } = req.query;

    // Get single post
    if (category && slug) {
      const fullPath = path.join(
        BLOG_DIR,
        String(category),
        `${String(slug)}.mdx`
      );

      try {
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data: frontMatter, content } = matter(fileContents);

        return res.status(200).json({
          frontMatter: {
            ...frontMatter,
            readingTime: Math.ceil(readingTime(content).minutes),
          },
          content,
        });
      } catch (error) {
        return res.status(404).json({ error: 'Post not found' });
      }
    }

    // Get all posts
    const categories = await fs.readdir(BLOG_DIR);
    const posts = [];

    for (const category of categories) {
      const categoryPath = path.join(BLOG_DIR, category);
      const stats = await fs.stat(categoryPath);
      if (!stats.isDirectory()) continue;

      const files = await fs.readdir(categoryPath);
      for (const file of files) {
        if (!file.endsWith('.mdx')) continue;

        const filePath = path.join(categoryPath, file);
        const source = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(source);

        if (!data.title || !data.date) continue;

        posts.push({
          title: data.title,
          date: new Date(data.date).toISOString(),
          author: data.author || 'AL KINDI',
          category: createSEOSlug(data.category || category),
          excerpt: data.excerpt || content.slice(0, 200) + '...',
          description:
            data.description || data.excerpt || content.slice(0, 200) + '...',
          tags: Array.isArray(data.tags) ? data.tags : [],
          featuredImage: data.featuredImage || null,
          slug: file.replace(/\.mdx$/, ''),
          readingTime: Math.ceil(readingTime(content).minutes),
        });
      }
    }

    return res.status(200).json(posts);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withErrorHandler(handler);
