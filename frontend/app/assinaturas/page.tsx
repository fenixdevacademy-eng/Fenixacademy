'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    CheckCircle,
    Star,
    Crown,
    Zap,
    Users,
    Award,
    Clock,
    Shield,
    Gift,
    ArrowRight,
    Play,
    BookOpen,
    Brain,
    Code,
    Target,
    Globe,
    Lock,
    Unlock
} from 'lucide-react';
import FenixLogo from '@/components/FenixLogo';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdvancedParticles from '@/components/AdvancedParticles';
import VisualEffects from '@/components/VisualEffects';

export default function SubscriptionsPage() {
    const [loading, setLoading] = useState(true);
    const [foundersCount, setFoundersCount] = useState(0);

    useEffect(() => {
        // Simular carregamento
        const loadData = async () => {
            setLoading(true);
            try {
                // Simular contagem de fundadores
                setFoundersCount(Math.floor(Math.random() * 1000) + 50000);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const plans = [
        {
            id: 'founder',
            name: 'Fundador',
            price: 97,
            originalPrice: 997,
            discount: 90,
            duration: 'Vitalício',
            description: 'Para os primeiros 100.000 alunos que querem transformar suas vidas',
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
            borderColor: 'border-yellow-500/50',
            popular: true,
            badge: 'LIMITADO',
            features: [
                'Acesso a TODOS os cursos da Fénix',
                'Acesso vitalício garantido',
                'Novos cursos gratuitos para sempre',
                'Projetos práticos ilimitados',
                'Mentoria 1:1 semanal',
                'Certificado premium de fundador',
                'Suporte prioritário 24/7',
                'Comunidade exclusiva de fundadores',
                'Garantia de emprego ou devolução',
                'Badge especial de fundador',
                'Acesso a eventos exclusivos',
                'Networking com outros fundadores'
            ],
            icon: Crown,
            remaining: 100000 - foundersCount
        },
        {
            id: 'basic',
            name: 'Básico',
            price: 197,
            originalPrice: 397,
            discount: 50,
            duration: '3 meses',
            description: 'Perfeito para começar sua jornada na programação',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
            borderColor: 'border-blue-500/50',
            popular: false,
            features: [
                'Acesso a todos os módulos',
                'Exercícios práticos',
                'Suporte por email',
                'Certificado de conclusão',
                'Acesso por 3 meses',
                'Comunidade de alunos'
            ],
            icon: BookOpen
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 297,
            originalPrice: 597,
            discount: 50,
            duration: '6 meses',
            description: 'Para quem quer acelerar o aprendizado',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
            borderColor: 'border-purple-500/50',
            popular: false,
            features: [
                'Tudo do plano Básico',
                'Projetos práticos',
                'Mentoria 1:1',
                'Certificado premium',
                'Acesso vitalício',
                'Suporte prioritário',
                'Acesso a workshops',
                'Projetos em grupo'
            ],
            icon: Star
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: 497,
            originalPrice: 997,
            discount: 50,
            duration: '12 meses',
            description: 'Para profissionais que querem se destacar',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
            borderColor: 'border-green-500/50',
            popular: false,
            features: [
                'Tudo do plano Premium',
                'Projetos reais',
                'Mentoria ilimitada',
                'Certificado profissional',
                'Acesso vitalício',
                'Suporte 24/7',
                'Garantia de emprego',
                'Acesso a vagas exclusivas',
                'Networking profissional'
            ],
            icon: Award
        }
    ];

    const stats = [
        { icon: Users, value: '50.000+', label: 'Alunos Ativos' },
        { icon: BookOpen, value: '25+', label: 'Cursos Disponíveis' },
        { icon: Award, value: '95%', label: 'Taxa de Empregabilidade' },
        { icon: Globe, value: '15+', label: 'Países' }
    ];

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <AdvancedParticles />
                <VisualEffects />

                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                        <LoadingSpinner size="lg" />
                        <p className="text-gray-300 mt-4 text-lg">Carregando planos...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />
            {/* Hero Section */}
            <section className="relative pt-24 pb-16">
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mb-8">
                            <FenixLogo size="xl" variant="full" className="mx-auto" />
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                            Escolha seu <span className="gradient-text-neon animate-neon">Plano</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                            Transforme sua carreira com nossos planos flexíveis.
                            Seja um fundador e tenha acesso vitalício a todos os cursos por apenas R$ 97!
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            {stats.map((stat, index) => (
                                <div key={index} className="card group hover:scale-105 transition-all duration-500 text-center">
                                    <div className="flex items-center justify-center mb-2">
                                        <stat.icon className="w-8 h-8 text-blue-400 group-hover:animate-pulse" />
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-1 group-hover:animate-glow">{stat.value}</div>
                                    <div className="text-sm text-gray-300">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Founder Alert */}
                        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Crown className="w-8 h-8 text-yellow-400" />
                                <h3 className="text-2xl font-bold text-white">Plano Fundador - Oferta Limitada!</h3>
                            </div>
                            <p className="text-lg text-gray-300 mb-4">
                                Apenas <span className="font-bold text-yellow-400">{plans[0]?.remaining?.toLocaleString() || '0'}</span> vagas restantes de 100.000!
                            </p>
                            <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                                <div
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${(foundersCount / 100000) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-300">
                                {foundersCount.toLocaleString()} fundadores já se juntaram à revolução!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Plans Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative ${plan.bgColor} backdrop-blur-sm rounded-2xl p-8 border-2 ${plan.borderColor} hover:scale-105 transition-all duration-300 ${plan.popular ? 'ring-4 ring-yellow-500/50' : ''
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-sm">
                                        {plan.badge}
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                    <plan.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-300 text-sm mb-4">{plan.description}</p>

                                <div className="mb-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-4xl font-bold text-white">R$ {plan.price}</span>
                                        {plan.originalPrice && (
                                            <span className="text-gray-400 line-through text-lg">
                                                R$ {plan.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    {plan.discount && (
                                        <div className="text-green-400 text-sm font-medium">
                                            {plan.discount}% de desconto
                                        </div>
                                    )}
                                    <div className="text-gray-400 text-sm mt-1">{plan.duration}</div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                {plan.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-300 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={`/expanded-payment?course=all-courses&tier=${plan.id}`}
                                className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2`}
                            >
                                {plan.id === 'founder' ? 'Ser Fundador' : 'Escolher Plano'}
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            {plan.id === 'founder' && (
                                <div className="mt-4 text-center">
                                    <div className="text-yellow-400 text-sm font-medium">
                                        ⚡ Apenas {plan.remaining?.toLocaleString() || '0'} vagas restantes!
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Comparison */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Por que escolher a <span className="gradient-text-neon animate-neon">Fénix DEV ACADEMY</span>?
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="card group hover:scale-105 transition-all duration-500 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Brain className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-colors duration-300">Metodologia CS50</h3>
                        <p className="text-gray-300">
                            Aplicamos a metodologia de Harvard para máxima eficácia no aprendizado
                        </p>
                    </div>

                    <div className="card group hover:scale-105 transition-all duration-500 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Code className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-colors duration-300">Projetos Reais</h3>
                        <p className="text-gray-300">
                            Desenvolva projetos do mundo real durante o curso
                        </p>
                    </div>

                    <div className="card group hover:scale-105 transition-all duration-500 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-colors duration-300">Garantia de Emprego</h3>
                        <p className="text-gray-300">
                            Garantimos emprego ou devolvemos seu dinheiro
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Pronto para transformar sua carreira?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Junte-se aos fundadores e tenha acesso vitalício a todos os cursos por apenas R$ 97
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/expanded-payment?course=all-courses&tier=founder"
                            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                            <Crown className="w-6 h-6" />
                            Ser Fundador Agora
                        </Link>
                        <Link
                            href="/courses"
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2"
                        >
                            <Play className="w-5 h-5" />
                            Ver Cursos
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}