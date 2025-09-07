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
    CheckCircle
} from 'lucide-react';
import Link from 'next/link';

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
    };
    experience: string;
    skills: string[];
    description: string;
    posted: string;
    applications: number;
    featured?: boolean;
    remote?: boolean;
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
    };
    skills: string[];
    courses: string[];
    demand: 'high' | 'medium' | 'low';
}

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
        posted: "2024-01-15",
        applications: 45,
        featured: true,
        remote: true
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
        posted: "2024-01-14",
        applications: 32,
        remote: true
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
        posted: "2024-01-13",
        applications: 28,
        remote: false
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
        posted: "2024-01-12",
        applications: 38,
        remote: true
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
        posted: "2024-01-11",
        applications: 25,
        remote: true
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
        posted: "2024-01-10",
        applications: 42,
        remote: true
    }
];

const careerPaths: CareerPath[] = [
    {
        id: 1,
        title: "Desenvolvedor Frontend",
        description: "Especialize-se em criar interfaces modernas e responsivas",
        icon: <Code className="w-8 h-8" />,
        duration: "6-12 meses",
        salary: { entry: 4000, senior: 12000 },
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

const jobTypes = ["Todos", "Tempo Integral", "Meio Período", "Freelance", "Estágio"];
const experienceLevels = ["Todos", "Júnior", "Pleno", "Sênior"];
const locations = ["Todos", "Remoto", "São Paulo", "Rio de Janeiro", "Outras"];

export default function CareersPage() {
    const [activeTab, setActiveTab] = useState<'jobs' | 'paths'>('jobs');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('Todos');
    const [selectedExperience, setSelectedExperience] = useState('Todos');
    const [selectedLocation, setSelectedLocation] = useState('Todos');

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesType = selectedType === 'Todos' ||
            (selectedType === 'Tempo Integral' && job.type === 'full-time') ||
            (selectedType === 'Meio Período' && job.type === 'part-time') ||
            (selectedType === 'Freelance' && job.type === 'freelance') ||
            (selectedType === 'Estágio' && job.type === 'internship');

        const matchesLocation = selectedLocation === 'Todos' ||
            (selectedLocation === 'Remoto' && job.remote) ||
            job.location.includes(selectedLocation);

        return matchesSearch && matchesType && matchesLocation;
    });

    const formatSalary = (min: number, max: number) => {
        return `R$ ${min.toLocaleString()} - R$ ${max.toLocaleString()}`;
    };

    const getDemandColor = (demand: string) => {
        switch (demand) {
            case 'high': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getDemandLabel = (demand: string) => {
        switch (demand) {
            case 'high': return 'Alta Demanda';
            case 'medium': return 'Média Demanda';
            case 'low': return 'Baixa Demanda';
            default: return 'Demanda';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-blue-600 hover:text-blue-700">
                                ← Voltar
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Carreiras em Tech</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                                <BookOpen className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 max-w-md">
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'jobs'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        Vagas
                    </button>
                    <button
                        onClick={() => setActiveTab('paths')}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'paths'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        Carreiras
                    </button>
                </div>

                {activeTab === 'jobs' && (
                    <div className="space-y-6">
                        {/* Search and Filters */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar vagas..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {jobTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedExperience}
                                    onChange={(e) => setSelectedExperience(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {experienceLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {locations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Jobs List */}
                        <div className="space-y-4">
                            {filteredJobs.map(job => (
                                <div key={job.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                                {job.featured && (
                                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                                        Destaque
                                                    </span>
                                                )}
                                                {job.remote && (
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                        Remoto
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                                <div className="flex items-center">
                                                    <Briefcase className="w-4 h-4 mr-1" />
                                                    {job.company}
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {job.experience}
                                                </div>
                                            </div>

                                            <p className="text-gray-700 mb-4">{job.description}</p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center text-green-600 font-semibold">
                                                        <DollarSign className="w-4 h-4 mr-1" />
                                                        {formatSalary(job.salary.min, job.salary.max)}
                                                    </div>
                                                    <div className="flex items-center text-gray-500 text-sm">
                                                        <Users className="w-4 h-4 mr-1" />
                                                        {job.applications} candidatos
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <div className="flex flex-wrap gap-1">
                                                        {job.skills.slice(0, 3).map(skill => (
                                                            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {job.skills.length > 3 && (
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                                +{job.skills.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                        Candidatar-se
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'paths' && (
                    <div className="space-y-6">
                        {/* Career Paths Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {careerPaths.map(path => (
                                <div key={path.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="text-blue-600">{path.icon}</div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{path.title}</h3>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getDemandColor(path.demand)}`}>
                                                {getDemandLabel(path.demand)}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-4">{path.description}</p>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Duração:</span>
                                            <span className="font-medium">{path.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Salário Júnior:</span>
                                            <span className="font-medium text-green-600">R$ {path.salary.entry.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Salário Sênior:</span>
                                            <span className="font-medium text-green-600">R$ {path.salary.senior.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Habilidades Principais:</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {path.skills.map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Cursos Recomendados:</h4>
                                        <div className="space-y-1">
                                            {path.courses.map(course => (
                                                <div key={course} className="flex items-center text-sm text-gray-600">
                                                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                                    {course}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        href="/courses"
                                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Ver Cursos
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Career Tips */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">💡 Dicas para Sua Carreira</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold mb-2">📚 Aprendizado Contínuo</h4>
                                    <p className="text-blue-100 text-sm">
                                        Mantenha-se atualizado com as últimas tecnologias e tendências do mercado.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">🤝 Networking</h4>
                                    <p className="text-blue-100 text-sm">
                                        Participe de eventos, meetups e comunidades para expandir sua rede profissional.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">💼 Portfólio</h4>
                                    <p className="text-blue-100 text-sm">
                                        Desenvolva projetos pessoais para demonstrar suas habilidades práticas.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">🎯 Especialização</h4>
                                    <p className="text-blue-100 text-sm">
                                        Escolha uma área de especialização e torne-se expert nela.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 