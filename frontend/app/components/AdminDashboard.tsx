'use client';

import React, { useState, useEffect } from 'react';
import {
    ChartBarIcon,
    UsersIcon,
    AcademicCapIcon,
    CreditCardIcon,
    BellIcon,
    DocumentTextIcon,
    CogIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
    totalUsers: number;
    totalCourses: number;
    totalRevenue: number;
    activeSubscriptions: number;
    totalCertificates: number;
    totalNotifications: number;
}

interface RecentActivity {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalCourses: 0,
        totalRevenue: 0,
        activeSubscriptions: 0,
        totalCertificates: 0,
        totalNotifications: 0
    });

    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
    const [selectedTab, setSelectedTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simular carregamento de dados
        setTimeout(() => {
            setStats({
                totalUsers: 1247,
                totalCourses: 20,
                totalRevenue: 45678.90,
                activeSubscriptions: 892,
                totalCertificates: 1567,
                totalNotifications: 3421
            });

            setRecentActivity([
                {
                    id: '1',
                    type: 'user_registration',
                    description: 'Novo usuário registrado',
                    timestamp: '2024-01-15T10:30:00Z',
                    user: 'João Silva'
                },
                {
                    id: '2',
                    type: 'course_completion',
                    description: 'Curso concluído com sucesso',
                    timestamp: '2024-01-15T09:15:00Z',
                    user: 'Maria Santos'
                },
                {
                    id: '3',
                    type: 'payment_success',
                    description: 'Pagamento processado',
                    timestamp: '2024-01-15T08:45:00Z',
                    user: 'Pedro Costa'
                },
                {
                    id: '4',
                    type: 'certificate_issued',
                    description: 'Certificado emitido',
                    timestamp: '2024-01-15T08:20:00Z',
                    user: 'Ana Oliveira'
                }
            ]);

            setIsLoading(false);
        }, 1000);
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('pt-BR');
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'user_registration':
                return <UsersIcon className="w-5 h-5 text-blue-500" />;
            case 'course_completion':
                return <AcademicCapIcon className="w-5 h-5 text-green-500" />;
            case 'payment_success':
                return <CreditCardIcon className="w-5 h-5 text-purple-500" />;
            case 'certificate_issued':
                return <DocumentTextIcon className="w-5 h-5 text-yellow-500" />;
            default:
                return <BellIcon className="w-5 h-5 text-gray-500" />;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                🚀 Dashboard Administrativo
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Gerencie sua plataforma Fenix Academy
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <CogIcon className="w-5 h-5 inline mr-2" />
                                Configurações
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'overview', name: 'Visão Geral', icon: ChartBarIcon },
                            { id: 'users', name: 'Usuários', icon: UsersIcon },
                            { id: 'courses', name: 'Cursos', icon: AcademicCapIcon },
                            { id: 'payments', name: 'Pagamentos', icon: CreditCardIcon },
                            { id: 'certificates', name: 'Certificados', icon: DocumentTextIcon },
                            { id: 'notifications', name: 'Notificações', icon: BellIcon }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${selectedTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5 inline mr-2" />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {selectedTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <UsersIcon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Total de Usuários</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <AcademicCapIcon className="w-8 h-8 text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Cursos Disponíveis</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.totalCourses}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CreditCardIcon className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Receita Total</p>
                                        <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <DocumentTextIcon className="w-8 h-8 text-yellow-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Assinaturas Ativas</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.activeSubscriptions}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <DocumentTextIcon className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Certificados Emitidos</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.totalCertificates}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <BellIcon className="w-8 h-8 text-red-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Notificações</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.totalNotifications}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Atividade Recente</h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="px-6 py-4 flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                {activity.description}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {activity.user} • {formatDate(activity.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
                                    <UsersIcon className="w-6 h-6 mx-auto mb-2" />
                                    <span className="text-sm font-medium">Adicionar Usuário</span>
                                </button>

                                <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
                                    <AcademicCapIcon className="w-6 h-6 mx-auto mb-2" />
                                    <span className="text-sm font-medium">Criar Curso</span>
                                </button>

                                <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
                                    <CreditCardIcon className="w-6 h-6 mx-auto mb-2" />
                                    <span className="text-sm font-medium">Ver Pagamentos</span>
                                </button>

                                <button className="bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700 transition-colors">
                                    <DocumentTextIcon className="w-6 h-6 mx-auto mb-2" />
                                    <span className="text-sm font-medium">Emitir Certificado</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'users' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Gestão de Usuários</h3>
                        <p className="text-gray-500">Interface para gerenciar usuários da plataforma</p>
                    </div>
                )}

                {selectedTab === 'courses' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Gestão de Cursos</h3>
                        <p className="text-gray-500">Interface para gerenciar cursos e conteúdo</p>
                    </div>
                )}

                {selectedTab === 'payments' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Gestão de Pagamentos</h3>
                        <p className="text-gray-500">Interface para monitorar pagamentos e assinaturas</p>
                    </div>
                )}

                {selectedTab === 'certificates' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Gestão de Certificados</h3>
                        <p className="text-gray-500">Interface para gerenciar certificados e credenciais</p>
                    </div>
                )}

                {selectedTab === 'notifications' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Gestão de Notificações</h3>
                        <p className="text-gray-500">Interface para gerenciar notificações e comunicação</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
