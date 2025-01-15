import React from 'react';
import Link from 'next/link';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import Accent from './Accent';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="relative w-full">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0  pointer-events-none" />

      <nav className="relative flex items-center space-x-0 sm:space-x-1 text-xs sm:text-sm text-gray-400 py-2">
        <Link
          href="/"
          className="hover:text-emerald-500 transition-colors flex items-center gap-1.5 py-1 rounded-md hover:bg-emerald-500/10"
        >
          <HiHome className="w-4 h-4" />
        </Link>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <HiChevronRight className="text-gray-600 flex-shrink-0 w-4 h-4" />
            {item.href ? (
              <Link
                href={item.href}
                className="px-2 py-1 rounded-md hover:bg-emerald-500/10 hover:text-emerald-500 transition-all line-clamp-1"
              >
                {item.label}
              </Link>
            ) : (
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md line-clamp-1 font-medium">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
