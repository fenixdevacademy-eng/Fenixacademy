import { NextRequest, NextResponse } from 'next/server'
import {
    validateCredentials,
    generateToken,
    updateUser
} from '@/lib/auth-storage'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password } = body

        console.log('Tentativa de login:', { email })

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

        // Validar credenciais
        const user = validateCredentials(email, password)

        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'Email ou senha incorretos'
            }, { status: 401 })
        }

        // Atualizar último login
        updateUser(user.id, { updatedAt: new Date() })

        // Gerar token JWT
        const token = generateToken(user.id)

        // Log de login
        console.log(`Login realizado: ${user.name} (${user.email})`)

        return NextResponse.json({
            success: true,
            message: 'Login realizado com sucesso!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.error('Erro no login:', error)
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 })
    }
}
