/** @type {import('next').NextConfig} */ 
const nextConfig = { 
  typescript: { ignoreBuildErrors: true }, 
  eslint: { ignoreDuringBuilds: true }, 
  output: 'standalone', 
  images: { domains: ['localhost', 'fenixdevacademy.com.br', 'images.unsplash.com'] } 
}; 
module.exports = nextConfig; 
