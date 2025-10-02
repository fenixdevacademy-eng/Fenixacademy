const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build simplificado...');

try {
  // 1. Limpar cache
  console.log('🧹 Limpando cache...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }

  // 2. Instalar dependências
  console.log('📦 Instalando dependências...');
  execSync('npm install --production', { stdio: 'inherit' });

  // 3. Build com configurações simplificadas
  console.log('🔨 Executando build...');
  process.env.NODE_OPTIONS = '--max-old-space-size=4096';
  process.env.NEXT_TELEMETRY_DISABLED = '1';
  
  execSync('npx next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096',
      NEXT_TELEMETRY_DISABLED: '1',
      CI: 'true'
    }
  });

  console.log('✅ Build concluído com sucesso!');
  
} catch (error) {
  console.error('❌ Erro no build:', error.message);
  process.exit(1);
}



















