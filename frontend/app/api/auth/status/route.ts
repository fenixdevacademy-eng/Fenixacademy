import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Simular verificação de autenticação
        // Em produção, isso verificaria o token JWT
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        // Simular token válido
        const isValidToken = token && token.startsWith('fenix-jwt-token-');

        if (!isValidToken) {
            return NextResponse.json({
                success: false,
                authenticated: false,
                error: 'Token não fornecido ou inválido'
            }, { status: 401 });
        }

        // Buscar dados reais do usuário do banco de dados
        const { prisma } = await import('@/lib/prisma');

        // Extrair ID do usuário do token (em produção, isso seria decodificado do JWT)
        const userId = token.replace('fenix-jwt-token-', '');

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                authenticated: false,
                error: 'Usuário não encontrado'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            authenticated: true,
            user: user,
            message: 'Usuário autenticado com sucesso'
        });

    } catch (error) {
        console.error('Erro na verificação de status de autenticação:', error);
        return NextResponse.json({
            success: false,
            authenticated: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}



