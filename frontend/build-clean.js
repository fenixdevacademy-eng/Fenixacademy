const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 LIMPANDO CACHES E ARQUIVOS TEMPORÁRIOS...');

// Função para remover diretórios recursivamente
function removeDir(dirPath) {
    if (fs.existsSync(dirPath)) {
        try {
            fs.rmSync(dirPath, { recursive: true, force: true });
            console.log(`✅ Removido: ${dirPath}`);
        } catch (error) {
            console.log(`⚠️  Erro ao remover ${dirPath}: ${error.message}`);
        }
    }
}

// Função para remover arquivos
function removeFile(filePath) {
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            console.log(`✅ Removido: ${filePath}`);
        } catch (error) {
            console.log(`⚠️  Erro ao remover ${filePath}: ${error.message}`);
        }
    }
}

// Limpar todos os caches e arquivos temporários
const itemsToRemove = [
    '.next',
    'node_modules/.cache',
    'tsconfig.tsbuildinfo',
    'tsconfig.build.tsbuildinfo',
    '.next/cache',
    'out',
    'dist'
];

console.log('🗑️  Removendo arquivos e diretórios...');
itemsToRemove.forEach(item => {
    const fullPath = path.resolve(item);
    if (fs.statSync(fullPath).isDirectory()) {
        removeDir(fullPath);
    } else {
        removeFile(fullPath);
    }
});

console.log('🔄 Limpando cache do npm...');
try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
} catch (error) {
    console.log('⚠️  Erro ao limpar cache do npm:', error.message);
}

console.log('🔧 Reinstalando dependências...');
try {
    execSync('npm install', { stdio: 'inherit' });
} catch (error) {
    console.log('⚠️  Erro ao reinstalar dependências:', error.message);
}

console.log('🏗️  Iniciando build...');
try {
    execSync('npx next build', { stdio: 'inherit' });
    console.log('✅ BUILD CONCLUÍDO COM SUCESSO!');
} catch (error) {
    console.log('❌ ERRO NO BUILD:', error.message);
    process.exit(1);
}









