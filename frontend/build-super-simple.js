const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 BUILD SUPER SIMPLES');
console.log('======================\n');

try {
    // 1. Limpar apenas cache do Next.js
    console.log('1. Limpando cache...');
    if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
        console.log('✅ Cache limpo');
    }

    // 2. Usar configuração mínima
    console.log('2. Aplicando configuração mínima...');
    if (fs.existsSync('next.config.js')) {
        fs.copyFileSync('next.config.js', 'next.config.js.backup');
    }
    fs.copyFileSync('next.config.minimal.js', 'next.config.js');
    console.log('✅ Configuração aplicada');

    // 3. Build simples
    console.log('3. Executando build...');

    // Configurações mínimas
    process.env.NODE_ENV = 'production';
    process.env.NEXT_TELEMETRY_DISABLED = '1';

    // Executar build
    execSync('npx next build', {
        stdio: 'inherit',
        env: {
            NODE_ENV: 'production',
            NEXT_TELEMETRY_DISABLED: '1'
        }
    });

    console.log('\n🎉 BUILD CONCLUÍDO!');
    console.log('✅ Pronto para deploy');

} catch (error) {
    console.log('\n❌ ERRO NO BUILD:');
    console.log(error.message);

    // Restaurar configuração original
    if (fs.existsSync('next.config.js.backup')) {
        fs.copyFileSync('next.config.js.backup', 'next.config.js');
        console.log('✅ Configuração original restaurada');
    }

    process.exit(1);
}

