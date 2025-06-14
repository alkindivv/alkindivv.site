// Async Remark plugin to add internal links for certain keywords
// Works in a CommonJS environment while loading ESM-only dependencies via dynamic import.

async function remarkInternalLinks() {
  const { visit } = await import('unist-util-visit');

  const KEYWORDS_MAP = {
    'corporate law': '/blog/corporate-law',
    'capital markets': '/blog/capital-markets',
    'mergers & acquisitions': '/blog/corporate-law',
    bankruptcy: '/blog/law',
    cryptocurrency: '/blog/cryptocurrency',
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
