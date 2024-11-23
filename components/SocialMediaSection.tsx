import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiMinutemailer } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';

const SocialMediaSection = () => {
  const socialLinks = [
    {
      icon: FaFileAlt,
      text: 'Resume',
      href: '/resume.pdf',
    },
    {
      icon: FaXTwitter,
      text: '@alkindivv',
      href: 'https://twitter.com/alkindivv',
    },
    {
      icon: SiMinutemailer,
      text: 'alkindivv.site',
      href: 'mailto:alkindivv@gmail.com',
    },
    {
      icon: FaGithub,
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
          className="flex items-center gap-1.5 md:gap-2 text-gray-300 hover:text-emerald-500 transition-colors"
        >
          <link.icon className="text-sm md:text-base lg:text-lg text-gray-300 " />
          <span className=" font-sans text-sm lg:text-base 2xl:text-lg text-gray-400 hover:text-emerald-500 ">
            {link.text}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaSection;
