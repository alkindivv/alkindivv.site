import React from 'react';
import Head from 'next/head';
import { BlogPost } from '@/types/blog';
import StructuredData from '@/components/shared/StructuredData';

interface BlogPostSEOProps {
  post: BlogPost;
  content?: string;
}

const BlogPostSEO: React.FC<BlogPostSEOProps> = ({ post, content }) => {
  const baseUrl = 'https://alkindivv.site';
  const postUrl = `${baseUrl}/blog/${post.category}/${post.slug}`;
  const imageUrl = post.featuredImage || `${baseUrl}/images/default-blog.png`;

  // Extract first paragraph for better description
  const metaDescription =
    post.description ||
    post.excerpt ||
    (content ? content.replace(/[#*`]/g, '').slice(0, 160) + '...' : '');

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.category.charAt(0).toUpperCase() + post.category.slice(1),
        item: `${baseUrl}/blog/${post.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  // FAQ structured data if content contains Q&A patterns
  const faqData =
    content && content.includes('?')
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Apa itu ' + post.title + '?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: metaDescription,
              },
            },
          ],
        }
      : null;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{post.title} | AL KINDI</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content={post.tags?.join(', ') || post.category}
        />
        <meta name="author" content={post.author || 'AL KINDI'} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* Canonical URL */}
        <link rel="canonical" href={postUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:site_name" content="AL KINDI" />
        <meta property="og:locale" content="id_ID" />

        {/* Article specific OG tags */}
        <meta property="article:author" content={post.author || 'AL KINDI'} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        {post.tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content={post.title} />
        <meta name="twitter:creator" content="@alkindivv" />
        <meta name="twitter:site" content="@alkindivv" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="application-name" content="AL KINDI" />
        <meta name="apple-mobile-web-app-title" content="AL KINDI" />

        {/* Reading Time and Word Count */}
        {post.readingTime && (
          <meta name="reading-time" content={`${post.readingTime} minutes`} />
        )}

        {/* Language and Region */}
        <meta httpEquiv="content-language" content="id" />
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />

        {/* Preload critical resources */}
        <link rel="preload" href={imageUrl} as="image" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData, null, 2),
          }}
        />

        {faqData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqData, null, 2),
            }}
          />
        )}
      </Head>

      {/* Article Structured Data */}
      <StructuredData type="article" post={post} />
    </>
  );
};

export default BlogPostSEO;
