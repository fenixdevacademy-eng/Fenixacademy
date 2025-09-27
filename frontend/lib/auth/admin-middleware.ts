import { NextRequest, NextResponse } from 'next/server'

export function requireSuperAdmin(handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
        try {
            // Verificar se o usuário está autenticado
            const userCookie = req.cookies.get('fenix-user')?.value

            if (!userCookie) {
                return NextResponse.redirect(new URL('/auth/login', req.url))
            }

            const user = JSON.parse(userCookie)

            // Verificar se é super admin
            if (user.role !== 'super_admin') {
                return NextResponse.json(
                    { error: 'Acesso negado. Apenas super administradores podem acessar esta área.' },
                    { status: 403 }
                )
            }

            // Adicionar dados do usuário ao request
            ; (req as any).user = user

            return handler(req)
        } catch (error) {
            console.error('Erro no middleware de admin:', error)
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }
}

export function requireAdmin(handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
        try {
            const userCookie = req.cookies.get('fenix-user')?.value

            if (!userCookie) {
                return NextResponse.redirect(new URL('/auth/login', req.url))
            }

            const user = JSON.parse(userCookie)

            // Verificar se é admin ou super admin
            if (!['admin', 'super_admin'].includes(user.role)) {
                return NextResponse.json(
                    { error: 'Acesso negado. Apenas administradores podem acessar esta área.' },
                    { status: 403 }
                )
            }

            ; (req as any).user = user
            return handler(req)
        } catch (error) {
            console.error('Erro no middleware de admin:', error)
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }
}








