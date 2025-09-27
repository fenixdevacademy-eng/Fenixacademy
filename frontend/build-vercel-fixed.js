const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 BUILD VERCEL - VERSÃO CORRIGIDA');
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
    console.log('✅ Configuração aplicada');

    // 3. Verificar se next está instalado
    console.log('3. Verificando instalação do Next.js...');
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        const nextInstalled = packageJson.dependencies.next || packageJson.devDependencies.next;
        if (!nextInstalled) {
            console.log('⚠️ Next.js não encontrado nas dependências');
        } else {
            console.log(`✅ Next.js ${nextInstalled} instalado`);
        }
    } catch (e) {
        console.log('⚠️ Erro ao verificar package.json');
    }

    // 4. Build usando npm em vez de npx
    console.log('4. Executando build com npm...');

    // Tentar diferentes comandos
    const buildCommands = [
        'npm run build',
        'node_modules/.bin/next build',
        './node_modules/.bin/next build'
    ];

    let buildSuccess = false;
    for (const cmd of buildCommands) {
        try {
            console.log(`Tentando: ${cmd}`);
            execSync(cmd, {
                stdio: 'inherit',
                env: {
                    NODE_ENV: 'production',
                    NEXT_TELEMETRY_DISABLED: '1'
                }
            });
            buildSuccess = true;
            break;
        } catch (error) {
            console.log(`❌ Falhou: ${cmd}`);
            console.log(`Erro: ${error.message}`);
        }
    }

    if (!buildSuccess) {
        throw new Error('Todos os comandos de build falharam');
    }

    console.log('\n🎉 BUILD VERCEL CONCLUÍDO!');
    console.log('✅ Arquivos estáticos gerados');
    console.log('✅ Pronto para deploy no Vercel');

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

