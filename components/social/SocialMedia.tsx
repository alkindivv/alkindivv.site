import React from 'react';
import { HiDocumentText } from 'react-icons/hi';
import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { BsTwitterX } from 'react-icons/bs';
import { VscGithubAlt, VscTwitter } from 'react-icons/vsc';
import Link from 'next/link';
import clsx from 'clsx';

interface SocialMediaProps {
  variant?: 'default' | 'contact';
}

export default function SocialMedia({ variant = 'default' }: SocialMediaProps) {
  const socialLinks = [
    {
      icon: HiDocumentText,
      text: 'Resume',
      href: '/resume.pdf',
      hoverColor: 'hover:text-emerald-400',
      // bgColor: 'group-hover:bg-emerald-400/10',
    },
    {
      icon: VscTwitter,
      text: '@alkindivv',
      href: 'https://twitter.com/alkindivv',
      hoverColor: 'hover:text-white',
      // bgColor: 'group-hover:bg-white/10',
    },
    {
      icon: BiLogoLinkedinSquare,
      text: 'AL KINDI',
      href: 'https://www.linkedin.com/in/alkindivv/',
      hoverColor: 'hover:text-blue-400',
      // bgColor: 'group-hover:bg-blue-400/10',
    },
    {
      icon: VscGithubAlt,
      text: '0xalkindivv.eth',
      href: 'https://github.com/alkindivv',
      hoverColor: 'hover:text-violet-400',
      // bgColor: 'group-hover:bg-violet-400/10',
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
          <link.icon className="text-sm md:text-base lg:text-lg text-gray-400 " />
          <span className=" font-medium text-sm lg:text-base 2xl:text-lg text-gray-400 hover:text-emerald-500 ">
            {link.text}
          </span>
        </a>
      ))}
    </div>
  );
}
