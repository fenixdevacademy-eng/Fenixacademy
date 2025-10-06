'use client';

import { NextRequest, NextResponse } from 'next/server'

// Usuários de teste simples
const TEST_USERS = [
    {
        id: '1',
        name: 'Admin',
        email: 'admin@fenix.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        id: '2',
        name: 'Usuário Teste',
        email: 'user@fenix.com',
        password: 'user123',
        role: 'user'
    },
    {
        id: '3',
        name: 'Desenvolvedor',
        email: 'dev@fenix.com',
        password: 'dev123',
        role: 'user'
    }
]

export async function POST(request: NextRequest) {
    try {
        console.log('=== LOGIN SIMPLE API INICIADA ===')

        // Parse do body
        const body = await request.json()
        const { email, password } = body

        console.log('Email recebido:', email)
        console.log('Senha recebida:', password ? '***' : 'undefined')

        // Validação básica
        if (!email || !password) {
            console.log('Campos obrigatórios não fornecidos')
            return NextResponse.json({
                success: false,
                error: 'Email e senha são obrigatórios'
            }, { status: 400 })
        }

        // Buscar usuário
        const user = TEST_USERS.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        )

        console.log('Usuário encontrado:', !!user)

        if (!user) {
            console.log('Usuário não encontrado')
            return NextResponse.json({
                success: false,
                error: 'Email ou senha incorretos'
            }, { status: 401 })
        }

        console.log('Login bem-sucedido para:', user.name)

        // Gerar token simples
        const token = `simple-token-${user.id}-${Date.now()}`

        // Dados do usuário
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: new Date().toISOString()
        }

        console.log('=== LOGIN SIMPLE API CONCLUÍDA COM SUCESSO ===')

        return NextResponse.json({
            success: true,
            message: 'Login realizado com sucesso!',
            user: userData,
            token: token
        })

    } catch (error) {
        console.error('=== ERRO NA LOGIN SIMPLE API ===')
        console.error('Erro:', error)

        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 })
    }
}