'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    CreditCard,
    Calendar,
    Download,
    Settings,
    Crown,
    Star,
    BookOpen,
    CheckCircle,
    AlertCircle,
    Clock,
    Users,
    Zap,
    Award
} from 'lucide-react';

interface Subscription {
    id: string;
    planName: string;
    planType: 'starter' | 'pro' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired' | 'trial';
    startDate: string;
    endDate: string;
    nextBilling: string;
    price: number;
    period: 'monthly' | 'yearly' | 'lifetime';
    features: string[];
    autoRenew: boolean;
}

interface BillingHistory {
    id: string;
    date: string;
    amount: number;
    description: string;
    status: 'paid' | 'pending' | 'failed';
    invoice: string;
}

export default function ManageSubscriptions() {
    const [activeTab, setActiveTab] = useState<'overview' | 'billing' | 'usage' | 'settings'>('overview');
    const [subscription, setSubscription] = useState<Subscription>({
        id: 'sub_001',
        planName: 'Pro Anual',
        planType: 'pro',
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2025-01-15',
        nextBilling: '2025-01-15',
        price: 1597,
        period: 'yearly',
        autoRenew: true,
        features: [
            'Acesso a TODOS os 14 cursos',
            'IDE FENIX premium',
            'Certificados profissionais',
            'Suporte prioritário',
            'Projetos avançados',
            'Mentoria em grupo',
            'Acesso antecipado a novos cursos',
            'Workshops exclusivos'
        ]
    });

    const [billingHistory] = useState<BillingHistory[]>([
        {
            id: 'inv_001',
            date: '2024-01-15',
            amount: 1597,
            description: 'Pro Anual - Fenix Academy',
            status: 'paid',
            invoice: 'INV-2024-001'
        },
        {
            id: 'inv_002',
            date: '2023-01-15',
            amount: 1597,
            description: 'Pro Anual - Fenix Academy',
            status: 'paid',
            invoice: 'INV-2023-001'
        }
    ]);

    const [usageStats] = useState({
        coursesCompleted: 8,
        totalHours: 156,
        certificatesEarned: 6,
        projectsCompleted: 12,
        ideUsage: '45h',
        communityPosts: 23
    });

    const getPlanIcon = (planType: string) => {
        switch (planType) {
            case 'starter':
                return <BookOpen className="w-6 h-6" />;
            case 'pro':
                return <Star className="w-6 h-6" />;
            case 'enterprise':
                return <Crown className="w-6 h-6" />;
            default:
                return <BookOpen className="w-6 h-6" />;
        }
    };

    const getPlanColor = (planType: string) => {
        switch (planType) {
            case 'starter':
                return 'from-blue-500 to-blue-600';
            case 'pro':
                return 'from-purple-500 to-purple-600';
            case 'enterprise':
                return 'from-yellow-500 to-yellow-600';
            default:
                return 'from-blue-500 to-blue-600';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'expired':
                return 'bg-gray-100 text-gray-800';
            case 'trial':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="w-4 h-4" />;
            case 'cancelled':
                return <AlertCircle className="w-4 h-4" />;
            case 'expired':
                return <Clock className="w-4 h-4" />;
            case 'trial':
                return <Clock className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                🚀 Gerenciar Assinatura
                            </h1>
                            <p className="text-gray-600">
                                Controle sua assinatura e acompanhe seu progresso
                            </p>
                        </div>
                        <Link
                            href="/subscriptions"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            📚 Ver Todos os Planos
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Current Subscription Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getPlanColor(subscription.planType)} flex items-center justify-center text-white`}>
                                {getPlanIcon(subscription.planType)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{subscription.planName}</h2>
                                <p className="text-gray-600">Plano ativo com acesso completo</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
                                {getStatusIcon(subscription.status)}
                                <span className="ml-2 capitalize">{subscription.status}</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mt-2">
                                R$ {subscription.price}
                            </div>
                            <div className="text-gray-600 text-sm">
                                {subscription.period === 'monthly' && 'por mês'}
                                {subscription.period === 'yearly' && 'por ano'}
                                {subscription.period === 'lifetime' && 'pagamento único'}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Início da Assinatura</p>
                                    <p className="font-medium text-gray-900">{new Date(subscription.startDate).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <Clock className="w-5 h-5 text-purple-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Próxima Cobrança</p>
                                    <p className="font-medium text-gray-900">{new Date(subscription.nextBilling).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <Zap className="w-5 h-5 text-green-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Renovação Automática</p>
                                    <p className="font-medium text-gray-900">{subscription.autoRenew ? 'Ativada' : 'Desativada'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recursos Incluídos:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {subscription.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
                    <div className="flex space-x-1">
                        {[
                            { id: 'overview', label: 'Visão Geral', icon: <Star className="w-4 h-4" /> },
                            { id: 'billing', label: 'Faturamento', icon: <CreditCard className="w-4 h-4" /> },
                            { id: 'usage', label: 'Uso', icon: <Users className="w-4 h-4" /> },
                            { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4" /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {activeTab === 'overview' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Visão Geral da Assinatura</h2>

                            {/* Usage Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-blue-600 font-medium">Cursos Concluídos</p>
                                            <p className="text-3xl font-bold text-blue-900">{usageStats.coursesCompleted}</p>
                                        </div>
                                        <BookOpen className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-purple-600 font-medium">Horas de Estudo</p>
                                            <p className="text-3xl font-bold text-purple-900">{usageStats.totalHours}h</p>
                                        </div>
                                        <Clock className="w-8 h-8 text-purple-600" />
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-green-600 font-medium">Certificados</p>
                                            <p className="text-3xl font-bold text-green-900">{usageStats.certificatesEarned}</p>
                                        </div>
                                        <Award className="w-8 h-8 text-green-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Ações Rápidas</h3>
                                    <div className="space-y-3">
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                                            📚 Continuar Estudando
                                        </button>
                                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                                            🚀 Acessar IDE FENIX
                                        </button>
                                        <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                                            📋 Ver Certificados
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Próximos Passos</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm text-gray-700">Complete mais 2 cursos para o próximo nível</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="text-sm text-gray-700">Participe de 3 workshops este mês</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            <span className="text-sm text-gray-700">Conecte-se com 5 desenvolvedores</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">💳 Histórico de Faturamento</h2>

                            <div className="space-y-4">
                                {billingHistory.map((bill) => (
                                    <div key={bill.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bill.status === 'paid' ? 'bg-green-100' :
                                                        bill.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                                                    }`}>
                                                    {bill.status === 'paid' ? (
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                    ) : bill.status === 'pending' ? (
                                                        <Clock className="w-5 h-5 text-yellow-600" />
                                                    ) : (
                                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{bill.description}</p>
                                                    <p className="text-sm text-gray-600">{new Date(bill.date).toLocaleDateString('pt-BR')}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-gray-900">R$ {bill.amount}</p>
                                                <p className="text-sm text-gray-600 capitalize">{bill.status}</p>
                                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                    📄 {bill.invoice}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'usage' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Estatísticas de Uso</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Progresso dos Cursos</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <span>Fundamentos Web</span>
                                                <span>100%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <span>Python Data Science</span>
                                                <span>75%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <span>React Avançado</span>
                                                <span>45%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Atividade da IDE</h3>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">Tempo de Uso</span>
                                                <span className="font-medium text-gray-900">{usageStats.ideUsage}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">Este mês</div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">Projetos Criados</span>
                                                <span className="font-medium text-gray-900">{usageStats.projectsCompleted}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">Total</div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">Posts na Comunidade</span>
                                                <span className="font-medium text-gray-900">{usageStats.communityPosts}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">Este mês</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">⚙️ Configurações da Assinatura</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔄 Renovação Automática</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700">Status atual</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={subscription.autoRenew} className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {subscription.autoRenew
                                                ? 'Sua assinatura será renovada automaticamente'
                                                : 'Sua assinatura não será renovada automaticamente'
                                            }
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📧 Notificações</h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="ml-2 text-sm text-gray-700">Renovação da assinatura</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="ml-2 text-sm text-gray-700">Novos cursos disponíveis</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                <span className="ml-2 text-sm text-gray-700">Atualizações da plataforma</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔒 Segurança</h3>
                                        <div className="space-y-3">
                                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                                                🔑 Alterar Senha
                                            </button>
                                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                                                📱 Autenticação 2FA
                                            </button>
                                            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                                                📋 Histórico de Login
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Dados e Privacidade</h3>
                                        <div className="space-y-3">
                                            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                                                📥 Exportar Dados
                                            </button>
                                            <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                                                🗑️ Excluir Conta
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

