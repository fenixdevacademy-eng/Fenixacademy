#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🧪 Testando build sem PWA...');

// Navegar para o frontend
process.chdir('frontend');

// Limpar cache
console.log('🧹 Limpando cache...');
try {
    if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
        console.log('✅ .next removido');
    }
    execSync('npm cache clean --force', { stdio: 'pipe' });
    console.log('✅ Cache limpo');
} catch (error) {
    console.log('⚠️ Aviso ao limpar:', error.message);
}

// Testar build
console.log('🏗️ Testando build...');
try {
    process.env.NODE_OPTIONS = '--max-old-space-size=4096';
    execSync('npx next build --no-lint', {
        stdio: 'inherit',
        env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' }
    });
    console.log('✅ Build concluído com sucesso!');
} catch (error) {
    console.log('❌ Erro no build:', error.message);
}

console.log('🏁 Teste finalizado!');







