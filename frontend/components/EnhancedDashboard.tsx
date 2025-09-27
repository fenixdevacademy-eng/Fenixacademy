"use client";

import React, { useState } from 'react';
import {
    BookOpen,
    Trophy,
    Users,
    Brain,
    Target,
    Award,
    TrendingUp,
    Calendar,
    Clock,
    Star,
    Zap,
    Shield,
    MessageCircle,
    Video,
    BarChart3,
    PieChart,
    Activity
} from 'lucide-react';
import AITutor from './AITutor';
import GamificationSystem from './GamificationSystem';
import SocialLearning from './SocialLearning';
import AdvancedAnalytics from './AdvancedAnalytics';
import BlockchainCertification from './BlockchainCertification';
import MentorshipSystem from './MentorshipSystem';
import ClientOnly from './ClientOnly';

export default function EnhancedDashboard() {
    const [activeSection, setActiveSection] = useState<'overview' | 'ai' | 'gamification' | 'social' | 'analytics' | 'certification' | 'mentorship'>('overview');

    const quickStats = [
        { title: 'Cursos Concluídos', value: '12', icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Pontos Ganhos', value: '2,450', icon: Trophy, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
        { title: 'Sequência Atual', value: '7 dias', icon: Zap, color: 'text-green-600', bgColor: 'bg-green-100' },
        { title: 'Nível Atual', value: '15', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-100' }
    ];

    const recentActivity = [
        { action: 'Concluiu aula', course: 'React Avançado', time: '2h atrás', points: 50 },
        { action: 'Desbloqueou conquista', course: 'Primeiro Projeto', time: '4h atrás', points: 100 },
        { action: 'Completou exercício', course: 'JavaScript ES6', time: '6h atrás', points: 25 },
        { action: 'Participou de discussão', course: 'Node.js', time: '1d atrás', points: 15 }
    ];

    const upcomingSessions = [
        { title: 'Mentoria com Dr. Ana Costa', time: '14:00', type: 'video_call', mentor: 'Dr. Ana Costa' },
        { title: 'Grupo de Estudo React', time: '16:00', type: 'group', mentor: 'React Masters' },
        { title: 'Code Review Session', time: '18:00', type: 'code_review', mentor: 'Carlos Silva' }
    ];

    const recommendations = [
        { title: 'Continue com React Hooks', description: 'Você está indo muito bem! Próxima aula: Custom Hooks', progress: 75 },
        { title: 'Explore TypeScript', description: 'Baseado no seu progresso, recomendamos TypeScript', progress: 0 },
        { title: 'Participe da Comunidade', description: 'Conecte-se com outros desenvolvedores', progress: 30 }
    ];

    return (
        <ClientOnly fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando Dashboard...</p>
                </div>
            </div>
        }>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-gray-900">Dashboard Fênix</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-sm text-gray-600">
                                    Bem-vindo de volta, <span className="font-semibold">João Silva</span>
                                </div>
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                    JS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Navigation Tabs */}
                    <div className="mb-8">
                        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
                            <button
                                onClick={() => setActiveSection('overview')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeSection === 'overview' ? 'bg-white shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <BarChart3 className="w-4 h-4" />
                                Visão Geral
                            </button>
                            <button
                                onClick={() => setActiveSection('ai')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeSection === 'ai' ? 'bg-white shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <Brain className="w-4 h-4" />
                                IA Tutor
                            </button>
                            <button
                                onClick={() => setActiveSection('gamification')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeSection === 'gamification' ? 'bg-white shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <Trophy className="w-4 h-4" />
                                Gamificação
                            </button>
                            <button
                                onClick={() => setActiveSection('social')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeSection === 'social' ? 'bg-white shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <Users className="w-4 h-4" />
                                Social
                            </button>
                            <button
                                onClick={() => setActiveSection('analytics')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeSection === 'analytics' ? 'bg-white shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <PieChart className="w-4 h-4" />
                                Analytics
                            </button>
                            <button
                                onClick={() => setActiveSection('certification')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeSection === 'certification' ? 'bg-white shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <Shield className="w-4 h-4" />
                                Certificações
                            </button>
                            <button
                                onClick={() => setActiveSection('mentorship')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeSection === 'mentorship' ? 'bg-white shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <MessageCircle className="w-4 h-4" />
                                Mentoria
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    {activeSection === 'overview' && (
                        <div className="space-y-8">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {quickStats.map((stat, index) => (
                                    <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">{stat.title}</p>
                                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                            </div>
                                            <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Recent Activity */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Atividade Recente</h3>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                        <p className="text-xs text-gray-500">{activity.course}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">{activity.time}</p>
                                                    <p className="text-xs text-green-600">+{activity.points} pts</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Upcoming Sessions */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Próximas Sessões</h3>
                                    <div className="space-y-4">
                                        {upcomingSessions.map((session, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-full ${session.type === 'video_call' ? 'bg-blue-100' :
                                                        session.type === 'group' ? 'bg-green-100' :
                                                            'bg-purple-100'
                                                        }`}>
                                                        {session.type === 'video_call' ? <Video className="w-4 h-4 text-blue-600" /> :
                                                            session.type === 'group' ? <Users className="w-4 h-4 text-green-600" /> :
                                                                <MessageCircle className="w-4 h-4 text-purple-600" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{session.title}</p>
                                                        <p className="text-xs text-gray-500">{session.mentor}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900">{session.time}</p>
                                                    <p className="text-xs text-gray-500">Hoje</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Recomendações Personalizadas</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {recommendations.map((rec, index) => (
                                        <div key={index} className="p-4 border rounded-lg">
                                            <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                                            <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${rec.progress}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{rec.progress}% concluído</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'ai' && <AITutor />}
                    {activeSection === 'gamification' && <GamificationSystem />}
                    {activeSection === 'social' && <SocialLearning />}
                    {activeSection === 'analytics' && <AdvancedAnalytics />}
                    {activeSection === 'certification' && <BlockchainCertification />}
                    {activeSection === 'mentorship' && <MentorshipSystem />}
                </div>
            </div>
        </ClientOnly>
    );
}
