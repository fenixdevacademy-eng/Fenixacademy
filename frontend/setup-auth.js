#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando sistema de autenticação da Fênix Academy...\n');

// 1. Verificar se o Prisma está instalado
console.log('📦 Verificando dependências...');
try {
    execSync('npx prisma --version', { stdio: 'pipe' });
    console.log('✅ Prisma encontrado');
} catch (error) {
    console.log('❌ Prisma não encontrado. Instalando...');
    execSync('npm install prisma @prisma/client', { stdio: 'inherit' });
}

// 2. Gerar cliente Prisma
console.log('\n🔧 Gerando cliente Prisma...');
try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Cliente Prisma gerado');
} catch (error) {
    console.log('❌ Erro ao gerar cliente Prisma:', error.message);
}

// 3. Criar banco de dados
console.log('\n🗄️  Criando banco de dados...');
try {
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Banco de dados criado');
} catch (error) {
    console.log('❌ Erro ao criar banco de dados:', error.message);
}

// 4. Criar usuário de teste
console.log('\n👤 Criando usuário de teste...');
try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    async function createTestUser() {
        // Verificar se usuário já existe
        const existingUser = await prisma.user.findUnique({
            where: { email: 'teste@fenix.com' }
        });

        if (existingUser) {
            console.log('✅ Usuário de teste já existe');
            return;
        }

        // Criar usuário
        const user = await prisma.user.create({
            data: {
                name: 'Usuário Teste',
                email: 'teste@fenix.com',
                password: '123456',
                role: 'student'
            }
        });

        // Criar perfil
        await prisma.userProfile.create({
            data: {
                userId: user.id,
                joinDate: new Date(),
                skills: 'JavaScript, React, Node.js',
                interests: 'Desenvolvimento Web, Data Science',
                bio: 'Desenvolvedor apaixonado por tecnologia',
                phone: '(11) 99999-9999',
                location: 'São Paulo, SP'
            }
        });

        console.log('✅ Usuário de teste criado');
        console.log('📧 Email: teste@fenix.com');
        console.log('🔑 Senha: 123456');
    }

    createTestUser().finally(() => prisma.$disconnect());
} catch (error) {
    console.log('❌ Erro ao criar usuário de teste:', error.message);
}

console.log('\n🎉 Configuração concluída!');
console.log('\n📋 Próximos passos:');
console.log('1. Execute: npm run dev');
console.log('2. Acesse: http://localhost:3000/auth/login');
console.log('3. Faça login com: teste@fenix.com / 123456');
console.log('4. Acesse: http://localhost:3000/profile');
console.log('\n✨ Sistema de autenticação pronto para uso!');


const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando sistema de autenticação da Fênix Academy...\n');

// 1. Verificar se o Prisma está instalado
console.log('📦 Verificando dependências...');
try {
    execSync('npx prisma --version', { stdio: 'pipe' });
    console.log('✅ Prisma encontrado');
} catch (error) {
    console.log('❌ Prisma não encontrado. Instalando...');
    execSync('npm install prisma @prisma/client', { stdio: 'inherit' });
}

// 2. Gerar cliente Prisma
console.log('\n🔧 Gerando cliente Prisma...');
try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Cliente Prisma gerado');
} catch (error) {
    console.log('❌ Erro ao gerar cliente Prisma:', error.message);
}

// 3. Criar banco de dados
console.log('\n🗄️  Criando banco de dados...');
try {
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Banco de dados criado');
} catch (error) {
    console.log('❌ Erro ao criar banco de dados:', error.message);
}

// 4. Criar usuário de teste
console.log('\n👤 Criando usuário de teste...');
try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    async function createTestUser() {
        // Verificar se usuário já existe
        const existingUser = await prisma.user.findUnique({
            where: { email: 'teste@fenix.com' }
        });

        if (existingUser) {
            console.log('✅ Usuário de teste já existe');
            return;
        }

        // Criar usuário
        const user = await prisma.user.create({
            data: {
                name: 'Usuário Teste',
                email: 'teste@fenix.com',
                password: '123456',
                role: 'student'
            }
        });

        // Criar perfil
        await prisma.userProfile.create({
            data: {
                userId: user.id,
                joinDate: new Date(),
                skills: 'JavaScript, React, Node.js',
                interests: 'Desenvolvimento Web, Data Science',
                bio: 'Desenvolvedor apaixonado por tecnologia',
                phone: '(11) 99999-9999',
                location: 'São Paulo, SP'
            }
        });

        console.log('✅ Usuário de teste criado');
        console.log('📧 Email: teste@fenix.com');
        console.log('🔑 Senha: 123456');
    }

    createTestUser().finally(() => prisma.$disconnect());
} catch (error) {
    console.log('❌ Erro ao criar usuário de teste:', error.message);
}

console.log('\n🎉 Configuração concluída!');
console.log('\n📋 Próximos passos:');
console.log('1. Execute: npm run dev');
console.log('2. Acesse: http://localhost:3000/auth/login');
console.log('3. Faça login com: teste@fenix.com / 123456');
console.log('4. Acesse: http://localhost:3000/profile');
console.log('\n✨ Sistema de autenticação pronto para uso!');










































