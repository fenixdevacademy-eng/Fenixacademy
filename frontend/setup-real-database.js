const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function setupDatabase() {
    try {
        console.log('🔧 Configurando banco de dados SQLite...')
        
        // Criar arquivo .env se não existir
        const envPath = path.join(__dirname, '.env')
        if (!fs.existsSync(envPath)) {
            const envContent = `# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="fenix-dev-academy-super-secret-key-2024"
JWT_EXPIRES_IN="7d"

# App
NEXT_PUBLIC_APP_URL="https://fenixdevacademy.com.br"
NEXT_PUBLIC_APP_NAME="Fênix Dev Academy"

# Email (opcional)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""

# Payment (opcional)
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""`
            
            fs.writeFileSync(envPath, envContent)
            console.log('✅ Arquivo .env criado')
        }

        // Executar migrações
        console.log('📦 Executando migrações do Prisma...')
        const { execSync } = require('child_process')
        execSync('npx prisma migrate dev --name init', { stdio: 'inherit' })
        
        console.log('👥 Criando usuários...')
        
        // Hash da senha
        const hashedPassword = await bcrypt.hash('159753', 10)
        
        // Criar usuários
        const users = [
            {
                email: 'fenixdevacademy@gmail.com',
                name: 'Lucas Silva Petris',
                password: hashedPassword,
                role: 'ceo',
                isVerified: true
            },
            {
                email: 'cezsarcamaralins007@gmail.com',
                name: 'Cezar Camaralins',
                password: hashedPassword,
                role: 'manager',
                isVerified: true
            },
            {
                email: 'robertdemoraes@gmail.com',
                name: 'Robert de Moraes',
                password: hashedPassword,
                role: 'student',
                isVerified: true
            }
        ]

        for (const userData of users) {
            // Verificar se usuário já existe
            const existingUser = await prisma.user.findUnique({
                where: { email: userData.email }
            })

            if (!existingUser) {
                const user = await prisma.user.create({
                    data: userData
                })

                // Criar perfil do usuário
                await prisma.userProfile.create({
                    data: {
                        userId: user.id,
                        phone: userData.email === 'fenixdevacademy@gmail.com' ? '+55 21 99999-9999' : null,
                        location: userData.email === 'fenixdevacademy@gmail.com' ? 'Rio de Janeiro, RJ' : 'Brasil',
                        bio: userData.email === 'fenixdevacademy@gmail.com' 
                            ? 'CEO e Fundador da Fênix Dev Academy. Apaixonado por tecnologia e educação.'
                            : userData.email === 'cezsarcamaralins007@gmail.com'
                            ? 'Gestor de Tráfego especializado em marketing digital e crescimento de negócios.'
                            : 'Estudante de programação focado em desenvolvimento web e mobile.',
                        skills: userData.email === 'fenixdevacademy@gmail.com' 
                            ? 'Liderança, Estratégia, Desenvolvimento de Negócios, Tecnologia'
                            : userData.email === 'cezsarcamaralins007@gmail.com'
                            ? 'Marketing Digital, Google Ads, Facebook Ads, Analytics'
                            : 'JavaScript, React, Node.js, Python',
                        interests: userData.email === 'fenixdevacademy@gmail.com'
                            ? 'Educação, Tecnologia, Empreendedorismo, Inovação'
                            : userData.email === 'cezsarcamaralins007@gmail.com'
                            ? 'Marketing Digital, Growth Hacking, E-commerce'
                            : 'Desenvolvimento Web, Mobile, Data Science',
                        coursesCompleted: userData.email === 'fenixdevacademy@gmail.com' ? 15 : 3,
                        totalHours: userData.email === 'fenixdevacademy@gmail.com' ? 120 : 25,
                        certificates: userData.email === 'fenixdevacademy@gmail.com' ? 12 : 2,
                        totalPoints: userData.email === 'fenixdevacademy@gmail.com' ? 2500 : 450,
                        rank: userData.email === 'fenixdevacademy@gmail.com' ? 'Expert' : 'Intermediário',
                        publicProfile: true,
                        showProgress: true,
                        notifications: true,
                        emailUpdates: true
                    }
                })

                console.log(`✅ Usuário criado: ${user.name} (${user.email})`)
            } else {
                console.log(`⚠️  Usuário já existe: ${userData.email}`)
            }
        }

        console.log('🎉 Banco de dados configurado com sucesso!')
        console.log('\n📋 Usuários criados:')
        console.log('1. fenixdevacademy@gmail.com - Lucas Silva Petris (CEO)')
        console.log('2. cezsarcamaralins007@gmail.com - Cezar Camaralins (Gestor de Tráfego)')
        console.log('3. robertdemoraes@gmail.com - Robert de Moraes (Estudante)')
        console.log('\n🔑 Senha para todos: 159753')

    } catch (error) {
        console.error('❌ Erro ao configurar banco:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

setupDatabase()









