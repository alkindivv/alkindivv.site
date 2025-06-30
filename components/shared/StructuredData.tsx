import React from 'react';
import { BlogPost } from '@/types/blog';

interface StructuredDataProps {
  type:
    | 'website'
    | 'article'
    | 'person'
    | 'organization'
    | 'glossary'
    | 'profilePage'
    | 'webPage';
  post?: BlogPost;
  terms?: { term: string; definition: string }[];
  pageTitle?: string;
  pageDescription?: string;
  pagePath?: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  post,
  terms,
  pageTitle,
  pageDescription,
  pagePath,
}) => {
  const getStructuredData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindi.id';

    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'AL KINDI',
          alternateName: 'alkindi.id',
          url: baseUrl,
          description:
            'Personal website & blog by AL KINDI – sharing insights on corporate law, technology, blockchain and cryptocurrency.',
          author: {
            '@type': 'Person',
            name: 'AL KINDI',
            url: baseUrl,
          },
          publisher: {
            '@type': 'Person',
            name: 'AL KINDI',
            url: baseUrl,
          },
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
            width: 512,
            height: 512,
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
          inLanguage: 'id-ID',
        };

      case 'profilePage':
        return {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          dateCreated: '2023-01-01T00:00:00+07:00',
          dateModified: new Date().toISOString(),
          mainEntity: {
            '@type': 'Person',
            name: 'AL KINDI',
            alternateName: 'alkindivv',
            identifier: 'alkindivv',
            description:
              'Law graduate focusing on corporate law and emerging technologies',
            image: `${baseUrl}/images/AL-KINDI.png`,
            sameAs: [
              'https://twitter.com/alkindivv',
              'https://linkedin.com/in/alkindivv',
              'https://github.com/alkindivv',
            ],
          },
        };

      case 'person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'AL KINDI',
          alternateName: 'alkindivv',
          url: baseUrl,
          image: `${baseUrl}/images/AL-KINDI.png`,
          description:
            'Law graduate focusing on corporate law and emerging technologies',
          jobTitle: 'Legal Professional',
          worksFor: {
            '@type': 'Organization',
            name: 'Law Firm RR & Partners',
          },
          knowsAbout: [
            'Corporate Law',
            'Technology Law',
            'Blockchain',
            'Cryptocurrency Regulation',
            'Mergers & Acquisitions',
            'Capital Markets',
            'Bankruptcy Law',
            'Smart Contracts',
            'Legal Tech',
          ],
          sameAs: [
            'https://twitter.com/alkindivv',
            'https://linkedin.com/in/alkindivv',
            'https://github.com/alkindivv',
          ],
          gender: 'Male',
        };

      case 'article':
        if (!post) return null;

        const imageUrl = post.featuredImage
          ? post.featuredImage.startsWith('http')
            ? post.featuredImage
            : `${baseUrl}${post.featuredImage}`
          : `${baseUrl}/images/default.png`;

        const description =
          post.description || post.excerpt || `${post.title} by ${post.author}`;

        const keywords = post.tags?.length ? post.tags.join(', ') : undefined;

        const isoDate = (dateStr: string) => {
          const parsed = new Date(dateStr);
          if (isNaN(parsed.getTime())) return dateStr; // fallback ke string asli
          return parsed.toISOString();
        };

        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `${baseUrl}/blog/${post.category}/${post.slug}#article`,
          headline: post.title,
          alternativeHeadline: post.title,
          description,
          image: imageUrl,
          datePublished: isoDate(post.date),
          dateModified: isoDate(post.date),
          author: {
            '@type': 'Person',
            name: post.author || 'AL KINDI',
            url: baseUrl,
            image: `${baseUrl}/images/AL-KINDI.png`,
          },
          publisher: {
            '@type': 'Organization',
            name: 'AL KINDI',
            url: baseUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/AL-KINDI.png`,
              width: 400,
              height: 400,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${post.category}/${post.slug}`,
          },
          articleSection: post.category,
          ...(keywords ? { keywords } : {}),
          isAccessibleForFree: true,
          license: 'https://creativecommons.org/licenses/by-sa/4.0/',
          genre: 'Legal Technology Blog',
          articleBody: post.excerpt || description,
        };

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'AL KINDI',
          alternateName: 'alkindi.id',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/AL-KINDI.png`,
            width: 400,
            height: 400,
          },
          image: `${baseUrl}/images/AL-KINDI.png`,
          description:
            'Professional legal services specializing in Corporate Law, Technology Law, and Blockchain regulations.',
          founder: {
            '@type': 'Person',
            name: 'AL KINDI',
            url: baseUrl,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Indonesia',
          },
          serviceType: [
            'Corporate Law',
            'Technology Law',
            'Blockchain Consulting',
            'Legal Research',
            'Regulatory Compliance',
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'ID',
            addressRegion: 'Indonesia',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            url: `${baseUrl}/contact`,
          },
          sameAs: [
            'https://twitter.com/alkindivv',
            'https://linkedin.com/in/alkindivv',
            'https://github.com/alkindivv',
          ],
          foundingDate: '2023-01-01',
          legalName: 'AL KINDI',
          slogan: 'Bridging the intersection of law, & technology',
          knowsAbout: [
            'Corporate Law',
            'Blockchain Technology',
            'Cryptocurrency Regulation',
            'Mergers & Acquisitions',
            'Capital Markets',
            'Legal Tech',
            'Smart Contracts',
            'Bankruptcy Law',
          ],
        };

      case 'glossary':
        if (!terms) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          '@id': `${baseUrl}/glossary/#glossary`,
          name: 'Legal Glossary',
          description:
            'Collection of legal terms related to law, technology, and cryptocurrency.',
          inLanguage: 'id-ID',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/glossary/`,
          },
          author: {
            '@type': 'Person',
            name: 'AL KINDI',
            url: baseUrl,
          },
          publisher: {
            '@type': 'Person',
            name: 'AL KINDI',
            url: baseUrl,
          },
          hasDefinedTerm: terms.map((t) => ({
            '@type': 'DefinedTerm',
            '@id': `${baseUrl}/glossary/#${t.term
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w\-]+/g, '')}`,
            name: t.term,
            description: t.definition,
            inDefinedTermSet: `${baseUrl}/glossary/#glossary`,
            termCode: t.term.charAt(0).toUpperCase(),
          })),
        };

      case 'webPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${baseUrl}${pagePath || ''}#webpage`,
          url: `${baseUrl}${pagePath || ''}`,
          name: pageTitle || 'AL KINDI',
          description: pageDescription || 'Personal website of AL KINDI',
          isPartOf: {
            '@id': `${baseUrl}/#website`,
          },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            '@id': `${baseUrl}/#primaryimage`,
            url: `${baseUrl}/images/default.png`,
            width: 1200,
            height: 630,
          },
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          author: {
            '@type': 'Person',
            name: 'AL KINDI',
            url: baseUrl,
          },
          breadcrumb: {
            '@id': `${baseUrl}${pagePath || ''}#breadcrumb`,
          },
          inLanguage: 'id-ID',
          potentialAction: [
            {
              '@type': 'ReadAction',
              target: [`${baseUrl}${pagePath || ''}`],
            },
          ],
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

export default StructuredData;
