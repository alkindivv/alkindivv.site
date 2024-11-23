import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Test koneksi
    await prisma.$connect();

    // Test query
    const views = await prisma.pageView.findMany();

    return res.status(200).json({
      status: 'Connected',
      views: views,
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
}
