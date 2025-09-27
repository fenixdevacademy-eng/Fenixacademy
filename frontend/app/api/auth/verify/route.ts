import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '@/lib/auth/middleware-db';

export async function GET(request: NextRequest) {
    try {
        // Autenticar usuário
        const { user, error } = await authenticateToken(request);

        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Token inválido ou expirado' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Erro na verificação de token:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    try {
        // Autenticar usuário
        const { user, error } = await authenticateToken(request);

        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Token inválido ou expirado' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Erro na verificação de token:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}
