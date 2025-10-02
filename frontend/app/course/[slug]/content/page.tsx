'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import {
    ArrowLeft,
    Play,
    BookOpen,
    CheckCircle,
    Lock,
    Unlock,
    Download,
    Share2,
    Star,
    Clock,
    Users,
    Award,
    Code,
    FileText,
    Video,
    Image,
    Music,
    Zap,
    Brain,
    Target,
    BarChart3,
    Settings,
    Menu,
    Search,
    Filter,
    ChevronDown,
    ChevronRight,
    Eye,
    EyeOff,
    Bookmark,
    BookmarkCheck,
    MessageCircle,
    HelpCircle,
    ExternalLink
} from 'lucide-react';
import usePaymentStatus from '@/hooks/usePaymentStatus';

interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;
    type: 'video' | 'text' | 'exercise' | 'quiz' | 'project';
    isCompleted: boolean;
    isLocked: boolean;
    content: string;
    resources: {
        files: string[];
        links: string[];
        code: string;
    };
}

interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    isCompleted: boolean;
    progress: number;
}

interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    level: string;
    rating: number;
    studentsCount: number;
    modules: Module[];
    totalLessons: number;
    completedLessons: number;
    progress: number;
    certificate: boolean;
    tags: string[];
}

// Função necessária para geração estática com output: export
export async function generateStaticParams() {
    // Lista de cursos disponíveis para geração estática
    const courses = [
        'fundamentos-programacao',
        'html-css-basico',
        'javascript-fundamentos',
        'javascript-es6',
        'react-fundamentos',
        'react-advanced',
        'nodejs-fundamentos',
        'nodejs-backend',
        'python-fundamentos',
        'python-avancado',
        'django-fundamentos',
        'flask-avancado',
        'sql-fundamentos',
        'postgresql-avancado',
        'mongodb-fundamentos',
        'git-github',
        'docker-fundamentos',
        'kubernetes-avancado',
        'aws-fundamentos',
        'azure-avancado',
        'data-science-python',
        'machine-learning',
        'cybersecurity-fundamentos',
        'mobile-react-native',
        'flutter-avancado'
    ];

    return courses.map((slug) => ({
        slug: slug,
    }));
}

export default function CourseContentPage() {
    const params = useParams();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const { paymentStatus, redirectToCourse } = usePaymentStatus();

    const [course, setCourse] = useState<Course | null>(null);
    const [activeModule, setActiveModule] = useState<number>(0);
    const [activeLesson, setActiveLesson] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showSidebar, setShowSidebar] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'video' | 'text' | 'exercise' | 'quiz' | 'project'>('all');

    // Verificar se o usuário tem acesso
    useEffect(() => {
        if (!paymentStatus.loading) {
            // Para usuários premium, dar acesso automático
            if (user && isAuthenticated && (user.role === 'premium_user' || user.role === 'admin')) {
                // Usuário premium tem acesso automático
                return;
            }
            
            if (!paymentStatus.isPaid) {
                // Usuário não pagante - redirecionar para página de pagamento
                router.push(`/course/${params.slug}/purchase?upgrade=true`);
                return;
            }
        }
    }, [paymentStatus, params.slug, router, user, isAuthenticated]);

    useEffect(() => {
        loadCourseContent();
    }, [params.slug]);

    const loadCourseContent = async () => {
        try {
            setIsLoading(true);

            // Simular carregamento do conteúdo do curso
            const mockCourse: Course = {
                id: params.slug as string,
                title: `${(params.slug as string).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Curso Completo`,
                description: `Aprenda ${(params.slug as string).replace(/-/g, ' ')} do zero ao avançado com projetos práticos e exemplos reais.`,
                instructor: 'Prof. Fênix Academy',
                duration: '40 horas',
                level: 'Intermediário',
                rating: 4.9,
                studentsCount: 1250,
                totalLessons: 45,
                completedLessons: 12,
                progress: 27,
                certificate: true,
                tags: ['Programação', 'Desenvolvimento', 'Tecnologia'],
                modules: generateMockModules()
            };

            setCourse(mockCourse);
        } catch (error) {
            console.error('Erro ao carregar conteúdo do curso:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const generateMockModules = (): Module[] => {
        const modules: Module[] = [];
        const moduleTitles = [
            'Fundamentos e Configuração',
            'Componentes e Props',
            'Estado e Ciclo de Vida',
            'Roteamento e Navegação',
            'Gerenciamento de Estado',
            'Testes e Deploy'
        ];

        for (let i = 0; i < 6; i++) {
            const lessons: Lesson[] = [];
            const lessonCount = Math.floor(Math.random() * 8) + 5; // 5-12 aulas por módulo

            for (let j = 0; j < lessonCount; j++) {
                const lessonTypes: Lesson['type'][] = ['video', 'text', 'exercise', 'quiz', 'project'];
                const randomType = lessonTypes[Math.floor(Math.random() * lessonTypes.length)];

                lessons.push({
                    id: `${i + 1}-${j + 1}`,
                    title: `Aula ${j + 1}: ${getLessonTitle(randomType, j + 1)}`,
                    description: `Descrição da aula ${j + 1} do módulo ${i + 1}`,
                    duration: `${Math.floor(Math.random() * 30) + 10} min`,
                    type: randomType,
                    isCompleted: Math.random() > 0.7,
                    isLocked: j > 0 && !lessons[j - 1]?.isCompleted,
                    content: `Conteúdo da aula ${j + 1}...`,
                    resources: {
                        files: ['notas.pdf', 'codigo.zip'],
                        links: ['Documentação oficial', 'Tutorial adicional'],
                        code: 'console.log("Hello World");'
                    }
                });
            }

            modules.push({
                id: `module-${i + 1}`,
                title: moduleTitles[i] || `Módulo ${i + 1}`,
                description: `Descrição do módulo ${i + 1}`,
                lessons,
                isCompleted: lessons.every(lesson => lesson.isCompleted),
                progress: Math.floor((lessons.filter(lesson => lesson.isCompleted).length / lessons.length) * 100)
            });
        }

        return modules;
    };

    const getLessonTitle = (type: Lesson['type'], index: number): string => {
        const titles = {
            video: ['Introdução', 'Conceitos Básicos', 'Implementação', 'Exemplos Práticos'],
            text: ['Teoria', 'Fundamentos', 'Conceitos Avançados', 'Boas Práticas'],
            exercise: ['Exercício Prático', 'Hands-on', 'Implementação', 'Prática'],
            quiz: ['Quiz de Revisão', 'Teste de Conhecimento', 'Avaliação', 'Verificação'],
            project: ['Projeto Final', 'Desafio', 'Implementação Completa', 'Case Study']
        };

        const typeTitles = titles[type] || ['Aula'];
        return typeTitles[index % typeTitles.length];
    };

    const handleLessonClick = (moduleIndex: number, lessonIndex: number) => {
        setActiveModule(moduleIndex);
        setActiveLesson(lessonIndex);
    };

    const markLessonComplete = (moduleIndex: number, lessonIndex: number) => {
        if (course) {
            const updatedCourse = { ...course };
            updatedCourse.modules[moduleIndex].lessons[lessonIndex].isCompleted = true;

            // Atualizar progresso do módulo
            const module = updatedCourse.modules[moduleIndex];
            const completedLessons = module.lessons.filter(lesson => lesson.isCompleted).length;
            module.progress = Math.floor((completedLessons / module.lessons.length) * 100);
            module.isCompleted = module.progress === 100;

            // Atualizar progresso geral
            const totalCompleted = updatedCourse.modules.reduce((acc, mod) =>
                acc + mod.lessons.filter(lesson => lesson.isCompleted).length, 0
            );
            updatedCourse.completedLessons = totalCompleted;
            updatedCourse.progress = Math.floor((totalCompleted / updatedCourse.totalLessons) * 100);

            setCourse(updatedCourse);
        }
    };

    const filteredLessons = course?.modules[activeModule]?.lessons.filter(lesson => {
        if (filterType !== 'all' && lesson.type !== filterType) return false;
        if (searchQuery && !lesson.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    }) || [];

    if (paymentStatus.loading || isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Carregando conteúdo do curso...</p>
                </div>
            </div>
        );
    }

    // Verificar acesso - usuários premium têm acesso automático
    const hasAccess = user && isAuthenticated && (user.role === 'premium_user' || user.role === 'admin') || paymentStatus.isPaid;
    
    if (!hasAccess) {
        return null; // Será redirecionado
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-lg">Curso não encontrado</p>
                    <button
                        onClick={() => router.push('/courses')}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Voltar aos Cursos
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push('/courses')}
                            className="p-2 hover:bg-gray-700 rounded-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-semibold">{course.title}</h1>
                            <p className="text-sm text-gray-400">{course.instructor}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowSidebar(!showSidebar)}
                            className="p-2 hover:bg-gray-700 rounded-lg"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                {showSidebar && (
                    <div className="w-80 bg-gray-800 border-r border-gray-700 h-screen overflow-y-auto">
                        <div className="p-4">
                            {/* Progress */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">Progresso</span>
                                    <span className="text-sm text-gray-400">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {course.completedLessons} de {course.totalLessons} aulas concluídas
                                </p>
                            </div>

                            {/* Search and Filter */}
                            <div className="mb-4">
                                <div className="relative mb-3">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Buscar aulas..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value as any)}
                                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Todas as aulas</option>
                                    <option value="video">Vídeos</option>
                                    <option value="text">Textos</option>
                                    <option value="exercise">Exercícios</option>
                                    <option value="quiz">Quizzes</option>
                                    <option value="project">Projetos</option>
                                </select>
                            </div>

                            {/* Modules */}
                            <div className="space-y-2">
                                {course.modules.map((module, moduleIndex) => (
                                    <div key={module.id} className="border border-gray-700 rounded-lg">
                                        <button
                                            onClick={() => setActiveModule(moduleIndex)}
                                            className={`w-full p-3 text-left flex items-center justify-between ${activeModule === moduleIndex ? 'bg-blue-600' : 'hover:bg-gray-700'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                {module.isCompleted ? (
                                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                                ) : (
                                                    <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                                                )}
                                                <span className="text-sm font-medium">{module.title}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs text-gray-400">{module.progress}%</span>
                                                {activeModule === moduleIndex ? (
                                                    <ChevronDown className="w-4 h-4" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4" />
                                                )}
                                            </div>
                                        </button>

                                        {activeModule === moduleIndex && (
                                            <div className="px-3 pb-3 space-y-1">
                                                {filteredLessons.map((lesson, lessonIndex) => (
                                                    <button
                                                        key={lesson.id}
                                                        onClick={() => handleLessonClick(moduleIndex, lessonIndex)}
                                                        className={`w-full p-2 text-left flex items-center space-x-2 rounded ${activeLesson === lessonIndex ? 'bg-blue-500' : 'hover:bg-gray-600'
                                                            }`}
                                                        disabled={lesson.isLocked}
                                                    >
                                                        <div className="flex-shrink-0">
                                                            {lesson.isCompleted ? (
                                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                            ) : lesson.isLocked ? (
                                                                <Lock className="w-4 h-4 text-gray-500" />
                                                            ) : (
                                                                <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                                                            )}
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-medium truncate">{lesson.title}</p>
                                                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                                                                <span>{lesson.duration}</span>
                                                                <span>•</span>
                                                                <span className="capitalize">{lesson.type}</span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {course.modules[activeModule] && course.modules[activeModule].lessons[activeLesson] ? (
                        <div className="flex-1 p-6">
                            <div className="max-w-4xl mx-auto">
                                {/* Lesson Header */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold">
                                                {course.modules[activeModule].lessons[activeLesson].title}
                                            </h2>
                                            <p className="text-gray-400 mt-1">
                                                {course.modules[activeModule].lessons[activeLesson].description}
                                            </p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 hover:bg-gray-700 rounded-lg">
                                                <Bookmark className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-700 rounded-lg">
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-700 rounded-lg">
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{course.modules[activeModule].lessons[activeLesson].duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <FileText className="w-4 h-4" />
                                            <span className="capitalize">{course.modules[activeModule].lessons[activeLesson].type}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Users className="w-4 h-4" />
                                            <span>{course.studentsCount} alunos</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Lesson Content */}
                                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                                    <div className="prose prose-invert max-w-none">
                                        <h3>Conteúdo da Aula</h3>
                                        <p>{course.modules[activeModule].lessons[activeLesson].content}</p>

                                        {/* Code Example */}
                                        {course.modules[activeModule].lessons[activeLesson].resources.code && (
                                            <div className="mt-4">
                                                <h4>Código de Exemplo:</h4>
                                                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                                                    <code>{course.modules[activeModule].lessons[activeLesson].resources.code}</code>
                                                </pre>
                                            </div>
                                        )}

                                        {/* Resources */}
                                        {course.modules[activeModule].lessons[activeLesson].resources.files.length > 0 && (
                                            <div className="mt-4">
                                                <h4>Recursos:</h4>
                                                <ul className="list-disc list-inside">
                                                    {course.modules[activeModule].lessons[activeLesson].resources.files.map((file, index) => (
                                                        <li key={index}>
                                                            <a href="#" className="text-blue-400 hover:text-blue-300">
                                                                {file}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => markLessonComplete(activeModule, activeLesson)}
                                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Marcar como Concluída</span>
                                        </button>

                                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                            <Play className="w-4 h-4" />
                                            <span>Próxima Aula</span>
                                        </button>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 hover:bg-gray-700 rounded-lg">
                                            <MessageCircle className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-700 rounded-lg">
                                            <HelpCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-400 text-lg">Selecione uma aula para começar</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

