import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

// Função para verificar token JWT simples
function verifyToken(token: string): number | null {
    if (!token.startsWith('fenix-jwt-token-')) {
        return null
    }

    const parts = token.split('-')
    if (parts.length < 4) {
        return null
    }

    const userId = parseInt(parts[2])
    return isNaN(userId) ? null : userId
}

// Middleware de autenticação para banco de dados
export async function authenticateToken(request: NextRequest) {
    try {
        // Obter token do header Authorization
        const authHeader = request.headers.get('authorization')
        const token = authHeader?.replace('Bearer ', '')

        if (!token) {
            return {
                user: null,
                error: 'Token não fornecido'
            }
        }

        // Verificar token
        const userId = verifyToken(token)

        if (!userId) {
            return {
                user: null,
                error: 'Token inválido'
            }
        }

        // Buscar usuário no banco de dados
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if (!user) {
            return {
                user: null,
                error: 'Usuário não encontrado'
            }
        }

        return {
            user,
            error: null
        }

    } catch (error) {
        console.error('Erro na autenticação:', error)
        return {
            user: null,
            error: 'Erro interno do servidor'
        }
    }
}

// Função para verificar se o usuário é admin
export async function isAdmin(request: NextRequest): Promise<boolean> {
    const { user } = await authenticateToken(request)
    return user?.role === 'admin'
}

// Função para verificar se o usuário é instrutor ou admin
export async function isInstructorOrAdmin(request: NextRequest): Promise<boolean> {
    const { user } = await authenticateToken(request)
    return user?.role === 'instructor' || user?.role === 'admin'
}

// Função para obter ID do usuário autenticado
export async function getUserId(request: NextRequest): Promise<number | null> {
    const { user } = await authenticateToken(request)
    return user?.id || null
}


