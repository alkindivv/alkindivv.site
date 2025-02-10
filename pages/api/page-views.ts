import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { withErrorHandler } from '@/lib/api-middleware';

type ResponseData = {
  views: number | Record<string, number>;
  error?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Handle GET request
  if (req.method === 'GET') {
    try {
      // Get all views
      const pageViews = await prisma.pageView.findMany();
      const views = pageViews.reduce(
        (acc, view) => ({
          ...acc,
          [view.slug]: view.count,
        }),
        {}
      );
      return res.status(200).json({ views });
    } catch (error) {
      console.error('Failed to fetch views:', error);
      return res
        .status(500)
        .json({ views: {}, error: 'Internal server error' });
    }
  }

  // Handle POST request (increment view)
  if (req.method === 'POST') {
    try {
      const { slug } = req.body;

      if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ views: 0, error: 'Slug is required' });
      }

      const pageView = await prisma.pageView.upsert({
        where: { slug },
        create: { slug, count: 1 },
        update: { count: { increment: 1 } },
      });

      return res.status(200).json({ views: pageView.count });
    } catch (error) {
      console.error('Failed to increment view:', error);
      return res.status(500).json({ views: 0, error: 'Internal server error' });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({ views: 0, error: 'Method not allowed' });
}

export default withErrorHandler(handler);
