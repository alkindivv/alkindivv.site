import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { withErrorHandler } from '@/lib/api-middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.method === 'GET' ? req.query : req.body;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug is required' });
  }

  if (req.method === 'GET') {
    const pageView = await prisma.pageView.findUnique({
      where: { slug },
      select: { count: true },
    });

    return res.status(200).json({ views: pageView?.count ?? 0 });
  }

  if (req.method === 'POST') {
    const pageView = await prisma.pageView.upsert({
      where: { slug },
      create: { slug, count: 1 },
      update: { count: { increment: 1 } },
    });

    return res.status(200).json({ views: pageView.count });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withErrorHandler(handler);
