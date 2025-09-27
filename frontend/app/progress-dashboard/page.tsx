'use client'

import React, { useState, useEffect } from 'react'
import {
    TrendingUp,
    BookOpen,
    Clock,
    Award,
    Target,
    Calendar,
    BarChart3,
    PieChart,
    Activity,
    Star,
    Trophy,
    Zap,
    CheckCircle,
    Play,
    Pause,
    RotateCcw
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection'
import MobileOptimizedCard from '@/components/MobileOptimizedCard'
import ProgressTracker from '@/components/ProgressTracker'
import NotificationCenter from '@/components/NotificationCenter'
import { useProgress } from '@/hooks/useProgress'
import { useNotifications } from '@/hooks/useNotifications'

interface CourseProgress {
    id: number
    title: string
    progress: number
    completedLessons: number
    totalLessons: number
    timeSpent: number
    lastAccessed: Date
    status: 'active' | 'completed' | 'paused'
    category: string
    instructor: string
    image: string
}

interface Achievement {
    id: string
    title: string
    description: string
    icon: string
    earnedAt: Date
    points: number
}

interface StudySession {
    id: string
    courseTitle: string
    duration: number
    date: Date
    lessonsCompleted: number
}

export default function ProgressDashboard() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')
    const [courses, setCourses] = useState<CourseProgress[]>([])
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [studySessions, setStudySessions] = useState<StudySession[]>([])
    const [stats, setStats] = useState({
        totalCourses: 0,
        completedCourses: 0,
        totalTime: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalPoints: 0,
        thisWeekTime: 0,
        thisMonthTime: 0
    })

    const { notifyProgress, notifyAchievement } = useNotifications()

    useEffect(() => {
        setIsLoaded(true)
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        try {
            // Simular carregamento de dados
            const mockCourses: CourseProgress[] = [
                {
                    id: 1,
                    title: 'React Avançado - Do Zero ao Profissional',
                    progress: 75,
                    completedLessons: 30,
                    totalLessons: 40,
                    timeSpent: 1200,
                    lastAccessed: new Date(),
                    status: 'active',
                    category: 'Web Development',
                    instructor: 'João Silva',
                    image: '/api/placeholder/300/200'
                },
                {
                    id: 2,
                    title: 'Node.js & Express - Backend Profissional',
                    progress: 100,
                    completedLessons: 35,
                    totalLessons: 35,
                    timeSpent: 1800,
                    lastAccessed: new Date(Date.now() - 86400000),
                    status: 'completed',
                    category: 'Web Development',
                    instructor: 'Carlos Oliveira',
                    image: '/api/placeholder/300/200'
                },
                {
                    id: 3,
                    title: 'Python para Data Science',
                    progress: 45,
                    completedLessons: 18,
                    totalLessons: 40,
                    timeSpent: 900,
                    lastAccessed: new Date(Date.now() - 172800000),
                    status: 'active',
                    category: 'Data Science',
                    instructor: 'Maria Santos',
                    image: '/api/placeholder/300/200'
                }
            ]

            const mockAchievements: Achievement[] = [
                {
                    id: '1',
                    title: 'Primeiro Curso',
                    description: 'Complete seu primeiro curso',
                    icon: '🎓',
                    earnedAt: new Date(Date.now() - 2592000000),
                    points: 100
                },
                {
                    id: '2',
                    title: '100 Horas de Estudo',
                    description: 'Dedicou 100+ horas ao aprendizado',
                    icon: '⏰',
                    earnedAt: new Date(Date.now() - 1209600000),
                    points: 250
                },
                {
                    id: '3',
                    title: 'Streak de 7 Dias',
                    description: 'Manteve uma sequência de 7 dias estudando',
                    icon: '🔥',
                    earnedAt: new Date(Date.now() - 604800000),
                    points: 150
                }
            ]

            const mockStudySessions: StudySession[] = [
                {
                    id: '1',
                    courseTitle: 'React Avançado',
                    duration: 45,
                    date: new Date(),
                    lessonsCompleted: 2
                },
                {
                    id: '2',
                    courseTitle: 'Python para Data Science',
                    duration: 60,
                    date: new Date(Date.now() - 86400000),
                    lessonsCompleted: 3
                },
                {
                    id: '3',
                    courseTitle: 'React Avançado',
                    duration: 30,
                    date: new Date(Date.now() - 172800000),
                    lessonsCompleted: 1
                }
            ]

            setCourses(mockCourses)
            setAchievements(mockAchievements)
            setStudySessions(mockStudySessions)

            // Calcular estatísticas
            const totalCourses = mockCourses.length
            const completedCourses = mockCourses.filter(c => c.status === 'completed').length
            const totalTime = mockCourses.reduce((acc, c) => acc + c.timeSpent, 0)
            const thisWeekTime = mockStudySessions.reduce((acc, s) => acc + s.duration, 0)
            const totalPoints = mockAchievements.reduce((acc, a) => acc + a.points, 0)

            setStats({
                totalCourses,
                completedCourses,
                totalTime,
                currentStreak: 5,
                longestStreak: 12,
                totalPoints,
                thisWeekTime,
                thisMonthTime: thisWeekTime * 4
            })

        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error)
        }
    }

    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'from-green-500 to-emerald-500'
            case 'active': return 'from-blue-500 to-cyan-500'
            case 'paused': return 'from-yellow-500 to-orange-500'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Concluído'
            case 'active': return 'Em Andamento'
            case 'paused': return 'Pausado'
            default: return 'Desconhecido'
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <AdvancedParticles />
            <VisualEffects />

            <div className="relative pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <ScrollAnimatedSection delay={0.2} direction="down">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                                Dashboard de <span className="gradient-text-neon">Progresso</span>
                            </h1>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Acompanhe seu progresso, conquistas e estatísticas de aprendizado
                            </p>
                        </div>
                    </ScrollAnimatedSection>

                    {/* Tabs */}
                    <ScrollAnimatedSection delay={0.4} direction="up">
                        <div className="flex flex-wrap gap-4 mb-8 justify-center">
                            {[
                                { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
                                { id: 'courses', label: 'Cursos', icon: BookOpen },
                                { id: 'achievements', label: 'Conquistas', icon: Trophy },
                                { id: 'notifications', label: 'Notificações', icon: Activity }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                                        }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </ScrollAnimatedSection>

                    {/* Content */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Stats Cards */}
                            <ScrollAnimatedSection delay={0.6} direction="up">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <MobileOptimizedCard hover={true} glow={true}>
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <BookOpen className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{stats.totalCourses}</h3>
                                            <p className="text-gray-300">Cursos Iniciados</p>
                                        </div>
                                    </MobileOptimizedCard>

                                    <MobileOptimizedCard hover={true} glow={true}>
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{stats.completedCourses}</h3>
                                            <p className="text-gray-300">Cursos Concluídos</p>
                                        </div>
                                    </MobileOptimizedCard>

                                    <MobileOptimizedCard hover={true} glow={true}>
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <Clock className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{formatTime(stats.totalTime)}</h3>
                                            <p className="text-gray-300">Tempo Total</p>
                                        </div>
                                    </MobileOptimizedCard>

                                    <MobileOptimizedCard hover={true} glow={true}>
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <Trophy className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{stats.totalPoints}</h3>
                                            <p className="text-gray-300">Pontos Totais</p>
                                        </div>
                                    </MobileOptimizedCard>
                                </div>
                            </ScrollAnimatedSection>

                            {/* Recent Activity */}
                            <ScrollAnimatedSection delay={0.8} direction="up">
                                <MobileOptimizedCard hover={true} glow={false}>
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                            <Activity className="w-6 h-6" />
                                            Atividade Recente
                                        </h2>

                                        <div className="space-y-4">
                                            {studySessions.slice(0, 5).map((session) => (
                                                <div key={session.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                        <Play className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-white font-semibold">{session.courseTitle}</h3>
                                                        <p className="text-gray-300 text-sm">
                                                            {session.lessonsCompleted} lições • {formatTime(session.duration)}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm text-gray-400">
                                                            {session.date.toLocaleDateString('pt-BR')}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </MobileOptimizedCard>
                            </ScrollAnimatedSection>
                        </div>
                    )}

                    {activeTab === 'courses' && (
                        <ScrollAnimatedSection delay={0.6} direction="up">
                            <div className="space-y-6">
                                {courses.map((course) => (
                                    <MobileOptimizedCard key={course.id} hover={true} glow={false}>
                                        <div className="flex items-center gap-6">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-20 h-20 rounded-xl object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-white">{course.title}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor(course.status)} text-white`}>
                                                        {getStatusText(course.status)}
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 mb-4">{course.instructor} • {course.category}</p>

                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-300">Progresso</span>
                                                        <span className="text-sm font-semibold text-white">{course.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-white/10 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${course.progress}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm text-gray-400">
                                                        <span>{course.completedLessons}/{course.totalLessons} lições</span>
                                                        <span>{formatTime(course.timeSpent)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </MobileOptimizedCard>
                                ))}
                            </div>
                        </ScrollAnimatedSection>
                    )}

                    {activeTab === 'achievements' && (
                        <ScrollAnimatedSection delay={0.6} direction="up">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {achievements.map((achievement) => (
                                    <MobileOptimizedCard key={achievement.id} hover={true} glow={true}>
                                        <div className="text-center space-y-4">
                                            <div className="text-6xl">{achievement.icon}</div>
                                            <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                                            <p className="text-gray-300">{achievement.description}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-400">
                                                    {achievement.earnedAt.toLocaleDateString('pt-BR')}
                                                </span>
                                                <span className="text-yellow-400 font-semibold">
                                                    +{achievement.points} pts
                                                </span>
                                            </div>
                                        </div>
                                    </MobileOptimizedCard>
                                ))}
                            </div>
                        </ScrollAnimatedSection>
                    )}

                    {activeTab === 'notifications' && (
                        <ScrollAnimatedSection delay={0.6} direction="up">
                            <MobileOptimizedCard hover={true} glow={false}>
                                <NotificationCenter />
                            </MobileOptimizedCard>
                        </ScrollAnimatedSection>
                    )}
                </div>
            </div>
        </div>
    )
}


