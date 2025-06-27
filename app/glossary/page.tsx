import { Metadata } from 'next';
import GlossaryClient from './GlossaryClient';
import Layout from '@/components/layout/Layout';
import StructuredData from '@/components/shared/StructuredData';
import { GlossaryTerm } from '@/types/glossary';
import { glossary } from '@/content/glossary';

export const metadata: Metadata = {
  title: 'Legal Glossary',
  description:
    'Some of the terms that I have learned and its explanation, to help you to understand the basic terms in law, especially in corporate law.',
  openGraph: {
    title: 'Legal Glossary',
    description:
      'Some of the terms that I have learned and its explanation, to help you to understand the basic terms in law, especially in corporate law.',
    type: 'website',
    url: '/glossary/',
    images: [
      {
        url: '/images/default.png',
        width: 1200,
        height: 630,
        alt: 'AL KINDI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Glossary',
    description:
      'Some of the terms that I have learned and its explanation, to help you to understand the basic terms in law, especially in corporate law.',
    images: ['/images/default.png'],
  },
  alternates: {
    canonical: '/glossary/',
  },
};

export default function GlossaryPage() {
  return (
    <Layout>
      <GlossaryClient terms={glossary} />
      <StructuredData
        type="glossary"
        terms={glossary.map(({ term, definition }: GlossaryTerm) => ({
          term,
          definition,
        }))}
      />
    </Layout>
  );
}
