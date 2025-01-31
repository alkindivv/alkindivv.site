// import { NextApiRequest, NextApiResponse } from 'next';
// import nc from 'next-connect';
// import cors from 'cors';
// import prisma from '@/lib/prisma';

// const handler = nc<NextApiRequest, NextApiResponse>()
//   .use(cors())
//   .get(async (req, res) => {
//     try {
//       // Implement caching
//       res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

//       // Test koneksi
//       await prisma.$connect();

//       // Test query
//       const views = await prisma.pageView.findMany();

//       return res.status(200).json({
//         status: 'Connected',
//         views: views,
//       });
//     } catch (error) {
//       console.error('Database error:', error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

// export default handler;
