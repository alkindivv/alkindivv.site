import React, { useState } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Accent from './Accent';
import PrivacyAndTnc from './PrivacyAndTnc';

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className="mt-20 border-t border-gray-800" data-fade="10">
      <div className="max-w-6xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              <Accent>AL KINDI</Accent>
            </h3>
            <p className="text-sm text-gray-400">
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
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-500 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {[
                'Legal Consulting',
                'Smart Contract Development',
                'Hackintosh Installation',
                'Web Development',
              ].map((service) => (
                <li
                  key={service}
                  className="text-gray-400 hover:text-emerald-500 transition-colors text-sm"
                >
                  {service}
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
              <li className="text-gray-400 text-sm">
                <span className="block text-emerald-500">Email</span>
                alkindivv@gmail.com
              </li>
              <li className="text-gray-400 text-sm">
                <span className="block text-emerald-500">Location</span>
                Medan, Indonesia
              </li>
              <li className="text-gray-400 text-sm">
                <span className="block text-emerald-500">Working Hours</span>
                Mon - Fri, 9:00 - 17:00 WIB
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Al Kindi. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="text-sm text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setIsTermsOpen(true)}
                className="text-sm text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Terms of Service
              </button>
            </div>
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
