import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        // Validação básica
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email e senha são obrigatórios' },
                { status: 400 }
            )
        }

        // Carregar super usuários
        let superUsers = [];
        try {
            const superUsersPath = path.join(process.cwd(), 'lib', 'auth', 'super-users.json');
            const superUsersData = fs.readFileSync(superUsersPath, 'utf8');
            superUsers = JSON.parse(superUsersData);
        } catch (error) {
            console.log('Super usuários não encontrados, continuando com usuários padrão');
        }

        // Verificar se é super usuário
        const superUser = superUsers.find(user => user.email === email && user.password === password);

        // Simulação de autenticação (em produção, usar banco de dados real)
        if (superUser) {
            // Usuário é super admin
            const user = {
                id: superUser.id,
                name: superUser.name,
                email: superUser.email,
                role: superUser.role,
                position: superUser.position,
                permissions: superUser.permissions,
                createdAt: superUser.createdAt,
                updatedAt: superUser.updatedAt
            };

            // Simular token JWT (em produção, usar biblioteca real)
            const token = 'super-admin-jwt-token-' + Date.now()
            const refreshToken = 'super-admin-refresh-token-' + Date.now()

            // Configurar cookies
            const cookieStore = await cookies()
            cookieStore.set('fenix-jwt-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 dias
                path: '/'
            })

            cookieStore.set('fenix-refresh-token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 dias
                path: '/'
            })

            cookieStore.set('fenix-user', JSON.stringify(user), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 dias
                path: '/'
            })

            return NextResponse.json({
                success: true,
                user,
                token,
                message: `Bem-vindo, ${user.name}! Acesso de ${user.position} concedido.`
            })
        } else if (email === 'test@example.com' && password === 'password') {
            // Simular dados do usuário normal
            const user = {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
                role: 'student',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Simular token JWT (em produção, usar biblioteca real)
            const token = 'mock-jwt-token-' + Date.now()
            const refreshToken = 'mock-refresh-token-' + Date.now()

            // Configurar cookies
            const cookieStore = await cookies()
            cookieStore.set('fenix-jwt-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 dias
                path: '/'
            })

            cookieStore.set('fenix-refresh-token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 dias
                path: '/'
            })

            cookieStore.set('fenix-user', JSON.stringify(user), {
                httpOnly: false, // Permitir acesso no cliente
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 dias
                path: '/'
            })

            return NextResponse.json({
                success: true,
                user,
                message: 'Login realizado com sucesso!'
            })
        } else {
            return NextResponse.json(
                { error: 'Credenciais inválidas' },
                { status: 401 }
            )
        }
    } catch (error) {
        console.error('Erro no login:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}







