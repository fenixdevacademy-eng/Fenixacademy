const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 BUILD PARA GITHUB PAGES');
console.log('===========================\n');

try {
    // 1. Limpar cache
    console.log('1. Limpando cache...');
    if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
    }
    if (fs.existsSync('out')) {
        fs.rmSync('out', { recursive: true, force: true });
    }
    console.log('✅ Cache limpo');

    // 2. Usar configuração para GitHub Pages
    console.log('2. Aplicando configuração para GitHub Pages...');
    if (fs.existsSync('next.config.js')) {
        fs.copyFileSync('next.config.js', 'next.config.js.backup');
    }

    // Configuração específica para GitHub Pages
    const githubConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Fenix' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Fenix' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  swcMinify: false,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://seu-usuario.github.io/Fenix',
    NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
  },
};

module.exports = nextConfig;`;

    fs.writeFileSync('next.config.js', githubConfig);
    console.log('✅ Configuração aplicada');

    // 3. Build estático
    console.log('3. Executando build estático...');

    execSync('npx next build', {
        stdio: 'inherit',
        env: {
            NODE_ENV: 'production',
            NEXT_TELEMETRY_DISABLED: '1'
        }
    });

    console.log('\n🎉 BUILD PARA GITHUB PAGES CONCLUÍDO!');
    console.log('✅ Arquivos estáticos em /out');
    console.log('✅ Pronto para deploy no GitHub Pages');
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('1. Faça commit e push do código');
    console.log('2. Acesse Settings > Pages no seu repositório');
    console.log('3. Selecione "GitHub Actions" como source');
    console.log('4. O deploy será automático via GitHub Actions');
    console.log('5. Site estará disponível em: https://seu-usuario.github.io/Fenix');

} catch (error) {
    console.log('\n❌ ERRO NO BUILD:');
    console.log(error.message);
    process.exit(1);
}

