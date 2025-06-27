// Async Remark plugin to add internal links for certain keywords
// Works in a CommonJS environment while loading ESM-only dependencies via dynamic import.

async function remarkInternalLinks() {
  const { visit } = await import('unist-util-visit');

  const KEYWORDS_MAP = {
    /* ——— English Keywords ——— */
    'corporate law': '/blog/law',
    'capital markets': '/blog/law',
    'mergers & acquisitions': '/blog/law',
    bankruptcy: '/blog/law',
    insolvency: '/blog/law',
    'capital market': '/blog/law',
    cryptocurrency: '/blog/cryptocurrency',
    blockchain: '/blog/cryptocurrency',
    'digital asset': '/blog/cryptocurrency',
    defi: '/blog/cryptocurrency',
    'smart contract': '/blog/cryptocurrency',
    web3: '/blog/cryptocurrency',
    ipo: '/blog/law',
    ico: '/blog/cryptocurrency',

    /* ——— Indonesian Keywords ——— */
    'hukum korporasi': '/blog/law',
    'pasar modal': '/blog/law',
    merger: '/blog/law',
    akuisisi: '/blog/law',
    kepailitan: '/blog/law',
    'aset kripto': '/blog/cryptocurrency',
    'pertanggungjawaban direksi': '/blog/law',
    'perusahaan terbatas': '/blog/law',
    'uu perseroan terbatas': '/blog/law',
  };

  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || !node.value) return;

      const text = node.value;
      let replacements = null;

      for (const [keyword, url] of Object.entries(KEYWORDS_MAP)) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        if (regex.test(text)) {
          const parts = text.split(regex);
          replacements = [];
          for (let i = 0; i < parts.length; i++) {
            if (parts[i]) replacements.push({ type: 'text', value: parts[i] });
            if (i < parts.length - 1) {
              replacements.push({
                type: 'link',
                url,
                children: [{ type: 'text', value: keyword }],
              });
            }
          }
          break; // process only first keyword match to avoid nesting
        }
      }

      if (replacements) {
        parent.children.splice(index, 1, ...replacements);
      }
    });
  };
}

module.exports = remarkInternalLinks;
