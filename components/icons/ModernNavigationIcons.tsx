import React from 'react';
import { IconProps, DEFAULT_ICON_PROPS } from './types';

/**
 * Modern Navigation & Action Icons - Optimized and Intuitive
 * Features:
 * - Intuitive navigation symbols
 * - Clean action icons
 * - Consistent stroke weights
 * - Accessibility optimized
 * - Modern flat design
 */

interface NavigationIconProps extends IconProps {
  variant?: 'outline' | 'filled';
}

const createNavigationIcon = (
  name: string,
  paths: string[],
  description?: string
) => {
  const NavigationIcon: React.FC<NavigationIconProps> = ({
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

  NavigationIcon.displayName = `${name}Icon`;
  return NavigationIcon;
};

// Home - Rumah modern yang welcoming
export const HomeIcon = createNavigationIcon('Home', [
  'M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h3v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6h3a1 1 0 0 0 1-1V10',
]);

// Menu - Hamburger menu yang clean
export const MenuIcon = createNavigationIcon('Menu', [
  'M3 6h18',
  'M3 12h18',
  'M3 18h18',
]);

// Close/X - Close button yang jelas
export const CloseIcon = createNavigationIcon('Close', [
  'M18 6L6 18',
  'M6 6l12 12',
]);

// Search - Kaca pembesar yang proporsional
export const SearchIcon = createNavigationIcon('Search', [
  'M11 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
  'M21 21l-4.35-4.35',
]);

// Arrow Right - Panah ke kanan yang sleek
export const ArrowRightIcon = createNavigationIcon('Arrow Right', [
  'M5 12h14',
  'M12 5l7 7-7 7',
]);

// Arrow Left - Panah ke kiri yang sleek
export const ArrowLeftIcon = createNavigationIcon('Arrow Left', [
  'M19 12H5',
  'M12 19l-7-7 7-7',
]);

// Arrow Up - Panah ke atas
export const ArrowUpIcon = createNavigationIcon('Arrow Up', [
  'M12 19V5',
  'M5 12l7-7 7 7',
]);

// Arrow Down - Panah ke bawah
export const ArrowDownIcon = createNavigationIcon('Arrow Down', [
  'M12 5v14',
  'M19 12l-7 7-7-7',
]);

// Chevron Right - Chevron kecil ke kanan
export const ChevronRightIcon = createNavigationIcon('Chevron Right', [
  'M9 18l6-6-6-6',
]);

// Chevron Left - Chevron kecil ke kiri
export const ChevronLeftIcon = createNavigationIcon('Chevron Left', [
  'M15 18l-6-6 6-6',
]);

// Chevron Up - Chevron ke atas
export const ChevronUpIcon = createNavigationIcon('Chevron Up', [
  'M18 15l-6-6-6 6',
]);

// Chevron Down - Chevron ke bawah
export const ChevronDownIcon = createNavigationIcon('Chevron Down', [
  'M6 9l6 6 6-6',
]);

// Settings/Gear - Pengaturan yang detail
export const SettingsIcon = createNavigationIcon('Settings', [
  'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
]);

// User - Profil user yang clean
export const UserIcon = createNavigationIcon('User', [
  'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
  'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
]);

// Calendar - Kalender yang jelas
export const CalendarIcon = createNavigationIcon('Calendar', [
  'M3 4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4z',
  'M16 2v4',
  'M8 2v4',
  'M3 10h18',
  'M8 14h.01',
  'M12 14h.01',
  'M16 14h.01',
  'M8 18h.01',
  'M12 18h.01',
  'M16 18h.01',
]);

// Book - Buku yang elegant
export const BookIcon = createNavigationIcon('Book', [
  'M4 19.5A2.5 2.5 0 0 1 6.5 17H20',
  'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  'M8 6h8',
  'M8 10h6',
  'M8 14h4',
]);

// Document - Dokumen modern
export const DocumentIcon = createNavigationIcon('Document', [
  'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
  'M14 2v6h6',
  'M16 13H8',
  'M16 17H8',
  'M10 9H8',
]);

// Check - Checkmark yang clean
export const CheckIcon = createNavigationIcon('Check', ['M20 6L9 17l-5-5']);

// Plus - Plus icon yang centered
export const PlusIcon = createNavigationIcon('Plus', ['M12 5v14', 'M5 12h14']);

// Minus - Minus icon yang clean
export const MinusIcon = createNavigationIcon('Minus', ['M5 12h14']);

// Edit - Pencil untuk edit
export const EditIcon = createNavigationIcon('Edit', [
  'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
  'M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
]);

// Delete/Trash - Tempat sampah yang jelas
export const DeleteIcon = createNavigationIcon('Delete', [
  'M3 6h18',
  'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  'M10 11v6',
  'M14 11v6',
]);

// Save - Disket save icon
export const SaveIcon = createNavigationIcon('Save', [
  'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z',
  'M17 21v-8H7v8',
  'M7 3v5h8',
]);

// Download - Download arrow
export const DownloadIcon = createNavigationIcon('Download', [
  'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
  'M7 10l5 5 5-5',
  'M12 15V3',
]);

// Upload - Upload arrow
export const UploadIcon = createNavigationIcon('Upload', [
  'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
  'M17 8l-5-5-5 5',
  'M12 3v12',
]);

// Share - Share icon modern
export const ShareIcon = createNavigationIcon('Share', [
  'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8',
  'M16 6l-4-4-4 4',
  'M12 2v13',
]);

// Link - Link chain icon
export const LinkIcon = createNavigationIcon('Link', [
  'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
  'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
]);

// Copy - Copy to clipboard
export const CopyIcon = createNavigationIcon('Copy', [
  'M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z',
  'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
]);

// Eye - View/visibility
export const EyeIcon = createNavigationIcon('Eye', [
  'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z',
  'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
]);

// Eye Off - Hide/visibility off
export const EyeOffIcon = createNavigationIcon('Eye Off', [
  'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24',
  'M1 1l22 22',
]);

// Heart - Like/favorite
export const HeartIcon = createNavigationIcon('Heart', [
  'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
]);

// Star - Star rating/bookmark
export const StarIcon = createNavigationIcon('Star', [
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
]);

// Filter - Filter icon
export const FilterIcon = createNavigationIcon('Filter', [
  'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
]);

// Sort - Sort icon
export const SortIcon = createNavigationIcon('Sort', [
  'M3 6h18',
  'M6 12h12',
  'M9 18h6',
]);

// Grid - Grid view
export const GridIcon = createNavigationIcon('Grid', [
  'M3 3h7v7H3z',
  'M14 3h7v7h-7z',
  'M14 14h7v7h-7z',
  'M3 14h7v7H3z',
]);

// List - List view
export const ListIcon = createNavigationIcon('List', [
  'M8 6h13',
  'M8 12h13',
  'M8 18h13',
  'M3 6h.01',
  'M3 12h.01',
  'M3 18h.01',
]);

// Info - Information icon
export const InfoIcon = createNavigationIcon('Info', [
  'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z',
  'M12 16v-4',
  'M12 8h.01',
]);

// Warning - Warning icon
export const WarningIcon = createNavigationIcon('Warning', [
  'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
  'M12 9v4',
  'M12 17h.01',
]);

// Error - Error/X in circle
export const ErrorIcon = createNavigationIcon('Error', [
  'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z',
  'M15 9l-6 6',
  'M9 9l6 6',
]);

// Success - Success checkmark in circle
export const SuccessIcon = createNavigationIcon('Success', [
  'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z',
  'M9 12l2 2 4-4',
]);

export {
  // Aliases untuk backward compatibility
  DocumentIcon as ResumeIcon,
  StarIcon as CertificateIcon,
  UserIcon as AboutIcon,
};

/**
 * Navigation & Action Icons Collection
 */
export const NAVIGATION_ICONS = {
  home: HomeIcon,
  menu: MenuIcon,
  close: CloseIcon,
  search: SearchIcon,
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
  arrowUp: ArrowUpIcon,
  arrowDown: ArrowDownIcon,
  chevronRight: ChevronRightIcon,
  chevronLeft: ChevronLeftIcon,
  chevronUp: ChevronUpIcon,
  chevronDown: ChevronDownIcon,
  settings: SettingsIcon,
  user: UserIcon,
  calendar: CalendarIcon,
  book: BookIcon,
  document: DocumentIcon,
  check: CheckIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  save: SaveIcon,
  download: DownloadIcon,
  upload: UploadIcon,
  share: ShareIcon,
  link: LinkIcon,
  copy: CopyIcon,
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  heart: HeartIcon,
  star: StarIcon,
  filter: FilterIcon,
  sort: SortIcon,
  grid: GridIcon,
  list: ListIcon,
  info: InfoIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  success: SuccessIcon,
} as const;

export type NavigationIconName = keyof typeof NAVIGATION_ICONS;
