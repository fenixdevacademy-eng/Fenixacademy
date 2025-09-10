/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
            'fenix-academy.vercel.app',
            'fenixacademy.com.br',
            'images.unsplash.com',
            'via.placeholder.com'
        ],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
                    { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
                    { key: 'Cache-Control', value: 'public, max-age=60, s-maxage=60' },
                ]
            },
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ]
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/backend/:path*',
                destination: '/api/:path*'
            }
        ]
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    // Configurações para resolver erros Vercel
    output: 'standalone',
    trailingSlash: false,
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
    // Configurações de performance
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['@heroicons/react', 'lucide-react', 'framer-motion'],
        serverComponentsExternalPackages: ['monaco-editor'],
        serverMinification: true,
        serverSourceMaps: false,
        optimizeServerReact: true,
    },
    webpack: (config, { dev, isServer }) => {
        // Resolver problemas de módulos Node.js no cliente
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
            // Adicionar fallbacks para módulos Node.js
            "node:assert": false,
            "node:fs": false,
            "node:path": false,
            "node:os": false,
            "node:crypto": false,
            "node:stream": false,
            "node:util": false,
            "node:url": false,
            "node:http": false,
            "node:https": false,
            "node:net": false,
            "node:tls": false,
        };

        // Configurar para ignorar módulos Node.js no cliente
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                "node:assert": false,
                "node:fs": false,
                "node:path": false,
                "node:os": false,
                "node:crypto": false,
                "node:stream": false,
                "node:util": false,
                "node:url": false,
                "node:http": false,
                "node:https": false,
                "node:net": false,
                "node:tls": false,
            };
        }

        // Otimizar bundle
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 20000,
                maxSize: 244000,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        priority: -10,
                        chunks: 'all',
                    },
                    monaco: {
                        test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
                        name: 'monaco',
                        priority: 10,
                        chunks: 'all',
                    },
                },
            }
        }

        // Configurações para resolver problemas de build
        config.module.rules.push({
            test: /\.m?js$/,
            resolve: {
                fullySpecified: false,
            },
        });

        return config
    },
    // Configurações de build
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
}

module.exports = nextConfig