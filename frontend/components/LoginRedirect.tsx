'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, LogIn } from 'lucide-react';

interface LoginRedirectProps {
    message?: string;
    showLoginButton?: boolean;
}

export default function LoginRedirect({
    message = "Você precisa fazer login para acessar esta página.",
    showLoginButton = true
}: LoginRedirectProps) {
    const router = useRouter();

    useEffect(() => {
        // Redirecionar automaticamente após 3 segundos
        const timer = setTimeout(() => {
            router.replace('/login');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-orange-900 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">
                    Acesso Restrito
                </h2>

                <p className="text-gray-300 mb-6">
                    {message}
                </p>

                <p className="text-sm text-gray-400 mb-6">
                    Você será redirecionado automaticamente em alguns segundos...
                </p>

                {showLoginButton && (
                    <Link
                        href="/login"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg"
                    >
                        <LogIn className="w-5 h-5" />
                        <span>Fazer Login</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
