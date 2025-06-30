import React from 'react';
import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /**
   * Jalur URL absolut (mis. "/blog/law/slug/") tanpa domain.
   * Jika disediakan, akan digunakan untuk membuat properti `@id` pada BreadcrumbList,
   * sehingga cocok dengan referensi `breadcrumb` di StructuredData WebPage.
   */
  pagePath?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, pagePath }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alkindi.id';
  const breadcrumbId = `${baseUrl}${pagePath || ''}#breadcrumb`;

  // Generate BreadcrumbList schema
  const breadcrumbSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-neutral-400">
          <li>
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li aria-hidden="true">
                <IoChevronForward className="w-4 h-4" />
              </li>
              <li>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-emerald-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{item.label}</span>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
