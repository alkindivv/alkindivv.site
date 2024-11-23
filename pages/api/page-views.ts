import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  try {
    if (req.method === 'POST') {
      const { slug } = req.body;

      const pageView = await prisma.pageView.upsert({
        where: { slug },
        create: {
          slug,
          count: 1,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      return res.status(200).json({ views: pageView.count });
    }

    if (req.method === 'GET') {
      const { slug } = req.query;
      const pageView = await prisma.pageView.findUnique({
        where: { slug: String(slug) },
      });

      return res.status(200).json({ views: pageView?.count ?? 0 });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling page views:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
