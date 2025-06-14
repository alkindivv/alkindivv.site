import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';

export const runtime = 'nodejs';
export const revalidate = 3600;

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  // Simple styling; in real world you can add background etc.
  try {
    const { frontMatter } = await getPostBySlug('cryptocurrency', slug).catch(
      () => ({ frontMatter: { title: slug } })
    );
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            color: 'white',
            background: 'linear-gradient(135deg,#0f0f0f 0%,#1a1a1a 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {(frontMatter as any).title ?? slug}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response('Failed to generate', { status: 500 });
  }
}
