'use client';

import React, { useState } from 'react';
import { Check, X, Star, Crown, BookOpen, Zap, Shield, Users, Award, Clock, Code, Target, TrendingUp, Brain, Gift } from 'lucide-react';

interface PlanFeature {
    name: string;
    free: boolean | string;
    pro: boolean | string;
    enterprise: boolean | string;
    category: 'core' | 'ai' | 'community' | 'support' | 'advanced';
}

interface PlanComparisonProps {
    className?: string;
    onSelectPlan?: (planId: string) => void;
}

export function PlanComparison({ className = '', onSelectPlan }: PlanComparisonProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = [
        { id: 'all', label: 'Todas as Funcionalidades', icon: Star },
        { id: 'core', label: 'Funcionalidades Básicas', icon: BookOpen },
        { id: 'ai', label: 'IA Superinteligente', icon: Brain },
        { id: 'community', label: 'Comunidade', icon: Users },
        { id: 'support', label: 'Suporte', icon: Shield },
        { id: 'advanced', label: 'Recursos Avançados', icon: Zap }
    ];

    const features: PlanFeature[] = [
        // Core Features
        {
            name: 'Acesso a Cursos Básicos',
            free: true,
            pro: true,
            enterprise: true,
            category: 'core'
        },
        {
            name: 'Acesso a TODOS os Cursos',
            free: false,
            pro: true,
            enterprise: true,
            category: 'core'
        },
        {
            name: 'Certificados de Conclusão',
            free: true,
            pro: true,
            enterprise: true,
            category: 'core'
        },
        {
            name: 'Certificados Premium',
            free: false,
            pro: true,
            enterprise: true,
            category: 'core'
        },
        {
            name: 'Acesso Vitalício aos Cursos',
            free: false,
            pro: true,
            enterprise: true,
            category: 'core'
        },

        // AI Features
        {
            name: 'IA Básica para Dúvidas',
            free: true,
            pro: false,
            enterprise: false,
            category: 'ai'
        },
        {
            name: 'IA Superinteligente Completa',
            free: false,
            pro: true,
            enterprise: true,
            category: 'ai'
        },
        {
            name: 'Análise de Código Avançada',
            free: false,
            pro: true,
            enterprise: true,
            category: 'ai'
        },
        {
            name: 'Roteiros de Aprendizado Personalizados',
            free: false,
            pro: true,
            enterprise: true,
            category: 'ai'
        },
        {
            name: 'Motor de Recomendações IA',
            free: false,
            pro: true,
            enterprise: true,
            category: 'ai'
        },

        // Community Features
        {
            name: 'Comunidade no Discord',
            free: true,
            pro: true,
            enterprise: true,
            category: 'community'
        },
        {
            name: 'Workshops Exclusivos',
            free: false,
            pro: true,
            enterprise: true,
            category: 'community'
        },
        {
            name: 'Acesso a Comunidade Premium',
            free: false,
            pro: true,
            enterprise: true,
            category: 'community'
        },

        // Support Features
        {
            name: 'Suporte por Email',
            free: true,
            pro: false,
            enterprise: false,
            category: 'support'
        },
        {
            name: 'Suporte Prioritário',
            free: false,
            pro: true,
            enterprise: true,
            category: 'support'
        },
        {
            name: 'Mentoria 1:1 (2x por mês)',
            free: false,
            pro: true,
            enterprise: true,
            category: 'support'
        },
        {
            name: 'Suporte Dedicado 24/7',
            free: false,
            pro: false,
            enterprise: true,
            category: 'support'
        },

        // Advanced Features
        {
            name: 'Projetos Práticos Exclusivos',
            free: false,
            pro: true,
            enterprise: true,
            category: 'advanced'
        },
        {
            name: 'Dashboard de Progresso',
            free: false,
            pro: true,
            enterprise: true,
            category: 'advanced'
        },
        {
            name: 'Relatórios de Aprendizado',
            free: false,
            pro: false,
            enterprise: true,
            category: 'advanced'
        },
        {
            name: 'Treinamentos Personalizados',
            free: false,
            pro: false,
            enterprise: true,
            category: 'advanced'
        },
        {
            name: 'Integração com LMS Corporativo',
            free: false,
            pro: false,
            enterprise: true,
            category: 'advanced'
        },
        {
            name: 'Consultoria Técnica Incluída',
            free: false,
            pro: false,
            enterprise: true,
            category: 'advanced'
        }
    ];

    const filteredFeatures = selectedCategory === 'all'
        ? features
        : features.filter(feature => feature.category === selectedCategory);

    const getFeatureValue = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            return value ? (
                <Check className="w-5 h-5 text-green-500" />
            ) : (
                <X className="w-5 h-5 text-gray-400" />
            );
        }
        return <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>;
    };

    const getCategoryIcon = (category: string) => {
        const categoryData = categories.find(c => c.id === category);
        return categoryData ? categoryData.icon : Star;
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'core': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'ai': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'community': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'support': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            case 'advanced': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Compare os Planos
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Veja todas as funcionalidades incluídas em cada plano
                </p>
            </div>

            {/* Category Filter */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category.id
                                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {category.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-4 font-medium text-gray-900 dark:text-white">
                                Funcionalidades
                            </th>
                            <th className="text-center p-4 font-medium text-gray-900 dark:text-white">
                                <div className="flex flex-col items-center">
                                    <BookOpen className="w-6 h-6 text-gray-500 mb-2" />
                                    <span>Gratuito</span>
                                    <span className="text-sm text-gray-500">R$ 0</span>
                                </div>
                            </th>
                            <th className="text-center p-4 font-medium text-gray-900 dark:text-white relative">
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                        Mais Popular
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Star className="w-6 h-6 text-blue-500 mb-2" />
                                    <span>Pro</span>
                                    <span className="text-sm text-gray-500">R$ 39/mês</span>
                                </div>
                            </th>
                            <th className="text-center p-4 font-medium text-gray-900 dark:text-white">
                                <div className="flex flex-col items-center">
                                    <Crown className="w-6 h-6 text-purple-500 mb-2" />
                                    <span>Enterprise</span>
                                    <span className="text-sm text-gray-500">R$ 149/mês</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFeatures.map((feature, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(feature.category)}`}>
                                            {feature.category}
                                        </span>
                                        <span className="text-gray-900 dark:text-white">{feature.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    {getFeatureValue(feature.free)}
                                </td>
                                <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/10">
                                    {getFeatureValue(feature.pro)}
                                </td>
                                <td className="p-4 text-center">
                                    {getFeatureValue(feature.enterprise)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => onSelectPlan?.('free')}
                        className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
                    >
                        <BookOpen className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <div className="font-medium text-gray-900 dark:text-white">Gratuito</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Começar grátis</div>
                    </button>

                    <button
                        onClick={() => onSelectPlan?.('pro')}
                        className="p-4 border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-center"
                    >
                        <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <div className="font-medium text-gray-900 dark:text-white">Pro</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">R$ 39/mês</div>
                    </button>

                    <button
                        onClick={() => onSelectPlan?.('enterprise')}
                        className="p-4 border border-purple-300 dark:border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-center"
                    >
                        <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <div className="font-medium text-gray-900 dark:text-white">Enterprise</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">R$ 149/mês</div>
                    </button>
                </div>
            </div>

            {/* Summary */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Ainda tem dúvidas?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Nossa equipe está pronta para ajudar você a escolher o plano ideal
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Falar com Vendas
                        </button>
                        <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            Ver FAQ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanComparison;

