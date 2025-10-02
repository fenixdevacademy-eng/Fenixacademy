'use client'

import React, { useState } from 'react'
import { useAuth } from '@/lib/auth/auth-context'

export default function TestSimplePage() {
    const { user, isAuthenticated, isLoading, login, logout } = useAuth()
    const [testResult, setTestResult] = useState('')

    const testLogin = async () => {
        setTestResult('Testando login...')
        try {
            const result = await login('admin@fenix.com', 'admin123')
            if (result.success) {
                setTestResult(`✅ Login bem-sucedido! Usuário: ${result.user?.name}`)
            } else {
                setTestResult(`❌ Erro no login: ${result.error}`)
            }
        } catch (error) {
            setTestResult(`❌ Erro: ${error}`)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        🧪 Teste Simples - Carregamento Infinito
                    </h1>

                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h2 className="text-lg font-semibold text-blue-900 mb-2">Status Atual</h2>
                            <p><strong>Carregando:</strong> {isLoading ? 'Sim' : 'Não'}</p>
                            <p><strong>Autenticado:</strong> {isAuthenticated ? 'Sim' : 'Não'}</p>
                            {user && (
                                <>
                                    <p><strong>Usuário:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Role:</strong> {user.role}</p>
                                </>
                            )}
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={testLogin}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                🔐 Testar Login
                            </button>

                            {isAuthenticated && (
                                <button
                                    onClick={logout}
                                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    🚪 Logout
                                </button>
                            )}
                        </div>

                        {testResult && (
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <h3 className="font-semibold mb-2">Resultado do Teste:</h3>
                                <p className="text-sm">{testResult}</p>
                            </div>
                        )}

                        <div className="text-sm text-gray-600">
                            <p><strong>Se esta página carregar sem ficar em loop infinito, o problema foi resolvido!</strong></p>
                            <p>• O loading deve aparecer brevemente e depois desaparecer</p>
                            <p>• Você deve conseguir fazer login normalmente</p>
                            <p>• O status deve atualizar corretamente</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




