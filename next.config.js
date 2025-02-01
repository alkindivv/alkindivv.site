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
  output: 'export',
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
    scrollRestoration: true,
    workerThreads: true,
    optimizeCss: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimasi untuk loading
  onDemandEntries: {
    // periode halaman di cache
    maxInactiveAge: 25 * 1000,
    // jumlah halaman yang di cache
    pagesBufferLength: 2,
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
