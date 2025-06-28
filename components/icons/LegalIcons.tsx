import React from 'react';

interface IconProps {
  className?: string;
  strokeWidth?: number;
  color?: string;
}

export const BalanceScaleIcon: React.FC<IconProps> = ({
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
    <path d="M12 3v18" />
    <path d="M5 7h14" />
    <path d="M5 7c0 2.5-2 3-2 5s2 2.5 2 5" />
    <path d="M19 7c0 2.5 2 3 2 5s-2 2.5-2 5" />
    <circle cx="5" cy="17" r="2" />
    <circle cx="19" cy="17" r="2" />
    <path d="M7 7L5 12" />
    <path d="M17 7l2 5" />
  </svg>
);

export const GavelIcon: React.FC<IconProps> = ({
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
    <path d="M10 12L2 4l2-2 8 8-2 2z" />
    <path d="M14 6l8 8-2 2-8-8 2-2z" />
    <path d="M12 14l-2 2 4 4 2-2-4-4z" />
    <rect x="4" y="20" width="16" height="2" rx="1" />
    <path d="M6 20v-6" />
    <path d="M18 20v-6" />
  </svg>
);

export const LegalDocumentIcon: React.FC<IconProps> = ({
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
    <path d="M8 9h2v2H8z" />
    <path d="M16 9h-4" />
  </svg>
);

export const CourthouseIcon: React.FC<IconProps> = ({
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
    <path d="M2 22h20" />
    <path d="M4 22V10" />
    <path d="M20 22V10" />
    <path d="M7 22v-8" />
    <path d="M17 22v-8" />
    <path d="M12 22v-8" />
    <path d="M2 10h20" />
    <path d="M12 2l10 8" />
    <path d="M12 2L2 10" />
    <path d="M7 14h2" />
    <path d="M15 14h2" />
    <path d="M10 6h4" />
  </svg>
);

export const HandshakeIcon: React.FC<IconProps> = ({
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
    <path d="M2 16v-3a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v3" />
    <path d="M2 16h7a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2H4" />
    <path d="M22 16h-7a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2h5" />
    <path d="M12 16v-5" />
    <path d="M12 11a2 2 0 1 0 0-0.1" />
    <path d="M6 16v2" />
    <path d="M18 16v2" />
  </svg>
);

export const ContractIcon: React.FC<IconProps> = ({
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
    <path d="M12 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
    <path d="M9 16H7" />
    <path d="M9 12H7" />
    <path d="M9 8H7" />
    <path d="M17 16v-6h-5" />
    <path d="M17 13h-5" />
    <path d="M17 22l3-3-3-3" />
    <path d="M14 22l-3-3 3-3" />
    <path d="M11 8h5" />
  </svg>
);

export const LawBookIcon: React.FC<IconProps> = ({
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
    <path d="M12 6l4 2-4 2-4-2 4-2z" />
    <path d="M12 10v4" />
    <path d="M8 12v4" />
    <path d="M16 12v4" />
    <path d="M8 16h8" />
  </svg>
);

export const JudgeWigIcon: React.FC<IconProps> = ({
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
    <path d="M12 2a4 4 0 0 0-4 4v4h8V6a4 4 0 0 0-4-4z" />
    <path d="M8 10v2a4 4 0 0 0 8 0v-2" />
    <path d="M4 10h16" />
    <path d="M4 10c-1 2 0 8 4 10" />
    <path d="M20 10c1 2 0 8-4 10" />
    <path d="M8 14c-1 0-2 1-2 2" />
    <path d="M16 14c1 0 2 1 2 2" />
    <path d="M12 16c0 0 1.5 2 3 2" />
    <path d="M12 16c0 0-1.5 2-3 2" />
  </svg>
);

export const FinanceLegalIcon: React.FC<IconProps> = ({
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
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2H2v2z" />
    <path d="M4 14v2" />
    <path d="M8 14v2" />
    <path d="M12 14v2" />
    <path d="M16 14v2" />
    <path d="M20 14v2" />
    <path d="M4 9h16" />
    <path d="M12 4v10" />
    <path d="M12 4c1.5 0 3 1.5 3 3" />
    <path d="M12 4c-1.5 0-3 1.5-3 3" />
    <path d="M7 9l3-3" />
    <path d="M17 9l-3-3" />
  </svg>
);

export const CorporateLegalIcon: React.FC<IconProps> = ({
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
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4v18" />
    <path d="M19 21V11l-6-4" />
    <path d="M9 9v2" />
    <path d="M9 15v2" />
    <path d="M14 13v2" />
    <path d="M14 17v2" />
    <path d="M5 11h4" />
    <path d="M19 15h-5" />
    <path d="M5 17h4" />
  </svg>
);

export const PatentIcon: React.FC<IconProps> = ({
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
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
    <path d="M12 18.5v.5" />
    <path d="M12 5v.5" />
    <path d="M5 12h.5" />
    <path d="M18.5 12h.5" />
    <path d="M15 9l1-1" />
    <path d="M9 15l-1 1" />
    <path d="M15 15l1 1" />
    <path d="M9 9L8 8" />
  </svg>
);

export const CopyrightIcon: React.FC<IconProps> = ({
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
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9.354a4 4 0 1 0 0 5.292" />
    <path d="M12 7v1" />
    <path d="M12 16v1" />
    <path d="M7 12h1" />
    <path d="M16 12h1" />
  </svg>
);
