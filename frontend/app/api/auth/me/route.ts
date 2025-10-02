import { NextRequest, NextResponse } from 'next/server'
import { authStorage } from '@/lib/auth-storage'

export async function GET(request: NextRequest) {
    try {
        // Verificar token no header Authorization
        const authHeader = request.headers.get('authorization')
        const token = authHeader?.replace('Bearer ', '') || request.headers.get('x-auth-token')

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Token não fornecido',
                    authenticated: false
                },
                { status: 401 }
            )
        }

        // Verificar token usando o sistema unificado
        const user = authStorage.verifyToken(token)

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Token inválido ou expirado',
                    authenticated: false
                },
                { status: 401 }
            )
        }

        // Retornar dados do usuário
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }

        return NextResponse.json({
            success: true,
            user: userData,
            authenticated: true
        })

    } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor',
                authenticated: false
            },
            { status: 500 }
        )
    }
}










