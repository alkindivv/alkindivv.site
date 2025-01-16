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
    'dimension-link',
    'relative',
    'text-decoration-none',
    'font-semibold',
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        style={{
          background: 'var(--link-gradient)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={linkClasses}
      style={{
        background: 'var(--link-gradient)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {children}
    </Link>
  );
}
