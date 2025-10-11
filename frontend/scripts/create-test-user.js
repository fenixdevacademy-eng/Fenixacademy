const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestUser() {
    try {
        // Verificar se usuário já existe
        const existingUser = await prisma.user.findUnique({
            where: { email: 'teste@fenix.com' }
        });

        if (existingUser) {
            console.log('✅ Usuário de teste já existe:', existingUser.email);
            return;
        }

        // Criar usuário de teste
        const user = await prisma.user.create({
            data: {
                name: 'Usuário Teste',
                email: 'teste@fenix.com',
                password: '123456', // Senha simples para teste
                role: 'student',
                isVerified: true
            }
        });

        // Criar perfil do usuário
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

        console.log('✅ Usuário de teste criado com sucesso!');
        console.log('📧 Email: teste@fenix.com');
        console.log('🔑 Senha: 123456');
        console.log('👤 Nome:', user.name);

    } catch (error) {
        console.error('❌ Erro ao criar usuário de teste:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();


const prisma = new PrismaClient();

async function createTestUser() {
    try {
        // Verificar se usuário já existe
        const existingUser = await prisma.user.findUnique({
            where: { email: 'teste@fenix.com' }
        });

        if (existingUser) {
            console.log('✅ Usuário de teste já existe:', existingUser.email);
            return;
        }

        // Criar usuário de teste
        const user = await prisma.user.create({
            data: {
                name: 'Usuário Teste',
                email: 'teste@fenix.com',
                password: '123456', // Senha simples para teste
                role: 'student',
                isVerified: true
            }
        });

        // Criar perfil do usuário
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

        console.log('✅ Usuário de teste criado com sucesso!');
        console.log('📧 Email: teste@fenix.com');
        console.log('🔑 Senha: 123456');
        console.log('👤 Nome:', user.name);

    } catch (error) {
        console.error('❌ Erro ao criar usuário de teste:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();




































































