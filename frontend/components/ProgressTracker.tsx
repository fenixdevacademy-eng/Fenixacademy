'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, TrendingUp, Award, Zap, Flame, Crown } from 'lucide-react';

interface ProgressData {
    totalCourses: number;
    completedCourses: number;
    totalLessons: number;
    completedLessons: number;
    totalModules: number;
    completedModules: number;
    currentStreak: number;
    longestStreak: number;
    totalStudyTime: number; // em minutos
    achievements: Achievement[];
    level: number;
    experience: number;
    nextLevelExp: number;
}

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: Date;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ProgressTrackerProps {
    className?: string;
}

export default function ProgressTracker({ className = '' }: ProgressTrackerProps) {
    const [progress, setProgress] = useState<ProgressData>({
        totalCourses: 20,
        completedCourses: 0,
        totalLessons: 1300,
        completedLessons: 0,
        totalModules: 200,
        completedModules: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalStudyTime: 0,
        achievements: [],
        level: 1,
        experience: 0,
        nextLevelExp: 100
    });

    // Simula dados de progresso (em produção viria do backend)
    useEffect(() => {
        const mockProgress: ProgressData = {
            totalCourses: 20,
            completedCourses: 3,
            totalLessons: 1300,
            completedLessons: 195,
            totalModules: 200,
            completedModules: 30,
            currentStreak: 7,
            longestStreak: 15,
            totalStudyTime: 2340, // 39 horas
            achievements: [
                {
                    id: 'first-course',
                    name: 'Primeiro Passo',
                    description: 'Completou seu primeiro curso',
                    icon: '🎯',
                    unlockedAt: new Date('2024-12-01'),
                    rarity: 'common'
                },
                {
                    id: 'week-streak',
                    name: 'Semana Consistente',
                    description: 'Estudou por 7 dias seguidos',
                    icon: '🔥',
                    unlockedAt: new Date('2024-12-07'),
                    rarity: 'rare'
                },
                {
                    id: 'speed-learner',
                    name: 'Aprendiz Veloz',
                    description: 'Completou 3 cursos em um mês',
                    icon: '⚡',
                    unlockedAt: new Date('2024-12-15'),
                    rarity: 'epic'
                }
            ],
            level: 8,
            experience: 750,
            nextLevelExp: 1000
        };

        setProgress(mockProgress);
    }, []);

    // Calcula porcentagens
    const courseProgress = (progress.completedCourses / progress.totalCourses) * 100;
    const lessonProgress = (progress.completedLessons / progress.totalLessons) * 100;
    const moduleProgress = (progress.completedModules / progress.totalModules) * 100;
    const levelProgress = (progress.experience / progress.nextLevelExp) * 100;

    // Formata tempo de estudo
    const formatStudyTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}min`;
        }
        return `${mins}min`;
    };

    // Raridade das conquistas
    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'text-gray-600 bg-gray-100';
            case 'rare': return 'text-blue-600 bg-blue-100';
            case 'epic': return 'text-purple-600 bg-purple-100';
            case 'legendary': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    // Ícones de nível
    const getLevelIcon = (level: number) => {
        if (level >= 50) return <Crown className="h-6 w-6 text-yellow-500" />;
        if (level >= 30) return <Flame className="h-6 w-6 text-orange-500" />;
        if (level >= 20) return <Zap className="h-6 w-6 text-yellow-500" />;
        if (level >= 10) return <Star className="h-6 w-6 text-blue-500" />;
        return <Target className="h-6 w-6 text-green-500" />;
    };

    return (
        <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Seu Progresso</h2>
                <div className="flex items-center space-x-2">
                    {getLevelIcon(progress.level)}
                    <span className="text-lg font-semibold text-gray-700">
                        Nível {progress.level}
                    </span>
                </div>
            </div>

            {/* Barra de Experiência */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Experiência</span>
                    <span className="text-sm text-gray-500">
                        {progress.experience} / {progress.nextLevelExp} XP
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${levelProgress}%` }}
                    />
                </div>
            </div>

            {/* Estatísticas Principais */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Cursos */}
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                        {progress.completedCourses}/{progress.totalCourses}
                    </div>
                    <div className="text-sm text-blue-700">Cursos</div>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${courseProgress}%` }}
                        />
                    </div>
                </div>

                {/* Módulos */}
                <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                        {progress.completedModules}/{progress.totalModules}
                    </div>
                    <div className="text-sm text-green-700">Módulos</div>
                    <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                        <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${moduleProgress}%` }}
                        />
                    </div>
                </div>

                {/* Lições */}
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                        {progress.completedLessons}/{progress.totalLessons}
                    </div>
                    <div className="text-sm text-purple-700">Lições</div>
                    <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${lessonProgress}%` }}
                        />
                    </div>
                </div>

                {/* Tempo de Estudo */}
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                        {formatStudyTime(progress.totalStudyTime)}
                    </div>
                    <div className="text-sm text-orange-700">Tempo Total</div>
                </div>
            </div>

            {/* Streaks e Conquistas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Streaks */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <Flame className="h-5 w-5 text-orange-500 mr-2" />
                        Sequência de Estudos
                    </h3>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Sequência Atual</span>
                            <span className="text-lg font-bold text-orange-600">
                                {progress.currentStreak} dias
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Melhor Sequência</span>
                            <span className="text-lg font-bold text-yellow-600">
                                {progress.longestStreak} dias
                            </span>
                        </div>
                    </div>

                    {/* Visualização da sequência */}
                    <div className="mt-4 flex space-x-1">
                        {Array.from({ length: 7 }, (_, i) => (
                            <div
                                key={i}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i < progress.currentStreak
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-200 text-gray-400'
                                    }`}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conquistas */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                        Conquistas ({progress.achievements.length})
                    </h3>

                    <div className="space-y-2 max-h-32 overflow-y-auto">
                        {progress.achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="flex items-center space-x-3 p-2 bg-white rounded-lg border border-gray-200"
                            >
                                <span className="text-2xl">{achievement.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900 truncate">
                                        {achievement.name}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {achievement.description}
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                                    {achievement.rarity}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Próximas Metas */}
            <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Próximas Metas
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold mb-1">
                            {progress.totalCourses - progress.completedCourses}
                        </div>
                        <div className="text-sm opacity-90">Cursos Restantes</div>
                    </div>

                    <div className="text-center">
                        <div className="text-2xl font-bold mb-1">
                            {progress.nextLevelExp - progress.experience}
                        </div>
                        <div className="text-sm opacity-90">XP para Próximo Nível</div>
                    </div>

                    <div className="text-center">
                        <div className="text-2xl font-bold mb-1">
                            {Math.max(0, 10 - progress.currentStreak)}
                        </div>
                        <div className="text-sm opacity-90">Dias para 10 Dias</div>
                    </div>
                </div>
            </div>

            {/* Dicas de Progresso */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">💡 Dica para Acelerar</h4>
                <p className="text-sm text-gray-600">
                    {progress.currentStreak >= 5
                        ? 'Excelente! Mantenha a consistência para desbloquear mais conquistas.'
                        : 'Estude por 5 dias seguidos para desbloquear a conquista "Consistente"!'
                    }
                </p>
            </div>
        </div>
    );
}
