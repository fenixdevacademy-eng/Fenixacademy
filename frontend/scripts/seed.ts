import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth/password';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Criar usuário admin
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@fenix.com' },
        update: {},
        create: {
            name: 'Administrador',
            email: 'admin@fenix.com',
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
            bio: 'Administrador da plataforma',
            skills: [],
            interests: [],
            coursesCompleted: 0,
            totalHours: 0,
            certificates: 0,
            totalPoints: 0,
            rank: 'Iniciante'
        }
    });

    // Criar usuário de teste
    const testUser = await prisma.user.upsert({
        where: { email: 'teste@teste.com' },
        update: {},
        create: {
            name: 'Usuário Teste',
            email: 'teste@teste.com',
            password: await hashPassword('123456'),
            role: 'student'
        }
    });

    // Criar perfil do usuário de teste
    await prisma.userProfile.upsert({
        where: { userId: testUser.id },
        update: {},
        create: {
            userId: testUser.id,
            bio: 'Usuário de teste',
            skills: [],
            interests: [],
            coursesCompleted: 0,
            totalHours: 0,
            certificates: 0,
            totalPoints: 0,
            rank: 'Iniciante'
        }
    });

    // Criar cursos
    const courses = [
        {
            id: 'react-fundamentals',
            title: 'React Fundamentos',
            description: 'Aprenda os conceitos fundamentais do React',
            slug: 'react-fundamentals',
            price: 197.00,
            duration: 40,
            level: 'iniciante',
            category: 'Frontend'
        },
        {
            id: 'python-data-science',
            title: 'Python para Data Science',
            description: 'Domine Python para análise de dados e machine learning',
            slug: 'python-data-science',
            price: 297.00,
            duration: 50,
            level: 'intermediario',
            category: 'Data Science'
        },
        {
            id: 'nodejs-apis',
            title: 'Node.js e APIs REST',
            description: 'Desenvolva APIs robustas com Node.js e Express',
            slug: 'nodejs-apis',
            price: 247.00,
            duration: 35,
            level: 'intermediario',
            category: 'Backend'
        },
        {
            id: 'react-advanced',
            title: 'React Avançado',
            description: 'Padrões avançados e otimizações em React',
            slug: 'react-advanced',
            price: 347.00,
            duration: 45,
            level: 'avancado',
            category: 'Frontend'
        }
    ];

    for (const course of courses) {
        await prisma.course.upsert({
            where: { id: course.id },
            update: {},
            create: course
        });
    }

    // Criar inscrições do usuário de teste em alguns cursos
    const userCourses = [
        {
            userId: testUser.id,
            courseId: 'react-fundamentals',
            progress: 75
        },
        {
            userId: testUser.id,
            courseId: 'python-data-science',
            progress: 30
        }
    ];

    for (const userCourse of userCourses) {
        await prisma.userCourse.upsert({
            where: {
                userId_courseId: {
                    userId: userCourse.userId,
                    courseId: userCourse.courseId
                }
            },
            update: { progress: userCourse.progress },
            create: userCourse
        });
    }

    console.log('✅ Seed concluído com sucesso!');
    console.log('👤 Usuários criados:');
    console.log('  - admin@fenix.com (admin)');
    console.log('  - teste@teste.com (student)');
    console.log('📚 Cursos criados:', courses.length);
    console.log('🎓 Inscrições criadas:', userCourses.length);
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });