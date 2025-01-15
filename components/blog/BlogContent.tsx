import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import Accent from '@/components/shared/Accent';
import DimensionLink from '@/components/blog/mdx/DimensionLink';
import styles from '@/styles/Blog.module.css';

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
      'font-sans text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 text-gray-50',
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
    className="font-sans text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100 scroll-mt-20 mt-12 mb-6"
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
    className="font-sans text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200 scroll-mt-20 mt-8 mb-4"
    {...props}
  >
    {children}
  </h3>
);

export const P = ({ children, className = '' }: TypographyProps) => (
  <p
    className={clsx(
      'font-sf text-base sm:text-lg text-gray-400 leading-[1.8] mb-6 tracking-wide',
      className
    )}
  >
    {children}
  </p>
);

export const UL = ({ children, className = '' }: TypographyProps) => (
  <ul
    className={clsx(
      'font-sf list-disc pl-8 space-y-4 text-[17px] text-gray-300 mb-6 leading-[1.8]',
      className
    )}
  >
    {children}
  </ul>
);

export const OL = ({ children, className = '' }: TypographyProps) => (
  <ol
    className={clsx(
      'font-sf list-decimal pl-8 space-y-4 text-[17px] text-gray-300 mb-6 leading-[1.8]',
      className
    )}
  >
    {children}
  </ol>
);

export const LI = ({ children, className = '' }: TypographyProps) => (
  <li
    className={clsx(
      'font-sf text-[17px] text-gray-300 leading-[1.8] tracking-wide',
      className
    )}
  >
    {children}
  </li>
);

export const A = ({
  children,
  className = '',
  href = '#',
}: TypographyProps) => (
  <a
    href={href}
    className={clsx(
      'font-sf text-[17px] text-emerald-400 hover:text-emerald-300 transition-colors underline-offset-4 decoration-emerald-400/30 hover:decoration-emerald-300 underline',
      className
    )}
  >
    {children}
  </a>
);

export const Strong = ({ children, className = '' }: TypographyProps) => (
  <strong
    className={clsx(
      'font-sf text-[17px] font-semibold text-gray-50',
      className
    )}
  >
    {children}
  </strong>
);

export const BlockQuote = ({ children, className = '' }: TypographyProps) => (
  <blockquote
    className={clsx(
      'font-sf pl-4 border-l-2 border-emerald-500/50 italic text-[17px] text-gray-300 my-6',
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
  // blockquote: ({ children, ...props }: TypographyProps) => (
  //   <ScrollAnimation>
  //     <Blockquote {...props}>{children}</Blockquote>
  //   </ScrollAnimation>
  // ),
  a: ({ href = '#', children, ...props }: TypographyProps) => (
    <InlineScrollAnimation>
      <A href={href} {...props}>
        {children}
      </A>
    </InlineScrollAnimation>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic text-white">{children}</em>
  ),
  Accent: ({ children, ...props }: TypographyProps) => (
    <InlineScrollAnimation>
      <Accent {...props}>{children}</Accent>
    </InlineScrollAnimation>
  ),
  DimensionLink: ({ href = '#', children, ...props }: TypographyProps) => (
    <InlineScrollAnimation>
      <DimensionLink href={href} {...props}>
        {children}
      </DimensionLink>
    </InlineScrollAnimation>
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
