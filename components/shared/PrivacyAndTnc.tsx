import React from 'react';
import Accent from './Accent';
import DimensionLink from '@/components/mdx/DimensionLink';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

const PrivacyAndTnc = ({ isOpen, onClose, type }: ModalProps) => {
  if (!isOpen) return null;

  const PrivacyContent = () => (
    <div className="space-y-8 text-gray-300">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>1. Information We Collect</Accent>
        </h2>
        <p>
          We collect information you provide directly to us when using our
          services, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Name and contact information</li>
          <li>Email address</li>
          <li>Messages sent through our contact form</li>
          <li>Information about your use of our services</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold ">
          <Accent>2. How We Use Your Information</Accent>
        </h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide and maintain our services</li>
          <li>Respond to your inquiries and requests</li>
          <li>Send you technical notices and updates</li>
          <li>Improve our services</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>3. Information Sharing</Accent>
        </h2>
        <p>
          We do not share your personal information with third parties except as
          described in this policy. We may share your information:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>With your consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights and interests</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>4. Data Security</Accent>
        </h2>
        <p>
          We implement appropriate security measures to protect your personal
          information. However, no method of transmission over the Internet is
          100% secure.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>5. Contact Us</Accent>
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{' '}
          <DimensionLink href="mailto:alkindivv@gmail.com">
            alkindivv@gmail.com
          </DimensionLink>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>6. Changes to This Policy</Accent>
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
        </p>
        <p className="text-sm text-gray-400">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </section>
    </div>
  );

  const TermsContent = () => (
    <div className="space-y-8 text-gray-300">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>1. Agreement to Terms</Accent>
        </h2>
        <p>
          By accessing and using this website, you agree to be bound by these
          Terms of Service and all applicable laws and regulations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>2. Services</Accent>
        </h2>
        <p>
          We provide blockchain development, legal tech solutions, and related
          consulting services. All services are provided "as is" and "as
          available."
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Smart contract development</li>
          <li>Legal tech solutions</li>
          <li>Blockchain consulting</li>
          <li>Technical documentation</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>3. Intellectual Property</Accent>
        </h2>
        <p>
          All content on this website, including text, graphics, logos, and
          code, is protected by intellectual property rights and remains our
          exclusive property.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>4. User Responsibilities</Accent>
        </h2>
        <p>You agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate information</li>
          <li>Use the services legally and appropriately</li>
          <li>Respect intellectual property rights</li>
          <li>Maintain confidentiality of any provided credentials</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>5. Limitation of Liability</Accent>
        </h2>
        <p>
          We shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages resulting from your use of our
          services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>6. Governing Law</Accent>
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of Indonesia, without regard to its conflict of law provisions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>7. Changes to Terms</Accent>
        </h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify
          users of any changes by updating the date at the bottom of this page.
        </p>
        <p className="text-sm text-gray-400">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          <Accent>8. Contact</Accent>
        </h2>
        <p>
          For any questions about these Terms, please contact us at{' '}
          {/* <a
            href="mailto:alkindivv@gmail.com"
            className="text-emerald-500 hover:underline"
          > */}
          <DimensionLink href="mailto:alkindivv@gmail.com">
            alkindivv@gmail.com
          </DimensionLink>
          {/* </a> */}
        </p>
      </section>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-1000 border border-gray-700 rounded-xl shadow-xl m-4">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 bg-gray-900 border-b border-gray-700">
          <h2 className="text-2xl font-bold">
            {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {type === 'privacy' ? <PrivacyContent /> : <TermsContent />}
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndTnc;
