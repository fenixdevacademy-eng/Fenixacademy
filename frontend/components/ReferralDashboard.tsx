'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Users,
    Share2,
    Gift,
    TrendingUp,
    DollarSign,
    Target,
    Award,
    Star,
    Eye,
    EyeOff,
    Download,
    Upload,
    RefreshCw,
    Settings,
    MoreVertical,
    Edit,
    Trash2,
    Copy,
    ExternalLink,
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    Filter,
    Search,
    Calendar,
    BarChart3,
    PieChart,
    Activity
} from 'lucide-react';

interface ReferralDashboardProps {
    className?: string;
}

interface ReferralData {
    totalReferrals: number;
    activeReferrals: number;
    totalEarnings: number;
    pendingEarnings: number;
    conversionRate: number;
    referralCode: string;
    referralLink: string;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    nextTierEarnings: number;
    referrals: Array<{
        id: string;
        name: string;
        email: string;
        joinedAt: string;
        status: 'pending' | 'active' | 'converted';
        earnings: number;
        avatar?: string;
    }>;
    earnings: Array<{
        id: string;
        amount: number;
        date: string;
        source: string;
        status: 'pending' | 'paid';
    }>;
    stats: {
        thisMonth: number;
        lastMonth: number;
        thisYear: number;
        lastYear: number;
    };
}

const ReferralDashboard: React.FC<ReferralDashboardProps> = ({ className = '' }) => {
    const [data, setData] = useState<ReferralData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'earnings' | 'analytics'>('overview');
    const [showSettings, setShowSettings] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'active' | 'converted'>('all');
    const [sortBy, setSortBy] = useState<'date' | 'name' | 'earnings'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        loadReferralData();
    }, []);

    const loadReferralData = async () => {
        try {
            setIsLoading(true);
            // Simulate API call
            const mockData: ReferralData = {
                totalReferrals: 156,
                activeReferrals: 89,
                totalEarnings: 2450.50,
                pendingEarnings: 320.75,
                conversionRate: 68.5,
                referralCode: 'FENIX2024',
                referralLink: 'https://fenix.com/ref/FENIX2024',
                tier: 'gold',
                nextTierEarnings: 500,
                referrals: [
                    {
                        id: '1',
                        name: 'João Silva',
                        email: 'joao@exemplo.com',
                        joinedAt: '2024-01-15',
                        status: 'converted',
                        earnings: 150.00,
                        avatar: 'https://via.placeholder.com/40'
                    },
                    {
                        id: '2',
                        name: 'Maria Santos',
                        email: 'maria@exemplo.com',
                        joinedAt: '2024-01-20',
                        status: 'active',
                        earnings: 75.00,
                        avatar: 'https://via.placeholder.com/40'
                    },
                    {
                        id: '3',
                        name: 'Pedro Costa',
                        email: 'pedro@exemplo.com',
                        joinedAt: '2024-02-01',
                        status: 'pending',
                        earnings: 0,
                        avatar: 'https://via.placeholder.com/40'
                    }
                ],
                earnings: [
                    {
                        id: '1',
                        amount: 150.00,
                        date: '2024-01-15',
                        source: 'João Silva',
                        status: 'paid'
                    },
                    {
                        id: '2',
                        amount: 75.00,
                        date: '2024-01-20',
                        source: 'Maria Santos',
                        status: 'paid'
                    },
                    {
                        id: '3',
                        amount: 320.75,
                        date: '2024-02-01',
                        source: 'Pending referrals',
                        status: 'pending'
                    }
                ],
                stats: {
                    thisMonth: 450.25,
                    lastMonth: 380.50,
                    thisYear: 2450.50,
                    lastYear: 1200.00
                }
            };
            setData(mockData);
        } catch (error) {
            console.error('Error loading referral data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const copyReferralLink = () => {
        if (data?.referralLink) {
            navigator.clipboard.writeText(data.referralLink);
            // Show success message
        }
    };

    const shareReferralLink = async () => {
        if (data?.referralLink) {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Junte-se à Fenix!',
                        text: 'Venha aprender programação comigo na Fenix!',
                        url: data.referralLink
                    });
                } catch (error) {
                    console.log('Error sharing:', error);
                }
            } else {
                copyReferralLink();
            }
        }
    };

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'bronze': return 'text-orange-600 bg-orange-100';
            case 'silver': return 'text-gray-600 bg-gray-100';
            case 'gold': return 'text-yellow-600 bg-yellow-100';
            case 'platinum': return 'text-purple-600 bg-purple-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getTierIcon = (tier: string) => {
        switch (tier) {
            case 'bronze': return '🥉';
            case 'silver': return '🥈';
            case 'gold': return '🥇';
            case 'platinum': return '💎';
            default: return '⭐';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'active': return 'text-blue-600 bg-blue-100';
            case 'converted': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const filteredReferrals = data?.referrals.filter(referral => {
        const matchesSearch = referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            referral.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || referral.status === filterStatus;
        return matchesSearch && matchesFilter;
    }) || [];

    const sortedReferrals = [...filteredReferrals].sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
            case 'date':
                comparison = new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
                break;
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'earnings':
                comparison = a.earnings - b.earnings;
                break;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
    });

    if (isLoading) {
        return (
            <div className={`flex items-center justify-center min-h-64 ${className}`}>
                <div className="text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Carregando dados de referência...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className={`flex items-center justify-center min-h-64 ${className}`}>
                <div className="text-center">
                    <p className="text-gray-600">Erro ao carregar dados de referência</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`referral-dashboard bg-white rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Share2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Programa de Referência</h2>
                            <p className="text-sm text-gray-600">Convide amigos e ganhe recompensas</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            onClick={loadReferralData}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                {[
                    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
                    { id: 'referrals', label: 'Referências', icon: Users },
                    { id: 'earnings', label: 'Ganhos', icon: DollarSign },
                    { id: 'analytics', label: 'Analytics', icon: Activity }
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${activeTab === tab.id
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="p-6">
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Total de Referências</p>
                                        <p className="text-2xl font-bold text-blue-900">{data.totalReferrals}</p>
                                    </div>
                                    <Users className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Ganhos Totais</p>
                                        <p className="text-2xl font-bold text-green-900">{formatCurrency(data.totalEarnings)}</p>
                                    </div>
                                    <DollarSign className="w-8 h-8 text-green-600" />
                                </div>
                            </div>

                            <div className="bg-yellow-50 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-yellow-600 font-medium">Taxa de Conversão</p>
                                        <p className="text-2xl font-bold text-yellow-900">{data.conversionRate}%</p>
                                    </div>
                                    <Target className="w-8 h-8 text-yellow-600" />
                                </div>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-purple-600 font-medium">Nível Atual</p>
                                        <p className="text-2xl font-bold text-purple-900">{getTierIcon(data.tier)}</p>
                                    </div>
                                    <Award className="w-8 h-8 text-purple-600" />
                                </div>
                            </div>
                        </div>

                        {/* Referral Code */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seu Código de Referência</h3>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3">
                                    <p className="text-sm text-gray-600">Código:</p>
                                    <p className="text-lg font-mono font-bold text-gray-900">{data.referralCode}</p>
                                </div>
                                <button
                                    onClick={copyReferralLink}
                                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <Copy className="w-4 h-4" />
                                    Copiar
                                </button>
                                <button
                                    onClick={shareReferralLink}
                                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Compartilhar
                                </button>
                            </div>
                        </div>

                        {/* Tier Progress */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Progresso para o Próximo Nível</h3>
                                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                                    {getTierIcon(data.tier)} {data.tier.toUpperCase()}
                                </span>
                            </div>
                            <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
                                <div
                                    className="bg-white h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${(data.totalEarnings / data.nextTierEarnings) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-sm">
                                Faltam {formatCurrency(data.nextTierEarnings - data.totalEarnings)} para o próximo nível
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'referrals' && (
                    <div className="space-y-4">
                        {/* Filters */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Buscar referências..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Todos os Status</option>
                                <option value="pending">Pendente</option>
                                <option value="active">Ativo</option>
                                <option value="converted">Convertido</option>
                            </select>
                        </div>

                        {/* Referrals List */}
                        <div className="space-y-3">
                            {sortedReferrals.map((referral) => (
                                <div key={referral.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-700">
                                                {referral.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{referral.name}</h4>
                                            <p className="text-sm text-gray-600">{referral.email}</p>
                                            <p className="text-xs text-gray-500">{formatDate(referral.joinedAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                                            {referral.status}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {formatCurrency(referral.earnings)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'earnings' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-green-900 mb-2">Ganhos Pagos</h3>
                                <p className="text-2xl font-bold text-green-900">{formatCurrency(data.totalEarnings - data.pendingEarnings)}</p>
                            </div>
                            <div className="bg-yellow-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Pendentes</h3>
                                <p className="text-2xl font-bold text-yellow-900">{formatCurrency(data.pendingEarnings)}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {data.earnings.map((earning) => (
                                <div key={earning.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{earning.source}</h4>
                                        <p className="text-sm text-gray-600">{formatDate(earning.date)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${earning.status === 'paid' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                                            }`}>
                                            {earning.status === 'paid' ? 'Pago' : 'Pendente'}
                                        </span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {formatCurrency(earning.amount)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">Este Mês</h3>
                                <p className="text-2xl font-bold text-blue-900">{formatCurrency(data.stats.thisMonth)}</p>
                                <p className="text-sm text-blue-600">
                                    {data.stats.thisMonth > data.stats.lastMonth ? '+' : ''}
                                    {((data.stats.thisMonth - data.stats.lastMonth) / data.stats.lastMonth * 100).toFixed(1)}% vs mês anterior
                                </p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-green-900 mb-2">Este Ano</h3>
                                <p className="text-2xl font-bold text-green-900">{formatCurrency(data.stats.thisYear)}</p>
                                <p className="text-sm text-green-600">
                                    {data.stats.thisYear > data.stats.lastYear ? '+' : ''}
                                    {((data.stats.thisYear - data.stats.lastYear) / data.stats.lastYear * 100).toFixed(1)}% vs ano anterior
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gráfico de Performance</h3>
                            <div className="h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600">Gráfico de performance será implementado aqui</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReferralDashboard;