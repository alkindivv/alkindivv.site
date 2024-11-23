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
    await prisma.$connect();

    if (req.method === 'POST') {
      const pageView = await prisma.pageView.upsert({
        where: { slug },
        update: { count: { increment: 1 } },
        create: { slug, count: 1 },
      });

      console.log(`Updated views for ${slug}:`, pageView.count);
      return res.status(200).json({ views: pageView.count });
    }

    const pageView = await prisma.pageView.findUnique({
      where: { slug },
    });

    console.log(`Retrieved views for ${slug}:`, pageView?.count ?? 0);
    return res.status(200).json({ views: pageView?.count ?? 0 });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      error: 'Database error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await prisma.$disconnect();
  }
}
