'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import Link from 'next/link'

interface DashboardStats {
    totalCourses: number
    completedCourses: number
    inProgressCourses: number
    totalHours: number
    certificates: number
    streak: number
}

interface RecentActivity {
    id: string
    type: 'course' | 'quiz' | 'certificate' | 'login'
    title: string
    description: string
    timestamp: string
    status: 'completed' | 'in_progress' | 'pending'
}

interface Course {
    id: string
    title: string
    description: string
    progress: number
    duration: string
    level: 'beginner' | 'intermediate' | 'advanced'
    thumbnail: string
    lastAccessed: string
}

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isNewUser, setIsNewUser] = useState(false)

    const { user, isAuthenticated, logout } = useAuth()
    const router = useRouter()

    // Redirecionar se não estiver logado
    useEffect(() => {
        if (!isAuthenticated) {
            console.log('🔄 Usuário não autenticado, redirecionando para login')
            router.replace('/auth/login')
        }
    }, [isAuthenticated, router])

    // Carregar dados do dashboard
    useEffect(() => {
        if (isAuthenticated) {
            loadDashboardData()
        }
    }, [isAuthenticated])

    const loadDashboardData = async () => {
        setIsLoading(true)
        setError('')
        try {
            const token = localStorage.getItem('fenix-jwt-token')
            if (!token) throw new Error('Token não encontrado')

            const response = await fetch('http://localhost:3002/api/user/dashboard', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json()

            if (result.success) {
                const data = result.data

                // Verificar se o usuário é novo (sem cursos iniciados)
                const hasStartedCourses = data.courses && data.courses.some((course: any) => course.progress > 0)
                const hasActivity = data.recent_activity && data.recent_activity.length > 0
                const isNewUser = !hasStartedCourses && !hasActivity

                setIsNewUser(isNewUser)

                if (isNewUser) {
                    // Dashboard zerado para novos usuários
                    const zeroStats: DashboardStats = {
                        totalCourses: 0,
                        completedCourses: 0,
                        inProgressCourses: 0,
                        totalHours: 0,
                        certificates: 0,
                        streak: 0
                    }

                    const welcomeActivity: RecentActivity[] = [{
                        id: 'welcome',
                        type: 'login',
                        title: 'Bem-vindo à Fênix!',
                        description: 'Sua jornada de aprendizado está prestes a começar',
                        timestamp: new Date().toISOString(),
                        status: 'completed'
                    }]

                    setStats(zeroStats)
                    setRecentActivity(welcomeActivity)
                    setCourses([])

                    console.log('🆕 Usuário novo detectado - Dashboard zerado')
                } else {
                    // Dashboard normal para usuários existentes
                    const apiStats: DashboardStats = {
                        totalCourses: data.stats.total_courses,
                        completedCourses: data.stats.completed_courses,
                        inProgressCourses: data.stats.in_progress_courses,
                        totalHours: data.stats.total_hours,
                        certificates: data.stats.certificates,
                        streak: data.stats.streak
                    }

                    const apiActivity: RecentActivity[] = data.recent_activity.map((activity: any) => ({
                        id: activity.id,
                        type: activity.type,
                        title: activity.title,
                        description: activity.description,
                        timestamp: activity.timestamp,
                        status: activity.status
                    }))

                    const apiCourses: Course[] = data.courses.map((course: any) => ({
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        progress: course.progress,
                        duration: course.duration,
                        level: course.level,
                        thumbnail: course.thumbnail,
                        lastAccessed: course.last_accessed
                    }))

                    setStats(apiStats)
                    setRecentActivity(apiActivity)
                    setCourses(apiCourses)

                    console.log('✅ Dados do dashboard carregados com sucesso:', data)
                }
            } else {
                throw new Error(result.message || 'Erro ao carregar dados')
            }
        } catch (err) {
            console.error('❌ Erro ao carregar dashboard:', err)
            setError('Erro ao carregar dados do dashboard')
        } finally {
            setIsLoading(false)
        }
    }

    const getActivityIcon = (type: string) => {
        const icons: { [key: string]: string } = {
            'course': '📚',
            'quiz': '🧠',
            'certificate': '🏆',
            'login': '🔐'
        }
        return icons[type] || '📄'
    }

    const getActivityColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'completed': 'text-green-400 bg-green-500/20 border-green-500/30',
            'in_progress': 'text-blue-400 bg-blue-500/20 border-blue-500/30',
            'pending': 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
        }
        return colors[status] || 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }

    const getLevelColor = (level: string) => {
        const colors: { [key: string]: string } = {
            'beginner': 'bg-green-500/20 text-green-300 border-green-500/30',
            'intermediate': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
            'advanced': 'bg-red-500/20 text-red-300 border-red-500/30'
        }
        return colors[level] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-blue-200">Redirecionando para o login...</p>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-blue-200">Carregando dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            {/* Header */}
            <div className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white">
                                            Olá, {user?.name}! 👋
                                        </h1>
                                        <p className="text-blue-200">Bem-vindo ao seu dashboard</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white text-lg font-bold">
                                        {user?.name?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-white">
                                        {user?.name || 'Usuário'}
                                    </p>
                                    <p className="text-xs text-blue-200 capitalize">
                                        {user?.access_level || 'user'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white px-4 py-2 rounded-xl text-sm font-medium border border-red-500/30 hover:border-red-500/50 transition-all duration-200 backdrop-blur-sm"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
                        {error}
                    </div>
                )}

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200 shadow-xl">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white text-xl">📚</span>
                                    </div>
                                </div>
                                <div className="ml-4 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-blue-200 truncate">Total de Cursos</dt>
                                        <dd className="text-2xl font-bold text-white">{stats?.totalCourses || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200 shadow-xl">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white text-xl">✅</span>
                                    </div>
                                </div>
                                <div className="ml-4 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-green-200 truncate">Concluídos</dt>
                                        <dd className="text-2xl font-bold text-white">{stats?.completedCourses || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200 shadow-xl">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white text-xl">⏳</span>
                                    </div>
                                </div>
                                <div className="ml-4 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-yellow-200 truncate">Em Progresso</dt>
                                        <dd className="text-2xl font-bold text-white">{stats?.inProgressCourses || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200 shadow-xl">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white text-xl">🏆</span>
                                    </div>
                                </div>
                                <div className="ml-4 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-purple-200 truncate">Certificados</dt>
                                        <dd className="text-2xl font-bold text-white">{stats?.certificates || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cursos Recentes */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                            <div className="px-6 py-4 border-b border-white/20">
                                <h2 className="text-xl font-bold text-white">Meus Cursos</h2>
                                <p className="text-blue-200 text-sm">
                                    {isNewUser ? 'Sua jornada começa aqui' : 'Continue de onde parou'}
                                </p>
                            </div>
                            <div className="divide-y divide-white/10">
                                {isNewUser ? (
                                    // Estado para novos usuários
                                    <div className="p-8 text-center">
                                        <div className="mb-6">
                                            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                                <span className="text-4xl">🚀</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Bem-vindo à Fênix!</h3>
                                            <p className="text-blue-200 text-lg mb-4">
                                                Sua jornada de aprendizado está prestes a começar
                                            </p>
                                            <p className="text-blue-300 text-sm mb-6">
                                                Explore nossos cursos e comece a construir seu futuro na programação
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <Link
                                                href="/cursos"
                                                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                            >
                                                🎯 Explorar Cursos
                                            </Link>
                                            <div className="text-center">
                                                <Link
                                                    href="/ide-advanced"
                                                    className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-white/30"
                                                >
                                                    💻 Experimentar IDE Fênix
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                            <div className="bg-white/5 rounded-lg p-4">
                                                <div className="text-2xl mb-2">📚</div>
                                                <div className="text-white font-semibold">60+ Cursos</div>
                                                <div className="text-blue-300 text-sm">Linguagens e tecnologias</div>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4">
                                                <div className="text-2xl mb-2">🏆</div>
                                                <div className="text-white font-semibold">Certificados</div>
                                                <div className="text-blue-300 text-sm">Reconhecimento internacional</div>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4">
                                                <div className="text-2xl mb-2">💻</div>
                                                <div className="text-white font-semibold">IDE Integrada</div>
                                                <div className="text-blue-300 text-sm">Pratique enquanto aprende</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Estado normal para usuários existentes
                                    courses.map((course) => (
                                        <div key={course.id} className="p-6 hover:bg-white/5 transition-all duration-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}>
                                                            {course.level}
                                                        </span>
                                                    </div>
                                                    <p className="text-blue-200 text-sm mb-3">{course.description}</p>
                                                    <div className="flex items-center text-sm text-blue-300 mb-3">
                                                        <span className="flex items-center">
                                                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {course.duration}
                                                        </span>
                                                        <span className="mx-3">•</span>
                                                        <span>Último acesso: {new Date(course.lastAccessed).toLocaleDateString('pt-BR')}</span>
                                                    </div>
                                                    <div className="mb-4">
                                                        <div className="flex items-center justify-between text-sm mb-2">
                                                            <span className="text-blue-200">Progresso</span>
                                                            <span className="text-white font-semibold">{course.progress}%</span>
                                                        </div>
                                                        <div className="w-full bg-white/20 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 shadow-lg"
                                                                style={{ width: `${course.progress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-3">
                                                <Link
                                                    href={`/course/${course.id}`}
                                                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
                                                >
                                                    {course.progress === 100 ? 'Revisar' : 'Continuar'}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Atividade Recente */}
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                            <div className="px-6 py-4 border-b border-white/20">
                                <h2 className="text-xl font-bold text-white">Atividade Recente</h2>
                                <p className="text-blue-200 text-sm">
                                    {isNewUser ? 'Sua jornada começa aqui' : 'Suas últimas ações'}
                                </p>
                            </div>
                            <div className="divide-y divide-white/10">
                                {isNewUser ? (
                                    // Mensagens motivacionais para novos usuários
                                    <div className="p-6 space-y-4">
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <span className="text-2xl">🎯</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Primeiros Passos</h3>
                                            <p className="text-blue-200 text-sm">
                                                Aqui você verá seu progresso conforme for aprendendo
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">📚</span>
                                                    <div>
                                                        <div className="text-white font-medium">Escolha seu primeiro curso</div>
                                                        <div className="text-blue-300 text-sm">Explore nossa biblioteca de cursos</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">💻</span>
                                                    <div>
                                                        <div className="text-white font-medium">Pratique na IDE</div>
                                                        <div className="text-blue-300 text-sm">Use nossa IDE integrada para praticar</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">🏆</span>
                                                    <div>
                                                        <div className="text-white font-medium">Ganhe certificados</div>
                                                        <div className="text-blue-300 text-sm">Complete cursos e ganhe reconhecimento</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Atividade normal para usuários existentes
                                    recentActivity.map((activity) => (
                                        <div key={activity.id} className="p-4 hover:bg-white/5 transition-all duration-200">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="text-sm font-semibold text-white">{activity.title}</h4>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getActivityColor(activity.status)}`}>
                                                            {activity.status === 'completed' ? 'Concluído' :
                                                                activity.status === 'in_progress' ? 'Em Progresso' : 'Pendente'}
                                                        </span>
                                                    </div>
                                                    <p className="text-blue-200 text-sm mb-1">{activity.description}</p>
                                                    <p className="text-blue-300 text-xs">
                                                        {new Date(activity.timestamp).toLocaleDateString('pt-BR')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Ações Rápidas */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                            <div className="px-6 py-4 border-b border-white/20">
                                <h3 className="text-xl font-bold text-white">Ações Rápidas</h3>
                                <p className="text-blue-200 text-sm">
                                    {isNewUser ? 'Comece sua jornada' : 'Navegação rápida'}
                                </p>
                            </div>
                            <div className="p-6 space-y-3">
                                {isNewUser ? (
                                    // Ações específicas para novos usuários
                                    <>
                                        <Link
                                            href="/cursos"
                                            className="block w-full text-left px-4 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm hover:border-white/30 group bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                                        >
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">🚀</span>
                                                <div>
                                                    <p className="font-semibold text-white">Começar Primeiro Curso</p>
                                                    <p className="text-sm text-blue-200">Escolha entre 60+ cursos disponíveis</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/ide-advanced"
                                            className="block w-full text-left px-4 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm hover:border-white/30 group"
                                        >
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">💻</span>
                                                <div>
                                                    <p className="font-semibold text-white">Experimentar IDE</p>
                                                    <p className="text-sm text-blue-200">Pratique programação em tempo real</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/sobre"
                                            className="block w-full text-left px-4 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm hover:border-white/30 group"
                                        >
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">ℹ️</span>
                                                <div>
                                                    <p className="font-semibold text-white">Conhecer a Plataforma</p>
                                                    <p className="text-sm text-blue-200">Saiba mais sobre a Fênix</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                ) : (
                                    // Ações normais para usuários existentes
                                    <>
                                        <Link
                                            href="/courses"
                                            className="block w-full text-left px-4 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm hover:border-white/30 group"
                                        >
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">📚</span>
                                                <div>
                                                    <p className="font-semibold text-white">Explorar Cursos</p>
                                                    <p className="text-sm text-blue-200">Descubra novos cursos</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/certificates"
                                            className="block w-full text-left px-4 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm hover:border-white/30 group"
                                        >
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">🏆</span>
                                                <div>
                                                    <p className="font-semibold text-white">Meus Certificados</p>
                                                    <p className="text-sm text-blue-200">Visualizar conquistas</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profile"
                                            className="block w-full text-left px-4 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm hover:border-white/30 group"
                                        >
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">👤</span>
                                                <div>
                                                    <p className="font-semibold text-white">Meu Perfil</p>
                                                    <p className="text-sm text-blue-200">Gerenciar conta</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}