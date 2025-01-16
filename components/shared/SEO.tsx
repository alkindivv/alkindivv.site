import Head from 'next/head';
import { useRouter } from 'next/router';
import { generateSchema } from '@/lib/schema';

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
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content={meta.robots} />
      <meta name="description" content={meta.description} />
      <meta name="author" content="AL KINDI" />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={props.isBlog ? 'article' : 'website'} />
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

      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#111111" />
    </Head>
  );
}
