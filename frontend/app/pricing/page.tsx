'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    CheckCircle,
    Star,
    Zap,
    Crown,
    Shield,
    Users,
    BookOpen,
    MessageCircle,
    Award,
    Clock,
    ArrowRight,
    Sparkles,
    Target,
    Brain,
    Globe,
    Code,
    Play,
    ChevronDown,
    ChevronUp,
    Heart,
    Bookmark,
    Share2,
    Eye,
    ThumbsUp,
    TrendingUp,
    Rocket,
    Database,
    Smartphone,
    GraduationCap,
    Calendar,
    Tag,
    Filter as FilterIcon,
    RefreshCw
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import AdvancedParticles from '@/components/AdvancedParticles';
import VisualEffects from '@/components/VisualEffects';

interface PricingPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    period: string;
    popular: boolean;
    features: string[];
    buttonText: string;
    buttonColor: string;
    icon: React.ReactNode;
    badge?: string;
}

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(false);

    const plans: PricingPlan[] = [
        {
            id: 'starter',
            name: 'Starter',
            description: 'Perfeito para quem está começando na programação',
            price: isAnnual ? 97 : 197,
            originalPrice: isAnnual ? 197 : 297,
            period: isAnnual ? 'ano' : 'mês',
            popular: false,
            features: [
                'Acesso a 10 cursos básicos',
                'IDE online completa',
                'Certificado de conclusão',
                'Suporte por email',
                'Comunidade básica',
                'Projetos práticos',
                'Acesso por 1 ano'
            ],
            buttonText: 'Começar Agora',
            buttonColor: 'bg-gray-600 hover:bg-gray-700',
            icon: <BookOpen className="w-8 h-8" />,
            badge: 'Mais Popular'
        },
        {
            id: 'professional',
            name: 'Professional',
            description: 'Para desenvolvedores que querem acelerar a carreira',
            price: isAnnual ? 197 : 397,
            originalPrice: isAnnual ? 397 : 597,
            period: isAnnual ? 'ano' : 'mês',
            popular: true,
            features: [
                'Acesso a todos os cursos (50+)',
                'IDE avançada com IA',
                'Certificados reconhecidos',
                'Suporte prioritário 24/7',
                'Mentoria personalizada',
                'Projetos reais',
                'Acesso vitalício',
                'Comunidade premium',
                'Workshops exclusivos',
                'Garantia de 30 dias'
            ],
            buttonText: 'Escolher Professional',
            buttonColor: 'bg-blue-600 hover:bg-blue-700',
            icon: <Crown className="w-8 h-8" />,
            badge: 'Recomendado'
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'Para empresas e equipes de desenvolvimento',
            price: isAnnual ? 497 : 997,
            originalPrice: isAnnual ? 997 : 1497,
            period: isAnnual ? 'ano' : 'mês',
            popular: false,
            features: [
                'Tudo do Professional',
                'Gestão de equipes',
                'Relatórios avançados',
                'Suporte dedicado',
                'Treinamentos customizados',
                'Integração com ferramentas',
                'SLA garantido',
                'Consultoria técnica',
                'Acesso a beta features',
                'Suporte por telefone'
            ],
            buttonText: 'Falar com Vendas',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
            icon: <Shield className="w-8 h-8" />,
            badge: 'Para Empresas'
        }
    ];

    const features = [
        {
            icon: <Code className="w-6 h-6" />,
            title: 'IDE Integrada',
            description: 'Desenvolva diretamente no navegador sem instalação'
        },
        {
            icon: <Brain className="w-6 h-6" />,
            title: 'IA Superinteligente',
            description: 'Assistentes de IA para acelerar seu aprendizado'
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: 'Mentoria Personalizada',
            description: 'Acompanhamento individual com especialistas'
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: 'Certificados Reconhecidos',
            description: 'Certificados válidos no mercado de trabalho'
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: 'Comunidade Global',
            description: 'Conecte-se com desenvolvedores do mundo todo'
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: 'Projetos Reais',
            description: 'Desenvolva projetos do mundo real para seu portfólio'
        }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16">
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium mb-6 animate-glow">
                        <Sparkles className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
                        <span className="gradient-text-neon">Planos Flexíveis</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-8">
                        Escolha seu <span className="gradient-text-neon animate-neon">Plano</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                        Planos flexíveis para todos os níveis. Comece grátis e evolua conforme sua necessidade.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center mb-16">
                        <div className="glass-tech rounded-2xl p-2">
                            <div className="flex items-center space-x-4">
                                <span className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${!isAnnual ? 'gradient-text bg-white/20 border border-blue-400/30' : 'text-white/90'}`}>
                                    Mensal
                                </span>
                                <button
                                    onClick={() => setIsAnnual(!isAnnual)}
                                    className={`relative inline-flex h-12 w-20 items-center rounded-xl transition-all duration-300 ${isAnnual ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/10 border border-white/20'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-8 w-8 transform rounded-lg bg-white transition-transform duration-300 shadow-lg ${isAnnual ? 'translate-x-10' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                                <span className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isAnnual ? 'gradient-text bg-white/20 border border-blue-400/30' : 'text-white/90'}`}>
                                    Anual
                                    <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                                        -50%
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-24 relative">
                <div className="absolute inset-0 tech-grid opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative card group hover:scale-105 transition-all duration-500 ${plan.popular ? 'ring-2 ring-blue-500 scale-105 border-blue-500/50' : 'hover:border-blue-500/50'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg animate-glow">
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 fill-current" />
                                                {plan.badge}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {plan.badge && !plan.popular && (
                                    <div className="absolute -top-3 -right-3">
                                        <div className="bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
                                            {plan.badge}
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:gradient-text transition-colors duration-300">{plan.name}</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">{plan.description}</p>
                                </div>

                                <div className="text-center mb-8">
                                    <div className="flex items-center justify-center mb-3">
                                        <span className="text-6xl font-bold text-white">R$ {plan.price}</span>
                                        <span className="text-gray-300 ml-2 text-xl">/{plan.period}</span>
                                    </div>
                                    {plan.originalPrice && (
                                        <div className="text-gray-300 line-through text-lg">
                                            R$ {plan.originalPrice}/{plan.period}
                                        </div>
                                    )}
                                    {plan.originalPrice && (
                                        <div className="mt-2">
                                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-sm font-bold">
                                                Economize R$ {plan.originalPrice - plan.price}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                            <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={`${ROUTES.COMEÇAR_AGORA}?plan=${plan.id}`}
                                    className={`w-full btn-primary group flex items-center justify-center`}
                                >
                                    {plan.buttonText}
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 tech-grid opacity-5"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium mb-6 animate-glow">
                            <Award className="w-5 h-5 mr-2 text-yellow-400" />
                            <span className="gradient-text-neon">Tecnologia de Ponta</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Por que escolher a <span className="gradient-text-neon animate-neon">Fênix Academy</span>?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Oferecemos a melhor experiência de aprendizado em programação com tecnologia de ponta
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="card group hover:scale-105 transition-all duration-500 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-colors duration-300">{feature.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 tech-grid opacity-10"></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium mb-6 animate-glow">
                            <MessageCircle className="w-5 h-5 mr-2 text-yellow-400" />
                            <span className="gradient-text-neon">Dúvidas Frequentes</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="gradient-text-neon animate-neon">Perguntas</span> Frequentes
                        </h2>
                        <p className="text-xl text-gray-300">
                            Tire suas dúvidas sobre nossos planos e serviços
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                question: "Posso cancelar minha assinatura a qualquer momento?",
                                answer: "Sim, você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento e você continuará tendo acesso até o final do período pago."
                            },
                            {
                                question: "Os certificados são reconhecidos pelo mercado?",
                                answer: "Sim, nossos certificados são reconhecidos por empresas de tecnologia e validados por especialistas da área. Eles podem ser verificados online."
                            },
                            {
                                question: "Há garantia de satisfação?",
                                answer: "Oferecemos garantia de 30 dias. Se não ficar satisfeito, devolvemos seu dinheiro sem perguntas."
                            },
                            {
                                question: "Posso trocar de plano a qualquer momento?",
                                answer: "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. A diferença será calculada proporcionalmente."
                            },
                            {
                                question: "O suporte está disponível 24/7?",
                                answer: "Sim, oferecemos suporte 24/7 para planos Professional e Enterprise. O plano Starter tem suporte por email com resposta em até 24h."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="card group hover:scale-105 transition-all duration-500">
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-colors duration-300">{faq.question}</h3>
                                <p className="text-gray-300 leading-relaxed text-lg">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 animate-glow">
                        Pronto para transformar sua <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-neon">carreira</span>?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Junte-se a mais de 50.000 desenvolvedores que já mudaram suas vidas
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            href={ROUTES.COMEÇAR_AGORA}
                            className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl group"
                        >
                            <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                            Começar Agora
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href={ROUTES.COURSES}
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                        >
                            <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            Ver Cursos
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}