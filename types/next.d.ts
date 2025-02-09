import type { LinkProps as NextLinkProps } from 'next/link';
import type { Url } from 'next/dist/shared/lib/router/router';

declare module 'next/link' {
  export interface LinkProps extends Omit<NextLinkProps, 'href'> {
    href: Url | string;
  }
}
