import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.slug as string;

    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    if (req.method === 'POST') {
      const pageView = await prisma.pageView.upsert({
        where: { slug },
        update: {
          count: {
            increment: 1,
          },
        },
        create: {
          slug,
          count: 1,
        },
      });

      return res.status(200).json({ views: pageView.count });
    }

    if (req.method === 'GET') {
      const pageView = await prisma.pageView.findUnique({
        where: { slug },
      });

      return res.status(200).json({ views: pageView?.count ?? 0 });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in page-views API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
