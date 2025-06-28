import React, { useState, useMemo } from 'react';
import {
  ALL_ICONS,
  ICON_STATS,
  searchIcons,
  getIconsByCategory,
  IconCategory,
  AllIconNames,
} from './index';

/**
 * Interactive Icon Showcase
 * Displays all modern icons with search, filtering, and copy functionality
 */

const IconShowcase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    IconCategory | 'all'
  >('all');
  const [selectedVariant, setSelectedVariant] = useState<'outline' | 'filled'>(
    'outline'
  );
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    let iconNames: string[] = [];

    if (selectedCategory === 'all') {
      iconNames = Object.keys({
        ...ALL_ICONS.social,
        ...ALL_ICONS.legal,
        ...ALL_ICONS.navigation,
      });
    } else {
      iconNames = getIconsByCategory(selectedCategory);
    }

    if (searchQuery) {
      iconNames = searchIcons(searchQuery).filter((name) =>
        iconNames.includes(name)
      );
    }

    return iconNames;
  }, [searchQuery, selectedCategory]);

  // Copy icon name to clipboard
  const copyIconName = async (iconName: string) => {
    try {
      await navigator.clipboard.writeText(`<${iconName} />`);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Get icon component
  const getIconComponent = (
    iconName: string
  ): React.ComponentType<any> | null => {
    for (const category of Object.values(ALL_ICONS)) {
      if (iconName in category) {
        return category[
          iconName as keyof typeof category
        ] as React.ComponentType<any>;
      }
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Modern Icon System
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Koleksi ikon berkualitas tinggi, modern, dan konsisten
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {ICON_STATS.total}
            </div>
            <div className="text-sm text-blue-600/80 dark:text-blue-400/80">
              Total Icons
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {ICON_STATS.social}
            </div>
            <div className="text-sm text-green-600/80 dark:text-green-400/80">
              Social
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {ICON_STATS.legal}
            </div>
            <div className="text-sm text-purple-600/80 dark:text-purple-400/80">
              Legal
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {ICON_STATS.navigation}
            </div>
            <div className="text-sm text-orange-600/80 dark:text-orange-400/80">
              Navigation
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cari Icon
            </label>
            <input
              type="text"
              placeholder="Ketik nama icon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as IconCategory | 'all')
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Kategori</option>
              <option value="social">Social Media</option>
              <option value="legal">Legal & Hukum</option>
              <option value="navigation">Navigation & UI</option>
            </select>
          </div>

          {/* Variant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Variant
            </label>
            <select
              value={selectedVariant}
              onChange={(e) =>
                setSelectedVariant(e.target.value as 'outline' | 'filled')
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="outline">Outline</option>
              <option value="filled">Filled</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Menampilkan {filteredIcons.length} dari {ICON_STATS.total} ikon
        </div>
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {filteredIcons.map((iconName) => {
          const IconComponent = getIconComponent(iconName);
          if (!IconComponent) return null;

          return (
            <div
              key={iconName}
              onClick={() => copyIconName(iconName)}
              className="group relative bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
            >
              {/* Icon */}
              <div className="flex justify-center mb-3">
                <IconComponent
                  className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  variant={selectedVariant}
                />
              </div>

              {/* Icon Name */}
              <div className="text-xs text-center text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {iconName.replace('Icon', '')}
              </div>

              {/* Copy Feedback */}
              {copiedIcon === iconName && (
                <div className="absolute inset-0 bg-green-500/10 dark:bg-green-400/10 rounded-lg flex items-center justify-center">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Copied!
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredIcons.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 text-lg mb-2">
            Tidak ada ikon yang ditemukan
          </div>
          <div className="text-gray-500 dark:text-gray-500 text-sm">
            Coba ubah filter atau kata kunci pencarian
          </div>
        </div>
      )}

      {/* Usage Example */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Cara Penggunaan
        </h3>
        <div className="bg-gray-800 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            {`import { GitHubIcon, BalanceScaleIcon, HomeIcon } from '@/components/icons';

function MyComponent() {
  return (
    <div>
      <GitHubIcon className="w-6 h-6" />
      <BalanceScaleIcon variant="filled" className="w-8 h-8 text-blue-500" />
      <HomeIcon strokeWidth={2} aria-label="Beranda" />
    </div>
  );
}`}
          </pre>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          💡 Klik ikon untuk copy nama komponen • 📖{' '}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Baca Dokumentasi
          </a>{' '}
          • 🚀{' '}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Best Practices
          </a>
        </div>
      </div>
    </div>
  );
};

export default IconShowcase;
