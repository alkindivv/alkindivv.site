import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import ContactClient from './ContactClient';
import { viewport } from '../viewport';

export { viewport };

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with me and you can ask me anything whether it is about law, technology, cryptocurrency or anything else.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact - AL KINDI',
    description:
      'Get in touch with me and you can ask me anything whether it is about law, technology, cryptocurrency or anything else.',
    url: '/contact/',
    type: 'website',
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
    title: 'Contact - AL KINDI',
    description:
      'Get in touch with me and you can ask me anything whether it is about law, technology, cryptocurrency or anything else.',
    images: ['/images/default.png'],
  },
};

export default function ContactPage() {
  return (
    <Layout>
      <ContactClient />
    </Layout>
  );
}
