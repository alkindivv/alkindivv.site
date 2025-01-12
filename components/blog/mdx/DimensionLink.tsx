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
          'text-accent transition-colors hover:text-accent-dark',
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
        'text-accent transition-colors hover:text-accent-dark',
        className
      )}
    >
      {children}
    </Link>
  );
}
