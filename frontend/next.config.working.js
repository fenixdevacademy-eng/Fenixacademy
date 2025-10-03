/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuração que deve resolver o erro de path undefined
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,

    // Configurações de imagem
    images: {
        unoptimized: true,
        loader: 'custom',
        loaderFile: './imageLoader.js',
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
    swcMinify: false,
    poweredByHeader: false,

    // Configurações de webpack específicas para resolver problemas de path
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Resolver problemas de path
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': require('path').resolve(__dirname, '.'),
        };

        // Configurações específicas para o cliente
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
                zlib: false,
                querystring: false,
                punycode: false,
                child_process: false,
                cluster: false,
                dgram: false,
                dns: false,
                events: false,
                module: false,
                readline: false,
                repl: false,
                tty: false,
                vm: false,
                worker_threads: false,
            };
        }

        // Plugin para resolver problemas de path durante o build
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            })
        );

        // Configurações específicas para resolver o erro de path undefined
        config.resolve.modules = [
            ...(config.resolve.modules || []),
            'node_modules',
        ];

        // Configurações de extensões
        config.resolve.extensions = [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
        ];

        return config;
    },

    // Configurações de ambiente
    env: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://fenixdevacademy.com.br',
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Fênix Dev Academy',
    },

    // Configurações experimentais
    experimental: {
        optimizeCss: false,
        optimizePackageImports: [],
    },

    // Configurações de compilação
    compiler: {
        removeConsole: false,
    },

    // Configurações de página
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

    // Configurações de distDir
    distDir: '.next',

    // Configurações de compressão
    compress: false,

    // Configurações de devIndicators
    devIndicators: {
        buildActivity: false,
    },

    // Configurações de logging
    logging: {
        fetches: {
            fullUrl: false,
        },
    },

    // Configurações específicas para resolver problemas de build
    generateEtags: false,
    httpAgentOptions: {
        keepAlive: false,
    },

    // Configurações de onDemandEntries
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },
};

module.exports = nextConfig;

