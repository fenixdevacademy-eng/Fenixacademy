const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 VERIFICANDO ERROS DE SINTAXE...\n');

try {
    // Verificar TypeScript
    console.log('📝 Verificando TypeScript...');
    execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'inherit' });
    console.log('✅ TypeScript OK\n');
} catch (error) {
    console.log('❌ Erros de TypeScript encontrados\n');
}

try {
    // Verificar ESLint
    console.log('🔧 Verificando ESLint...');
    execSync('npx eslint . --ext .ts,.tsx --max-warnings 0', { stdio: 'inherit' });
    console.log('✅ ESLint OK\n');
} catch (error) {
    console.log('❌ Erros de ESLint encontrados\n');
}

console.log('🎉 Verificação concluída!');





