'use client'

import { useState, useEffect } from 'react'
import { FunctionalButton } from '@/components/FunctionalButton'

interface User {
    id: number
    name: string
    email: string
    role: string
    phone?: string
    birthDate?: string
    createdAt: string
    updatedAt: string
}

export default function TestAuthPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/auth/debug')
            const data = await response.json()

            if (data.success) {
                setUsers(data.users)
                setMessage(`Encontrados ${data.count} usuários registrados`)
            } else {
                setMessage('Erro ao buscar usuários: ' + data.error)
            }
        } catch (error) {
            setMessage('Erro ao conectar com a API: ' + (error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    const testLogin = async () => {
        if (users.length === 0) {
            setMessage('Nenhum usuário registrado para testar login')
            return
        }

        const testUser = users[0]
        setLoading(true)
        setMessage('Testando login...')

        try {
            const response = await fetch('/api/auth/login-simple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: testUser.email,
                    password: '12345678' // Senha padrão para teste
                })
            })

            const data = await response.json()

            if (data.success) {
                setMessage(`✅ Login bem-sucedido! Usuário: ${data.user.name} (${data.user.email})`)
            } else {
                setMessage(`❌ Falha no login: ${data.error}`)
            }
        } catch (error) {
            setMessage('Erro ao testar login: ' + (error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    const clearUsers = async () => {
        setLoading(true)
        try {
            // Como não temos API para limpar, vamos apenas recarregar
            setUsers([])
            setMessage('Lista de usuários limpa (recarregue a página para resetar o servidor)')
        } catch (error) {
            setMessage('Erro ao limpar usuários: ' + (error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🔐 Teste do Sistema de Autenticação
                    </h1>
                    <p className="text-gray-300">
                        Verifique se o login está funcionando corretamente
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Usuários Registrados
                        </h2>
                        <div className="space-y-4">
                            <FunctionalButton
                                onClick={fetchUsers}
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Carregando...' : 'Buscar Usuários'}
                            </FunctionalButton>

                            <FunctionalButton
                                onClick={clearUsers}
                                disabled={loading}
                                variant="secondary"
                                className="w-full"
                            >
                                Limpar Lista
                            </FunctionalButton>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Teste de Login
                        </h2>
                        <div className="space-y-4">
                            <FunctionalButton
                                onClick={testLogin}
                                disabled={loading || users.length === 0}
                                className="w-full"
                            >
                                {loading ? 'Testando...' : 'Testar Login'}
                            </FunctionalButton>

                            <p className="text-sm text-gray-300">
                                {users.length > 0
                                    ? `Testará login com: ${users[0].email}`
                                    : 'Registre um usuário primeiro'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Status
                        </h3>
                        <p className="text-gray-300 whitespace-pre-wrap">
                            {message}
                        </p>
                    </div>
                )}

                {users.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Usuários Encontrados ({users.length})
                        </h3>
                        <div className="space-y-3">
                            {users.map((user) => (
                                <div key={user.id} className="bg-white/5 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-white font-medium">{user.name}</p>
                                            <p className="text-gray-300 text-sm">{user.email}</p>
                                            <p className="text-gray-400 text-xs">
                                                ID: {user.id} | Role: {user.role}
                                            </p>
                                        </div>
                                        <div className="text-right text-xs text-gray-400">
                                            <p>Criado: {new Date(user.createdAt).toLocaleString()}</p>
                                            <p>Atualizado: {new Date(user.updatedAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <FunctionalButton
                        href="/auth/register"
                        className="mr-4"
                    >
                        Ir para Registro
                    </FunctionalButton>
                    <FunctionalButton
                        href="/auth/login"
                        variant="secondary"
                    >
                        Ir para Login
                    </FunctionalButton>
                </div>
            </div>
        </div>
    )
}

