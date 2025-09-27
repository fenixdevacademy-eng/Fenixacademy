const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 BUILD PARA NETLIFY - VERSÃO ESTÁTICA');
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

    // 4. Configurar variáveis de ambiente para build estático
    console.log('4. Configurando variáveis de ambiente...');
    const envContent = `# Configuração para deploy estático
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://seu-site.netlify.app
NEXT_PUBLIC_APP_NAME=Fênix Dev Academy
NEXT_PUBLIC_APP_DESCRIPTION=Plataforma de cursos online de tecnologia
NEXT_TELEMETRY_DISABLED=1
`;
    fs.writeFileSync('.env.production', envContent);
    console.log('✅ Variáveis de ambiente configuradas');

    // 5. Build estático
    console.log('5. Executando build estático...');

    execSync('npx next build', {
        stdio: 'inherit',
        env: {
            ...process.env,
            NODE_ENV: 'production',
            NEXT_TELEMETRY_DISABLED: '1'
        }
    });

    // 6. Restaurar pasta backend
    console.log('6. Restaurando pasta backend...');
    if (fs.existsSync(path.join('..', 'backend-temp'))) {
        fs.renameSync(path.join('..', 'backend-temp'), backendPath);
        console.log('✅ Pasta backend restaurada');
    }

    // 7. Criar arquivo de configuração do Netlify
    console.log('7. Configurando Netlify...');
    fs.copyFileSync('netlify-static.toml', 'netlify.toml');
    console.log('✅ Configuração do Netlify aplicada');

    console.log('\n🎉 BUILD PARA NETLIFY CONCLUÍDO!');
    console.log('✅ Arquivos estáticos em /out');
    console.log('✅ Login estático configurado');
    console.log('✅ Pasta backend excluída do build');
    console.log('✅ Pronto para deploy no Netlify');
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('1. Acesse https://netlify.com');
    console.log('2. Conecte seu repositório GitHub');
    console.log('3. Configure:');
    console.log('   - Build command: npm run build:netlify-static');
    console.log('   - Publish directory: out');
    console.log('4. Deploy automático!');
    console.log('\n🔑 USUÁRIOS DE TESTE:');
    console.log('   - admin@fenix.com / admin123 (Admin)');
    console.log('   - user@fenix.com / user123 (Usuário)');
    console.log('   - dev@fenix.com / dev123 (Desenvolvedor)');

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
