'use client';

import { useState, useEffect } from 'react';
import {
    BookOpen,
    Play,
    Clock,
    CheckCircle,
    Lock,
    Download,
    Star,
    Users,
    Award,
    Calendar,
    Target,
    TrendingUp,
    ArrowRight,
    Search,
    Filter,
    SortAsc,
    Grid,
    List,
    Crown
} from 'lucide-react';
import Link from 'next/link';
import { getCourseList, getCourseContent } from '@/lib/courseContent';

interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    image: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    duration: string;
    lastAccessed: string;
    certificate: boolean;
    status: 'active' | 'completed' | 'in_progress';
    modules: number;
    slug: string;
}

export default function MyCoursesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'in_progress'>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'name'>('recent');
    const [myCourses, setMyCourses] = useState<Course[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserAndCourses();
    }, []);

    const loadUserAndCourses = () => {
        // Verificar se é o CEO logado
        const savedUser = localStorage.getItem('fenix_user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
        }

        // Carregar cursos reais
        const courseList = getCourseList();
        const realCourses: Course[] = courseList.map((course, index) => {
            const courseContent = getCourseContent(course.slug);
            const totalLessons = courseContent?.modules.reduce((total, module) => total + module.lessons.length, 0) || 0;
            const totalModules = courseContent?.modules.length || 0;

            // Categorias e instrutores
            const courseInfo = getCourseInfo(course.slug);

            return {
                id: index + 1,
                title: course.title,
                description: courseInfo.description,
                instructor: courseInfo.instructor,
                image: `/courses/${course.slug}.jpg`,
                progress: 0,
                totalLessons: totalLessons,
                completedLessons: 0,
                duration: `${Math.floor(totalLessons * 1.5)} horas`,
                lastAccessed: 'Hoje',
                certificate: true,
                status: 'active' as const,
                modules: totalModules,
                slug: course.slug
            };
        });

        setMyCourses(realCourses);
        setLoading(false);
    };

    const getCourseInfo = (courseId: string) => {
        const courseInfoMap: { [key: string]: { description: string; instructor: string } } = {
            'fundamentos-desenvolvimento-web': {
                description: 'Domine HTML, CSS e JavaScript com projetos reais da indústria',
                instructor: 'Prof. Carlos Silva'
            },
            'react-avancado': {
                description: 'Hooks avançados, Context API e padrões de desenvolvimento',
                instructor: 'Prof. Ana Costa'
            },
            'python-data-science': {
                description: 'Python para Data Science com Pandas, Matplotlib e NumPy',
                instructor: 'Prof. Roberto Santos'
            },
            'nodejs-backend': {
                description: 'Desenvolva APIs robustas com Node.js e Express',
                instructor: 'Prof. Mariana Lima'
            },
            'machine-learning': {
                description: 'Introdução aos conceitos de Machine Learning com Python',
                instructor: 'Prof. Dr. Fernando Alves'
            },
            'mobile-development': {
                description: 'Desenvolva apps mobile multiplataforma com React Native',
                instructor: 'Prof. Lucas Mendes'
            },
            'cybersecurity': {
                description: 'Proteja sistemas e redes contra ataques cibernéticos',
                instructor: 'Prof. Rafael Costa'
            },
            'blockchain': {
                description: 'Entenda a tecnologia por trás das criptomoedas e Web3',
                instructor: 'Prof. Isabella Santos'
            }
        };

        return courseInfoMap[courseId] || {
            description: 'Curso de desenvolvimento com foco em projetos práticos',
            instructor: 'Equipe Fenix Academy'
        };
    };

    const isCEO = user?.role === 'CEO' && user?.email === 'fenixdevacademy@gmail.com';

    const filteredCourses = myCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const sortedCourses = [...filteredCourses].sort((a, b) => {
        switch (sortBy) {
            case 'progress':
                return b.progress - a.progress;
            case 'name':
                return a.title.localeCompare(b.title);
            case 'recent':
            default:
                return 0;
        }
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* CEO Navigation Bar */}
            {isCEO && (
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 border-b border-purple-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-12">
                            <div className="flex items-center space-x-4">
                                <span className="text-white text-sm font-medium flex items-center">
                                    <Crown className="w-4 h-4 mr-2" />
                                    Área do CEO - Acesso Total
                                </span>
                                <div className="flex space-x-4">
                                    <Link
                                        href="/ceo-dashboard"
                                        className="text-white hover:text-purple-200 text-sm transition duration-300"
                                    >
                                        Dashboard Executivo
                                    </Link>
                                    <Link
                                        href="/gestao-trafego"
                                        className="text-white hover:text-purple-200 text-sm transition duration-300"
                                    >
                                        Gestão de Tráfego
                                    </Link>
                                </div>
                            </div>
                            <div className="text-white text-xs">
                                Todos os cursos liberados • {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                {isCEO && <Crown className="w-8 h-8 mr-3 text-yellow-500" />}
                                Meus Cursos
                                {isCEO && <span className="ml-2 text-purple-600">CEO</span>}
                            </h1>
                            <p className="text-gray-600">
                                {isCEO
                                    ? `${myCourses.length} cursos com acesso total liberado`
                                    : `Você tem ${myCourses.length} cursos disponíveis`
                                }
                            </p>
                        </div>

                        {isCEO && (
                            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg border border-purple-200">
                                <div className="flex items-center text-purple-800">
                                    <Crown className="w-5 h-5 mr-2" />
                                    <span className="text-sm font-semibold">Status CEO: Acesso Total</span>
                                </div>
                                <p className="text-xs text-purple-600 mt-1">
                                    Todos os {myCourses.length} cursos, {myCourses.reduce((total, course) => total + course.modules, 0)} módulos e {myCourses.reduce((total, course) => total + course.totalLessons, 0)} aulas liberadas
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar cursos..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                        >
                            <option value="all">Todos os cursos</option>
                            <option value="active">Ativos</option>
                            <option value="in_progress">Em andamento</option>
                            <option value="completed">Concluídos</option>
                        </select>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                        >
                            <option value="recent">Mais recentes</option>
                            <option value="progress">Progresso</option>
                            <option value="name">Nome</option>
                        </select>

                        <div className="flex border border-gray-300 rounded-lg">
                            <button
                                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                                onClick={() => setViewMode('list')}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {sortedCourses.map((course) => (
                        <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                            {/* Course Image */}
                            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BookOpen className="w-16 h-16 text-white opacity-80" />
                                </div>
                                {isCEO && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                                            <Crown className="w-3 h-3 mr-1" />
                                            CEO
                                        </span>
                                    </div>
                                )}
                                <div className="absolute bottom-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${course.status === 'completed'
                                        ? 'bg-green-500 text-white'
                                        : course.status === 'in_progress'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-500 text-white'
                                        }`}>
                                        {course.status === 'completed' ? 'Concluído' :
                                            course.status === 'in_progress' ? 'Em Andamento' : 'Ativo'}
                                    </span>
                                </div>
                            </div>

                            {/* Course Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                                        {course.title}
                                    </h3>
                                    {course.certificate && (
                                        <Award className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                                    )}
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <Users className="w-4 h-4 mr-1" />
                                    <span>Instrutor: {course.instructor}</span>
                                </div>

                                {/* Course Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">{course.modules}</div>
                                        <div className="text-xs text-gray-600">Módulos</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">{course.totalLessons}</div>
                                        <div className="text-xs text-gray-600">Aulas</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">{course.duration}</div>
                                        <div className="text-xs text-gray-600">Duração</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                {!isCEO && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Progresso</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {course.completedLessons} de {course.totalLessons} aulas concluídas
                                        </div>
                                    </div>
                                )}

                                {/* CTA Button */}
                                <Link
                                    href={`/course/${course.slug}`}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
                                >
                                    {isCEO ? (
                                        <>
                                            <Crown className="w-5 h-5 mr-2" />
                                            Acessar (CEO)
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-5 h-5 mr-2" />
                                            Continuar
                                        </>
                                    )}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>

                                {/* Last Accessed */}
                                <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                                    <span>Último acesso: {course.lastAccessed}</span>
                                    {isCEO && (
                                        <span className="text-purple-600 font-semibold">Acesso Total</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {sortedCourses.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum curso encontrado</h3>
                        <p className="text-gray-600">Tente ajustar os filtros de busca</p>
                    </div>
                )}
            </div>
        </div>
    );
}