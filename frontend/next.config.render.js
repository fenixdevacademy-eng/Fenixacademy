/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuração específica para Render
    output: 'standalone',
    trailingSlash: true,

    // Configurações básicas
    images: {
        unoptimized: true,
    },

    // Configurações de TypeScript e ESLint
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Configurações de React
    reactStrictMode: false,
    swcMinify: true,
    poweredByHeader: false,

    // Configurações de webpack
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                util: false,
                url: false,
                assert: false,
                http: false,
                https: false,
                os: false,
                path: false,
            };
        }
        return config;
    },

    // Configurações de ambiente
    env: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://fenixdevacademy.com.br',
        NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
    },

    // Configurações experimentais
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react', '@heroicons/react'],
    },

    // Configurações de compilação
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Configurações de página
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

    // Configurações de distDir
    distDir: '.next',

    // Configurações de compressão
    compress: true,

    // Configurações de devIndicators
    devIndicators: {
        buildActivity: true,
        buildActivityPosition: 'bottom-right',
    },

    // Configurações de logging
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

module.exports = nextConfig;
