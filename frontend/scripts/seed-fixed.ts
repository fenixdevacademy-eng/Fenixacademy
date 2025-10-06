'use client';

// Implementações mock para desenvolvimento
class MockPrismaClient {
    user = {
        upsert: async (data: any) => ({ id: 1, ...data.create }),
        create: async (data: any) => ({ id: 1, ...data }),
        findMany: async () => [],
        findUnique: async (data: any) => null,
        userProfile: {
            upsert: async (data: any) => ({ id: 1, ...data.create }),
            create: async (data: any) => ({ id: 1, ...data })
        }
    }
    course = {
        upsert: async (data: any) => ({ id: 1, ...data.create }),
        create: async (data: any) => ({ id: 1, ...data }),
        findMany: async () => [],
        findUnique: async (data: any) => null
    }
    module = {
        upsert: async (data: any) => ({ id: 1, ...data.create }),
        create: async (data: any) => ({ id: 1, ...data }),
        findMany: async () => [],
        findUnique: async (data: any) => null
    }
    lesson = {
        upsert: async (data: any) => ({ id: 1, ...data.create }),
        create: async (data: any) => ({ id: 1, ...data }),
        findMany: async () => [],
        findUnique: async (data: any) => null
    }
    $disconnect = async () => { }
}

// Função mock para hashPassword
function hashPassword(password: string): string {
    return btoa(password) // Implementação simples para desenvolvimento
}

// Usar process global do Node.js

const prisma = new MockPrismaClient() as any;

async function main() {
    console.log('🌱 Iniciando seed do banco de dados com usuários reais da Fênix Academy...');

    // Criar CEO da Fênix Academy
    const ceoUser = await prisma.user.upsert({
        where: { email: 'contato@fenixdevacademy.com' },
        update: {},
        create: {
            name: 'Lucas Silva Petris',
            email: 'contato@fenixdevacademy.com',
            password: await hashPassword('060223lk'),
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
            avatar: '/images/ceo-avatar.jpg',
            skills: 'Leadership,Strategy,Product Management,Marketing',
            interests: 'Tecnologia,Educação,Inovação',
            coursesCompleted: 5,
            totalHours: 120,
            certificates: 3,
            totalPoints: 2500,
            rank: 'Expert',
            location: 'Brasil'
        }
    });

    // Criar usuário admin
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@fenixdevacademy.com' },
        update: {},
        create: {
            name: 'Admin Fênix',
            email: 'admin@fenixdevacademy.com',
            password: await hashPassword('admin123'),
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
            skills: 'Administração,Sistemas,Suporte',
            interests: 'Tecnologia,Educação',
            coursesCompleted: 3,
            totalHours: 80,
            certificates: 2,
            totalPoints: 1800,
            rank: 'Avançado'
        }
    });

    // Criar usuário estudante real
    const studentUser = await prisma.user.upsert({
        where: { email: 'joao@exemplo.com' },
        update: {},
        create: {
            name: 'João Silva',
            email: 'joao@exemplo.com',
            password: await hashPassword('12345678'),
            role: 'student'
        }
    });

    // Criar perfil do estudante
    await prisma.userProfile.upsert({
        where: { userId: studentUser.id },
        update: {},
        create: {
            userId: studentUser.id,
            bio: 'Desenvolvedor em formação na Fênix Academy',
            skills: 'JavaScript,React,Node.js',
            interests: 'Desenvolvimento Web,Frontend,Backend',
            coursesCompleted: 2,
            totalHours: 45,
            certificates: 1,
            totalPoints: 850,
            rank: 'Intermediário',
            phone: '(11) 99999-9999'
        }
    });

    // Criar usuário estudante 2
    const student2User = await prisma.user.upsert({
        where: { email: 'maria@exemplo.com' },
        update: {},
        create: {
            name: 'Maria Santos',
            email: 'maria@exemplo.com',
            password: await hashPassword('senha123'),
            role: 'student'
        }
    });

    // Criar perfil do estudante 2
    await prisma.userProfile.upsert({
        where: { userId: student2User.id },
        update: {},
        create: {
            userId: student2User.id,
            bio: 'Estudante de Data Science na Fênix Academy',
            skills: 'Python,Data Analysis,SQL',
            interests: 'Data Science,Machine Learning,Análise de Dados',
            coursesCompleted: 1,
            totalHours: 25,
            certificates: 0,
            totalPoints: 450,
            rank: 'Iniciante',
            phone: '(11) 77777-7777'
        }
    });

    // Criar usuário professor
    const teacherUser = await prisma.user.upsert({
        where: { email: 'prof.carlos@fenixdevacademy.com' },
        update: {},
        create: {
            name: 'Professor Carlos',
            email: 'prof.carlos@fenixdevacademy.com',
            password: await hashPassword('prof123'),
            role: 'teacher'
        }
    });

    // Criar perfil do professor
    await prisma.userProfile.upsert({
        where: { userId: teacherUser.id },
        update: {},
        create: {
            userId: teacherUser.id,
            bio: 'Instrutor sênior da Fênix Academy, especialista em React e Node.js',
            skills: 'React,Node.js,JavaScript,TypeScript,Full Stack',
            interests: 'Ensino,Desenvolvimento Web,Arquitetura de Software',
            coursesCompleted: 0,
            totalHours: 0,
            certificates: 0,
            totalPoints: 0,
            rank: 'Instrutor',
            phone: '(11) 66666-6666'
        }
    });

    console.log('✅ Seed concluído com sucesso!');
    console.log('👤 Usuários reais da Fênix Academy criados:');
    console.log('  - contato@fenixdevacademy.com (CEO)');
    console.log('  - admin@fenixdevacademy.com (Admin)');
    console.log('  - joao@exemplo.com (Estudante)');
    console.log('  - maria@exemplo.com (Estudante)');
    console.log('  - prof.carlos@fenixdevacademy.com (Professor)');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

