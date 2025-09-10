'use client';

import React from 'react';
import { Users, TrendingUp, Star, Award, Clock, CheckCircle, Zap, Crown, BookOpen, Brain } from 'lucide-react';

interface SubscriptionStatsProps {
    className?: string;
}

export function SubscriptionStats({ className = '' }: SubscriptionStatsProps) {
    const stats = [
        {
            icon: Users,
            value: '50,000+',
            label: 'Alunos Ativos',
            description: 'Desenvolvedores transformando suas carreiras',
            color: 'text-blue-500',
            bgColor: 'bg-blue-100 dark:bg-blue-900/20'
        },
        {
            icon: TrendingUp,
            value: '95%',
            label: 'Taxa de Satisfação',
            description: 'Alunos recomendam a Fenix Academy',
            color: 'text-green-500',
            bgColor: 'bg-green-100 dark:bg-green-900/20'
        },
        {
            icon: Star,
            value: '4.9/5',
            label: 'Avaliação Média',
            description: 'Baseada em mais de 10.000 avaliações',
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
        },
        {
            icon: Award,
            value: '85%',
            label: 'Conseguem Emprego',
            description: 'Em até 6 meses após a conclusão',
            color: 'text-purple-500',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20'
        },
        {
            icon: Clock,
            value: '2.5x',
            label: 'Mais Rápido',
            description: 'Aprendizado comparado ao tradicional',
            color: 'text-orange-500',
            bgColor: 'bg-orange-100 dark:bg-orange-900/20'
        },
        {
            icon: CheckCircle,
            value: '99.9%',
            label: 'Uptime',
            description: 'Plataforma sempre disponível',
            color: 'text-green-500',
            bgColor: 'bg-green-100 dark:bg-green-900/20'
        }
    ];

    const features = [
        {
            icon: Brain,
            title: 'IA Superinteligente',
            description: 'Mais de 1 milhão de interações por mês',
            metric: '1M+'
        },
        {
            icon: BookOpen,
            title: 'Cursos Atualizados',
            description: 'Conteúdo sempre atualizado com as últimas tecnologias',
            metric: '100+'
        },
        {
            icon: Zap,
            title: 'Análise de Código',
            description: 'Mais de 500.000 códigos analisados',
            metric: '500K+'
        },
        {
            icon: Crown,
            title: 'Mentores Especialistas',
            description: 'Profissionais de grandes empresas',
            metric: '50+'
        }
    ];

    return (
        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Números que Impressionam
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    A Fenix Academy é a escolha de milhares de desenvolvedores
                </p>
            </div>

            {/* Main Stats */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className={`inline-flex p-4 rounded-full ${stat.bgColor} mb-4`}>
                                    <Icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {stat.description}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Feature Stats */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                        Nossos Recursos em Números
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-3">
                                        <Icon className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {feature.metric}
                                    </div>
                                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {feature.title}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Growth Chart Placeholder */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                        Crescimento da Comunidade
                    </h4>
                    <div className="flex items-end justify-center gap-2 h-32">
                        {[20, 35, 45, 60, 75, 85, 95, 100].map((height, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                                style={{ height: `${height}%`, width: '30px' }}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Crescimento de 300% nos últimos 12 meses
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionStats;

