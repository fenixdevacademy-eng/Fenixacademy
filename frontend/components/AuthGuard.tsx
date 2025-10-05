'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import LoadingSpinner from './LoadingSpinner';
import LoginRedirect from './LoginRedirect';

interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Se não estiver carregando e não estiver autenticado, redirecionar para login
        if (!isLoading && !isAuthenticated) {
            console.log('🔒 Usuário não autenticado, redirecionando para login');
            router.replace('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    // Mostrar loading enquanto verifica autenticação
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-orange-900 flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="text-xl text-white mt-4">Verificando autenticação...</p>
                </div>
            </div>
        );
    }

    // Se não estiver autenticado, mostrar fallback ou LoginRedirect
    if (!isAuthenticated || !user) {
        return fallback || <LoginRedirect />;
    }

    // Se estiver autenticado, mostrar o conteúdo
    return <>{children}</>;
}