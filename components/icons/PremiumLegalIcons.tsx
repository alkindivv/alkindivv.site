import React from 'react';

interface IconProps {
  className?: string;
  strokeWidth?: number;
  color?: string;
}

// Neraca Keadilan - Lebih detail dan elegan
export const PremiumScaleIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M12 2v20" />
    <path d="M12 6h7a2 2 0 0 1 2 2c0 2.5-2 3-2 5s2 2.5 2 5a2 2 0 0 1-2 2h-7" />
    <path d="M12 6H5a2 2 0 0 0-2 2c0 2.5 2 3 2 5s-2 2.5-2 5a2 2 0 0 0 2 2h7" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M5 10v4" />
    <path d="M19 10v4" />
    <path d="M8 6L5 10" />
    <path d="M16 6l3 4" />
    <path d="M3 20h18" />
    <path d="M10 2h4" />
  </svg>
);

// Palu Hakim - Lebih detail dan realistis
export const PremiumGavelIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M13 10L3 20l2 2 10-10-2-2z" />
    <path d="M11 6l10-4-1 3-8 3-1-2z" />
    <path d="M11 6l-1.5-1.5L11 3l2 1-2 2z" />
    <path d="M14 14l-2-2" />
    <rect x="5" y="21" width="14" height="1.5" rx="0.75" />
    <path d="M9 17l-2 2" />
    <path d="M17 9l2-2" />
    <path d="M3 20l2 2" />
    <path d="M10 21v-3" />
    <path d="M14 21v-3" />
  </svg>
);

// Dokumen Hukum - Dengan detail yang jelas
export const PremiumLegalDocumentIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
    <path d="M7 13.5L9 15.5L11 13.5" />
    <path d="M7 17.5L9 19.5L11 17.5" />
    <path d="M16 9h2" />
  </svg>
);

// Gedung Pengadilan - Lebih arsitektural dan elegan
export const PremiumCourthouseIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M9 6h6" />
    <path d="M9 10v-2" />
    <path d="M15 10v-2" />
    <path d="M12 10V6" />
    <path d="M4 10V8h16v2" />
  </svg>
);

// Kontrak dengan Tanda Tangan - Jelas menunjukkan dokumen kontrak
export const PremiumContractIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
    <path d="M8 21h8" />
    <path d="M10 21v-1c0-1 2-2 4-1" />
    <path d="M14 19.5c-1 .5-2 1.5-2 2" />
    <path d="M16 18c-1-1-4-1-4 0" />
  </svg>
);

// Hakim dengan Toga dan Palu - Jelas menunjukkan profesi hakim
export const PremiumJudgeIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M12 16v6" />
    <path d="M12 22h-2" />
    <path d="M12 22h2" />
    <path d="M16 5l4-2-1 3-3 1v-2z" />
    <path d="M16 5l-1-1.5 1-1.5 1 1-1 2z" />
  </svg>
);

// Buku Hukum dengan Detail - Jelas menunjukkan buku hukum/undang-undang
export const PremiumLawBookIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M8 6h-1.5" />
    <path d="M16 6h1.5" />
    <path d="M6.5 2v20" />
    <path d="M9 22c0-1 1-2 3-2s3 1 3 2" />
  </svg>
);

// Handshake - Menunjukkan kesepakatan/perjanjian dengan jelas
export const PremiumHandshakeIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M3 16.5l1 1" />
    <path d="M21 16.5l-1 1" />
    <path d="M12 16c-2 1-2 2-2 3" />
    <path d="M12 16c2 1 2 2 2 3" />
  </svg>
);

// Gedung Perusahaan - Jelas menunjukkan hukum korporasi
export const PremiumCorporateLegalIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M13 7V5l2-1v3" />
    <path d="M13 7h2" />
    <path d="M9 21v-2h2v2" />
    <path d="M13 21v-2h2v2" />
  </svg>
);

// Paten/Hak Kekayaan Intelektual - Lebih jelas menunjukkan konsep paten
export const PremiumPatentIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M12 22v-2" />
    <path d="M12 4V2" />
    <path d="M4 12H2" />
    <path d="M22 12h-2" />
    <path d="M19.07 4.93l-1.41 1.41" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 19.07l-1.41-1.41" />
    <path d="M6.34 6.34l-1.41-1.41" />
    <path d="M10 8h4" />
    <path d="M10 16h4" />
    <path d="M16 10v4" />
    <path d="M8 10v4" />
  </svg>
);

// Hak Cipta - Lebih jelas dan elegan
export const PremiumCopyrightIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M15 9.354a4 4 0 0 1 0 5.292" />
    <path d="M12 7v1" />
    <path d="M12 16v1" />
    <path d="M7 12h1" />
    <path d="M16 12h1" />
    <path d="M14.5 7.5l.5.5" />
    <path d="M9 16l.5.5" />
    <path d="M16 16l-.5.5" />
    <path d="M9 8l-.5.5" />
  </svg>
);

// Hukum Pajak/Keuangan - Jelas menunjukkan aspek keuangan dalam hukum
export const PremiumFinanceLegalIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M4 16v2" />
    <path d="M8 16v2" />
    <path d="M12 16v2" />
    <path d="M16 16v2" />
    <path d="M20 16v2" />
    <path d="M4 9h16" />
    <path d="M12 4v10" />
    <path d="M12 4c1.5 0 3 1.5 3 3" />
    <path d="M12 4c-1.5 0-3 1.5-3 3" />
    <path d="M7 9l3-3" />
    <path d="M17 9l-3-3" />
    <path d="M4 12h4" />
    <path d="M16 12h4" />
    <path d="M8 12c0-2 4-2 4 0s4 2 4 0" />
  </svg>
);

// Stempel Notaris - Jelas menunjukkan otentikasi dokumen legal
export const PremiumNotaryStampIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="5" />
    <path d="M12 4v2" />
    <path d="M12 18v2" />
    <path d="M4 12H6" />
    <path d="M18 12h2" />
    <path d="M12 12L9 9" />
    <path d="M12 12l3 3" />
    <path d="M7 7l1 1" />
    <path d="M16 16l1 1" />
    <path d="M16 7l1-1" />
    <path d="M7 16l1 1" />
    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </svg>
);

// Hukum Properti/Real Estate - Jelas menunjukkan aspek properti
export const PremiumPropertyLawIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M3 7v14" />
    <path d="M21 7v14" />
    <path d="M3 7l9-4 9 4" />
    <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
    <path d="M10 9h1v3h-1z" />
    <path d="M13 9h1v3h-1z" />
    <path d="M14 7v2" />
    <path d="M10 7v2" />
    <path d="M6 11h2" />
    <path d="M16 11h2" />
    <path d="M6 15h2" />
    <path d="M16 15h2" />
  </svg>
);

// Hukum Keluarga - Jelas menunjukkan aspek keluarga dalam hukum
export const PremiumFamilyLawIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <circle cx="12" cy="5" r="3" />
    <circle cx="6" cy="9" r="2" />
    <circle cx="18" cy="9" r="2" />
    <path d="M12 8v4" />
    <path d="M12 12c-3 0-4 3-4 6h8c0-3-1-6-4-6z" />
    <path d="M6 11v2c0 2 1 3 3 3" />
    <path d="M18 11v2c0 2-1 3-3 3" />
    <path d="M9 17v5" />
    <path d="M15 17v5" />
    <path d="M9 22h6" />
  </svg>
);

// Hukum Pidana - Jelas menunjukkan aspek pidana/kriminal
export const PremiumCriminalLawIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M2 10h20" />
    <path d="M6 14h4" />
    <path d="M14 14h4" />
    <path d="M6 18v3" />
    <path d="M18 18v3" />
    <path d="M12 6V3" />
    <circle cx="12" cy="14" r="1" />
    <path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
  </svg>
);

// Pengacara/Advokat - Jelas menunjukkan profesi pengacara
export const PremiumLawyerIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
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
    <path d="M8 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
    <circle cx="12" cy="11" r="2" />
    <path d="M12 13v3" />
    <path d="M10 16h4" />
    <path d="M9 7h6" />
    <path d="M9 9h6" />
  </svg>
);
