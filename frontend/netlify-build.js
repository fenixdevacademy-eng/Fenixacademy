// Script de build específico para Netlify
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build para Netlify...');

try {
    // Limpar diretórios anteriores
    if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
    }
    if (fs.existsSync('out')) {
        fs.rmSync('out', { recursive: true, force: true });
    }

    // Copiar configuração específica para Netlify
    console.log('📋 Configurando Next.js para Netlify...');
    fs.copyFileSync('next.config.netlify.js', 'next.config.js');

    // Executar build
    console.log('📦 Executando npm run build...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('✅ Build concluído com sucesso!');
} catch (error) {
    console.error('❌ Erro durante o build:', error.message);
    process.exit(1);
}
