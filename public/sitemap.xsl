<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - AL KINDI</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            color: #333;
            background: #f8f9fa;
            margin: 0;
            padding: 20px;
          }
          .header {
            background: #000;
            color: #fff;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            color: #10b981;
          }
          .header p {
            margin: 10px 0 0 0;
            opacity: 0.8;
          }
          .content {
            background: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            text-align: left;
            padding: 12px;
            border-bottom: 1px solid #eee;
          }
          th {
            background: #f8f9fa;
            font-weight: 600;
            color: #555;
          }
          tr:hover {
            background: #f8f9fa;
          }
          .url {
            color: #10b981;
            text-decoration: none;
          }
          .url:hover {
            text-decoration: underline;
          }
          .priority {
            text-align: center;
          }
          .high { color: #dc3545; font-weight: bold; }
          .medium { color: #fd7e14; }
          .low { color: #6c757d; }
          .stats {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
          }
          .stats strong {
            color: #1976d2;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🗺️ XML Sitemap</h1>
          <p>This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs for AL KINDI website</p>
        </div>

        <div class="content">
          <div class="stats">
            <strong>Total URLs:</strong> <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> |
            <strong>Generated:</strong> <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/> |
            <strong>Domain:</strong> alkindivv.site
          </div>

          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}" class="url">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td class="priority">
                    <xsl:choose>
                      <xsl:when test="sitemap:priority &gt; 0.8">
                        <span class="high"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority &gt; 0.6">
                        <span class="medium"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="low"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p><strong>About this sitemap:</strong></p>
            <ul>
              <li>This XML sitemap is used by search engines to discover and index pages</li>
              <li>Priority values range from 0.0 to 1.0 (highest priority)</li>
              <li>Change frequency indicates how often the page content is updated</li>
              <li>Generated automatically by Next.js sitemap generator</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>