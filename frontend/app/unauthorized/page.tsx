'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UnauthorizedPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full text-center">
                <div className="mx-auto h-24 w-24 text-red-500 mb-6">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">401</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Acesso Negado</h2>
                <p className="text-gray-600 mb-8">
                    Você não tem permissão para acessar esta página.
                    Verifique se você tem as credenciais necessárias ou entre em contato com o administrador.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => router.back()}
                        className="w-full px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                        ← Voltar
                    </button>

                    <Link
                        href="/dashboard"
                        className="block w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        🏠 Ir para Dashboard
                    </Link>

                    <Link
                        href="/auth/login"
                        className="block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        🔐 Fazer Login
                    </Link>
                </div>

                <div className="mt-8 text-sm text-gray-500">
                    <p>Se você acredita que isso é um erro, entre em contato conosco:</p>
                    <a
                        href="mailto:suporte@fenixdevacademy.com"
                        className="text-blue-600 hover:text-blue-500"
                    >
                        suporte@fenixdevacademy.com
                    </a>
                </div>
            </div>
        </div>
    )
}





