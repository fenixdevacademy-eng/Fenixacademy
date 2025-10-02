'use client';

import { useState } from 'react';
import {
    Briefcase,
    MapPin,
    DollarSign,
    Clock,
    Users,
    TrendingUp,
    ArrowRight,
    Search,
    BookOpen,
    Code,
    Database,
    Smartphone,
    Cloud,
    Target,
    CheckCircle,
    Bell,
    Menu,
    X as CloseIcon,
    Sparkles,
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
    Shield,
    Crown,
    MessageCircle,
    Calendar,
    Play,
    Heart,
    Globe,
    Brain,
    Zap,
    Star,
    Eye,
    EyeOff,
    User,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { PageWrapperFunctional } from '@/components/PageWrapperFunctional';

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: 'full-time' | 'part-time' | 'freelance' | 'internship';
    salary: {
        min: number;
        max: number;
        currency: string;
    }
    experience: string;
    skills: string[];
    description: string;
    posted: string;
    applications: number;
    featured?: boolean;
    remote?: boolean;
    demand?: 'high' | 'medium' | 'low';
}

interface CareerPath {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    duration: string;
    salary: {
        entry: number;
        senior: number;
    }
    skills: string[];
    courses: string[];
    demand: 'high' | 'medium' | 'low';
}

export default function CareersPage() {
    const [activeTab, setActiveTab] = useState<'jobs' | 'paths'>('jobs');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedExperience, setSelectedExperience] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const jobs: Job[] = [
        {
            id: 1,
            title: "Desenvolvedor Frontend React",
            company: "TechCorp",
            location: "São Paulo, SP",
            type: "full-time",
            salary: { min: 5000, max: 8000, currency: "BRL" },
            experience: "2-4 anos",
            skills: ["React", "TypeScript", "JavaScript", "CSS", "Git"],
            description: "Desenvolver interfaces modernas e responsivas usando React e TypeScript.",
            posted: "2025-01-15",
            applications: 45,
            featured: true,
            remote: true,
            demand: "high"
        },
        {
            id: 2,
            title: "Desenvolvedor Backend Python",
            company: "StartupXYZ",
            location: "Rio de Janeiro, RJ",
            type: "full-time",
            salary: { min: 6000, max: 10000, currency: "BRL" },
            experience: "3-5 anos",
            skills: ["Python", "Django", "PostgreSQL", "AWS", "Docker"],
            description: "Desenvolver APIs robustas e escaláveis para aplicações web.",
            posted: "2025-01-14",
            applications: 32,
            remote: true,
            demand: "high"
        },
        {
            id: 3,
            title: "Desenvolvedor Mobile Flutter",
            company: "AppTech",
            location: "Belo Horizonte, MG",
            type: "full-time",
            salary: { min: 5500, max: 9000, currency: "BRL" },
            experience: "1-3 anos",
            skills: ["Flutter", "Dart", "Firebase", "Git", "REST APIs"],
            description: "Criar aplicativos móveis nativos para iOS e Android.",
            posted: "2025-01-13",
            applications: 28,
            remote: false,
            demand: "medium"
        },
        {
            id: 4,
            title: "Data Scientist",
            company: "DataCorp",
            location: "Curitiba, PR",
            type: "full-time",
            salary: { min: 8000, max: 12000, currency: "BRL" },
            experience: "2-4 anos",
            skills: ["Python", "Pandas", "Scikit-learn", "SQL", "Machine Learning"],
            description: "Desenvolver modelos de machine learning e análise de dados.",
            posted: "2025-01-12",
            applications: 38,
            remote: true,
            demand: "high"
        },
        {
            id: 5,
            title: "DevOps Engineer",
            company: "CloudTech",
            location: "Porto Alegre, RS",
            type: "full-time",
            salary: { min: 7000, max: 11000, currency: "BRL" },
            experience: "3-5 anos",
            skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
            description: "Gerenciar infraestrutura cloud e pipelines de deploy.",
            posted: "2025-01-11",
            applications: 25,
            remote: true,
            demand: "high"
        },
        {
            id: 6,
            title: "UX/UI Designer",
            company: "DesignStudio",
            location: "Salvador, BA",
            type: "full-time",
            salary: { min: 4500, max: 7500, currency: "BRL" },
            experience: "2-4 anos",
            skills: ["Figma", "Adobe Creative Suite", "Prototipagem", "User Research"],
            description: "Criar interfaces intuitivas e experiências de usuário excepcionais.",
            posted: "2025-01-10",
            applications: 42,
            remote: true,
            demand: "medium"
        }
    ];

    const careerPaths: CareerPath[] = [
        {
            id: 1,
            title: "Desenvolvedor Full Stack",
            description: "Construa aplicações web completas do frontend ao backend",
            icon: <Code className="w-8 h-8" />,
            duration: "8-15 meses",
            salary: { entry: 5000, senior: 15000 },
            skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
            courses: ["Fundamentos de Desenvolvimento Web", "React.js Avançado"],
            demand: "high"
        },
        {
            id: 2,
            title: "Desenvolvedor Backend",
            description: "Construa APIs robustas e sistemas escaláveis",
            icon: <Database className="w-8 h-8" />,
            duration: "8-15 meses",
            salary: { entry: 5000, senior: 15000 },
            skills: ["Python", "Node.js", "SQL", "APIs", "Cloud"],
            courses: ["Node.js e APIs RESTful", "Python para Data Science"],
            demand: "high"
        },
        {
            id: 3,
            title: "Desenvolvedor Mobile",
            description: "Crie aplicativos nativos para iOS e Android",
            icon: <Smartphone className="w-8 h-8" />,
            duration: "6-12 meses",
            salary: { entry: 4500, senior: 13000 },
            skills: ["Flutter", "React Native", "Swift", "Kotlin"],
            courses: ["Flutter para Mobile"],
            demand: "medium"
        },
        {
            id: 4,
            title: "Data Scientist",
            description: "Analise dados e desenvolva modelos de IA",
            icon: <TrendingUp className="w-8 h-8" />,
            duration: "12-18 meses",
            salary: { entry: 6000, senior: 18000 },
            skills: ["Python", "Machine Learning", "SQL", "Statistics"],
            courses: ["Python para Data Science"],
            demand: "high"
        },
        {
            id: 5,
            title: "DevOps Engineer",
            description: "Automatize deploy e gerencie infraestrutura",
            icon: <Cloud className="w-8 h-8" />,
            duration: "10-16 meses",
            salary: { entry: 5500, senior: 16000 },
            skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
            courses: ["DevOps e CI/CD"],
            demand: "high"
        },
        {
            id: 6,
            title: "UX/UI Designer",
            description: "Crie experiências de usuário excepcionais",
            icon: <Target className="w-8 h-8" />,
            duration: "6-10 meses",
            salary: { entry: 3500, senior: 10000 },
            skills: ["Figma", "Prototipagem", "User Research", "Design Systems"],
            courses: ["UX/UI Design para Web e Mobile"],
            demand: "medium"
        }
    ];

    const formatSalary = (min: number, max: number) => {
        return `R$ ${min.toLocaleString()} - R$ ${max.toLocaleString()}`;
    }

    const getDemandColor = (demand: 'high' | 'medium' | 'low') => {
        switch (demand) {
            case 'high': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    }

    const getDemandLabel = (demand: 'high' | 'medium' | 'low') => {
        switch (demand) {
            case 'high': return 'Alta Demanda';
            case 'medium': return 'Média Demanda';
            case 'low': return 'Baixa Demanda';
            default: return 'Demanda';
        }
    }

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = !selectedType || job.type === selectedType;
        const matchesLocation = !selectedLocation || job.location.includes(selectedLocation);
        return matchesSearch && matchesType && matchesLocation;
    });

    const jobTypes = ['full-time', 'part-time', 'freelance', 'internship'];
    const experienceLevels = ['1-2 anos', '2-4 anos', '3-5 anos', '5+ anos'];
    const locations = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR', 'Porto Alegre, RS', 'Salvador, BA'];

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
                                <Link href={ROUTES.CAREERS} className="theme-text hover:theme-primary transition-colors duration-300 font-medium">
                                    Carreiras
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
                                <Link href={ROUTES.COMEÇAR_AGORA} className="theme-gradient-primary text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                    Começar Agora
                                </Link>
                                <Link href={ROUTES.LOGIN} className="theme-surface theme-text hover:theme-primary px-4 py-2 rounded-xl font-medium transition-all duration-300 border theme-border">
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
                                    <Sparkles className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                                </div>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold theme-text mb-8">
                                Encontre sua <span className="theme-gradient-primary bg-clip-text text-transparent">Carreira Ideal</span>
                    </h1>
                            <p className="text-xl theme-text-secondary max-w-3xl mx-auto leading-relaxed">
                        Descubra oportunidades de trabalho e caminhos de carreira em tecnologia
                    </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                    {/* Tab Navigation Modernizada */}
                    <div className="flex justify-center mb-12">
                        <div className="theme-surface rounded-2xl p-2 border theme-border">
                        <button
                                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'jobs'
                                    ? 'theme-gradient-primary text-white shadow-lg'
                                    : 'theme-text-secondary hover:theme-primary hover:theme-surface'
                                }`}
                            onClick={() => setActiveTab('jobs')}
                        >
                            Vagas de Emprego
                        </button>
                        <button
                                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'paths'
                                    ? 'theme-gradient-primary text-white shadow-lg'
                                    : 'theme-text-secondary hover:theme-primary hover:theme-surface'
                                }`}
                            onClick={() => setActiveTab('paths')}
                        >
                            Caminhos de Carreira
                        </button>
                    </div>
                </div>

                {activeTab === 'jobs' && (
                    <>
                            {/* Search and Filters Modernizados */}
                            <div className="theme-surface rounded-2xl p-8 mb-12 border theme-border">
                                <div className="grid md:grid-cols-4 gap-6">
                                <div className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 theme-text-secondary w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Buscar vagas..."
                                            className="w-full pl-12 pr-4 py-4 theme-surface border theme-border rounded-2xl theme-text placeholder-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                        className="px-4 py-4 theme-surface border theme-border rounded-2xl theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                >
                                    <option value="">Tipo de Vaga</option>
                                    {jobTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <select
                                        className="px-4 py-4 theme-surface border theme-border rounded-2xl theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    value={selectedExperience}
                                    onChange={(e) => setSelectedExperience(e.target.value)}
                                >
                                    <option value="">Experiência</option>
                                    {experienceLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                <select
                                        className="px-4 py-4 theme-surface border theme-border rounded-2xl theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                >
                                    <option value="">Localização</option>
                                    {locations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                            {/* Jobs List Modernizada */}
                            <div className="grid gap-8">
                            {filteredJobs.map(job => (
                                    <div key={job.id} className="theme-surface rounded-2xl shadow-2xl border theme-border p-8 hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-4">
                                                    <h3 className="text-2xl font-bold theme-text group-hover:theme-primary transition-colors duration-300">{job.title}</h3>
                                                {job.featured && (
                                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                                                        Destaque
                                                    </span>
                                                )}
                                                {job.remote && (
                                                        <span className="px-3 py-1 theme-gradient-primary text-white text-sm rounded-full font-medium">
                                                        Remoto
                                                    </span>
                                                )}
                                            </div>
                                                <div className="flex items-center space-x-6 text-sm theme-text-secondary mb-4">
                                                <span className="flex items-center">
                                                        <Briefcase className="w-5 h-5 mr-2" />
                                                    {job.company}
                                                </span>
                                                <span className="flex items-center">
                                                        <MapPin className="w-5 h-5 mr-2" />
                                                    {job.location}
                                                </span>
                                                <span className="flex items-center">
                                                        <Clock className="w-5 h-5 mr-2" />
                                                    {job.experience}
                                                </span>
                                            </div>
                                                <p className="theme-text-secondary text-base mb-6">{job.description}</p>

                                            <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-6">
                                                        <div className="flex items-center text-green-600 font-bold text-lg">
                                                            <DollarSign className="w-5 h-5 mr-2" />
                                                        {formatSalary(job.salary.min, job.salary.max)}
                                                    </div>
                                                        <div className="flex items-center theme-text-secondary">
                                                            <Users className="w-5 h-5 mr-2" />
                                                        {job.applications} candidatos
                                                        </div>
                                                </div>

                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex flex-wrap gap-2">
                                                        {job.skills.slice(0, 3).map(skill => (
                                                                <span key={skill} className="px-3 py-1 theme-surface theme-text-secondary text-sm rounded-xl">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {job.skills.length > 3 && (
                                                                <span className="px-3 py-1 theme-surface theme-text-secondary text-sm rounded-xl">
                                                                +{job.skills.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                        <button className="px-6 py-3 theme-gradient-primary text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg">
                                                        Candidatar-se
                                                    </button>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'paths' && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {careerPaths.map(path => (
                                <div key={path.id} className="theme-surface rounded-2xl shadow-2xl border theme-border p-8 hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="w-16 h-16 theme-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {path.icon}
                                        </div>
                                    <div>
                                            <h3 className="text-xl font-bold theme-text group-hover:theme-primary transition-colors duration-300">{path.title}</h3>
                                            <span className={`px-3 py-1 text-sm rounded-full font-medium ${getDemandColor(path.demand)}`}>
                                            {getDemandLabel(path.demand)}
                                        </span>
                                    </div>
                                </div>
                                    <p className="theme-text-secondary text-base mb-6">{path.description}</p>

                                    <div className="space-y-4 mb-6">
                                    <div className="flex items-center justify-between text-sm">
                                            <span className="theme-text-secondary">Duração:</span>
                                            <span className="font-bold theme-text">{path.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                            <span className="theme-text-secondary">Salário Júnior:</span>
                                            <span className="font-bold text-green-600">R$ {path.salary.entry.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                            <span className="theme-text-secondary">Salário Sênior:</span>
                                            <span className="font-bold text-green-600">R$ {path.salary.senior.toLocaleString()}</span>
                                        </div>
                                </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-bold theme-text mb-3">Habilidades Principais:</h4>
                                        <div className="flex flex-wrap gap-2">
                                        {path.skills.map(skill => (
                                                <span key={skill} className="px-3 py-1 theme-surface theme-text-secondary text-sm rounded-xl">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-bold theme-text mb-3">Cursos Recomendados:</h4>
                                        <div className="space-y-2">
                                        {path.courses.map(course => (
                                                <div key={course} className="flex items-center text-sm theme-text-secondary">
                                                    <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                                                {course}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                    <button className="w-full px-6 py-4 theme-gradient-primary text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl">
                                    Começar Caminho
                                        <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                    {/* Career Tips Modernizadas */}
                    <div className="mt-20 theme-surface rounded-3xl p-12 border theme-border">
                        <div className="text-center mb-12">
                            <div className="w-20 h-20 theme-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 group">
                                <Sparkles className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h2 className="text-4xl font-bold theme-text mb-4">
                                Dicas para sua <span className="theme-gradient-primary bg-clip-text text-transparent">Carreira</span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center group">
                                <div className="w-20 h-20 theme-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <BookOpen className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold theme-text mb-4 group-hover:theme-primary transition-colors duration-300">Aprenda Continuamente</h3>
                                <p className="theme-text-secondary text-lg leading-relaxed">
                                    A tecnologia evolui rapidamente. Mantenha-se atualizado com as últimas tendências e ferramentas.
                                </p>
                            </div>
                            <div className="text-center group">
                                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Target className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold theme-text mb-4 group-hover:theme-primary transition-colors duration-300">Construa um Portfólio</h3>
                                <p className="theme-text-secondary text-lg leading-relaxed">
                                Projetos práticos demonstram suas habilidades melhor que qualquer currículo.
                            </p>
                            </div>
                            <div className="text-center group">
                                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold theme-text mb-4 group-hover:theme-primary transition-colors duration-300">Networking</h3>
                                <p className="theme-text-secondary text-lg leading-relaxed">
                                Conecte-se com outros profissionais da área e participe de comunidades.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </PageWrapperFunctional>
    );
}