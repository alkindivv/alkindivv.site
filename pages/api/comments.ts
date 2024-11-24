import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    const { postSlug } = req.query;

    try {
      const comments = await prisma.comment.findMany({
        where: {
          postSlug: postSlug as string,
          parentId: null,
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
          replies: {
            include: {
              author: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ error: 'Failed to fetch comments' });
    }
  }

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { content, postSlug, parentId } = req.body;

    try {
      const comment = await prisma.$transaction(async (tx) => {
        // Check if post exists
        let post = await tx.post.findUnique({
          where: { slug: postSlug },
        });

        // Create post if it doesn't exist
        if (!post) {
          post = await tx.post.create({
            data: {
              slug: postSlug,
              title: postSlug,
            },
          });
        }

        // Create comment with optional parentId
        return await tx.comment.create({
          data: {
            content,
            author: {
              connect: {
                email: session.user?.email!,
              },
            },
            post: {
              connect: {
                slug: postSlug,
              },
            },
            ...(parentId && {
              parent: {
                connect: {
                  id: parentId,
                },
              },
            }),
          },
          include: {
            author: {
              select: {
                name: true,
                image: true,
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        });
      });

      return res.status(201).json(comment);
    } catch (error) {
      console.error('Error creating comment:', error);
      return res.status(500).json({ error: 'Failed to post comment' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
