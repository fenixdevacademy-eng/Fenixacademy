"use client";

import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    Clock,
    Target,
    Award,
    BookOpen,
    Code,
    Brain,
    Zap,
    Calendar,
    BarChart3,
    PieChart,
    Activity
} from 'lucide-react';

interface LearningData {
    totalHours: number;
    weeklyHours: number;
    dailyAverage: number;
    streak: number;
    coursesCompleted: number;
    lessonsCompleted: number;
    exercisesCompleted: number;
    accuracy: number;
    speed: number;
    focus: number;
}

interface WeeklyProgress {
    day: string;
    hours: number;
    lessons: number;
    exercises: number;
}

interface SkillProgress {
    skill: string;
    level: number;
    progress: number;
    hours: number;
    nextMilestone: string;
}

interface LearningPattern {
    bestTime: string;
    mostProductiveDay: string;
    averageSession: number;
    preferredContent: string;
    difficultyPreference: string;
}

export default function AdvancedAnalytics() {
    const [activeView, setActiveView] = useState<'overview' | 'detailed' | 'patterns'>('overview');
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

    const [learningData, setLearningData] = useState<LearningData>({
        totalHours: 127,
        weeklyHours: 12,
        dailyAverage: 1.8,
        streak: 7,
        coursesCompleted: 3,
        lessonsCompleted: 45,
        exercisesCompleted: 127,
        accuracy: 87,
        speed: 1.2,
        focus: 92
    });

    const [weeklyData, setWeeklyData] = useState<WeeklyProgress[]>([
        { day: 'Seg', hours: 2.5, lessons: 3, exercises: 8 },
        { day: 'Ter', hours: 1.8, lessons: 2, exercises: 5 },
        { day: 'Qua', hours: 3.2, lessons: 4, exercises: 12 },
        { day: 'Qui', hours: 2.1, lessons: 2, exercises: 6 },
        { day: 'Sex', hours: 2.8, lessons: 3, exercises: 9 },
        { day: 'Sáb', hours: 1.5, lessons: 1, exercises: 4 },
        { day: 'Dom', hours: 0.8, lessons: 1, exercises: 2 }
    ]);

    const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([
        { skill: 'JavaScript', level: 8, progress: 75, hours: 45, nextMilestone: 'Async/Await Master' },
        { skill: 'React', level: 6, progress: 60, hours: 32, nextMilestone: 'Hooks Expert' },
        { skill: 'Node.js', level: 4, progress: 40, hours: 18, nextMilestone: 'API Development' },
        { skill: 'Python', level: 7, progress: 85, hours: 28, nextMilestone: 'Data Science' },
        { skill: 'TypeScript', level: 5, progress: 50, hours: 22, nextMilestone: 'Advanced Types' }
    ]);

    const [learningPatterns, setLearningPatterns] = useState<LearningPattern>({
        bestTime: '14:00 - 16:00',
        mostProductiveDay: 'Quarta-feira',
        averageSession: 45,
        preferredContent: 'Exercícios Práticos',
        difficultyPreference: 'Intermediário'
    });

    const getPerformanceColor = (value: number, type: 'percentage' | 'hours' | 'count') => {
        if (type === 'percentage') {
            if (value >= 90) return 'text-green-600';
            if (value >= 70) return 'text-yellow-600';
            return 'text-red-600';
        }
        if (type === 'hours') {
            if (value >= 2) return 'text-green-600';
            if (value >= 1) return 'text-yellow-600';
            return 'text-red-600';
        }
        return 'text-blue-600';
    }

    const getSkillLevelColor = (level: number) => {
        if (level >= 8) return 'bg-green-500';
        if (level >= 6) return 'bg-blue-500';
        if (level >= 4) return 'bg-yellow-500';
        return 'bg-red-500';
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">Analytics Avançado</h2>
                        <p className="opacity-90">Acompanhe seu progresso e otimize seu aprendizado</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value as any)}
                            className="bg-white/20 text-white rounded-lg px-3 py-2 border-0"
                        >
                            <option value="7d">Últimos 7 dias</option>
                            <option value="30d">Últimos 30 dias</option>
                            <option value="90d">Últimos 90 dias</option>
                            <option value="1y">Último ano</option>
                        </select>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-white/20 rounded-lg p-1">
                    <button
                        onClick={() => setActiveView('overview')}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeView === 'overview' ? 'bg-white text-indigo-600' : 'text-white'
                            }`}
                    >
                        <BarChart3 className="w-4 h-4 inline mr-2" />
                        Visão Geral
                    </button>
                    <button
                        onClick={() => setActiveView('detailed')}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeView === 'detailed' ? 'bg-white text-indigo-600' : 'text-white'
                            }`}
                    >
                        <PieChart className="w-4 h-4 inline mr-2" />
                        Detalhado
                    </button>
                    <button
                        onClick={() => setActiveView('patterns')}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeView === 'patterns' ? 'bg-white text-indigo-600' : 'text-white'
                            }`}
                    >
                        <Activity className="w-4 h-4 inline mr-2" />
                        Padrões
                    </button>
                </div>
            </div>

            {/* Visão Geral */}
            {activeView === 'overview' && (
                <div className="space-y-6">
                    {/* Métricas Principais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <Clock className="w-8 h-8 text-blue-500" />
                                <span className="text-2xl font-bold text-gray-900">{learningData.totalHours}h</span>
                            </div>
                            <p className="text-sm text-gray-600">Total de Estudo</p>
                            <div className="mt-2 text-sm text-green-600">+{learningData.weeklyHours}h esta semana</div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <Target className="w-8 h-8 text-green-500" />
                                <span className="text-2xl font-bold text-gray-900">{learningData.accuracy}%</span>
                            </div>
                            <p className="text-sm text-gray-600">Precisão</p>
                            <div className="mt-2 text-sm text-green-600">Excelente performance!</div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <Zap className="w-8 h-8 text-yellow-500" />
                                <span className="text-2xl font-bold text-gray-900">{learningData.streak}</span>
                            </div>
                            <p className="text-sm text-gray-600">Sequência (dias)</p>
                            <div className="mt-2 text-sm text-green-600">Mantendo o ritmo!</div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <Award className="w-8 h-8 text-purple-500" />
                                <span className="text-2xl font-bold text-gray-900">{learningData.coursesCompleted}</span>
                            </div>
                            <p className="text-sm text-gray-600">Cursos Concluídos</p>
                            <div className="mt-2 text-sm text-blue-600">Continue assim!</div>
                        </div>
                    </div>

                    {/* Gráfico Semanal */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Atividade Semanal</h3>
                        <div className="space-y-4">
                            {weeklyData.map((day, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-24 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${(day.hours / 4) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-medium">{day.hours}h</span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {day.lessons} aulas • {day.exercises} exercícios
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Visão Detalhada */}
            {activeView === 'detailed' && (
                <div className="space-y-6">
                    {/* Progresso por Habilidade */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Progresso por Habilidade</h3>
                        <div className="space-y-4">
                            {skillProgress.map((skill, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900">{skill.skill}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">Nível {skill.level}</span>
                                            <div className={`w-3 h-3 rounded-full ${getSkillLevelColor(skill.level)}`}></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${skill.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium">{skill.progress}%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>{skill.hours}h estudadas</span>
                                        <span>Próximo: {skill.nextMilestone}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Métricas de Performance */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <Brain className="w-6 h-6 text-purple-500" />
                                <span className="font-semibold">Foco</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{learningData.focus}%</div>
                            <div className="text-sm text-gray-600">Tempo focado vs distraído</div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <Zap className="w-6 h-6 text-yellow-500" />
                                <span className="font-semibold">Velocidade</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{learningData.speed}x</div>
                            <div className="text-sm text-gray-600">Velocidade de aprendizado</div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <BookOpen className="w-6 h-6 text-green-500" />
                                <span className="font-semibold">Conteúdo</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{learningData.lessonsCompleted}</div>
                            <div className="text-sm text-gray-600">Aulas concluídas</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Padrões de Aprendizado */}
            {activeView === 'patterns' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Padrões de Estudo</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Melhor horário:</span>
                                    <span className="font-semibold">{learningPatterns.bestTime}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Dia mais produtivo:</span>
                                    <span className="font-semibold">{learningPatterns.mostProductiveDay}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Sessão média:</span>
                                    <span className="font-semibold">{learningPatterns.averageSession} min</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Conteúdo preferido:</span>
                                    <span className="font-semibold">{learningPatterns.preferredContent}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Dificuldade ideal:</span>
                                    <span className="font-semibold">{learningPatterns.difficultyPreference}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Recomendações IA</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>💡 Dica:</strong> Você é mais produtivo às 14h. Agende suas sessões de estudo nesse horário.
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        <strong>🎯 Meta:</strong> Aumente sua sequência para 14 dias e ganhe 200 pontos extras!
                                    </p>
                                </div>
                                <div className="p-3 bg-yellow-50 rounded-lg">
                                    <p className="text-sm text-yellow-800">
                                        <strong>⚡ Otimização:</strong> Tente exercícios mais desafiadores para melhorar sua precisão.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}




