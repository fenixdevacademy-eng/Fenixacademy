/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
  images: {
    unoptimized: true,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    // Force deploy version
    DEPLOY_VERSION: '2025.01.15.002',
    FORCE_DEPLOY: 'true',
  },
  // Configurações para produção
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Configurações de build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configurações adicionais para produção
  swcMinify: true,
  reactStrictMode: true,
  // Force no cache for development
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig