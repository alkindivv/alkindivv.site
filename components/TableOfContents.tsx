import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

interface TOCProps {
  headings: Array<{ id: string; title: string; level: number }>;
  activeId?: string;
}

const TableOfContents = ({ headings, activeId: propActiveId }: TOCProps) => {
  const [activeId, setActiveId] = useState(propActiveId);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);
          }
        });
      },
      {
        rootMargin: '-20px 0px -80% 0px',
        threshold: [0, 1, 1],
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings, isScrolling]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    if (!id) return;

    const element = document.getElementById(id);
    if (!element) return;

    setIsScrolling(true);

    setTimeout(() => {
      const headerOffset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveId(id);
      if (window.history) {
        window.history.pushState(null, '', `#${id}`);
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    }, 0);
  };

  return (
    <aside className="hidden lg:block w-[300px] flex-shrink-10 pl-14">
      <div className="sticky top-[120px] mt-[0.5rem]">
        <div className="bg-[#111111] rounded-lg pt-6 pb-4">
          <h2 className="text-2xl font-semibold mb-6 pl-12">
            Table of Contents
          </h2>
          <nav className="max-h-[calc(100vh-300px)] overflow-y-auto">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={clsx(
                  'block w-full text-left text-sm transition-colors duration-200 py-1',
                  heading.level === 2 && 'pl-12',
                  heading.level === 3 && 'pl-16',
                  'hover:text-white',
                  activeId === heading.id ? 'text-white' : 'text-gray-600'
                )}
                style={{
                  textAlign: 'left',
                  wordWrap: 'break-word',
                  whiteSpace: 'normal',
                  lineHeight: '1.5',
                }}
              >
                {heading.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default TableOfContents;
