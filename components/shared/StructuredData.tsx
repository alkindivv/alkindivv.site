import React from 'react';
import { BlogPost } from '@/types/blog';

interface StructuredDataProps {
  type:
    | 'website'
    | 'article'
    | 'person'
    | 'organization'
    | 'glossary'
    | 'profilePage';
  post?: BlogPost;
  terms?: { term: string; definition: string }[];
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  post,
  terms,
}) => {
  const getStructuredData = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site';

    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'AL KINDI',
          alternateName: 'alkindivv.site',
          url: baseUrl,
          description:
            'Personal website of AL KINDI - A professional with expertise in Corporate Law, Technology, and Blockchain.',
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
              'A Law Graduate with expertise in corporate law, and interested in the intersection of law, technology, and cryptocurrency',
            image: `${baseUrl}/images/AL-KINDI.png`,
            sameAs: [
              'https://twitter.com/alkindivv',
              'https://linkedin.com/in/alkindivv',
              'https://github.com/alkindivv',
            ],
            interactionStatistic: [
              {
                '@type': 'InteractionCounter',
                interactionType: 'https://schema.org/FollowAction',
                userInteractionCount: 500,
              },
            ],
            agentInteractionStatistic: {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/WriteAction',
              userInteractionCount: 25,
            },
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
            'A Law Graduate with expertise in corporate law, and interested in the intersection of law, technology, and cryptocurrency',
          jobTitle: 'Legal Professional',
          worksFor: {
            '@type': 'Organization',
            name: 'Law Firm RR & Partners',
          },
          knowsAbout: [
            'Corporate Law',
            'Technology Law',
            'Blockchain',
            'Cryptocurrency Regulations',
            'Mergers & Acquisitions',
            'Capital Markets',
            'Bankruptcy Law',
            'Regulasi Cryptocurrency',
            'Merger dan Akuisisi',
            'Pasar Modal',
            'Hukum Kepailitan',
            'Smart Contracts',
            'Legal Tech',
          ],
          sameAs: [
            'https://twitter.com/alkindivv',
            'https://linkedin.com/in/alkindivv',
            'https://github.com/alkindivv',
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'ID',
            addressRegion: 'Indonesia',
          },
          nationality: {
            '@type': 'Country',
            name: 'Indonesia',
          },
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Universitas Islam Indonesia',
            sameAs: 'https://uii.ac.id/',
          },
          email: 'alkindivv@gmail.com',
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
          headline: post.title,
          description,
          image: imageUrl,
          datePublished: isoDate(post.date),
          dateModified: isoDate(post.date),
          author: {
            '@type': 'Person',
            name: post.author || 'AL KINDI',
            url: baseUrl,
          },
          publisher: {
            '@type': 'Person',
            name: 'AL KINDI',
            url: baseUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/AL-KINDI.png`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${post.category}/${post.slug}`,
          },
          articleSection: post.category,
          ...(keywords ? { keywords } : {}),
          wordCount: post.readingTime ? post.readingTime * 200 : undefined,
          timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
          inLanguage: 'id-ID',
          ...(post.tags?.length
            ? {
                about: post.tags.map((tag) => ({
                  '@type': 'Thing',
                  name: tag,
                })),
              }
            : {}),
        };

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'AL KINDI Legal Services',
          alternateName: 'alkindivv.site',
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
            'Hukum Korporasi',
            'Hukum Teknologi',
            'Konsultasi Blockchain',
            'Riset Hukum',
            'Kepatuhan Regulasi',
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
            email: 'alkindivv@gmail.com',
          },
          sameAs: [
            'https://twitter.com/alkindivv',
            'https://linkedin.com/in/alkindivv',
            'https://github.com/alkindivv',
          ],
          foundingDate: '2023-01-01',
          legalName: 'AL KINDI Legal Services',
          slogan: 'Memadukan hukum, teknologi, dan inovasi',
          knowsAbout: [
            'Hukum Korporasi',
            'Teknologi Blockchain',
            'Regulasi Cryptocurrency',
            'Merger dan Akuisisi',
            'Pasar Modal',
            'Legal Tech',
            'Smart Contracts',
            'Bankruptcy Law',
            'Regulasi Cryptocurrency',
            'Merger dan Akuisisi',
            'Pasar Modal',
            'Hukum Kepailitan',
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
