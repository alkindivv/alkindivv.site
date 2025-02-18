const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  experimental: {
    scrollRestoration: true,
    workerThreads: true,
    optimizeCss: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://alkindivv.site'
        : 'http://localhost:3000',
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  i18n: {
    ...i18n,
    localeDetection: true,
    localePath: {
      '/blog': ['common', 'blog'],
      '/blog/*': ['common', 'blog'],
      '/glossary': ['common', 'glossary'],
    },
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
