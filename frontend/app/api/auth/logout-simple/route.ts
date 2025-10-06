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

export async function POST(request: NextRequest) {
    try {
        // Obter token do header Authorization
        const authHeader = request.headers.get('authorization')
        const token = authHeader?.replace('Bearer ', '')

        if (token) {
            // Verificar token e obter usuário
            const userId = verifyToken(token)

            if (userId) {
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { name: true, email: true }
                })

                if (user) {
                    // Log de logout
                    console.log(`Logout realizado: ${user.name} (${user.email})`)
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Logout realizado com sucesso!'
        })

    } catch (error) {
        console.error('Erro no logout:', error)
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 })
    }
}
