const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 BUILD OTIMIZADO PARA VERCEL');
console.log('================================\n');

try {
    // 1. Limpar apenas cache do Next.js
    console.log('🧹 Limpando cache do Next.js...');
    if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
        console.log('✅ Cache do Next.js limpo');
    }

    // 2. Verificar se node_modules existe
    if (!fs.existsSync('node_modules')) {
        console.log('📦 Instalando dependências...');
        execSync('npm install', { stdio: 'inherit' });
    } else {
        console.log('✅ node_modules já existe');
    }

    // 3. Build com configurações otimizadas para Vercel
    console.log('🔨 Executando build otimizado...');

    // Configurar variáveis de ambiente para Vercel
    process.env.NODE_ENV = 'production';
    process.env.VERCEL = '1';
    process.env.CI = '1';
    process.env.NEXT_TELEMETRY_DISABLED = '1';

    // Executar build com configurações específicas
    execSync('npx next build', {
        stdio: 'inherit',
        env: {
            ...process.env,
            NODE_ENV: 'production',
            VERCEL: '1',
            CI: '1',
            NEXT_TELEMETRY_DISABLED: '1'
        }
    });

    console.log('\n🎉 BUILD CONCLUÍDO COM SUCESSO!');
    console.log('✅ Pronto para deploy no Vercel');

} catch (error) {
    console.log('\n❌ ERRO NO BUILD:');
    console.log('==================');
    console.log(error.message);

    // Sugestões de correção
    console.log('\n🔧 SUGESTÕES DE CORREÇÃO:');
    console.log('1. Verifique se todos os arquivos TypeScript estão corretos');
    console.log('2. Verifique se as dependências estão instaladas corretamente');
    console.log('3. Verifique se o next.config.js está configurado corretamente');

    process.exit(1);
}

