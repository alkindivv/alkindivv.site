import { generateAtomFeed } from '@/lib/rss';

export async function GET() {
  try {
    const atom = await generateAtomFeed();

    return new Response(atom, {
      headers: {
        'Content-Type': 'application/atom+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating Atom feed:', error);
    return new Response('Error generating Atom feed', { status: 500 });
  }
}
