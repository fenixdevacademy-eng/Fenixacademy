import { PrismaClient } from '@prisma/client';
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
            skills: 'Administração, Sistemas, Suporte',
            interests: 'Tecnologia, Educação',
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
            skills: 'Leadership, Strategy, Product Management, Marketing',
            interests: 'Tecnologia, Educação, Empreendedorismo',
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
            skills: 'JavaScript, React, Node.js',
            interests: 'Frontend, Backend, Full Stack',
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
            skills: 'Python, Data Analysis, SQL',
            interests: 'Data Science, Machine Learning, Estatística',
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
            skills: 'React, Node.js, JavaScript, TypeScript, Full Stack',
            interests: 'Ensino, Desenvolvimento, Tecnologia',
            coursesCompleted: 8,
            totalHours: 200,
            certificates: 5,
            totalPoints: 3500,
            rank: 'Expert'
        }
    });

    console.log('✅ Seed concluído com sucesso!');
    console.log('\n👥 Usuários criados:');
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
