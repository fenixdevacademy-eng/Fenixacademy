import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers, clearUsers } from '@/lib/auth-storage'

export async function GET(request: NextRequest) {
    try {
        const users = getAllUsers()

        // Remover senhas dos dados retornados
        const safeUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            birthDate: user.birthDate,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }))

        return NextResponse.json({
            success: true,
            count: users.length,
            users: safeUsers
        })

    } catch (error) {
        console.error('Erro ao buscar usuários:', error)
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        clearUsers()

        return NextResponse.json({
            success: true,
            message: 'Usuários limpos com sucesso'
        })

    } catch (error) {
        console.error('Erro ao limpar usuários:', error)
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 })
    }
}
