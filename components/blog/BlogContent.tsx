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
      'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 bg-gradient-to-r from-gray-50 to-gray-200 bg-clip-text text-transparent',
      className
    )}
  >
    {children}
  </h1>
);

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
    className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100 scroll-mt-20 mt-16 mb-6"
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
    className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-200 scroll-mt-20 mt-12 mb-4 underline underline-offset-4 decoration-gray-500/30 hover:decoration-gray-300"
    {...props}
  >
    {children}
  </h3>
);

export const P = ({ children, className = '' }: TypographyProps) => (
  <p className={clsx('text-base md:text-lg  mb-6 leading-loose', className)}>
    {children}
  </p>
);

export const UL = ({ children, className = '' }: TypographyProps) => (
  <ul
    className={clsx(
      'list-disc pl-6 space-y-2 text-base md:text-lg text-gray-300 mb-6',
      className
    )}
  >
    {children}
  </ul>
);

export const OL = ({ children, className = '' }: TypographyProps) => (
  <ol
    className={clsx(
      'list-decimal pl-6 space-y-3 text-base md:text-lg mb-6 leading-relaxed',
      className
    )}
  >
    {children}
  </ol>
);

export const LI = ({ children, className = '' }: TypographyProps) => (
  <li className={clsx('text-base md:text-lg text-gray-300', className)}>
    {children}
  </li>
);

export const Strong = ({ children, className = '' }: TypographyProps) => (
  <strong
    className={clsx('text-base md:text-lg font-bold text-white', className)}
  >
    {children}
  </strong>
);

export const BlockQuote = ({ children, className = '' }: TypographyProps) => (
  <blockquote
    className={clsx(
      'pl-4 border-l-2 border-emerald-500/50 italic text-[17px] text-gray-300 my-6',
      className
    )}
  >
    {children}
  </blockquote>
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
  li: ({ children, ...props }: TypographyProps) => (
    <LI {...props}>{children}</LI>
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
