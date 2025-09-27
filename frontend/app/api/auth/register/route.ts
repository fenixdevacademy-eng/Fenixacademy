import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    try {
        const { name, email, password, confirmPassword } = await request.json()

        // Validação básica
        if (!name || !email || !password || !confirmPassword) {
            return NextResponse.json(
                { error: 'Todos os campos são obrigatórios' },
                { status: 400 }
            )
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: 'As senhas não coincidem' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'A senha deve ter pelo menos 6 caracteres' },
                { status: 400 }
            )
        }

        // Simulação de verificação de email existente
        if (email === 'test@example.com') {
            return NextResponse.json(
                { error: 'Este email já está em uso' },
                { status: 409 }
            )
        }

        // Simular criação de usuário
        const user = {
            id: Date.now().toString(),
            name,
            email,
            role: 'student',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()}

        // Simular token JWT
        const token = 'mock-jwt-token-' + Date.now()
        const refreshToken = 'mock-refresh-token-' + Date.now()

        // Configurar cookies
        const cookieStore = await cookies()
        cookieStore.set('fenix-jwt-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 dias
            path: '/'
        })

        cookieStore.set('fenix-refresh-token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            path: '/'
        })

        cookieStore.set('fenix-user', JSON.stringify(user), {
            httpOnly: false, // Permitir acesso no cliente
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 dias
            path: '/'
        })

        return NextResponse.json({
            success: true,
            user,
            message: 'Conta criada com sucesso!'
        })
    } catch (error) {
        console.error('Erro no registro:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}










