'use client';

import { NextRequest, NextResponse } from 'next/server'

// Usuários mock para deploy estático
const MOCK_USERS = [
    {
        id: '1',
        name: 'Admin',
        email: 'admin@fenix.com',
        password: 'admin123',
        role: 'admin',
        access_level: 'premium'
    },
    {
        id: '2',
        name: 'Usuário Teste',
        email: 'user@fenix.com',
        password: 'user123',
        role: 'user',
        access_level: 'basic'
    },
    {
        id: '3',
        name: 'Desenvolvedor',
        email: 'dev@fenix.com',
        password: 'dev123',
        role: 'user',
        access_level: 'premium'
    }
]

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password } = body

        console.log('Tentativa de login estático:', { email })

        // Validação básica
        if (!email || !password) {
            return NextResponse.json({
                success: false,
                error: 'Email e senha são obrigatórios'
            }, { status: 400 })
        }

        // Validação do formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                error: 'Formato de email inválido'
            }, { status: 400 })
        }

        // Buscar usuário nos dados mock
        const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())

        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'Email ou senha incorretos'
            }, { status: 401 })
        }

        // Verificar senha (comparação simples para deploy estático)
        if (password !== user.password) {
            return NextResponse.json({
                success: false,
                error: 'Email ou senha incorretos'
            }, { status: 401 })
        }

        // Gerar token simples (base64 para deploy estático)
        const tokenData = {
            userId: user.id,
            email: user.email,
            role: user.role,
            timestamp: Date.now()
        }
        const token = Buffer.from(JSON.stringify(tokenData)).toString('base64')

        // Dados do usuário para retorno
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            access_level: user.access_level,
            profile: {
                avatar: null,
                bio: `Perfil de ${user.name}`,
                location: 'Brasil',
                website: 'https://fenixdevacademy.com.br'
            }
        }

        // Log de login
        console.log(`Login estático realizado: ${user.name} (${user.email})`)

        return NextResponse.json({
            success: true,
            message: 'Login realizado com sucesso!',
            user: userData,
            token
        })

    } catch (error) {
        console.error('Erro no login estático:', error)
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 })
    }
}
