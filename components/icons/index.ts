/**
 * Modern Icon System - Unified Export
 *
 * High-quality, optimized, and consistent icon collection
 * Features:
 * - 🎨 Modern flat design with elegant details
 * - 📏 Consistent sizing and stroke weights
 * - ♿ Accessibility compliant
 * - 🚀 Performance optimized
 * - 🎭 Multiple variants (outline/filled)
 * - 📱 Responsive and scalable
 */

// Core Types and Utilities
export * from './types';
export * from './utils';

// Modern Icon Collections
export * from './ModernSocialIcons';
export * from './ModernLegalIcons';
export * from './ModernNavigationIcons';

// Consolidated Icon Collections
import { SOCIAL_ICONS, SocialIconName } from './ModernSocialIcons';
import { LEGAL_ICONS, LegalIconName } from './ModernLegalIcons';
import { NAVIGATION_ICONS, NavigationIconName } from './ModernNavigationIcons';

/**
 * Complete Icon Collection - All Modern Icons in One Place
 */
export const ALL_ICONS = {
  social: SOCIAL_ICONS,
  legal: LEGAL_ICONS,
  navigation: NAVIGATION_ICONS,
} as const;

export type IconCategory = keyof typeof ALL_ICONS;
export type AllIconNames = SocialIconName | LegalIconName | NavigationIconName;

/**
 * Flattened Icon Collection for Direct Access
 */
export const ICONS = {
  ...SOCIAL_ICONS,
  ...LEGAL_ICONS,
  ...NAVIGATION_ICONS,
} as const;

/**
 * Icon Statistics
 */
export const ICON_STATS = {
  total: Object.keys(ICONS).length,
  social: Object.keys(SOCIAL_ICONS).length,
  legal: Object.keys(LEGAL_ICONS).length,
  navigation: Object.keys(NAVIGATION_ICONS).length,
  categories: Object.keys(ALL_ICONS).length,
} as const;

/**
 * Helper Functions
 */

/**
 * Get all icon names from a specific category
 */
export const getIconsByCategory = (category: IconCategory): string[] => {
  return Object.keys(ALL_ICONS[category]);
};

/**
 * Check if an icon exists
 */
export const hasIcon = (iconName: string): boolean => {
  return iconName in ICONS;
};

/**
 * Get icon component by name
 */
export const getIcon = (iconName: string) => {
  return ICONS[iconName as keyof typeof ICONS];
};

/**
 * Search icons by name (fuzzy search)
 */
export const searchIcons = (query: string): string[] => {
  const lowerQuery = query.toLowerCase();
  return Object.keys(ICONS).filter((name) =>
    name.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get random icon from category
 */
export const getRandomIcon = (category?: IconCategory) => {
  const iconSet = category ? ALL_ICONS[category] : ICONS;
  const iconNames = Object.keys(iconSet);
  const randomIndex = Math.floor(Math.random() * iconNames.length);
  const iconName = iconNames[randomIndex];
  return {
    name: iconName,
    component: iconSet[iconName as keyof typeof iconSet],
  };
};

// Legacy Exports for Backward Compatibility
// These will be deprecated in future versions
export {
  GitHubIcon,
  LinkedInIcon,
  TwitterXIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
  TelegramIcon,
  EmailIcon,
  ResumeIcon,
  CertificateIcon,
} from './ModernSocialIcons';

export {
  BalanceScaleIcon,
  GavelIcon,
  CourthouseIcon,
  LegalDocumentIcon,
  ContractIcon,
  LawBookIcon,
  JudgeIcon,
  HandshakeIcon,
  CorporateLegalIcon,
  PatentIcon,
  CopyrightIcon,
  // Legacy aliases
  BalanceScaleIcon as LawScaleIcon,
  GavelIcon as LawGavelIcon,
} from './ModernLegalIcons';

export {
  HomeIcon,
  MenuIcon,
  CloseIcon,
  SearchIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  SettingsIcon,
  UserIcon,
  CalendarIcon,
  BookIcon,
  DocumentIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
  EditIcon,
  DeleteIcon,
  SaveIcon,
  DownloadIcon,
  UploadIcon,
  ShareIcon,
  LinkIcon,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  HeartIcon,
  StarIcon,
  FilterIcon,
  SortIcon,
  GridIcon,
  ListIcon,
  InfoIcon,
  WarningIcon,
  ErrorIcon,
  SuccessIcon,
  // Legacy aliases
  UserIcon as AboutIcon,
} from './ModernNavigationIcons';

/**
 * Migration Guide for Old Icon Names
 */
export const ICON_MIGRATION_MAP = {
  // Old Name -> New Name
  LawScaleIcon: 'BalanceScaleIcon',
  LawGavelIcon: 'GavelIcon',
  DocumentIcon: 'LegalDocumentIcon', // For legal context
  ResumeIcon: 'DocumentIcon', // For general documents
  CertificateIcon: 'StarIcon', // For achievements
  AboutIcon: 'UserIcon',
  PremiumHomeIcon: 'HomeIcon',
  PremiumBlogIcon: 'BookIcon',
  PremiumLawIcon: 'BalanceScaleIcon',
  PremiumAboutIcon: 'UserIcon',
  PremiumBooksIcon: 'BookIcon',
  PremiumContactIcon: 'EmailIcon',
  PremiumResourcesIcon: 'GridIcon',
  PremiumWishlistIcon: 'StarIcon',
  PremiumChevronDownIcon: 'ChevronDownIcon',
  PremiumSearchIcon: 'SearchIcon',
} as const;

/**
 * Deprecated Icons Notice
 * These icons are deprecated and will be removed in future versions
 */
export const DEPRECATED_ICONS = [
  'LawScaleIcon',
  'LawGavelIcon',
  'PremiumHomeIcon',
  'PremiumBlogIcon',
  'PremiumLawIcon',
  'PremiumAboutIcon',
  'PremiumBooksIcon',
  'PremiumContactIcon',
  'PremiumResourcesIcon',
  'PremiumWishlistIcon',
  'PremiumChevronDownIcon',
  'PremiumSearchIcon',
] as const;

/**
 * Get replacement for deprecated icon
 */
export const getMigrationTarget = (oldIconName: string): string | null => {
  return (
    ICON_MIGRATION_MAP[oldIconName as keyof typeof ICON_MIGRATION_MAP] || null
  );
};

/**
 * Check if icon is deprecated
 */
export const isDeprecated = (iconName: string): boolean => {
  return DEPRECATED_ICONS.includes(iconName as any);
};

export default ICONS;
