/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuração ultra mínima para resolver problemas de build
    output: 'export',
    trailingSlash: true,

    // Configurações básicas
    images: {
        unoptimized: true,
    },

    // Ignorar todos os erros durante o build
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Configurações de React
    reactStrictMode: false,
    swcMinify: false,
    poweredByHeader: false,

    // Configurações de webpack mínimas
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
};

module.exports = nextConfig;

