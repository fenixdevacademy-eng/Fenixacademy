'use client';

import React, { useState } from 'react';
import {
    BookOpen,
    Target,
    Trophy,
    Clock,
    TrendingUp,
    Star,
    Play,
    CheckCircle,
    Award,
    Zap,
    Brain,
    Code,
    Users,
    Calendar,
    BarChart3
} from 'lucide-react';
import { useExpandedDashboard } from '@/hooks/useExpandedContent';
import Link from 'next/link';
import FenixLogo from '@/components/FenixLogo';

export default function ExpandedDashboardPage() {
    const { dashboard, loading, error } = useExpandedDashboard();
    const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'achievements'>('overview');

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="animate-pulse">
                    <div className="h-32 bg-gray-300"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="h-64 bg-gray-300 rounded-lg"></div>
                            <div className="h-64 bg-gray-300 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !dashboard) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar dashboard</h2>
                    <p className="text-gray-600 mb-6">{error || 'Não foi possível carregar os dados'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    const getStreakColor = (streak: number) => {
        if (streak >= 30) return 'text-red-600';
        if (streak >= 14) return 'text-orange-600';
        if (streak >= 7) return 'text-yellow-600';
        return 'text-green-600';
    }

    const getProgressColor = (percentage: number) => {
        if (percentage >= 80) return 'text-green-600';
        if (percentage >= 60) return 'text-yellow-600';
        if (percentage >= 40) return 'text-orange-600';
        return 'text-red-600';
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="mb-4">
                                <FenixLogo size="lg" variant="full" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                🚀 Dashboard Expandido
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Acompanhe seu progresso nos cursos expandidos
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-sm text-gray-600">Bem-vindo,</div>
                                <div className="font-semibold text-gray-900">
                                    {dashboard.user.first_name} {dashboard.user.last_name}
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {dashboard.user.first_name.charAt(0)}{dashboard.user.last_name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {dashboard.progress.total_courses_enrolled}
                                </div>
                                <div className="text-sm text-gray-600">Cursos Inscritos</div>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-600 font-medium">
                                +{dashboard.progress.total_courses_completed} concluídos
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {dashboard.progress.total_lessons_completed}
                                </div>
                                <div className="text-sm text-gray-600">Aulas Concluídas</div>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <Target className="w-4 h-4 text-blue-500 mr-1" />
                            <span className="text-blue-600 font-medium">
                                {dashboard.progress.total_exercises_completed} exercícios
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className={`text-2xl font-bold ${getStreakColor(dashboard.progress.current_streak)}`}>
                                    {dashboard.progress.current_streak}
                                </div>
                                <div className="text-sm text-gray-600">Dias de Sequência</div>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Zap className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <Calendar className="w-4 h-4 text-orange-500 mr-1" />
                            <span className="text-orange-600 font-medium">
                                Mantenha o ritmo!
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {dashboard.progress.total_study_hours}h
                                </div>
                                <div className="text-sm text-gray-600">Horas de Estudo</div>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <BarChart3 className="w-4 h-4 text-purple-500 mr-1" />
                            <span className="text-purple-600 font-medium">
                                Tempo bem investido!
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-lg mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
                                { id: 'progress', label: 'Progresso', icon: TrendingUp },
                                { id: 'achievements', label: 'Conquistas', icon: Trophy },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Recent Courses */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Cursos Recentes
                                    </h3>
                                    <div className="space-y-4">
                                        {dashboard.recent_courses.map((course) => (
                                            <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                                                        {course.title.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{course.title}</div>
                                                        <div className="text-sm text-gray-600">
                                                            {course.completed_lessons}/{course.total_lessons} aulas
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`font-semibold ${getProgressColor(course.progress)}`}>
                                                        {course.progress}%
                                                    </div>
                                                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${course.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Expanded Courses */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Cursos Expandidos
                                    </h3>
                                    <div className="space-y-4">
                                        {dashboard.expanded_courses.map((course) => (
                                            <Link
                                                key={course.slug}
                                                href={`/expanded-course/${course.slug}`}
                                                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-200"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                                                        {course.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{course.name}</div>
                                                        <div className="text-sm text-gray-600">
                                                            {course.is_enrolled ? 'Inscrito' : 'Disponível'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {course.is_enrolled && (
                                                        <div className="text-sm text-gray-600">
                                                            {course.progress_percentage}%
                                                        </div>
                                                    )}
                                                    <Play className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'progress' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-blue-50 rounded-lg p-6 text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">
                                            {dashboard.progress.total_courses_completed}
                                        </div>
                                        <div className="text-blue-800 font-medium">Cursos Concluídos</div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-6 text-center">
                                        <div className="text-3xl font-bold text-green-600 mb-2">
                                            {dashboard.progress.total_lessons_completed}
                                        </div>
                                        <div className="text-green-800 font-medium">Aulas Concluídas</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-6 text-center">
                                        <div className="text-3xl font-bold text-purple-600 mb-2">
                                            {dashboard.progress.total_exercises_completed}
                                        </div>
                                        <div className="text-purple-800 font-medium">Exercícios Concluídos</div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 mb-4">Tempo de Estudo</h4>
                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {dashboard.progress.total_study_hours} horas
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Média de {Math.round(dashboard.progress.total_study_hours / Math.max(dashboard.progress.total_courses_enrolled, 1))}h por curso
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {dashboard.recent_achievements.map((achievement) => (
                                        <div key={achievement.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                                                    <Award className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{achievement.title}</div>
                                                    <div className="text-sm text-gray-600">{achievement.type}</div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-3">{achievement.description}</p>
                                            <div className="text-xs text-gray-500">
                                                Conquistado em {new Date(achievement.earned_at).toLocaleDateString('pt-BR')}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {dashboard.recent_achievements.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🏆</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Nenhuma conquista ainda
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Complete cursos e exercícios para desbloquear conquistas!
                                        </p>
                                        <Link
                                            href="/expanded-courses"
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Explorar Cursos
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href="/expanded-courses"
                            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            <BookOpen className="w-6 h-6 text-blue-600" />
                            <div>
                                <div className="font-medium text-gray-900">Explorar Cursos</div>
                                <div className="text-sm text-gray-600">Descubra novos conteúdos</div>
                            </div>
                        </Link>

                        <Link
                            href="/my-courses"
                            className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        >
                            <Play className="w-6 h-6 text-green-600" />
                            <div>
                                <div className="font-medium text-gray-900">Continuar Aprendendo</div>
                                <div className="text-sm text-gray-600">Retome seus cursos</div>
                            </div>
                        </Link>

                        <Link
                            href="/certificates"
                            className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                            <Trophy className="w-6 h-6 text-purple-600" />
                            <div>
                                <div className="font-medium text-gray-900">Ver Certificados</div>
                                <div className="text-sm text-gray-600">Suas conquistas</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


