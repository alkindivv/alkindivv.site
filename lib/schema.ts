interface SchemaProps {
  title: string;
  description: string;
  url: string;
  siteName: string;
  image: string;
  type: 'website' | 'article';
  date?: string;
  author?: string;
  category?: string;
  tags?: string[];
  wordCount?: number;
}

export function generateSchema({
  title,
  description,
  url,
  siteName,
  image,
  type,
  date,
  author = 'AL KINDI',
  category,
  tags,
  wordCount,
}: SchemaProps) {
  const personSchema = {
    '@type': 'Person',
    '@id': `${url}/#/schema/person/alkindi`,
    name: author,
    url: `${url}/about`,
    image: {
      '@type': 'ImageObject',
      url: `${url}/images/ALKINDI-bg.PNG`,
      contentUrl: `${url}/images/ALKINDI-bg.PNG`,
    },
    description:
      'Trainee Associate with focus on corporate law, capital markets, and bankruptcy',
    jobTitle: 'Trainee Associate',
    sameAs: [
      'https://twitter.com/alkindivv',
      'https://linkedin.com/in/alkindivv',
      'https://github.com/alkindivv',
    ],
  };

  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${url}/#/schema/organization/alkindivv`,
    name: siteName,
    url: url,
    logo: {
      '@type': 'ImageObject',
      url: `${url}/images/logo.png`,
      contentUrl: `${url}/images/logo.png`,
    },
    sameAs: [
      'https://twitter.com/alkindivv',
      'https://linkedin.com/in/alkindivv',
      'https://github.com/alkindivv',
    ],
  };

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'BlogPosting' : 'WebSite',
    '@id': `${url}${type === 'article' ? '/blog' : ''}/#website`,
    url,
    name: title,
    description,
    publisher: organizationSchema,
    author: personSchema,
    image: {
      '@type': 'ImageObject',
      url: image,
      contentUrl: image,
    },
    inLanguage: 'id-ID',
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${url}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    ],
  };

  if (type === 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}/blog/${category}/${url.split('/').pop()}#article`,
      isPartOf: {
        '@id': `${url}/#website`,
      },
      author: personSchema,
      publisher: organizationSchema,
      headline: title,
      description: description,
      datePublished: date,
      dateModified: date,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      image: {
        '@type': 'ImageObject',
        url: image,
        contentUrl: image,
      },
      articleSection: category,
      keywords: tags?.join(', '),
      wordCount,
      inLanguage: 'id-ID',
    };
  }

  return baseSchema;
}
