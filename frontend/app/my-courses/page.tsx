'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    Play,
    Clock,
    Award,
    Star,
    Users,
    Calendar,
    Download,
    Share,
    Filter,
    Search,
    Grid,
    List,
    ChevronDown,
    ChevronRight,
    CheckCircle,
    Circle,
    Zap,
    Brain,
    Code,
    Globe,
    Shield,
    Trophy,
    Flame,
    Target,
    BarChart3,
    TrendingUp,
    ArrowRight,
    Eye,
    Bookmark,
    MessageCircle,
    Settings,
    Bell,
    User,
    Menu,
    X
} from 'lucide-react';

interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    instructorAvatar: string;
    thumbnail: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    nextLesson: string;
    lastAccessed: string;
    category: string;
    level: string;
    duration: string;
    rating: number;
    students: number;
    price: number;
    originalPrice?: number;
    discount?: number;
    isNew?: boolean;
    isFeatured?: boolean;
    isBookmarked?: boolean;
    modules: Module[];
    certificate?: {
        available: boolean;
        earned: boolean;
        earnedDate?: string;
    }
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
    progress: number;
    isCompleted: boolean;
}

interface Lesson {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'quiz' | 'project' | 'reading';
    isCompleted: boolean;
    isLocked: boolean;
    thumbnail?: string;
}

export default function MyCoursesPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const courses: Course[] = [
        {
            id: '1',
            title: 'Python para Data Science',
            description: 'Aprenda Python do zero e domine as principais bibliotecas para análise de dados e machine learning.',
            instructor: 'Dr. Ana Silva',
            instructorAvatar: '/avatars/ana-silva.jpg',
            thumbnail: '/images/courses/python.jpg',
            progress: 75,
            totalLessons: 120,
            completedLessons: 90,
            nextLesson: 'Machine Learning com Scikit-learn',
            lastAccessed: '2 horas atrás',
            category: 'Data Science',
            level: 'Intermediário',
            duration: '40 horas',
            rating: 4.8,
            students: 15420,
            price: 297,
            originalPrice: 497,
            discount: 40,
            isNew: false,
            isFeatured: true,
            isBookmarked: true,
            certificate: {
                available: true,
                earned: false
            },
            modules: [
                {
                    id: '1',
                    title: 'Fundamentos do Python',
                    progress: 100,
                    isCompleted: true,
                    lessons: [
                        { id: '1', title: 'Introdução ao Python', duration: '15 min', type: 'video', isCompleted: true, isLocked: false },
                        { id: '2', title: 'Variáveis e Tipos de Dados', duration: '20 min', type: 'video', isCompleted: true, isLocked: false },
                        { id: '3', title: 'Estruturas de Controle', duration: '25 min', type: 'video', isCompleted: true, isLocked: false },
                        { id: '4', title: 'Quiz: Fundamentos', duration: '10 min', type: 'quiz', isCompleted: true, isLocked: false }
                    ]
                },
                {
                    id: '2',
                    title: 'Bibliotecas Essenciais',
                    progress: 80,
                    isCompleted: false,
                    lessons: [
                        { id: '5', title: 'NumPy - Arrays e Operações', duration: '30 min', type: 'video', isCompleted: true, isLocked: false },
                        { id: '6', title: 'Pandas - Manipulação de Dados', duration: '35 min', type: 'video', isCompleted: true, isLocked: false },
                        { id: '7', title: 'Matplotlib - Visualização', duration: '25 min', type: 'video', isCompleted: false, isLocked: false },
                        { id: '8', title: 'Projeto: Análise de Dados', duration: '45 min', type: 'project', isCompleted: false, isLocked: false }
                    ]
                },
                {
                    id: '3',
                    title: 'Machine Learning',
                    progress: 0,
                    isCompleted: false,
                    lessons: [
                        { id: '9', title: 'Introdução ao ML', duration: '20 min', type: 'video', isCompleted: false, isLocked: true },
                        { id: '10', title: 'Scikit-learn', duration: '30 min', type: 'video', isCompleted: false, isLocked: true },
                        { id: '11', title: 'Projeto Final', duration: '60 min', type: 'project', isCompleted: false, isLocked: true }
                    ]
                }
            ]
        },
        {
            id: '2',
            title: 'React.js Avançado',
            description: 'Domine React com hooks, context, performance e padrões avançados para criar aplicações escaláveis.',
            instructor: 'Carlos Mendes',
            instructorAvatar: '/avatars/carlos-mendes.jpg',
            thumbnail: '/images/courses/react.jpg',
            progress: 45,
            totalLessons: 95,
            completedLessons: 43,
            nextLesson: 'Hooks Personalizados',
            lastAccessed: '1 dia atrás',
            category: 'Frontend',
            level: 'Avançado',
            duration: '35 horas',
            rating: 4.9,
            students: 12850,
            price: 397,
            originalPrice: 597,
            discount: 33,
            isNew: true,
            isFeatured: false,
            isBookmarked: false,
            certificate: {
                available: true,
                earned: false
            },
            modules: [
                {
                    id: '1',
                    title: 'Hooks Avançados',
                    progress: 60,
                    isCompleted: false,
                    lessons: [
                        { id: '1', title: 'useState e useEffect', duration: '20 min', type: 'video', isCompleted: true, isLocked: false },
                        { id: '2', title: 'useContext e useReducer', duration: '25 min', type: 'video', isCompleted: true, isLocked: false },
                        { id: '3', title: 'Hooks Personalizados', duration: '30 min', type: 'video', isCompleted: false, isLocked: false },
                        { id: '4', title: 'Quiz: Hooks', duration: '15 min', type: 'quiz', isCompleted: false, isLocked: false }
                    ]
                }
            ]
        },
        {
            id: '3',
            title: 'Flutter Mobile Development',
            description: 'Crie aplicativos móveis nativos para iOS e Android com Flutter e Dart.',
            instructor: 'João Oliveira',
            instructorAvatar: '/avatars/joao-oliveira.jpg',
            thumbnail: '/images/courses/flutter.jpg',
            progress: 20,
            totalLessons: 140,
            completedLessons: 28,
            nextLesson: 'Widgets Básicos',
            lastAccessed: '3 dias atrás',
            category: 'Mobile',
            level: 'Iniciante',
            duration: '50 horas',
            rating: 4.7,
            students: 8920,
            price: 197,
            originalPrice: 397,
            discount: 50,
            isNew: false,
            isFeatured: false,
            isBookmarked: true,
            certificate: {
                available: true,
                earned: false
            },
            modules: [
                {
                    id: '1',
                    title: 'Fundamentos do Flutter',
                    progress: 30,
                    isCompleted: false,
                    lessons: [
                        { id: '1', title: 'Introdução ao Flutter', duration: '20 min', type: 'video', isCompleted: true, isLocked: false },
                        { id: '2', title: 'Widgets Básicos', duration: '25 min', type: 'video', isCompleted: false, isLocked: false },
                        { id: '3', title: 'Layout e Navegação', duration: '30 min', type: 'video', isCompleted: false, isLocked: false }
                    ]
                }
            ]
        },
        {
            id: '4',
            title: 'JavaScript Completo',
            description: 'Do básico ao avançado: ES6+, async/await, módulos e muito mais.',
            instructor: 'Maria Santos',
            instructorAvatar: '/avatars/maria-santos.jpg',
            thumbnail: '/images/courses/javascript.jpg',
            progress: 100,
            totalLessons: 80,
            completedLessons: 80,
            nextLesson: 'Curso Concluído',
            lastAccessed: '1 semana atrás',
            category: 'Frontend',
            level: 'Intermediário',
            duration: '30 horas',
            rating: 4.6,
            students: 25600,
            price: 197,
            originalPrice: 297,
            discount: 34,
            isNew: false,
            isFeatured: false,
            isBookmarked: false,
            certificate: {
                available: true,
                earned: true,
                earnedDate: '2024-01-15'
            },
            modules: []
        }
    ];

    const categories = ['Todos', 'Data Science', 'Frontend', 'Mobile', 'Backend', 'DevOps', 'Design'];
    const levels = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];
    const statuses = ['Todos', 'Em Progresso', 'Concluídos', 'Novos', 'Favoritos'];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || selectedCategory === 'Todos' || course.category === selectedCategory;
        const matchesLevel = !selectedLevel || selectedLevel === 'Todos' || course.level === selectedLevel;
        const matchesStatus = !selectedStatus || selectedStatus === 'Todos' ||
            (selectedStatus === 'Em Progresso' && course.progress > 0 && course.progress < 100) ||
            (selectedStatus === 'Concluídos' && course.progress === 100) ||
            (selectedStatus === 'Novos' && course.isNew) ||
            (selectedStatus === 'Favoritos' && course.isBookmarked);

        return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });

    const getLessonIcon = (type: string) => {
        switch (type) {
            case 'video': return <Play className="w-4 h-4" />;
            case 'quiz': return <Target className="w-4 h-4" />;
            case 'project': return <Code className="w-4 h-4" />;
            case 'reading': return <BookOpen className="w-4 h-4" />;
            default: return <Circle className="w-4 h-4" />;
        }
    }

    const getLessonColor = (lesson: Lesson) => {
        if (lesson.isCompleted) return 'text-green-500';
        if (lesson.isLocked) return 'text-gray-500';
        return 'text-blue-500';
    }

    const toggleBookmark = (courseId: string) => {
        // Implementar lógica de favoritar
        console.log('Toggle bookmark:', courseId);
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link href="/" className="flex items-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-2xl font-bold">
                                <span className="text-blue-500">FENIX</span> MEUS CURSOS
                            </span>
                        </Link>
                        <nav className="hidden lg:flex space-x-8">
                            <Link href="/dashboard" className="text-white hover:text-blue-400">Dashboard</Link>
                            <Link href="/courses" className="text-white hover:text-blue-400">Cursos</Link>
                            <Link href="/ide-advanced" className="text-white hover:text-blue-400">IDE</Link>
                            <Link href="/my-courses" className="text-blue-400 font-semibold">Meus Cursos</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-400 hover:text-white">
                                <Bell className="w-5 h-5" />
                            </button>
                            <Link href="/profile" className="text-white hover:text-blue-400">Perfil</Link>
                            <Link href="/settings" className="text-white hover:text-blue-400">Configurações</Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Meus Cursos</h1>
                    <p className="text-gray-400">
                        Continue sua jornada de aprendizado e alcance seus objetivos
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-gray-800 rounded-xl p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar cursos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex gap-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-colors flex items-center"
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filtros
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Courses Grid/List */}
                <div className={`grid gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                    }`}>
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors">
                            {viewMode === 'grid' ? (
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                                <BookOpen className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                                                <p className="text-sm text-gray-400">{course.instructor}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {course.isBookmarked && (
                                                <Bookmark className="w-5 h-5 text-yellow-500 fill-current" />
                                            )}
                                            {course.isNew && (
                                                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Novo</span>
                                            )}
                                            {course.isFeatured && (
                                                <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">Destaque</span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <span className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {course.duration}
                                            </span>
                                            <span className="flex items-center">
                                                <Users className="w-4 h-4 mr-1" />
                                                {course.students.toLocaleString()}
                                            </span>
                                            <span className="flex items-center">
                                                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                                {course.rating}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400">{course.progress}% concluído</div>
                                            <div className="w-20 bg-gray-600 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${course.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-400">
                                            Próxima: {course.nextLesson}
                                        </div>
                                        <Link
                                            href={`/course/${course.id}`}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            Continuar
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                                                    <p className="text-gray-400">{course.instructor}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {course.isBookmarked && (
                                                        <Bookmark className="w-5 h-5 text-yellow-500 fill-current" />
                                                    )}
                                                    {course.isNew && (
                                                        <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Novo</span>
                                                    )}
                                                    {course.isFeatured && (
                                                        <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">Destaque</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-gray-400 mb-4">{course.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-6 text-sm text-gray-400">
                                                    <span className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {course.duration}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Users className="w-4 h-4 mr-1" />
                                                        {course.students.toLocaleString()}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                                        {course.rating}
                                                    </span>
                                                    <span className="text-blue-400">{course.progress}% concluído</span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => toggleBookmark(course.id)}
                                                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                                                    >
                                                        <Bookmark className={`w-5 h-5 ${course.isBookmarked ? 'fill-current text-yellow-500' : ''}`} />
                                                    </button>
                                                    <Link
                                                        href={`/course/${course.id}`}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                                    >
                                                        Continuar
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Nenhum curso encontrado</h3>
                        <p className="text-gray-400 mb-6">
                            Tente ajustar seus filtros ou explore novos cursos
                        </p>
                        <Link
                            href="/courses"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Explorar Cursos
                        </Link>
                    </div>
                )}
            </div>

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