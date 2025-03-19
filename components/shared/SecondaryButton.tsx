import React from 'react';
import { cn } from '@/lib/utils';

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: 'default' | 'small';
}

const SecondaryButton = React.forwardRef<
  HTMLButtonElement,
  SecondaryButtonProps
>(
  (
    {
      href,
      children,
      className,
      isLoading,
      disabled,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'relative inline-flex items-center gap-3',
      'gradient-border border-neutral-800 hover:border-neutral-100',
      'bg-black/50 hover:bg-black/40',
      'backdrop-blur-sm supports-[backdrop-filter]:bg-transparent',
      'transition-all duration-300 ease-out',
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      variant === 'default' && 'px-4 py-3 rounded-xl',
      variant === 'small' &&
        'px-3 py-2 text-sm rounded-lg md:px-3 md:py-2.5 md:text-base md:rounded-xl',
      className
    );

    const content = (
      <>
        <span className="relative z-10 text-white/90 hover:text-white transition-colors duration-300">
          {children}
        </span>
        {isLoading && (
          <div className="relative z-10 size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
      </>
    );

    const Component = href && !disabled ? 'a' : 'button';
    const extraProps = href
      ? {
          href,
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {
          ref,
          disabled: disabled || isLoading,
          ...props,
        };

    return React.createElement(
      Component,
      {
        className: baseStyles,
        ...extraProps,
      },
      content
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';

export default React.memo(SecondaryButton);
