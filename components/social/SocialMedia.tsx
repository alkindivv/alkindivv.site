import React from 'react';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import { IoDocumentTextSharp } from 'react-icons/io5';

export default function SocialMedia() {
  const socialLinks = [
    {
      icon: IoDocumentTextSharp,
      text: 'Resume',
      href: '/resume.pdf',
      hoverColor: 'hover:text-emerald-400',
    },
    {
      icon: FaXTwitter,
      text: 'Twitter',
      href: 'https://twitter.com/alkindivv',
      hoverColor: 'hover:text-white',
    },
    {
      icon: FiGithub,
      text: 'Github',
      href: 'https://github.com/alkindivv',
      hoverColor: 'hover:text-violet-400',
    },
    {
      icon: FaLinkedinIn,
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alkindivv/',
      hoverColor: 'hover:text-blue-400',
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
          <link.icon className="text-base md:text-lg paragraph-text" />
          <span className="font-medium text-sm md:text-lg paragraph-text hover:text-emerald-500">
            {link.text}
          </span>
        </a>
      ))}
    </div>
  );
}
