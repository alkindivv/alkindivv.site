import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  date?: string;
  author?: string;
}

const SEO = ({
  title = 'AL KINDI - Law, Technology, and Cryptocurrency',
  description = 'Personal website of AL KINDI, a Trainee Associate with focus on corporate law, capital markets, and bankruptcy, offering insights and solutions in legal practice.',
  image = 'https://alkindivv.site/images/og-image.png',
  article = false,
  date,
  author = 'AL KINDI',
}: SEOProps) => {
  const router = useRouter();
  const canonicalUrl = `https://alkindivv.site${router.asPath}`;
  const siteUrl = 'https://alkindivv.site';

  const schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': article ? 'Article' : 'WebSite',
    url: canonicalUrl,
    name: title,
    alternateName: 'AL KINDI Website',
    headline: title,
    image: {
      '@type': 'ImageObject',
      url: image,
    },
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AL KINDI',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    ...(article && date
      ? {
          datePublished: date,
          dateModified: date,
        }
      : {}),
  };

  return (
    <Head>
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
      <meta property="og:site_name" content="AL KINDI" />
      {date && <meta property="article:published_time" content={date} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@alkindivv" />
      <meta name="twitter:creator" content="@alkindivv" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
      />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
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
