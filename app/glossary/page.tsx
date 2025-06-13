import { Metadata } from 'next';
import GlossaryClient from './GlossaryClient';
import Layout from '@/components/layout/Layout';

export const metadata: Metadata = {
  title: 'Legal Glossary | AL KINDI',
  description:
    'Comprehensive legal glossary covering corporate law, capital markets, M&A, bankruptcy, and cryptocurrency terms. Essential reference for legal professionals.',
  openGraph: {
    title: 'Legal Glossary | AL KINDI',
    description:
      'Comprehensive legal glossary covering corporate law, capital markets, M&A, bankruptcy, and cryptocurrency terms. Essential reference for legal professionals.',
    type: 'website',
    url: '/glossary',
  },
};

export default function GlossaryPage() {
  return (
    <Layout>
      <GlossaryClient />
    </Layout>
  );
}
