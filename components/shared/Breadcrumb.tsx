import React from 'react';
import Link from 'next/link';
import { HiChevronRight, HiHome } from 'react-icons/hi';

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
      <div className="relative w-full">
        <nav className="relative flex items-center space-x-1 text-sm md:text-[0.925rem] text-gray-400 py-2">
          <Link
            href="/"
            className="hover:text-emerald-500 transition-all duration-200 flex items-center gap-1.5 py-1 rounded-md group"
          >
            <HiHome className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
          </Link>

          {items.map((item, index) => (
            <React.Fragment key={index}>
              <HiChevronRight className="text-gray-600 flex-shrink-0 w-3.5 h-3.5" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="px-1.5 py-1 rounded-md hover:text-emerald-500 transition-all duration-200 line-clamp-1 font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="px-1.5 py-1 gradient-text rounded-md line-clamp-1 font-medium">
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
