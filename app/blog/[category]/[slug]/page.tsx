import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/posts';
import Layout from '@/components/layout/Layout';
import { BlogPost } from '@/types/blog';
import BlogPostLayout from '@/components/blog/layout/BlogPostLayout';
import { viewport } from '../../../viewport';
import StructuredData from '@/components/shared/StructuredData';
import { MDXComponents } from '@/components/blog/mdx';

export { viewport };

export const revalidate = 3600;

// Define the component props
interface BlogPostPageProps {
  params: {
    category: string;
    slug: string;
  };
}

// Define the frontMatter type
interface FrontMatter extends BlogPost {
  readingTime: number;
  slug: string;
  description?: string;
  excerpt?: string;
  [key: string]: any;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { category, slug } = params;

  try {
    const { frontMatter } = await getPostBySlug(category, slug);
    const typedFrontMatter = frontMatter as FrontMatter;

    return {
      title: typedFrontMatter.title,
      description:
        typedFrontMatter.excerpt ||
        typedFrontMatter.description ||
        `${typedFrontMatter.title} - Article by ${typedFrontMatter.author}`,
      authors: [{ name: typedFrontMatter.author }],
      alternates: {
        canonical: `/blog/${category}/${slug}/`,
      },
      openGraph: {
        title: typedFrontMatter.title,
        description:
          typedFrontMatter.excerpt ||
          typedFrontMatter.description ||
          `${typedFrontMatter.title} - Article by ${typedFrontMatter.author}`,
        url: `https://alkindivv.site/blog/${category}/${slug}/`,
        type: 'article',
        publishedTime: typedFrontMatter.date,
        authors: typedFrontMatter.author,
        images: [
          {
            url: typedFrontMatter.featuredImage || `/api/og/blog/${slug}`,
            width: 1200,
            height: 630,
            alt: typedFrontMatter.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: typedFrontMatter.title,
        description:
          typedFrontMatter.excerpt ||
          typedFrontMatter.description ||
          `${typedFrontMatter.title} - Article by ${typedFrontMatter.author}`,
        images: [`/api/og/blog/${slug}`, typedFrontMatter.featuredImage].filter(
          (src): src is string => Boolean(src)
        ),
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
    };
  }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const paths = await getAllPostSlugs();

  return paths.map((path) => ({
    category: path.params.category,
    slug: path.params.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = params;

  try {
    // Get the current post data
    const { frontMatter, headings } = await getPostBySlug(category, slug);
    const typedFrontMatter = frontMatter as FrontMatter;

    // Get all posts for related articles
    const allPosts = await getAllPosts();

    // Dynamically import the compiled MDX component
    const PostModule = await import(`@/content/blog/${category}/${slug}.mdx`);
    const PostComponent = PostModule.default;

    // Debug data di mode production
    if (process.env.NODE_ENV === 'production') {
      console.log('[Post Page] BlogPost component mounted', {
        title: typedFrontMatter?.title,
        category: typedFrontMatter?.category,
        slug: typedFrontMatter?.slug,
        relatedPostsCount: allPosts?.length,
      });
    }

    return (
      <Layout>
        <main className="content-spacing">
          {/* Hero Banner */}
          {typedFrontMatter.featuredImage ? (
            <div className="relative h-[30vh] md:h-[40vh] w-screen -mx-[calc((100vw-100%)/2)] overflow-hidden">
              <div className="absolute inset-0 transform scale-110">
                <Image
                  src={typedFrontMatter.featuredImage}
                  alt={typedFrontMatter.title}
                  fill
                  sizes="100vw"
                  className="object-cover brightness-[0.5] contrast-[1.1]"
                  priority
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/0 via-[#0a0a0a]/60 to-[#0a0a0a]" />
              </div>
            </div>
          ) : (
            // Fallback background jika tidak ada featuredImage
            <div className="relative h-[20vh] md:h-[25vh] w-full bg-gradient-to-b from-[#0a0a0a]/60 to-[#0a0a0a] -mx-[calc((100vw-100%)/2)]" />
          )}

          <BlogPostLayout
            post={typedFrontMatter}
            category={category}
            slug={slug}
            allPosts={allPosts}
            headings={headings}
          >
            <PostComponent components={MDXComponents as any} />
          </BlogPostLayout>
          <StructuredData type="article" post={typedFrontMatter as any} />
        </main>
      </Layout>
    );
  } catch (error) {
    console.error('Error in blog post page:', error);
    notFound();
  }
}
