import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set headers untuk menghindari caching
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  try {
    if (req.method === 'POST') {
      const { slug } = req.body || req.query;

      if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
      }

      const pageView = await prisma.pageView.upsert({
        where: { slug: String(slug) },
        update: {
          count: { increment: 1 },
          updatedAt: new Date(), // Force update timestamp
        },
        create: {
          slug: String(slug),
          count: 1,
        },
      });

      return res.status(200).json({
        views: pageView.count,
        timestamp: new Date().getTime(), // Add timestamp untuk force fresh response
      });
    }

    if (req.method === 'GET') {
      const { slug } = req.query;

      if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
      }

      const pageView = await prisma.pageView.findUnique({
        where: { slug: String(slug) },
      });

      return res.status(200).json({
        views: pageView?.count ?? 0,
        timestamp: new Date().getTime(), // Add timestamp untuk force fresh response
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling page views:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
