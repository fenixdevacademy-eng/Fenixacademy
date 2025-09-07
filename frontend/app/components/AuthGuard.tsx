'use client';

import { useState, useEffect } from 'react';
import { Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simular verificação de autenticação
        const checkAuth = () => {
            // Em produção, isso seria verificado com JWT ou session
            const token = localStorage.getItem('auth_token') ||
                sessionStorage.getItem('auth_token') ||
                document.cookie.includes('auth_token');

            setIsAuthenticated(!!token);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verificando autenticação...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        if (fallback) {
            return <>{fallback}</>;
        }

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <Lock className="h-6 w-6 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Acesso Restrito
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Você precisa estar logado para acessar esta página.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="space-y-4">
                            <div className="text-center">
                                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Faça login para continuar
                                </h3>
                                <p className="text-gray-600 text-sm mb-6">
                                    Acesse sua conta para visualizar este conteúdo
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Link
                                    href="/auth/login"
                                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                >
                                    Fazer Login
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>

                                <Link
                                    href="/auth/register"
                                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                >
                                    Criar Conta
                                </Link>
                            </div>

                            <div className="text-center">
                                <Link
                                    href="/"
                                    className="text-sm text-blue-600 hover:text-blue-500"
                                >
                                    ← Voltar para página inicial
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
} 