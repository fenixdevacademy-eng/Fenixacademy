'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    TrendingUp,
    BarChart3,
    Target,
    Award,
    Clock,
    BookOpen,
    Calendar,
    Star,
    Trophy,
    Flame,
    Zap,
    Brain,
    Code,
    Globe,
    Shield,
    Users,
    MessageCircle,
    Settings,
    Bell,
    User,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    CheckCircle,
    Circle,
    Play,
    Download,
    Share,
    Eye,
    Filter,
    Search,
    Grid,
    List,
    Activity,
    PieChart,
    LineChart,
    TrendingDown,
    Minus,
    Plus
} from 'lucide-react';

export default function ProgressPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const progressData = {
        totalCourses: 15,
        completedCourses: 8,
        inProgressCourses: 7,
        totalHours: 156,
        completedHours: 89,
        currentStreak: 12,
        longestStreak: 28,
        totalPoints: 2450,
        certificates: 3,
        achievements: 12,
        rank: 'Desenvolvedor Sênior',
        level: 5,
        nextLevelPoints: 3000,
        currentLevelPoints: 2450
    }

    const tabs = [
        { id: 'overview', label: 'Visão Geral', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'courses', label: 'Cursos', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'achievements', label: 'Conquistas', icon: <Award className="w-4 h-4" /> },
        { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
    ];

    const levelProgress = (progressData.currentLevelPoints / progressData.nextLevelPoints) * 100;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link href="/" className="flex items-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-2xl font-bold">
                                <span className="text-blue-500">FENIX</span> PROGRESS
                            </span>
                        </Link>
                        <nav className="hidden lg:flex space-x-8">
                            <Link href="/dashboard" className="text-white hover:text-blue-400">Dashboard</Link>
                            <Link href="/courses" className="text-white hover:text-blue-400">Cursos</Link>
                            <Link href="/ide-advanced" className="text-white hover:text-blue-400">IDE</Link>
                            <Link href="/progress" className="text-blue-400 font-semibold">Progresso</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-400 hover:text-white">
                                <Bell className="w-5 h-5" />
                            </button>
                            <Link href="/profile" className="text-white hover:text-blue-400">Perfil</Link>
                            <Link href="/settings" className="text-white hover:text-blue-400">Configurações</Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Meu Progresso</h1>
                    <p className="text-gray-400">
                        Acompanhe sua jornada de aprendizado e conquiste seus objetivos
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Cursos Concluídos</p>
                                <p className="text-2xl font-bold text-white">{progressData.completedCourses}</p>
                                <p className="text-xs text-gray-400">de {progressData.totalCourses} cursos</p>
                            </div>
                            <BookOpen className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Horas Estudadas</p>
                                <p className="text-2xl font-bold text-white">{progressData.completedHours}</p>
                                <p className="text-xs text-gray-400">de {progressData.totalHours} horas</p>
                            </div>
                            <Clock className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Sequência Atual</p>
                                <p className="text-2xl font-bold text-white">{progressData.currentStreak}</p>
                                <p className="text-xs text-gray-400">dias consecutivos</p>
                            </div>
                            <Flame className="w-8 h-8 text-orange-500" />
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Nível Atual</p>
                                <p className="text-2xl font-bold text-white">{progressData.level}</p>
                                <p className="text-xs text-gray-400">{progressData.rank}</p>
                            </div>
                            <Trophy className="w-8 h-8 text-yellow-500" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Navegação</h3>
                            <div className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                                            }`}
                                    >
                                        {tab.icon}
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Level Progress */}
                                <div className="bg-gray-800 rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Progresso do Nível</h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-2xl font-bold text-white">Nível {progressData.level}</p>
                                            <p className="text-gray-400">{progressData.rank}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-400">Próximo nível em</p>
                                            <p className="text-lg font-semibold text-blue-400">
                                                {progressData.nextLevelPoints - progressData.currentLevelPoints} pontos
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-600 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                                            style={{ width: `${levelProgress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-800 rounded-xl p-6">
                                        <h4 className="text-lg font-semibold text-white mb-4">Conquistas</h4>
                                        <div className="flex items-center justify-between">
                                            <div className="text-3xl font-bold text-yellow-500">{progressData.achievements}</div>
                                            <Award className="w-8 h-8 text-yellow-500" />
                                        </div>
                                    </div>
                                    <div className="bg-gray-800 rounded-xl p-6">
                                        <h4 className="text-lg font-semibold text-white mb-4">Certificados</h4>
                                        <div className="flex items-center justify-between">
                                            <div className="text-3xl font-bold text-green-500">{progressData.certificates}</div>
                                            <Trophy className="w-8 h-8 text-green-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'courses' && (
                            <div className="bg-gray-800 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6">Progresso dos Cursos</h3>
                                <div className="text-center py-12">
                                    <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h4 className="text-lg font-semibold text-white mb-2">Cursos em Progresso</h4>
                                    <p className="text-gray-400 mb-6">
                                        Seus cursos aparecerão aqui conforme você progride
                                    </p>
                                    <Link
                                        href="/my-courses"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Ver Meus Cursos
                                    </Link>
                                </div>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div className="bg-gray-800 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6">Conquistas</h3>
                                <div className="text-center py-12">
                                    <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h4 className="text-lg font-semibold text-white mb-2">Suas Conquistas</h4>
                                    <p className="text-gray-400 mb-6">
                                        Conquistas desbloqueadas aparecerão aqui
                                    </p>
                                    <div className="text-3xl font-bold text-yellow-500 mb-2">{progressData.achievements}</div>
                                    <p className="text-gray-400">Conquistas desbloqueadas</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="bg-gray-800 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6">Analytics</h3>
                                <div className="text-center py-12">
                                    <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h4 className="text-lg font-semibold text-white mb-2">Análises Detalhadas</h4>
                                    <p className="text-gray-400 mb-6">
                                        Gráficos e estatísticas detalhadas em breve
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                        <div className="bg-gray-700 rounded-lg p-4">
                                            <div className="text-2xl font-bold text-blue-400">{progressData.completedHours}h</div>
                                            <div className="text-sm text-gray-400">Estudadas</div>
                                        </div>
                                        <div className="bg-gray-700 rounded-lg p-4">
                                            <div className="text-2xl font-bold text-green-400">{progressData.currentStreak}</div>
                                            <div className="text-sm text-gray-400">Dias seguidos</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                <button className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                </button>
                <button className="bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}