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
      // First, get the post ID from slug
      const post = await prisma.post.findUnique({
        where: { slug: postSlug as string },
        select: { id: true, authorId: true },
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Then get comments for this post
      const comments = await prisma.comment.findMany({
        where: {
          postId: post.id,
          parentId: null, // Only get top-level comments
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          replies: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Add isAuthor flag
      const commentsWithFlags = comments.map((comment) => ({
        ...comment,
        isAuthor: comment.author.id === post.authorId,
        replies: comment.replies.map((reply) => ({
          ...reply,
          isAuthor: reply.author.id === post.authorId,
        })),
      }));

      return res.status(200).json(commentsWithFlags);
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
      // Get user
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email! },
        select: { id: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Get post
      const post = await prisma.post.findUnique({
        where: { slug: postSlug },
        select: { id: true, authorId: true },
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Create comment
      const comment = await prisma.comment.create({
        data: {
          content,
          authorId: user.id,
          postId: post.id,
          ...(parentId && { parentId }),
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      // Add isAuthor flag
      const commentWithFlag = {
        ...comment,
        isAuthor: comment.author.id === post.authorId,
      };

      return res.status(201).json(commentWithFlag);
    } catch (error) {
      console.error('Error creating comment:', error);
      return res.status(500).json({ error: 'Failed to post comment' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
