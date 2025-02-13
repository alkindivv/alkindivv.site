import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { HiGlobeAlt } from 'react-icons/hi2';
import { getLocalizedSlug } from '@/lib/constants/slugMappings';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { pathname, query, asPath } = router;

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

      // Untuk halaman lain
      router.push({ pathname, query }, asPath, { locale });
    },
    [router, pathname, asPath, query]
  );

  return (
    <div className="relative group">
      {/* Language Button */}
      <button
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm text-neutral-400 hover:text-emerald-500 transition-colors"
        aria-label="Change language"
      >
        <HiGlobeAlt className="w-4 h-4" />
        <span className="uppercase">{router.locale}</span>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-1 w-24 py-1 bg-[#111111] border border-neutral-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
        <button
          onClick={() => changeLanguage('id')}
          className={`w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-emerald-500/10 ${
            router.locale === 'id'
              ? 'text-emerald-500 font-medium'
              : 'text-neutral-400'
          }`}
        >
          Indonesia
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className={`w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-emerald-500/10 ${
            router.locale === 'en'
              ? 'text-emerald-500 font-medium'
              : 'text-neutral-400'
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
