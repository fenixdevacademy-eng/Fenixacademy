import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Chave secreta para JWT
const JWT_SECRET = 'fenix-dev-academy-super-secret-key-2024'

// Simulação de banco de dados em memória (mesmo do login)
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
        last_login: null,
        is_active: true,
        avatar: null
    }
]

// Função para buscar usuário por ID
function findUserById(id: string) {
    return USERS_DATABASE.find(user => user.id === id && user.is_active)
}

export async function GET(request: NextRequest) {
    try {
        console.log('🔍 === API VERIFICAÇÃO DE TOKEN INICIADA ===')

        // Obter token do header Authorization
        const authHeader = request.headers.get('authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('❌ Token não fornecido ou formato inválido')
            return NextResponse.json({
                success: false,
                error: 'Token de autorização não fornecido',
                code: 'MISSING_TOKEN'
            }, { status: 401 })
        }

        const token = authHeader.substring(7) // Remove 'Bearer '
        console.log('🎫 Token recebido:', token.substring(0, 20) + '...')

        // Verificar e decodificar token
        let decoded
        try {
            decoded = jwt.verify(token, JWT_SECRET) as any
            console.log('✅ Token válido, decodificado com sucesso')
        } catch (jwtError) {
            console.log('❌ Token inválido ou expirado:', jwtError)
            return NextResponse.json({
                success: false,
                error: 'Token inválido ou expirado',
                code: 'INVALID_TOKEN'
            }, { status: 401 })
        }

        // Buscar usuário no banco de dados
        console.log('🔍 Buscando usuário por ID:', decoded.id)
        const user = findUserById(decoded.id)

        if (!user) {
            console.log('❌ Usuário não encontrado')
            return NextResponse.json({
                success: false,
                error: 'Usuário não encontrado',
                code: 'USER_NOT_FOUND'
            }, { status: 404 })
        }

        console.log('✅ Usuário encontrado:', user.name)

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

        // Resposta de sucesso
        const response = {
            success: true,
            message: 'Token válido',
            user: userData,
            token_info: {
                issued_at: new Date(decoded.iat * 1000).toISOString(),
                expires_at: new Date(decoded.exp * 1000).toISOString(),
                role: decoded.role,
                access_level: decoded.access_level
            }
        }

        console.log('🎉 === VERIFICAÇÃO CONCLUÍDA COM SUCESSO ===')
        console.log('👤 Usuário:', userData.name)
        console.log('🎫 Token válido até:', response.token_info.expires_at)

        return NextResponse.json(response)

    } catch (error) {
        console.error('💥 === ERRO NA API VERIFICAÇÃO ===')
        console.error('Erro:', error)

        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor',
            code: 'INTERNAL_ERROR'
        }, { status: 500 })
    }
}










