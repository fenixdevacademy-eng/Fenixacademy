'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    BookOpen,
    Award,
    Star,
    CheckCircle,
    ArrowRight,
    ChevronRight,
    ChevronDown,
    Eye,
    EyeOff,
    Lock,
    Shield,
    Zap,
    Brain,
    Code,
    Globe,
    Trophy,
    Flame,
    Target,
    BarChart3,
    TrendingUp,
    Play,
    Download,
    Share,
    Filter,
    Grid,
    List,
    Activity,
    PieChart,
    LineChart,
    TrendingDown,
    Minus,
    Plus,
    MessageCircle,
    Settings,
    Bell,
    Users,
    Clock,
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
    Heart,
    ThumbsUp,
    ThumbsDown,
    Share2,
    Bookmark,
    Flag,
    AlertCircle,
    Info,
    HelpCircle,
    Search,
    Menu,
    X,
    Plus as PlusIcon,
    Minus as MinusIcon
} from 'lucide-react';
import { PageWrapperFunctional } from '@/components/PageWrapperFunctional';

export default function BecomeStudentPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        gender: '',
        location: '',

        // Educational Background
        educationLevel: '',
        currentOccupation: '',
        programmingExperience: '',
        interests: [] as string[],

        // Goals and Preferences
        learningGoals: [] as string[],
        timeAvailability: '',
        preferredSchedule: '',
        budget: '',

        // Account Information
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        agreeMarketing: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const steps = [
        { number: 1, title: 'Informações Pessoais', description: 'Conte-nos sobre você' },
        { number: 2, title: 'Formação Acadêmica', description: 'Sua experiência educacional' },
        { number: 3, title: 'Objetivos de Aprendizado', description: 'O que você quer aprender' },
        { number: 4, title: 'Criar Conta', description: 'Finalizar cadastro' }
    ];

    const programmingExperienceOptions = [
        { value: 'beginner', label: 'Iniciante', description: 'Nunca programei antes' },
        { value: 'basic', label: 'Básico', description: 'Conheço conceitos básicos' },
        { value: 'intermediate', label: 'Intermediário', description: 'Já desenvolvi alguns projetos' },
        { value: 'advanced', label: 'Avançado', description: 'Tenho experiência profissional' }
    ];

    const interestOptions = [
        'Desenvolvimento Web',
        'Desenvolvimento Mobile',
        'Data Science',
        'Machine Learning',
        'DevOps',
        'Cybersecurity',
        'Game Development',
        'UI/UX Design',
        'Backend Development',
        'Frontend Development',
        'Full Stack Development',
        'Cloud Computing'
    ];

    const learningGoalOptions = [
        'Conseguir um emprego na área',
        'Mudar de carreira',
        'Aprender por hobby',
        'Melhorar habilidades atuais',
        'Criar meu próprio negócio',
        'Trabalhar como freelancer',
        'Entender tecnologia melhor',
        'Preparar para faculdade'
    ];

    const benefits = [
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: 'Cursos de Qualidade',
            description: 'Conteúdo atualizado e prático com instrutores especialistas'
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: 'Certificados Reconhecidos',
            description: 'Certificados válidos no mercado de trabalho'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Comunidade Ativa',
            description: 'Conecte-se com outros estudantes e profissionais'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Aprendizado Acelerado',
            description: 'Metodologia comprovada para aprender mais rápido'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Suporte 24/7',
            description: 'Suporte técnico e acadêmico sempre disponível'
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: 'Garantia de Emprego',
            description: '95% dos nossos alunos conseguem emprego em 6 meses'
        }
    ];

    const stats = [
        { number: '50,000+', label: 'Alunos Formados' },
        { number: '95%', label: 'Taxa de Empregabilidade' },
        { number: '20+', label: 'Cursos Disponíveis' },
        { number: '4.9/5', label: 'Avaliação Média' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const handleInterestToggle = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    }

    const handleGoalToggle = (goal: string) => {
        setFormData(prev => ({
            ...prev,
            learningGoals: prev.learningGoals.includes(goal)
                ? prev.learningGoals.filter(g => g !== goal)
                : [...prev.learningGoals, goal]
        }));
    }

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Implementar lógica de cadastro
    }

    const isStepValid = (step: number) => {
        switch (step) {
            case 1:
                return formData.firstName && formData.lastName && formData.email && formData.phone;
            case 2:
                return formData.educationLevel && formData.programmingExperience;
            case 3:
                return formData.learningGoals.length > 0 && formData.timeAvailability;
            case 4:
                return formData.password && formData.confirmPassword && formData.agreeTerms;
            default:
                return false;
        }
    }

    return (
        <PageWrapperFunctional>
            {/* Header */}
            <header className="theme-surface border-b theme-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link href="/" className="flex items-center">
                            <div className="w-8 h-8 theme-gradient-primary rounded-full flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-2xl font-bold">
                                <span className="theme-primary">FENIX</span> ACADEMY
                            </span>
                        </Link>
                        <nav className="hidden lg:flex space-x-8">
                            <Link href="/courses" className="theme-text hover:theme-primary transition-all duration-300">Cursos</Link>
                            <Link href="/pricing" className="theme-text hover:theme-primary transition-all duration-300">Preços</Link>
                            <Link href="/help" className="theme-text hover:theme-primary transition-all duration-300">Ajuda</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Link href="/auth/login" className="theme-text hover:theme-primary transition-all duration-300">Entrar</Link>
                            <Link href="/auth/register" className="theme-gradient-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg">
                                Cadastrar
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold theme-text mb-4">
                        Torne-se um <span className="theme-gradient-primary bg-clip-text text-transparent">Estudante Fenix</span>
                    </h1>
                    <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
                        Junte-se a milhares de estudantes que estão transformando suas carreiras com a Fenix Academy
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center theme-surface rounded-lg p-4 border theme-border hover:shadow-lg transition-all duration-300">
                            <div className="text-3xl font-bold theme-primary mb-2">{stat.number}</div>
                            <div className="theme-text-secondary">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Benefits Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="theme-surface rounded-xl p-6 sticky top-8 border theme-border shadow-lg">
                            <h3 className="text-xl font-bold theme-text mb-6">Por que escolher a Fenix Academy?</h3>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="theme-primary mt-1">{benefit.icon}</div>
                                        <div>
                                            <h4 className="theme-text font-semibold mb-1">{benefit.title}</h4>
                                            <p className="theme-text-secondary text-sm">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="lg:col-span-2">
                        <div className="theme-surface rounded-xl p-8 border theme-border shadow-lg">
                            {/* Progress Steps */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    {steps.map((step, index) => (
                                        <div key={step.number} className="flex items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= step.number
                                                ? 'theme-gradient-primary text-white'
                                                : 'theme-surface text-gray-400 border theme-border'
                                                }`}>
                                                {step.number}
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`w-16 h-1 mx-2 ${currentStep > step.number ? 'theme-gradient-primary' : 'theme-border'
                                                    }`} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-bold theme-text">{steps[currentStep - 1].title}</h2>
                                    <p className="theme-text-secondary">{steps[currentStep - 1].description}</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Step 1: Personal Information */}
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium theme-text-secondary mb-2">Nome</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 theme-surface border theme-border rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary"
                                                    placeholder="Seu nome"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium theme-text-secondary mb-2">Sobrenome</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 theme-surface border theme-border rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary"
                                                    placeholder="Seu sobrenome"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium theme-text-secondary mb-2">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 theme-surface border theme-border rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary"
                                                placeholder="seu@email.com"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium theme-text-secondary mb-2">Telefone</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 theme-surface border theme-border rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary"
                                                    placeholder="(11) 99999-9999"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium theme-text-secondary mb-2">Data de Nascimento</label>
                                                <input
                                                    type="date"
                                                    name="birthDate"
                                                    value={formData.birthDate}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 theme-surface border theme-border rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Gênero</label>
                                                <select
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">Selecione</option>
                                                    <option value="male">Masculino</option>
                                                    <option value="female">Feminino</option>
                                                    <option value="other">Outro</option>
                                                    <option value="prefer-not-to-say">Prefiro não informar</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Localização</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Cidade, Estado"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Educational Background */}
                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Nível de Escolaridade</label>
                                            <select
                                                name="educationLevel"
                                                value={formData.educationLevel}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            >
                                                <option value="">Selecione</option>
                                                <option value="high-school">Ensino Médio</option>
                                                <option value="technical">Técnico</option>
                                                <option value="bachelor">Superior</option>
                                                <option value="master">Pós-graduação</option>
                                                <option value="phd">Doutorado</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Ocupação Atual</label>
                                            <input
                                                type="text"
                                                name="currentOccupation"
                                                value={formData.currentOccupation}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Ex: Estudante, Desenvolvedor, Designer..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Experiência com Programação</label>
                                            <div className="space-y-3">
                                                {programmingExperienceOptions.map((option) => (
                                                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="programmingExperience"
                                                            value={option.value}
                                                            checked={formData.programmingExperience === option.value}
                                                            onChange={handleInputChange}
                                                            className="w-4 h-4 text-blue-600"
                                                        />
                                                        <div>
                                                            <div className="text-white font-medium">{option.label}</div>
                                                            <div className="text-gray-400 text-sm">{option.description}</div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Áreas de Interesse</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {interestOptions.map((interest) => (
                                                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.interests.includes(interest)}
                                                            onChange={() => handleInterestToggle(interest)}
                                                            className="w-4 h-4 text-blue-600"
                                                        />
                                                        <span className="text-white text-sm">{interest}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Learning Goals */}
                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Objetivos de Aprendizado</label>
                                            <div className="space-y-2">
                                                {learningGoalOptions.map((goal) => (
                                                    <label key={goal} className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.learningGoals.includes(goal)}
                                                            onChange={() => handleGoalToggle(goal)}
                                                            className="w-4 h-4 text-blue-600"
                                                        />
                                                        <span className="text-white">{goal}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Tempo Disponível para Estudos</label>
                                            <select
                                                name="timeAvailability"
                                                value={formData.timeAvailability}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            >
                                                <option value="">Selecione</option>
                                                <option value="1-2h">1-2 horas por dia</option>
                                                <option value="3-4h">3-4 horas por dia</option>
                                                <option value="5-6h">5-6 horas por dia</option>
                                                <option value="7h+">Mais de 7 horas por dia</option>
                                                <option value="weekends">Apenas fins de semana</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Horário Preferido</label>
                                            <select
                                                name="preferredSchedule"
                                                value={formData.preferredSchedule}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Selecione</option>
                                                <option value="morning">Manhã (6h-12h)</option>
                                                <option value="afternoon">Tarde (12h-18h)</option>
                                                <option value="evening">Noite (18h-24h)</option>
                                                <option value="night">Madrugada (0h-6h)</option>
                                                <option value="flexible">Flexível</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Orçamento Mensal</label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Selecione</option>
                                                <option value="0-100">R$ 0 - R$ 100</option>
                                                <option value="100-300">R$ 100 - R$ 300</option>
                                                <option value="300-500">R$ 300 - R$ 500</option>
                                                <option value="500-1000">R$ 500 - R$ 1.000</option>
                                                <option value="1000+">Acima de R$ 1.000</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Account Creation */}
                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Mínimo 8 caracteres"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Confirmar Senha</label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Digite a senha novamente"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="flex items-start space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="agreeTerms"
                                                    checked={formData.agreeTerms}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-blue-600 mt-1"
                                                    required
                                                />
                                                <span className="text-white text-sm">
                                                    Concordo com os <Link href="/terms" className="text-blue-400 hover:underline">Termos de Uso</Link> e <Link href="/privacy" className="text-blue-400 hover:underline">Política de Privacidade</Link>
                                                </span>
                                            </label>
                                            <label className="flex items-start space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="agreeMarketing"
                                                    checked={formData.agreeMarketing}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-blue-600 mt-1"
                                                />
                                                <span className="text-white text-sm">
                                                    Quero receber ofertas especiais e novidades por email
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-8">
                                    <button
                                        type="button"
                                        onClick={handlePrevious}
                                        disabled={currentStep === 1}
                                        className="px-6 py-3 theme-surface text-white rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border theme-border"
                                    >
                                        Anterior
                                    </button>

                                    {currentStep < steps.length ? (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            disabled={!isStepValid(currentStep)}
                                            className="px-6 py-3 theme-gradient-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center shadow-lg"
                                        >
                                            Próximo
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center shadow-lg"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Criar Conta
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                <button className="theme-gradient-primary text-white w-12 h-12 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                </button>
                <button className="bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                </button>
            </div>
        </PageWrapperFunctional>
    );
}