#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 FORÇANDO ATUALIZAÇÃO DO FRONTEND - FENIX ACADEMY');
console.log('================================================');

// 1. Limpar cache do Next.js
console.log('📦 Limpando cache do Next.js...');
try {
    execSync('rm -rf .next', { stdio: 'inherit' });
    console.log('✅ Cache do Next.js limpo');
} catch (error) {
    console.log('⚠️  Erro ao limpar cache (normal no Windows)');
}

// 2. Limpar node_modules e reinstalar
console.log('🔄 Reinstalando dependências...');
try {
    execSync('rm -rf node_modules package-lock.json', { stdio: 'inherit' });
} catch (error) {
    console.log('⚠️  Erro ao limpar node_modules (normal no Windows)');
}

try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependências reinstaladas');
} catch (error) {
    console.log('❌ Erro ao reinstalar dependências');
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

// 4. Build com configurações otimizadas
console.log('🔨 Fazendo build otimizado...');
try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build concluído');
} catch (error) {
    console.log('❌ Erro no build');
    process.exit(1);
}

// 5. Adicionar timestamp para forçar cache bust
const timestamp = new Date().toISOString();
const versionFile = path.join(__dirname, 'public', 'version.txt');
fs.writeFileSync(versionFile, timestamp);
console.log(`📝 Timestamp adicionado: ${timestamp}`);

// 6. Deploy para Vercel
console.log('🚀 Fazendo deploy para Vercel...');
try {
    execSync('npx vercel --prod --force', { stdio: 'inherit' });
    console.log('✅ Deploy concluído');
} catch (error) {
    console.log('❌ Erro no deploy');
    process.exit(1);
}

console.log('🎉 ATUALIZAÇÃO FORÇADA CONCLUÍDA!');
console.log('🌐 Acesse: https://fenixdevacademy.com.br');
console.log('⏰ Aguarde 2-3 minutos para propagação completa');


