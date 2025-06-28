import React from 'react';
import { IconProps, DEFAULT_ICON_PROPS, ICON_SIZES, IconSize } from './types';

/**
 * Helper function untuk membuat props ikon yang konsisten
 */
export const createIconProps = (props: IconProps = {}) => {
  const {
    className,
    size,
    strokeWidth = DEFAULT_ICON_PROPS.strokeWidth,
    color = DEFAULT_ICON_PROPS.color,
    fill = 'none',
    'aria-label': ariaLabel,
    role = 'img',
    focusable = false,
    ...rest
  } = props;

  // Handle size prop
  let finalClassName = className;
  if (size) {
    if (typeof size === 'string' && size in ICON_SIZES) {
      finalClassName = ICON_SIZES[size as IconSize];
    } else if (typeof size === 'number') {
      finalClassName = `w-${size} h-${size}`;
    }
  }

  if (!finalClassName) {
    finalClassName = DEFAULT_ICON_PROPS.className;
  }

  return {
    className: finalClassName,
    strokeWidth,
    stroke: color,
    fill,
    'aria-label': ariaLabel,
    role,
    focusable: focusable.toString(),
    ...rest,
  };
};

/**
 * Base SVG component untuk semua ikon
 */
export const BaseSVG: React.FC<{
  children: React.ReactNode;
  viewBox?: string;
  props: IconProps;
}> = ({ children, viewBox = '0 0 24 24', props }) => {
  const svgProps = createIconProps(props);

  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ...svgProps,
    },
    children
  );
};

/**
 * Helper untuk menggabungkan class names
 */
export const combineClasses = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(' ').trim();
};

/**
 * Utility untuk membuat path yang optimal
 */
export const optimizePath = (pathData: string): string => {
  return pathData
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/([MLHVCSQTAZmlhvcsqtaz])\s+/g, '$1') // Remove space after commands
    .trim();
};

/**
 * Predefined animation classes
 */
export const ANIMATION_CLASSES = {
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  spin: 'animate-spin',
  ping: 'animate-ping',
  fade: 'animate-pulse opacity-50',
  none: '',
} as const;
