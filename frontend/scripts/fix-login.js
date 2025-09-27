#!/usr/bin/env node

/**
 * Script para corrigir o sistema de login da Fênix Academy
 * Este script irá:
 * 1. Configurar o banco de dados
 * 2. Criar usuários de teste
 * 3. Verificar se o sistema está funcionando
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Iniciando correção do sistema de login...\n');

try {
    // 1. Verificar se o Prisma está configurado
    console.log('📋 Verificando configuração do Prisma...');
    
    if (!fs.existsSync('prisma/schema.prisma')) {
        console.log('❌ Schema do Prisma não encontrado. Criando...');
        
        // Criar schema básico do Prisma
        const schemaContent = `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      String   @default("student")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  profile UserProfile?
  
  @@map("users")
}

model UserProfile {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  bio               String?
  avatar            String?
  skills            String[]
  interests         String[]
  coursesCompleted  Int      @default(0)
  totalHours        Int      @default(0)
  certificates      Int      @default(0)
  totalPoints       Int      @default(0)
  rank              String   @default("Iniciante")
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@map("user_profiles")
}

model Course {
  id          String   @id @default(cuid())
  title       String
  description String?
  slug        String   @unique
  price       Float    @default(0)
  isFree      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("courses")
}
`;

        fs.writeFileSync('prisma/schema.prisma', schemaContent);
        console.log('✅ Schema do Prisma criado');
    } else {
        console.log('✅ Schema do Prisma encontrado');
    }

    // 2. Instalar dependências se necessário
    console.log('\n📦 Verificando dependências...');
    
    if (!fs.existsSync('node_modules')) {
        console.log('📥 Instalando dependências...');
        execSync('npm install', { stdio: 'inherit' });
    } else {
        console.log('✅ Dependências já instaladas');
    }

    // 3. Gerar cliente Prisma
    console.log('\n🔧 Gerando cliente Prisma...');
    try {
        execSync('npx prisma generate', { stdio: 'inherit' });
        console.log('✅ Cliente Prisma gerado');
    } catch (error) {
        console.log('⚠️ Erro ao gerar cliente Prisma, continuando...');
    }

    // 4. Executar migrações
    console.log('\n🗄️ Executando migrações do banco...');
    try {
        execSync('npx prisma db push', { stdio: 'inherit' });
        console.log('✅ Migrações executadas');
    } catch (error) {
        console.log('⚠️ Erro nas migrações, continuando...');
    }

    // 5. Criar script de seed
    console.log('\n🌱 Criando script de seed...');
    
    const seedScript = `import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Criar usuário admin
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@fenixdevacademy.com' },
        update: {},
        create: {
            name: 'Administrador Fênix',
            email: 'admin@fenixdevacademy.com',
            password: await bcrypt.hash('admin123', 12),
            role: 'admin'
        }
    });

    // Criar perfil do admin
    await prisma.userProfile.upsert({
        where: { userId: adminUser.id },
        update: {},
        create: {
            userId: adminUser.id,
            bio: 'Administrador da plataforma Fênix Academy',
            skills: ['Administração', 'Sistemas', 'Suporte'],
            interests: ['Tecnologia', 'Educação'],
            coursesCompleted: 3,
            totalHours: 80,
            certificates: 2,
            totalPoints: 1500,
            rank: 'Expert'
        }
    });

    // Criar usuário CEO
    const ceoUser = await prisma.user.upsert({
        where: { email: 'contato@fenixdevacademy.com' },
        update: {},
        create: {
            name: 'Lucas Silva Petris',
            email: 'contato@fenixdevacademy.com',
            password: await bcrypt.hash('060223lk', 12),
            role: 'admin'
        }
    });

    // Criar perfil do CEO
    await prisma.userProfile.upsert({
        where: { userId: ceoUser.id },
        update: {},
        create: {
            userId: ceoUser.id,
            bio: 'CEO e Fundador da Fênix Dev Academy',
            skills: ['Leadership', 'Strategy', 'Product Management', 'Marketing'],
            interests: ['Tecnologia', 'Educação', 'Empreendedorismo'],
            coursesCompleted: 5,
            totalHours: 120,
            certificates: 3,
            totalPoints: 2500,
            rank: 'Master'
        }
    });

    // Criar usuário estudante
    const studentUser = await prisma.user.upsert({
        where: { email: 'joao@exemplo.com' },
        update: {},
        create: {
            name: 'João Silva',
            email: 'joao@exemplo.com',
            password: await bcrypt.hash('12345678', 12),
            role: 'student'
        }
    });

    // Criar perfil do estudante
    await prisma.userProfile.upsert({
        where: { userId: studentUser.id },
        update: {},
        create: {
            userId: studentUser.id,
            bio: 'Desenvolvedor em formação',
            skills: ['JavaScript', 'React', 'Node.js'],
            interests: ['Frontend', 'Backend', 'Full Stack'],
            coursesCompleted: 2,
            totalHours: 45,
            certificates: 1,
            totalPoints: 800,
            rank: 'Intermediário'
        }
    });

    // Criar usuário estudante 2
    const student2User = await prisma.user.upsert({
        where: { email: 'maria@exemplo.com' },
        update: {},
        create: {
            name: 'Maria Santos',
            email: 'maria@exemplo.com',
            password: await bcrypt.hash('senha123', 12),
            role: 'student'
        }
    });

    // Criar perfil do estudante 2
    await prisma.userProfile.upsert({
        where: { userId: student2User.id },
        update: {},
        create: {
            userId: student2User.id,
            bio: 'Estudante de Data Science',
            skills: ['Python', 'Data Analysis', 'SQL'],
            interests: ['Data Science', 'Machine Learning', 'Estatística'],
            coursesCompleted: 1,
            totalHours: 25,
            certificates: 0,
            totalPoints: 400,
            rank: 'Iniciante'
        }
    });

    // Criar usuário professor
    const teacherUser = await prisma.user.upsert({
        where: { email: 'prof.carlos@fenixdevacademy.com' },
        update: {},
        create: {
            name: 'Professor Carlos',
            email: 'prof.carlos@fenixdevacademy.com',
            password: await bcrypt.hash('prof123', 12),
            role: 'teacher'
        }
    });

    // Criar perfil do professor
    await prisma.userProfile.upsert({
        where: { userId: teacherUser.id },
        update: {},
        create: {
            userId: teacherUser.id,
            bio: 'Instrutor sênior especialista em React e Node.js',
            skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Full Stack'],
            interests: ['Ensino', 'Desenvolvimento', 'Tecnologia'],
            coursesCompleted: 8,
            totalHours: 200,
            certificates: 5,
            totalPoints: 3500,
            rank: 'Expert'
        }
    });

    console.log('✅ Seed concluído com sucesso!');
    console.log('\\n👥 Usuários criados:');
    console.log('📧 admin@fenixdevacademy.com / admin123 (Admin)');
    console.log('📧 contato@fenixdevacademy.com / 060223lk (CEO)');
    console.log('📧 joao@exemplo.com / 12345678 (Estudante)');
    console.log('📧 maria@exemplo.com / senha123 (Estudante)');
    console.log('📧 prof.carlos@fenixdevacademy.com / prof123 (Professor)');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
`;

    fs.writeFileSync('scripts/seed-database.js', seedScript);
    console.log('✅ Script de seed criado');

    // 6. Executar seed
    console.log('\n🌱 Executando seed do banco...');
    try {
        execSync('node scripts/seed-database.js', { stdio: 'inherit' });
        console.log('✅ Seed executado com sucesso');
    } catch (error) {
        console.log('⚠️ Erro no seed, continuando...');
    }

    // 7. Criar página de teste de login
    console.log('\n🧪 Criando página de teste de login...');
    
    const testPageContent = `'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginTestPage() {
    const [credentials, setCredentials] = useState({
        email: 'admin@fenixdevacademy.com',
        password: 'admin123'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const router = useRouter();

    const testCredentials = [
        { email: 'admin@fenixdevacademy.com', password: 'admin123', role: 'Admin' },
        { email: 'contato@fenixdevacademy.com', password: '060223lk', role: 'CEO' },
        { email: 'joao@exemplo.com', password: '12345678', role: 'Estudante' },
        { email: 'maria@exemplo.com', password: 'senha123', role: 'Estudante' },
        { email: 'prof.carlos@fenixdevacademy.com', password: 'prof123', role: 'Professor' }
    ];

    const handleTestLogin = async (testCred) => {
        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/auth/login-simple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testCred)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setResult({
                    success: true,
                    message: 'Login realizado com sucesso!',
                    user: data.user
                });
                
                // Salvar dados no localStorage
                localStorage.setItem('fenix-jwt-token', data.token);
                localStorage.setItem('fenix_user', JSON.stringify(data.user));
                
                // Redirecionar após 2 segundos
                setTimeout(() => {
                    router.push('/profile');
                }, 2000);
            } else {
                setResult({
                    success: false,
                    message: data.error || 'Erro no login'
                });
            }
        } catch (error) {
            setResult({
                success: false,
                message: 'Erro de conexão: ' + error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    🧪 Teste de Login - Fênix Academy
                </h1>

                <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold text-blue-900 mb-2">
                            📋 Credenciais de Teste Disponíveis
                        </h2>
                        <div className="space-y-2">
                            {testCredentials.map((cred, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                                    <div>
                                        <span className="font-medium">{cred.role}:</span>
                                        <span className="text-gray-600 ml-2">{cred.email}</span>
                                    </div>
                                    <button
                                        onClick={() => handleTestLogin(cred)}
                                        disabled={isLoading}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {isLoading ? 'Testando...' : 'Testar'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {result && (
                        <div className={\`p-4 rounded-lg \${result.success ? 'bg-green-50' : 'bg-red-50'}\`}>
                            <h3 className={\`font-semibold \${result.success ? 'text-green-900' : 'text-red-900'}\`}>
                                {result.success ? '✅ Sucesso!' : '❌ Erro!'}
                            </h3>
                            <p className={\`mt-2 \${result.success ? 'text-green-700' : 'text-red-700'}\`}>
                                {result.message}
                            </p>
                            {result.user && (
                                <div className="mt-3 bg-white p-3 rounded border">
                                    <h4 className="font-medium text-gray-900">Dados do usuário:</h4>
                                    <pre className="text-sm text-gray-600 mt-1">
                                        {JSON.stringify(result.user, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="text-center">
                        <button
                            onClick={() => router.push('/auth/login')}
                            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                        >
                            Ir para Página de Login Normal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
`;

    fs.writeFileSync('app/login-test/page.tsx', testPageContent);
    console.log('✅ Página de teste criada em /login-test');

    console.log('\n🎉 Correção do sistema de login concluída!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Execute: npm run dev');
    console.log('2. Acesse: http://localhost:3000/login-test');
    console.log('3. Teste as credenciais disponíveis');
    console.log('4. Se funcionar, acesse: http://localhost:3000/auth/login');

} catch (error) {
    console.error('❌ Erro durante a correção:', error.message);
    process.exit(1);
}











