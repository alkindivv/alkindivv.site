import React, { useState } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Accent from '@/components/shared/Accent';
import PrivacyAndTnc from '@/components/shared/PrivacyAndTnc';

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className="mt-20 w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
      {/* Main Content */}
      <div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="mx-auto max-w-[1150px] px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">
                <Accent>AL KINDI</Accent>
              </h3>
              <p className="text-sm paragraph-text">
                Bridging the gap between legal frameworks and blockchain
                technology.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/alkindivv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/alkindivv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://twitter.com/alkindivv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                General
              </h3>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About', href: '/about' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contact', href: '/contact' },
                  { name: 'Wishlist', href: '/wishlist' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="paragraph-text hover:text-emerald-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                {[
                  { name: 'Legal Glossary', href: '/glossary' },
                  { name: 'Legal Resources', href: '/resources' },
                  { name: 'Docs', href: '/docs' },
                ].map((resource) => (
                  <li key={resource.name}>
                    <Link
                      href={resource.href}
                      className="paragraph-text hover:text-emerald-500 transition-colors text-sm"
                    >
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Contact
              </h3>
              <ul className="space-y-2">
                <li className="paragraph-text text-sm">
                  <span className="block text-emerald-500">Email</span>
                  law.alkindi@gmail.com
                </li>
                <li className="paragraph-text text-sm">
                  <span className="block text-emerald-500">Location</span>
                  Jakarta, Indonesia
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="mx-auto max-w-[1200px] px-4 py-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="paragraph-text text-sm">
              © {new Date().getFullYear()} AL KINDI. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PrivacyAndTnc
        type="privacy"
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      <PrivacyAndTnc
        type="terms"
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
    </footer>
  );
};

export default Footer;
