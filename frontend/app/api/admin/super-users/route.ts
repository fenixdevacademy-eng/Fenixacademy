'use client';

import { NextRequest, NextResponse } from 'next/server'
import { requireSuperAdmin } from '@/lib/auth/admin-middleware'
import fs from 'fs'
import path from 'path'

// GET - Listar super usuários
export async function GET(req: NextRequest) {
    return requireSuperAdmin(async (req: NextRequest) => {
        try {
            const superUsersPath = path.join('/app', 'lib', 'auth', 'super-users.json')

            if (!fs.existsSync(superUsersPath)) {
                return NextResponse.json({ superUsers: [] })
            }

            const superUsersData = fs.readFileSync(superUsersPath, 'utf8')
            const superUsers = JSON.parse(superUsersData)

            // Remover senhas da resposta
            const safeUsers = superUsers.map((user: any) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                position: user.position,
                permissions: user.permissions,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }))

            return NextResponse.json({ superUsers: safeUsers })
        } catch (error) {
            console.error('Erro ao listar super usuários:', error)
            return NextResponse.json(
                { error: 'Erro interno do servidor' },
                { status: 500 }
            )
        }
    })(req)
}

// POST - Criar novo super usuário
export async function POST(req: NextRequest) {
    return requireSuperAdmin(async (req: NextRequest) => {
        try {
            const { name, email, password, position } = await req.json()

            if (!name || !email || !password || !position) {
                return NextResponse.json(
                    { error: 'Todos os campos são obrigatórios' },
                    { status: 400 }
                )
            }

            const superUsersPath = path.join('/app', 'lib', 'auth', 'super-users.json')

            let superUsers = []
            if (fs.existsSync(superUsersPath)) {
                const superUsersData = fs.readFileSync(superUsersPath, 'utf8')
                superUsers = JSON.parse(superUsersData)
            }

            // Verificar se email já existe
            if (superUsers.find((user: any) => user.email === email)) {
                return NextResponse.json(
                    { error: 'Este email já está em uso' },
                    { status: 409 }
                )
            }

            const newSuperUser = {
                id: `super-${Date.now()}`,
                name,
                email,
                password,
                role: 'super_admin',
                position,
                permissions: ['all'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            superUsers.push(newSuperUser)
            fs.writeFileSync(superUsersPath, JSON.stringify(superUsers, null, 2))

            // Retornar usuário sem senha
            const { password: _, ...safeUser } = newSuperUser

            return NextResponse.json({
                success: true,
                user: safeUser,
                message: 'Super usuário criado com sucesso!'
            })
        } catch (error) {
            console.error('Erro ao criar super usuário:', error)
            return NextResponse.json(
                { error: 'Erro interno do servidor' },
                { status: 500 }
            )
        }
    })(req)
}

// PUT - Atualizar super usuário
export async function PUT(req: NextRequest) {
    return requireSuperAdmin(async (req: NextRequest) => {
        try {
            const { id, name, email, position, permissions } = await req.json()

            if (!id) {
                return NextResponse.json(
                    { error: 'ID do usuário é obrigatório' },
                    { status: 400 }
                )
            }

            const superUsersPath = path.join('/app', 'lib', 'auth', 'super-users.json')

            if (!fs.existsSync(superUsersPath)) {
                return NextResponse.json(
                    { error: 'Super usuários não encontrados' },
                    { status: 404 }
                )
            }

            const superUsersData = fs.readFileSync(superUsersPath, 'utf8')
            const superUsers = JSON.parse(superUsersData)

            const userIndex = superUsers.findIndex((user: any) => user.id === id)

            if (userIndex === -1) {
                return NextResponse.json(
                    { error: 'Super usuário não encontrado' },
                    { status: 404 }
                )
            }

            // Atualizar dados
            if (name) superUsers[userIndex].name = name
            if (email) superUsers[userIndex].email = email
            if (position) superUsers[userIndex].position = position
            if (permissions) superUsers[userIndex].permissions = permissions
            superUsers[userIndex].updatedAt = new Date().toISOString()

            fs.writeFileSync(superUsersPath, JSON.stringify(superUsers, null, 2))

            // Retornar usuário atualizado sem senha
            const { password: _, ...safeUser } = superUsers[userIndex]

            return NextResponse.json({
                success: true,
                user: safeUser,
                message: 'Super usuário atualizado com sucesso!'
            })
        } catch (error) {
            console.error('Erro ao atualizar super usuário:', error)
            return NextResponse.json(
                { error: 'Erro interno do servidor' },
                { status: 500 }
            )
        }
    })(req)
}

// DELETE - Remover super usuário
export async function DELETE(req: NextRequest) {
    return requireSuperAdmin(async (req: NextRequest) => {
        try {
            const { searchParams } = new URL(req.url)
            const id = searchParams.get('id')

            if (!id) {
                return NextResponse.json(
                    { error: 'ID do usuário é obrigatório' },
                    { status: 400 }
                )
            }

            const superUsersPath = path.join('/app', 'lib', 'auth', 'super-users.json')

            if (!fs.existsSync(superUsersPath)) {
                return NextResponse.json(
                    { error: 'Super usuários não encontrados' },
                    { status: 404 }
                )
            }

            const superUsersData = fs.readFileSync(superUsersPath, 'utf8')
            const superUsers = JSON.parse(superUsersData)

            const userIndex = superUsers.findIndex((user: any) => user.id === id)

            if (userIndex === -1) {
                return NextResponse.json(
                    { error: 'Super usuário não encontrado' },
                    { status: 404 }
                )
            }

            // Não permitir deletar a si mesmo
            const currentUser = JSON.parse(req.cookies.get('fenix-user')?.value || '{}')
            if (id === currentUser.id) {
                return NextResponse.json(
                    { error: 'Você não pode deletar sua própria conta' },
                    { status: 400 }
                )
            }

            superUsers.splice(userIndex, 1)
            fs.writeFileSync(superUsersPath, JSON.stringify(superUsers, null, 2))

            return NextResponse.json({
                success: true,
                message: 'Super usuário removido com sucesso!'
            })
        } catch (error) {
            console.error('Erro ao remover super usuário:', error)
            return NextResponse.json(
                { error: 'Erro interno do servidor' },
                { status: 500 }
            )
        }
    })(req)
}










