const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 BUILD PARA RENDER');
console.log('====================\n');

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
    console.log('2. Aplicando configuração para Render...');
    if (fs.existsSync('next.config.js')) {
        fs.copyFileSync('next.config.js', 'next.config.js.backup');
    }
    fs.copyFileSync('next.config.static.js', 'next.config.js');
    console.log('✅ Configuração aplicada');

    // 3. Instalar dependências
    console.log('3. Instalando dependências...');
    execSync('npm install', { stdio: 'inherit' });

    // 4. Build estático
    console.log('4. Executando build estático...');

    execSync('npx next build', {
        stdio: 'inherit',
        env: {
            NODE_ENV: 'production',
            NEXT_TELEMETRY_DISABLED: '1'
        }
    });

    // 5. Instalar serve para produção
    console.log('5. Instalando serve...');
    execSync('npm install -g serve', { stdio: 'inherit' });

    console.log('\n🎉 BUILD PARA RENDER CONCLUÍDO!');
    console.log('✅ Arquivos estáticos em /out');
    console.log('✅ Pronto para deploy no Render');
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('1. Acesse https://render.com');
    console.log('2. Conecte seu repositório GitHub');
    console.log('3. Selecione "Web Service"');
    console.log('4. Configure:');
    console.log('   - Build Command: npm run build:render');
    console.log('   - Start Command: npx serve out -s');
    console.log('5. Deploy automático!');

} catch (error) {
    console.log('\n❌ ERRO NO BUILD:');
    console.log(error.message);
    process.exit(1);
}

