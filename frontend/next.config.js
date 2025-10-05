/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para export estático
  output: 'export',
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
  poweredByHeader: false,

  // Configurações de ambiente
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://fenixdevacademy.com.br',
    NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
  },
};

module.exports = nextConfig;