import React from 'react';

interface IconProps {
  className?: string;
  strokeWidth?: number;
  color?: string;
}

export const PremiumHomeIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 10.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10.2" />
    <path d="M12 2L2 9l10 4 10-4-10-7z" />
    <path d="M9 22v-5a3 3 0 0 1 6 0v5" />
    <path d="M14 12.5V10" strokeDasharray="1 2" />
  </svg>
);

export const PremiumBlogIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="16" y2="11" />
    <line x1="8" y1="15" x2="12" y2="15" />
    <circle cx="16" cy="15" r="1.2" strokeDasharray="0.1 0.9" />
  </svg>
);

export const PremiumLawIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22c-4.4 0-8-3.6-8-8V6l8-4l8 4v8c0 4.4-3.6 8-8 8Z" />
    <path d="M12 22V12" />
    <path d="M12 12L2 6" />
    <path d="M12 12l10-6" />
    <path d="M7 10.5c1 0.5 2 2 2 3" strokeDasharray="0.5 1.5" />
    <path d="M17 10.5c-1 0.5-2 2-2 3" strokeDasharray="0.5 1.5" />
  </svg>
);

export const PremiumAboutIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M12 11v2" strokeDasharray="0.5 1" />
    <path d="M9 7h6" strokeDasharray="0.5 1.5" />
  </svg>
);

export const PremiumBooksIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M12 6c1.5 0 3 0.5 3 2" strokeDasharray="0.5 1.5" />
    <path d="M12 10c1.5 0 3 0.5 3 2" strokeDasharray="0.5 1.5" />
    <path d="M12 14c1.5 0 3 0.5 3 2" strokeDasharray="0.5 1.5" />
  </svg>
);

export const PremiumContactIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
    <path d="M2 6l7.5 5.5" strokeDasharray="0.5 1" />
    <path d="M22 6l-7.5 5.5" strokeDasharray="0.5 1" />
  </svg>
);

export const PremiumResourcesIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
    <path d="M12 12l-4-2.4" strokeDasharray="0.5 1" />
    <path d="M12 12l4-2.4" strokeDasharray="0.5 1" />
    <circle cx="12" cy="12" r="0.5" />
  </svg>
);

export const PremiumWishlistIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    <circle cx="12" cy="12" r="2" strokeDasharray="0.5 1.5" />
    <path d="M12 2v3" strokeDasharray="0.5 1" />
    <path d="M19 9l-3 1" strokeDasharray="0.5 1" />
    <path d="M17.5 17.5l-2-2" strokeDasharray="0.5 1" />
    <path d="M6.5 17.5l2-2" strokeDasharray="0.5 1" />
    <path d="M5 9l3 1" strokeDasharray="0.5 1" />
  </svg>
);

export const PremiumChevronDownIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9l6 6 6-6" />
    <path d="M6 9l6 6 6-6" strokeWidth="0.5" strokeDasharray="0.5 1.5" />
  </svg>
);

export const PremiumSearchIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  strokeWidth = 1.5,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <path d="M11 8v6" strokeDasharray="0.5 1.5" />
    <path d="M8 11h6" strokeDasharray="0.5 1.5" />
  </svg>
);
