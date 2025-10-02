/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuração para build híbrido (compatível com Netlify)
    output: 'standalone',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },

    // Ignorar todos os erros
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Desabilitar features que podem causar problemas
    reactStrictMode: false,
    swcMinify: false,
    poweredByHeader: false,

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

    // Configurações de runtime
    env: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://fenixdevacademy.com.br',
        NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
    },
};

module.exports = nextConfig;

