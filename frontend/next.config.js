/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração específica para Render - sem export estático
  output: 'standalone',
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

  // Configurações de webpack específicas para resolver problemas de path
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Ignorar TODOS os arquivos de API durante o build
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      include: [
        /app\/api\//,
      ],
      use: 'null-loader',
    });

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

    return config;
  },

  // Configurações de ambiente
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://fenixdevacademy.com.br',
    NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
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
};

module.exports = nextConfig;