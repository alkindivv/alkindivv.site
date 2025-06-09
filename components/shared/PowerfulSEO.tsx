import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  type?: 'website' | 'article' | 'profile' | 'book';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  category?: string;
  author?: string;
  readingTime?: number;
  wordCount?: number;
  language?: string;
}

const defaultMeta = {
  title: 'AL KINDI - Law, Technology, and Cryptocurrency',
  description:
    'Personal website of AL KINDI - sharing insights and knowledge on corporate law, capital markets, mergers & acquisitions, bankruptcy, technology and cryptocurrency',
  image: 'https://alkindivv.site/images/default.png',
  url: 'https://alkindivv.site',
  siteName: 'AL KINDI',
  twitterHandle: '@alkindivv',
  author: 'AL KINDI',
  language: 'id-ID',
};

export default function PowerfulSEO({
  title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  canonical,
  noindex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  category,
  author = defaultMeta.author,
  readingTime,
  wordCount,
  language = defaultMeta.language,
}: SEOProps) {
  const router = useRouter();

  // Generate final values
  const finalTitle = title
    ? `${title} | ${defaultMeta.siteName}`
    : defaultMeta.title;
  const finalUrl =
    canonical || `${defaultMeta.url}${router.asPath.split('?')[0]}`;
  const finalImage = image.startsWith('http')
    ? image
    : `${defaultMeta.url}${image}`;

  // Generate comprehensive JSON-LD schema
  const generateSchema = () => {
    const baseSchema: any = {
      '@context': 'https://schema.org',
      '@graph': [],
    };

    // Website Schema
    const websiteSchema = {
      '@type': 'WebSite',
      '@id': `${defaultMeta.url}/#website`,
      url: defaultMeta.url,
      name: defaultMeta.siteName,
      description: defaultMeta.description,
      publisher: {
        '@id': `${defaultMeta.url}/#person`,
      },
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${defaultMeta.url}/blog?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      ],
      inLanguage: language,
    };

    // Person/Author Schema
    const personSchema = {
      '@type': 'Person',
      '@id': `${defaultMeta.url}/#person`,
      name: defaultMeta.author,
      image: {
        '@type': 'ImageObject',
        '@id': `${defaultMeta.url}/#personlogo`,
        inLanguage: language,
        url: `${defaultMeta.url}/images/AL-KINDI.png`,
        contentUrl: `${defaultMeta.url}/images/AL-KINDI.png`,
        width: 400,
        height: 400,
        caption: defaultMeta.author,
      },
      description:
        'Legal professional specializing in corporate law, capital markets, M&A, bankruptcy, and cryptocurrency regulations',
      sameAs: [
        'https://twitter.com/alkindivv',
        'https://linkedin.com/in/alkindivv',
        'https://github.com/alkindivv',
      ],
      url: defaultMeta.url,
      jobTitle: 'Trainee Associate',
      worksFor: {
        '@type': 'Organization',
        name: 'Law Firm',
      },
      knowsAbout: [
        'Corporate Law',
        'Capital Markets',
        'Mergers and Acquisitions',
        'Bankruptcy Law',
        'Cryptocurrency Regulations',
        'Legal Technology',
      ],
    };

    // Organization Schema
    const organizationSchema = {
      '@type': 'Organization',
      '@id': `${defaultMeta.url}/#organization`,
      name: defaultMeta.siteName,
      url: defaultMeta.url,
      logo: {
        '@type': 'ImageObject',
        inLanguage: language,
        '@id': `${defaultMeta.url}/#logo`,
        url: `${defaultMeta.url}/images/default.png`,
        contentUrl: `${defaultMeta.url}/images/default.png`,
        width: 1200,
        height: 630,
        caption: defaultMeta.siteName,
      },
      image: {
        '@id': `${defaultMeta.url}/#logo`,
      },
      sameAs: [
        'https://twitter.com/alkindivv',
        'https://linkedin.com/in/alkindivv',
      ],
    };

    // WebPage Schema
    const webPageSchema = {
      '@type': 'WebPage',
      '@id': `${finalUrl}/#webpage`,
      url: finalUrl,
      name: finalTitle,
      isPartOf: {
        '@id': `${defaultMeta.url}/#website`,
      },
      about: {
        '@id': `${defaultMeta.url}/#person`,
      },
      description: description,
      breadcrumb: {
        '@id': `${finalUrl}/#breadcrumb`,
      },
      inLanguage: language,
      potentialAction: [
        {
          '@type': 'ReadAction',
          target: [finalUrl],
        },
      ],
    };

    // Add schemas to graph
    baseSchema['@graph'].push(
      websiteSchema,
      personSchema,
      organizationSchema,
      webPageSchema
    );

    // Article-specific schema
    if (type === 'article') {
      const articleSchema = {
        '@type': 'Article',
        '@id': `${finalUrl}/#article`,
        isPartOf: {
          '@id': `${finalUrl}/#webpage`,
        },
        author: {
          '@id': `${defaultMeta.url}/#person`,
        },
        headline: title,
        description: description,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        mainEntityOfPage: {
          '@id': `${finalUrl}/#webpage`,
        },
        publisher: {
          '@id': `${defaultMeta.url}/#organization`,
        },
        image: {
          '@type': 'ImageObject',
          '@id': `${finalUrl}/#primaryimage`,
          inLanguage: language,
          url: finalImage,
          contentUrl: finalImage,
          width: 1200,
          height: 630,
        },
        thumbnailUrl: finalImage,
        keywords: tags?.join(', '),
        articleSection: category,
        inLanguage: language,
        copyrightYear: new Date(publishedTime || Date.now()).getFullYear(),
        copyrightHolder: {
          '@id': `${defaultMeta.url}/#person`,
        },
        ...(wordCount && { wordCount }),
        ...(readingTime && {
          timeRequired: `PT${readingTime}M`,
        }),
      };

      baseSchema['@graph'].push(articleSchema);
    }

    // Breadcrumb Schema
    const breadcrumbSchema = {
      '@type': 'BreadcrumbList',
      '@id': `${finalUrl}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: defaultMeta.url,
        },
      ],
    };

    // Add breadcrumb items based on URL path
    const pathSegments = router.asPath.split('/').filter(Boolean);
    pathSegments.forEach((segment, index) => {
      const position = index + 2;
      const url = `${defaultMeta.url}/${pathSegments.slice(0, index + 1).join('/')}`;
      const name =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

      breadcrumbSchema.itemListElement.push({
        '@type': 'ListItem',
        position,
        name,
        item: url,
      });
    });

    baseSchema['@graph'].push(breadcrumbSchema);

    return baseSchema;
  };

  return (
    <Head>
      {/* Halaman Spesifik Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta
        name="keywords"
        content={
          tags?.join(', ') ||
          'law, corporate law, capital markets, M&A, bankruptcy, cryptocurrency'
        }
      />
      <meta name="language" content={language} />
      <meta
        name="copyright"
        content={`© ${new Date().getFullYear()} ${author}`}
      />

      {/* Robots and Indexing */}
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex,nofollow'
            : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
        }
      />
      <meta
        name="googlebot"
        content={
          noindex
            ? 'noindex,nofollow'
            : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
        }
      />

      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="id" href={finalUrl} />
      <link rel="alternate" hrefLang="x-default" href={finalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:locale" content={language.replace('-', '_')} />

      {/* Article-specific Open Graph */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:publisher" content={defaultMeta.url} />
          {category && <meta property="article:section" content={category} />}
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:creator" content={defaultMeta.twitterHandle} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={finalTitle} />

      {/* Additional Twitter Meta for Articles */}
      {type === 'article' && (
        <>
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content={author} />
          {readingTime && (
            <>
              <meta name="twitter:label2" content="Reading time" />
              <meta name="twitter:data2" content={`${readingTime} min read`} />
            </>
          )}
        </>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="msapplication-TileColor" content="#0a0a0a" />

      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSchema(), null, 0),
        }}
      />
    </Head>
  );
}
