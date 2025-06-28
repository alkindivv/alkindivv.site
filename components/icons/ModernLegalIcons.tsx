import React from 'react';
import { IconProps, DEFAULT_ICON_PROPS } from './types';

/**
 * Modern Legal Icons - Optimized and Professional
 * Features:
 * - Professional legal symbolism
 * - High-quality vector paths
 * - Consistent design language
 * - Accessibility compliant
 * - Modern flat design with elegant details
 */

interface LegalIconProps extends IconProps {
  variant?: 'outline' | 'filled';
}

const createLegalIcon = (
  name: string,
  paths: string[],
  description?: string
) => {
  const LegalIcon: React.FC<LegalIconProps> = ({
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

  LegalIcon.displayName = `${name}Icon`;
  return LegalIcon;
};

// Balance Scale - Simbol keadilan yang presisi dan elegan
export const BalanceScaleIcon = createLegalIcon('Balance Scale', [
  'M12 3v18', // Tiang utama
  'M12 6h8a1 1 0 0 1 1 1v1c0 2-1.5 3-1.5 4.5S21 14.5 21 16.5v1a1 1 0 0 1-1 1h-8', // Timbangan kanan
  'M12 6H4a1 1 0 0 0-1 1v1c0 2 1.5 3 1.5 4.5S3 14.5 3 16.5v1a1 1 0 0 0 1 1h8', // Timbangan kiri
  'M19 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', // Mangkuk kanan
  'M5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', // Mangkuk kiri
  'M2 21h20', // Base
  'M10 3h4', // Top handle
]);

// Gavel - Palu hakim yang lebih realistis dan proporsional
export const GavelIcon = createLegalIcon('Gavel', [
  'M14.5 8.5l-9 9a1 1 0 0 0 0 1.4l1.1 1.1a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4l-1.1-1.1a1 1 0 0 0-1.4 0z', // Kepala palu
  'M18 6l2-2a1 1 0 0 1 1.4 0l.6.6a1 1 0 0 1 0 1.4l-2 2-2-2z', // Handle palu
  'M3 20h18', // Sound block base
  'M7 17h10v1.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5V17z', // Sound block
]);

// Courthouse - Gedung pengadilan yang megah dan simbolis
export const CourthouseIcon = createLegalIcon('Courthouse', [
  'M2 22h20', // Base foundation
  'M4 22V12', // Left pillar
  'M8 22V12', // Left inner pillar
  'M12 22V12', // Center pillar
  'M16 22V12', // Right inner pillar
  'M20 22V12', // Right pillar
  'M2 12h20', // Platform
  'M12 2l10 10H2L12 2z', // Roof triangle
  'M9 5h6v2H9z', // Entrance detail
  'M6 15h3v3H6z', // Left door
  'M15 15h3v3h-3z', // Right door
  'M10 15h4v1h-4z', // Center detail
]);

// Legal Document - Dokumen legal dengan seal dan signature
export const LegalDocumentIcon = createLegalIcon('Legal Document', [
  'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', // Document body
  'M14 2v6h6', // Corner fold
  'M8 12h8', // Text line 1
  'M8 16h6', // Text line 2
  'M8 20h4', // Text line 3
  'M16 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', // Seal circle
  'M8 8h3v2H8z', // Header block
]);

// Contract with Handshake - Kontrak dengan simbolisme kesepakatan
export const ContractIcon = createLegalIcon('Contract', [
  'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', // Document
  'M14 2v6h6', // Corner
  'M8 11h8', // Text lines
  'M8 13h6',
  'M8 15h4',
  'M12 18c-2 1-2 2-2 3h4c0-1 0-2-2-3z', // Signature curve
  'M16 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', // Notary seal
]);

// Law Book - Buku hukum dengan detail yang jelas
export const LawBookIcon = createLegalIcon('Law Book', [
  'M4 19.5A2.5 2.5 0 0 1 6.5 17H20v5H6.5A2.5 2.5 0 0 1 4 19.5z', // Book spine
  'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', // Book body
  'M8 6h8v1H8z', // Title
  'M8 9h6', // Text line 1
  'M8 11h8', // Text line 2
  'M8 13h5', // Text line 3
  'M12 15l2 1-2 1-2-1 2-1z', // Legal symbol
  'M6.5 2v20', // Binding
]);

// Judge - Hakim dengan toga dan wig
export const JudgeIcon = createLegalIcon('Judge', [
  'M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4z', // Head/wig
  'M8 8v3a4 4 0 0 0 8 0V8', // Face area
  'M6 10h12v8c0 2-2 4-6 4s-6-2-6-4V10z', // Toga body
  'M6 18h12', // Toga bottom
  'M9 14h6', // Toga detail
  'M18 8l3-1.5v3L18 8z', // Gavel in hand
  'M4 19h16v1H4z', // Bench
]);

// Handshake - Kesepakatan yang profesional
export const HandshakeIcon = createLegalIcon('Handshake', [
  'M2 17h3a3 3 0 0 0 3-3v-1a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1a3 3 0 0 0 3 3h3', // Arms
  'M8 17l1-1h6l1 1', // Hands connection
  'M9 16h6', // Handshake center
  'M6 19v3', // Left support
  'M18 19v3', // Right support
  'M4 22h4', // Left base
  'M16 22h4', // Right base
]);

// Corporate Legal - Gedung korporat dengan simbol hukum
export const CorporateLegalIcon = createLegalIcon('Corporate Legal', [
  'M3 21h18', // Ground
  'M5 21V8l8-5v18', // Main building
  'M19 21V13l-6-4', // Side building
  'M9 11h2v2H9z', // Window 1
  'M9 15h2v2H9z', // Window 2
  'M14 15h2v2h-2z', // Window 3
  'M14 17h2v2h-2z', // Window 4
  'M9 7l2-1-2-1-2 1 2 1z', // Legal symbol
  'M7 21h2v-3H7v3z', // Entrance
]);

// Patent - Simbol hak paten yang jelas
export const PatentIcon = createLegalIcon('Patent', [
  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', // Outer circle
  'M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z', // Inner circle
  'M12 9v6', // Vertical line
  'M9 12h6', // Horizontal line
  'M12 4v2', // Top marker
  'M12 18v2', // Bottom marker
  'M4 12h2', // Left marker
  'M18 12h2', // Right marker
  'M10.5 10.5h3v3h-3z', // Center square
]);

// Copyright - Simbol hak cipta yang profesional
export const CopyrightIcon = createLegalIcon('Copyright', [
  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', // Outer circle
  'M15 9a4 4 0 1 0 0 6', // C symbol
  'M12 7v1', // Top detail
  'M12 16v1', // Bottom detail
  'M7 12h1', // Left detail
  'M16 12h1', // Right detail
]);

// Family Law - Hukum keluarga dengan simbolisme keluarga
export const FamilyLawIcon = createLegalIcon('Family Law', [
  'M12 5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', // Parent head
  'M12 8v6', // Parent body
  'M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', // Child 1 head
  'M16 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', // Child 2 head
  'M8 10v4', // Child 1 body
  'M16 10v4', // Child 2 body
  'M6 14h12c1 0 2 1 2 2v4H4v-4c0-1 1-2 2-2z', // House/protection
  'M9 18h6', // Unity line
]);

// Criminal Law - Hukum pidana dengan simbolisme keamanan
export const CriminalLawIcon = createLegalIcon('Criminal Law', [
  'M12 2l8 4v5c0 5-8 9-8 9s-8-4-8-9V6l8-4z', // Shield
  'M9 12l2 2 4-4', // Check mark
  'M12 2v8', // Center line
  'M8 10h8', // Horizontal detail
  'M6 18h12v2H6z', // Base line
]);

// Property Law - Hukum properti dengan simbolisme rumah
export const PropertyLawIcon = createLegalIcon('Property Law', [
  'M3 21h18', // Ground
  'M3 12l9-7 9 7v9H3v-9z', // House structure
  'M9 21v-6h6v6', // Door area
  'M7 14h2v2H7z', // Window 1
  'M15 14h2v2h-2z', // Window 2
  'M10 8h4v1h-4z', // Roof detail
  'M12 3v2', // Antenna/detail
  'M8 21h8', // Threshold
]);

// Lawyer/Attorney - Pengacara dengan briefcase
export const LawyerIcon = createLegalIcon('Lawyer', [
  'M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', // Head
  'M12 8v6', // Body
  'M8 10h8v8H8z', // Suit jacket
  'M10 14v4', // Tie
  'M6 12h2v6H6z', // Briefcase
  'M16 12h2v6h-2z', // Briefcase handle
  'M8 18h8v2H8z', // Base
  'M10 8h4v2h-4z', // Collar
]);

// Notary Stamp - Stempel notaris
export const NotaryStampIcon = createLegalIcon('Notary Stamp', [
  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', // Outer ring
  'M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', // Inner ring
  'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', // Center circle
  'M12 10v4', // Vertical cross
  'M10 12h4', // Horizontal cross
  'M12 5V3', // Top line
  'M12 21v-2', // Bottom line
  'M5 12H3', // Left line
  'M21 12h-2', // Right line
]);

// Financial Law - Hukum keuangan dengan simbolisme bank
export const FinanceLawIcon = createLegalIcon('Financial Law', [
  'M2 19h20v2H2z', // Base
  'M4 19V9l8-4 8 4v10', // Building structure
  'M6 12h2v5H6z', // Column 1
  'M10 12h2v5h-2z', // Column 2
  'M14 12h2v5h-2z', // Column 3
  'M18 12h2v5h-2z', // Column 4
  'M4 9h16v2H4z', // Top platform
  'M12 3l6 3H6l6-3z', // Roof
  'M11 6h2v1h-2z', // Symbol
]);

export {
  // Aliases untuk backward compatibility
  BalanceScaleIcon as LawScaleIcon,
  GavelIcon as LawGavelIcon,
  LegalDocumentIcon as DocumentIcon,
  CopyrightIcon as CertificateIcon,
};

/**
 * Legal Icons Collection
 */
export const LEGAL_ICONS = {
  balanceScale: BalanceScaleIcon,
  gavel: GavelIcon,
  courthouse: CourthouseIcon,
  legalDocument: LegalDocumentIcon,
  contract: ContractIcon,
  lawBook: LawBookIcon,
  judge: JudgeIcon,
  handshake: HandshakeIcon,
  corporateLegal: CorporateLegalIcon,
  patent: PatentIcon,
  copyright: CopyrightIcon,
  familyLaw: FamilyLawIcon,
  criminalLaw: CriminalLawIcon,
  propertyLaw: PropertyLawIcon,
  lawyer: LawyerIcon,
  notaryStamp: NotaryStampIcon,
  financialLaw: FinanceLawIcon,
} as const;

export type LegalIconName = keyof typeof LEGAL_ICONS;
