'use client'

import React, { useState, useEffect } from 'react'
import {
    BarChart3,
    TrendingUp,
    Users,
    BookOpen,
    Clock,
    Award,
    Target,
    Zap,
    CheckCircle,
    AlertCircle,
    Play,
    Pause,
    RotateCcw,
    Star,
    Calendar,
    MessageCircle,
    Bell,
    Settings,
    Download,
    Share2,
    Eye,
    Plus,
    ArrowRight,
    Brain,
    Code,
    Database,
    Smartphone,
    Shield
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'

interface UserProfile {
    id: string
    userId: string
    phone?: string
    location?: string
    bio?: string
    avatar?: string
    skills: string[]
    interests: string[]
    joinDate: string
    user: {
        id: string
        name: string
        email: string
        role: string
        createdAt: string
    }
    stats: {
        coursesCompleted: number
        totalHours: number
        certificates: number
        totalPoints: number
        rank: string
    }
    preferences: {
        publicProfile: boolean
        showProgress: boolean
        notifications: boolean
        emailUpdates: boolean
    }
}

interface UserCourse {
    id: string
    userId: string
    courseId: string
    progress: number
    enrolledAt: string
    updatedAt: string
    course: {
        id: string
        title: string
        description: string
        slug: string
        price: number
        duration: number
        level: string
        category: string
    }
}

export default function DashboardPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    const [userCourses, setUserCourses] = useState<UserCourse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true)

                // Buscar perfil do usuário
                const profileResponse = await fetch('/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('fenix-jwt-token') || 'fenix-jwt-token-demo'}`
                    }
                })

                if (profileResponse.ok) {
                    const profileData = await profileResponse.json()
                    setUserProfile(profileData.profile)
                }

                // Buscar cursos do usuário
                const coursesResponse = await fetch('/api/users/courses', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('fenix-jwt-token') || 'fenix-jwt-token-demo'}`
                    }
                })

                if (coursesResponse.ok) {
                    const coursesData = await coursesResponse.json()
                    setUserCourses(coursesData.courses || [])
                }

                setIsLoaded(true)
            } catch (err) {
                console.error('Erro ao carregar dados do usuário:', err)
                setError('Erro ao carregar dados do usuário')
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    // Calcular estatísticas baseadas nos dados reais
    const totalProgress = userCourses.length > 0
        ? Math.round(userCourses.reduce((acc, course) => acc + course.progress, 0) / userCourses.length)
        : 0

    const completedCourses = userCourses.filter(course => course.progress === 100).length
    const totalHours = userProfile?.stats.totalHours || 0
    const certificates = userProfile?.stats.certificates || 0

    const stats = [
        {
            title: 'Progresso Geral',
            value: `${totalProgress}%`,
            change: userCourses.length > 0 ? `+${Math.round(totalProgress / 10)}%` : '0%',
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-500',
            trend: 'up'
        },
        {
            title: 'Cursos Concluídos',
            value: completedCourses.toString(),
            change: completedCourses > 0 ? `+${completedCourses}` : '0',
            icon: CheckCircle,
            color: 'from-blue-500 to-cyan-500',
            trend: 'up'
        },
        {
            title: 'Horas Estudadas',
            value: `${totalHours}h`,
            change: totalHours > 0 ? `+${Math.round(totalHours / 10)}h` : '0h',
            icon: Clock,
            color: 'from-purple-500 to-pink-500',
            trend: 'up'
        },
        {
            title: 'Certificados',
            value: certificates.toString(),
            change: certificates > 0 ? `+${certificates}` : '0',
            icon: Award,
            color: 'from-yellow-500 to-orange-500',
            trend: 'up'
        }
    ]

    // Usar dados reais dos cursos do usuário
    const recentCourses = userCourses.slice(0, 3).map(course => ({
        id: course.id,
        title: course.course.title,
        progress: course.progress,
        nextLesson: course.progress < 100 ? 'Continue estudando' : 'Curso concluído',
        instructor: 'Fênix Dev Academy',
        duration: `${course.course.duration}h`,
        thumbnail: '/api/placeholder/300/200',
        category: course.course.category
    }))

    // Conquistas baseadas nos dados reais do usuário
    const achievements = [
        {
            title: 'Primeiro Curso',
            description: userCourses.length > 0 ? 'Iniciou sua jornada de aprendizado' : 'Complete seu primeiro curso',
            icon: Code,
            earned: userCourses.length > 0,
            date: userCourses.length > 0 ? new Date(userCourses[0].enrolledAt).toLocaleDateString('pt-BR') : null
        },
        {
            title: '100 Horas de Estudo',
            description: totalHours >= 100 ? 'Dedicou 100+ horas ao aprendizado' : 'Continue estudando para alcançar 100 horas',
            icon: Clock,
            earned: totalHours >= 100,
            date: totalHours >= 100 ? 'Conquistado!' : null
        },
        {
            title: 'Primeiro Certificado',
            description: certificates > 0 ? 'Obteve seu primeiro certificado' : 'Complete cursos para obter certificados',
            icon: Award,
            earned: certificates > 0,
            date: certificates > 0 ? 'Conquistado!' : null
        },
        {
            title: 'Estudante Dedicado',
            description: completedCourses > 0 ? 'Mantém consistência nos estudos' : 'Comece a estudar regularmente',
            icon: Target,
            earned: completedCourses > 0,
            date: completedCourses > 0 ? 'Conquistado!' : null
        }
    ]

    const notifications = [
        {
            id: 1,
            title: 'Nova aula disponível',
            message: 'React Hooks - useCallback e useMemo',
            time: '2 horas atrás',
            type: 'info',
            read: false
        },
        {
            id: 2,
            title: 'Certificado liberado',
            message: 'Parabéns! Seu certificado de JavaScript está pronto',
            time: '1 dia atrás',
            type: 'success',
            read: false
        },
        {
            id: 3,
            title: 'Lembrete de estudo',
            message: 'Você tem 3 aulas pendentes para assistir',
            time: '2 dias atrás',
            type: 'warning',
            read: true
        }
    ]

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'web': return <Code className="w-5 h-5" />
            case 'data': return <Database className="w-5 h-5" />
            case 'mobile': return <Smartphone className="w-5 h-5" />
            case 'security': return <Shield className="w-5 h-5" />
            default: return <BookOpen className="w-5 h-5" />
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'web': return 'from-blue-500 to-cyan-500'
            case 'data': return 'from-green-500 to-emerald-500'
            case 'mobile': return 'from-purple-500 to-pink-500'
            case 'security': return 'from-red-500 to-orange-500'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
                <AdvancedParticles />
                <VisualEffects />
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Carregando seus dados...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
                <AdvancedParticles />
                <VisualEffects />
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-white text-lg mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />

            {/* Header */}
            <header className="glass-tech border-b border-white/20 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-glow">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold gradient-text-neon">Dashboard</h1>
                                <p className="text-gray-300">
                                    Bem-vindo de volta, {userProfile?.user.name || 'Desenvolvedor'}!
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group relative">
                                <Bell className="w-5 h-5 group-hover:animate-bounce" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            </button>
                            <button className="p-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group">
                                <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Stats Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="card group hover:scale-105 transition-all duration-500"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-300 mb-2">{stat.title}</p>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-3xl font-bold gradient-text">{stat.value}</span>
                                        <span className="text-sm text-green-400 flex items-center">
                                            <TrendingUp className="w-4 h-4 mr-1" />
                                            {stat.change}
                                        </span>
                                    </div>
                                </div>
                                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse-slow`}>
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Courses */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Cursos em Andamento</h2>
                                <button className="btn-secondary group flex items-center space-x-2">
                                    <span>Ver Todos</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {recentCourses.map((course, index) => (
                                    <div
                                        key={course.id}
                                        className={`glass-tech rounded-xl p-6 hover:scale-105 transition-all duration-500 group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                            }`}
                                        style={{ transitionDelay: `${index * 200}ms` }}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`w-16 h-16 bg-gradient-to-r ${getCategoryColor(course.category)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                                {getCategoryIcon(course.category)}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-lg font-semibold text-white group-hover:gradient-text transition-all duration-300">
                                                        {course.title}
                                                    </h3>
                                                    <span className="text-sm text-gray-400">{course.duration}</span>
                                                </div>

                                                <p className="text-gray-300 text-sm mb-4">
                                                    Próxima aula: {course.nextLesson}
                                                </p>

                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-400">Progresso</span>
                                                        <span className="text-white font-medium">{course.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${course.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <span className="text-sm text-gray-400">Instrutor: {course.instructor}</span>
                                                    <button className="btn-primary group flex items-center space-x-2">
                                                        <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                        <span>Continuar</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="card">
                            <h2 className="text-2xl font-bold text-white mb-6">Ações Rápidas</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button className="p-4 glass-tech rounded-xl hover:scale-105 transition-all duration-300 group text-center">
                                    <Plus className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-white">Novo Projeto</span>
                                </button>
                                <button className="p-4 glass-tech rounded-xl hover:scale-105 transition-all duration-300 group text-center">
                                    <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-white">Explorar Cursos</span>
                                </button>
                                <button className="p-4 glass-tech rounded-xl hover:scale-105 transition-all duration-300 group text-center">
                                    <Code className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-white">Abrir IDE</span>
                                </button>
                                <button className="p-4 glass-tech rounded-xl hover:scale-105 transition-all duration-300 group text-center">
                                    <MessageCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-white">Comunidade</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Achievements */}
                        <div className="card">
                            <h2 className="text-xl font-bold text-white mb-6">Conquistas</h2>
                            <div className="space-y-4">
                                {achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${achievement.earned
                                            ? 'bg-white/10 border border-green-400/30'
                                            : 'bg-white/5 border border-white/10'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${achievement.earned
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                            : 'bg-gray-600'
                                            }`}>
                                            <achievement.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-white">{achievement.title}</h3>
                                            <p className="text-xs text-gray-400">{achievement.description}</p>
                                        </div>
                                        {achievement.earned && (
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="card">
                            <h2 className="text-xl font-bold text-white mb-6">Notificações</h2>
                            <div className="space-y-3">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-3 rounded-lg transition-all duration-300 hover:scale-105 ${notification.read
                                            ? 'bg-white/5'
                                            : 'bg-white/10 border border-blue-400/30'
                                            }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'success' ? 'bg-green-400' :
                                                notification.type === 'warning' ? 'bg-yellow-400' :
                                                    'bg-blue-400'
                                                }`}></div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-white">{notification.title}</h3>
                                                <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                                                <span className="text-xs text-gray-500">{notification.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Study Streak */}
                        <div className="card">
                            <h2 className="text-xl font-bold text-white mb-6">Sequência de Estudos</h2>
                            <div className="text-center">
                                <div className="text-4xl font-bold gradient-text mb-2">7 dias</div>
                                <p className="text-gray-300 text-sm mb-4">Mantenha a sequência!</p>
                                <div className="flex justify-center space-x-1">
                                    {[...Array(7)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}