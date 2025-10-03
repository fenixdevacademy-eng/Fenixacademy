'use client';

import React, { useState, useEffect } from 'react';
import {
    Rocket,
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Shield,
    Zap,
    Star,
    Heart,
    Globe,
    Code,
    BookOpen,
    Users,
    Award,
    Sparkles,
    Crown,
    Brain,
    Target,
    TrendingUp,
    Play,
    MessageCircle,
    Bell,
    Settings,
    Search,
    Filter,
    Grid,
    List,
    Plus,
    Minus,
    RefreshCw,
    ExternalLink,
    Copy,
    Edit,
    Trash2,
    Save,
    Unlock,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    Home,
    Menu,
    X,
    Phone,
    MapPin,
    Calendar,
    DollarSign,
    CreditCard,
    ShoppingCart,
    Gift,
    Trophy,
    Medal,
    Flag,
    Bookmark,
    Tag,
    Hash,
    AtSign,
    Percent,
    Calculator,
    Database,
    Server,
    Cloud,
    Wifi,
    Signal,
    Battery,
    Power,
    Volume2,
    VolumeX,
    Mic,
    MicOff,
    Camera,
    CameraOff,
    Video,
    VideoOff,
    Image,
    ImageOff,
    FileText,
    Folder,
    Download,
    Upload,
    Share2,
    Clock
} from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        acceptTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        // Validation
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!formData.email) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Senhas não coincidem';
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'Você deve aceitar os termos de uso';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        // Simular cadastro
        setTimeout(() => {
            setIsLoading(false);
            // Redirecionar para dashboard
            window.location.href = '/dashboard';
        }, 2000);
    };

    const benefits = [
        {
            icon: Brain,
            title: "IA Tutor Personalizada",
            description: "Aprendizado adaptativo com IA"
        },
        {
            icon: Code,
            title: "IDE Profissional",
            description: "Ambiente de desenvolvimento completo"
        },
        {
            icon: Target,
            title: "Projetos Reais",
            description: "Portfolio profissional garantido"
        },
        {
            icon: Users,
            title: "Comunidade Elite",
            description: "Networking com profissionais"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Cursor personalizado */}
            <div
                className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference"
                style={{
                    left: mousePosition.x - 12,
                    top: mousePosition.y - 12,
                    transition: 'all 0.1s ease-out'
                }}
            />

            {/* Partículas flutuantes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <header className="relative z-10">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
                                <Rocket className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">Fênix Dev Academy</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="/" className="text-white hover:text-purple-300 transition-colors">Home</a>
                            <a href="/courses" className="text-white hover:text-purple-300 transition-colors">Cursos</a>
                            <a href="/login" className="text-white hover:text-purple-300 transition-colors">Login</a>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Side - Benefits */}
                        <div className="hidden lg:block">
                            <div className="text-center mb-12">
                                <div className="flex justify-center mb-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-2xl opacity-75 animate-pulse"></div>
                                        <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-8 animate-bounce">
                                            <Rocket className="h-20 w-20 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <h1 className="text-5xl font-bold text-white mb-6">
                                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        TRANSFORME SUA CARREIRA!
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                                    Junte-se a mais de 50.000 desenvolvedores que já transformaram suas vidas com a Fênix.
                                    <br />
                                    <span className="text-purple-300 font-semibold">
                                        Comece sua jornada gratuitamente hoje!
                                    </span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-3 w-fit mb-4">
                                            <benefit.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                                        <p className="text-gray-300 text-sm">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 text-center">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        🎯 Garantia de Sucesso!
                                    </h3>
                                    <p className="text-gray-300 mb-6">
                                        Se não conseguir um emprego em 6 meses, devolvemos seu dinheiro.
                                    </p>
                                    <div className="flex justify-center space-x-8 text-sm text-gray-400">
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-2" />
                                            <span>50K+ alunos</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Award className="h-4 w-4 mr-2" />
                                            <span>98% sucesso</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Shield className="h-4 w-4 mr-2" />
                                            <span>Garantia 6 meses</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Registration Form */}
                        <div className="w-full max-w-md mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        Crie sua Conta
                                    </h2>
                                    <p className="text-gray-300">
                                        Comece sua jornada de transformação profissional
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Field */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                            Nome Completo
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className={`w-full bg-white/10 backdrop-blur-sm border ${errors.name ? 'border-red-500' : 'border-white/20'
                                                    } rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                                                placeholder="Seu nome completo"
                                            />
                                        </div>
                                        {errors.name && (
                                            <div className="flex items-center mt-2 text-red-400 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-2" />
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full bg-white/10 backdrop-blur-sm border ${errors.email ? 'border-red-500' : 'border-white/20'
                                                    } rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                                                placeholder="seu@email.com"
                                            />
                                        </div>
                                        {errors.email && (
                                            <div className="flex items-center mt-2 text-red-400 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-2" />
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                                            Telefone (Opcional)
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                                                placeholder="(11) 99999-9999"
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                            Senha
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className={`w-full bg-white/10 backdrop-blur-sm border ${errors.password ? 'border-red-500' : 'border-white/20'
                                                    } rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                                                placeholder="Sua senha"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <div className="flex items-center mt-2 text-red-400 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-2" />
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                                            Confirmar Senha
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className={`w-full bg-white/10 backdrop-blur-sm border ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                                                    } rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                                                placeholder="Confirme sua senha"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <div className="flex items-center mt-2 text-red-400 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-2" />
                                                {errors.confirmPassword}
                                            </div>
                                        )}
                                    </div>

                                    {/* Terms Checkbox */}
                                    <div>
                                        <label className="flex items-start">
                                            <input
                                                type="checkbox"
                                                name="acceptTerms"
                                                checked={formData.acceptTerms}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                                            />
                                            <span className="ml-3 text-sm text-gray-300">
                                                Eu aceito os{' '}
                                                <a href="/terms" className="text-purple-300 hover:text-purple-200 transition-colors">
                                                    Termos de Uso
                                                </a>{' '}
                                                e{' '}
                                                <a href="/privacy" className="text-purple-300 hover:text-purple-200 transition-colors">
                                                    Política de Privacidade
                                                </a>
                                            </span>
                                        </label>
                                        {errors.acceptTerms && (
                                            <div className="flex items-center mt-2 text-red-400 text-sm">
                                                <AlertCircle className="h-4 w-4 mr-2" />
                                                {errors.acceptTerms}
                                            </div>
                                        )}
                                    </div>

                                    {/* Register Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                                                Criando conta...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <Rocket className="h-5 w-5 mr-2" />
                                                Criar Conta Gratuita
                                                <ArrowRight className="h-5 w-5 ml-2" />
                                            </div>
                                        )}
                                    </button>

                                    {/* Divider */}
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/20"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-transparent text-gray-400">ou</span>
                                        </div>
                                    </div>

                                    {/* Social Registration */}
                                    <div className="space-y-3">
                                        <button
                                            type="button"
                                            className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center"
                                        >
                                            <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            Continuar com Google
                                        </button>

                                        <button
                                            type="button"
                                            className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center"
                                        >
                                            <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                            Continuar com Facebook
                                        </button>
                                    </div>

                                    {/* Login Link */}
                                    <div className="text-center">
                                        <p className="text-gray-300">
                                            Já tem uma conta?{' '}
                                            <a href="/login" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">
                                                Faça login aqui
                                            </a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}