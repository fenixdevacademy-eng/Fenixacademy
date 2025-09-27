const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 BUILD PARA NETLIFY - VERSÃO CORRIGIDA');
console.log('=========================================\n');

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

    // 2. Excluir pasta backend temporariamente
    console.log('2. Excluindo pasta backend...');
    const backendPath = path.join('..', 'backend');
    if (fs.existsSync(backendPath)) {
        fs.renameSync(backendPath, path.join('..', 'backend-temp'));
        console.log('✅ Pasta backend movida temporariamente');
    }

    // 3. Usar configuração estática
    console.log('3. Aplicando configuração para Netlify...');
    if (fs.existsSync('next.config.js')) {
        fs.copyFileSync('next.config.js', 'next.config.js.backup');
    }
    fs.copyFileSync('next.config.static.js', 'next.config.js');
    console.log('✅ Configuração aplicada');

    // 4. Build estático
    console.log('4. Executando build estático...');

    execSync('npx next build', {
        stdio: 'inherit',
        env: {
            NODE_ENV: 'production',
            NEXT_TELEMETRY_DISABLED: '1'
        }
    });

    // 5. Restaurar pasta backend
    console.log('5. Restaurando pasta backend...');
    if (fs.existsSync(path.join('..', 'backend-temp'))) {
        fs.renameSync(path.join('..', 'backend-temp'), backendPath);
        console.log('✅ Pasta backend restaurada');
    }

    console.log('\n🎉 BUILD PARA NETLIFY CONCLUÍDO!');
    console.log('✅ Arquivos estáticos em /out');
    console.log('✅ Pasta backend excluída do build');
    console.log('✅ Pronto para deploy no Netlify');
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('1. Acesse https://netlify.com');
    console.log('2. Conecte seu repositório GitHub');
    console.log('3. Configure:');
    console.log('   - Build command: npm run build:netlify-fixed');
    console.log('   - Publish directory: out');
    console.log('4. Deploy automático!');

} catch (error) {
    console.log('\n❌ ERRO NO BUILD:');
    console.log(error.message);

    // Restaurar pasta backend em caso de erro
    if (fs.existsSync(path.join('..', 'backend-temp'))) {
        fs.renameSync(path.join('..', 'backend-temp'), path.join('..', 'backend'));
        console.log('✅ Pasta backend restaurada após erro');
    }

    process.exit(1);
}

