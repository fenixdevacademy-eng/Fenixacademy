const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 VERCEL BUILD SIMPLIFICADO...');

// Limpar caches
const caches = ['.next', 'node_modules/.cache', 'tsconfig.tsbuildinfo'];
caches.forEach(cache => {
  if (fs.existsSync(cache)) {
    try {
      fs.rmSync(cache, { recursive: true, force: true });
      console.log(`✅ Removido: ${cache}`);
    } catch (e) {
      console.log(`⚠️  Erro ao remover ${cache}`);
    }
  }
});

// Navegar para frontend e fazer build
process.chdir('frontend');

try {
  console.log('📦 Instalando dependências...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('🏗️  Fazendo build...');
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('✅ BUILD CONCLUÍDO!');
} catch (error) {
  console.log('❌ ERRO NO BUILD:', error.message);
  process.exit(1);
}











