'use client';

import { useState } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import {
    Check,
    Star,
    Shield,
    Users,
    Award,
    Target,
    BookOpen,
    MessageCircle
} from 'lucide-react';
import SEOHead from '../components/SEOHeadServer';

const plans = [
    {
        name: "Básico",
        price: "R$ 97",
        originalPrice: "R$ 197",
        period: "por mês",
        description: "Ideal para quem está começando",
        features: [
            "Acesso a 5 cursos básicos",
            "Suporte por email",
            "Certificados básicos",
            "Acesso por 30 dias",
            "Comunidade básica"
        ],
        popular: false,
        color: "border-gray-300",
        buttonColor: "bg-gray-600 hover:bg-gray-700"
    },
    {
        name: "Profissional",
        price: "R$ 197",
        originalPrice: "R$ 397",
        period: "por mês",
        description: "Para desenvolvedores que querem crescer",
        features: [
            "Acesso a todos os cursos",
            "Suporte prioritário",
            "Certificados premium",
            "Acesso vitalício",
            "Comunidade exclusiva",
            "Projetos práticos",
            "Code reviews",
            "Mentoria em grupo"
        ],
        popular: true,
        color: "border-blue-500",
        buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
        name: "Fundador",
        price: "R$ 997",
        originalPrice: "R$ 1.997",
        period: "único",
        description: "Para quem quer ser pioneiro",
        features: [
            "Tudo do plano Profissional",
            "Acesso antecipado a novos cursos",
            "Suporte VIP (2h de resposta)",
            "Participação em decisões da plataforma",
            "Brindes exclusivos",
            "Consultoria de carreira",
            "Grupo VIP de networking",
            "Descontos vitalícios em parceiros",
            "Participação em eventos presenciais",
            "Badge especial no perfil"
        ],
        popular: false,
        color: "border-purple-500",
        buttonColor: "bg-purple-600 hover:bg-purple-700"
    }
];

const features = [
    {
        title: "Cursos Completos",
        description: "Mais de 50 cursos com conteúdo atualizado",
        icon: BookOpen,
        color: "text-blue-600"
    },
    {
        title: "Suporte Especializado",
        description: "Equipe dedicada para ajudar você",
        icon: MessageCircle,
        color: "text-green-600"
    },
    {
        title: "Certificados Reconhecidos",
        description: "Certificados válidos e reconhecidos pelo mercado",
        icon: Award,
        color: "text-yellow-600"
    },
    {
        title: "Comunidade Ativa",
        description: "Conecte-se com outros desenvolvedores",
        icon: Users,
        color: "text-purple-600"
    },
    {
        title: "Projetos Práticos",
        description: "Aprenda fazendo projetos reais",
        icon: Target,
        color: "text-red-600"
    },
    {
        title: "Acesso Vitalício",
        description: "Uma vez que você compra, é seu para sempre",
        icon: Shield,
        color: "text-indigo-600"
    }
];

export default function PricingPage() {
    const [billingPeriod, setBillingPeriod] = useState('monthly');

    return (
        <>
            <SEOHead
                title="Planos e Preços | Fenix Academy"
                description="Veja os planos e preços da Fenix Academy. Escolha o melhor para sua carreira em tecnologia."
                type="website"
                url="/pricing"
                pathname="/pricing"
            />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <AnimatedComponent
                            animation="slideUp"
                            duration={0.8}
                        >
                            <div className="flex justify-center mb-6">
                                <Star className="w-16 h-16" />
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                                Planos e Preços
                            </h1>
                            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
                                Escolha o plano ideal para sua jornada de aprendizado
                            </p>
                        </AnimatedComponent>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-16">
                    {/* Billing Toggle */}
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        delay={0.2}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
                            <button
                                onClick={() => setBillingPeriod('monthly')}
                                className={`px-6 py-2 rounded-md font-semibold transition-colors ${billingPeriod === 'monthly'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Mensal
                            </button>
                            <button
                                onClick={() => setBillingPeriod('yearly')}
                                className={`px-6 py-2 rounded-md font-semibold transition-colors ${billingPeriod === 'yearly'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Anual (20% OFF)
                            </button>
                        </div>
                    </AnimatedComponent>

                    {/* Plans */}
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        delay={0.4}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
                    >
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl shadow-lg border-2 p-8 relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                                    } ${plan.color}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            Mais Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-4">{plan.description}</p>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-gray-600 ml-2">{plan.period}</span>
                                    </div>
                                    {plan.originalPrice && (
                                        <div className="text-gray-500 line-through">{plan.originalPrice}</div>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${plan.buttonColor}`}>
                                    Escolher Plano
                                </button>
                            </div>
                        ))}
                    </AnimatedComponent>

                    {/* Features Section */}
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        delay={0.6}
                        className="mb-16"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Por que escolher a Fenix Academy?
                            </h2>
                            <p className="text-xl text-gray-600">
                                Oferecemos a melhor experiência de aprendizado em tecnologia
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm border p-6 text-center">
                                    <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedComponent>

                    {/* FAQ Section */}
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        delay={0.8}
                        className="bg-white rounded-2xl shadow-sm border p-8"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                            Perguntas Frequentes
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Posso cancelar minha assinatura?
                                </h3>
                                <p className="text-gray-600">
                                    Sim! Você pode cancelar a qualquer momento. Não há taxas de cancelamento.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Os cursos têm prazo de validade?
                                </h3>
                                <p className="text-gray-600">
                                    Não! Uma vez que você compra um curso, ele é seu para sempre.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Posso baixar os vídeos?
                                </h3>
                                <p className="text-gray-600">
                                    Os vídeos são para visualização online, garantindo conteúdo sempre atualizado.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Há garantia de satisfação?
                                </h3>
                                <p className="text-gray-600">
                                    Sim! Oferecemos 30 dias de garantia ou seu dinheiro de volta.
                                </p>
                            </div>
                        </div>
                    </AnimatedComponent>

                    {/* CTA Section */}
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        delay={1.0}
                        className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            Comece sua jornada hoje!
                        </h2>
                        <p className="text-xl mb-6 text-blue-100">
                            Junte-se a milhares de desenvolvedores que já transformaram suas carreiras
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                                Ver Todos os Cursos
                            </button>
                            <button className="border border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                                Falar com Especialista
                            </button>
                        </div>
                    </AnimatedComponent>
                </div>
            </div>
        </>
    );
} 