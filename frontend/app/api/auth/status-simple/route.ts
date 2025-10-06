'use client';

﻿import { NextRequest, NextResponse } from 'next/server'
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

export async function GET(request: NextRequest) {
    try {
        // Obter token do header Authorization
        const authHeader = request.headers.get('authorization')
        const token = authHeader?.replace('Bearer ', '')

        if (!token) {
            return NextResponse.json({
                success: false,
                authenticated: false,
                error: 'Token não fornecido'
            }, { status: 401 })
        }

        // Verificar token
        const userId = verifyToken(token)

        if (!userId) {
            return NextResponse.json({
                success: false,
                authenticated: false,
                error: 'Token inválido'
            }, { status: 401 })
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
            return NextResponse.json({
                success: false,
                authenticated: false,
                error: 'Usuário não encontrado'
            }, { status: 404 })
        }

        // Retornar dados do usuário
        return NextResponse.json({
            success: true,
            authenticated: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                lastLogin: user.updatedAt
            }
        })

    } catch (error) {
        console.error('Erro na verificação de status:', error)
        return NextResponse.json({
            success: false,
            authenticated: false,
            error: 'Erro interno do servidor'
        }, { status: 500 })
    }
}
