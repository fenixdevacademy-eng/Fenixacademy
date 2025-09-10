'use client';

import React, { useState, useEffect } from 'react';
import { Globe, DollarSign, TrendingUp, Users, MapPin, ArrowUp, ArrowDown, Minus, Star, Crown, Gift } from 'lucide-react';
import { revenueCalculator } from '@/lib/analytics/revenue-calculator';

interface GlobalRevenueProjectionProps {
    className?: string;
}

export function GlobalRevenueProjection({ className = '' }: GlobalRevenueProjectionProps) {
    const [projection, setProjection] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'realistic' | 'optimistic'>('realistic');

    useEffect(() => {
        loadProjection();
    }, []);

    const loadProjection = async () => {
        try {
            setIsLoading(true);
            const data = revenueCalculator.calculateGlobalFirstMonthRevenue();
            setProjection(data);
        } catch (error) {
            console.error('Erro ao carregar projeção global:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatCurrency = (value: number, currency: string = 'BRL') => {
        if (currency === 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
        }
        if (currency === 'EUR') {
            return new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
        }
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('pt-BR').format(Math.round(value));
    };

    if (isLoading || !projection) {
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

    const { brazil, global } = projection;

    return (
        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
                        <Globe className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Faturamento Global - Primeiro Mês
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Projeção considerando mercados internacionais e múltiplas moedas
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
                {/* Global Revenue Highlight */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        🌍 Faturamento Global - Cenário {selectedScenario === 'conservative' ? 'Conservador' : selectedScenario === 'realistic' ? 'Realista' : 'Otimista'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                {formatCurrency(global.scenarios[selectedScenario].USD, 'USD')}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Faturamento em USD
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(global.scenarios[selectedScenario].BRL)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Faturamento em BRL
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatNumber(global.breakdown.US.users + global.breakdown.Europe.users + global.breakdown.Asia.users + global.breakdown.LatinAmerica.users + global.breakdown.Others.users)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Usuários Globais
                            </div>
                        </div>
                    </div>
                </div>

                {/* Regional Breakdown */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        🗺️ Breakdown por Região
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Estados Unidos */}
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-5 h-5 text-red-500" />
                                <span className="font-medium text-gray-900 dark:text-white">🇺🇸 Estados Unidos</span>
                            </div>
                            <div className="text-xl font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(global.breakdown.US.revenue, 'USD')}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {formatNumber(global.breakdown.US.users)} usuários
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                35% do mercado global
                            </div>
                        </div>

                        {/* Europa */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-5 h-5 text-blue-500" />
                                <span className="font-medium text-gray-900 dark:text-white">🇪🇺 Europa</span>
                            </div>
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                {formatCurrency(global.breakdown.Europe.revenue, 'EUR')}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {formatNumber(global.breakdown.Europe.users)} usuários
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                25% do mercado global
                            </div>
                        </div>

                        {/* Ásia */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-5 h-5 text-yellow-500" />
                                <span className="font-medium text-gray-900 dark:text-white">🇦🇸 Ásia</span>
                            </div>
                            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                                {formatCurrency(global.breakdown.Asia.revenue, 'USD')}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {formatNumber(global.breakdown.Asia.users)} usuários
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                20% do mercado global
                            </div>
                        </div>

                        {/* América Latina */}
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-5 h-5 text-green-500" />
                                <span className="font-medium text-gray-900 dark:text-white">🇧🇷 América Latina</span>
                            </div>
                            <div className="text-xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(global.breakdown.LatinAmerica.revenue)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {formatNumber(global.breakdown.LatinAmerica.users)} usuários
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                15% do mercado global
                            </div>
                        </div>

                        {/* Outros */}
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-5 h-5 text-purple-500" />
                                <span className="font-medium text-gray-900 dark:text-white">🌍 Outros</span>
                            </div>
                            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                {formatCurrency(global.breakdown.Others.revenue, 'USD')}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {formatNumber(global.breakdown.Others.users)} usuários
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                5% do mercado global
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparison: Brazil vs Global */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        🇧🇷 vs 🌍 Comparação Brasil vs Global
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Brasil</h4>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(brazil.scenarios[selectedScenario])}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {formatNumber(brazil.metrics.totalUsers)} usuários
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Investimento: R$ 10.000
                            </div>
                        </div>

                        <div className="text-center">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Global</h4>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formatCurrency(global.scenarios[selectedScenario].BRL)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {formatNumber(global.breakdown.US.users + global.breakdown.Europe.users + global.breakdown.Asia.users + global.breakdown.LatinAmerica.users + global.breakdown.Others.users)} usuários
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Investimento: $50.000 USD
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            Multiplicador Global: {Math.round(global.scenarios[selectedScenario].BRL / brazil.scenarios[selectedScenario])}x
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            O mercado global gera {Math.round(global.scenarios[selectedScenario].BRL / brazil.scenarios[selectedScenario])}x mais receita que apenas o Brasil
                        </div>
                    </div>
                </div>

                {/* Key Insights */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        🎯 Insights do Mercado Global
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <Crown className="w-4 h-4" />
                                <span className="text-sm font-medium">EUA: Maior ticket médio ($49 USD)</span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Gift className="w-4 h-4" />
                                <span className="text-sm font-medium">Europa: Mercado premium (€45 EUR)</span>
                            </div>
                            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                                <Star className="w-4 h-4" />
                                <span className="text-sm font-medium">Ásia: Maior volume de usuários</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-medium">Taxa de conversão global: 4.2%</span>
                            </div>
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                <Users className="w-4 h-4" />
                                <span className="text-sm font-medium">2B pessoas no mercado global</span>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                <Globe className="w-4 h-4" />
                                <span className="text-sm font-medium">IA superinteligente tem mais impacto global</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        🚀 Pronto para Conquistar o Mundo?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Com o sistema completo implementado, você pode faturar {formatCurrency(global.scenarios[selectedScenario].BRL)} no primeiro mês!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-colors">
                            Ver Estratégia Global
                        </button>
                        <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Calcular ROI Global
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GlobalRevenueProjection;

