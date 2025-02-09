interface SchemaProps {
  title: string;
  description: string;
  url: string;
  siteName: string;
  image: string;
  type: 'article' | 'website' | 'person' | 'organization';
  date?: string;
  category?: string;
  tags?: string[];
  wordCount?: number;
  author?: {
    name: string;
    url: string;
    image?: string;
  };
  organization?: {
    name: string;
    url: string;
    logo: string;
  };
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
  author,
  organization,
}: SchemaProps) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  const organizationSchema = {
    '@type': 'Organization',
    name: organization?.name || siteName,
    url: organization?.url || 'https://alkindivv.site',
    logo: {
      '@type': 'ImageObject',
      url: organization?.logo || 'https://alkindivv.site/images/AL-KINDI.png',
      width: 1200,
      height: 630,
    },
    sameAs: [
      'https://twitter.com/alkindivv',
      'https://linkedin.com/in/alkindivv',
      'https://github.com/alkindivv',
    ],
  };

  const personSchema = {
    '@type': 'Person',
    name: author?.name || 'AL KINDI',
    url: author?.url || 'https://alkindivv.site',
    image: author?.image || 'https://alkindivv.site/images/AL-KINDI.png',
    jobTitle: 'Legal Technology Expert',
    description: 'Corporate Law, Technology, and Blockchain Expert',
    sameAs: [
      'https://twitter.com/alkindivv',
      'https://linkedin.com/in/alkindivv',
      'https://github.com/alkindivv',
    ],
    worksFor: organizationSchema,
  };

  if (type === 'article') {
    return {
      ...baseSchema,
      headline: title,
      description,
      url,
      image: {
        '@type': 'ImageObject',
        url: image,
        width: 1200,
        height: 630,
      },
      datePublished: date,
      dateModified: date,
      author: personSchema,
      publisher: organizationSchema,
      articleSection: category,
      keywords: tags?.join(', '),
      wordCount,
      inLanguage: 'id-ID',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      isPartOf: {
        '@type': 'Blog',
        name: siteName,
        url: 'https://alkindivv.site/blog',
      },
    };
  }

  if (type === 'person') {
    return personSchema;
  }

  if (type === 'organization') {
    return organizationSchema;
  }

  // Default website schema
  return {
    ...baseSchema,
    name: title,
    description,
    url,
    publisher: organizationSchema,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate:
          'https://alkindivv.site/blog/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://twitter.com/alkindivv',
      'https://linkedin.com/in/alkindivv',
      'https://github.com/alkindivv',
    ],
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
