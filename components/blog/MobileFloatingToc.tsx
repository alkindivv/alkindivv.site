'use client';

import { useState, useEffect } from 'react';
import { FiList, FiX } from 'react-icons/fi';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface MobileFloatingTocProps {
  headings: Heading[];
}

export default function MobileFloatingToc({
  headings,
}: MobileFloatingTocProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('introduction');
  const pathname = usePathname();

  // Prevent background scroll when TOC open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return; // run observer only when panel open for performance

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

    const introElement = document.getElementById('introduction');
    if (introElement) observer.observe(introElement);

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el && (el.tagName === 'H2' || el.tagName === 'H3')) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [open, headings]);

  return (
    <>
      {/* Toggle Button */}
      <button
        aria-label="Daftar Isi"
        className="lg:hidden fixed bottom-6 right-4 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-[#0a0a0a]/90 border border-[#2323219b] text-neutral-400 shadow-md hover:bg-emerald-600 hover:text-white transition-colors"
        onClick={() => setOpen(true)}
      >
        <FiList className="w-5 h-5" />
      </button>

      {/* Overlay Panel */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="bg-[#0a0a0a] border-t border-white/10 rounded-t-2xl p-4 max-h-[65vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-neutral-100">
                Table of Contents
              </h2>
              <button
                aria-label="Tutup"
                className="p-2 text-neutral-400 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <nav>
              <ul className="space-y-3">
                {/* add introduction followed by headings */}
                {[
                  { id: 'introduction', title: 'Introduction', level: 2 },
                  ...headings,
                ].map((h) => (
                  <li
                    key={h.id}
                    className={clsx({
                      'ml-3': h.level > 2,
                      'ml-6': h.level > 3,
                    })}
                  >
                    <a
                      href={`#${h.id}`}
                      className={clsx(
                        'block text-[13px] leading-relaxed tracking-wide',
                        activeId === h.id ? 'text-white/90' : 'text-[#525252]',
                        'hover:text-white/90'
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(h.id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          window.history.pushState(
                            {},
                            '',
                            `${pathname.split('#')[0]}#${h.id}`
                          );
                        }
                        setOpen(false);
                      }}
                    >
                      {h.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
