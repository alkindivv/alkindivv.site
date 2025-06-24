import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

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

  const anchorContent = (
    <>
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
    </>
  );

  const linkElem = isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClasses}
    >
      {anchorContent}
    </a>
  ) : (
    <Link href={href} className={linkClasses}>
      {anchorContent}
    </Link>
  );

  // Tooltip simple via CSS (no JS)
  return (
    <span className="relative group">
      {linkElem}
      <span className="pointer-events-none absolute left-1/2 bottom-full z-50 mb-2 w-max -translate-x-1/2 scale-95 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
        <span className="rounded-md bg-[#1A1A1A]/90 px-3 py-2 text-xs text-neutral-300 shadow-xl backdrop-blur-md border border-neutral-800">
          {href}
        </span>
      </span>
    </span>
  );
}
