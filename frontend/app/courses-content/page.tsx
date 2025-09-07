'use client';

import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    Play,
    CheckCircle,
    ChevronRight,
    ChevronDown,
    FileText,
    Target,
    HelpCircle,
    Download,
    ExternalLink,
    Clock,
    Users,
    Star,
    ArrowLeft,
    ArrowRight,
    Lock,
    Shield
} from 'lucide-react';
import Link from 'next/link';
import { coursesData } from '../course/[id]/courseData';

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

interface UserPermissions {
    level: 'free' | 'basic' | 'premium' | 'admin';
    purchasedCourses: number[];
    canAccessContent: boolean;
    canDownloadResources: boolean;
    canTakeQuizzes: boolean;
    canAccessExercises: boolean;
    canViewTranscripts: boolean;
    canAccessAdvancedFeatures: boolean;
}

export default function CoursesContentPage() {
    const [selectedCourse, setSelectedCourse] = useState<CourseContent | null>(null);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [expandedModules, setExpandedModules] = useState<number[]>([1]);
    const [activeTab, setActiveTab] = useState<'content' | 'exercises' | 'quiz' | 'resources'>('content');
    const [courseIndex, setCourseIndex] = useState(0);
    const [userPermissions] = useState<UserPermissions>({
        level: 'free',
        purchasedCourses: [],
        canAccessContent: true,
        canDownloadResources: false,
        canTakeQuizzes: false,
        canAccessExercises: false,
        canViewTranscripts: false,
        canAccessAdvancedFeatures: false
    });
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [permissionMessage, setPermissionMessage] = useState('');

    // Mock data for course content with permissions
    const mockCourseContent: CourseContent[] = coursesData.map((course, index) => ({
        ...course,
        requiresPermission: index > 2, // Primeiros 3 cursos são gratuitos
        permissionLevel: index > 2 ? 'premium' : 'free',
        modules: [
            {
                id: 1,
                title: "Introdução ao Curso",
                description: `Módulo 1 do curso ${course.title}`,
                duration: 2,
                requiresPermission: index > 2,
                permissionLevel: index > 2 ? 'premium' : 'free',
                lessons: [
                    {
                        id: 1,
                        title: `Bem-vindo ao ${course.title}`,
                        duration: 1800,
                        type: 'video',
                        requiresPermission: index > 2,
                        permissionLevel: index > 2 ? 'premium' : 'free',
                        content: `
# Bem-vindo ao ${course.title}

Olá! Bem-vindo ao curso ${course.title} da Fenix Academy.

## O que você vai aprender

Neste curso, você vai aprender:

- Fundamentos da tecnologia
- Conceitos avançados
- Projetos práticos
- Melhores práticas

## Pré-requisitos

- Conhecimento básico de programação
- Computador com acesso à internet
- Dedicação e vontade de aprender

## Estrutura do Curso

O curso está dividido em módulos que cobrem:

1. **Introdução** - Conceitos básicos
2. **Fundamentos** - Base sólida
3. **Avançado** - Técnicas avançadas
4. **Projeto Final** - Aplicação prática

## Recursos Disponíveis

- Vídeos explicativos
- Exercícios práticos
- Quiz de avaliação
- Recursos complementares
- Suporte ao aluno

Vamos começar sua jornada de aprendizado!
                        `,
                        video_url: `https://fenix-academy.s3.amazonaws.com/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}/introducao/bem-vindo.mp4`,
                        transcript: `Bem-vindo ao curso ${course.title}. Nesta aula introdutória, vamos entender o que você vai aprender e como o curso está estruturado.`,
                        resources: [
                            {
                                type: "documentation",
                                title: "Documentação oficial",
                                url: "https://developer.mozilla.org/",
                                description: "Referência completa da tecnologia"
                            },
                            {
                                type: "github",
                                title: "Código fonte",
                                url: "https://github.com/fenix-academy/examples",
                                description: "Exemplos práticos da aula"
                            }
                        ],
                        exercises: [
                            {
                                title: "Exercício Introdutório",
                                description: "Configure seu ambiente de desenvolvimento",
                                difficulty: "easy",
                                estimated_time: "30 minutos",
                                instructions: "Instale as ferramentas necessárias para começar o curso"
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                title: "Fundamentos",
                description: `Módulo 2 do curso ${course.title}`,
                duration: 4,
                requiresPermission: index > 2,
                permissionLevel: index > 2 ? 'premium' : 'free',
                lessons: [
                    {
                        id: 2,
                        title: "Conceitos Básicos",
                        duration: 2400,
                        type: 'video',
                        requiresPermission: index > 2,
                        permissionLevel: index > 2 ? 'premium' : 'free',
                        content: `
# Conceitos Básicos

Nesta aula, vamos explorar os conceitos fundamentais de ${course.category}.

## Principais Conceitos

### 1. Fundamentos
- Conceito principal 1
- Conceito principal 2
- Conceito principal 3

### 2. Aplicações Práticas
- Como aplicar na prática
- Exemplos reais
- Casos de uso

### 3. Melhores Práticas
- Padrões recomendados
- Evitando armadilhas
- Performance e otimização

## Exemplo Prático

\`\`\`javascript
// Exemplo de código
function exemplo() {
    console.log("Hello World!");
}
\`\`\`

## Próximos Passos

No próximo módulo, vamos aprofundar em conceitos mais avançados.
                        `,
                        video_url: `https://fenix-academy.s3.amazonaws.com/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}/fundamentos/conceitos-basicos.mp4`,
                        transcript: `Nesta aula sobre conceitos básicos, vamos entender os fundamentos de ${course.category}.`,
                        resources: [
                            {
                                type: "documentation",
                                title: "Documentação oficial",
                                url: "https://developer.mozilla.org/",
                                description: "Referência completa da tecnologia"
                            }
                        ],
                        exercises: [
                            {
                                title: "Exercício Básico",
                                description: "Implemente o conceito aprendido",
                                difficulty: "easy",
                                estimated_time: "45 minutos",
                                instructions: "Crie um exemplo prático do que foi ensinado"
                            }
                        ]
                    }
                ]
            }
        ]
    }));

    useEffect(() => {
        if (mockCourseContent.length > 0 && courseIndex < mockCourseContent.length) {
            const course = mockCourseContent[courseIndex];
            if (course) {
                setSelectedCourse(course);
                if (course.modules[0] && course.modules[0].lessons[0]) {
                    setCurrentLesson(course.modules[0].lessons[0]);
                }
            }
        }
    }, [courseIndex, mockCourseContent]);

    const checkPermission = (requiredLevel: string, userLevel: string): boolean => {
        const levels = { 'free': 0, 'basic': 1, 'premium': 2, 'admin': 3 };
        return levels[userLevel as keyof typeof levels] >= levels[requiredLevel as keyof typeof levels];
    };

    const canAccessContent = (content: CourseContent | Module | Lesson): boolean => {
        if (!content.requiresPermission) return true;
        return checkPermission(content.permissionLevel || 'free', userPermissions.level);
    };

    const handlePermissionDenied = (contentType: string, requiredLevel: string) => {
        setPermissionMessage(`Você precisa de permissão ${requiredLevel} para acessar este ${contentType}.`);
        setShowPermissionModal(true);
    };

    const toggleModule = (moduleId: number) => {
        if (!selectedCourse) return;

        const module = selectedCourse.modules.find(m => m.id === moduleId);
        if (module && !canAccessContent(module)) {
            handlePermissionDenied('módulo', module.permissionLevel || 'free');
            return;
        }

        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    const selectLesson = (lesson: Lesson) => {
        if (!canAccessContent(lesson)) {
            handlePermissionDenied('conteúdo', lesson.permissionLevel || 'free');
            return;
        }

        setCurrentLesson(lesson);
        setActiveTab('content');
    };

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getLevelLabel = (level: string) => {
        switch (level) {
            case 'beginner': return 'Iniciante';
            case 'intermediate': return 'Intermediário';
            case 'advanced': return 'Avançado';
            default: return level;
        }
    };

    const getPermissionColor = (level: string) => {
        switch (level) {
            case 'free': return 'bg-green-100 text-green-800';
            case 'basic': return 'bg-blue-100 text-blue-800';
            case 'premium': return 'bg-purple-100 text-purple-800';
            case 'admin': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const nextCourse = () => {
        setCourseIndex(prev => (prev + 1) % mockCourseContent.length);
    };

    const prevCourse = () => {
        setCourseIndex(prev => (prev - 1 + mockCourseContent.length) % mockCourseContent.length);
    };

    if (!selectedCourse || !currentLesson) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando conteúdo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Permission Modal */}
            {showPermissionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center mb-4">
                            <Lock className="w-8 h-8 text-red-500 mr-3" />
                            <h3 className="text-lg font-semibold text-gray-900">Acesso Restrito</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{permissionMessage}</p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowPermissionModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Fechar
                            </button>
                            <Link
                                href="/pricing"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                            >
                                Ver Planos
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/courses" className="text-blue-600 hover:text-blue-700">
                                ← Voltar aos Cursos
                            </Link>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={prevCourse}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div>
                                    <h1 className="text-lg font-semibold text-gray-900">{selectedCourse.title}</h1>
                                    <p className="text-sm text-gray-600">{currentLesson.title}</p>
                                </div>
                                <button
                                    onClick={nextCourse}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(selectedCourse.level)}`}>
                                {getLevelLabel(selectedCourse.level)}
                            </span>
                            {selectedCourse.requiresPermission && (
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPermissionColor(selectedCourse.permissionLevel || 'free')}`}>
                                    {selectedCourse.permissionLevel?.toUpperCase()}
                                </span>
                            )}
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{selectedCourse.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{selectedCourse.students.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Star className="w-4 h-4" />
                                <span>{selectedCourse.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-80 bg-white border-r overflow-y-auto">
                    <div className="p-4">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Conteúdo do Curso</h2>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <BookOpen className="w-4 h-4" />
                                <span>{selectedCourse.modules.length} módulos</span>
                                <span>•</span>
                                <span>{selectedCourse.modules.reduce((acc, module) => acc + module.lessons.length, 0)} aulas</span>
                            </div>
                            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                                <Shield className="w-4 h-4" />
                                <span>Seu nível: {userPermissions.level.toUpperCase()}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {selectedCourse.modules.map((module, moduleIndex) => {
                                const hasAccess = canAccessContent(module);
                                return (
                                    <div key={module.id} className="border rounded-lg">
                                        <button
                                            onClick={() => toggleModule(module.id)}
                                            className={`w-full flex items-center justify-between p-3 transition-colors ${hasAccess ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
                                                }`}
                                            disabled={!hasAccess}
                                        >
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-500 mr-2">
                                                    {moduleIndex + 1}
                                                </span>
                                                <div className="text-left">
                                                    <h3 className="font-medium text-gray-900 text-sm">{module.title}</h3>
                                                    <p className="text-xs text-gray-500">{module.lessons.length} aulas</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {module.requiresPermission && !hasAccess && (
                                                    <Lock className="w-4 h-4 text-gray-400" />
                                                )}
                                                {expandedModules.includes(module.id) ? (
                                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                                )}
                                            </div>
                                        </button>

                                        {expandedModules.includes(module.id) && (
                                            <div className="border-t bg-gray-50">
                                                <div className="p-2 space-y-1">
                                                    {module.lessons.map((lesson, lessonIndex) => {
                                                        const hasLessonAccess = canAccessContent(lesson);
                                                        return (
                                                            <button
                                                                key={lesson.id}
                                                                onClick={() => selectLesson(lesson)}
                                                                disabled={!hasLessonAccess}
                                                                className={`w-full flex items-center justify-between p-2 rounded text-left transition-colors ${!hasLessonAccess ? 'opacity-50 cursor-not-allowed' :
                                                                    currentLesson?.id === lesson.id
                                                                        ? 'bg-blue-100 text-blue-700'
                                                                        : 'hover:bg-gray-100'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    {hasLessonAccess ? (
                                                                        <Play className="w-4 h-4 text-blue-500" />
                                                                    ) : (
                                                                        <Lock className="w-4 h-4 text-gray-400" />
                                                                    )}
                                                                    <div>
                                                                        <p className="text-sm font-medium">
                                                                            {lessonIndex + 1}. {lesson.title}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">
                                                                            {formatDuration(lesson.duration)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    {lesson.completed && hasLessonAccess && (
                                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                                    )}
                                                                    {lesson.requiresPermission && !hasLessonAccess && (
                                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPermissionColor(lesson.permissionLevel || 'free')}`}>
                                                                            {lesson.permissionLevel?.toUpperCase()}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white">
                    <div className="h-full flex flex-col">
                        {/* Video Player */}
                        {currentLesson.type === 'video' && (
                            <div className="bg-black aspect-video flex items-center justify-center">
                                <div className="text-center text-white">
                                    <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                                    <p className="text-lg">Vídeo: {currentLesson.title}</p>
                                    <p className="text-sm opacity-70">Duração: {formatDuration(currentLesson.duration)}</p>
                                </div>
                            </div>
                        )}

                        {/* Content Tabs */}
                        <div className="flex-1 flex flex-col">
                            <div className="border-b">
                                <nav className="flex space-x-8 px-6">
                                    {[
                                        { id: 'content', label: 'Conteúdo', icon: FileText },
                                        { id: 'exercises', label: 'Exercícios', icon: Target },
                                        { id: 'quiz', label: 'Quiz', icon: HelpCircle },
                                        { id: 'resources', label: 'Recursos', icon: Download },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            <tab.icon className="w-4 h-4 mr-2" />
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                {activeTab === 'content' && (
                                    <div className="prose max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: currentLesson.content?.replace(/\n/g, '<br>') || '' }} />
                                    </div>
                                )}

                                {activeTab === 'exercises' && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900">Exercícios Práticos</h3>
                                        {!userPermissions.canAccessExercises ? (
                                            <div className="border rounded-lg p-6 text-center">
                                                <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Exercícios Bloqueados</h4>
                                                <p className="text-gray-600 mb-4">Faça upgrade para acessar os exercícios práticos.</p>
                                                <Link
                                                    href="/pricing"
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                                >
                                                    Ver Planos
                                                </Link>
                                            </div>
                                        ) : (
                                            currentLesson.exercises?.map((exercise, index) => (
                                                <div key={index} className="border rounded-lg p-6">
                                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{exercise.title}</h4>
                                                    <p className="text-gray-600 mb-4">{exercise.description}</p>
                                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                        <h5 className="font-medium text-gray-900 mb-2">Instruções:</h5>
                                                        <p className="text-sm text-gray-700">{exercise.instructions}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                            <span>Dificuldade: {exercise.difficulty}</span>
                                                            <span>Tempo estimado: {exercise.estimated_time}</span>
                                                        </div>
                                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                                            Abrir no IDE
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {activeTab === 'quiz' && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900">Quiz: {currentLesson.title}</h3>
                                        {!userPermissions.canTakeQuizzes ? (
                                            <div className="border rounded-lg p-6 text-center">
                                                <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Quiz Bloqueado</h4>
                                                <p className="text-gray-600 mb-4">Faça upgrade para acessar os quizzes de avaliação.</p>
                                                <Link
                                                    href="/pricing"
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                                >
                                                    Ver Planos
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="border rounded-lg p-6">
                                                <h4 className="font-medium text-gray-900 mb-4">Pergunta do quiz sobre esta aula</h4>
                                                <div className="space-y-2">
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input type="radio" name="question-1" className="text-blue-600" />
                                                        <span className="text-gray-700">Opção A</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input type="radio" name="question-1" className="text-blue-600" />
                                                        <span className="text-gray-700">Opção B</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input type="radio" name="question-1" className="text-blue-600" />
                                                        <span className="text-gray-700">Opção C</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input type="radio" name="question-1" className="text-blue-600" />
                                                        <span className="text-gray-700">Opção D</span>
                                                    </label>
                                                </div>
                                                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                                    Verificar Resposta
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'resources' && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900">Recursos Adicionais</h3>
                                        {!userPermissions.canDownloadResources ? (
                                            <div className="border rounded-lg p-6 text-center">
                                                <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Recursos Bloqueados</h4>
                                                <p className="text-gray-600 mb-4">Faça upgrade para baixar recursos complementares.</p>
                                                <Link
                                                    href="/pricing"
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                                >
                                                    Ver Planos
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {currentLesson.resources?.map((resource, index) => (
                                                    <div key={index} className="border rounded-lg p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-medium text-gray-900">{resource.title}</h4>
                                                            <ExternalLink className="w-4 h-4 text-gray-400" />
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                                                        <a
                                                            href={resource.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                                                        >
                                                            Acessar recurso
                                                            <ExternalLink className="w-3 h-3 ml-1" />
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 