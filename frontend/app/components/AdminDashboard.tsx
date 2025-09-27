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

export default function AdminDashboard() {
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
                    timestamp: '2 minutos atrás',
                    user: 'João Silva'
                },
                {
                    id: '2',
                    type: 'course_completion',
                    description: 'Curso concluído',
                    timestamp: '15 minutos atrás',
                    user: 'Maria Santos'
                },
                {
                    id: '3',
                    type: 'payment_received',
                    description: 'Pagamento recebido',
                    timestamp: '1 hora atrás',
                    user: 'Pedro Costa'
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
    }

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('pt-BR').format(value);
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
                    <p className="text-gray-600 mt-2">Visão geral da plataforma Fenix Academy</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <UsersIcon className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total de Usuários</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {formatNumber(stats.totalUsers)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <AcademicCapIcon className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Cursos Ativos</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {stats.totalCourses}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CreditCardIcon className="h-8 w-8 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Receita Total</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {formatCurrency(stats.totalRevenue)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <BellIcon className="h-8 w-8 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Assinaturas Ativas</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {formatNumber(stats.activeSubscriptions)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <DocumentTextIcon className="h-8 w-8 text-indigo-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Certificados Emitidos</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {formatNumber(stats.totalCertificates)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <ChartBarIcon className="h-8 w-8 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Notificações</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {formatNumber(stats.totalNotifications)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Atividade Recente</h2>
                    </div>
                    <div className="px-6 py-4">
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <BellIcon className="h-4 w-4 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900">{activity.description}</p>
                                        <p className="text-sm text-gray-500">{activity.user}</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
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