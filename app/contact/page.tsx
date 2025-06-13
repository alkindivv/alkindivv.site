import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import ContactClient from './ContactClient';
import { viewport } from '../viewport';

export { viewport };

export const metadata: Metadata = {
  title: 'Contact - AL KINDI',
  description:
    'Get in touch with AL KINDI for inquiries about corporate law, capital markets, mergers & acquisitions, bankruptcy, and cryptocurrency regulations',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact - AL KINDI',
    description:
      'Get in touch with AL KINDI for legal consultations, collaborations, or inquiries.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <Layout>
      <ContactClient />
    </Layout>
  );
}
