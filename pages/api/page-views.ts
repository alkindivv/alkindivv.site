import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { slug } = req.body || req.query;

      if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
      }

      // Increment views
      const pageView = await prisma.pageView.upsert({
        where: { slug: String(slug) },
        update: { count: { increment: 1 } },
        create: { slug: String(slug), count: 1 },
      });

      console.log(`Views incremented for ${slug}:`, pageView.count);
      return res.status(200).json({ views: pageView.count });
    }

    if (req.method === 'GET') {
      const { slug } = req.query;

      if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
      }

      // Get current views
      const pageView = await prisma.pageView.findUnique({
        where: { slug: String(slug) },
      });

      console.log(`Current views for ${slug}:`, pageView?.count ?? 0);
      return res.status(200).json({ views: pageView?.count ?? 0 });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling page views:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
