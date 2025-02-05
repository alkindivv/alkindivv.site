import React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { cn } from '@/lib/utils';

interface GlowingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  variant?: 'default' | 'small';
}

// Memisahkan komponen untuk icon
const IconWrapper = React.memo(function IconWrapper({
  icon,
}: {
  icon: React.ReactNode;
}) {
  return (
    <div className="relative z-10 size-6 rounded-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-white/10 to-transparent border-t border-l border-white/10">
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
      rightIcon = <LuChevronRight className="size-[70%]" strokeWidth={1.3} />,
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

    const baseStyles = cn(
      'relative group inline-flex items-center gap-3',
      'gradient-border bg-black/90 hover:bg-black/80',
      'backdrop-blur-sm supports-[backdrop-filter]:bg-transparent',
      // 'gradient-border bg-transparent hover:bg-white/5',
      // 'backdrop-blur-sm supports-[backdrop-filter]:bg-transparent',
      'transition-all duration-300 ease-out',
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      variant === 'default' && 'px-4 py-3 rounded-xl',
      variant === 'small' &&
        'px-3 py-2 text-sm rounded-lg md:px-4 md:py-3 md:text-base md:rounded-xl',
      className
    );

    const content = (
      <>
        <GlowEffect />
        <span className="relative z-10 text-white/90 group-hover:text-white transition-colors duration-300">
          {children}
        </span>
        {isLoading ? (
          <div className="relative z-10 size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          rightIcon && <IconWrapper icon={rightIcon} />
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
