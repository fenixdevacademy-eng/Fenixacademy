'use client';

import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Eye,
    MousePointer,
    Clock,
    Star,
    Download,
    RefreshCw,
    Filter,
    Calendar,
    Target,
    Award,
    Activity,
    Zap
} from 'lucide-react';

interface AnalyticsProps {
    className?: string;
    onDataRefresh?: () => void;
    onFilterChange?: (filters: AnalyticsFilters) => void;
}

interface AnalyticsFilters {
    dateRange: '7d' | '30d' | '90d' | '1y';
    metric: 'views' | 'engagement' | 'conversions' | 'revenue';
    segment: 'all' | 'new' | 'returning';
}

interface MetricData {
    value: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
    period: string;
}

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        color: string;
    }[];
}

const mockMetrics = {
    totalViews: { value: 125430, change: 12.5, trend: 'up' as const, period: 'vs last month' },
    uniqueVisitors: { value: 89420, change: 8.3, trend: 'up' as const, period: 'vs last month' },
    engagementRate: { value: 68.4, change: -2.1, trend: 'down' as const, period: 'vs last month' },
    conversionRate: { value: 3.2, change: 15.7, trend: 'up' as const, period: 'vs last month' },
    avgSessionDuration: { value: 245, change: 5.2, trend: 'up' as const, period: 'vs last month' },
    bounceRate: { value: 32.1, change: -8.9, trend: 'down' as const, period: 'vs last month' }
};

const mockChartData: ChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
        {
            label: 'Visualizações',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            color: '#3B82F6'
        },
        {
            label: 'Usuários Únicos',
            data: [8000, 12000, 10000, 18000, 16000, 22000],
            color: '#10B981'
        },
        {
            label: 'Conversões',
            data: [240, 380, 300, 500, 440, 600],
            color: '#F59E0B'
        }
    ]
};

const mockTopPages = [
    { page: '/dashboard', views: 15420, change: 12.5 },
    { page: '/courses', views: 12350, change: 8.3 },
    { page: '/profile', views: 9870, change: -2.1 },
    { page: '/settings', views: 6540, change: 15.7 },
    { page: '/help', views: 4320, change: 5.2 }
];

const mockTrafficSources = [
    { source: 'Google', visitors: 45230, percentage: 45.2, color: '#3B82F6' },
    { source: 'Facebook', visitors: 22340, percentage: 22.3, color: '#10B981' },
    { source: 'Twitter', visitors: 15670, percentage: 15.7, color: '#F59E0B' },
    { source: 'LinkedIn', visitors: 12340, percentage: 12.3, color: '#8B5CF6' },
    { source: 'Outros', visitors: 5040, percentage: 5.0, color: '#6B7280' }
];

export function InteractiveAnalytics({
    className = '',
    onDataRefresh,
    onFilterChange
}: AnalyticsProps) {
    const [filters, setFilters] = useState<AnalyticsFilters>({
        dateRange: '30d',
        metric: 'views',
        segment: 'all'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [selectedChart, setSelectedChart] = useState<'line' | 'bar' | 'pie'>('line');
    const [showDetails, setShowDetails] = useState(false);

    const handleFilterChange = (newFilters: Partial<AnalyticsFilters>) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        onFilterChange?.(updatedFilters);
    };

    const handleRefresh = async () => {
        setIsLoading(true);
        // Simular carregamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        onDataRefresh?.();
        setIsLoading(false);
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="w-4 h-4 text-green-500" />;
            case 'down':
                return <TrendingDown className="w-4 h-4 text-red-500" />;
            default:
                return <Activity className="w-4 h-4 text-gray-500" />;
        }
    };

    const getTrendColor = (trend: string) => {
        switch (trend) {
            case 'up':
                return 'text-green-600';
            case 'down':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Analytics Interativo
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleRefresh}
                            disabled={isLoading}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Atualizar dados"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Mostrar detalhes"
                        >
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4">
                    <select
                        value={filters.dateRange}
                        onChange={(e) => handleFilterChange({ dateRange: e.target.value as any })}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="7d">Últimos 7 dias</option>
                        <option value="30d">Últimos 30 dias</option>
                        <option value="90d">Últimos 90 dias</option>
                        <option value="1y">Último ano</option>
                    </select>

                    <select
                        value={filters.metric}
                        onChange={(e) => handleFilterChange({ metric: e.target.value as any })}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="views">Visualizações</option>
                        <option value="engagement">Engajamento</option>
                        <option value="conversions">Conversões</option>
                        <option value="revenue">Receita</option>
                    </select>

                    <select
                        value={filters.segment}
                        onChange={(e) => handleFilterChange({ segment: e.target.value as any })}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todos os usuários</option>
                        <option value="new">Novos usuários</option>
                        <option value="returning">Usuários recorrentes</option>
                    </select>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-blue-500" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Visualizações</span>
                            </div>
                            {getTrendIcon(mockMetrics.totalViews.trend)}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {formatNumber(mockMetrics.totalViews.value)}
                        </div>
                        <div className={`text-sm ${getTrendColor(mockMetrics.totalViews.trend)}`}>
                            {mockMetrics.totalViews.change > 0 ? '+' : ''}{mockMetrics.totalViews.change}% {mockMetrics.totalViews.period}
                        </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Visitantes Únicos</span>
                            </div>
                            {getTrendIcon(mockMetrics.uniqueVisitors.trend)}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {formatNumber(mockMetrics.uniqueVisitors.value)}
                        </div>
                        <div className={`text-sm ${getTrendColor(mockMetrics.uniqueVisitors.trend)}`}>
                            {mockMetrics.uniqueVisitors.change > 0 ? '+' : ''}{mockMetrics.uniqueVisitors.change}% {mockMetrics.uniqueVisitors.period}
                        </div>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <MousePointer className="w-5 h-5 text-yellow-500" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Taxa de Engajamento</span>
                            </div>
                            {getTrendIcon(mockMetrics.engagementRate.trend)}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {mockMetrics.engagementRate.value}%
                        </div>
                        <div className={`text-sm ${getTrendColor(mockMetrics.engagementRate.trend)}`}>
                            {mockMetrics.engagementRate.change > 0 ? '+' : ''}{mockMetrics.engagementRate.change}% {mockMetrics.engagementRate.period}
                        </div>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-purple-500" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Taxa de Conversão</span>
                            </div>
                            {getTrendIcon(mockMetrics.conversionRate.trend)}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {mockMetrics.conversionRate.value}%
                        </div>
                        <div className={`text-sm ${getTrendColor(mockMetrics.conversionRate.trend)}`}>
                            {mockMetrics.conversionRate.change > 0 ? '+' : ''}{mockMetrics.conversionRate.change}% {mockMetrics.conversionRate.period}
                        </div>
                    </div>

                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-indigo-500" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Duração Média da Sessão</span>
                            </div>
                            {getTrendIcon(mockMetrics.avgSessionDuration.trend)}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {formatDuration(mockMetrics.avgSessionDuration.value)}
                        </div>
                        <div className={`text-sm ${getTrendColor(mockMetrics.avgSessionDuration.trend)}`}>
                            {mockMetrics.avgSessionDuration.change > 0 ? '+' : ''}{mockMetrics.avgSessionDuration.change}% {mockMetrics.avgSessionDuration.period}
                        </div>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-red-500" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Taxa de Rejeição</span>
                            </div>
                            {getTrendIcon(mockMetrics.bounceRate.trend)}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {mockMetrics.bounceRate.value}%
                        </div>
                        <div className={`text-sm ${getTrendColor(mockMetrics.bounceRate.trend)}`}>
                            {mockMetrics.bounceRate.change > 0 ? '+' : ''}{mockMetrics.bounceRate.change}% {mockMetrics.bounceRate.period}
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Tendências
                        </h4>
                        <div className="flex items-center gap-2">
                            {['line', 'bar', 'pie'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedChart(type as any)}
                                    className={`p-2 rounded-lg transition-colors ${selectedChart === type
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    <BarChart3 className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-64 flex items-center justify-center">
                        <div className="text-center">
                            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                Gráfico Interativo
                            </h5>
                            <p className="text-gray-600 dark:text-gray-400">
                                Visualização de dados em tempo real
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Data */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Pages */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Páginas Mais Visitadas
                        </h4>
                        <div className="space-y-3">
                            {mockTopPages.map((page, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">{page.page}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatNumber(page.views)} visualizações
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`text-sm ${page.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {page.change > 0 ? '+' : ''}{page.change}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Traffic Sources */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Fontes de Tráfego
                        </h4>
                        <div className="space-y-3">
                            {mockTrafficSources.map((source, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: source.color }}
                                        ></div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">{source.source}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatNumber(source.visitors)} visitantes
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {source.percentage}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}