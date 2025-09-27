'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    BookOpen,
    Play,
    Code,
    Database,
    Smartphone,
    Shield,
    Brain,
    Globe,
    Zap,
    Target,
    Rocket,
    Sparkles,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    Lightbulb,
    Award,
    Trophy,
    Calendar,
    BarChart3,
    PieChart,
    Activity,
    Users,
    Clock,
    Star,
    Download,
    Share2,
    Heart,
    Bookmark,
    MessageCircle,
    Plus,
    Eye,
    Settings,
    Search,
    Filter,
    Bell,
    BellOff,
    ChevronRight,
    ChevronDown,
    ExternalLink,
    FileText,
    Video,
    Image,
    Music,
    Settings as SettingsIcon
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import FunctionalButton from '@/components/FunctionalButton'
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection'
import MobileOptimizedCard from '@/components/MobileOptimizedCard'

export default function LearningHubPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')
    const [notifications, setNotifications] = useState(true)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const tabs = [
        { id: 'overview', name: 'Visão Geral', icon: BarChart3 },
        { id: 'courses', name: 'Cursos', icon: BookOpen },
        { id: 'tutorials', name: 'Tutoriais', icon: Play },
        { id: 'projects', name: 'Projetos', icon: Code },
        { id: 'resources', name: 'Recursos', icon: FileText },
        { id: 'progress', name: 'Progresso', icon: TrendingUp }
    ]

    const stats = {
        totalCourses: 24,
        completedCourses: 8,
        totalTutorials: 48,
        completedTutorials: 15,
        totalProjects: 32,
        completedProjects: 5,
        totalResources: 156,
        downloadedResources: 23,
        totalHours: 120,
        currentStreak: 7,
        totalPoints: 2450,
        rank: 'Desenvolvedor Avançado'
    }

    const recentActivity = [
        {
            id: 1,
            type: 'course_completed',
            title: 'React Avançado - Do Zero ao Profissional',
            description: 'Você completou o curso com 95% de aproveitamento!',
            time: '2 horas atrás',
            icon: CheckCircle,
            color: 'text-green-500',
            bgColor: 'bg-green-500/20'
        },
        {
            id: 2,
            type: 'tutorial_started',
            title: 'CSS Grid Layout Masterclass',
            description: 'Você iniciou um novo tutorial interativo',
            time: '4 horas atrás',
            icon: Play,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/20'
        },
        {
            id: 3,
            type: 'project_submitted',
            title: 'E-commerce Completo com React',
            description: 'Seu projeto foi submetido para revisão',
            time: '1 dia atrás',
            icon: Code,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/20'
        },
        {
            id: 4,
            type: 'resource_downloaded',
            title: 'Guia Completo de React Hooks',
            description: 'Você baixou um novo recurso educacional',
            time: '2 dias atrás',
            icon: Download,
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/20'
        }
    ]

    const recommendedContent = [
        {
            id: 1,
            title: 'JavaScript ES6+ Moderno',
            type: 'tutorial',
            category: 'web',
            rating: 4.9,
            duration: '4h 20min',
            progress: 0,
            difficulty: 'intermediate',
            image: '/api/placeholder/300/200',
            tags: ['JavaScript', 'ES6', 'ES7', 'ES8'],
            reason: 'Baseado no seu interesse em React'
        },
        {
            id: 2,
            title: 'Node.js & Express - Backend Profissional',
            type: 'course',
            category: 'web',
            rating: 4.9,
            duration: '35h',
            progress: 0,
            difficulty: 'intermediate',
            image: '/api/placeholder/300/200',
            tags: ['Node.js', 'Express', 'MongoDB', 'API'],
            reason: 'Complementa seus conhecimentos em frontend'
        },
        {
            id: 3,
            title: 'Dashboard Analytics com D3.js',
            type: 'project',
            category: 'web',
            rating: 4.8,
            duration: '12h',
            progress: 0,
            difficulty: 'advanced',
            image: '/api/placeholder/300/200',
            tags: ['D3.js', 'React', 'TypeScript', 'Analytics'],
            reason: 'Projeto popular entre desenvolvedores'
        }
    ]

    const achievements = [
        {
            id: 1,
            title: 'Primeiro Curso',
            description: 'Complete seu primeiro curso',
            icon: Trophy,
            unlocked: true,
            progress: 100,
            points: 100
        },
        {
            id: 2,
            title: 'Maratonista',
            description: 'Estude por 7 dias consecutivos',
            icon: Calendar,
            unlocked: true,
            progress: 100,
            points: 200
        },
        {
            id: 3,
            title: 'Desenvolvedor Full Stack',
            description: 'Complete 5 projetos de diferentes categorias',
            icon: Code,
            unlocked: false,
            progress: 60,
            points: 500
        },
        {
            id: 4,
            title: 'Mestre dos Recursos',
            description: 'Baixe 50 recursos educacionais',
            icon: Download,
            unlocked: false,
            progress: 46,
            points: 300
        }
    ]

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'web': return <Globe className="w-4 h-4" />
            case 'mobile': return <Smartphone className="w-4 h-4" />
            case 'data': return <Database className="w-4 h-4" />
            case 'ai': return <Brain className="w-4 h-4" />
            case 'security': return <Shield className="w-4 h-4" />
            default: return <Code className="w-4 h-4" />
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'web': return 'from-green-500 to-emerald-500'
            case 'mobile': return 'from-purple-500 to-pink-500'
            case 'data': return 'from-orange-500 to-red-500'
            case 'ai': return 'from-indigo-500 to-purple-500'
            case 'security': return 'from-red-500 to-pink-500'
            default: return 'from-blue-500 to-cyan-500'
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'from-green-500 to-emerald-500'
            case 'intermediate': return 'from-blue-500 to-cyan-500'
            case 'advanced': return 'from-purple-500 to-pink-500'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />

            {/* Header */}
            <section className="relative pt-24 pb-16">
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium animate-glow">
                            <Lightbulb className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
                            <span className="gradient-text-neon">Seu Hub de Aprendizado</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                            Hub de <span className="gradient-text-neon animate-neon">Aprendizado</span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Centralize seu aprendizado com cursos, tutoriais, projetos e recursos em um só lugar
                        </p>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <section className="py-8 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'gradient-text bg-white/20 border border-blue-400/30'
                                    : 'text-white/90 hover:text-white hover:bg-white/10 border border-white/20'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 relative">
                <div className="absolute inset-0 tech-grid opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-12">
                            {/* Stats Overview */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="card p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">Cursos Completos</p>
                                            <p className="text-3xl font-bold text-white">{stats.completedCourses}/{stats.totalCourses}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: `${(stats.completedCourses / stats.totalCourses) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">Tutoriais Completos</p>
                                            <p className="text-3xl font-bold text-white">{stats.completedTutorials}/{stats.totalTutorials}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                            <Play className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: `${(stats.completedTutorials / stats.totalTutorials) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">Projetos Completos</p>
                                            <p className="text-3xl font-bold text-white">{stats.completedProjects}/{stats.totalProjects}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                            <Code className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${(stats.completedProjects / stats.totalProjects) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">Horas de Estudo</p>
                                            <p className="text-3xl font-bold text-white">{stats.totalHours}h</p>
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-400">Sequência: {stats.currentStreak} dias</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="card p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-white">Atividade Recente</h3>
                                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                        Ver todas
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                            <div className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center`}>
                                                <activity.icon className={`w-5 h-5 ${activity.color}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-semibold">{activity.title}</h4>
                                                <p className="text-gray-400 text-sm">{activity.description}</p>
                                            </div>
                                            <span className="text-gray-500 text-sm">{activity.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Achievements */}
                            <div className="card p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-white">Conquistas</h3>
                                    <span className="text-gray-400 text-sm">{stats.totalPoints} pontos</span>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {achievements.map((achievement) => (
                                        <div key={achievement.id} className={`p-4 rounded-lg border-2 ${achievement.unlocked ? 'border-green-500 bg-green-500/10' : 'border-gray-600 bg-gray-800/50'}`}>
                                            <div className="flex items-center space-x-3 mb-3">
                                                <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? 'text-green-500' : 'text-gray-500'}`} />
                                                <div>
                                                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>{achievement.title}</h4>
                                                    <p className="text-sm text-gray-400">{achievement.points} pontos</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div className={`h-2 rounded-full ${achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${achievement.progress}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'courses' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-white">Meus Cursos</h2>
                                <FunctionalButton
                                    href="/courses"
                                    variant="outline"
                                    size="md"
                                    icon={<ArrowRight className="w-4 h-4" />}
                                    iconPosition="right"
                                >
                                    Ver Todos
                                </FunctionalButton>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Course cards would go here */}
                                <div className="card p-6 text-center">
                                    <h3 className="text-xl font-bold text-white mb-4">Cursos em Andamento</h3>
                                    <p className="text-gray-400 mb-4">Você tem 3 cursos em andamento</p>
                                    <FunctionalButton
                                        href="/courses"
                                        variant="primary"
                                        size="md"
                                        className="w-full"
                                    >
                                        Continuar Aprendendo
                                    </FunctionalButton>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tutorials' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-white">Tutoriais Recomendados</h2>
                                <FunctionalButton
                                    href="/tutorials"
                                    variant="outline"
                                    size="md"
                                    icon={<ArrowRight className="w-4 h-4" />}
                                    iconPosition="right"
                                >
                                    Ver Todos
                                </FunctionalButton>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recommendedContent.map((content) => (
                                    <div key={content.id} className="card group hover:scale-105 transition-all duration-300">
                                        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 overflow-hidden">
                                            <div className="absolute inset-0 bg-black/20"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {getCategoryIcon(content.category)}
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getDifficultyColor(content.difficulty)}`}>
                                                    {content.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-white mb-2">{content.title}</h3>
                                            <p className="text-gray-400 text-sm mb-3">{content.reason}</p>
                                            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                                <span>{content.duration}</span>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span>{content.rating}</span>
                                                </div>
                                            </div>
                                            <FunctionalButton
                                                href={`/${content.type}s/${content.id}`}
                                                variant="primary"
                                                size="sm"
                                                className="w-full"
                                            >
                                                Começar
                                            </FunctionalButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-white">Projetos Práticos</h2>
                                <FunctionalButton
                                    href="/projects"
                                    variant="outline"
                                    size="md"
                                    icon={<ArrowRight className="w-4 h-4" />}
                                    iconPosition="right"
                                >
                                    Ver Todos
                                </FunctionalButton>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Project cards would go here */}
                                <div className="card p-6 text-center">
                                    <h3 className="text-xl font-bold text-white mb-4">Projetos em Andamento</h3>
                                    <p className="text-gray-400 mb-4">Você tem 2 projetos em desenvolvimento</p>
                                    <FunctionalButton
                                        href="/projects"
                                        variant="primary"
                                        size="md"
                                        className="w-full"
                                    >
                                        Continuar Projetos
                                    </FunctionalButton>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-white">Recursos Baixados</h2>
                                <FunctionalButton
                                    href="/resources"
                                    variant="outline"
                                    size="md"
                                    icon={<ArrowRight className="w-4 h-4" />}
                                    iconPosition="right"
                                >
                                    Ver Todos
                                </FunctionalButton>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Resource cards would go here */}
                                <div className="card p-6 text-center">
                                    <h3 className="text-xl font-bold text-white mb-4">Recursos Disponíveis</h3>
                                    <p className="text-gray-400 mb-4">Você baixou {stats.downloadedResources} de {stats.totalResources} recursos</p>
                                    <FunctionalButton
                                        href="/resources"
                                        variant="primary"
                                        size="md"
                                        className="w-full"
                                    >
                                        Explorar Recursos
                                    </FunctionalButton>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'progress' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-white">Meu Progresso</h2>
                                <span className="text-gray-400">Rank: {stats.rank}</span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="card p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Progresso Geral</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                                <span>Cursos</span>
                                                <span>{stats.completedCourses}/{stats.totalCourses}</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: `${(stats.completedCourses / stats.totalCourses) * 100}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                                <span>Tutoriais</span>
                                                <span>{stats.completedTutorials}/{stats.totalTutorials}</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: `${(stats.completedTutorials / stats.totalTutorials) * 100}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                                <span>Projetos</span>
                                                <span>{stats.completedProjects}/{stats.totalProjects}</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${(stats.completedProjects / stats.totalProjects) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Estatísticas</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Total de Horas</span>
                                            <span className="text-white font-semibold">{stats.totalHours}h</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Sequência Atual</span>
                                            <span className="text-white font-semibold">{stats.currentStreak} dias</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Pontos Totais</span>
                                            <span className="text-white font-semibold">{stats.totalPoints}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Rank Atual</span>
                                            <span className="text-white font-semibold">{stats.rank}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

