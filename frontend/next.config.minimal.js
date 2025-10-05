/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  // Configurações mínimas para economizar memória
  webpack: (config) => {
    config.parallelism = 1;
    return config;
  },
};

module.exports = nextConfig;