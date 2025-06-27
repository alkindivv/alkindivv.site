import { ImageResponse } from 'next/og';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { promises as fs } from 'fs';
import path from 'path';

// Muat font dan logo dari folder public (sekali per cold start)
const DMSansBold = fs
  .readFile(path.join(process.cwd(), 'public', 'fonts', 'DMSans-Bold.ttf'))
  .then((buf) => new Uint8Array(buf).buffer);

const DMSansRegular = fs
  .readFile(path.join(process.cwd(), 'public', 'fonts', 'DMSans-Regular.ttf'))
  .then((buf) => new Uint8Array(buf).buffer);

const logoDataUrlPromise = fs
  .readFile(path.join(process.cwd(), 'public', 'logo.svg'))
  .then((buf) => `data:image/svg+xml;base64,${buf.toString('base64')}`);

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
    let excerptToRender: string | null = null;

    if (found) {
      try {
        const { frontMatter } = await getPostBySlug(found.category, slug);
        titleToRender = (frontMatter as any).title ?? slug;
        excerptToRender =
          (frontMatter as any).excerpt ||
          (frontMatter as any).description ||
          found.excerpt ||
          null;
      } catch {
        titleToRender = found.title;
      }
    }

    // Pastikan font sudah tersedia
    const [boldFont, regularFont, logoDataUrl] = await Promise.all([
      DMSansBold,
      DMSansRegular,
      logoDataUrlPromise,
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            position: 'relative',
            background: '#0d0d0d',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '0 100px',
            textAlign: 'left',
          }}
        >
          {/* Accent bar kiri */}
          {/* <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: 16,
              backgroundColor: '#08c488',
            }}
          /> */}

          {/* Logo */}
          <img
            src={logoDataUrl}
            alt="logo"
            width={240}
            height={240}
            style={{ width: 120, height: 120, marginBottom: 32 }}
          />

          {/* Judul */}
          <h1
            style={{
              fontFamily: 'DMSans-Bold',
              fontSize: 58,
              fontWeight: 700,
              margin: 0,
              color: '#f3f4f6',
              maxWidth: 1800,
            }}
          >
            {titleToRender}
          </h1>

          {/* Deskripsi / excerpt */}
          {excerptToRender && (
            <p
              style={{
                fontSize: 24,
                color: '#9C9C9C',
                marginTop: 24,
                maxWidth: 1800,
                lineHeight: 1.4,
                fontWeight: 400,
                fontFamily: 'DMSans-Regular',
              }}
            >
              {excerptToRender}
            </p>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'DMSans-Regular',
            data: regularFont,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'DMSans-Bold',
            data: boldFont,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e) {
    console.error('OG Img error:', e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
