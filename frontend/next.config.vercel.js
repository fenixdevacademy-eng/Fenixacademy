/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configurações básicas para Vercel
    reactStrictMode: false,
    swcMinify: true,
    poweredByHeader: false,

    // Ignorar erros temporariamente
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Configurações de imagem
    images: {
        domains: [
            'localhost',
            'fenixdevacademy.com.br',
            'images.unsplash.com',
            'via.placeholder.com'
        ],
        formats: ['image/webp', 'image/avif'],
        dangerouslyAllowSVG: true,
    },

    // Configurações de performance
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Configurações experimentais mínimas
    experimental: {
        optimizePackageImports: ['@heroicons/react', 'lucide-react'],
    },

    // Webpack para resolver problemas de módulos
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
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

    // Configurações de runtime
    env: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://fenixdevacademy.com.br',
        NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
    },
};

module.exports = nextConfig;

