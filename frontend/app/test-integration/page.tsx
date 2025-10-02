'use client'

import React, { useState } from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import Link from 'next/link'

export default function TestIntegrationPage() {
    const { user, isAuthenticated, login, register, logout } = useAuth()
    const [testResults, setTestResults] = useState<string[]>([])

    const addResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        const timestamp = new Date().toLocaleTimeString()
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'
        setTestResults(prev => [...prev, `[${timestamp}] ${icon} ${message}`])
    }

    const testLogin = async () => {
        addResult('Testando login com admin@fenix.com...', 'info')
        try {
            const result = await login('admin@fenix.com', 'admin123')
            if (result.success) {
                addResult(`Login bem-sucedido! Usuário: ${result.user?.name}`, 'success')
            } else {
                addResult(`Erro no login: ${result.error}`, 'error')
            }
        } catch (error) {
            addResult(`Erro de conexão: ${error}`, 'error')
        }
    }

    const testRegister = async () => {
        addResult('Testando registro de novo usuário...', 'info')
        try {
            const result = await register(
                'Teste Usuário',
                'teste@exemplo.com',
                'teste123',
                'teste123'
            )
            if (result.success) {
                addResult(`Registro bem-sucedido! Usuário: ${result.user?.name}`, 'success')
            } else {
                addResult(`Erro no registro: ${result.error}`, 'error')
            }
        } catch (error) {
            addResult(`Erro de conexão: ${error}`, 'error')
        }
    }

    const testLogout = () => {
        addResult('Testando logout...', 'info')
        logout()
        addResult('Logout realizado com sucesso!', 'success')
    }

    const clearResults = () => {
        setTestResults([])
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">🧪 Teste de Integração - API + Frontend</h1>
                        <p className="text-gray-600">Teste todas as funcionalidades de autenticação integradas</p>
                    </div>

                    <div className="p-6">
                        {/* Status Atual */}
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <h2 className="text-lg font-semibold text-blue-900 mb-2">Status Atual</h2>
                            <div className="space-y-2 text-sm">
                                <p><strong>Autenticado:</strong> {isAuthenticated ? '✅ Sim' : '❌ Não'}</p>
                                {user && (
                                    <>
                                        <p><strong>Usuário:</strong> {user.name}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>Role:</strong> {user.role}</p>
                                        <p><strong>ID:</strong> {user.id}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Botões de Teste */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Testes de Autenticação</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button
                                    onClick={testLogin}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    🔐 Testar Login
                                </button>
                                <button
                                    onClick={testRegister}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    📝 Testar Registro
                                </button>
                                <button
                                    onClick={testLogout}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    🚪 Testar Logout
                                </button>
                            </div>
                        </div>

                        {/* Links para Páginas */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Navegação</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-center"
                                >
                                    🔐 Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-center"
                                >
                                    📝 Registro
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-center"
                                >
                                    📊 Dashboard
                                </Link>
                                <Link
                                    href="/profile"
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-center"
                                >
                                    👤 Profile
                                </Link>
                            </div>
                        </div>

                        {/* Resultados dos Testes */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">Resultados dos Testes</h2>
                                <button
                                    onClick={clearResults}
                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                                >
                                    Limpar
                                </button>
                            </div>
                            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
                                {testResults.length === 0 ? (
                                    <p className="text-gray-500">Nenhum teste executado ainda...</p>
                                ) : (
                                    testResults.map((result, index) => (
                                        <div key={index} className="mb-1">
                                            {result}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Informações da API */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-yellow-800 mb-2">ℹ️ Informações da API</h3>
                            <div className="text-sm text-yellow-700 space-y-1">
                                <p><strong>URL da API:</strong> http://localhost:3002</p>
                                <p><strong>Endpoints:</strong></p>
                                <ul className="ml-4 space-y-1">
                                    <li>• GET /api/health - Verificação de saúde</li>
                                    <li>• POST /api/auth/login - Login de usuários</li>
                                    <li>• POST /api/auth/register - Registro de usuários</li>
                                    <li>• GET /api/auth/verify - Verificação de token</li>
                                </ul>
                                <p><strong>Usuários de Teste:</strong></p>
                                <ul className="ml-4 space-y-1">
                                    <li>• admin@fenix.com / admin123 (Admin)</li>
                                    <li>• user@fenix.com / user123 (Usuário)</li>
                                    <li>• dev@fenix.com / dev123 (Instrutor)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




