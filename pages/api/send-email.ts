import type { NextApiRequest, NextApiResponse } from 'next';

// Rate limiting
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
};

const rateLimit = new Map();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Simple rate limiting
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;

  const requestTimestamps = rateLimit.get(ip) || [];
  const requestsInWindow = requestTimestamps.filter(
    (timestamp: number) => timestamp > windowStart
  );

  if (requestsInWindow.length >= RATE_LIMIT.max) {
    return res
      .status(429)
      .json({ message: 'Too many requests, please try again later.' });
  }

  try {
    const { user_name, user_email, subject, message } = req.body;

    // Validate inputs
    if (!user_name || !user_email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Update rate limit
    requestTimestamps.push(now);
    rateLimit.set(ip, requestTimestamps);

    // Return success - actual email sending will happen on client side
    return res.status(200).json({
      success: true,
      message: 'Form validation successful',
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Failed to process request',
    });
  }
}
