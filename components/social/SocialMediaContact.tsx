import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Accent from '@/components/shared/Accent';

const SocialMediaContact = React.memo(() => {
  const socialLinks = [
    {
      icon: FaGithub,
      link: 'https://github.com/alkindivv',
      label: 'GitHub',
    },
    {
      icon: FaLinkedin,
      link: 'https://linkedin.com/in/alkindivv',
      label: 'LinkedIn',
    },
    {
      icon: FaTwitter,
      link: 'https://twitter.com/alkindivv',
      label: 'Twitter',
    },
  ];

  return (
    <div className="p-6 border border-gray-700 rounded-xl">
      <h2 className="text-xl font-semibold mb-6">
        Social <Accent>Media</Accent>
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {socialLinks.map((social, idx) => (
          <a
            key={idx}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 p-4 border border-gray-700 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-all duration-300"
          >
            <social.icon className="text-2xl text-gray-400 group-hover:text-emerald-500 transition-colors" />
            <span className="text-xs text-gray-400 group-hover:text-emerald-500 transition-colors">
              {social.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
});

SocialMediaContact.displayName = 'SocialMediaContact';

export default SocialMediaContact;
