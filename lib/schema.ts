interface SchemaProps {
  title: string;
  description: string;
  url: string;
  siteName: string;
  image: string;
  type: 'article' | 'website';
  date?: string;
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
  category,
  tags,
  wordCount,
}: SchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    name: title,
    headline: title,
    description,
    url,
    image,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: 'https://alkindivv.site/logo.png',
      },
    },
    author: {
      '@type': 'Person',
      name: 'AL KINDI',
      url: 'https://alkindivv.site',
      jobTitle: 'Legal Technology Expert',
      sameAs: [
        'https://twitter.com/alkindivv',
        'https://linkedin.com/in/alkindivv',
        'https://github.com/alkindivv',
      ],
    },
  };

  if (type === 'article') {
    return {
      ...schema,
      datePublished: date,
      dateModified: date,
      articleSection: category,
      keywords: tags?.join(', '),
      wordCount,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    };
  }

  return {
    ...schema,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate:
          'https://alkindivv.site/blog/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
