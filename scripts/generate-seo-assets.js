const fs = require('fs');
const path = require('path');

// Generate missing SEO assets
async function generateSEOAssets() {
  const publicDir = path.join(process.cwd(), 'public');

  // Create directories if they don't exist
  const dirs = ['icons', 'images'];
  dirs.forEach((dir) => {
    const dirPath = path.join(publicDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  // Generate robots.txt fallback (if needed)
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Specific bot rules
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# Sitemaps
Sitemap: https://alkindivv.site/sitemap.xml
Sitemap: https://alkindivv.site/feed.xml

# Host
Host: https://alkindivv.site
`;

  // Write robots.txt as fallback
  const robotsPath = path.join(publicDir, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    fs.writeFileSync(robotsPath, robotsTxt);
    console.log('✅ Generated robots.txt fallback');
  }

  // Generate browserconfig.xml for IE/Edge
  const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/mstile-150x150.png"/>
            <TileColor>#059669</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;

  const browserConfigPath = path.join(publicDir, 'browserconfig.xml');
  if (!fs.existsSync(browserConfigPath)) {
    fs.writeFileSync(browserConfigPath, browserConfig);
    console.log('✅ Generated browserconfig.xml');
  }

  // Generate security.txt
  const securityTxt = `Contact: mailto:security@alkindivv.site
Contact: https://alkindivv.site/contact
Expires: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()}
Encryption: https://alkindivv.site/pgp-key.txt
Acknowledgments: https://alkindivv.site/security-acknowledgments
Policy: https://alkindivv.site/security-policy
Hiring: https://alkindivv.site/careers
`;

  const securityDir = path.join(publicDir, '.well-known');
  if (!fs.existsSync(securityDir)) {
    fs.mkdirSync(securityDir, { recursive: true });
  }

  const securityPath = path.join(securityDir, 'security.txt');
  if (!fs.existsSync(securityPath)) {
    fs.writeFileSync(securityPath, securityTxt);
    console.log('✅ Generated security.txt');
  }

  // Generate humans.txt
  const humansTxt = `/* TEAM */
Developer: AL KINDI
Contact: contact@alkindivv.site
Twitter: @alkindivv
From: Indonesia

/* THANKS */
Next.js: https://nextjs.org/
Tailwind CSS: https://tailwindcss.com/
Vercel: https://vercel.com/

/* SITE */
Last update: ${new Date().toISOString().split('T')[0]}
Language: Indonesian / English
Doctype: HTML5
IDE: Visual Studio Code
`;

  const humansPath = path.join(publicDir, 'humans.txt');
  if (!fs.existsSync(humansPath)) {
    fs.writeFileSync(humansPath, humansTxt);
    console.log('✅ Generated humans.txt');
  }

  console.log('🎉 SEO assets generation completed!');
}

// Run the script
generateSEOAssets().catch(console.error);
