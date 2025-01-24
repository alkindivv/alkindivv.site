import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';

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
    className
  );

  const textStyles = {
    background: 'white)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  const iconClasses = clsx(
    'inline-block w-[10px] h-[10px]',
    'transition-all duration-300 ease-out',
    'text-[#d0d2d7] opacity-80',
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
        <HiMiniArrowTopRightOnSquare className={iconClasses} />
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      <span className="dimension-link" style={textStyles}>
        {children}
      </span>
      <HiMiniArrowTopRightOnSquare className={iconClasses} />
    </Link>
  );
}
