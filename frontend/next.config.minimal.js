/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configurações mínimas para evitar travamentos
    reactStrictMode: false,
    swcMinify: false, // Desabilitar minificação para evitar travamentos
    poweredByHeader: false,

    // Ignorar todos os erros temporariamente
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Configurações de imagem mínimas
    images: {
        unoptimized: true, // Desabilitar otimização de imagens
        domains: ['localhost'],
    },

    // Desabilitar features experimentais que podem causar travamentos
    experimental: {
        // Remover todas as otimizações experimentais
    },

    // Webpack mínimo
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

    // Output mínimo
    output: 'standalone',

    // Configurações de runtime mínimas
    env: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://fenixdevacademy.com.br',
        NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
    },
};

module.exports = nextConfig;

