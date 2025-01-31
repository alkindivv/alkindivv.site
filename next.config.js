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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'your-image-domain.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // experimental: {
  //   optimizeFonts: true,
  //   optimizeImages: true,
  //   scrollRestoration: true,
  //   workerThreads: true,
  //   optimizeCss: true,
  //   legacyBrowsers: false,
  //   browsersListForSwc: true,
  // },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Konfigurasi headers untuk security dan performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Redirects untuk SEO
  async redirects() {
    return [
      {
        source: '/blog',
        has: [
          {
            type: 'query',
            key: 'page',
            value: '1',
          },
        ],
        destination: '/blog',
        permanent: true,
      },
    ];
  },
  // Enable compression
  compress: true,
  // Enable production source maps
  productionBrowserSourceMaps: false,
  // Optimize fonts
  optimizeFonts: true,
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
