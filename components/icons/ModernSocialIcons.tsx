import React from 'react';
import { IconProps, DEFAULT_ICON_PROPS } from './types';

/**
 * Modern Social Media Icons - Optimized and Consistent
 * Features:
 * - Unified design language
 * - High-quality paths
 * - Accessibility support
 * - Consistent sizing and stroke
 */

interface SocialIconProps extends IconProps {
  variant?: 'outline' | 'filled';
}

const createSocialIcon = (
  name: string,
  paths: string[],
  description?: string
) => {
  const SocialIcon: React.FC<SocialIconProps> = ({
    className = DEFAULT_ICON_PROPS.className,
    strokeWidth = DEFAULT_ICON_PROPS.strokeWidth,
    color = DEFAULT_ICON_PROPS.color,
    variant = 'outline',
    'aria-label': ariaLabel,
    ...rest
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={variant === 'filled' ? color : 'none'}
      stroke={variant === 'outline' ? color : 'none'}
      strokeWidth={variant === 'outline' ? strokeWidth : 0}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel || `${name} icon`}
      role="img"
      {...rest}
    >
      {paths.map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
  );

  SocialIcon.displayName = `${name}Icon`;
  return SocialIcon;
};

// GitHub - Lebih presisi dan modern
export const GitHubIcon = createSocialIcon('GitHub', [
  'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
]);

// LinkedIn - Desain yang lebih clean dan proporsional
export const LinkedInIcon = createSocialIcon('LinkedIn', [
  'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
  'M2 9h4v12H2z',
  'M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
]);

// Twitter/X - Desain X yang lebih elegan dan balanced
export const TwitterXIcon = createSocialIcon('Twitter X', [
  'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
]);

// Instagram - Lebih modern dan detail
export const InstagramIcon = createSocialIcon('Instagram', [
  'M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z',
  'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'M17.5 6.5h.01',
]);

// Facebook - Lebih proporsioanl dan clean
export const FacebookIcon = createSocialIcon('Facebook', [
  'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
]);

// WhatsApp - Lebih detail dan recognizable
export const WhatsAppIcon = createSocialIcon('WhatsApp', [
  'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  'M9.2 13.7c.8 1.6 2.1 2.9 3.7 3.7l1.2-.8c.2-.1.5-.1.7 0l2.3 1.1c.3.1.4.4.4.7v1.9c0 .6-.4 1-1 1-7.7 0-14-6.3-14-14 0-.6.4-1 1-1h1.9c.3 0 .6.2.7.4l1.1 2.3c.1.2.1.5 0 .7l-.8 1.2z',
]);

// Telegram - Desain yang lebih aerodynamic
export const TelegramIcon = createSocialIcon('Telegram', [
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-.42.27-.84.53-1.3.9-2.5 1.73-2.64 1.78-.3.1-.57.05-.85-.08l-1.35-.42c-.41-.13-.74-.2-.71-.43.03-.23.38-.35.76-.48z',
]);

// Email - Modern envelope design
export const EmailIcon = createSocialIcon('Email', [
  'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
  'M22 6l-10 7L2 6',
]);

// Resume/CV - Modern document dengan profile
export const ResumeIcon = createSocialIcon('Resume', [
  'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
  'M14 2v6h6',
  'M10 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  'M16 13h2',
  'M16 17h2',
  'M8 17h1',
  'M8 13h1',
]);

// Certificate - Modern achievement badge
export const CertificateIcon = createSocialIcon('Certificate', [
  'M4 7c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-3l-3 3-3-3H6c-1.1 0-2-.9-2-2V7z',
  'M12 5v2',
  'M9 9h6',
  'M9 12h4',
]);

// YouTube - Iconic play button
export const YouTubeIcon = createSocialIcon('YouTube', [
  'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z',
  'M9.75 15.02l5.75-3.27-5.75-3.27v6.54z',
]);

// Discord - Modern gaming chat
export const DiscordIcon = createSocialIcon('Discord', [
  'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z',
]);

// TikTok - Modern musical note style
export const TikTokIcon = createSocialIcon('TikTok', [
  'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.39z',
]);

export {
  // Alias untuk backward compatibility
  GitHubIcon as LawScaleIcon, // Temporary - will be moved to LegalIcons
  EmailIcon as DocumentIcon, // Temporary - will be moved to ContentIcons
};

/**
 * Social Media Icons Collection
 */
export const SOCIAL_ICONS = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterXIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  email: EmailIcon,
  resume: ResumeIcon,
  certificate: CertificateIcon,
  youtube: YouTubeIcon,
  discord: DiscordIcon,
  tiktok: TikTokIcon,
} as const;

export type SocialIconName = keyof typeof SOCIAL_ICONS;
