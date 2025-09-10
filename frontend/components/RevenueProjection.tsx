'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, Target, Zap, Star, Crown, Gift, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { revenueCalculator, RevenueProjection } from '@/lib/analytics/revenue-calculator';

interface RevenueProjectionProps {
    className?: string;
}

export function RevenueProjection({ className = '' }: RevenueProjectionProps) {
    const [projections, setProjections] = useState<RevenueProjection[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'realistic' | 'optimistic'>('realistic');

    useEffect(() => {
        loadProjections();
    }, []);

    const loadProjections = async () => {
        try {
            setIsLoading(true);
            const data = revenueCalculator.calculateGrowthProjection(12);
            setProjections(data);
        } catch (error) {
            console.error('Erro ao carregar projeções:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getScenarioColor = (scenario: string) => {
        switch (scenario) {
            case 'conservative': return 'text-red-500';
            case 'realistic': return 'text-blue-500';
            case 'optimistic': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    const getScenarioIcon = (scenario: string) => {
        switch (scenario) {
            case 'conservative': return <ArrowDown className="w-4 h-4" />;
            case 'realistic': return <Minus className="w-4 h-4" />;
            case 'optimistic': return <ArrowUp className="w-4 h-4" />;
            default: return <Minus className="w-4 h-4" />;
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('pt-BR').format(value);
    };

    if (isLoading) {
        return (
            <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 ${className}`}>
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    const firstMonth = projections[0];
    const lastMonth = projections[projections.length - 1];
    const totalRevenue = projections.reduce((sum, p) => sum + p.totalRevenue, 0);
    const averageMonthlyGrowth = ((lastMonth.totalRevenue - firstMonth.totalRevenue) / firstMonth.totalRevenue) * 100 / 11;

    return (
        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Projeção de Faturamento
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Cenários baseados em dados reais do mercado EdTech
                        </p>
                    </div>
                </div>

                {/* Scenario Selector */}
                <div className="flex gap-2">
                    {[
                        { id: 'conservative', label: 'Conservador', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
                        { id: 'realistic', label: 'Realista', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
                        { id: 'optimistic', label: 'Otimista', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' }
                    ].map((scenario) => (
                        <button
                            key={scenario.id}
                            onClick={() => setSelectedScenario(scenario.id as any)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedScenario === scenario.id
                                    ? scenario.color
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {scenario.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* First Month Highlight */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        🎯 Primeiro Mês - Projeção
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                {formatCurrency(firstMonth.scenarios[selectedScenario])}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Faturamento {selectedScenario === 'conservative' ? 'Conservador' : selectedScenario === 'realistic' ? 'Realista' : 'Otimista'}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatNumber(firstMonth.metrics.totalUsers)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Usuários Ativos
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {firstMonth.metrics.conversionRate}%
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Taxa de Conversão
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatCurrency(firstMonth.metrics.averageOrderValue)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Ticket Médio
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue Breakdown */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        💰 Breakdown do Faturamento
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Crown className="w-6 h-6 text-green-500" />
                                <span className="font-medium text-gray-900 dark:text-white">Assinaturas</span>
                            </div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(firstMonth.breakdown.subscriptions)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {Math.round((firstMonth.breakdown.subscriptions / firstMonth.totalRevenue) * 100)}% do total
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Gift className="w-6 h-6 text-blue-500" />
                                <span className="font-medium text-gray-900 dark:text-white">Referências</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                +{formatCurrency(firstMonth.breakdown.referrals)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Bônus por indicações
                            </div>
                        </div>

                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Star className="w-6 h-6 text-orange-500" />
                                <span className="font-medium text-gray-900 dark:text-white">Cupons</span>
                            </div>
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                {formatCurrency(firstMonth.breakdown.coupons)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Descontos aplicados
                            </div>
                        </div>
                    </div>
                </div>

                {/* Growth Chart */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        📈 Crescimento Anual
                    </h3>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(totalRevenue)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Faturamento total em 12 meses
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                                    +{Math.round(averageMonthlyGrowth)}%
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Crescimento médio mensal
                                </div>
                            </div>
                        </div>

                        {/* Simple Chart */}
                        <div className="flex items-end gap-1 h-32">
                            {projections.slice(0, 12).map((projection, index) => {
                                const maxRevenue = Math.max(...projections.map(p => p.scenarios[selectedScenario]));
                                const height = (projection.scenarios[selectedScenario] / maxRevenue) * 100;

                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                                            style={{ height: `${height}%` }}
                                        />
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            M{index + 1}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Key Insights */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        🎯 Insights Principais
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <Zap className="w-4 h-4" />
                                <span className="text-sm font-medium">IA Superinteligente aumenta conversão em 50%</span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Gift className="w-4 h-4" />
                                <span className="text-sm font-medium">Sistema de referência gera 15% das vendas</span>
                            </div>
                            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                                <Star className="w-4 h-4" />
                                <span className="text-sm font-medium">Cupons aumentam conversão em 25%</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                                <Target className="w-4 h-4" />
                                <span className="text-sm font-medium">Mercado brasileiro cresce 25% ao ano</span>
                            </div>
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                <Users className="w-4 h-4" />
                                <span className="text-sm font-medium">2M estudantes de programação no Brasil</span>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-medium">500K vagas em tech por ano</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        🚀 Pronto para Começar?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Com o sistema completo implementado, você tem tudo para alcançar esses números!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-colors">
                            Ver Estratégia de Marketing
                        </button>
                        <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Calcular ROI Detalhado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RevenueProjection;

