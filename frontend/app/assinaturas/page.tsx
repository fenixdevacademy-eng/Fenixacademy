'use client';

import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Rocket, Shield, Users, Award, Clock, BookOpen, Code, Target, TrendingUp, Brain, Gift, ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';
import CheckoutModal from '../../components/CheckoutModal';
import PlanComparison from '../../components/PlanComparison';
import SubscriptionStats from '../../components/SubscriptionStats';
import SupportChat from '../../components/SupportChat';

interface PricingPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    period: string;
    features: string[];
    popular?: boolean;
    icon: React.ComponentType<any>;
    color: string;
    buttonText: string;
    buttonVariant: 'primary' | 'secondary' | 'premium';
}

export default function AssinaturasPage() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [showCheckout, setShowCheckout] = useState(false);
    const [checkoutPlan, setCheckoutPlan] = useState<PricingPlan | null>(null);
    const [showSupportChat, setShowSupportChat] = useState(false);

    const plans: PricingPlan[] = [
        {
            id: 'free',
            name: 'Gratuito',
            description: 'Perfeito para começar sua jornada',
            price: 0,
            period: 'sempre',
            features: [
                'Acesso a 3 cursos básicos',
                'IA básica para dúvidas',
                'Comunidade no Discord',
                'Certificados de conclusão',
                'Suporte por email',
                'Acesso por 30 dias'
            ],
            icon: BookOpen,
            color: 'bg-gray-500',
            buttonText: 'Começar Grátis',
            buttonVariant: 'secondary'
        },
        {
            id: 'pro',
            name: 'Pro',
            description: 'Para desenvolvedores sérios',
            price: billingCycle === 'yearly' ? 29 : 39,
            originalPrice: billingCycle === 'yearly' ? 39 : undefined,
            period: billingCycle === 'yearly' ? 'ano' : 'mês',
            features: [
                'Acesso a TODOS os cursos',
                'IA Superinteligente completa',
                'Análise de código avançada',
                'Roteiros de aprendizado personalizados',
                'Projetos práticos exclusivos',
                'Mentoria 1:1 (2x por mês)',
                'Certificados premium',
                'Suporte prioritário',
                'Acesso vitalício aos cursos',
                'Workshops exclusivos'
            ],
            popular: true,
            icon: Star,
            color: 'bg-blue-500',
            buttonText: 'Assinar Pro',
            buttonVariant: 'primary'
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'Para equipes e empresas',
            price: billingCycle === 'yearly' ? 99 : 149,
            originalPrice: billingCycle === 'yearly' ? 149 : undefined,
            period: billingCycle === 'yearly' ? 'ano' : 'mês',
            features: [
                'Tudo do plano Pro',
                'Acesso para até 50 usuários',
                'Dashboard de progresso da equipe',
                'Relatórios de aprendizado',
                'Treinamentos personalizados',
                'Integração com LMS corporativo',
                'Suporte dedicado 24/7',
                'SLA garantido',
                'Consultoria técnica incluída',
                'Customização da plataforma'
            ],
            icon: Crown,
            color: 'bg-purple-500',
            buttonText: 'Falar com Vendas',
            buttonVariant: 'premium'
        }
    ];

    const benefits = [
        {
            icon: Brain,
            title: 'IA Superinteligente',
            description: 'Nossa IA aprende com você e oferece respostas personalizadas'
        },
        {
            icon: Code,
            title: 'Análise de Código',
            description: 'Receba feedback instantâneo e sugestões de melhoria'
        },
        {
            icon: Target,
            title: 'Roteiros Personalizados',
            description: 'Caminhos de aprendizado adaptados aos seus objetivos'
        },
        {
            icon: Users,
            title: 'Comunidade Ativa',
            description: 'Conecte-se com outros desenvolvedores e mentores'
        },
        {
            icon: Award,
            title: 'Certificados Reconhecidos',
            description: 'Certificações que agregam valor ao seu currículo'
        },
        {
            icon: Rocket,
            title: 'Projetos Reais',
            description: 'Aprenda construindo projetos do mundo real'
        }
    ];

    const testimonials = [
        {
            name: 'Maria Silva',
            role: 'Desenvolvedora Frontend',
            company: 'Nubank',
            content: 'A Fenix Academy transformou minha carreira. Em 6 meses consegui uma vaga sênior!',
            rating: 5
        },
        {
            name: 'João Santos',
            role: 'Tech Lead',
            company: 'iFood',
            content: 'A IA superinteligente é incrível. Resolveu dúvidas que eu tinha há meses.',
            rating: 5
        },
        {
            name: 'Ana Costa',
            role: 'Data Scientist',
            company: 'Mercado Livre',
            content: 'Os roteiros personalizados me ajudaram a focar no que realmente importa.',
            rating: 5
        }
    ];

    const handleSelectPlan = (planId: string) => {
        setSelectedPlan(planId);
        const plan = plans.find(p => p.id === planId);
        if (plan) {
            setCheckoutPlan(plan);
            setShowCheckout(true);
        }
    };

    const handleCheckoutSuccess = (planId: string) => {
        console.log('Assinatura realizada com sucesso:', planId);
        setShowCheckout(false);
        setCheckoutPlan(null);
        // Aqui você pode redirecionar para a área do membro ou mostrar uma mensagem de sucesso
    };

    const getButtonStyles = (variant: string) => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-500 hover:bg-blue-600 text-white';
            case 'secondary':
                return 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white';
            case 'premium':
                return 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white';
            default:
                return 'bg-gray-100 hover:bg-gray-200 text-gray-900';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Escolha Seu Plano de
                            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Aprendizado
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            Transforme sua carreira com a melhor plataforma de ensino de tecnologia do Brasil
                        </p>

                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white' : 'text-blue-200'}`}>
                                Mensal
                            </span>
                            <button
                                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                            <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white' : 'text-blue-200'}`}>
                                Anual
                            </span>
                            {billingCycle === 'yearly' && (
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    -25% de desconto
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                                } transition-transform hover:scale-105`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                                        <Star className="w-4 h-4" />
                                        Mais Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <div className={`inline-flex p-3 rounded-full ${plan.color} text-white mb-4`}>
                                    <plan.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {plan.description}
                                </p>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                        R$ {plan.price}
                                    </span>
                                    {plan.originalPrice && (
                                        <span className="text-xl text-gray-500 line-through ml-2">
                                            R$ {plan.originalPrice}
                                        </span>
                                    )}
                                    <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSelectPlan(plan.id)}
                                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${getButtonStyles(plan.buttonVariant)}`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white dark:bg-gray-800 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Por que escolher a Fenix Academy?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Nossa plataforma combina tecnologia de ponta com metodologia comprovada para acelerar seu aprendizado
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                                    <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white dark:bg-gray-800 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <SubscriptionStats />
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-gray-50 dark:bg-gray-900 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            O que nossos alunos dizem
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Mais de 50.000 desenvolvedores já transformaram suas carreiras conosco
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                                    "{testimonial.content}"
                                </p>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {testimonial.role} na {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Plan Comparison */}
            <div className="bg-gray-50 dark:bg-gray-900 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Compare os Planos
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Veja todas as funcionalidades incluídas em cada plano
                        </p>
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <PlanComparison onSelectPlan={handleSelectPlan} />
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-800 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Perguntas Frequentes
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {[
                            {
                                question: 'Posso cancelar minha assinatura a qualquer momento?',
                                answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento e você continuará tendo acesso até o final do período pago.'
                            },
                            {
                                question: 'Os cursos são atualizados regularmente?',
                                answer: 'Sim! Nossos cursos são atualizados constantemente para refletir as últimas tendências e tecnologias do mercado. Você terá acesso a todas as atualizações gratuitamente.'
                            },
                            {
                                question: 'Posso acessar os cursos offline?',
                                answer: 'Atualmente, nossos cursos são acessíveis online. Estamos trabalhando em uma funcionalidade de download para acesso offline em breve.'
                            },
                            {
                                question: 'Há garantia de reembolso?',
                                answer: 'Oferecemos garantia de 30 dias. Se você não ficar satisfeito, devolvemos 100% do seu dinheiro, sem perguntas.'
                            },
                            {
                                question: 'Como funciona a mentoria 1:1?',
                                answer: 'A mentoria 1:1 está disponível no plano Pro e Enterprise. Você pode agendar sessões com nossos mentores especialistas para tirar dúvidas e receber orientação personalizada.'
                            }
                        ].map((faq, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Pronto para transformar sua carreira?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Junte-se a milhares de desenvolvedores que já mudaram suas vidas
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                            <Rocket className="w-5 h-5" />
                            Começar Agora
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-2">
                            <Gift className="w-5 h-5" />
                            Teste Grátis por 7 dias
                        </button>
                    </div>
                </div>
            </div>

            {/* Checkout Modal */}
            {checkoutPlan && (
                <CheckoutModal
                    isOpen={showCheckout}
                    onClose={() => setShowCheckout(false)}
                    selectedPlan={checkoutPlan}
                    onSuccess={handleCheckoutSuccess}
                />
            )}

            {/* Support Chat */}
            <SupportChat
                isOpen={showSupportChat}
                onClose={() => setShowSupportChat(false)}
            />

            {/* Support Button */}
            <button
                onClick={() => setShowSupportChat(true)}
                className="fixed bottom-4 left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-40"
            >
                <MessageCircle className="w-6 h-6" />
            </button>
        </div>
    );
}