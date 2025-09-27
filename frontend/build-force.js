const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 INICIANDO BUILD FORÇADO DA FENIX...');
console.log('=====================================');

// Função para executar comandos com tratamento de erro
function runCommand(command, description) {
    console.log(`\n📋 ${description}...`);
    try {
        execSync(command, { stdio: 'inherit', cwd: process.cwd() });
        console.log(`✅ ${description} - SUCESSO`);
        return true;
    } catch (error) {
        console.log(`❌ ${description} - ERRO: ${error.message}`);
        return false;
    }
}

// Função para remover diretórios/arquivos
function removeItem(itemPath) {
    if (fs.existsSync(itemPath)) {
        try {
            if (fs.statSync(itemPath).isDirectory()) {
                fs.rmSync(itemPath, { recursive: true, force: true });
                console.log(`🗑️  Removido diretório: ${itemPath}`);
            } else {
                fs.unlinkSync(itemPath);
                console.log(`🗑️  Removido arquivo: ${itemPath}`);
            }
        } catch (error) {
            console.log(`⚠️  Erro ao remover ${itemPath}: ${error.message}`);
        }
    }
}

// Lista de itens para remover
const itemsToRemove = [
    '.next',
    'node_modules/.cache',
    'tsconfig.tsbuildinfo',
    'tsconfig.build.tsbuildinfo',
    '.next/cache',
    'out',
    'dist',
    'build'
];

console.log('\n🧹 LIMPEZA COMPLETA...');
itemsToRemove.forEach(removeItem);

console.log('\n🔄 LIMPANDO CACHES...');
runCommand('npm cache clean --force', 'Limpando cache do npm');

console.log('\n📦 REINSTALANDO DEPENDÊNCIAS...');
if (!runCommand('npm install', 'Instalando dependências')) {
    console.log('❌ Falha na instalação de dependências');
    process.exit(1);
}

console.log('\n🔧 VERIFICANDO TYPESCRIPT...');
runCommand('npx tsc --noEmit --skipLibCheck', 'Verificação de tipos');

console.log('\n🏗️  INICIANDO BUILD DO NEXT.JS...');
if (runCommand('npx next build', 'Build do Next.js')) {
    console.log('\n🎉 BUILD CONCLUÍDO COM SUCESSO!');
    console.log('=====================================');
    console.log('✅ Todos os arquivos foram compilados');
    console.log('✅ Projeto pronto para produção');
    console.log('✅ Execute "npm run dev" para desenvolvimento');
} else {
    console.log('\n❌ FALHA NO BUILD');
    console.log('=====================================');
    console.log('🔍 Verifique os erros acima');
    console.log('🔄 Tente executar novamente');
    process.exit(1);
}








