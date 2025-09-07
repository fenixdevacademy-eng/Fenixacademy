'use client';

import React, { useState, useEffect } from 'react';

interface AnalyticsEvent {
    id: string;
    userId: string;
    eventType: 'slide_view' | 'quiz_complete' | 'simulator_use' | 'code_execute' | 'project_join';
    elementId: string;
    elementType: string;
    timestamp: Date;
    duration?: number;
    score?: number;
    metadata?: any;
}

interface UserAnalytics {
    userId: string;
    totalEvents: number;
    totalTime: number;
    averageScore: number;
    favoriteElements: string[];
    learningPath: string[];
    engagementScore: number;
}

interface ElementAnalytics {
    elementId: string;
    elementType: string;
    totalViews: number;
    totalCompletions: number;
    averageScore: number;
    averageTime: number;
    userSatisfaction: number;
}

interface InteractiveAnalyticsProps {
    userId?: string;
    showUserStats?: boolean;
    showElementStats?: boolean;
    showTrends?: boolean;
}

export const InteractiveAnalytics: React.FC<InteractiveAnalyticsProps> = ({
    userId = 'user_123',
    showUserStats = true,
    showElementStats = true,
    showTrends = true
}) => {
    const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(null);
    const [elementAnalytics, setElementAnalytics] = useState<ElementAnalytics[]>([]);
    const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

    useEffect(() => {
        // Simular carregamento de analytics
        const loadAnalytics = async () => {
            setLoading(true);

            // Simular dados do usuário
            const mockUserAnalytics: UserAnalytics = {
                userId,
                totalEvents: 156,
                totalTime: 2840, // em minutos
                averageScore: 87,
                favoriteElements: ['quiz_html_basics', 'simulator_css_layout', 'slides_js_fundamentals'],
                learningPath: ['web-fundamentals', 'javascript-basics', 'react-intro'],
                engagementScore: 92
            };

            // Simular dados dos elementos
            const mockElementAnalytics: ElementAnalytics[] = [
                {
                    elementId: 'quiz_html_basics',
                    elementType: 'quiz',
                    totalViews: 245,
                    totalCompletions: 198,
                    averageScore: 85,
                    averageTime: 8.5,
                    userSatisfaction: 4.2
                },
                {
                    elementId: 'simulator_css_layout',
                    elementType: 'simulator',
                    totalViews: 189,
                    totalCompletions: 156,
                    averageScore: 78,
                    averageTime: 15.2,
                    userSatisfaction: 4.5
                },
                {
                    elementId: 'slides_js_fundamentals',
                    elementType: 'slides',
                    totalViews: 312,
                    totalCompletions: 289,
                    averageScore: 91,
                    averageTime: 12.8,
                    userSatisfaction: 4.7
                },
                {
                    elementId: 'code_playground_react',
                    elementType: 'code_playground',
                    totalViews: 167,
                    totalCompletions: 134,
                    averageScore: 82,
                    averageTime: 22.1,
                    userSatisfaction: 4.3
                },
                {
                    elementId: 'project_ecommerce',
                    elementType: 'collaborative_project',
                    totalViews: 98,
                    totalCompletions: 67,
                    averageScore: 88,
                    averageTime: 180.5,
                    userSatisfaction: 4.6
                }
            ];

            // Simular eventos recentes
            const mockRecentEvents: AnalyticsEvent[] = [
                {
                    id: 'evt_1',
                    userId,
                    eventType: 'quiz_complete',
                    elementId: 'quiz_html_basics',
                    elementType: 'quiz',
                    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min atrás
                    score: 90,
                    duration: 420
                },
                {
                    id: 'evt_2',
                    userId,
                    eventType: 'slide_view',
                    elementId: 'slides_js_fundamentals',
                    elementType: 'slides',
                    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 min atrás
                    duration: 180
                },
                {
                    id: 'evt_3',
                    userId,
                    eventType: 'code_execute',
                    elementId: 'code_playground_react',
                    elementType: 'code_playground',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hora atrás
                    duration: 300
                }
            ];

            setUserAnalytics(mockUserAnalytics);
            setElementAnalytics(mockElementAnalytics);
            setRecentEvents(mockRecentEvents);
            setLoading(false);
        };

        loadAnalytics();
    }, [userId, timeRange]);

    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const getEngagementColor = (score: number): string => {
        if (score >= 90) return 'text-green-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getSatisfactionColor = (score: number): string => {
        if (score >= 4.5) return 'text-green-600';
        if (score >= 4.0) return 'text-yellow-600';
        return 'text-red-600';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                <h1 className="text-3xl font-bold mb-2">📊 Analytics dos Elementos Interativos</h1>
                <p className="text-blue-100">
                    Monitore o engajamento e performance dos elementos interativos da plataforma
                </p>
            </div>

            {/* Filtros de Tempo */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Período:</span>
                    <div className="flex space-x-2">
                        {(['day', 'week', 'month'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === range
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {range === 'day' ? 'Hoje' : range === 'week' ? 'Esta Semana' : 'Este Mês'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Estatísticas do Usuário */}
            {showUserStats && userAnalytics && (
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">👤 Seu Progresso</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600">{userAnalytics.totalEvents}</div>
                            <div className="text-sm text-blue-700">Interações Totais</div>
                        </div>

                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl font-bold text-green-600">{formatTime(userAnalytics.totalTime)}</div>
                            <div className="text-sm text-green-700">Tempo Total</div>
                        </div>

                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl font-bold text-purple-600">{userAnalytics.averageScore}%</div>
                            <div className="text-sm text-purple-700">Pontuação Média</div>
                        </div>

                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <div className={`text-3xl font-bold ${getEngagementColor(userAnalytics.engagementScore)}`}>
                                {userAnalytics.engagementScore}%
                            </div>
                            <div className="text-sm text-orange-700">Engajamento</div>
                        </div>
                    </div>

                    {/* Elementos Favoritos */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">⭐ Seus Elementos Favoritos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {userAnalytics.favoriteElements.map((elementId, index) => {
                                const element = elementAnalytics.find(e => e.elementId === elementId);
                                return (
                                    <div key={elementId} className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-2xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</div>
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {element?.elementType || 'Elemento'}
                                                </div>
                                                <div className="text-sm text-gray-600">{elementId}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Caminho de Aprendizado */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🛤️ Seu Caminho de Aprendizado</h3>
                        <div className="flex items-center space-x-4 overflow-x-auto">
                            {userAnalytics.learningPath.map((path, index) => (
                                <div key={path} className="flex items-center">
                                    <div className="p-3 bg-blue-100 rounded-lg text-blue-700 font-medium">
                                        {path.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </div>
                                    {index < userAnalytics.learningPath.length - 1 && (
                                        <div className="mx-2 text-gray-400">→</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Estatísticas dos Elementos */}
            {showElementStats && (
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Performance dos Elementos</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Elemento</th>
                                    <th className="text-center py-3 px-4 font-medium text-gray-700">Visualizações</th>
                                    <th className="text-center py-3 px-4 font-medium text-gray-700">Completamentos</th>
                                    <th className="text-center py-3 px-4 font-medium text-gray-700">Taxa de Sucesso</th>
                                    <th className="text-center py-3 px-4 font-medium text-gray-700">Tempo Médio</th>
                                    <th className="text-center py-3 px-4 font-medium text-gray-700">Satisfação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elementAnalytics.map((element) => {
                                    const completionRate = Math.round((element.totalCompletions / element.totalViews) * 100);
                                    return (
                                        <tr key={element.elementId} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {element.elementId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                    </div>
                                                    <div className="text-sm text-gray-500 capitalize">{element.elementType}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center text-gray-900">{element.totalViews}</td>
                                            <td className="py-4 px-4 text-center text-gray-900">{element.totalCompletions}</td>
                                            <td className="py-4 px-4 text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${completionRate >= 80 ? 'bg-green-100 text-green-800' :
                                                        completionRate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {completionRate}%
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-center text-gray-900">{formatTime(element.averageTime)}</td>
                                            <td className="py-4 px-4 text-center">
                                                <span className={`font-medium ${getSatisfactionColor(element.userSatisfaction)}`}>
                                                    {element.userSatisfaction}/5.0
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Eventos Recentes */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🕒 Atividade Recente</h2>

                <div className="space-y-4">
                    {recentEvents.map((event) => (
                        <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl">
                                {event.eventType === 'quiz_complete' ? '🧠' :
                                    event.eventType === 'slide_view' ? '🎯' :
                                        event.eventType === 'simulator_use' ? '🔬' :
                                            event.eventType === 'code_execute' ? '💻' : '👥'}
                            </div>

                            <div className="flex-1">
                                <div className="font-medium text-gray-900">
                                    {event.eventType === 'quiz_complete' ? 'Quiz Completado' :
                                        event.eventType === 'slide_view' ? 'Slide Visualizado' :
                                            event.eventType === 'simulator_use' ? 'Simulador Utilizado' :
                                                event.eventType === 'code_execute' ? 'Código Executado' : 'Projeto Acessado'}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {event.elementId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-gray-500">
                                    {event.timestamp.toLocaleTimeString()}
                                </div>
                                {event.duration && (
                                    <div className="text-sm text-gray-600">
                                        {formatTime(event.duration)}
                                    </div>
                                )}
                                {event.score && (
                                    <div className="text-sm font-medium text-green-600">
                                        {event.score}%
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Insights e Recomendações */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Insights e Recomendações</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-900 mb-2">🎯 Áreas de Foco</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Continue com os quizzes de HTML - você está indo muito bem!</li>
                            <li>• Experimente mais simuladores para CSS Layout</li>
                            <li>• Participe de projetos colaborativos para ganhar experiência</li>
                        </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-900 mb-2">🚀 Próximos Passos</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Avance para JavaScript Intermediário</li>
                            <li>• Explore React Fundamentals</li>
                            <li>• Complete o projeto de e-commerce</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
