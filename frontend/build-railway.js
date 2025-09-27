const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 BUILD PARA RAILWAY');
console.log('=====================\n');

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

    // 2. Usar configuração estática
    console.log('2. Aplicando configuração para Railway...');
    if (fs.existsSync('next.config.js')) {
        fs.copyFileSync('next.config.js', 'next.config.js.backup');
    }
    fs.copyFileSync('next.config.static.js', 'next.config.js');
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

    console.log('\n🎉 BUILD PARA RAILWAY CONCLUÍDO!');
    console.log('✅ Arquivos estáticos em /out');
    console.log('✅ Pronto para deploy no Railway');
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('1. Acesse https://railway.app');
    console.log('2. Conecte seu repositório GitHub');
    console.log('3. Selecione "Deploy from GitHub repo"');
    console.log('4. Railway detectará automaticamente as configurações');
    console.log('5. Deploy automático!');

} catch (error) {
    console.log('\n❌ ERRO NO BUILD:');
    console.log(error.message);
    process.exit(1);
}

