import React from 'react';
import {
  LuChevronRight,
  LuChevronUp,
  LuChevronDown,
  LuChevronLeft,
} from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { LuExternalLink } from 'react-icons/lu';

interface GlowingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'right' | 'up' | 'down' | 'link';
  isLoading?: boolean;
  variant?: 'default' | 'small' | 'minimal';
}

// Memisahkan komponen untuk icon
const IconWrapper = React.memo(function IconWrapper({
  icon,
}: {
  icon: React.ReactNode;
}) {
  return (
    <div className="relative z-10 size-6 rounded-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-emerald-500/20  to-transparent border-t border-l border-emerald-500/20 ">
      {icon}
    </div>
  );
});

IconWrapper.displayName = 'IconWrapper';

// Memisahkan komponen untuk glow effect
const GlowEffect = React.memo(function GlowEffect() {
  return (
    <>
      <div className="pointer-events-none select-none absolute inset-[-1px] rounded-[inherit] p-px overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15), transparent 50%)',
          }}
        />
      </div>
      <div
        className="pointer-events-none select-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
        style={{
          background:
            'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 45%)',
        }}
      />
    </>
  );
});

GlowEffect.displayName = 'GlowEffect';

const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  (
    {
      href,
      children,
      className,
      icon,
      iconPosition = 'right',
      isLoading,
      disabled,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (e.currentTarget as HTMLElement).style.setProperty(
          '--mouse-x',
          `${x}%`
        );
        (e.currentTarget as HTMLElement).style.setProperty(
          '--mouse-y',
          `${y}%`
        );
      },
      []
    );

    // Default icons berdasarkan iconPosition
    const getDefaultIcon = () => {
      switch (iconPosition) {
        case 'up':
          return <LuChevronUp className="size-[70%]" strokeWidth={1.3} />;
        case 'down':
          return <LuChevronDown className="size-[70%]" strokeWidth={1.3} />;
        case 'right':
        default:
          return <LuChevronRight className="size-[70%]" strokeWidth={1.3} />;
        case 'link':
          return <LuExternalLink className="size-[70%]" strokeWidth={1.3} />;
      }
    };

    // Gunakan icon yang disediakan atau default berdasarkan iconPosition
    const buttonIcon = icon || getDefaultIcon();

    const baseStyles = cn(
      'relative group inline-flex items-center gap-3 transition-all duration-300 ease-out',
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      variant === 'default' &&
        'gradient-border bg-black/90 hover:bg-black/80 backdrop-blur-sm supports-[backdrop-filter]:bg-transparent px-4 py-3 rounded-xl',
      variant === 'small' &&
        'gradient-border bg-black/90 hover:bg-black/80 backdrop-blur-sm supports-[backdrop-filter]:bg-transparent px-3 py-2 text-sm rounded-lg md:px-3 md:py-2.5 md:text-base md:rounded-xl',
      variant === 'minimal' &&
        'bg-transparent hover:bg-transparent backdrop-blur-none',
      className
    );

    const textStyles = cn(
      'relative z-10 transition-colors duration-300',
      (variant === 'default' || variant === 'small') &&
        'text-neutral-100 group-hover:text-white',
      variant === 'minimal' && 'text-neutral-300 group-hover:text-white'
    );

    const content = (
      <>
        {(variant === 'default' || variant === 'small') && <GlowEffect />}
        <span className={textStyles}>{children}</span>
        {isLoading ? (
          <div className="relative z-10 size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          buttonIcon && <IconWrapper icon={buttonIcon} />
        )}
      </>
    );

    const Component = href && !disabled ? 'a' : 'button';
    const extraProps = href
      ? {
          href,
          target: '_blank',
          rel: 'noopener noreferrer',
          onMouseMove: handleMouseMove,
        }
      : {
          ref,
          disabled: disabled || isLoading,
          onMouseMove: handleMouseMove,
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

GlowingButton.displayName = 'GlowingButton';

export default React.memo(GlowingButton);
