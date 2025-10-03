// Script de build simples e direto - sem travamentos
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build simples e direto...');

try {
  // Limpeza básica
  console.log('🧹 Limpeza básica...');
  
  const dirsToClean = ['.next', 'out', 'node_modules/.cache'];
  
  dirsToClean.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`🗑️ Removendo: ${dir}`);
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  });

  // Executar build direto
  console.log('📦 Executando build direto...');
  execSync('npm run build', { stdio: 'inherit', timeout: 300000 }); // 5 minutos timeout

  console.log('✅ Build simples concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}
