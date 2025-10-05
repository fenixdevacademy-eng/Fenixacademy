'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';
import FenixFooter from '@/components/FenixFooter';
import AuthGuard from '@/components/AuthGuard';
import { useDashboardData } from '@/hooks/useDashboardData';
import {
    Rocket,
    Code,
    Brain,
    Target,
    Award,
    Users,
    Clock,
    Star,
    Play,
    BookOpen,
    Zap,
    Shield,
    TrendingUp,
    ArrowRight,
    CheckCircle,
    Filter,
    Search,
    Grid,
    List,
    Heart,
    Bookmark,
    Share2,
    Download,
    Eye,
    Monitor,
    Smartphone,
    Database,
    Server,
    Cloud,
    Globe,
    Lock,
    Unlock,
    ChevronDown,
    ChevronUp,
    Plus,
    Minus,
    RefreshCw,
    ExternalLink,
    Copy,
    Edit,
    Trash2,
    Save,
    Settings,
    Bell,
    MessageCircle,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    DollarSign,
    CreditCard,
    ShoppingCart,
    Gift,
    Trophy,
    Medal,
    Flag,
    Tag,
    Hash,
    AtSign,
    Percent,
    Calculator,
    Wifi,
    Signal,
    Battery,
    Power,
    Volume2,
    VolumeX,
    Mic,
    MicOff,
    Camera,
    CameraOff,
    Video,
    VideoOff,
    Image,
    ImageOff,
    FileText,
    Folder,
    Upload,
    Home,
    Menu,
    X,
    ArrowLeft,
    ArrowUp,
    ArrowDown,
    BarChart3,
    PieChart,
    Activity,
    Flame,
    Crown,
    Sparkles,
    Diamond
} from 'lucide-react';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [showNotifications, setShowNotifications] = useState(false);

    // Usar dados reais da API
    const { data: dashboardData, loading, error, refetch } = useDashboardData();

    // Dados de fallback caso a API falhe
    const fallbackData = {
        user: {
            id: '1',
            name: 'Usuário',
            email: 'usuario@exemplo.com',
            level: 1,
            title: 'Desenvolvedor',
            avatar: 'U',
            progress: 0
        },
        stats: {
            totalCourses: 0,
            completedCourses: 0,
            inProgressCourses: 0,
            totalHours: 0,
            thisWeekHours: 0,
            streak: 0,
            points: 0,
            rank: 0,
            certificates: 0
        },
        courses: [],
        recentActivity: [],
        upcomingEvents: []
    };

    const data = dashboardData || fallbackData;

    // Mostrar loading se estiver carregando
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-orange-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-white">Carregando dashboard...</p>
                </div>
            </div>
        );
    }

    // Mostrar erro se houver
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-orange-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Erro ao carregar dashboard</h2>
                    <p className="text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={refetch}
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    const stats = [
        {
            title: "Progresso Geral",
            value: `${data.stats.totalCourses > 0 ? Math.round((data.stats.completedCourses / data.stats.totalCourses) * 100) : 0}%`,
            icon: TrendingUp,
            color: "from-green-500 to-emerald-500",
            change: `+${data.stats.thisWeekHours}h esta semana`
        },
        {
            title: "Cursos Concluídos",
            value: data.stats.completedCourses.toString(),
            icon: Award,
            color: "from-blue-500 to-cyan-500",
            change: `+${data.stats.inProgressCourses} em andamento`
        },
        {
            title: "Certificados",
            value: data.stats.certificates.toString(),
            icon: Code,
            color: "from-purple-500 to-pink-500",
            change: `+${data.stats.points} pontos`
        },
        {
            title: "Horas Estudadas",
            value: `${data.stats.totalHours}h`,
            icon: Clock,
            color: "from-orange-500 to-red-500",
            change: `Sequência: ${data.stats.streak} dias`
        }
    ];

    const recentCourses = [
        {
            id: 1,
            title: "React Avançado - Hooks e Context",
            progress: 85,
            nextLesson: "useReducer Hook",
            instructor: "Carlos Silva",
            avatar: "👨‍💻",
            timeLeft: "2h 30min",
            difficulty: "Avançado",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            title: "Node.js - APIs RESTful",
            progress: 60,
            nextLesson: "Middleware e Autenticação",
            instructor: "Ana Santos",
            avatar: "👩‍💼",
            timeLeft: "4h 15min",
            difficulty: "Intermediário",
            color: "from-green-500 to-emerald-500"
        },
        {
            id: 3,
            title: "Python Data Science",
            progress: 30,
            nextLesson: "Pandas e DataFrames",
            instructor: "Pedro Costa",
            avatar: "👨‍🚀",
            timeLeft: "8h 45min",
            difficulty: "Avançado",
            color: "from-purple-500 to-pink-500"
        }
    ];

    const achievements = [
        {
            id: 1,
            title: "Primeiro Projeto",
            description: "Criou seu primeiro projeto React",
            icon: Trophy,
            color: "from-yellow-500 to-orange-500",
            earned: true,
            date: "15 Jan 2025"
        },
        {
            id: 2,
            title: "Maratonista",
            description: "Estudou por 10 horas seguidas",
            icon: Flame,
            color: "from-red-500 to-pink-500",
            earned: true,
            date: "12 Jan 2025"
        },
        {
            id: 3,
            title: "Social Learner",
            description: "Compartilhou 5 projetos",
            icon: Share2,
            color: "from-blue-500 to-cyan-500",
            earned: false,
            progress: 3
        },
        {
            id: 4,
            title: "Expert",
            description: "Completou 5 cursos avançados",
            icon: Crown,
            color: "from-purple-500 to-pink-500",
            earned: false,
            progress: 2
        }
    ];

    const upcomingEvents = [
        {
            id: 1,
            title: "Live: React Performance",
            instructor: "Carlos Silva",
            time: "Hoje, 19:00",
            type: "Live",
            color: "from-red-500 to-pink-500"
        },
        {
            id: 2,
            title: "Workshop: Node.js",
            instructor: "Ana Santos",
            time: "Amanhã, 14:00",
            type: "Workshop",
            color: "from-green-500 to-emerald-500"
        },
        {
            id: 3,
            title: "Q&A: Python",
            instructor: "Pedro Costa",
            time: "Quinta, 16:00",
            type: "Q&A",
            color: "from-blue-500 to-cyan-500"
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-orange-900 flex items-center justify-center relative overflow-hidden">
                {/* Faíscas e brasas caindo */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-ember-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        />
                    ))}
                </div>

                <div className="text-center relative z-10">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-full blur-2xl opacity-75 animate-fire-glow"></div>
                        <div className="relative bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-8 animate-flame-flicker">
                            <Rocket className="h-20 w-20 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        🔥 Carregando Dashboard...
                    </h2>
                    <p className="text-gray-300">Preparando sua experiência personalizada</p>
                </div>
            </div>
        );
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-orange-900 relative overflow-hidden">
                {/* Background Effects */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-red-500/20 rounded-full animate-pulse"
                            style={{
                                left: `${(i * 5) % 100}%`,
                                top: `${(i * 7) % 100}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${2 + (i % 3)}s`
                            }}
                        />
                    ))}
                </div>

                {/* Faíscas e brasas caindo */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-ember-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        />
                    ))}

                    {/* Faíscas maiores */}
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={`spark-${i}`}
                            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-sparkle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>

                <DashboardHeader user={data.user} />

                {/* Main Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Welcome Section - Tema Fênix */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2 relative">
                            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                🔥 Bem-vindo de volta, {data.user.name}!
                            </span>
                            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                        </h1>
                        <p className="text-xl text-gray-300">
                            Continue sua jornada de transformação profissional
                        </p>
                    </div>

                    {/* Stats Grid - Tema Fênix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="group bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 hover:border-orange-500/50 hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-500 transform hover:scale-105 relative overflow-hidden animate-fire-glow">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Floating Fire Elements */}
                                <div className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full animate-sparkle opacity-0 group-hover:opacity-100"></div>
                                <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-400 rounded-full animate-sparkle opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.5s' }}></div>

                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div className={`bg-gradient-to-r ${stat.color} rounded-lg p-3 group-hover:scale-110 transition-transform duration-300 animate-fire-glow`}>
                                        <stat.icon className="h-8 w-8 text-white animate-flame-flicker" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-white group-hover:text-red-300 transition-colors">{stat.value}</div>
                                        <div className="text-sm text-gray-400 group-hover:text-orange-300 transition-colors">{stat.change}</div>
                                    </div>
                                </div>
                                <h3 className="text-white font-medium group-hover:text-red-300 transition-colors relative z-10">{stat.title}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Main Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Recent Courses - Tema Fênix */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 relative overflow-hidden group animate-fire-glow">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Floating Fire Elements */}
                                <div className="absolute top-6 right-6 w-2 h-2 bg-red-400 rounded-full animate-sparkle"></div>
                                <div className="absolute bottom-6 left-6 w-1 h-1 bg-orange-400 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>

                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                        🔥 Cursos em Andamento
                                    </h2>
                                    <button className="text-red-300 hover:text-orange-300 transition-colors hover:animate-flame-flicker relative group">
                                        Ver todos
                                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    </button>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    {recentCourses.map((course) => (
                                        <div key={course.id} className="group bg-gradient-to-br from-red-500/5 to-orange-500/5 backdrop-blur-sm rounded-xl p-4 border border-red-500/20 hover:border-orange-500/40 hover:from-red-500/10 hover:to-orange-500/10 transition-all duration-500 transform hover:scale-105 relative overflow-hidden animate-fire-glow">
                                            {/* Animated Background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 to-orange-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* Floating Fire Elements */}
                                            <div className="absolute top-3 right-3 w-1 h-1 bg-red-400 rounded-full animate-sparkle opacity-0 group-hover:opacity-100"></div>
                                            <div className="absolute bottom-3 left-3 w-1 h-1 bg-orange-400 rounded-full animate-sparkle opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.5s' }}></div>

                                            <div className="flex items-start space-x-4 relative z-10">
                                                <div className={`bg-gradient-to-r ${course.color} rounded-lg p-3 group-hover:scale-110 transition-transform duration-300 animate-fire-glow`}>
                                                    <BookOpen className="h-8 w-8 text-white animate-flame-flicker" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors">{course.title}</h3>
                                                        <span className="bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 px-3 py-1 rounded-full text-sm animate-flame-flicker">
                                                            {course.difficulty}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <div className="text-sm animate-flame-flicker">{course.avatar}</div>
                                                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{course.instructor}</span>
                                                        <span className="text-gray-400 text-sm">•</span>
                                                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{course.timeLeft}</span>
                                                    </div>

                                                    <div className="mb-3">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Progresso</span>
                                                            <span className="text-sm text-white font-medium group-hover:text-red-300 transition-colors">{course.progress}%</span>
                                                        </div>
                                                        <div className="w-full bg-white/10 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500 animate-fire-glow"
                                                                style={{ width: `${course.progress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-400 group-hover:text-orange-300 transition-colors">Próxima: {course.nextLesson}</span>
                                                        <button className="group/btn bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 animate-fire-glow">
                                                            <Play className="inline h-4 w-4 mr-2 group-hover/btn:animate-flame-flicker" />
                                                            Continuar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Tema Fênix */}
                        <div className="space-y-6">

                            {/* Achievements - Tema Fênix */}
                            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 relative overflow-hidden group animate-fire-glow">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Floating Fire Elements */}
                                <div className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full animate-sparkle"></div>
                                <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-400 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>

                                <h3 className="text-xl font-bold text-white mb-4 relative z-10 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                    🔥 Conquistas
                                </h3>
                                <div className="space-y-3 relative z-10">
                                    {achievements.map((achievement) => (
                                        <div key={achievement.id} className="group/item flex items-center space-x-3 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-orange-500/10 rounded-lg p-2 transition-all duration-300">
                                            <div className={`bg-gradient-to-r ${achievement.color} rounded-lg p-2 ${achievement.earned ? 'opacity-100 animate-fire-glow' : 'opacity-50'
                                                } group-hover/item:scale-110 transition-transform duration-300`}>
                                                <achievement.icon className="h-6 w-6 text-white animate-flame-flicker" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white font-medium text-sm group-hover/item:text-red-300 transition-colors">{achievement.title}</div>
                                                <div className="text-gray-400 text-xs group-hover/item:text-orange-300 transition-colors">{achievement.description}</div>
                                                {achievement.earned ? (
                                                    <div className="text-green-400 text-xs group-hover/item:text-yellow-300 transition-colors">{achievement.date}</div>
                                                ) : (
                                                    <div className="text-gray-500 text-xs group-hover/item:text-gray-400 transition-colors">
                                                        {achievement.progress}/5 progresso
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Events - Tema Fênix */}
                            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30 relative overflow-hidden group animate-fire-glow">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Floating Fire Elements */}
                                <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-sparkle"></div>
                                <div className="absolute bottom-4 left-4 w-1 h-1 bg-yellow-400 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>

                                <h3 className="text-xl font-bold text-white mb-4 relative z-10 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                    ⚡ Próximos Eventos
                                </h3>
                                <div className="space-y-3 relative z-10">
                                    {upcomingEvents.map((event) => (
                                        <div key={event.id} className="group/item flex items-center space-x-3 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 rounded-lg p-2 transition-all duration-300">
                                            <div className={`bg-gradient-to-r ${event.color} rounded-lg p-2 group-hover/item:scale-110 transition-transform duration-300 animate-fire-glow`}>
                                                <Calendar className="h-6 w-6 text-white animate-flame-flicker" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white font-medium text-sm group-hover/item:text-orange-300 transition-colors">{event.title}</div>
                                                <div className="text-gray-400 text-xs group-hover/item:text-yellow-300 transition-colors">{event.instructor}</div>
                                                <div className="text-orange-300 text-xs group-hover/item:text-red-300 transition-colors">{event.time}</div>
                                            </div>
                                            <span className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-300 px-2 py-1 rounded-full text-xs animate-flame-flicker">
                                                {event.type}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions - Tema Fênix */}
                            <div className="bg-gradient-to-br from-yellow-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30 relative overflow-hidden group animate-fire-glow">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Floating Fire Elements */}
                                <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"></div>
                                <div className="absolute bottom-4 left-4 w-1 h-1 bg-red-400 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>

                                <h3 className="text-xl font-bold text-white mb-4 relative z-10 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                                    💥 Ações Rápidas
                                </h3>
                                <div className="space-y-3 relative z-10">
                                    <button className="group/btn w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 animate-fire-glow">
                                        <Code className="inline h-5 w-5 mr-2 group-hover/btn:animate-flame-flicker" />
                                        Novo Projeto
                                    </button>
                                    <button className="group/btn w-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:to-yellow-500/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-orange-500/30 hover:border-yellow-500/50 animate-fire-glow">
                                        <BookOpen className="inline h-5 w-5 mr-2 group-hover/btn:animate-flame-flicker" />
                                        Explorar Cursos
                                    </button>
                                    <button className="group/btn w-full bg-gradient-to-r from-yellow-500/10 to-red-500/10 hover:from-yellow-500/20 hover:to-red-500/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-yellow-500/30 hover:border-red-500/50 animate-fire-glow">
                                        <Users className="inline h-5 w-5 mr-2 group-hover/btn:animate-flame-flicker" />
                                        Comunidade
                                    </button>
                                    <button className="group/btn w-full bg-gradient-to-r from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-orange-500/50 animate-fire-glow">
                                        <MessageCircle className="inline h-5 w-5 mr-2 group-hover/btn:animate-flame-flicker" />
                                        Suporte
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <FenixFooter />
            </div>
        </AuthGuard>
    );
}