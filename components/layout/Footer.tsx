import React from 'react';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';
import GlowingButton from '@/components/shared/GlowingButton';

const socialLinks = [
  {
    href: 'https://github.com/alkindivv',
    icon: FiGithub,
    label: 'GitHub',
    color: 'text-neutral-500',
  },
  {
    href: 'https://linkedin.com/in/alkindivv',
    icon: FiLinkedin,
    label: 'LinkedIn',
    color: 'text-neutral-500',
  },
  {
    href: 'https://twitter.com/alkindivv',
    icon: FiTwitter,
    label: 'Twitter',
    color: 'text-neutral-500',
  },
  {
    href: 'mailto:alkindi@gmail.com',
    icon: FiMail,
    label: 'Email',
    color: 'text-neutral-500',
  },
] as const;

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
] as const;

const resourceLinks = [
  { name: 'Glossary', href: '/glossary' },
  { name: 'Books', href: '/resources' },
  { name: 'Wishlist', href: '/wishlist' },
  { name: 'Docs', href: '/docs' },
  { name: 'RSS', href: '/feed.xml' },
] as const;

function FooterSection({
  title,
  children,
  className,
}: {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-neutral-500 mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 bg-neutral-950">
      {/* Top Border Gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-[1150px] px-0 py-20">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr,0.8fr,0.8fr,0.8fr,2fr] gap-12 md:gap-6">
            {/* Brand */}
            <div className="space-y-12 md:space-y-0">
              <FooterSection
                title={
                  <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
                    AL KINDI
                  </span>
                }
              >
                <p className="text-sm text-neutral-500 max-w-[280px] mb-4">
                  Specializing in corporate Mergers & Acquisitions (M&A),
                  Capital Markets, Bankruptcy & Insolvency
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </FooterSection>

              {/* Newsletter untuk Mobile */}
              <div className="md:hidden">
                <FooterSection
                  title={
                    <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
                      Subscribe to AL KINDI's blog newsletter
                    </span>
                  }
                >
                  <p className="text-sm text-neutral-500 max-w-[280px] mb-4">
                    Don't miss out my latest articles!. Get an email whenever I
                    post, no spam ✌️
                  </p>
                  <GlowingButton href="https://alkindi.substack.com">
                    Subscribe Now
                  </GlowingButton>
                </FooterSection>
              </div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-6 md:col-span-3">
              {/* Quick Links */}
              <FooterSection title="General">
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-neutral-50 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterSection>

              {/* Resources */}
              <FooterSection title="Resources">
                <ul className="space-y-2">
                  {resourceLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-neutral-50 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterSection>

              {/* Contact */}
              <FooterSection title="Articles">
                <ul className="space-y-2">
                  <li className="text-neutral-50 text-sm">
                    <Link href="/blog/law" className="block text-white">
                      Law
                    </Link>
                  </li>
                  <li className="text-neutral-400 text-sm">
                    <Link href="/blog/hackintosh" className="block text-white">
                      Hackintosh
                    </Link>
                  </li>
                  <li className="text-neutral-400 text-sm">
                    <Link
                      href="/blog/cryptocurrency"
                      className="block text-white"
                    >
                      Crypto
                    </Link>
                  </li>
                </ul>
              </FooterSection>
            </div>

            {/* Newsletter untuk Desktop */}
            <div className="hidden md:block">
              <FooterSection
                title={
                  <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
                    Subscribe to my blog newsletter
                  </span>
                }
              >
                <p className="text-sm text-neutral-500 max-w-[280px] mb-4">
                  Don't miss out my latest articles!. Get an email whenever I
                  post, no spam ✌️
                </p>
                <GlowingButton
                  variant="small"
                  href="https://alkindivv.substack.com/subscribe?next=https%3A%2F%2Fsubstack.com%2F%40alkindivv&utm_source=profile-page&utm_medium=web&utm_campaign=substack_profile&just_signed_up=true"
                >
                  Subscribe Now
                </GlowingButton>
              </FooterSection>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent">
          <div className="mx-auto max-w-[1200px] px-4 py-8">
            <p className="text-neutral-500 text-xs md:text-sm text-center">
              Copyright © {new Date().getFullYear()} AL KINDI. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
