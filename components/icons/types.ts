export interface IconProps {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
  color?: string;
  fill?: string;
  'aria-label'?: string;
  role?: string;
  focusable?: boolean;
}

export interface AnimatedIconProps extends IconProps {
  animate?: 'none' | 'pulse' | 'bounce' | 'spin' | 'ping' | 'fade';
  duration?: 'fast' | 'normal' | 'slow';
}

export type IconVariant = 'outline' | 'filled' | 'duotone';
export type IconTheme = 'light' | 'dark' | 'auto';
export type IconCategory =
  | 'social'
  | 'legal'
  | 'navigation'
  | 'action'
  | 'content';

export const DEFAULT_ICON_PROPS: Required<
  Pick<IconProps, 'className' | 'strokeWidth' | 'color'>
> = {
  className: 'w-6 h-6',
  strokeWidth: 1.5,
  color: 'currentColor',
};

export const ICON_SIZES = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
  '3xl': 'w-12 h-12',
} as const;

export type IconSize = keyof typeof ICON_SIZES;
