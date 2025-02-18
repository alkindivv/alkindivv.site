/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },
  defaultNS: 'common',
  localePath: 'public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  fallbackLng: 'id',
  debug: process.env.NODE_ENV === 'development',
  ns: ['common', 'blog', 'glossary'],
  pages: {
    '*': ['common'],
    '/blog': ['blog', 'common'],
    '/blog/*': ['blog', 'common'],
    '/glossary': ['glossary', 'common'],
  },
};
