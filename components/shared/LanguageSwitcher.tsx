import { useRouter } from 'next/router';
import { useCallback } from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const changeLanguage = useCallback(
    (locale: string) => {
      router.push({ pathname, query }, asPath, { locale });
    },
    [router, pathname, asPath, query]
  );

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('id')}
        className={`px-2 py-1 text-sm rounded-md transition-colors ${
          router.locale === 'id'
            ? 'bg-emerald-600 text-white'
            : 'text-gray-400 hover:text-emerald-500'
        }`}
      >
        ID
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 text-sm rounded-md transition-colors ${
          router.locale === 'en'
            ? 'bg-emerald-600 text-white'
            : 'text-gray-400 hover:text-emerald-500'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
