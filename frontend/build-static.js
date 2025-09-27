const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 BUILD ESTÁTICO - SEM TRAVAMENTO');
console.log('===================================\n');

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
    console.log('2. Aplicando configuração estática...');
    if (fs.existsSync('next.config.js')) {
        fs.copyFileSync('next.config.js', 'next.config.js.backup');
    }
    fs.copyFileSync('next.config.static.js', 'next.config.js');
    console.log('✅ Configuração estática aplicada');

    // 3. Build estático
    console.log('3. Executando build estático...');

    execSync('npx next build', {
        stdio: 'inherit',
        env: {
            NODE_ENV: 'production',
            NEXT_TELEMETRY_DISABLED: '1'
        }
    });

    console.log('\n🎉 BUILD ESTÁTICO CONCLUÍDO!');
    console.log('✅ Arquivos estáticos gerados em /out');
    console.log('✅ Pronto para deploy no Vercel');

} catch (error) {
    console.log('\n❌ ERRO NO BUILD ESTÁTICO:');
    console.log(error.message);

    // Restaurar configuração original
    if (fs.existsSync('next.config.js.backup')) {
        fs.copyFileSync('next.config.js.backup', 'next.config.js');
        console.log('✅ Configuração original restaurada');
    }

    process.exit(1);
}

