import { Metadata } from 'next';

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
  pathname?: string;
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

export function generateMetadata({
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
  language = defaultMeta.language,
  pathname,
}: SEOProps): Metadata {
  // Generate final values
  const finalTitle = title
    ? `${title} | ${defaultMeta.siteName}`
    : defaultMeta.title;
  const finalUrl = canonical || `${defaultMeta.url}${pathname || ''}`;
  const finalImage = image.startsWith('http')
    ? image
    : `${defaultMeta.url}${image}`;

  // Generate JSON-LD schema
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
    if (pathname) {
      const pathSegments = pathname.split('/').filter(Boolean);
      pathSegments.forEach((segment, index) => {
        // Capitalize and format segment name
        let name = segment.replace(/-/g, ' ');
        name = name
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Build path for this segment
        const path = `${defaultMeta.url}/${pathSegments
          .slice(0, index + 1)
          .join('/')}`;

        breadcrumbSchema.itemListElement.push({
          '@type': 'ListItem',
          position: index + 2,
          name,
          item: path,
        });
      });
    }

    baseSchema['@graph'].push(breadcrumbSchema);

    return baseSchema;
  };

  // Create metadata object for App Router
  const metadata: Metadata = {
    title: finalTitle,
    description: description,
    authors: [{ name: author }],
    keywords:
      tags?.join(', ') ||
      'law, corporate law, capital markets, M&A, bankruptcy, cryptocurrency',
    alternates: {
      canonical: finalUrl,
      languages: {
        'id-ID': finalUrl,
        'x-default': finalUrl,
      },
    },
    robots: noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    openGraph: {
      title: finalTitle,
      description: description,
      url: finalUrl,
      siteName: defaultMeta.siteName,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: language.replace('-', '_'),
      type: type,
      ...(type === 'article' && {
        article: {
          publishedTime: publishedTime,
          modifiedTime: modifiedTime,
          authors: [author],
          tags: tags,
          section: category,
        },
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: defaultMeta.twitterHandle,
      creator: defaultMeta.twitterHandle,
      title: finalTitle,
      description: description,
      images: [
        {
          url: finalImage,
          alt: finalTitle,
        },
      ],
    },
    other: {
      'format-detection': 'telephone=no',
      'theme-color': '#0a0a0a',
      'msapplication-TileColor': '#0a0a0a',
      copyright: `© ${new Date().getFullYear()} ${author}`,
    },
  };

  // Add JSON-LD schema as script in metadata
  return {
    ...metadata,
    other: {
      ...metadata.other,
    },
  };
}

export default generateMetadata;
