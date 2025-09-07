'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, Star, Zap, Rocket, Crown, Shield, Users, Clock, BookOpen, Award } from 'lucide-react';

interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    period: 'monthly' | 'yearly' | 'lifetime';
    features: string[];
    popular?: boolean;
    decolar?: boolean;
    savings?: number;
    badge?: string;
    icon: React.ReactNode;
    color: string;
}

export default function SubscriptionsPage() {
    const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly' | 'lifetime'>('yearly');
    const [showDecolarModal, setShowDecolarModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const plans: Plan[] = [
        {
            id: 'starter',
            name: 'Starter',
            description: 'Ideal para iniciantes que querem começar sua jornada',
            price: 97,
            period: 'monthly',
            features: [
                'Acesso a 5 cursos básicos',
                'IDE FENIX integrada',
                'Certificados de conclusão',
                'Suporte da comunidade',
                'Atualizações de conteúdo',
                'Projetos práticos incluídos'
            ],
            icon: <BookOpen className="w-8 h-8" />,
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'pro',
            name: 'Pro',
            description: 'Para desenvolvedores que querem se especializar',
            price: 197,
            originalPrice: 297,
            period: 'monthly',
            features: [
                'Acesso a TODOS os 14 cursos',
                'IDE FENIX premium',
                'Certificados profissionais',
                'Suporte prioritário',
                'Projetos avançados',
                'Mentoria em grupo',
                'Acesso antecipado a novos cursos',
                'Workshops exclusivos'
            ],
            popular: true,
            icon: <Star className="w-8 h-8" />,
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'Solução completa para empresas e equipes',
            price: 497,
            period: 'monthly',
            features: [
                'Tudo do plano Pro',
                'Licenças para equipe',
                'Dashboard de gestão',
                'Relatórios avançados',
                'Suporte 24/7',
                'Treinamentos personalizados',
                'API de integração',
                'SLA garantido'
            ],
            icon: <Crown className="w-8 h-8" />,
            color: 'from-yellow-500 to-yellow-600'
        }
    ];

    const yearlyPlans: Plan[] = [
        {
            id: 'starter-yearly',
            name: 'Starter Anual',
            description: 'Economia de 20% com plano anual',
            price: 797,
            originalPrice: 1164,
            period: 'yearly',
            savings: 20,
            features: [
                'Acesso a 5 cursos básicos',
                'IDE FENIX integrada',
                'Certificados de conclusão',
                'Suporte da comunidade',
                'Atualizações de conteúdo',
                'Projetos práticos incluídos',
                '🎁 2 meses grátis'
            ],
            icon: <BookOpen className="w-8 h-8" />,
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'pro-yearly',
            name: 'Pro Anual',
            description: 'Melhor custo-benefício com economia de 32%',
            price: 1597,
            originalPrice: 2364,
            period: 'yearly',
            savings: 32,
            popular: true,
            decolar: true,
            badge: '🚀 DECOLAR',
            features: [
                'Acesso a TODOS os 14 cursos',
                'IDE FENIX premium',
                'Certificados profissionais',
                'Suporte prioritário',
                'Projetos avançados',
                'Mentoria em grupo',
                'Acesso antecipado a novos cursos',
                'Workshops exclusivos',
                '🎁 4 meses grátis',
                '🔥 Acesso vitalício aos cursos básicos'
            ],
            icon: <Rocket className="w-8 h-8" />,
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 'enterprise-yearly',
            name: 'Enterprise Anual',
            description: 'Solução empresarial com máxima economia',
            price: 3997,
            originalPrice: 5964,
            period: 'yearly',
            savings: 33,
            features: [
                'Tudo do plano Pro',
                'Licenças para equipe',
                'Dashboard de gestão',
                'Relatórios avançados',
                'Suporte 24/7',
                'Treinamentos personalizados',
                'API de integração',
                'SLA garantido',
                '🎁 3 meses grátis',
                '🔥 Desconto em licenças adicionais'
            ],
            icon: <Crown className="w-8 h-8" />,
            color: 'from-yellow-500 to-yellow-600'
        }
    ];

    const lifetimePlans: Plan[] = [
        {
            id: 'lifetime-basic',
            name: 'Lifetime Básico',
            description: 'Acesso vitalício aos cursos fundamentais',
            price: 997,
            originalPrice: 1997,
            period: 'lifetime',
            savings: 50,
            features: [
                'Acesso vitalício a 7 cursos básicos',
                'IDE FENIX integrada',
                'Certificados de conclusão',
                'Suporte da comunidade',
                'Atualizações de conteúdo',
                'Projetos práticos incluídos',
                '🔥 Sem mensalidades',
                '🎁 Acesso a novos cursos básicos'
            ],
            icon: <Shield className="w-8 h-8" />,
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'lifetime-pro',
            name: 'Lifetime Pro',
            description: 'Acesso vitalício completo com máximo valor',
            price: 1997,
            originalPrice: 4997,
            period: 'lifetime',
            savings: 60,
            popular: true,
            decolar: true,
            badge: '🚀 DECOLAR',
            features: [
                'Acesso vitalício a TODOS os cursos',
                'IDE FENIX premium vitalícia',
                'Certificados profissionais',
                'Suporte prioritário vitalício',
                'Projetos avançados',
                'Mentoria em grupo',
                'Acesso antecipado a novos cursos',
                'Workshops exclusivos',
                '🔥 Sem mensalidades para sempre',
                '🎁 Novos cursos incluídos automaticamente',
                '🔥 Acesso a funcionalidades premium futuras'
            ],
            icon: <Rocket className="w-8 h-8" />,
            color: 'from-purple-500 to-purple-600'
        }
    ];

    const getCurrentPlans = () => {
        switch (selectedPeriod) {
            case 'monthly':
                return plans;
            case 'yearly':
                return yearlyPlans;
            case 'lifetime':
                return lifetimePlans;
            default:
                return plans;
        }
    };

    const handleDecolarClick = (plan: Plan) => {
        setSelectedPlan(plan);
        setShowDecolarModal(true);
    };

    const currentPlans = getCurrentPlans();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            🚀 Planos de Assinatura - Fenix Academy
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                            Escolha o plano ideal para sua jornada de desenvolvimento
                        </p>

                        {/* Period Toggle */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-white rounded-xl p-2 shadow-lg border">
                                <div className="flex space-x-1">
                                    <button
                                        onClick={() => setSelectedPeriod('monthly')}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedPeriod === 'monthly'
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Mensal
                                    </button>
                                    <button
                                        onClick={() => setSelectedPeriod('yearly')}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedPeriod === 'yearly'
                                                ? 'bg-purple-600 text-white shadow-lg'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Anual
                                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                            +32% OFF
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => setSelectedPeriod('lifetime')}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedPeriod === 'lifetime'
                                                ? 'bg-green-600 text-white shadow-lg'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Vitalício
                                        <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                            +60% OFF
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Decolar Banner */}
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 mb-12 text-white text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-6xl mb-4">🚀</div>
                        <h2 className="text-3xl font-bold mb-4">
                            FUNCIONALIDADE DECOLAR ATIVADA!
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            Ofertas especiais para impulsionar sua carreira em desenvolvimento
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="bg-white/20 rounded-lg p-4">
                                <div className="text-2xl mb-2">🔥</div>
                                <h3 className="font-bold">Economia Máxima</h3>
                                <p className="text-sm opacity-90">Até 60% de desconto</p>
                            </div>
                            <div className="bg-white/20 rounded-lg p-4">
                                <div className="text-2xl mb-2">🎁</div>
                                <h3 className="font-bold">Bônus Exclusivos</h3>
                                <p className="text-sm opacity-90">Meses grátis incluídos</p>
                            </div>
                            <div className="bg-white/20 rounded-lg p-4">
                                <div className="text-2xl mb-2">⚡</div>
                                <h3 className="font-bold">Acesso Vitalício</h3>
                                <p className="text-sm opacity-90">Sem mensalidades</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {currentPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all transform hover:scale-105 ${plan.popular ? 'border-purple-500 ring-4 ring-purple-200' : 'border-gray-200'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold text-sm">
                                        ⭐ MAIS POPULAR
                                    </div>
                                </div>
                            )}

                            {/* Decolar Badge */}
                            {plan.decolar && (
                                <div className="absolute -top-4 right-4">
                                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse">
                                        🚀 DECOLAR
                                    </div>
                                </div>
                            )}

                            <div className="p-8">
                                {/* Plan Header */}
                                <div className="text-center mb-6">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} text-white mb-4`}>
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600">{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div className="text-center mb-6">
                                    <div className="flex items-center justify-center space-x-2 mb-2">
                                        <span className="text-4xl font-bold text-gray-900">
                                            R$ {plan.price}
                                        </span>
                                        {plan.originalPrice && (
                                            <span className="text-lg text-gray-500 line-through">
                                                R$ {plan.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-gray-600">
                                        {plan.period === 'monthly' && 'por mês'}
                                        {plan.period === 'yearly' && 'por ano'}
                                        {plan.period === 'lifetime' && 'pagamento único'}
                                    </div>
                                    {plan.savings && (
                                        <div className="mt-2">
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                💰 Economia de {plan.savings}%
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Features */}
                                <div className="mb-8">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleDecolarClick(plan)}
                                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${plan.decolar
                                            ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg'
                                            : plan.popular
                                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg'
                                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg'
                                        }`}
                                >
                                    {plan.decolar ? '🚀 DECOLAR AGORA!' : 'Começar Agora'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Benefits */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        🎁 Benefícios Exclusivos da Fenix Academy
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Rocket className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">IDE FENIX Integrada</h3>
                            <p className="text-gray-600 text-sm">Ambiente de desenvolvimento profissional integrado</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Qualidade CS50</h3>
                            <p className="text-gray-600 text-sm">Padrão Harvard de excelência acadêmica</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Comunidade Ativa</h3>
                            <p className="text-gray-600 text-sm">Suporte e networking com outros desenvolvedores</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-yellow-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Conteúdo Atualizado</h3>
                            <p className="text-gray-600 text-sm">Sempre com as últimas tecnologias do mercado</p>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        ❓ Perguntas Frequentes
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">
                                Posso cancelar minha assinatura a qualquer momento?
                            </h3>
                            <p className="text-gray-600">
                                Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">
                                Os cursos são atualizados regularmente?
                            </h3>
                            <p className="text-gray-600">
                                Absolutamente! Nossos cursos são atualizados constantemente com as últimas tecnologias.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">
                                Tenho acesso à IDE FENIX com todos os planos?
                            </h3>
                            <p className="text-gray-600">
                                Sim! A IDE FENIX está incluída em todos os planos, com funcionalidades premium nos planos superiores.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decolar Modal */}
            {showDecolarModal && selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">🚀</div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                FUNCIONALIDADE DECOLAR ATIVADA!
                            </h2>
                            <p className="text-xl text-gray-600">
                                Você selecionou o plano {selectedPlan.name} com oferta especial!
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">
                                🎁 Ofertas Especiais Decolar:
                            </h3>
                            <ul className="space-y-2">
                                {selectedPlan.features.filter(f => f.includes('🎁') || f.includes('🔥')).map((feature, index) => (
                                    <li key={index} className="flex items-center space-x-2">
                                        <span className="text-2xl">{feature.includes('🎁') ? '🎁' : '🔥'}</span>
                                        <span className="text-gray-700">{feature.replace('🎁 ', '').replace('🔥 ', '')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                R$ {selectedPlan.price}
                            </div>
                            {selectedPlan.originalPrice && (
                                <div className="text-lg text-gray-500 line-through mb-2">
                                    R$ {selectedPlan.originalPrice}
                                </div>
                            )}
                            {selectedPlan.savings && (
                                <div className="text-green-600 font-bold text-lg mb-4">
                                    💰 Economia de {selectedPlan.savings}%!
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowDecolarModal(false)}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
                            >
                                Voltar aos Planos
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105">
                                🚀 DECOLAR AGORA!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

