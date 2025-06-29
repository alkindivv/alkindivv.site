// Async Remark plugin to add internal links for certain keywords
// Works in a CommonJS environment while loading ESM-only dependencies via dynamic import.

async function remarkInternalLinks() {
  const { visit } = await import('unist-util-visit');

  // Enhanced keyword mapping for internal links
  const internalLinks = {
    // Legal terms
    merger: '/blog/law/merger-dan-akuisisi',
    akuisisi: '/blog/law/merger-dan-akuisisi',
    'merger dan akuisisi': '/blog/law/merger-dan-akuisisi',
    'm&a': '/blog/law/merger-dan-akuisisi',
    kepailitan: '/blog/law/hukum-kepailitan-indonesia',
    'hukum kepailitan': '/blog/law/hukum-kepailitan-indonesia',
    'perbuatan melawan hukum':
      '/blog/law/perbuatan-melawan-hukum-dan-wanprestasi',
    wanprestasi: '/blog/law/perbuatan-melawan-hukum-dan-wanprestasi',
    'pasar modal': '/blog/law/regulasi-pasar-modal',
    'regulasi pasar modal': '/blog/law/regulasi-pasar-modal',
    'perseroan terbatas':
      '/blog/law/pendirian-permodalan-struktur-organisasi-dan-restrukturisasi-perusahaan',
    'pendirian pt':
      '/blog/law/pendirian-permodalan-struktur-organisasi-dan-restrukturisasi-perusahaan',
    'struktur organisasi':
      '/blog/law/pendirian-permodalan-struktur-organisasi-dan-restrukturisasi-perusahaan',

    // Crypto terms
    cryptocurrency:
      '/blog/cryptocurrency/the-comprehensive-guide-to-cryptocurrency',
    bitcoin: '/blog/cryptocurrency/the-comprehensive-guide-to-cryptocurrency',
    blockchain:
      '/blog/cryptocurrency/the-comprehensive-guide-to-cryptocurrency',
    'aset kripto': '/blog/law/regulasi-aset-kripto',
    'regulasi kripto': '/blog/law/regulasi-aset-kripto',
    'regulasi cryptocurrency': '/blog/law/regulasi-aset-kripto',

    // Categories
    hukum: '/blog/law',
    'kategori hukum': '/blog/law',
    'artikel hukum': '/blog/law',
    crypto: '/blog/cryptocurrency',
    'kategori crypto': '/blog/cryptocurrency',

    // Pages
    glossary: '/glossary',
    glosarium: '/glossary',
    'kamus hukum': '/glossary',
    resources: '/resources',
    'sumber daya': '/resources',
    tentang: '/about',
    kontak: '/contact',
    wishlist: '/wishlist',
    'daftar buku': '/books',
    books: '/books',
    buku: '/books',

    // English keywords
    'corporate law': '/blog/law',
    'capital markets': '/blog/law',
    'mergers & acquisitions': '/blog/law',
    bankruptcy: '/blog/law',
    insolvency: '/blog/law',
    'capital market': '/blog/law',
    'digital asset': '/blog/cryptocurrency',
    defi: '/blog/cryptocurrency',
    'smart contract': '/blog/cryptocurrency',
    web3: '/blog/cryptocurrency',
    ipo: '/blog/law',
    ico: '/blog/cryptocurrency',
  };

  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || !node.value) return;

      const text = node.value;
      let replacements = null;

      // Sort keywords by length (longest first) to match longer phrases first
      const sortedKeywords = Object.keys(internalLinks).sort(
        (a, b) => b.length - a.length
      );

      for (const keyword of sortedKeywords) {
        const url = internalLinks[keyword];
        const regex = new RegExp(
          `\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
          'gi'
        );

        if (regex.test(text)) {
          const parts = text.split(regex);
          const matches = text.match(regex);

          if (matches && matches.length > 0) {
            replacements = [];

            for (let i = 0; i < parts.length; i++) {
              if (parts[i]) {
                replacements.push({ type: 'text', value: parts[i] });
              }

              if (i < parts.length - 1 && matches[i]) {
                replacements.push({
                  type: 'link',
                  url,
                  children: [{ type: 'text', value: matches[i] }],
                });
              }
            }
            break; // Process only first keyword match to avoid nesting
          }
        }
      }

      if (replacements) {
        parent.children.splice(index, 1, ...replacements);
      }
    });
  };
}

module.exports = remarkInternalLinks;
