// Script de build simples que apenas executa o build
const { execSync } = require('child_process');

console.log('🚀 Iniciando build simples...');

try {
  // Executar build diretamente
  console.log('📦 Executando build...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}
