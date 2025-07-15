/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['api.placeholder.com', 'fenixdevacademy.com'],
    unoptimized: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  env: {
    NODE_ENV: 'production',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig; 