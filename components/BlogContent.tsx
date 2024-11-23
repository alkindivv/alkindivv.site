import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import DimensionLink from './mdx/DimensionLink';
import Accent from './Accent';
import Blockquote from './mdx/Blockquote';

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
      'text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-white',
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
    className="text-xl md:text-2xl lg:text-3xl font-bold text-white scroll-mt-20 mt-10 mb-4"
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
    className="text-lg md:text-xl lg:text-2xl font-bold text-white scroll-mt-20 mt-8 mb-3"
    {...props}
  >
    {children}
  </h3>
);

export const P = ({ children, className = '' }: TypographyProps) => (
  <p
    className={clsx(
      'text-base md:text-lg text-gray-300 leading-relaxed mb-6',
      className
    )}
  >
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

export const LI = ({ children, className = '' }: TypographyProps) => (
  <li className={clsx('text-base md:text-lg text-gray-300', className)}>
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
      'text-base md:text-lg text-emerald-500 hover:text-emerald-400 transition-colors',
      className
    )}
  >
    {children}
  </a>
);

export const Strong = ({ children, className = '' }: TypographyProps) => (
  <strong
    className={clsx('text-base md:text-lg font-bold text-white', className)}
  >
    {children}
  </strong>
);

export const Em = ({ children, className = '' }: TypographyProps) => (
  <em className={clsx('text-base md:text-lg italic text-white', className)}>
    {children}
  </em>
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
    <ScrollAnimation>
      <H1 {...props}>{children}</H1>
    </ScrollAnimation>
  ),
  h2: ({ children, ...props }: TypographyProps) => (
    <ScrollAnimation>
      <H2 {...props}>{children}</H2>
    </ScrollAnimation>
  ),
  h3: ({ children, ...props }: TypographyProps) => (
    <ScrollAnimation>
      <H3 {...props}>{children}</H3>
    </ScrollAnimation>
  ),
  p: ({ children, ...props }: TypographyProps) => (
    <ScrollAnimation>
      <P {...props}>{children}</P>
    </ScrollAnimation>
  ),
  blockquote: ({ children, ...props }: TypographyProps) => (
    <ScrollAnimation>
      <Blockquote {...props}>{children}</Blockquote>
    </ScrollAnimation>
  ),
  ul: ({ children, ...props }: TypographyProps) => (
    <ScrollAnimation>
      <UL {...props}>{children}</UL>
    </ScrollAnimation>
  ),
  li: ({ children, ...props }: TypographyProps) => (
    <ScrollAnimation>
      <LI {...props}>{children}</LI>
    </ScrollAnimation>
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
const BlogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <article className="prose prose-lg dark:prose-dark max-w-[900px] prose-headings:text-white prose-strong:text-white prose-em:text-white">
      {children}
    </article>
  );
};

export default BlogContent;
