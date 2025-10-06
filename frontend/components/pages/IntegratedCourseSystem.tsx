'use client';

import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    Trophy,
    BarChart3,
    Users,
    Settings,
    Home,
    Menu,
    X,
    Bell,
    Search,
    User,
    Play,
    Clock,
    CheckCircle,
    ArrowRight,
    FileText,
    Code,
    Video
} from 'lucide-react';

type ViewType = 'courses' | 'lessons' | 'certificates' | 'dashboard';

interface Course {
    id: string;
    title: string;
    description: string;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    lessons: Lesson[];
    image: string;
    instructor: string;
    rating: number;
    students: number;
}

interface Lesson {
    id: string;
    title: string;
    content: string;
    duration: string;
    type: 'text' | 'video' | 'interactive' | 'exercise';
    completed: boolean;
    order: number;
    resources?: string[];
    objectives?: string[];
}

const IntegratedCourseSystem: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('courses');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    // Carregar cursos com dados mock para evitar problemas de build
    useEffect(() => {
        const loadCourses = () => {
            setLoading(true);

            // Dados mock para evitar problemas de build
            const mockCourses: Course[] = [
                {
                    id: 'web-fundamentals',
                    title: 'Fundamentos da Web',
                    description: 'Aprenda HTML, CSS e JavaScript do zero',
                    duration: '40 horas',
                    level: 'beginner',
                    category: 'Desenvolvimento Web',
                    instructor: 'Fênix Academy',
                    rating: 4.8,
                    students: 1250,
                    image: '/api/placeholder/400/250',
                    lessons: [
                        {
                            id: 'lesson-1',
                            title: 'Introdução ao HTML',
                            content: 'Nesta aula você aprenderá os fundamentos do HTML5...',
                            duration: '2 horas',
                            type: 'text',
                            completed: false,
                            order: 0,
                            resources: ['Documentação MDN', 'Tutorial HTML5'],
                            objectives: ['Entender estrutura HTML', 'Criar primeira página']
                        },
                        {
                            id: 'lesson-2',
                            title: 'CSS Básico',
                            content: 'Aprenda a estilizar suas páginas com CSS...',
                            duration: '3 horas',
                            type: 'video',
                            completed: false,
                            order: 1,
                            resources: ['Guia CSS', 'Exemplos práticos'],
                            objectives: ['Aplicar estilos', 'Criar layouts']
                        }
                    ]
                },
                {
                    id: 'react-advanced',
                    title: 'React Avançado',
                    description: 'Domine React com hooks, context e performance',
                    duration: '60 horas',
                    level: 'advanced',
                    category: 'Frontend',
                    instructor: 'Fênix Academy',
                    rating: 4.9,
                    students: 890,
                    image: '/api/placeholder/400/250',
                    lessons: [
                        {
                            id: 'lesson-1',
                            title: 'React Hooks Avançados',
                            content: 'Aprenda useCallback, useMemo e useRef...',
                            duration: '4 horas',
                            type: 'interactive',
                            completed: false,
                            order: 0,
                            resources: ['Documentação React', 'Exemplos de código'],
                            objectives: ['Otimizar performance', 'Gerenciar estado complexo']
                        }
                    ]
                },
                {
                    id: 'python-data-science',
                    title: 'Python para Data Science',
                    description: 'Análise de dados com Python, Pandas e NumPy',
                    duration: '50 horas',
                    level: 'intermediate',
                    category: 'Data Science',
                    instructor: 'Fênix Academy',
                    rating: 4.7,
                    students: 2100,
                    image: '/api/placeholder/400/250',
                    lessons: [
                        {
                            id: 'lesson-1',
                            title: 'Introdução ao Pandas',
                            content: 'Aprenda a manipular dados com Pandas...',
                            duration: '3 horas',
                            type: 'interactive',
                            completed: false,
                            order: 0,
                            resources: ['Documentação Pandas', 'Datasets de exemplo'],
                            objectives: ['Manipular DataFrames', 'Análise exploratória']
                        }
                    ]
                }
            ];

            setCourses(mockCourses);
            setLoading(false);
        };

        loadCourses();
    }, []);

    const handleCourseSelect = (course: Course) => {
        setSelectedCourse(course);
        setCurrentView('lessons');
    };

    const handleLessonSelect = (lesson: Lesson) => {
        setSelectedLesson(lesson);
    };

    const handleLessonComplete = (lessonId: string) => {
        if (selectedCourse) {
            const updatedCourse = {
                ...selectedCourse,
                lessons: selectedCourse.lessons.map(lesson =>
                    lesson.id === lessonId ? { ...lesson, completed: true } : lesson
                )
            };
            setSelectedCourse(updatedCourse);
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-blue-100 text-blue-800';
            case 'advanced': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video className="w-4 h-4" />;
            case 'interactive': return <Code className="w-4 h-4" />;
            case 'exercise': return <Trophy className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const renderSidebar = () => (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:static lg:inset-0`}>
            <div className="flex items-center justify-between h-16 px-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Fênix Academy</h2>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <nav className="mt-4">
                <div className="px-4 space-y-1">
                    <button
                        onClick={() => setCurrentView('courses')}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${currentView === 'courses'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <BookOpen className="w-5 h-5 mr-3" />
                        Cursos
                    </button>
                    <button
                        onClick={() => setCurrentView('lessons')}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${currentView === 'lessons'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Trophy className="w-5 h-5 mr-3" />
                        Aulas
                    </button>
                    <button
                        onClick={() => setCurrentView('certificates')}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${currentView === 'certificates'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Trophy className="w-5 h-5 mr-3" />
                        Certificados
                    </button>
                    <button
                        onClick={() => setCurrentView('dashboard')}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${currentView === 'dashboard'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <BarChart3 className="w-5 h-5 mr-3" />
                        Dashboard
                    </button>
                </div>
            </nav>
        </div>
    );

    const renderCourses = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        onClick={() => handleCourseSelect(course)}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                                    {course.level === 'beginner' ? 'Iniciante' :
                                        course.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                                </span>
                                <div className="flex items-center text-yellow-500">
                                    <span className="text-sm font-medium">{course.rating}</span>
                                    <span className="text-xs ml-1">⭐</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    <span>{course.students.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">{course.lessons.length} aulas</span>
                                <ArrowRight className="w-4 h-4 text-blue-600" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderLessons = () => {
        if (!selectedCourse) {
            return (
                <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Selecione um curso</h3>
                    <p className="text-gray-600">Escolha um curso para ver as aulas disponíveis</p>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{selectedCourse.title}</h2>
                            <p className="text-gray-600">{selectedCourse.description}</p>
                        </div>
                        <button
                            onClick={() => setCurrentView('courses')}
                            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            ← Voltar aos Cursos
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{selectedCourse.lessons.length}</div>
                            <div className="text-sm text-gray-600">Total de Aulas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {selectedCourse.lessons.filter(l => l.completed).length}
                            </div>
                            <div className="text-sm text-gray-600">Concluídas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{selectedCourse.duration}</div>
                            <div className="text-sm text-gray-600">Duração Total</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {selectedCourse.lessons.map((lesson, index) => (
                        <div
                            key={lesson.id}
                            className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-300 ${selectedLesson?.id === lesson.id ? 'ring-2 ring-blue-500' : ''
                                }`}
                            onClick={() => handleLessonSelect(lesson)}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.completed
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {lesson.completed ? (
                                                <CheckCircle className="w-5 h-5" />
                                            ) : (
                                                <span className="text-sm font-medium">{index + 1}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-800">{lesson.title}</h3>
                                            <div className="flex items-center space-x-1">
                                                {getTypeIcon(lesson.type)}
                                                <span className="text-xs text-gray-500 capitalize">{lesson.type}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{lesson.content}</p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                <span>{lesson.duration}</span>
                                            </div>
                                            {lesson.objectives && lesson.objectives.length > 0 && (
                                                <div className="flex items-center">
                                                    <Trophy className="w-4 h-4 mr-1" />
                                                    <span>{lesson.objectives.length} objetivos</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <Play className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderLessonDetail = () => {
        if (!selectedLesson) {
            return (
                <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Selecione uma aula</h3>
                    <p className="text-gray-600">Escolha uma aula para ver o conteúdo detalhado</p>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{selectedLesson.title}</h2>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <div className="flex items-center">
                                    {getTypeIcon(selectedLesson.type)}
                                    <span className="ml-1 capitalize">{selectedLesson.type}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>{selectedLesson.duration}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedLesson(null)}
                            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            ← Voltar às Aulas
                        </button>
                    </div>

                    <div className="prose max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {selectedLesson.content}
                        </div>
                    </div>

                    {selectedLesson.objectives && selectedLesson.objectives.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Objetivos da Aula</h3>
                            <ul className="space-y-2">
                                {selectedLesson.objectives.map((objective, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {selectedLesson.resources && selectedLesson.resources.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recursos Adicionais</h3>
                            <ul className="space-y-2">
                                {selectedLesson.resources.map((resource, index) => (
                                    <li key={index} className="flex items-start">
                                        <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{resource}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t">
                        <button
                            onClick={() => handleLessonComplete(selectedLesson.id)}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${selectedLesson.completed
                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            disabled={selectedLesson.completed}
                        >
                            {selectedLesson.completed ? 'Aula Concluída' : 'Marcar como Concluída'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {renderSidebar()}

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm border-b">
                    <div className="flex items-center justify-between h-16 px-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <h1 className="ml-2 text-xl font-semibold text-gray-800">
                                {currentView === 'courses' && 'Cursos'}
                                {currentView === 'lessons' && 'Aulas'}
                                {currentView === 'certificates' && 'Certificados'}
                                {currentView === 'dashboard' && 'Dashboard'}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Bell className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <User className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {currentView === 'courses' && renderCourses()}
                    {currentView === 'lessons' && !selectedLesson && renderLessons()}
                    {currentView === 'lessons' && selectedLesson && renderLessonDetail()}
                    {currentView === 'certificates' && (
                        <div className="text-center py-12">
                            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-800 mb-2">Certificados</h3>
                            <p className="text-gray-600">Sistema de certificados em desenvolvimento</p>
                        </div>
                    )}
                    {currentView === 'dashboard' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <BookOpen className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Cursos Disponíveis</p>
                                            <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Trophy className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Aulas Concluídas</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {courses.reduce((total, course) =>
                                                    total + course.lessons.filter(l => l.completed).length, 0
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-yellow-100 rounded-lg">
                                            <BarChart3 className="w-6 h-6 text-yellow-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Progresso</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {courses.length > 0 ?
                                                    Math.round((courses.reduce((total, course) =>
                                                        total + course.lessons.filter(l => l.completed).length, 0
                                                    ) / courses.reduce((total, course) =>
                                                        total + course.lessons.length, 0
                                                    )) * 100) : 0}%
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Users className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Total de Aulas</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {courses.reduce((total, course) => total + course.lessons.length, 0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default IntegratedCourseSystem;