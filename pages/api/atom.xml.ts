import { NextApiRequest, NextApiResponse } from 'next';
import { generateAtomFeed } from '@/lib/rss';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const atomFeed = await generateAtomFeed();

    res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
    res.status(200).send(atomFeed);
  } catch (error) {
    console.error('Error generating Atom feed:', error);
    res.status(500).json({ message: 'Error generating Atom feed' });
  }
}
