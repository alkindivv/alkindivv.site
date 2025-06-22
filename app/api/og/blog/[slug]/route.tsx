import { ImageResponse } from 'next/og';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

export const runtime = 'nodejs';
export const revalidate = 3600;

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    // Temukan kategori berdasarkan slug
    const allPosts = await getAllPosts();
    const found = allPosts.find((p) => p.slug === slug);

    let titleToRender = slug;

    if (found) {
      try {
        const { frontMatter } = await getPostBySlug(found.category, slug);
        titleToRender = (frontMatter as any).title ?? slug;
      } catch {
        titleToRender = found.title;
      }
    }

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
            padding: '0 60px',
            textAlign: 'center',
          }}
        >
          {titleToRender}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
