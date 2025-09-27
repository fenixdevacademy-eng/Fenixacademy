import { NextRequest, NextResponse } from 'next/server'
import {
    createUser,
    hashPassword,
    generateToken,
    emailExists
} from '@/lib/auth-storage'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, password, phone, birthDate } = body

        console.log('Dados recebidos:', { name, email, phone, birthDate })

        // Validação básica
        if (!name || !email || !password) {
            return NextResponse.json({
                success: false,
                error: 'Nome, email e senha são obrigatórios'
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

        // Validação da senha
        if (password.length < 8) {
            return NextResponse.json({
                success: false,
                error: 'A senha deve ter pelo menos 8 caracteres'
            }, { status: 400 })
        }

        // Verificar se o email já existe
        if (emailExists(email)) {
            return NextResponse.json({
                success: false,
                error: 'Este email já está em uso'
            }, { status: 400 })
        }

        // Criar novo usuário
        const newUser = createUser({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashPassword(password),
            role: 'student',
            phone: phone?.trim(),
            birthDate: birthDate
        })

        // Gerar token JWT
        const token = generateToken(newUser.id)

        // Simular envio de email de boas-vindas
        console.log(`Email de boas-vindas enviado para: ${email}`)

        return NextResponse.json({
            success: true,
            message: 'Conta criada com sucesso!',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            token
        })

    } catch (error) {
        console.error('Erro no registro:', error)

        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
        const errorStack = error instanceof Error ? error.stack : undefined

        console.error('Stack trace:', errorStack)
        console.error('Error details:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: errorMessage
        })

        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor',
            details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        }, { status: 500 })
    }
}
