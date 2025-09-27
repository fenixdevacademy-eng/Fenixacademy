const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔥 FORÇANDO BUILD SEM CACHE...');

// Remover todos os caches
const caches = ['.next', 'node_modules/.cache', 'tsconfig.tsbuildinfo', 'tsconfig.build.tsbuildinfo'];

caches.forEach(cache => {
    if (fs.existsSync(cache)) {
        try {
            fs.rmSync(cache, { recursive: true, force: true });
            console.log(`✅ Removido: ${cache}`);
        } catch (e) {
            console.log(`⚠️  Erro ao remover ${cache}: ${e.message}`);
        }
    }
});

// Limpar cache do npm
try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
    console.log('✅ Cache do npm limpo');
} catch (e) {
    console.log('⚠️  Erro ao limpar cache do npm');
}

// Reinstalar dependências
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependências reinstaladas');
} catch (e) {
    console.log('⚠️  Erro ao reinstalar dependências');
}

// Build com configurações que ignoram erros de cache
try {
    execSync('npx next build --no-lint', { stdio: 'inherit' });
    console.log('🎉 BUILD CONCLUÍDO!');
} catch (e) {
    console.log('❌ Erro no build:', e.message);
    process.exit(1);
}









