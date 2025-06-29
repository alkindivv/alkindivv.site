module.exports = async () => {
  const { default: remarkGfm } = await import('remark-gfm');
  const { default: rehypeSlug } = await import('rehype-slug');
  const { default: rehypePrettyCode } = await import('rehype-pretty-code');
  const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [
        remarkGfm,
        (await import('remark-frontmatter')).default,
        (await import('remark-smartypants')).default,
        (await import('remark-code-titles')).default,
        (await import('./lib/plugins/remark-internal-links.js')).default,
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode, { theme: 'one-dark-pro' }],
      ],
      parseFrontmatter: true,
    },
  });

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'images.unsplash.com' },
        { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
        { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      ],
      formats: ['image/avif', 'image/webp'],
      unoptimized: false,
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256],
      minimumCacheTTL: 31536000,
    },
    experimental: {
      scrollRestoration: true,
      optimizePackageImports: ['react-icons'],
      optimizeCss: true,
      serverActions: { bodySizeLimit: '2mb' },
      serverComponentsExternalPackages: ['rss'],
      optimizeServerReact: true,
      memoryBasedWorkersCount: true,
      turbo: {
        resolveAlias: {
          canvas: './empty-module.js',
        },
      },
    },
    onDemandEntries: { maxInactiveAge: 25000, pagesBufferLength: 2 },
    env: {
      NEXT_PUBLIC_BASE_URL:
        process.env.NODE_ENV === 'production'
          ? 'https://alkindi.id'
          : 'http://localhost:3000',
    },
    // Mengaktifkan source maps di browser production untuk debugging lebih mudah
    productionBrowserSourceMaps: true,
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    poweredByHeader: false,
    compress: true,
    swcMinify: true,
    compiler: { removeConsole: process.env.NODE_ENV === 'production' },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-DNS-Prefetch-Control', value: 'on' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            {
              key: 'Cache-Control',
              value: 'public, max-age=3600, s-maxage=86400',
            },
            {
              key: 'Link',
              value: '<https://images.unsplash.com>; rel=preconnect',
            },
          ],
        },
        {
          source: '/static/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/_next/image(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/_next/static/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
    webpack: (config, { isServer, dev }) => {
      if (isServer) {
        config.resolve.alias['@mdx-js/react'] = require('path').resolve(
          __dirname,
          'lib/mdx-react-server.js'
        );
      }
      if (!isServer) {
        config.resolve.fallback = { ...config.resolve.fallback, fs: false };
      }

      if (!dev) {
        config.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: 25,
          maxAsyncRequests: 20,
          cacheGroups: {
            default: {
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              chunks: 'all',
              enforce: true,
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: 5,
              chunks: 'all',
              enforce: true,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              priority: 20,
              chunks: 'all',
              enforce: true,
            },
            icons: {
              test: /[\\/]node_modules[\\/]react-icons[\\/]/,
              name: 'icons',
              priority: 15,
              chunks: 'all',
              enforce: true,
            },
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              enforce: true,
              priority: 25,
            },
          },
        };

        config.optimization.usedExports = true;
        config.optimization.sideEffects = true;

        if (config.optimization.minimizer) {
          config.optimization.minimizer.forEach((minimizer) => {
            if (minimizer.constructor.name === 'TerserPlugin') {
              minimizer.options.terserOptions = {
                ...minimizer.options.terserOptions,
                compress: {
                  ...minimizer.options.terserOptions?.compress,
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: [
                    'console.log',
                    'console.info',
                    'console.debug',
                    'console.warn',
                  ],
                },
                mangle: true,
                keep_classnames: false,
                keep_fnames: false,
              };
            }
          });
        }
      }

      return config;
    },
    async redirects() {
      return [
        {
          source: '/feed.xml/',
          destination: '/feed.xml',
          permanent: true,
        },
        {
          source: '/atom.xml/',
          destination: '/atom.xml',
          permanent: true,
        },
        {
          source: '/sitemap.xml/',
          destination: '/sitemap.xml',
          permanent: true,
        },
        {
          source: '/robots.txt/',
          destination: '/robots.txt',
          permanent: true,
        },
        {
          source: '/site.webmanifest/',
          destination: '/site.webmanifest',
          permanent: true,
        },
        {
          source: '/favicon.ico/',
          destination: '/favicon.ico',
          permanent: true,
        },
      ];
    },
  };

  return withMDX(nextConfig);
};
