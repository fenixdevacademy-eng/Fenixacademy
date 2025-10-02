'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    CreditCard,
    DollarSign,
    Shield,
    CheckCircle,
    Clock,
    AlertCircle,
    ArrowRight,
    Sparkles,
    Users,
    Bell,
    Search,
    Menu,
    X as CloseIcon,
    Bookmark,
    Share2,
    ThumbsUp,
    RefreshCw,
    Filter as FilterIcon,
    SortAsc,
    SortDesc,
    ChevronDown,
    ChevronUp,
    Tag,
    Filter,
    RefreshCw as RefreshIcon,
    Trophy,
    GraduationCap,
    Lightbulb,
    Crown,
    MessageCircle,
    Calendar,
    TrendingUp,
    Target,
    Heart,
    Globe,
    BookOpen,
    Code,
    Brain,
    Zap,
    Star,
    Play,
    Clock as ClockIcon,
    User,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Database,
    Smartphone,
    Cloud,
    FileText
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import PageWrapperFunctional from '@/components/PageWrapperFunctional';

export default function PaymentsPage() {
    const [selectedPlan, setSelectedPlan] = useState('monthly');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const plans = [
        {
            id: 'monthly',
            name: 'Mensal',
            price: 97,
            originalPrice: 197,
            discount: 50,
            features: ['Acesso a todos os cursos', 'Suporte 24/7', 'Certificados', 'Projetos práticos'],
            popular: false
        },
        {
            id: 'annual',
            name: 'Anual',
            price: 997,
            originalPrice: 2364,
            discount: 58,
            features: ['Acesso a todos os cursos', 'Suporte 24/7', 'Certificados', 'Projetos práticos', 'Mentoria 1:1', 'Comunidade VIP'],
            popular: true
        },
        {
            id: 'lifetime',
            name: 'Vitalício',
            price: 2997,
            originalPrice: 9997,
            discount: 70,
            features: ['Acesso vitalício', 'Todos os recursos', 'Suporte prioritário', 'Atualizações futuras', 'Mentoria ilimitada', 'Certificados premium'],
            popular: false
        }
    ];

    const paymentMethods = [
        { id: 'card', name: 'Cartão de Crédito', icon: CreditCard },
        { id: 'pix', name: 'PIX', icon: Zap },
        { id: 'boleto', name: 'Boleto Bancário', icon: FileText }
    ];

    return (
        <PageWrapperFunctional>
            <div className="min-h-screen theme-bg">
                {/* Header Modernizado */}
                <header className="theme-surface border-b theme-border sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link href={ROUTES.HOME} className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 theme-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-white font-bold text-xl">F</span>
                                </div>
                                <span className="text-xl font-bold theme-text group-hover:theme-primary transition-colors duration-300">
                                    Fênix Dev Academy
                                </span>
                            </Link>

                            {/* Navigation */}
                            <nav className="hidden md:flex items-center space-x-8">
                                <Link href={ROUTES.COURSES} className="theme-text-secondary hover:theme-primary transition-colors duration-300">
                                    Cursos
                                </Link>
                                <Link href={ROUTES.PRICING} className="theme-text-secondary hover:theme-primary transition-colors duration-300">
                                    Preços
                                </Link>
                                <Link href={ROUTES.ABOUT} className="theme-text-secondary hover:theme-primary transition-colors duration-300">
                                    Sobre
                                </Link>
                                <Link href={ROUTES.PAYMENTS} className="theme-text hover:theme-primary transition-colors duration-300 font-medium">
                                    Pagamentos
                                </Link>
                            </nav>

                            {/* Right side */}
                            <div className="flex items-center space-x-4">
                                <button className="theme-text-secondary hover:theme-primary transition-colors duration-300 p-2 rounded-lg hover:theme-surface">
                                    <Search className="w-5 h-5" />
                                </button>
                                <div className="relative">
                                    <button className="theme-text-secondary hover:theme-primary transition-colors duration-300 p-2 rounded-lg hover:theme-surface">
                                        <Bell className="w-5 h-5" />
                                    </button>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                </div>
                                <div className="w-8 h-8 theme-surface rounded-full flex items-center justify-center border theme-border">
                                    <Users className="w-4 h-4 theme-text" />
                                </div>
                                <Link href="/auth/register" className="theme-gradient-primary text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                    Começar Agora
                                </Link>
                                <Link href="/auth/login" className="theme-surface theme-text hover:theme-primary px-4 py-2 rounded-xl font-medium transition-all duration-300 border theme-border">
                                    Entrar
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section Modernizado */}
                <div className="relative overflow-hidden theme-gradient-background">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                        <div className="text-center">
                            <div className="mb-12">
                                <div className="w-24 h-24 theme-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 group">
                                    <CreditCard className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                                </div>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold theme-text mb-8">
                                Escolha seu <span className="theme-gradient-primary bg-clip-text text-transparent">Plano</span>
                            </h1>
                            <p className="text-xl theme-text-secondary max-w-3xl mx-auto leading-relaxed">
                                Invista no seu futuro com nossos planos de assinatura flexíveis e acessíveis
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Planos de Assinatura */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`theme-surface rounded-3xl p-8 border theme-border hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full text-sm font-bold">
                                            Mais Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold theme-text mb-4">{plan.name}</h3>
                                    <div className="mb-4">
                                        <span className="text-5xl font-bold theme-text">R$ {plan.price}</span>
                                        <span className="text-lg theme-text-secondary">/mês</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <span className="text-lg theme-text-secondary line-through">R$ {plan.originalPrice}</span>
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                                            -{plan.discount}%
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="theme-text-secondary">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${selectedPlan === plan.id
                                        ? 'theme-gradient-primary text-white shadow-xl'
                                        : 'theme-surface theme-text border theme-border hover:theme-primary hover:shadow-lg'
                                        }`}
                                >
                                    {selectedPlan === plan.id ? 'Selecionado' : 'Selecionar Plano'}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Métodos de Pagamento */}
                    <div className="theme-surface rounded-3xl p-8 border theme-border mb-16">
                        <h2 className="text-3xl font-bold theme-text mb-8 text-center">
                            Escolha sua forma de pagamento
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`p-6 rounded-2xl border transition-all duration-300 ${paymentMethod === method.id
                                        ? 'theme-gradient-primary text-white border-blue-500'
                                        : 'theme-surface theme-text border theme-border hover:theme-primary hover:shadow-lg'
                                        }`}
                                >
                                    <method.icon className="w-8 h-8 mx-auto mb-4" />
                                    <span className="font-semibold">{method.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Formulário de Pagamento */}
                        <div className="max-w-2xl mx-auto">
                            <h3 className="text-xl font-bold theme-text mb-6">Informações do Pagamento</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium theme-text mb-3">
                                        Número do Cartão
                                    </label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 theme-text-secondary w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full pl-12 pr-4 py-4 theme-surface border theme-border rounded-2xl theme-text placeholder-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium theme-text mb-3">
                                            Data de Vencimento
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="MM/AA"
                                            className="w-full px-4 py-4 theme-surface border theme-border rounded-2xl theme-text placeholder-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium theme-text mb-3">
                                            CVV
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="w-full px-4 py-4 theme-surface border theme-border rounded-2xl theme-text placeholder-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium theme-text mb-3">
                                        Nome no Cartão
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nome como está no cartão"
                                        className="w-full px-4 py-4 theme-surface border theme-border rounded-2xl theme-text placeholder-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="w-6 h-6 text-green-600" />
                                    <span className="font-bold theme-text">Pagamento Seguro</span>
                                </div>
                                <p className="theme-text-secondary text-sm">
                                    Seus dados são protegidos com criptografia de nível bancário.
                                    Processamos pagamentos de forma segura e nunca armazenamos informações do seu cartão.
                                </p>
                            </div>

                            <button className="w-full mt-8 py-4 px-6 theme-gradient-primary text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-3">
                                <CreditCard className="w-6 h-6" />
                                Finalizar Pagamento
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Garantia e Suporte */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center theme-surface rounded-2xl p-8 border theme-border">
                            <div className="w-16 h-16 theme-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold theme-text mb-4">Garantia de 30 dias</h3>
                            <p className="theme-text-secondary">
                                Se não ficar satisfeito, devolvemos seu dinheiro em até 30 dias.
                            </p>
                        </div>

                        <div className="text-center theme-surface rounded-2xl p-8 border theme-border">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold theme-text mb-4">Acesso Imediato</h3>
                            <p className="theme-text-secondary">
                                Comece a estudar imediatamente após a confirmação do pagamento.
                            </p>
                        </div>

                        <div className="text-center theme-surface rounded-2xl p-8 border theme-border">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <MessageCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold theme-text mb-4">Suporte 24/7</h3>
                            <p className="theme-text-secondary">
                                Nossa equipe está sempre disponível para ajudar você.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapperFunctional>
    );
}