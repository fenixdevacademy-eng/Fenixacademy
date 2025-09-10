'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Calendar,
    Clock,
    Target,
    Award,
    BookOpen,
    CheckCircle,
    PlayCircle,
    BarChart3,
    PieChart,
    Activity,
    Zap,
    Star,
    Trophy,
    Medal,
    Flame,
    ArrowUp,
    ArrowDown,
    Minus
} from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';

interface ProgressData {
    id: string;
    course: string;
    instructor: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    timeSpent: number;
    estimatedTime: number;
    lastAccessed: string;
    status: 'not-started' | 'in-progress' | 'completed' | 'paused';
    grade: number;
    streak: number;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    startDate: string;
    endDate?: string;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
    points: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface WeeklyStats {
    week: string;
    hoursStudied: number;
    lessonsCompleted: number;
    streak: number;
    achievements: number;
}

const mockProgressData: ProgressData[] = [
    {
        id: '1',
        course: 'Desenvolvimento Web Completo',
        instructor: 'Prof. João Silva',
        progress: 85,
        totalLessons: 40,
        completedLessons: 34,
        timeSpent: 45,
        estimatedTime: 60,
        lastAccessed: '2024-01-15',
        status: 'in-progress',
        grade: 92,
        streak: 7,
        level: 'advanced',
        category: 'Desenvolvimento',
        difficulty: 'hard',
        startDate: '2024-01-01'
    },
    {
        id: '2',
        course: 'Python para Data Science',
        instructor: 'Prof. Maria Santos',
        progress: 100,
        totalLessons: 25,
        completedLessons: 25,
        timeSpent: 30,
        estimatedTime: 30,
        lastAccessed: '2024-01-14',
        status: 'completed',
        grade: 88,
        streak: 0,
        level: 'intermediate',
        category: 'Data Science',
        difficulty: 'medium',
        startDate: '2024-01-01',
        endDate: '2024-01-14'
    },
    {
        id: '3',
        course: 'Fundamentos de UI/UX Design',
        instructor: 'Prof. Ana Costa',
        progress: 60,
        totalLessons: 20,
        completedLessons: 12,
        timeSpent: 15,
        estimatedTime: 25,
        lastAccessed: '2024-01-13',
        status: 'in-progress',
        grade: 0,
        streak: 3,
        level: 'intermediate',
        category: 'Design',
        difficulty: 'medium',
        startDate: '2024-01-05'
    },
    {
        id: '4',
        course: 'DevOps e Cloud Computing',
        instructor: 'Prof. Carlos Lima',
        progress: 0,
        totalLessons: 30,
        completedLessons: 0,
        timeSpent: 0,
        estimatedTime: 40,
        lastAccessed: '',
        status: 'not-started',
        grade: 0,
        streak: 0,
        level: 'advanced',
        category: 'DevOps',
        difficulty: 'hard',
        startDate: '2024-01-20'
    }
];

const mockAchievements: Achievement[] = [
    {
        id: '1',
        title: 'Primeiro Passo',
        description: 'Complete sua primeira lição',
        icon: '🎯',
        unlockedAt: '2024-01-01',
        points: 10,
        rarity: 'common'
    },
    {
        id: '2',
        title: 'Maratonista',
        description: 'Estude por 7 dias consecutivos',
        icon: '🔥',
        unlockedAt: '2024-01-07',
        points: 50,
        rarity: 'rare'
    },
    {
        id: '3',
        title: 'Perfeccionista',
        description: 'Obtenha 90% ou mais em um curso',
        icon: '⭐',
        unlockedAt: '2024-01-14',
        points: 100,
        rarity: 'epic'
    },
    {
        id: '4',
        title: 'Conquistador',
        description: 'Complete 5 cursos',
        icon: '🏆',
        unlockedAt: '2024-01-15',
        points: 200,
        rarity: 'legendary'
    }
];

const mockWeeklyStats: WeeklyStats[] = [
    { week: '2024-01-01', hoursStudied: 12, lessonsCompleted: 8, streak: 3, achievements: 1 },
    { week: '2024-01-08', hoursStudied: 18, lessonsCompleted: 12, streak: 7, achievements: 2 },
    { week: '2024-01-15', hoursStudied: 15, lessonsCompleted: 10, streak: 5, achievements: 1 },
    { week: '2024-01-22', hoursStudied: 20, lessonsCompleted: 15, streak: 7, achievements: 1 }
];

export default function ProgressPage() {
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const [progressData, setProgressData] = useState<ProgressData[]>(mockProgressData);
    const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
    const [weeklyStats, setWeeklyStats] = useState<WeeklyStats[]>(mockWeeklyStats);
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Calcular estatísticas gerais
    const totalCourses = progressData.length;
    const completedCourses = progressData.filter(course => course.status === 'completed').length;
    const inProgressCourses = progressData.filter(course => course.status === 'in-progress').length;
    const totalHoursStudied = progressData.reduce((sum, course) => sum + course.timeSpent, 0);
    const totalLessonsCompleted = progressData.reduce((sum, course) => sum + course.completedLessons, 0);
    const currentStreak = Math.max(...progressData.map(course => course.streak));
    const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);
    const averageGrade = progressData
        .filter(course => course.grade > 0)
        .reduce((sum, course) => sum + course.grade, 0) /
        progressData.filter(course => course.grade > 0).length;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-100';
            case 'in-progress': return 'text-blue-600 bg-blue-100';
            case 'paused': return 'text-yellow-600 bg-yellow-100';
            case 'not-started': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'in-progress': return <PlayCircle className="w-4 h-4" />;
            case 'paused': return <Clock className="w-4 h-4" />;
            case 'not-started': return <BookOpen className="w-4 h-4" />;
            default: return <BookOpen className="w-4 h-4" />;
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'hard': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'text-gray-600 bg-gray-100';
            case 'rare': return 'text-blue-600 bg-blue-100';
            case 'epic': return 'text-purple-600 bg-purple-100';
            case 'legendary': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const filteredProgressData = selectedCategory === 'all'
        ? progressData
        : progressData.filter(course => course.category === selectedCategory);

    const categories = ['all', ...Array.from(new Set(progressData.map(course => course.category)))];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                Meu Progresso
                            </h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Acompanhe sua evolução e conquistas nos cursos
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Flame className="w-5 h-5 text-orange-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {currentStreak} dias de sequência
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {totalPoints} pontos
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estatísticas Gerais */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <BookOpen className="w-8 h-8 text-blue-500" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cursos Concluídos</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {completedCourses}/{totalCourses}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Clock className="w-8 h-8 text-green-500" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Horas Estudadas</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {totalHoursStudied}h
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Target className="w-8 h-8 text-purple-500" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lições Completas</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {totalLessonsCompleted}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Star className="w-8 h-8 text-yellow-500" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Nota Média</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {averageGrade ? averageGrade.toFixed(1) : '0.0'}%
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Filtros */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <div className="flex space-x-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">Todas as Categorias</option>
                                {categories.slice(1).map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'year')}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="week">Esta Semana</option>
                                <option value="month">Este Mês</option>
                                <option value="year">Este Ano</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Activity className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {inProgressCourses} cursos em andamento
                            </span>
                        </div>
                    </div>
                </div>

                {/* Gráfico de Progresso Semanal */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                        Progresso Semanal
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                                Horas Estudadas
                            </h4>
                            <div className="space-y-3">
                                {weeklyStats.map((stat, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Semana {index + 1}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full"
                                                    style={{ width: `${(stat.hoursStudied / 20) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {stat.hoursStudied}h
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                                Lições Completadas
                            </h4>
                            <div className="space-y-3">
                                {weeklyStats.map((stat, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Semana {index + 1}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full"
                                                    style={{ width: `${(stat.lessonsCompleted / 15) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {stat.lessonsCompleted}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de Cursos */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                        Progresso dos Cursos
                    </h3>
                    <div className="space-y-4">
                        {filteredProgressData.map((course) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {course.course}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Prof. {course.instructor} • {course.category}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                                            {getStatusIcon(course.status)}
                                            <span className="ml-1 capitalize">{course.status}</span>
                                        </span>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                                            {course.difficulty}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Target className="w-4 h-4 text-blue-500" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {course.completedLessons}/{course.totalLessons} lições
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-green-500" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {course.timeSpent}h de {course.estimatedTime}h
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Flame className="w-4 h-4 text-orange-500" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {course.streak} dias de sequência
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Progresso
                                        </span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {course.progress}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {course.grade > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Nota: {course.grade}%
                                        </span>
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(course.grade / 20)
                                                            ? 'text-yellow-400 fill-current'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Conquistas */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                        Conquistas Desbloqueadas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {achievements.map((achievement) => (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="text-4xl mb-3">{achievement.icon}</div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {achievement.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {achievement.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                                        {achievement.rarity}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {achievement.points} pts
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


