import React, { useEffect, useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import Accent from '../shared/Accent';

interface TOCHeading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0% 0% -80% 0%',
        threshold: 1.0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="p-4 lg:p-6">
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineMenu className="w-4 h-4 text-emerald-500" />
        <h2 className="text-sm font-medium">
          <Accent>Table of Contents</Accent>
        </h2>
      </div>

      <ul className="space-y-2.5 text-[13px]">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingLeft: `${(heading.level - 2) * 1}rem`,
            }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                  inline: 'nearest',
                });
              }}
              className={`
                block transition-all
                hover:text-emerald-500
                ${activeId === heading.id ? 'text-emerald-500' : 'text-gray-400'}
                ${heading.level === 2 ? 'font-medium' : 'font-normal'}
              `}
            >
              <span className="line-clamp-2">{heading.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
