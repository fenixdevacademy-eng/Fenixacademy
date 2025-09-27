'use client';

import { useState, useEffect } from 'react';
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
    className?: string;
}

export default function AuthGuard({
    children,
    fallback,
    requireAuth = true,
    redirectTo = '/login',
    className = ''
}: AuthGuardProps) {
    const { user, isAuthenticated } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // If we don't require auth, just show children
        if (!requireAuth) {
            setIsChecking(false);
            return;
        }

        // If auth context is still loading, wait
        if (!user && !isAuthenticated) {
            return;
        }

        // If we require auth but user is not authenticated, redirect
        if (requireAuth && !isAuthenticated) {
            const currentPath = window.location.pathname;
            const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
            window.location.href = redirectUrl;
            return;
        }

        setIsChecking(false);
    }, [isAuthenticated, user, requireAuth, redirectTo]);

    // Show loading state
    if (isChecking) {
        return (
            <div className={`flex items-center justify-center min-h-64 ${className}`}>
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Verificando autenticação...</p>
                </div>
            </div>
        );
    }

    // If we don't require auth, show children
    if (!requireAuth) {
        return <>{children}</>;
    }

    // If not authenticated and we require auth, show fallback or default
    if (!isAuthenticated) {
        if (fallback) {
            return <>{fallback}</>;
        }

        return (
            <div className={`flex items-center justify-center min-h-64 ${className}`}>
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-gray-400" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Acesso Restrito
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Você precisa estar logado para acessar esta página.
                    </p>

                    <div className="space-y-3">
                        <Link
                            href={redirectTo}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                        >
                            <User className="w-4 h-4" />
                            Fazer Login
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <div className="text-sm text-gray-500">
                            <p>Não tem uma conta?</p>
                            <Link
                                href="/register"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Criar conta gratuita
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // If authenticated, show children
    return <>{children}</>;
}