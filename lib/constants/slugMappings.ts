export const slugTranslations: Record<string, { id: string; en: string }> = {
  'bankruptcy-law-in-indonesia': {
    id: 'hukum-kepailitan-indonesia',
    en: 'bankruptcy-law-in-indonesia',
  },
  'hukum-kepailitan-indonesia': {
    id: 'hukum-kepailitan-indonesia',
    en: 'bankruptcy-law-in-indonesia',
  },
  'understanding-blockchain-technology': {
    id: 'memahami-teknologi-blockchain',
    en: 'understanding-blockchain-technology',
  },
  'memahami-teknologi-blockchain': {
    id: 'memahami-teknologi-blockchain',
    en: 'understanding-blockchain-technology',
  },
  // Tambahkan artikel lain di sini
};

// Helper function untuk mendapatkan slug berdasarkan bahasa
export function getLocalizedSlug(
  originalSlug: string,
  locale: string = 'id'
): string {
  // Coba cari di mapping langsung
  const translation = slugTranslations[originalSlug];
  if (translation) {
    return translation[locale as 'id' | 'en'];
  }

  // Jika tidak ditemukan, cari slug yang memiliki terjemahan ke slug ini
  for (const [key, value] of Object.entries(slugTranslations)) {
    if (value.id === originalSlug || value.en === originalSlug) {
      return value[locale as 'id' | 'en'];
    }
  }

  // Jika tidak ditemukan mapping, kembalikan slug asli
  return originalSlug;
}

// Helper function untuk mendapatkan originalSlug (versi bahasa Inggris)
export function getOriginalSlug(localizedSlug: string): string {
  // Coba cari di mapping langsung
  const translation = slugTranslations[localizedSlug];
  if (translation) {
    return translation.en; // Selalu gunakan versi bahasa Inggris sebagai original
  }

  // Jika tidak ditemukan, cari slug yang memiliki terjemahan ke slug ini
  for (const [_key, value] of Object.entries(slugTranslations)) {
    if (value.id === localizedSlug || value.en === localizedSlug) {
      return value.en; // Selalu gunakan versi bahasa Inggris sebagai original
    }
  }

  // Jika tidak ditemukan mapping, kembalikan slug asli
  return localizedSlug;
}
