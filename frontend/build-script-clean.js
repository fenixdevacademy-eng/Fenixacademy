// Script de build que limpa completamente o cache
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build com limpeza completa de cache...');

try {
  // Limpar todos os caches e diretórios de build
  console.log('🧹 Limpando cache e diretórios de build...');
  
  const dirsToClean = [
    '.next',
    'out',
    'node_modules/.cache',
    '.turbo',
    'dist',
    'build'
  ];

  dirsToClean.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`🗑️ Removendo: ${dir}`);
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  });

  // Limpar cache do npm
  console.log('📦 Limpando cache do npm...');
  try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Erro ao limpar cache do npm (continuando...):', error.message);
  }

  // Reinstalar dependências para garantir limpeza
  console.log('📥 Reinstalando dependências...');
  execSync('rm -rf node_modules package-lock.json', { stdio: 'inherit' });
  execSync('npm install', { stdio: 'inherit' });

  // Executar build limpo
  console.log('📦 Executando build limpo...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}
