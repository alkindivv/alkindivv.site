import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { HiGlobeAlt } from 'react-icons/hi2';
import { getLocalizedSlug } from '@/lib/constants/slugMappings';
import clsx from 'clsx';

interface LanguageSwitcherProps {
  variant?: 'default' | 'blog';
}

const LanguageSwitcher = ({ variant = 'default' }: LanguageSwitcherProps) => {
  const router = useRouter();
  const { pathname, query, asPath } = router;

  // Cek apakah halaman saat ini mendukung translasi
  const isTranslatablePage =
    pathname.startsWith('/blog') || pathname === '/glossary';

  // Jika bukan halaman yang dapat diterjemahkan, jangan tampilkan switcher
  if (!isTranslatablePage) {
    return null;
  }

  const changeLanguage = useCallback(
    (locale: string) => {
      // Jika ini adalah halaman artikel blog
      if (pathname.includes('/blog/[category]/[slug]')) {
        const currentSlug = query.slug as string;
        const localizedSlug = getLocalizedSlug(currentSlug, locale);
        const category = query.category as string;

        const path =
          locale === 'en'
            ? `/blog/${category}/${localizedSlug}`
            : `/${locale}/blog/${category}/${localizedSlug}`;

        router.push(path);
        return;
      }

      // Untuk halaman blog index atau glossary
      router.push({ pathname, query }, asPath, { locale });
    },
    [router, pathname, asPath, query]
  );

  if (variant === 'blog') {
    return (
      <div className="relative group">
        {/* Language Button - Blog Variant */}
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] text-neutral-200
          border border-gray-800/50 hover:border-emerald-500/50 transition-all duration-300"
          aria-label="Change language"
        >
          <HiGlobeAlt className="w-4 h-4 text-emerald-500" />
          <span className="text-sm uppercase">{router.locale}</span>
        </button>

        {/* Dropdown Menu - Blog Variant */}
        <div className="absolute right-0 mt-2 w-32 py-2 bg-[#000000] border border-gray-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
          <button
            onClick={() => changeLanguage('id')}
            className={clsx(
              'w-full px-4 py-2 text-left text-sm transition-colors hover:bg-emerald-500/10',
              router.locale === 'id'
                ? 'text-emerald-500 font-medium'
                : 'text-neutral-400'
            )}
          >
            Indonesia
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={clsx(
              'w-full px-4 py-2 text-left text-sm transition-colors bg-black hover:bg-emerald-500/10',
              router.locale === 'en'
                ? 'text-emerald-500 font-medium'
                : 'text-neutral-400'
            )}
          >
            English
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Language Button - Default Variant */}
      <button
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm text-neutral-400 hover:text-emerald-500 transition-colors"
        aria-label="Change language"
      >
        <HiGlobeAlt className="w-4 h-4" />
        <span className="uppercase">{router.locale}</span>
      </button>

      {/* Dropdown Menu - Default Variant */}
      <div className="absolute right-0 mt-1 w-24 py-1 bg-[#111111] border border-neutral-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
        <button
          onClick={() => changeLanguage('id')}
          className={clsx(
            'w-full px-3 py-1.5 text-left text-sm transition-colors bg-black hover:bg-emerald-500/10',
            router.locale === 'id'
              ? 'text-emerald-500 font-medium'
              : 'text-neutral-400'
          )}
        >
          Indonesia
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className={clsx(
            'w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-emerald-500/10',
            router.locale === 'en'
              ? 'text-emerald-500 font-medium'
              : 'text-neutral-400'
          )}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
