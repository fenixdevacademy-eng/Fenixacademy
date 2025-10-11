#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 DEPLOY NETLIFY - FENIX ACADEMY');
console.log('==================================');

// 1. Limpar cache
console.log('📦 Limpando cache...');
try {
    if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
    }
    if (fs.existsSync('out')) {
        fs.rmSync('out', { recursive: true, force: true });
    }
    console.log('✅ Cache limpo');
} catch (error) {
    console.log('⚠️  Erro ao limpar cache:', error.message);
}

// 2. Instalar dependências
console.log('📥 Instalando dependências...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependências instaladas');
} catch (error) {
    console.log('❌ Erro ao instalar dependências');
    process.exit(1);
}

// 3. Gerar Prisma Client
console.log('🗄️  Gerando Prisma Client...');
try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma Client gerado');
} catch (error) {
    console.log('❌ Erro ao gerar Prisma Client');
    process.exit(1);
}

// 4. Build para Netlify
console.log('🔨 Fazendo build para Netlify...');
try {
    execSync('npm run build:netlify', { stdio: 'inherit' });
    console.log('✅ Build concluído');
} catch (error) {
    console.log('❌ Erro no build');
    process.exit(1);
}

// 5. Verificar se o build foi criado
if (!fs.existsSync('out')) {
    console.log('❌ Pasta "out" não foi criada');
    process.exit(1);
}

// 6. Adicionar timestamp
const timestamp = new Date().toISOString();
const versionFile = path.join('out', 'version.txt');
fs.writeFileSync(versionFile, timestamp);
console.log(`📝 Timestamp adicionado: ${timestamp}`);

// 7. Deploy para Netlify
console.log('🚀 Fazendo deploy para Netlify...');
try {
    execSync('npx netlify deploy --prod --dir=out', { stdio: 'inherit' });
    console.log('✅ Deploy concluído');
} catch (error) {
    console.log('❌ Erro no deploy');
    process.exit(1);
}

console.log('🎉 DEPLOY NETLIFY CONCLUÍDO!');
console.log('🌐 Acesse: https://fenixdevacademy.com.br');
console.log('⏰ Aguarde 2-3 minutos para propagação completa');




