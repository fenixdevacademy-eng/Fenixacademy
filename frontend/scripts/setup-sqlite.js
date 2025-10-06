const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db"
        }
    }
});

async function setupSQLite() {
    try {
        console.log('🚀 Configurando banco SQLite...');

        // Verificar se usuário de teste já existe
        const existingUser = await prisma.user.findUnique({
            where: { email: 'teste@fenix.com' }
        });

        if (existingUser) {
            console.log('✅ Usuário de teste já existe:', existingUser.email);
            console.log('📧 Email: teste@fenix.com');
            console.log('🔑 Senha: 123456');
            return;
        }

        // Criar usuário de teste
        const user = await prisma.user.create({
            data: {
                name: 'Usuário Teste',
                email: 'teste@fenix.com',
                password: '123456',
                role: 'student'
            }
        });

        console.log('✅ Usuário criado:', user.name);

        // Criar perfil do usuário
        const profile = await prisma.userProfile.create({
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

        console.log('✅ Perfil criado para:', user.name);

        console.log('\n🎉 Configuração concluída!');
        console.log('📧 Email: teste@fenix.com');
        console.log('🔑 Senha: 123456');
        console.log('👤 Nome:', user.name);

    } catch (error) {
        console.error('❌ Erro ao configurar banco:', error);

        if (error.code === 'P2002') {
            console.log('ℹ️  Usuário já existe no banco de dados');
        } else if (error.code === 'P1001') {
            console.log('❌ Não foi possível conectar ao banco de dados');
            console.log('💡 Execute: npx prisma generate && npx prisma db push');
        }
    } finally {
        await prisma.$disconnect();
    }
}

setupSQLite();


const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db"
        }
    }
});

async function setupSQLite() {
    try {
        console.log('🚀 Configurando banco SQLite...');

        // Verificar se usuário de teste já existe
        const existingUser = await prisma.user.findUnique({
            where: { email: 'teste@fenix.com' }
        });

        if (existingUser) {
            console.log('✅ Usuário de teste já existe:', existingUser.email);
            console.log('📧 Email: teste@fenix.com');
            console.log('🔑 Senha: 123456');
            return;
        }

        // Criar usuário de teste
        const user = await prisma.user.create({
            data: {
                name: 'Usuário Teste',
                email: 'teste@fenix.com',
                password: '123456',
                role: 'student'
            }
        });

        console.log('✅ Usuário criado:', user.name);

        // Criar perfil do usuário
        const profile = await prisma.userProfile.create({
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

        console.log('✅ Perfil criado para:', user.name);

        console.log('\n🎉 Configuração concluída!');
        console.log('📧 Email: teste@fenix.com');
        console.log('🔑 Senha: 123456');
        console.log('👤 Nome:', user.name);

    } catch (error) {
        console.error('❌ Erro ao configurar banco:', error);

        if (error.code === 'P2002') {
            console.log('ℹ️  Usuário já existe no banco de dados');
        } else if (error.code === 'P1001') {
            console.log('❌ Não foi possível conectar ao banco de dados');
            console.log('💡 Execute: npx prisma generate && npx prisma db push');
        }
    } finally {
        await prisma.$disconnect();
    }
}

setupSQLite();
























































