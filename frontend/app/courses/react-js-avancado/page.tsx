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

export default function ReactJsAvancadoPage() {
    const [courseData, setCourseData] = useState<CourseContent | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'instructor' | 'reviews'>('overview');
    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCourseData = async () => {
            try {
                const mockData: CourseContent = {
                    id: 9,
                    title: "React JS Avançado",
                    description: "Hooks avançados, performance, testes e arquitetura de aplicações React.",
                    instructor: "Lucas Oliveira",
                    level: "advanced",
                    duration: "40 horas",
                    students: 2341,
                    rating: 4.9,
                    price: 447,
                    originalPrice: 547,
                    image: "/courses/react-advanced.jpg",
                    category: "Frontend",
                    lessons: 35,
                    certificate: true,
                    discount: 18,
                    modules: [
                        {
                            id: 1,
                            title: "Hooks Avançados",
                            description: "Custom hooks e padrões avançados",
                            duration: 8,
                            lessons: [
                                {
                                    id: 1,
                                    title: "Custom Hooks",
                                    duration: 1800,
                                    type: "video",
                                    content: "# Hooks Avançados no React\n\nBem-vindo ao curso **React JS Avançado** da Fenix Academy!\n\n## O que são Custom Hooks?\n\nCustom hooks são funções JavaScript que começam com 'use' e podem chamar outros hooks. Eles permitem extrair lógica de componentes para reutilização.\n\n### 🎣 **Vantagens dos Custom Hooks**\n- **Reutilização**: Lógica compartilhada entre componentes\n- **Organização**: Código mais limpo e organizado\n- **Testabilidade**: Fácil de testar isoladamente\n- **Manutenibilidade**: Mudanças centralizadas\n\n### 📦 **Hooks Comuns**\n- **useState**: Gerenciamento de estado local\n- **useEffect**: Efeitos colaterais\n- **useContext**: Compartilhamento de estado\n- **useReducer**: Estado complexo\n- **useMemo/useCallback**: Otimização de performance",
                                    video_url: "https://fenix-academy.s3.amazonaws.com/courses/react-advanced/hooks/custom-hooks.mp4",
                                    transcript: "Vamos aprender a criar custom hooks poderosos para reutilização de lógica.",
                                    resources: [
                                        {
                                            type: "documentation",
                                            title: "React Hooks Documentation",
                                            url: "https://react.dev/reference/react",
                                            description: "Documentação oficial dos React Hooks"
                                        }
                                    ],
                                    exercises: [
                                        {
                                            title: "Criando Custom Hooks",
                                            description: "Desenvolva hooks personalizados",
                                            difficulty: "medium",
                                            estimated_time: "60 minutos",
                                            instructions: "1. Crie hook useLocalStorage\n2. Implemente useFetch\n3. Desenvolva useForm\n4. Teste os hooks"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: "Performance e Otimização",
                            description: "Memoização e técnicas avançadas",
                            duration: 10,
                            lessons: [
                                {
                                    id: 2,
                                    title: "React.memo e useMemo",
                                    duration: 2400,
                                    type: "video",
                                    content: "Aprenda técnicas de otimização para melhorar a performance de suas aplicações React.",
                                    video_url: "https://fenix-academy.s3.amazonaws.com/courses/react-advanced/performance/memo.mp4"
                                }
                            ]
                        },
                        {
                            id: 3,
                            title: "Testes com Jest e Testing Library",
                            description: "Testes unitários e de integração",
                            duration: 8,
                            lessons: [
                                {
                                    id: 3,
                                    title: "Configurando Testes",
                                    duration: 2000,
                                    type: "video",
                                    content: "Configure e escreva testes eficazes para componentes React.",
                                    video_url: "https://fenix-academy.s3.amazonaws.com/courses/react-advanced/testes/configuracao.mp4"
                                }
                            ]
                        },
                        {
                            id: 4,
                            title: "Arquitetura e Padrões",
                            description: "Organização de código e padrões",
                            duration: 8,
                            lessons: [
                                {
                                    id: 4,
                                    title: "Padrões de Arquitetura",
                                    duration: 2200,
                                    type: "video",
                                    content: "Aprenda padrões arquiteturais para aplicações React escaláveis.",
                                    video_url: "https://fenix-academy.s3.amazonaws.com/courses/react-advanced/arquitetura/padroes.mp4"
                                }
                            ]
                        },
                        {
                            id: 5,
                            title: "Projetos Avançados",
                            description: "Aplicações completas",
                            duration: 6,
                            lessons: [
                                {
                                    id: 5,
                                    title: "Dashboard Admin",
                                    duration: 1800,
                                    type: "project",
                                    content: "Desenvolva um dashboard administrativo completo com React.",
                                    video_url: "https://fenix-academy.s3.amazonaws.com/courses/react-advanced/projetos/dashboard.mp4"
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
                                            e.currentTarget.src = '/courses/react-advanced.jpg';
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
                                    <span className="text-gray-700">Custom hooks avançados</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Otimização de performance</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Testes com Jest e Testing Library</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Arquitetura e padrões avançados</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Conhecimento sólido de React</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">JavaScript ES6+</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Experiência com hooks básicos</span>
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
                                    Desenvolvedor Frontend Senior com mais de 8 anos de experiência em React e JavaScript.
                                    Já trabalhou em grandes empresas de tecnologia e startups. Especialista em
                                    arquitetura de aplicações React, performance e testes.
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-900">Especialidades:</span>
                                        <p className="text-gray-600">React, TypeScript, Performance, Testes</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-900">Experiência:</span>
                                        <p className="text-gray-600">8+ anos</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-900">Alunos treinados:</span>
                                        <p className="text-gray-600">12.000+</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-900">Aplicações React:</span>
                                        <p className="text-gray-600">50+</p>
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
                                    name: "Rafael Santos",
                                    rating: 5,
                                    date: "1 semana atrás",
                                    comment: "Curso excepcional! O Lucas explica conceitos avançados de forma muito clara. Os projetos práticos são incríveis."
                                },
                                {
                                    name: "Juliana Costa",
                                    rating: 4,
                                    date: "2 semanas atrás",
                                    comment: "Muito bom curso. Gostei especialmente da parte sobre performance e otimização."
                                },
                                {
                                    name: "Marcos Silva",
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