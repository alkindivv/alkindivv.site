const fs = require('fs');
const path = require('path');

function addStylesheetToSitemap() {
  const publicDir = path.join(__dirname, '../public');
  const sitemapFiles = ['sitemap-0.xml'];

  sitemapFiles.forEach((filename) => {
    const filePath = path.join(publicDir, filename);

    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Check if stylesheet is already added
      if (!content.includes('xml-stylesheet')) {
        // Add stylesheet reference after XML declaration
        content = content.replace(
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'
        );

        fs.writeFileSync(filePath, content);
        console.log(`✅ Added stylesheet to ${filename}`);
      } else {
        console.log(`ℹ️  Stylesheet already exists in ${filename}`);
      }
    } else {
      console.log(`⚠️  File not found: ${filename}`);
    }
  });
}

addStylesheetToSitemap();
