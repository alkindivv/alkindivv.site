import React from 'react';
import { HiDocument, HiDocumentText, HiOutlineDocument } from 'react-icons/hi';
import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { BsTwitterX } from 'react-icons/bs';
import { VscGithubAlt, VscTwitter } from 'react-icons/vsc';
import Link from 'next/link';
import clsx from 'clsx';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SlSocialLinkedin } from 'react-icons/sl';
import { GrDocumentUser } from 'react-icons/gr';
import { IoDocumentTextSharp } from 'react-icons/io5';
import { RiLinkedinLine } from 'react-icons/ri';
import { CiLinkedin } from 'react-icons/ci';
import { SiLinkedin } from 'react-icons/si';

interface SocialMediaProps {
  variant?: 'default' | 'contact';
}

export default function SocialMedia({ variant = 'default' }: SocialMediaProps) {
  const socialLinks = [
    {
      icon: IoDocumentTextSharp,
      text: 'Resume',
      href: '/resume.pdf',
      hoverColor: 'hover:text-emerald-400',
      // bgColor: 'group-hover:bg-emerald-400/10',
    },
    {
      icon: FaXTwitter,
      text: 'Twitter',
      href: 'https://twitter.com/alkindivv',
      hoverColor: 'hover:text-white',
      // bgColor: 'group-hover:bg-white/10',
    },
    {
      icon: FiGithub,
      text: 'Github',
      href: 'https://github.com/alkindivv',
      hoverColor: 'hover:text-violet-400',
      // bgColor: 'group-hover:bg-violet-400/10',
    },
    {
      icon: FaLinkedinIn,
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alkindivv/',
      hoverColor: 'hover:text-blue-400',
      // bgColor: 'group-hover:bg-blue-400/10',
    },
  ];

  //   return (
  //     <div
  //       className={clsx(
  //         'flex flex-wrap',
  //         variant === 'contact' ? 'gap-4' : 'gap-3 md:gap-4'
  //       )}
  //     >
  //       {socialLinks.map((link, index) => (
  //         <Link
  //           key={index}
  //           href={link.href}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           className={clsx(
  //             'group flex items-center',
  //             // 'rounded-lg border border-gray-800',
  //             // 'bg-gray-900/50 backdrop-blur-sm',
  //             // 'transition-all duration-300',
  //             // 'hover:border-gray-700 hover:scale-105',
  //             'gap-1.5 md:gap-2',
  //             link.text
  //           )}
  //         >
  //           <div
  //             className={clsx(
  //               'rounded-md transition-all duration-300',

  //               link.bgColor
  //             )}
  //           >
  //             <link.icon className="text-xl md:text-2xl" />
  //           </div>
  //           <span className="font-light text-sm lg:text-base tracking-wide">
  //             {link.text}
  //           </span>
  //         </Link>
  //       ))}
  //     </div>
  //   );
  // }

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
          <link.icon className="text-sm md:text-base lg:text-lg paragraph-text" />
          <span className=" leading-relaxed font-medium text-sm lg:text-base 2xl:text-lg paragraph-text hover:text-emerald-500 ">
            {link.text}
          </span>
        </a>
      ))}
    </div>
  );
}
