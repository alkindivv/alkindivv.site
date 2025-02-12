export const slugTranslations: Record<string, { id: string; en: string }> = {
  'bankruptcy-law-in-indonesia': {
    id: 'hukum-kepailitan-indonesia',
    en: 'bankruptcy-law-in-indonesia',
  },
  // Tambahkan artikel lain di sini
};

// Helper function untuk mendapatkan slug berdasarkan bahasa
export function getLocalizedSlug(originalSlug: string, locale: string = 'id') {
  const translation = slugTranslations[originalSlug];
  if (!translation) return originalSlug;
  return translation[locale as 'id' | 'en'] || originalSlug;
}

// Helper function untuk mendapatkan originalSlug dari slug yang diterjemahkan
export function getOriginalSlug(localizedSlug: string) {
  for (const [original, translations] of Object.entries(slugTranslations)) {
    if (
      translations.id === localizedSlug ||
      translations.en === localizedSlug
    ) {
      return original;
    }
  }
  return localizedSlug;
}
