const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 DEPLOY VERCEL - VERSÃO SUPER SIMPLES');
console.log('========================================\n');

try {
  // 1. Backup do vercel.json atual
  console.log('1. Fazendo backup do vercel.json...');
  if (fs.existsSync('vercel.json')) {
    fs.copyFileSync('vercel.json', 'vercel.json.backup');
    console.log('✅ Backup criado');
  }

  // 2. Usar configuração super simples
  console.log('2. Aplicando configuração super simples...');
  fs.copyFileSync('vercel-simple-fixed.json', 'vercel.json');
  console.log('✅ Configuração aplicada');

  // 3. Limpar cache
  console.log('3. Limpando cache...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }
  console.log('✅ Cache limpo');

  // 4. Instalar dependências
  console.log('4. Instalando dependências...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependências instaladas');

  // 5. Build simples
  console.log('5. Executando build simples...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build concluído');

  // 6. Deploy no Vercel
  console.log('6. Fazendo deploy no Vercel...');
  execSync('npx vercel --prod', { stdio: 'inherit' });
  console.log('✅ Deploy concluído');

  console.log('\n🎉 DEPLOY VERCEL CONCLUÍDO COM SUCESSO!');
  console.log('=====================================');
  console.log('✅ Site disponível no Vercel');
  console.log('✅ Configuração super simples aplicada');
  console.log('✅ Build sem erros');

} catch (error) {
  console.log('\n❌ ERRO NO DEPLOY:');
  console.log('==================');
  console.log(error.message);
  
  // Restaurar backup se houver erro
  if (fs.existsSync('vercel.json.backup')) {
    console.log('\n🔄 Restaurando configuração original...');
    fs.copyFileSync('vercel.json.backup', 'vercel.json');
    console.log('✅ Configuração original restaurada');
  }
  
  process.exit(1);
}

