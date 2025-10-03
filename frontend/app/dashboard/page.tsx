'use client';

import React, { useState, useEffect } from 'react';
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
    const [isLoading, setIsLoading] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Simular carregamento
        setTimeout(() => setIsLoading(false), 2000);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const stats = [
        {
            title: "Progresso Geral",
            value: "78%",
            icon: TrendingUp,
            color: "from-green-500 to-emerald-500",
            change: "+12% este mês"
        },
        {
            title: "Cursos Concluídos",
            value: "3",
            icon: Award,
            color: "from-blue-500 to-cyan-500",
            change: "+1 esta semana"
        },
        {
            title: "Projetos Criados",
            value: "12",
            icon: Code,
            color: "from-purple-500 to-pink-500",
            change: "+3 este mês"
        },
        {
            title: "Horas Estudadas",
            value: "156h",
            icon: Clock,
            color: "from-orange-500 to-red-500",
            change: "+24h esta semana"
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-2xl opacity-75 animate-pulse"></div>
                        <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-8 animate-bounce">
                            <Rocket className="h-20 w-20 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Carregando Dashboard...</h2>
                    <p className="text-gray-300">Preparando sua experiência personalizada</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Cursor personalizado */}
            <div
                className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference"
                style={{
                    left: mousePosition.x - 12,
                    top: mousePosition.y - 12,
                    transition: 'all 0.1s ease-out'
                }}
            />

            {/* Header */}
            <header className="relative z-10">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
                                <Rocket className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">Fênix Dev Academy</span>
                        </div>

                        <div className="flex items-center space-x-6">
                            <button className="relative p-2 text-white hover:text-purple-300 transition-colors">
                                <Bell className="h-6 w-6" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    3
                                </span>
                            </button>

                            <div className="flex items-center space-x-3">
                                <div className="text-right">
                                    <div className="text-white font-medium">Carlos Silva</div>
                                    <div className="text-gray-400 text-sm">Nível 8 - Desenvolvedor</div>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                    CS
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Bem-vindo de volta, Carlos! 👋
                    </h1>
                    <p className="text-xl text-gray-300">
                        Continue sua jornada de transformação profissional
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`bg-gradient-to-r ${stat.color} rounded-lg p-3`}>
                                    <stat.icon className="h-8 w-8 text-white" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.change}</div>
                                </div>
                            </div>
                            <h3 className="text-white font-medium">{stat.title}</h3>
                        </div>
                    ))}
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Recent Courses */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Cursos em Andamento</h2>
                                <button className="text-purple-300 hover:text-purple-200 transition-colors">
                                    Ver todos
                                </button>
                            </div>

                            <div className="space-y-4">
                                {recentCourses.map((course) => (
                                    <div key={course.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                        <div className="flex items-start space-x-4">
                                            <div className={`bg-gradient-to-r ${course.color} rounded-lg p-3`}>
                                                <BookOpen className="h-8 w-8 text-white" />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-lg font-bold text-white">{course.title}</h3>
                                                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                                                        {course.difficulty}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-3 mb-3">
                                                    <div className="text-sm">{course.avatar}</div>
                                                    <span className="text-gray-300 text-sm">{course.instructor}</span>
                                                    <span className="text-gray-400 text-sm">•</span>
                                                    <span className="text-gray-300 text-sm">{course.timeLeft}</span>
                                                </div>

                                                <div className="mb-3">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm text-gray-300">Progresso</span>
                                                        <span className="text-sm text-white font-medium">{course.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-white/10 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${course.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-400">Próxima: {course.nextLesson}</span>
                                                    <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                                                        <Play className="inline h-4 w-4 mr-2" />
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

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Achievements */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-4">Conquistas</h3>
                            <div className="space-y-3">
                                {achievements.map((achievement) => (
                                    <div key={achievement.id} className="flex items-center space-x-3">
                                        <div className={`bg-gradient-to-r ${achievement.color} rounded-lg p-2 ${achievement.earned ? 'opacity-100' : 'opacity-50'
                                            }`}>
                                            <achievement.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-medium text-sm">{achievement.title}</div>
                                            <div className="text-gray-400 text-xs">{achievement.description}</div>
                                            {achievement.earned ? (
                                                <div className="text-green-400 text-xs">{achievement.date}</div>
                                            ) : (
                                                <div className="text-gray-500 text-xs">
                                                    {achievement.progress}/5 progresso
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-4">Próximos Eventos</h3>
                            <div className="space-y-3">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="flex items-center space-x-3">
                                        <div className={`bg-gradient-to-r ${event.color} rounded-lg p-2`}>
                                            <Calendar className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-medium text-sm">{event.title}</div>
                                            <div className="text-gray-400 text-xs">{event.instructor}</div>
                                            <div className="text-purple-300 text-xs">{event.time}</div>
                                        </div>
                                        <span className="bg-white/10 text-white px-2 py-1 rounded-full text-xs">
                                            {event.type}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-4">Ações Rápidas</h3>
                            <div className="space-y-3">
                                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                                    <Code className="inline h-5 w-5 mr-2" />
                                    Novo Projeto
                                </button>
                                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-white/20">
                                    <BookOpen className="inline h-5 w-5 mr-2" />
                                    Explorar Cursos
                                </button>
                                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-white/20">
                                    <Users className="inline h-5 w-5 mr-2" />
                                    Comunidade
                                </button>
                                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-white/20">
                                    <MessageCircle className="inline h-5 w-5 mr-2" />
                                    Suporte
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}