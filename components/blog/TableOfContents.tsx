import React, { useEffect, useState } from 'react';

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
    <nav className="w-[240px] hidden sm:block border border-[#2323219b] rounded-lg p-4 shrink-0 text-left sticky top-24">
      <ul className="space-y-3 text-[0.8rem]">
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
                hover:text-white/90
                ${activeId === heading.id ? 'text-white/90' : 'text-[#525252]'}
                text-[13px] leading-relaxed tracking-wide
              `}
            >
              <span
                className={`
                absolute left-0 top-1/2
                ${heading.level === 2 ? '' : 'h-1.5 w-1.5'}
                ${activeId === heading.id ? 'bg-white/20' : ''}
                ${heading.level === 2 ? 'opacity-100' : 'opacity-50'}
                group-hover:bg-white/20 group-hover:opacity-100
                `}
              ></span>
              <span className="line-clamp-2 font-paragraf">
                {heading.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
