'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'

interface AuthGuardProps {
    children: React.ReactNode
    requireAuth?: boolean
    redirectTo?: string
    allowedRoles?: string[]
}

export default function AuthGuard({
    children,
    requireAuth = true,
    redirectTo = '/auth/login',
    allowedRoles = []
}: AuthGuardProps) {
    const { user, isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isLoading) return // Aguardar carregamento

        if (requireAuth && !isAuthenticated) {
            // Usuário não autenticado, redirecionar para login
            router.push(redirectTo)
            return
        }

        if (requireAuth && isAuthenticated && allowedRoles.length > 0) {
            // Verificar se o usuário tem uma das roles permitidas
            if (!user || !allowedRoles.includes(user.role)) {
                // Usuário não tem permissão, redirecionar
                router.push('/unauthorized')
                return
            }
        }
    }, [isAuthenticated, isLoading, user, requireAuth, allowedRoles, redirectTo, router])

    // Mostrar loading enquanto verifica autenticação
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verificando autenticação...</p>
                </div>
            </div>
        )
    }

    // Se não requer autenticação ou usuário está autenticado
    if (!requireAuth || isAuthenticated) {
        // Verificar roles se especificadas
        if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 text-red-500">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-900">Acesso Negado</h2>
                        <p className="mt-2 text-gray-600">Você não tem permissão para acessar esta página.</p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Voltar ao Dashboard
                        </button>
                    </div>
                </div>
            )
        }

        return <>{children}</>
    }

    // Se requer autenticação mas usuário não está autenticado
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecionando para o login...</p>
            </div>
        </div>
    )
}





