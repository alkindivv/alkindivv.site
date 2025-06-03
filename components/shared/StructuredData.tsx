import React from 'react';
import { BlogPost } from '@/types/blog';

interface StructuredDataProps {
  type: 'website' | 'article' | 'person' | 'organization';
  post?: BlogPost;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, post }) => {
  const getStructuredData = () => {
    const baseUrl = 'https://alkindivv.site';

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
            sameAs: [
              'https://twitter.com/alkindivv',
              'https://linkedin.com/in/alkindivv',
              'https://github.com/alkindivv',
            ],
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
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
            'Legal professional specializing in Corporate Law, Technology Law, and Blockchain regulations.',
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
        };

      case 'article':
        if (!post) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          image: post.featuredImage || `${baseUrl}/images/default-blog.png`,
          datePublished: post.date,
          dateModified: post.date,
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
          keywords: post.tags?.join(', '),
          wordCount: post.readingTime ? post.readingTime * 200 : undefined,
          timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
          inLanguage: 'id-ID',
          about: post.tags?.map((tag) => ({
            '@type': 'Thing',
            name: tag,
          })),
        };

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'AL KINDI Legal Services',
          alternateName: 'alkindivv.site',
          url: baseUrl,
          logo: `${baseUrl}/images/AL-KINDI.png`,
          description:
            'Professional legal services specializing in Corporate Law, Technology Law, and Blockchain regulations.',
          founder: {
            '@type': 'Person',
            name: 'AL KINDI',
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
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            url: `${baseUrl}/contact`,
          },
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
