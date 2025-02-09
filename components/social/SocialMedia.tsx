import React from 'react';
import {
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiRss,
  FiTwitter,
} from 'react-icons/fi';

export default function SocialMedia() {
  const socialLinks = [
    {
      icon: FiFileText,
      text: 'Resume',
      href: '/resume.pdf',
      hoverColor: 'hover:text-emerald-400',
    },
    {
      icon: FiTwitter,
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
      icon: FiLinkedin,
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alkindivv/',
      hoverColor: 'hover:text-blue-400',
    },
    {
      icon: FiRss,
      text: 'Feed',
      href: '/feed.xml',
      hoverColor: 'hover:text-blue-400',
    },
  ];

  return (
    <div className="flex flex-wrap gap-6">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex items-center justify-center  backdrop-blur-sm ${link.hoverColor} transition-all duration-300 hover:scale-110`}
          data-tooltip={link.text}
        >
          <link.icon
            className="w-5 h-5 social-icon text-neutral-400"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          />
          <span className="absolute -top-8 scale-0 transition-all rounded bg-neutral-900 p-2 text-xs text-neutral-50 group-hover:scale-100">
            {link.text}
          </span>
        </a>
      ))}
    </div>
  );
}
