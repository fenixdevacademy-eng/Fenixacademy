'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

const subscriptionPlans = [
    {
        name: "Fenix Starter",
        monthlyPrice: 49.90,
        yearlyPrice: 39.90,
        period: "por mês",
        description: "Para quem está começando sua jornada na programação",
        features: [
            "Acesso a 3 cursos fundamentais",
            "Suporte por email",
            "Certificados básicos",
            "Acesso por 30 dias",
            "Comunidade básica",
            "Exercícios práticos",
            "Material de apoio"
        ],
        popular: false,
        color: "border-orange-300",
        buttonColor: "bg-orange-500 hover:bg-orange-600",
        badge: "🔥 Iniciante"
    },
    {
        name: "Fenix Pro",
        monthlyPrice: 79.90,
        yearlyPrice: 64.90,
        period: "por mês",
        description: "Para desenvolvedores que querem voar alto",
        features: [
            "Acesso a 8 cursos completos",
            "Suporte prioritário por chat",
            "Certificados premium",
            "Acesso por 30 dias",
            "Comunidade exclusiva",
            "Projetos práticos",
            "Code reviews básicos",
            "Mentoria em grupo mensal",
            "Acesso a workshops"
        ],
        popular: true,
        color: "border-red-500",
        buttonColor: "bg-red-500 hover:bg-red-600",
        badge: "⚡ Mais Popular"
    },
    {
        name: "Fenix Master",
        monthlyPrice: 129.90,
        yearlyPrice: 104.90,
        period: "por mês",
        description: "Para quem quer dominar todas as tecnologias",
        features: [
            "Acesso a todos os cursos (15+)",
            "Suporte VIP por WhatsApp",
            "Certificados avançados",
            "Acesso por 30 dias",
            "Comunidade VIP",
            "Projetos complexos",
            "Code reviews detalhados",
            "Mentoria individual mensal",
            "Acesso antecipado a novos cursos",
            "Consultoria de carreira",
            "Networking exclusivo",
            "Descontos em parceiros"
        ],
        popular: false,
        color: "border-purple-500",
        buttonColor: "bg-purple-500 hover:bg-purple-600",
        badge: "👑 Master"
    }
];

const courseCategories = [
    {
        title: "Fundamentos Web",
        description: "HTML, CSS, JavaScript básico",
        color: "text-orange-600",
        icon: "🌐"
    },
    {
        title: "Frontend Avançado",
        description: "React, Vue, Angular",
        color: "text-blue-600",
        icon: "⚛️"
    },
    {
        title: "Backend & APIs",
        description: "Node.js, Python, Java",
        color: "text-green-600",
        icon: "🔧"
    },
    {
        title: "Mobile Development",
        description: "React Native, Flutter",
        color: "text-purple-600",
        icon: "📱"
    },
    {
        title: "DevOps & Cloud",
        description: "Docker, AWS, CI/CD",
        color: "text-red-600",
        icon: "☁️"
    },
    {
        title: "Data Science",
        description: "Python, Machine Learning",
        color: "text-indigo-600",
        icon: "📊"
    }
];

const benefits = [
    {
        title: "Acesso Ilimitado",
        description: "Estude quantos cursos quiser durante sua assinatura",
        color: "text-green-600",
        icon: "♾️"
    },
    {
        title: "Suporte 24/7",
        description: "Nossa equipe está sempre disponível para ajudar",
        color: "text-blue-600",
        icon: "🆘"
    },
    {
        title: "Certificados",
        description: "Receba certificados reconhecidos pelo mercado",
        color: "text-yellow-600",
        icon: "🏆"
    },
    {
        title: "Comunidade Ativa",
        description: "Conecte-se com outros desenvolvedores",
        color: "text-purple-600",
        icon: "👥"
    },
    {
        title: "Projetos Práticos",
        description: "Aprenda fazendo projetos reais",
        color: "text-red-600",
        icon: "💻"
    },
    {
        title: "Atualizações Gratuitas",
        description: "Conteúdo sempre atualizado com as últimas tecnologias",
        color: "text-indigo-600",
        icon: "🔄"
    }
];

export default function AssinaturasPage() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    const getPrice = (plan: any) => {
        return billingPeriod === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
    };

    const getSavings = (plan: any) => {
        return (plan.monthlyPrice * 12) - (plan.yearlyPrice * 12);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header com tema Fenix */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="mb-6">
                            <span className="text-6xl">🔥</span>
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-6">
                            Fenix Academy
                        </h1>
                        <h2 className="text-3xl font-bold text-orange-400 mb-4">
                            Escolha seu Plano de Voo
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Transforme sua carreira com acesso completo a todos os cursos,
                            projetos práticos e uma comunidade que voa alto como você.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Billing Toggle com estilo Fenix */}
                <div className="flex justify-center mb-16">
                    <div className="bg-gray-800 rounded-2xl p-2 shadow-2xl border border-gray-700">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${billingPeriod === 'monthly'
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                        >
                            Mensal
                        </button>
                        <button
                            onClick={() => setBillingPeriod('yearly')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${billingPeriod === 'yearly'
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                        >
                            Anual
                            <span className="ml-2 text-sm text-orange-300">-20%</span>
                        </button>
                    </div>
                </div>

                {/* Subscription Plans com design Fenix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {subscriptionPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`bg-gray-800 rounded-3xl shadow-2xl border-2 p-8 relative transition-all duration-300 hover:transform hover:scale-105 ${plan.popular ? 'border-orange-500 ring-4 ring-orange-500/20' : plan.color
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                                        {plan.badge}
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <div className="mb-4">
                                    <span className="text-4xl">{plan.badge.split(' ')[0]}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 mb-4">{plan.description}</p>
                                <div className="mb-4">
                                    <span className="text-5xl font-bold text-orange-400">
                                        R$ {getPrice(plan).toFixed(2)}
                                    </span>
                                    <span className="text-gray-400 ml-2 text-lg">{plan.period}</span>
                                </div>
                                {billingPeriod === 'yearly' && (
                                    <div className="text-green-400 font-bold text-lg">
                                        💰 Economia de R$ {getSavings(plan).toFixed(2)}/ano
                                    </div>
                                )}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start">
                                        <Check className="w-5 h-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 px-6 rounded-2xl text-white font-bold text-lg transition-all duration-300 ${plan.buttonColor} hover:shadow-2xl hover:transform hover:scale-105`}>
                                {billingPeriod === 'yearly' ? 'Decolar Anual' : 'Decolar Mensal'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Course Categories com estilo Fenix */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            🚀 Tecnologias que Você Vai Dominar
                        </h2>
                        <p className="text-xl text-gray-400">
                            Acesso completo a todas as áreas de desenvolvimento
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courseCategories.map((category, index) => (
                            <div key={index} className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 hover:border-orange-500">
                                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center ${category.color}`}>
                                    <span className="text-4xl">{category.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{category.title}</h3>
                                <p className="text-gray-400">{category.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section com design Fenix */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            ⭐ Por que Escolher a Fenix?
                        </h2>
                        <p className="text-xl text-gray-400">
                            Tudo que você precisa para se tornar um desenvolvedor completo
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 hover:border-orange-500">
                                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center ${benefit.color}`}>
                                    <span className="text-4xl">{benefit.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                                <p className="text-gray-400">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section com tema escuro */}
                <div className="bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 p-10 mb-20">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        ❓ Perguntas Frequentes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-orange-400 mb-3">
                                Posso cancelar minha assinatura?
                            </h3>
                            <p className="text-gray-300">
                                Sim, você pode cancelar a qualquer momento. O acesso permanecerá ativo até o final do período pago.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-orange-400 mb-3">
                                Os cursos são atualizados?
                            </h3>
                            <p className="text-gray-300">
                                Sim, constantemente atualizamos nosso conteúdo para manter você atualizado com as últimas tecnologias.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-orange-400 mb-3">
                                Posso acessar de qualquer dispositivo?
                            </h3>
                            <p className="text-gray-300">
                                Sim, nossa plataforma é responsiva e funciona perfeitamente em computadores, tablets e smartphones.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-orange-400 mb-3">
                                Há suporte técnico disponível?
                            </h3>
                            <p className="text-gray-300">
                                Sim, oferecemos suporte técnico por email, chat e WhatsApp dependendo do seu plano.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section com estilo Fenix */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 shadow-2xl">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            🚀 Prepare-se para Decolar!
                        </h2>
                        <p className="text-xl text-orange-100 mb-8">
                            Junte-se a milhares de desenvolvedores que já transformaram suas carreiras com a Fenix Academy
                        </p>
                        <button className="bg-white text-orange-600 px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
                            🚀 Começar Agora
                        </button>
                        <p className="text-orange-200 mt-6 text-sm">
                            ⚡ 7 dias de teste grátis • 💳 Cancelamento a qualquer momento
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
