import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './jwt';
import { prisma } from '../prisma';

export interface AuthenticatedRequest extends NextRequest {
    user?: {
        id: number;
        email: string;
        role: string;
    }
}

export async function authenticateToken(request: NextRequest): Promise<{ user: any; error?: string }> {
    try {
        const authHeader = request.headers.get('authorization');
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        console.log('🔍 Verificando autenticação:', { hasAuthHeader: !!authHeader, hasToken: !!token });

        if (!token) {
            console.log('❌ Token não fornecido');
            return { user: null, error: 'Token de acesso necessário' }
        }

        const decoded = verifyToken(token);
        console.log('🔐 Token decodificado:', decoded ? { userId: decoded.userId, email: decoded.email } : 'Inválido');

        if (!decoded) {
            console.log('❌ Token inválido');
            return { user: null, error: 'Token inválido' }
        }

        // Buscar usuário no banco de dados
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true}
        });

        console.log('👤 Usuário encontrado no banco:', user ? { id: user.id, email: user.email, name: user.name } : 'Não encontrado');

        if (!user) {
            console.log('❌ Usuário não encontrado no banco para ID:', decoded.userId);
            return { user: null, error: 'Usuário não encontrado' }
        }

        console.log('✅ Autenticação bem-sucedida para:', user.email);
        return { user }
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return { user: null, error: 'Erro na autenticação' }
    }
}

export function requireAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
        const { user, error } = await authenticateToken(req);

        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Não autorizado' },
                { status: 401 }
            );
        }

        (req as AuthenticatedRequest).user = user;
        return handler(req as AuthenticatedRequest);
    }
}

export function requireRole(roles: string[]) {
    return function (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
        return async (req: NextRequest) => {
            const { user, error } = await authenticateToken(req);

            if (error || !user) {
                return NextResponse.json(
                    { success: false, error: error || 'Não autorizado' },
                    { status: 401 }
                );
            }

            if (!roles.includes(user.role)) {
                return NextResponse.json(
                    { success: false, error: 'Acesso negado' },
                    { status: 403 }
                );
            }

            (req as AuthenticatedRequest).user = user;
            return handler(req as AuthenticatedRequest);
        }
    }
}
