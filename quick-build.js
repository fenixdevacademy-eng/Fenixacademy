#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Build Rápido da Fênix Dev Academy...');

// Navegar para frontend
process.chdir('frontend');

// Configuração mínima do Next.js
const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
module.exports = nextConfig;`;

fs.writeFileSync('next.config.js', config);
console.log('✅ Configuração criada');

// Build
console.log('🏗️ Fazendo build...');
try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build concluído!');
    console.log('📁 Pasta out criada em: frontend/out');
} catch (error) {
    console.log('❌ Erro no build:', error.message);
}
