import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug as string;

  if (!slug) {
    return res.status(400).json({ error: 'Slug is required' });
  }

  try {
    if (req.method === 'POST') {
      // Increment views
      const pageView = await prisma.pageView.upsert({
        where: { slug },
        update: { count: { increment: 1 } },
        create: { slug, count: 1 },
      });

      return res.status(200).json({ views: pageView.count });
    }

    // GET request - return current views
    const pageView = await prisma.pageView.findUnique({
      where: { slug },
    });

    return res.status(200).json({ views: pageView?.count ?? 0 });
  } catch (error) {
    console.error('Error handling page views:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
