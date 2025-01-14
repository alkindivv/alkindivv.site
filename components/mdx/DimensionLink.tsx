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

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'text-emerald-500 hover:text-emerald-400 transition-colors',
          'underline decoration-dotted underline-offset-4',
          'focus:outline-none focus-visible:ring focus-visible:ring-emerald-500',
          className
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={clsx(
        'text-emerald-500 hover:text-emerald-400 transition-colors',
        'underline decoration-dotted underline-offset-4',
        'focus:outline-none focus-visible:ring focus-visible:ring-emerald-500',
        className
      )}
    >
      {children}
    </Link>
  );
}
