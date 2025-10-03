import { NextRequest, NextResponse } from 'next/server'
import { authStorage } from '@/lib/auth-storage'

export async function POST(request: NextRequest) {
    try {
        // Verificar token para invalidar se necessário
        const authHeader = request.headers.get('authorization')
        const token = authHeader?.replace('Bearer ', '') || request.headers.get('x-auth-token')

        if (token) {
            // Verificar se o token é válido antes de fazer logout
            const user = authStorage.verifyToken(token)
            if (user) {
                // Aqui você pode adicionar lógica para invalidar o token no servidor
                // Por enquanto, apenas logamos o logout
                console.log(`Usuário ${user.email} fez logout`)
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Logout realizado com sucesso!'
        })
    } catch (error) {
        console.error('Erro no logout:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        )
    }
}





















