import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface DimensionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function DimensionLink({
  href,
  children,
  className,
}: DimensionLinkProps) {
  const isExternal = href.startsWith('http');

  const linkClasses = clsx(
    'relative',
    'inline-flex items-center gap-1',
    'group',
    'text-decoration-none',
    'font-medium',
    'cursor-pointer',
    className
  );

  const textStyles = {
    background: 'white)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  const iconClasses = clsx(
    'inline-block w-[14px] h-[14px]',
    'transition-all duration-300 ease-out',
    'text-neutral-500 group-hover:text-[#d0d2d7]',
    'opacity-80',
    '-translate-y-[1px]',
    'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100'
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        <span className="dimension-link" style={textStyles}>
          {children}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClasses}
        >
          <path d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
        </svg>
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      <span className="dimension-link" style={textStyles}>
        {children}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClasses}
      >
        <path d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
      </svg>
    </Link>
  );
}
