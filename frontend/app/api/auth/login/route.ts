import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Usuários de teste com dados completos
const USERS_DATABASE = [
    {
        id: '1',
        name: 'Admin Fênix',
        email: 'admin@fenix.com',
        password: 'admin123',
        role: 'admin',
        access_level: 'premium',
        phone: '+55 11 99999-9999',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        bio: 'Administrador da Fênix Dev Academy',
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        interests: ['Desenvolvimento Web', 'Data Science', 'Machine Learning'],
        created_at: '2024-01-01T00:00:00.000Z',
        last_login: null as string | null,
        is_active: true,
        avatar: null
    },
    {
        id: '2',
        name: 'João Silva',
        email: 'user@fenix.com',
        password: 'user123',
        role: 'student',
        access_level: 'basic',
        phone: '+55 11 88888-8888',
        city: 'Rio de Janeiro',
        state: 'RJ',
        country: 'Brasil',
        bio: 'Desenvolvedor em formação',
        skills: ['HTML', 'CSS', 'JavaScript'],
        interests: ['Frontend', 'UI/UX'],
        created_at: '2024-01-15T00:00:00.000Z',
        last_login: null as string | null,
        is_active: true,
        avatar: null
    },
    {
        id: '3',
        name: 'Maria Santos',
        email: 'dev@fenix.com',
        password: 'dev123',
        role: 'instructor',
        access_level: 'premium',
        phone: '+55 11 77777-7777',
        city: 'Belo Horizonte',
        state: 'MG',
        country: 'Brasil',
        bio: 'Instrutora especializada em React e Node.js',
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        interests: ['Full Stack', 'Arquitetura de Software'],
        created_at: '2024-01-10T00:00:00.000Z',
        last_login: null as string | null,
        is_active: true,
        avatar: null
    }
]

// Chave secreta para JWT (em produção, use uma variável de ambiente)
const JWT_SECRET = 'fenix-dev-academy-super-secret-key-2024'

// Função para gerar token JWT
function generateToken(user: any): string {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        access_level: user.access_level,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 horas
    }

    return jwt.sign(payload, JWT_SECRET)
}

// Função para verificar senha
function verifyPassword(inputPassword: string, storedPassword: string): boolean {
    return inputPassword === storedPassword
}

// Função para buscar usuário por email
function findUserByEmail(email: string) {
    return USERS_DATABASE.find(user =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.is_active
    )
}

// Função para atualizar último login
function updateLastLogin(userId: string) {
    const user = USERS_DATABASE.find(u => u.id === userId)
    if (user) {
        user.last_login = new Date().toISOString()
    }
}

export async function POST(request: NextRequest) {
    try {
        console.log('🔐 === API LOGIN INICIADA ===')

        // Parse do body
        const body = await request.json()
        const { email, password } = body

        console.log('📧 Email recebido:', email)
        console.log('🔑 Senha recebida:', password ? '***' : 'undefined')

        // Validação de entrada
        if (!email || !password) {
            console.log('❌ Campos obrigatórios não fornecidos')
            return NextResponse.json({
                success: false,
                error: 'Email e senha são obrigatórios',
                code: 'MISSING_FIELDS'
            }, { status: 400 })
        }

        // Validação do formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            console.log('❌ Formato de email inválido')
            return NextResponse.json({
                success: false,
                error: 'Formato de email inválido',
                code: 'INVALID_EMAIL'
            }, { status: 400 })
        }

        // Buscar usuário
        console.log('🔍 Buscando usuário...')
        const user = findUserByEmail(email)

        if (!user) {
            console.log('❌ Usuário não encontrado')
            return NextResponse.json({
                success: false,
                error: 'Email ou senha incorretos',
                code: 'INVALID_CREDENTIALS'
            }, { status: 401 })
        }

        console.log('✅ Usuário encontrado:', user.name)

        // Verificar senha
        console.log('🔐 Verificando senha...')
        const isPasswordValid = verifyPassword(password, user.password)

        if (!isPasswordValid) {
            console.log('❌ Senha incorreta')
            return NextResponse.json({
                success: false,
                error: 'Email ou senha incorretos',
                code: 'INVALID_CREDENTIALS'
            }, { status: 401 })
        }

        console.log('✅ Senha válida')

        // Atualizar último login
        updateLastLogin(user.id)

        // Gerar token JWT
        console.log('🎫 Gerando token JWT...')
        const token = generateToken(user)

        // Preparar dados do usuário para resposta
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            access_level: user.access_level,
            phone: user.phone,
            city: user.city,
            state: user.state,
            country: user.country,
            bio: user.bio,
            skills: user.skills,
            interests: user.interests,
            created_at: user.created_at,
            last_login: user.last_login,
            avatar: user.avatar
        }

        console.log('✅ Dados do usuário preparados')
        console.log('🎫 Token gerado com sucesso')

        // Resposta de sucesso
        const response = {
            success: true,
            message: 'Login realizado com sucesso!',
            user: userData,
            token: token,
            expires_in: 86400, // 24 horas em segundos
            token_type: 'Bearer'
        }

        console.log('🎉 === LOGIN CONCLUÍDO COM SUCESSO ===')
        console.log('👤 Usuário:', userData.name)
        console.log('🎫 Token:', token.substring(0, 20) + '...')

        return NextResponse.json(response)

    } catch (error) {
        console.error('💥 === ERRO NA API LOGIN ===')
        console.error('Erro:', error)

        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor',
            code: 'INTERNAL_ERROR'
        }, { status: 500 })
    }
}