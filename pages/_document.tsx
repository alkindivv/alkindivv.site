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
          <link
            rel="preload"
            href="/styles/globals.css"
            as="style"
            crossOrigin="anonymous"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="AL KINDI - Personal Website and Blog"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="AL KINDI" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@alkindivv" />
        </Head>
        <body className="bg-[#0a0a0a] text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
