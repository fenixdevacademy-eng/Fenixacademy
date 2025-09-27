'use client';

import React, { useState, useEffect } from 'react';
import { Globe, DollarSign, TrendingUp, Users, MapPin, ArrowUp, ArrowDown, Minus, Star, Crown, Gift } from 'lucide-react';
import { revenueCalculator } from '@/lib/analytics/revenue-calculator';

interface GlobalRevenueProjectionProps {
    className?: string;
}

interface RevenueProjection {
    totalRevenue: number;
    monthlyRevenue: number;
    yearlyRevenue: number;
    growthRate: number;
    userCount: number;
    conversionRate: number;
    averageRevenuePerUser: number;
    regions: Array<{
        name: string;
        revenue: number;
        users: number;
        growth: number;
    }>;
    scenarios: {
        conservative: number;
        realistic: number;
        optimistic: number;
    };
}

export function GlobalRevenueProjection({ className = '' }: GlobalRevenueProjectionProps) {
    const [projection, setProjection] = useState<RevenueProjection | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'realistic' | 'optimistic'>('realistic');

    useEffect(() => {
        loadProjection();
    }, []);

    const loadProjection = async () => {
        try {
            setIsLoading(true);
            // Simulate API call
            const mockProjection: RevenueProjection = {
                totalRevenue: 2500000,
                monthlyRevenue: 208333,
                yearlyRevenue: 2500000,
                growthRate: 15.5,
                userCount: 12500,
                conversionRate: 3.2,
                averageRevenuePerUser: 200,
                regions: [
                    { name: 'América do Norte', revenue: 1200000, users: 6000, growth: 18.2 },
                    { name: 'Europa', revenue: 800000, users: 4000, growth: 12.5 },
                    { name: 'América Latina', revenue: 350000, users: 1750, growth: 25.0 },
                    { name: 'Ásia', revenue: 150000, users: 750, growth: 30.0 }
                ],
                scenarios: {
                    conservative: 1800000,
                    realistic: 2500000,
                    optimistic: 3500000
                }
            };
            setProjection(mockProjection);
        } catch (error) {
            console.error('Error loading revenue projection:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('pt-BR').format(num);
    };

    const getGrowthIcon = (growth: number) => {
        if (growth > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
        if (growth < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
        return <Minus className="w-4 h-4 text-gray-500" />;
    };

    const getGrowthColor = (growth: number) => {
        if (growth > 0) return 'text-green-600';
        if (growth < 0) return 'text-red-600';
        return 'text-gray-600';
    };

    if (isLoading) {
        return (
            <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!projection) {
        return (
            <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
                <p className="text-gray-600">Erro ao carregar projeção de receita</p>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Globe className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">Projeção Global de Receita</h2>
                    </div>
                    <div className="flex gap-2">
                        {(['conservative', 'realistic', 'optimistic'] as const).map((scenario) => (
                            <button
                                key={scenario}
                                onClick={() => setSelectedScenario(scenario)}
                                className={`px-3 py-1 rounded text-sm font-medium ${
                                    selectedScenario === scenario
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {scenario === 'conservative' && 'Conservador'}
                                {scenario === 'realistic' && 'Realista'}
                                {scenario === 'optimistic' && 'Otimista'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Main Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">Receita Total</p>
                                <p className="text-2xl font-bold">{formatCurrency(projection.scenarios[selectedScenario])}</p>
                            </div>
                            <DollarSign className="w-8 h-8 text-blue-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">Usuários</p>
                                <p className="text-2xl font-bold">{formatNumber(projection.userCount)}</p>
                            </div>
                            <Users className="w-8 h-8 text-green-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">Taxa de Crescimento</p>
                                <p className="text-2xl font-bold">{projection.growthRate}%</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-purple-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm">ARPU</p>
                                <p className="text-2xl font-bold">{formatCurrency(projection.averageRevenuePerUser)}</p>
                            </div>
                            <Star className="w-8 h-8 text-orange-200" />
                        </div>
                    </div>
                </div>

                {/* Regional Breakdown */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Receita por Região</h3>
                    <div className="space-y-4">
                        {projection.regions.map((region, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <span className="font-medium text-gray-900">{region.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getGrowthIcon(region.growth)}
                                        <span className={`text-sm font-medium ${getGrowthColor(region.growth)}`}>
                                            {region.growth}%
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Receita</p>
                                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(region.revenue)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Usuários</p>
                                        <p className="text-lg font-semibold text-gray-900">{formatNumber(region.users)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Participação</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {((region.revenue / projection.totalRevenue) * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Revenue Chart Placeholder */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Receita Mensal</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-center h-48">
                            <div className="text-center">
                                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600">Gráfico de receita mensal</p>
                                <p className="text-sm text-gray-500">Implementar com biblioteca de gráficos</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Insights */}
                <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights Principais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <Crown className="w-5 h-5 text-yellow-500 mt-1" />
                            <div>
                                <p className="font-medium text-gray-900">Crescimento Sustentável</p>
                                <p className="text-sm text-gray-600">
                                    Taxa de crescimento de {projection.growthRate}% indica expansão saudável do negócio.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Gift className="w-5 h-5 text-green-500 mt-1" />
                            <div>
                                <p className="font-medium text-gray-900">Alto Valor por Usuário</p>
                                <p className="text-sm text-gray-600">
                                    ARPU de {formatCurrency(projection.averageRevenuePerUser)} demonstra valor agregado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}