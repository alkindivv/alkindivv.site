'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface DimensionLinkNoArrowProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export default function DimensionLinkNoArrow({
  href,
  children,
  className,
  tooltipPosition = 'top',
}: DimensionLinkNoArrowProps) {
  const isExternal = href.startsWith('http');
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

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
    background: 'white',
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

  // Tooltip position classes - fixed positioning
  const tooltipClasses = clsx(
    'absolute z-50 px-3 py-1.5 text-xs',
    'rounded-md shadow-lg',
    'bg-[#1A1A1A]/90 text-neutral-300',
    'backdrop-blur-md border border-neutral-800/30',
    'transition-opacity duration-200 ease-out',
    'opacity-0 pointer-events-none',
    'max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis',
    {
      'bottom-full left-1/2 -translate-x-1/2 mb-2': tooltipPosition === 'top',
      'top-full left-1/2 -translate-x-1/2 mt-2': tooltipPosition === 'bottom',
      'right-full top-1/2 -translate-y-1/2 mr-2': tooltipPosition === 'left',
      'left-full top-1/2 -translate-y-1/2 ml-2': tooltipPosition === 'right',
    },
    isTooltipVisible && 'opacity-100 shadow-[0_0_15px_rgba(8,168,117,0.15)]'
  );

  // Format URL for display in tooltip - hanya menampilkan domain
  const displayUrl = () => {
    try {
      if (isExternal) {
        const url = new URL(href);
        return url.origin;
      }
      return href;
    } catch (e) {
      // Jika URL tidak valid, tampilkan href asli
      return href;
    }
  };

  // Improved arrow icon
  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClasses}
    >
      <path d="M5.5 14.5l9-9m0 0h-6.75m6.75 0v6.75" />
    </svg>
  );

  const linkContent = (
    <>
      <span className="dimension-link" style={textStyles}>
        {children}
      </span>
      {/* <ArrowIcon /> */}
      <span className={tooltipClasses}>
        {isExternal ? (
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3 text-neutral-400"
            >
              <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
              <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 005.656 5.656l3-3a4 4 0 00-.225-5.865z" />
            </svg>
            {displayUrl()}
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3 text-neutral-400"
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
              />
            </svg>
            {displayUrl()}
          </span>
        )}
        <span
          className={clsx(
            'absolute w-2 h-2 bg-[#1A1A1A]/90 rotate-45 border border-neutral-800/30',
            {
              'bottom-[-5px] left-1/2 -translate-x-1/2 border-t-0 border-l-0':
                tooltipPosition === 'top',
              'top-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0':
                tooltipPosition === 'bottom',
              'top-1/2 right-[-5px] -translate-y-1/2 border-l-0 border-t-0':
                tooltipPosition === 'left',
              'top-1/2 left-[-5px] -translate-y-1/2 border-r-0 border-b-0':
                tooltipPosition === 'right',
            }
          )}
        />
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onFocus={() => setIsTooltipVisible(true)}
        onBlur={() => setIsTooltipVisible(false)}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={linkClasses}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onFocus={() => setIsTooltipVisible(true)}
      onBlur={() => setIsTooltipVisible(false)}
    >
      {linkContent}
    </Link>
  );
}
