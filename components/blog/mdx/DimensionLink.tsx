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
  // Tautan dianggap eksternal jika diawali dengan `http` / `https`
  const isExternal = href.startsWith('http');

  const linkClasses = clsx(
    'relative',
    'items-center gap-1',
    'group',
    'font-medium',
    'cursor-pointer',
    className
  );

  const iconClasses = clsx(
    'inline-block w-[12px] h-[12px]',

    'transition-transform duration-300 ease-out',
    'text-neutral-400 group-hover:text-[#d0d2d7]',
    '-translate-y-[1px]',
    'group-hover:translate-x-1 group-hover:-translate-y-1'
  );

  const anchorContent = (
    <>
      <span className="dimension-link">{children}</span>
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

  return (
    <span className="relative tooltip-wrapper inline-flex">
      {linkElem}
      {/* Tooltip */}
      <span className="tooltip absolute left-1/4 bottom-full z-50 mb-2 -translate-x-1/2 max-w-[90vw] whitespace-nowrap overflow-x-auto rounded-md bg-[#1A1A1A]/90 px-3 py-1.5 text-xs text-neutral-300 shadow-xl backdrop-blur-md border border-neutral-800">
        {href}
      </span>
    </span>
  );
}
