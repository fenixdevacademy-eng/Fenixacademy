'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import { useRouter } from 'next/navigation'

export default function AdminPanel() {
    const { user, isAuthenticated, isLoading } = useAuth()
    const router = useRouter()
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        totalRevenue: 0,
        activeUsers: 0
    })

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || user?.role !== 'super_admin')) {
            router.push('/auth/login')
        }
    }, [isAuthenticated, user, isLoading, router])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Carregando...</div>
            </div>
        )
    }

    if (!isAuthenticated || user?.role !== 'super_admin') {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">
                        🚀 Painel Administrativo Fenix
                    </h1>
                    <p className="text-blue-100">
                        Bem-vindo, {user?.name}! ({user?.position})
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-500 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-400">Total de Usuários</p>
                                <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-500 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-400">Cursos Disponíveis</p>
                                <p className="text-2xl font-bold text-white">{stats.totalCourses}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-500 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-400">Receita Total</p>
                                <p className="text-2xl font-bold text-white">R$ {stats.totalRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-500 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-400">Usuários Ativos</p>
                                <p className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-bold mb-4 text-white">Ações Rápidas</h3>
                        <div className="space-y-3">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                👥 Gerenciar Usuários
                            </button>
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                📚 Gerenciar Cursos
                            </button>
                            <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                💰 Relatórios Financeiros
                            </button>
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                ⚙️ Configurações do Sistema
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-xl font-bold mb-4 text-white">Informações do Sistema</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Versão:</span>
                                <span className="text-white">1.0.0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Última Atualização:</span>
                                <span className="text-white">{new Date().toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <span className="text-green-400">🟢 Online</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Permissões:</span>
                                <span className="text-white">Super Admin</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4 text-white">Atividade Recente</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <div>
                                <p className="text-white text-sm">Sistema iniciado com sucesso</p>
                                <p className="text-gray-400 text-xs">Há 2 minutos</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <div>
                                <p className="text-white text-sm">Super usuários configurados</p>
                                <p className="text-gray-400 text-xs">Há 5 minutos</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <div>
                                <p className="text-white text-sm">Cache limpo e sistema otimizado</p>
                                <p className="text-gray-400 text-xs">Há 10 minutos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}








