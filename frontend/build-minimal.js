const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 BUILD MÍNIMO - SEM TRAVAMENTO');
console.log('=================================\n');

try {
    // 1. Matar todos os processos Node.js
    console.log('1. Finalizando processos Node.js...');
    try {
        execSync('taskkill /F /IM node.exe', { stdio: 'pipe' });
        console.log('✅ Processos finalizados');
    } catch (e) {
        console.log('⚠️ Nenhum processo para finalizar');
    }

    // 2. Limpar tudo
    console.log('2. Limpando completamente...');
    const toClean = ['.next', 'node_modules/.cache', 'tsconfig.tsbuildinfo'];
    toClean.forEach(item => {
        if (fs.existsSync(item)) {
            fs.rmSync(item, { recursive: true, force: true });
            console.log(`✅ Removido: ${item}`);
        }
    });

    // 3. Reinstalar dependências com configurações mínimas
    console.log('3. Reinstalando dependências...');
    process.env.NODE_OPTIONS = '--max-old-space-size=2048';
    execSync('npm install --no-optional --no-audit --no-fund', {
        stdio: 'inherit',
        env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=2048' }
    });

    // 4. Usar configuração mínima
    console.log('4. Aplicando configuração mínima...');
    if (fs.existsSync('next.config.js')) {
        fs.copyFileSync('next.config.js', 'next.config.js.backup');
    }
    fs.copyFileSync('next.config.minimal.js', 'next.config.js');
    console.log('✅ Configuração mínima aplicada');

    // 5. Build com configurações mínimas
    console.log('5. Executando build mínimo...');

    // Configurar variáveis para build mínimo
    process.env.NODE_ENV = 'production';
    process.env.NEXT_TELEMETRY_DISABLED = '1';
    process.env.CI = '1';

    // Executar build com timeout
    const buildCommand = 'npx next build';
    console.log(`Executando: ${buildCommand}`);

    execSync(buildCommand, {
        stdio: 'inherit',
        timeout: 300000, // 5 minutos
        env: {
            ...process.env,
            NODE_ENV: 'production',
            NEXT_TELEMETRY_DISABLED: '1',
            CI: '1',
            NODE_OPTIONS: '--max-old-space-size=2048'
        }
    });

    console.log('\n🎉 BUILD MÍNIMO CONCLUÍDO!');
    console.log('✅ Pronto para deploy');

} catch (error) {
    console.log('\n❌ ERRO NO BUILD MÍNIMO:');
    console.log('========================');
    console.log(error.message);

    if (error.message.includes('timeout')) {
        console.log('\n🔧 SOLUÇÃO PARA TIMEOUT:');
        console.log('1. Aumentar memória disponível');
        console.log('2. Fechar outros programas');
        console.log('3. Usar build mais simples');
    }

    process.exit(1);
}
