import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { withErrorHandler } from '@/lib/api-middleware';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const categories = await fs.readdir(BLOG_DIR);
    const validCategories = [];

    for (const category of categories) {
      const stats = await fs.stat(path.join(BLOG_DIR, category));
      if (stats.isDirectory()) {
        const categoryPath = path.join(BLOG_DIR, category);
        const files = await fs.readdir(categoryPath);
        const postCount = files.filter((file) => file.endsWith('.mdx')).length;
        const categoryName =
          category.charAt(0).toUpperCase() + category.slice(1);

        validCategories.push({
          name: categoryName,
          description: `Articles about ${categoryName.toLowerCase()} by AL KINDI`,
          slug: category.toLowerCase(),
          count: postCount,
        });
      }
    }

    return res.status(200).json(validCategories);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withErrorHandler(handler);
