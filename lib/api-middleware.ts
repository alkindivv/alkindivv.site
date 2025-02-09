import { NextApiRequest, NextApiResponse } from 'next';

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;

export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      console.error('API Error:', error);

      // Handle Prisma errors
      if (error?.code === 'P2002') {
        return res.status(409).json({
          error: 'Data already exists',
        });
      }

      // Handle validation errors
      if (error?.name === 'ValidationError') {
        return res.status(400).json({
          error: error.message,
        });
      }

      // Handle other errors
      const statusCode = error?.statusCode || 500;
      const message =
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Internal server error';

      res.status(statusCode).json({
        error: message,
      });
    }
  };
}
