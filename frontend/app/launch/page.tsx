'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Rocket,
    Clock,
    Calendar,
    Users,
    Star,
    CheckCircle,
    ArrowRight,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Share2,
    Heart,
    MessageCircle,
    Bell,
    Settings,
    User,
    Code,
    Globe,
    Shield,
    Trophy,
    Flame,
    Target,
    BarChart3,
    TrendingUp,
    Zap,
    Brain,
    Award,
    BookOpen,
    GraduationCap,
    DollarSign,
    CreditCard,
    Smartphone,
    Laptop,
    Monitor,
    Headphones,
    Mic,
    Camera,
    Wifi,
    Signal,
    SignalHigh,
    SignalMax,
    ThumbsUp,
    ThumbsDown,
    Flag,
    AlertCircle,
    Info,
    HelpCircle,
    Search,
    Menu,
    X,
    Plus as PlusIcon,
    Minus as MinusIcon,
    ChevronDown,
    ChevronUp,
    ChevronRight,
    ChevronLeft,
    Download,
    Upload,
    RefreshCw,
    ExternalLink,
    Lock,
    Unlock,
    Eye,
    EyeOff,
    Filter,
    Grid,
    List,
    Activity,
    PieChart,
    LineChart,
    TrendingDown,
    Minus,
    Plus
} from 'lucide-react';

export default function LaunchPage() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Countdown timer
    useEffect(() => {
        const targetDate = new Date('2024-03-01T00:00:00').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const features = [
        {
            icon: <Rocket className="w-8 h-8" />,
            title: 'Lançamento Exclusivo',
            description: 'Seja um dos primeiros a ter acesso aos novos cursos e recursos'
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: 'Desconto Especial',
            description: '50% de desconto nos primeiros 1000 cadastros'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Acesso Antecipado',
            description: 'Teste novos recursos antes de todos'
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: 'Status VIP',
            description: 'Receba tratamento especial e suporte prioritário'
        }
    ];

    const stats = [
        { number: '10,000+', label: 'Pré-inscritos', icon: <Users className="w-6 h-6" /> },
        { number: '50%', label: 'Desconto Especial', icon: <DollarSign className="w-6 h-6" /> },
        { number: '15+', label: 'Novos Cursos', icon: <BookOpen className="w-6 h-6" /> },
        { number: '24/7', label: 'Suporte VIP', icon: <Shield className="w-6 h-6" /> }
    ];

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
        }
    }

    const formatTime = (value: number) => {
        return value.toString().padStart(2, '0');
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-8">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
                            <Rocket className="w-4 h-4 mr-2" />
                            Lançamento Exclusivo
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            A <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Revolução</span> da
                            <br />Educação Tech
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Prepare-se para o maior lançamento da história da Fenix Academy.
                            Novos cursos, recursos exclusivos e oportunidades únicas te esperam.
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Lançamento em:</h2>
                        <div className="flex justify-center space-x-4 md:space-x-8">
                            <div className="text-center">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
                                    <span className="text-2xl md:text-3xl font-bold">{formatTime(timeLeft.days)}</span>
                                </div>
                                <div className="text-sm text-gray-400">Dias</div>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
                                    <span className="text-2xl md:text-3xl font-bold">{formatTime(timeLeft.hours)}</span>
                                </div>
                                <div className="text-sm text-gray-400">Horas</div>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
                                    <span className="text-2xl md:text-3xl font-bold">{formatTime(timeLeft.minutes)}</span>
                                </div>
                                <div className="text-sm text-gray-400">Minutos</div>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
                                    <span className="text-2xl md:text-3xl font-bold">{formatTime(timeLeft.seconds)}</span>
                                </div>
                                <div className="text-sm text-gray-400">Segundos</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link
                            href="/become-student"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center"
                        >
                            <Rocket className="w-5 h-5 mr-2" />
                            Garantir Vaga Agora
                        </Link>
                        <button
                            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center"
                        >
                            {isVideoPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                            Ver Apresentação
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            O que te espera no lançamento
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Recursos exclusivos e benefícios especiais para os primeiros a se inscrever
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors">
                                <div className="text-blue-500 mb-4 flex justify-center">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Email Subscription Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Não perca o lançamento!
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Seja notificado quando o lançamento acontecer e garante seu desconto especial
                    </p>

                    {!isSubscribed ? (
                        <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                            <div className="flex gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Seu melhor email"
                                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Notificar
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Inscrição Confirmada!</h3>
                            <p className="text-gray-400">
                                Você será notificado sobre o lançamento. Obrigado por se inscrever!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Pronto para transformar sua carreira?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Junte-se a milhares de profissionais que já escolheram a Fenix Academy
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/become-student"
                            className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center"
                        >
                            <Rocket className="w-5 h-5 mr-2" />
                            Garantir Vaga Agora
                        </Link>
                        <Link
                            href="/courses"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center"
                        >
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ver Cursos Atuais
                        </Link>
                    </div>
                </div>
            </section>

            {/* Floating Actions */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                <button className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                </button>
                <button className="bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}