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
  const [activeId, setActiveId] = useState<string>('introduction');

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

    // Observe all headings including introduction
    const introElement = document.getElementById('introduction');
    if (introElement) {
      observer.observe(introElement);
    }

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element && (element.tagName === 'H2' || element.tagName === 'H3')) {
        observer.observe(element);
      }
    });

    return () => {
      if (introElement) {
        observer.unobserve(introElement);
      }
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element && (element.tagName === 'H2' || element.tagName === 'H3')) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  // Add Introduction to the headings list
  const allHeadings = [
    { id: 'introduction', title: 'Introduction', level: 2 },
    ...headings,
  ];

  return (
    <nav className="w-[180px] hidden sm:block shrink-0 text-left sticky top-24">
      <ul className="space-y-3 text-sm">
        {allHeadings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingLeft: `${(heading.level - 2) * 1.5}rem`,
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
                group relative flex
                hover:text-white
                ${activeId === heading.id ? 'font-medium text-white' : 'text-gray-600'}
                ${heading.level === 2 ? 'text-sm' : ' text-sm'}
              `}
            >
              <span
                className={`
                absolute left-0 top-1/2
                ${heading.level === 2 ? 'h-2 w-2' : 'h-1.5 w-1.5'}
                ${activeId === heading.id ? '' : ''}
                ${heading.level === 2 ? 'opacity-100' : 'opacity-50'}
                group-hover:bg-white group-hover:opacity-100
              `}
              ></span>
              <span className="line-clamp-2">{heading.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
