import React from 'react';
import Link from 'next/link';
import { HiHome } from 'react-icons/hi';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function generateBreadcrumbLD(items: BreadcrumbItem[]) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindivv.site';
  const listItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
    ...items.map((item, idx) => {
      const position = idx + 2;
      const element: any = {
        '@type': 'ListItem',
        position,
        name: item.label,
      };
      if (item.href) {
        // Ensure absolute URL
        element.item = item.href.startsWith('http')
          ? item.href
          : `${baseUrl}${item.href}`;
      }
      return element;
    }),
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: listItems,
  };
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbLD = generateBreadcrumbLD(items);
  return (
    <>
      {/* Wrapper */}
      <div className="relative w-full">
        {/* Nav */}
        <nav className="relative flex flex-wrap items-center text-sm md:text-[0.925rem] text-gray-400 py-2">
          {/* Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-200 hover:text-emerald-400 hover:bg-white/5 hover:ring-1 hover:ring-emerald-500/30  backdrop-blur-sm group"
          >
            <HiHome className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
          </Link>

          {/* List Items */}
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {/* Separator */}
              <span className="mx-1 text-gray-600 select-none">/</span>

              {/* Link / Current */}
              {item.href ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center px-2 py-1 rounded-md transition-all duration-200 hover:text-emerald-400 line-clamp-1 font-medium backdrop-blur-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-md font-semibold gradient-text line-clamp-1">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLD),
        }}
      />
    </>
  );
}
