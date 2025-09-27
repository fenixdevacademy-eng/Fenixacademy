import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('fenix-jwt-token')?.value
        const userCookie = cookieStore.get('fenix-user')?.value

        if (!token || !userCookie) {
            return NextResponse.json(
                { error: 'Não autenticado' },
                { status: 401 }
            )
        }

        try {
            const user = JSON.parse(userCookie)
            return NextResponse.json({
                success: true,
                user,
                authenticated: true
            })
        } catch (error) {
            return NextResponse.json(
                { error: 'Token inválido' },
                { status: 401 }
            )
        }
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}










