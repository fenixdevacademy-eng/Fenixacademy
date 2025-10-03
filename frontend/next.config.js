/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração otimizada para Vercel
  output: 'standalone',
  trailingSlash: true,
  
  // Configurações básicas
  images: {
    unoptimized: true,
  },

  // Ignorar erros durante o build
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

  // Webpack otimizado para Vercel
  webpack: (config, { isServer }) => {
    // Configurações específicas para resolver problemas de path
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
        buffer: false,
        constants: false,
        domain: false,
        freelist: false,
        process: false,
        sys: false,
        timers: false,
        v8: false,
      };
    }

    // Configuração específica para resolver problemas de mapeamento
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, '.'),
    };

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
    optimizePackageImports: [],
    serverComponentsExternalPackages: [],
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
  compress: true,

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

  // Configurações específicas
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true,
  },

  // Configurações de headers
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
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // Configurações de redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Configurações de rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;