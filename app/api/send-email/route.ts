import { NextResponse } from 'next/server';
import { z } from 'zod';

// Rate limiting
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
};

// In-memory storage for rate limiting
const rateLimit = new Map();

const ContactSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email(),
  subject: z.string().max(120).optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    // Extract client IP (may need additional headers in production environments)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - RATE_LIMIT.windowMs;

    const requestTimestamps = rateLimit.get(ip) || [];
    const requestsInWindow = requestTimestamps.filter(
      (timestamp: number) => timestamp > windowStart
    );

    if (requestsInWindow.length >= RATE_LIMIT.max) {
      return NextResponse.json(
        { error: 'Too many requests, please try again later.' },
        { status: 429 }
      );
    }

    // Update rate limit
    requestTimestamps.push(now);
    rateLimit.set(ip, requestTimestamps);

    const body = await request.json();
    const parseResult = ContactSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message, subject } = parseResult.data;

    // Here you would normally send an email using your preferred email service
    // For example, using a service like SendGrid, Mailgun, or AWS SES

    // For now, we'll just log the data and return a success response
    console.log('Contact form submission:', { name, email, subject, message });

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
