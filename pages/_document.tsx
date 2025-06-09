import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="id">
        <Head>
          <meta charSet="utf-8" />
          <meta name="geo.region" content="ID" />
          <meta name="geo.placename" content="Indonesia" />
          <meta name="dc.language" content="id" />
          <meta httpEquiv="content-language" content="id" />

          {/* Preconnect untuk performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://images.unsplash.com" />

          {/* DNS Prefetch */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />

          {/* Optimized font loading */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            as="style"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            media="print"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var link = document.querySelector('link[media="print"]');
                  if (link) link.media = 'all';
                })();
              `,
            }}
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            />
          </noscript>

          {/* Global Theme */}
          <meta name="theme-color" content="#111111" />
          <meta name="msapplication-TileColor" content="#111111" />

          {/* Global verification codes */}
          <meta
            name="google-site-verification"
            content="tLWZliQliSbsSXo5T_8Q2d2d5RRHTau1da3C5lt3pN8"
          />
        </Head>
        <body className="text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
