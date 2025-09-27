const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 VERCEL BUILD COMPLETAMENTE LIMPO...');
console.log('=====================================');

// Função para remover recursivamente
function removeRecursive(itemPath) {
    if (fs.existsSync(itemPath)) {
        try {
            const stat = fs.statSync(itemPath);
            if (stat.isDirectory()) {
                fs.rmSync(itemPath, { recursive: true, force: true });
                console.log(`🗑️  Removido diretório: ${itemPath}`);
            } else {
                fs.unlinkSync(itemPath);
                console.log(`🗑️  Removido arquivo: ${itemPath}`);
            }
        } catch (error) {
            console.log(`⚠️  Erro ao remover ${itemPath}: ${error.message}`);
        }
    }
}

// Lista completa de itens para limpar
const itemsToClean = [
    '.next',
    'node_modules/.cache',
    'tsconfig.tsbuildinfo',
    'tsconfig.build.tsbuildinfo',
    '.next/cache',
    'out',
    'dist',
    'build',
    '.turbo',
    'node_modules/.next',
    'frontend/.next',
    'frontend/node_modules/.cache',
    'frontend/tsconfig.tsbuildinfo',
    'frontend/tsconfig.build.tsbuildinfo',
    'frontend/.turbo'
];

console.log('\n🧹 LIMPEZA AGRESSIVA DE CACHES...');
itemsToClean.forEach(removeRecursive);

// Limpar cache do npm
console.log('\n📦 LIMPANDO CACHE DO NPM...');
try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
    console.log('✅ Cache do npm limpo');
} catch (error) {
    console.log('⚠️  Erro ao limpar cache do npm:', error.message);
}

// Navegar para o diretório frontend
console.log('\n📁 NAVEGANDO PARA FRONTEND...');
process.chdir('frontend');

// Reinstalar dependências
console.log('\n📦 REINSTALANDO DEPENDÊNCIAS...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependências reinstaladas');
} catch (error) {
    console.log('❌ Erro ao reinstalar dependências:', error.message);
    process.exit(1);
}

// Verificação de tipos
console.log('\n🔍 VERIFICAÇÃO DE TIPOS...');
try {
    execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'inherit' });
    console.log('✅ Verificação de tipos OK');
} catch (error) {
    console.log('⚠️  Avisos de tipos (continuando...):', error.message);
}

// Build do Next.js
console.log('\n🏗️  INICIANDO BUILD DO NEXT.JS...');
try {
    execSync('npx next build', { stdio: 'inherit' });
    console.log('\n🎉 BUILD CONCLUÍDO COM SUCESSO!');
    console.log('=====================================');
    console.log('✅ Projeto pronto para deploy no Vercel');
    console.log('✅ Todos os caches foram limpos');
    console.log('✅ Build realizado com arquivos limpos');
} catch (error) {
    console.log('\n❌ FALHA NO BUILD');
    console.log('=====================================');
    console.log('🔍 Erro:', error.message);
    process.exit(1);
}







