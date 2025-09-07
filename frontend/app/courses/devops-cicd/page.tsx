'use client';

import React, { useState, useEffect } from 'react';
import {
    Play,
    Clock,
    BookOpen,
    CheckCircle,
    Lock,
    Star,
    Users,
    Award,
    Download,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

interface Lesson {
    id: number;
    title: string;
    duration: number;
    type: 'video' | 'text' | 'quiz' | 'exercise' | 'project';
    content?: string;
    video_url?: string;
    transcript?: string;
    resources?: any[];
    exercises?: any[];
    completed?: boolean;
    requiresPermission?: boolean;
    permissionLevel?: 'free' | 'basic' | 'premium' | 'admin';
}

interface Module {
    id: number;
    title: string;
    description: string;
    duration: number;
    lessons: Lesson[];
    completed?: boolean;
    requiresPermission?: boolean;
    permissionLevel?: 'free' | 'basic' | 'premium' | 'admin';
}

interface CourseContent {
    id: number;
    title: string;
    description: string;
    instructor: string;
    level: string;
    duration: string;
    students: number;
    rating: number;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    lessons: number;
    certificate: boolean;
    featured?: boolean;
    new?: boolean;
    discount?: number;
    modules: Module[];
    requiresPermission?: boolean;
    permissionLevel?: 'free' | 'basic' | 'premium' | 'admin';
}

export default function DevOpsCicdPage() {
    const [courseData, setCourseData] = useState<CourseContent | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'instructor' | 'reviews'>('overview');
    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCourseData = async () => {
            try {
                const mockData: CourseContent = {
                    id: 6,
                    title: "DevOps e CI/CD",
                    description: "Automatize deploy, monitoramento e infraestrutura como código.",
                    instructor: "Roberto Silva",
                    level: "advanced",
                    duration: "50 horas",
                    students: 445,
                    rating: 4.8,
                    price: 347,
                    originalPrice: 447,
                    image: "/courses/devops.jpg",
                    category: "DevOps",
                    lessons: 40,
                    certificate: true,
                    discount: 22,
                    modules: [
                        {
                            id: 1,
                            title: "Introdução ao DevOps",
                            description: "Conceitos fundamentais e cultura DevOps",
                            duration: 8,
                            lessons: [
                                {
                                    id: 1,
                                    title: "Bem-vindo ao DevOps",
                                    duration: 1800,
                                    type: "video",
                                    content: "# Bem-vindo ao DevOps\n\nOlá! Bem-vindo ao curso **DevOps e CI/CD** da Fenix Academy.\n\n## O que você vai aprender\n\nNeste curso avançado, você vai dominar:\n\n### 🚀 **Cultura DevOps**\n- Princípios e práticas\n- Colaboração entre equipes\n- Automação de processos\n- Melhoria contínua\n\n### 🔧 **Ferramentas e Tecnologias**\n- Docker e containerização\n- Kubernetes para orquestração\n- Jenkins e GitLab CI\n- Terraform para IaC\n\n### ☁️ **Cloud e Infraestrutura**\n- AWS, Azure, GCP\n- Monitoramento e observabilidade\n- Segurança em DevOps\n- Deploy automatizado",
                                    video_url: "https://fenix-academy.s3.amazonaws.com/courses/devops/introducao/bem-vindo.mp4",
                                    transcript: "Bem-vindo ao curso de DevOps. Vamos aprender automação e cultura de colaboração.",
                                    resources: [
                                        {
                                            type: "documentation",
                                            title: "DevOps Documentation",
                                            url: "https://docs.docker.com/",
                                            description: "Documentação oficial do Docker"
                                        }
                                    ],
                                    exercises: [
                                        {
                                            title: "Setup do Ambiente",
                                            description: "Configure o ambiente DevOps",
                                            difficulty: "medium",
                                            estimated_time: "60 minutos",
                                            instructions: "1. Instale Docker\n2. Configure Kubernetes\n3. Configure Jenkins\n4. Teste a instalação"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: "Docker e Containerização",
                            description: "Containerização de aplicações",
                            duration: 12,
                            lessons: [
                                {
                                    id: 2,
                                    title: "Introdução ao Docker",
                                    duration: 2400,
                                    type: "video",
                                    content: "Aprenda os fundamentos do Docker para containerização.",
                                    video_url: "https://fenix-academy.s3.amazonaws.com/courses/devops/docker/introducao.mp4"
                                }
                            ]
                        }
                    ]
                };

                setCourseData(mockData);
                setExpandedModules(new Set([1]));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load course');
            } finally {
                setLoading(false);
            }
        };

        loadCourseData();
    }, []);

    const toggleModule = (moduleId: number) => {
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId);
        } else {
            newExpanded.add(moduleId);
        }
        setExpandedModules(newExpanded);
    };

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Play className="w-4 h-4" />;
            case 'text': return <BookOpen className="w-4 h-4" />;
            case 'quiz': return <CheckCircle className="w-4 h-4" />;
            case 'exercise': return <Download className="w-4 h-4" />;
            case 'project': return <Award className="w-4 h-4" />;
            default: return <BookOpen className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'video': return 'bg-blue-100 text-blue-800';
            case 'text': return 'bg-green-100 text-green-800';
            case 'quiz': return 'bg-purple-100 text-purple-800';
            case 'exercise': return 'bg-orange-100 text-orange-800';
            case 'project': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando curso...</p>
                </div>
            </div>
        );
    }

    if (error || !courseData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Erro ao carregar o curso</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Course Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-gray-500">{courseData.category}</span>
                                <span className="text-gray-300">•</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(courseData.level)}`}>
                                    {courseData.level === 'beginner' ? 'Iniciante' :
                                        courseData.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                                </span>
                            </div>

                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                {courseData.title}
                            </h1>

                            <p className="text-lg text-gray-600 mb-6">
                                {courseData.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>{courseData.students.toLocaleString()} alunos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span>{courseData.rating} ({courseData.students} avaliações)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{courseData.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{courseData.lessons} aulas</span>
                                </div>
                            </div>
                        </div>

                        {/* Course Card */}
                        <div className="lg:w-80">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-6">
                                <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                    <img
                                        src={courseData.image}
                                        alt={courseData.title}
                                        className="w-full h-full object-cover rounded-lg"
                                        onError={(e) => {
                                            e.currentTarget.src = '/courses/devops.jpg';
                                        }}
                                    />
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    {courseData.originalPrice && courseData.originalPrice > courseData.price && (
                                        <span className="text-2xl font-bold text-gray-400 line-through">
                                            R$ {courseData.originalPrice}
                                        </span>
                                    )}
                                    <span className="text-3xl font-bold text-gray-900">
                                        R$ {courseData.price}
                                    </span>
                                    {courseData.discount && (
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                                            -{courseData.discount}%
                                        </span>
                                    )}
                                </div>

                                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4">
                                    Matricular-se Agora
                                </button>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span>Acesso vitalício</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span>Certificado de conclusão</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span>Suporte da comunidade</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span>Atualizações gratuitas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="border-b border-gray-200 mb-8">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'overview', label: 'Visão Geral' },
                            { id: 'content', label: 'Conteúdo' },
                            { id: 'instructor', label: 'Instrutor' },
                            { id: 'reviews', label: 'Avaliações' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">O que você vai aprender</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Cultura e práticas DevOps</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Docker e containerização</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Kubernetes e orquestração</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">CI/CD e automação</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Experiência com Linux</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Conhecimento básico de redes</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Familiaridade com Git</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Conteúdo do Curso</h3>
                            <p className="text-gray-600">
                                {courseData.modules.length} módulos • {courseData.lessons} aulas • {courseData.duration}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {courseData.modules.map((module) => (
                                <div key={module.id} className="border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => toggleModule(module.id)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-medium text-gray-900">{module.title}</h4>
                                                <span className="text-sm text-gray-500">
                                                    {module.lessons.length} aulas • {formatDuration(module.duration * 60)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{module.description}</p>
                                        </div>
                                        {expandedModules.has(module.id) ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>

                                    {expandedModules.has(module.id) && (
                                        <div className="border-t border-gray-200 bg-gray-50">
                                            <div className="px-6 py-4 space-y-3">
                                                {module.lessons.map((lesson) => (
                                                    <div key={lesson.id} className="flex items-center gap-3 py-2">
                                                        <div className={`p-1 rounded ${getTypeColor(lesson.type)}`}>
                                                            {getTypeIcon(lesson.type)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-medium text-gray-900">
                                                                    {lesson.title}
                                                                </span>
                                                                {lesson.requiresPermission && (
                                                                    <Lock className="w-4 h-4 text-gray-400" />
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                                                <span>{formatDuration(lesson.duration)}</span>
                                                                <span className="capitalize">{lesson.type}</span>
                                                                {lesson.exercises && lesson.exercises.length > 0 && (
                                                                    <span>{lesson.exercises.length} exercícios</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'instructor' && (
                    <div>
                        <div className="flex items-start gap-6">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-600">
                                    {courseData.instructor.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {courseData.instructor}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Engenheiro DevOps com mais de 8 anos de experiência em automação e infraestrutura.
                                    Já trabalhou em grandes empresas de tecnologia e startups. Especialista em
                                    Docker, Kubernetes, CI/CD e cloud computing.
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-900">Especialidades:</span>
                                        <p className="text-gray-600">Docker, Kubernetes, CI/CD, Cloud</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-900">Experiência:</span>
                                        <p className="text-gray-600">8+ anos</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-900">Alunos treinados:</span>
                                        <p className="text-gray-600">6.000+</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-900">Projetos DevOps:</span>
                                        <p className="text-gray-600">30+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gray-900">{courseData.rating}</div>
                                <div className="flex items-center justify-center gap-1 mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= Math.floor(courseData.rating)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    {courseData.students} avaliações
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Mock reviews */}
                            {[
                                {
                                    name: "Fernando Costa",
                                    rating: 5,
                                    date: "1 semana atrás",
                                    comment: "Curso excepcional! O Roberto explica conceitos complexos de forma muito clara. Os projetos práticos são incríveis."
                                },
                                {
                                    name: "Mariana Santos",
                                    rating: 4,
                                    date: "2 semanas atrás",
                                    comment: "Muito bom curso. Gostei especialmente da parte sobre Kubernetes."
                                },
                                {
                                    name: "Ricardo Lima",
                                    rating: 5,
                                    date: "1 mês atrás",
                                    comment: "Instrutor muito didático. Conteúdo atualizado e exemplos práticos excelentes."
                                }
                            ].map((review, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {review.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{review.name}</div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-3 h-3 ${star <= review.rating
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 