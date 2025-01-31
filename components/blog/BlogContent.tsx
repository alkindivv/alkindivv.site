import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import DimensionLink from '@/components/common/DimensionLink';
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
    className="text-[1.45rem] text-[#E5E7EB] font-semibold scroll-mt-20 mb-6 relative leading-relaxed "
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
    className="text-[1.25rem] text-[#F5F5F5] font-bold scroll-mt-20 mb-6 relative leading-tight "
    {...props}
  >
    {children}
  </h3>
);

export const P = ({ children, className = '' }: TypographyProps) => (
  <p
    className={clsx(
      'leading-loose text-[0.95rem] md:text-[1.05rem] text-[#A3A3A3] mb-6 font-[system-ui]',
      className
    )}
  >
    {children}
  </p>
);

export const UL = ({ children, className = '' }: TypographyProps) => (
  <ul
    className={clsx(
      'list-disc pl-8 space-y-3 text-[0.95rem] md:text-[1.05rem] font-[system-ui] text-[#A3A3A3] mb-6',
      className
    )}
  >
    {children}
  </ul>
);

export const OL = ({ children, className = '' }: TypographyProps) => (
  <ol
    className={clsx(
      'list-decimal pl-6 space-y-4 text-[0.95rem] md:text-[1.05rem] font-[system-ui] mb-6 leading-loose marker:text-[#A3A3A3]',
      className
    )}
  >
    {children}
  </ol>
);

export const LI = ({ children, className = '' }: TypographyProps) => (
  <li
    className={clsx(
      'text-[0.95rem] md:text-[1.05rem] font-[system-ui] text-[#A3A3A3] pl-0 relative ',
      className
    )}
  >
    {children}
  </li>
);

export const Strong = ({ children, className = '' }: TypographyProps) => (
  <strong
    className={clsx(
      'text-[0.95rem] md:text-[1.05rem] font-paragraf text-[#D4D4D4]',
      className
    )}
  >
    {children}
  </strong>
);

export const BlockQuote = ({ children, className = '' }: TypographyProps) => (
  <blockquote
    className={clsx(
      'pl-4 -mt-2 -mb-2 italic font-paragraf font-normal text-[0.95rem] md:text-[1.05rem] text-[#D4D4D4] [&>*]:!text-[#D4D4D4] leading-loose',
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
    <div
      id="introduction"
      className="text-xl md:text-2xl lg:text-3xl font-semibold text-white scroll-mt-20 mb-4 relative"
      {...props}
    >
      Introduction
    </div>
    <div
      className={clsx(
        'text-[1.25rem] text-white leading-relaxed border-b border-gray-700/50',
        className
      )}
    >
      {children}
    </div>
  </section>
);

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

export const CodeBlock = ({
  children,
  className = '',
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => {
  const language = className?.replace('language-', '');
  const [isCopied, setIsCopied] = React.useState(false);

  const getTextContent = (children: React.ReactNode): string => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) {
      return children.map((child) => getTextContent(child)).join('');
    }
    if (children && typeof children === 'object' && 'props' in children) {
      return getTextContent(children.props.children);
    }
    return '';
  };

  const handleCopy = () => {
    const text = getTextContent(children);
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative my-6 group">
      {title && (
        <div className="absolute top-0 right-0 px-4 py-2 text-xs font-medium text-gray-400">
          {title}
        </div>
      )}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-2 text-xs text-gray-400 hover:text-white bg-gray-800 rounded-md flex items-center gap-1.5"
        >
          {isCopied ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-3.5 w-3.5 text-emerald-400"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-3.5 w-3.5"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M8 16c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2h-1c-2.828 0-4.243 0-5.121.879C8 3.757 8 5.172 8 8" />
                <path d="M8 19.5c-2.357 0-3.536 0-4.268-.732C3 18.035 3 16.857 3 14.5v-5c0-2.357 0-3.536.732-4.268C4.464 4.5 5.643 4.5 8 4.5" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre
        className={clsx(
          'overflow-x-auto rounded-lg bg-[#1b1b1f] p-4',
          'border border-gray-800/40',
          'text-[13.6px] leading-relaxed',
          'scrollbar-thin scrollbar-track-gray-800/20 scrollbar-thumb-gray-800/40',
          className
        )}
      >
        <code
          className={clsx('text-gray-300', language && `language-${language}`)}
        >
          {children}
        </code>
      </pre>
    </div>
  );
};

export const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="px-1.5 py-0.5 text-[0.9em] bg-gray-800/50 text-gray-600 rounded-md font-mono">
    {children}
  </code>
);

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
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="text-[0.95rem] md:text-[1.05rem] font-paragraf text-[#A3A3A3] italic">
      {children}
    </em>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="text-[0.95rem] md:text-[1.05rem] font-paragraf text-[#D4D4D4] font-semibold">
      {children}
    </strong>
  ),
  Image: ({ src, alt, width, height, ...props }: any) => (
    <div className="relative w-full aspect-[1.88/1] mb-12 -mt-10 md:mb-12 md:-mt-14 group cursor-zoom-in">
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-contain"
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
          priority
          {...props}
        />
      </div>
    </div>
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
  pre: ({ children, ...props }: { children: React.ReactNode }) => {
    if (typeof children === 'object' && children && 'type' in children) {
      return children;
    }
    return <pre {...props}>{children}</pre>;
  },
  code: CodeBlock,
  inlineCode: InlineCode,
};
