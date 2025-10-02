import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Chave secreta para JWT
const JWT_SECRET = 'fenix-dev-academy-super-secret-key-2024'

// Simulação de banco de dados em memória
let USERS_DATABASE = [
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
        last_login: null,
        is_active: true,
        avatar: null
    }
]

// Função para gerar ID único
function generateUserId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

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

// Função para verificar se email já existe
function emailExists(email: string): boolean {
    return USERS_DATABASE.some(user =>
        user.email.toLowerCase() === email.toLowerCase()
    )
}

// Função para validar senha
function validatePassword(password: string): { valid: boolean; error?: string } {
    if (password.length < 6) {
        return { valid: false, error: 'Senha deve ter pelo menos 6 caracteres' }
    }

    if (password.length > 50) {
        return { valid: false, error: 'Senha deve ter no máximo 50 caracteres' }
    }

    return { valid: true }
}

// Função para validar nome
function validateName(name: string): { valid: boolean; error?: string } {
    if (!name || name.trim().length < 2) {
        return { valid: false, error: 'Nome deve ter pelo menos 2 caracteres' }
    }

    if (name.trim().length > 100) {
        return { valid: false, error: 'Nome deve ter no máximo 100 caracteres' }
    }

    return { valid: true }
}

export async function POST(request: NextRequest) {
    try {
        console.log('📝 === API REGISTRO INICIADA ===')

        // Parse do body
        const body = await request.json()
        const { name, email, password, confirmPassword } = body

        console.log('👤 Nome recebido:', name)
        console.log('📧 Email recebido:', email)
        console.log('🔑 Senha recebida:', password ? '***' : 'undefined')
        console.log('🔑 Confirmação de senha:', confirmPassword ? '***' : 'undefined')

        // Validação de campos obrigatórios
        if (!name || !email || !password || !confirmPassword) {
            console.log('❌ Campos obrigatórios não fornecidos')
            return NextResponse.json({
                success: false,
                error: 'Todos os campos são obrigatórios',
                code: 'MISSING_FIELDS'
            }, { status: 400 })
        }

        // Validação do nome
        const nameValidation = validateName(name)
        if (!nameValidation.valid) {
            console.log('❌ Nome inválido:', nameValidation.error)
            return NextResponse.json({
                success: false,
                error: nameValidation.error,
                code: 'INVALID_NAME'
            }, { status: 400 })
        }

        // Validação do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            console.log('❌ Formato de email inválido')
            return NextResponse.json({
                success: false,
                error: 'Formato de email inválido',
                code: 'INVALID_EMAIL'
            }, { status: 400 })
        }

        // Verificar se email já existe
        if (emailExists(email)) {
            console.log('❌ Email já cadastrado')
            return NextResponse.json({
                success: false,
                error: 'Este email já está cadastrado',
                code: 'EMAIL_EXISTS'
            }, { status: 409 })
        }

        // Validação da senha
        const passwordValidation = validatePassword(password)
        if (!passwordValidation.valid) {
            console.log('❌ Senha inválida:', passwordValidation.error)
            return NextResponse.json({
                success: false,
                error: passwordValidation.error,
                code: 'INVALID_PASSWORD'
            }, { status: 400 })
        }

        // Verificar se senhas coincidem
        if (password !== confirmPassword) {
            console.log('❌ Senhas não coincidem')
            return NextResponse.json({
                success: false,
                error: 'As senhas não coincidem',
                code: 'PASSWORD_MISMATCH'
            }, { status: 400 })
        }

        // Criar novo usuário
        console.log('👤 Criando novo usuário...')
        const newUser = {
            id: generateUserId(),
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password, // Em produção, hash a senha
            role: 'student',
            access_level: 'basic',
            phone: '',
            city: '',
            state: '',
            country: 'Brasil',
            bio: '',
            skills: [],
            interests: [],
            created_at: new Date().toISOString(),
            last_login: null,
            is_active: true,
            avatar: null
        }

        // Adicionar usuário ao banco de dados
        USERS_DATABASE.push(newUser)
        console.log('✅ Usuário criado com sucesso:', newUser.name)

        // Gerar token JWT
        console.log('🎫 Gerando token JWT...')
        const token = generateToken(newUser)

        // Preparar dados do usuário para resposta (sem senha)
        const userData = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            access_level: newUser.access_level,
            phone: newUser.phone,
            city: newUser.city,
            state: newUser.state,
            country: newUser.country,
            bio: newUser.bio,
            skills: newUser.skills,
            interests: newUser.interests,
            created_at: newUser.created_at,
            last_login: newUser.last_login,
            avatar: newUser.avatar
        }

        console.log('✅ Dados do usuário preparados')
        console.log('🎫 Token gerado com sucesso')

        // Resposta de sucesso
        const response = {
            success: true,
            message: 'Conta criada com sucesso!',
            user: userData,
            token: token,
            expires_in: 86400, // 24 horas em segundos
            token_type: 'Bearer'
        }

        console.log('🎉 === REGISTRO CONCLUÍDO COM SUCESSO ===')
        console.log('👤 Usuário:', userData.name)
        console.log('📧 Email:', userData.email)
        console.log('🎫 Token:', token.substring(0, 20) + '...')

        return NextResponse.json(response)

    } catch (error) {
        console.error('💥 === ERRO NA API REGISTRO ===')
        console.error('Erro:', error)

        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor',
            code: 'INTERNAL_ERROR'
        }, { status: 500 })
    }
}