'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    BookOpenIcon,
    TrophyIcon,
    ClockIcon,
    UserGroupIcon,
    ChartBarIcon,
    FireIcon,
    StarIcon,
    PlayIcon,
    CheckCircleIcon,
    AcademicCapIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface User {
    id: number
    name: string
    email: string
    role: string
    access_level: string
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Verificar se usuário está logado
        const userData = localStorage.getItem('fenix_user')
        if (userData) {
            setUser(JSON.parse(userData))
        } else {
            router.push('/login')
        }
        setIsLoading(false)
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('fenix_user')
        toast.success('Logout realizado com sucesso!')
        router.push('/')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando dashboard...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="mr-4 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeftIcon className="h-6 w-6" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Olá, {user.name}! 👋
                                </h1>
                                <p className="text-gray-600">
                                    Bem-vindo ao seu dashboard da Fênix Dev Academy
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta!</h2>
                            <p className="text-blue-100 text-lg">
                                Continue sua jornada de aprendizado na Fênix Dev Academy
                            </p>
                            <div className="mt-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20">
                                    {user.role === 'admin' ? 'Administrador' : user.role === 'premium' ? 'Premium' : 'Estudante'}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-bold">{user.name.split(' ')[0]}</div>
                            <div className="text-blue-100">{user.email}</div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <BookOpenIcon className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Cursos Completos</p>
                                <p className="text-2xl font-semibold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <ClockIcon className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Horas Estudadas</p>
                                <p className="text-2xl font-semibold text-gray-900">0h</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <TrophyIcon className="h-8 w-8 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Certificados</p>
                                <p className="text-2xl font-semibold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <StarIcon className="h-8 w-8 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Pontos</p>
                                <p className="text-2xl font-semibold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Link
                        href="/expanded-courses"
                        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center">
                            <BookOpenIcon className="h-8 w-8 text-blue-600 mr-4" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Explorar Cursos</h3>
                                <p className="text-sm text-gray-500">Descubra novos cursos</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/profile"
                        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center">
                            <UserGroupIcon className="h-8 w-8 text-green-600 mr-4" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Meu Perfil</h3>
                                <p className="text-sm text-gray-500">Editar informações</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/certificates"
                        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center">
                            <TrophyIcon className="h-8 w-8 text-yellow-600 mr-4" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Meus Certificados</h3>
                                <p className="text-sm text-gray-500">Visualizar conquistas</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Atividade Recente</h2>
                    </div>
                    <div className="p-6">
                        <div className="text-center py-12">
                            <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma atividade recente</h3>
                            <p className="mt-1 text-sm text-gray-500">Comece explorando nossos cursos disponíveis.</p>
                            <div className="mt-6">
                                <Link
                                    href="/expanded-courses"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Ver Cursos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}