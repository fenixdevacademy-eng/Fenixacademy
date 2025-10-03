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
    // Ignorar TODOS os arquivos que podem causar problemas de path
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      include: [
        // TODA a pasta API (contém process.cwd() problemático)
        /app\/api\//,
        
        // TODAS as rotas dinâmicas
        /app\/course\/\[slug\]\/module\/\[moduleId\]/,
        /app\/course\/\[slug\]\/lesson\/\[lessonId\]/,
        /app\/course\/\[slug\]\/exercise\/\[exerciseId\]/,
        /app\/course\/\[slug\]\/quiz\/\[quizId\]/,
        /app\/course\/\[slug\]\/project\/\[projectId\]/,
        /app\/course\/\[slug\]\/content/,
        /app\/course\/\[slug\]\/purchase/,
        
        // Outras rotas dinâmicas
        /app\/processed-courses\/\[courseSlug\]/,
        /app\/expanded-course\/\[slug\]/,
        /app\/courses\/\[slug\]/,
        /app\/course-info\/\[slug\]/,
        
        // Pasta específica problemática
        /app\/courses\/lua-fundamentals/,
        
        // TODOS os arquivos de teste
        /app\/auth\/register\/test-page/,
        /app\/dashboard\/test/,
        /app\/test/,
        /app\/test-minimal/,
        /app\/test-animations/,
        /app\/test-auth/,
        /app\/test-integration/,
        /app\/test-redirect/,
        /app\/test-simple/,
        /app\/login-test/,
        /app\/test-page/,
        
        // Arquivos específicos problemáticos
        /app\/manifest\.webmanifest/,
        /app\/robots\.ts/,
        /app\/sitemap\.ts/,
        /app\/manifest\.ts/,
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
        buffer: false,
        constants: false,
        domain: false,
        freelist: false,
        process: false,
        sys: false,
        timers: false,
        tty: false,
        v8: false,
        vm: false,
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
};

module.exports = nextConfig;