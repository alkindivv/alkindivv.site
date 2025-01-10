import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  date?: string;
  author?: string;
  category?: string;
  tags?: string[];
  readingTime?: number | string;
  robots?: string;
  modifiedDate?: string;
  wordCount?: number;
  relatedPosts?: Array<{
    title: string;
    url: string;
  }>;
}

const SEO = ({
  title = 'AL KINDI - Law, Technology, and Cryptocurrency',
  description = 'Personal website of AL KINDI, a Trainee Associate with focus on corporate law, capital markets, and bankruptcy, offering insights and solutions in legal practice.',
  image = 'https://alkindivv.site/images/default.png',
  article = false,
  date,
  author = 'AL KINDI',
  category,
  tags = [],
  readingTime,
  robots = 'follow, index',
  modifiedDate,
  wordCount,
  relatedPosts = [],
}: SEOProps) => {
  const router = useRouter();
  const canonicalUrl = `https://alkindivv.site${router.asPath}`;
  const siteUrl = 'https://alkindivv.site';

  const schemaOrgJSONLD = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': canonicalUrl,
        url: canonicalUrl,
        name: title,
        headline: title,
        description: description,
        author: {
          '@type': 'Person',
          name: author,
          url: siteUrl,
          image: {
            '@type': 'ImageObject',
            url: `${siteUrl}/images/ALKINDI-bg.PNG`,
          },
          sameAs: [
            'https://twitter.com/alkindivv',
            'https://linkedin.com/in/alkindivv',
            'https://github.com/alkindivv',
          ],
          jobTitle: 'Trainee Associate',
          alumniOf: {
            '@type': 'Organization',
            name: 'University of Indonesia',
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'AL KINDI',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/images/logo.png`,
          },
          sameAs: [
            'https://twitter.com/alkindivv',
            'https://linkedin.com/in/alkindivv',
            'https://github.com/alkindivv',
          ],
        },
        datePublished: date,
        dateModified: modifiedDate || date,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        image: {
          '@type': 'ImageObject',
          url: image,
          width: 1200,
          height: 630,
        },
        articleSection: category,
        keywords: tags.join(', '),
        wordCount:
          wordCount ||
          (typeof readingTime === 'number' ? readingTime * 200 : undefined),
        inLanguage: 'id-ID',
        isAccessibleForFree: true,
        license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
        about: {
          '@type': 'Thing',
          name: category,
        },
        ...(relatedPosts.length > 0 && {
          isPartOf: {
            '@type': 'Blog',
            '@id': `${siteUrl}/blog`,
            name: 'AL KINDI Blog',
          },
          relatedLink: relatedPosts.map((post) => post.url),
        }),
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: canonicalUrl,
        name: title,
        description: description,
        author: {
          '@type': 'Person',
          name: author,
          url: siteUrl,
          image: {
            '@type': 'ImageObject',
            url: `${siteUrl}/images/ALKINDI-bg.PNG`,
          },
          sameAs: [
            'https://twitter.com/alkindivv',
            'https://linkedin.com/in/alkindivv',
            'https://github.com/alkindivv',
          ],
        },
        publisher: {
          '@type': 'Organization',
          name: 'AL KINDI',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/images/logo.png`,
          },
        },
        image: {
          '@type': 'ImageObject',
          url: image,
          width: 1200,
          height: 630,
        },
      };

  return (
    <Head>
      {/* Google Site Verification */}
      <meta name="google-site-verification" content="googledd93bf1ef1da1f54" />

      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="AL KINDI" />
      {date && <meta property="article:published_time" content={date} />}
      {modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {tags &&
        tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      {category && <meta property="article:section" content={category} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@alkindivv" />
      <meta name="twitter:creator" content="@alkindivv" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article Specific Meta Tags */}
      {article && (
        <>
          <meta name="author" content={author} />
          <meta name="article:author" content={author} />
          {readingTime && <meta name="twitter:label1" content="Reading time" />}
          {readingTime && (
            <meta name="twitter:data1" content={`${readingTime} min read`} />
          )}
          {wordCount && <meta name="twitter:label2" content="Word count" />}
          {wordCount && (
            <meta name="twitter:data2" content={wordCount.toString()} />
          )}
        </>
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
      />

      {/* Additional Meta Tags */}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="theme-color" content="#111111" />
      <meta name="msapplication-TileColor" content="#111111" />

      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect to Important Domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
    </Head>
  );
};

export default SEO;
