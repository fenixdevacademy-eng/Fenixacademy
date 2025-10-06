'use client';

﻿import { NextRequest, NextResponse } from 'next/server'
import { userDatabase } from '@/lib/database/users'

// Declaração de tipos para jsonwebtoken
declare const jwt: {
    sign: (payload: any, secret: string) => string
}

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

    // Implementação simples de JWT para desenvolvimento
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payloadEncoded = btoa(JSON.stringify(payload))
    const signature = btoa('mock-signature')
    return `${header}.${payloadEncoded}.${signature}`
}

// Função para verificar senha
function verifyPassword(inputPassword: string, storedPassword: string): boolean {
    return inputPassword === storedPassword
}

// Função para buscar usuário por email
function findUserByEmail(email: string) {
    return userDatabase.findByEmail(email);
}

// Função para atualizar último login
function updateLastLogin(userId: string) {
    userDatabase.update(userId, { last_login: new Date().toISOString() });
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