import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import DimensionLink from './mdx/DimensionLink';
import AccentNormal from '@/components/shared/AccentNormal';
import styles from '@/styles/Blog.module.css';
import Accent from '@/components/shared/Accent';
// Typography Components
interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  id?: string;
}

export const H1 = ({ children, className = '' }: TypographyProps) => (
  <h1
    className={clsx(
      'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tighter mb-12',
      className
    )}
  >
    {children}
  </h1>
);

// export const H2 = ({
//   id,
//   children,
//   ...props
// }: {
//   id?: string;
//   children: React.ReactNode;
// }) => (
//   <h2
//     id={id}
//     className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white scroll-mt-20 mb-8 relative leading-normal tracking-normal"
//     {...props}
//   >
//     {children}
//   </h2>
// );

// export const H3 = ({
//   id,
//   children,
//   ...props
// }: {
//   id?: string;
//   children: React.ReactNode;
// }) => (
//   <h3
//     id={id}
//     className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-200 scroll-mt-20 mb-6 relative leading-tight"
//     {...props}
//   >
//     {children}
//   </h3>
// );

// export const P = ({ children, className = '' }: TypographyProps) => (
//   <p
//     className={clsx(
//       'text-base md:text-lg text-gray-400 mb-6 leading-loose tracking-wide',
//       className
//     )}
//   >
//     {children}
//   </p>
// );

export const H2 = ({
  id,
  children,
  ...props
}: {
  id?: string;
  children: React.ReactNode;
}) => (
  <h2
    id={id}
    className="text-[1.5rem] font-semibold text-[#F5F5F5] scroll-mt-20 mb-8 relative leading-tight tracking-normal"
    {...props}
  >
    {children}
  </h2>
);

export const H3 = ({
  id,
  children,
  ...props
}: {
  id?: string;
  children: React.ReactNode;
}) => (
  <h3
    id={id}
    className="text-[1.25rem] text-[#F5F5F5] font-semibold scroll-mt-20 mb-6 relative leading-tight"
    {...props}
  >
    {children}
  </h3>
);

export const P = ({ children, className = '' }: TypographyProps) => (
  <p
    className={clsx(
      'text-[1rem] text-[#A3A3A3] mb-6 leading-relaxed font-["system-ui"]',
      className
    )}
  >
    {children}
  </p>
);

export const UL = ({ children, className = '' }: TypographyProps) => (
  <ul
    className={clsx(
      'list-none pl-6 space-y-3 text-[1rem] text-[#A3A3A3] mb-6',
      className
    )}
  >
    {children}
  </ul>
);

export const OL = ({ children, className = '' }: TypographyProps) => (
  <ol
    className={clsx(
      'list-decimal pl-6 space-y-4 text-[1rem] mb-6 leading-relaxed marker:text-emerald-500/70',
      className
    )}
  >
    {children}
  </ol>
);

export const LI = ({ children, className = '' }: TypographyProps) => (
  <li
    className={clsx(
      'text-[1rem] text-[#A3A3A3] leading-relaxed pl-6 relative before:content-[""] before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-2 before:bg-emerald-500/30 before:rounded-full',
      className
    )}
  >
    {children}
  </li>
);

export const Strong = ({ children, className = '' }: TypographyProps) => (
  <strong className={clsx('text-[1rem] text-[#D4D4D4]', className)}>
    {children}
  </strong>
);

export const BlockQuote = ({ children, className = '' }: TypographyProps) => (
  <blockquote
    className={clsx(
      "pl-6 border-l-2 border-emerald-500/50 italic text-lg text-gray-300 my-8 relative before:content-['\"'] before:absolute before:-left-3 before:-top-4 before:text-4xl before:text-emerald-500/30 before:font-serif",
      className
    )}
  >
    {children}
  </blockquote>
);

export const Introduction = ({
  children,
  className = '',
  ...props
}: TypographyProps) => (
  <section className="mb-10">
    {/* <h2 */}
    <div
      id="introduction"
      className="text-xl md:text-2xl lg:text-3xl font-semibold text-white scroll-mt-20 mb-4 relative"
      {...props}
    >
      Introduction
    </div>
    {/* </h2> */}
    <div
      className={clsx(
        'text-[1.25rem] text-white leading-relaxed tracking-wide border-b border-gray-700/50',
        className
      )}
    >
      {children}
    </div>
  </section>
);

// export const InlineScrollAnimation = ({ children }: { children: React.ReactNode }) => {
//   const elementRef = useRef<HTMLDivElement>(null);

const InlineScrollAnimation = ({ children }: { children: React.ReactNode }) => {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-start');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: [0, 0.1, 0.2],
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <span
      ref={elementRef}
      className="inline-block opacity-0 translate-y-2 transition-all duration-500 ease-out"
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </span>
  );
};

// Scroll Animation Component
const ScrollAnimation = ({ children }: { children: React.ReactNode }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-in-start');
            }, 100);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '-20px 0px -80px 0px',
        threshold: 0.1,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className="content-block"
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

// MDX Components
export const MDXComponents = {
  h1: ({ children, ...props }: TypographyProps) => (
    <H1 {...props}>{children}</H1>
  ),
  h2: ({ children, ...props }: TypographyProps) => (
    <H2 {...props}>{children}</H2>
  ),
  h3: ({ children, ...props }: TypographyProps) => (
    <H3 {...props}>{children}</H3>
  ),
  p: ({ children, ...props }: TypographyProps) => <P {...props}>{children}</P>,
  blockquote: ({ children, ...props }: TypographyProps) => (
    <BlockQuote {...props}>{children}</BlockQuote>
  ),
  ul: ({ children, ...props }: TypographyProps) => (
    <UL {...props}>{children}</UL>
  ),
  ol: ({ children, ...props }: TypographyProps) => (
    <OL {...props}>{children}</OL>
  ),
  li: ({ children, ...props }: TypographyProps & { ordered?: boolean }) => (
    <LI {...props}> {children}</LI>
  ),
  a: ({ href = '#', children, ...props }: TypographyProps) => (
    <DimensionLink href={href} {...props}>
      {children}
    </DimensionLink>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <Strong>{children}</Strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  Accent: ({ children, ...props }: TypographyProps) => (
    <Accent {...props}>{children}</Accent>
  ),
  DimensionLink: ({ href = '#', children, ...props }: TypographyProps) => (
    <DimensionLink href={href} {...props}>
      {children}
    </DimensionLink>
  ),
  Introduction: ({ children, className, ...props }: TypographyProps) => (
    <Introduction className={className} {...props}>
      {children}
    </Introduction>
  ),
};

// Main Blog Content Component
// const BlogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <article className="prose prose-lg dark:prose-dark max-w-[900px] prose-headings:text-white prose-strong:text-white prose-em:text-white">
//       {children}
//     </article>
//   );
// };

// export default BlogContent;
