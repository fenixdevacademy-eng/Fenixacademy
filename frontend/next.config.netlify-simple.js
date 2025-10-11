/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    distDir: 'out',
    images: {
        unoptimized: true,
    },
    env: {
        DATABASE_URL: process.env.DATABASE_URL || '',
        JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret',
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
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

    // Configurações específicas para Netlify
    async rewrites() {
        return []
    },
}

module.exports = nextConfig




