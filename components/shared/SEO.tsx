import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { generateSchema } from '@/lib/schema';
import { Metadata } from 'next';
import { BlogPost } from '@/types/blog';

const defaultMeta = {
  title: 'AL KINDI - Law, Technology, and Cryptocurrency',
  siteName: 'alkindivv.site',
  description:
    'Personal website of AL KINDI - sharing insights and knowledge on corporate law, capital markets, mergers & acquisitions, bankruptcy, technology and cryptocurrency',
  url: 'https://alkindivv.site',
  image: 'https://alkindivv.site/images/default.png',
  type: 'website',
  robots: 'follow, index',
} as {
  title: string;
  siteName: string;
  description: string;
  url: string;
  image: string;
  type: string;
  robots: string;
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
  isBlog?: boolean;
  banner?: string;
  canonical?: string;
  tags?: string[];
  category?: string;
  readingTime?: number;
  wordCount?: number;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };

  // Generate canonical URL
  const canonicalUrl = props.canonical
    ? props.canonical
    : `${meta.url}${router.asPath.split('?')[0]}`; // Remove query parameters

  meta.title = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  const schema = generateSchema({
    title: meta.title,
    description: meta.description,
    url: canonicalUrl,
    siteName: meta.siteName,
    image: props.banner || meta.image,
    type: props.isBlog ? 'article' : 'website',
    date: props.date,
    category: props.category,
    tags: props.tags,
    wordCount:
      props.wordCount ||
      (props.readingTime ? props.readingTime * 200 : undefined),
  });

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content={meta.robots} />
        <meta name="description" content={meta.description} />
        <meta name="author" content="AL KINDI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />

        {/* Open Graph */}
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:type"
          content={props.isBlog ? 'article' : 'website'}
        />
        <meta property="og:site_name" content={meta.siteName} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={props.banner || meta.image} />
        <meta property="og:image:alt" content={meta.title} />
        <meta property="og:locale" content="id_ID" />
        {props.date && (
          <meta property="article:published_time" content={props.date} />
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@alkindivv" />
        <meta name="twitter:creator" content="@alkindivv" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={props.banner || meta.image} />

        {/* Additional Meta */}
        {props.isBlog && (
          <>
            <meta property="article:author" content="AL KINDI" />
            <meta property="article:section" content={props.category} />
            {props.tags?.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
            <meta property="article:published_time" content={props.date} />
            <meta property="article:modified_time" content={props.date} />
          </>
        )}

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      </Head>
      <NextSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          title: meta.title,
          description: meta.description,
          images: [{ url: props.banner || meta.image }],
          site_name: meta.siteName,
        }}
        twitter={{
          handle: '@alkindivv',
          site: '@alkindivv',
          cardType: 'summary_large_image',
        }}
      />
    </>
  );
}

interface GenerateBlogMetadataProps {
  post: BlogPost;
  baseUrl?: string;
}

export function generateBlogMetadata({
  post,
  baseUrl = 'https://alkindivv.site',
}: GenerateBlogMetadataProps): Metadata {
  const {
    title,
    description,
    featuredImage,
    author,
    date,
    category,
    tags = [],
  } = post;

  const publishedTime = new Date(date).toISOString();
  const ogImage = featuredImage
    ? `${baseUrl}${featuredImage}`
    : `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    authors: [{ name: author }],
    keywords: [...tags, category, 'blog', 'AL KINDI', author],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      authors: [author],
      tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${category}/${post.slug}`,
    },
  };
}

interface GenerateBlogListingMetadataProps {
  title: string;
  description: string;
  baseUrl?: string;
  category?: string;
}

export function generateBlogListingMetadata({
  title,
  description,
  baseUrl = 'https://alkindivv.site',
  category,
}: GenerateBlogListingMetadataProps): Metadata {
  const path = category ? `/blog/${category}` : '/blog';
  const fullTitle = category
    ? `${title} - ${category.charAt(0).toUpperCase() + category.slice(1)} Articles`
    : title;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}
