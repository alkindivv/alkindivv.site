import React from 'react';
import { HiDocumentText } from 'react-icons/hi';
import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { VscGithubAlt, VscTwitter } from 'react-icons/vsc';

interface SocialMediaProps {
  variant?: 'default' | 'contact';
}

export default function SocialMedia({
  variant: _variant = 'default',
}: SocialMediaProps) {
  const socialLinks = [
    {
      icon: HiDocumentText,
      text: 'Resume',
      href: '/resume.pdf',
    },
    {
      icon: VscTwitter,
      text: '@alkindivv',
      href: 'https://twitter.com/alkindivv',
    },
    {
      icon: BiLogoLinkedinSquare,
      text: 'AL KINDI',
      href: 'https://www.linkedin.com/in/alkindivv/',
    },
    {
      icon: VscGithubAlt,
      text: '0xalkindivv.eth',
      href: 'https://github.com/alkindivv',
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 md:gap-1 text-gray-400 hover:text-emerald-500 transition-colors"
        >
          <link.icon className="text-sm md:text-base lg:text-lg text-gray-400" />
          <span className="font-medium text-sm lg:text-base 2xl:text-lg text-gray-400 hover:text-emerald-500">
            {link.text}
          </span>
        </a>
      ))}
    </div>
  );
}
