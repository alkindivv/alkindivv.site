import { ImageResponse } from 'next/og';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { promises as fs } from 'fs';
import path from 'path';

// Muat font dan logo dari folder public (sekali per cold start)
const dmSansBold = fs
  .readFile(path.join(process.cwd(), 'public', 'fonts', 'DMSans-Bold.ttf'))
  .then((buf) => new Uint8Array(buf).buffer);

const dmSansRegular = fs
  .readFile(path.join(process.cwd(), 'public', 'fonts', 'DMSans-Regular.ttf'))
  .then((buf) => new Uint8Array(buf).buffer);

const logoDataUrlPromise = fs
  .readFile(path.join(process.cwd(), 'public', 'logo.svg'))
  .then((buf) => `data:image/svg+xml;base64,${buf.toString('base64')}`);

// Default author image
const defaultAuthorImagePromise = fs
  .readFile(path.join(process.cwd(), 'public', 'images', 'AL-KINDI.png'))
  .then((buf) => `data:image/png;base64,${buf.toString('base64')}`);

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
    let authorName = 'AL KINDI';
    let category = '';
    let publishDate = new Date();

    if (found) {
      try {
        const { frontMatter } = await getPostBySlug(found.category, slug);
        titleToRender = (frontMatter as any).title ?? slug;
        excerptToRender =
          (frontMatter as any).excerpt ||
          (frontMatter as any).description ||
          found.excerpt ||
          null;
        authorName = (frontMatter as any).author || found.author || 'AL KINDI';
        category = found.category || '';

        // Gunakan tanggal artikel asli
        if ((frontMatter as any).date) {
          publishDate = new Date((frontMatter as any).date);
        } else if (found.date) {
          publishDate = new Date(found.date);
        }
      } catch {
        titleToRender = found.title;
        authorName = found.author || 'AL KINDI';
        category = found.category || '';

        // Gunakan tanggal dari data post jika ada
        if (found.date) {
          publishDate = new Date(found.date);
        }
      }
    }

    // Pastikan font dan assets sudah tersedia
    const [boldFont, regularFont, logoDataUrl, defaultAuthorImage] =
      await Promise.all([
        dmSansBold,
        dmSansRegular,
        logoDataUrlPromise,
        defaultAuthorImagePromise,
      ]);

    // Format tanggal menggunakan tanggal artikel
    const formattedDate = publishDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return new ImageResponse(
      (
        <div
          style={{
            position: 'relative',
            // background: 'linear-gradient(to bottom right, #0d0d0d, #111827)',
            background: '#121212',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '60px',
            overflow: 'hidden',
          }}
        >
          {/* Accent elements */}
          {/* <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 6,
              background: 'linear-gradient(90deg, #08c488, #06b6d4)',
            }}
          /> */}
          {/*
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '-180px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(8,196,136,0.15) 0%, rgba(8,196,136,0) 70%)',
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
          /> */}

          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              zIndex: 2,
            }}
          >
            {/* Top section with logo and category */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <img
                src={logoDataUrl}
                alt="logo"
                width={100}
                height={100}
                style={{ width: 70, height: 70 }}
              />
              {/*
              {category && (
                <div
                  style={{
                    background: 'transparent',
                    color: '#08c488',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: 18,
                    fontFamily: 'DMSans-Bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  {category}
                </div>
              )} */}
            </div>

            {/* Middle section with title and excerpt */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h1
                style={{
                  fontFamily: 'DMSans-Bold',
                  fontSize: 64,
                  fontWeight: 700,
                  margin: 0,
                  color: '#ffffff',
                  maxWidth: 800,
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px',
                }}
              >
                {titleToRender}
              </h1>

              {excerptToRender && (
                <p
                  style={{
                    fontSize: 24,
                    color: '#9ca3af',
                    marginTop: 24,
                    maxWidth: 1000,
                    lineHeight: 1.5,
                    fontWeight: 400,
                    fontFamily: 'DMSans-Regular',
                  }}
                >
                  {excerptToRender.length > 220
                    ? excerptToRender.substring(0, 220) + '...'
                    : excerptToRender}
                </p>
              )}
            </div>

            {/* Bottom section with author and date */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              {/* Author image */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginRight: 16,
                  border: '2px solid #08c488',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={defaultAuthorImage}
                  alt="Author"
                  width={60}
                  height={60}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>

              {/* Author info */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <p
                  style={{
                    fontFamily: 'DMSans-Bold',
                    fontSize: 20,
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  {authorName}
                </p>
                <p
                  style={{
                    fontFamily: 'DMSans-Regular',
                    fontSize: 16,
                    color: '#9ca3af',
                    margin: 0,
                  }}
                >
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
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
