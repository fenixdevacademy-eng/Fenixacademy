'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FenixHeader from '@/components/FenixHeader';
import FenixFooter from '@/components/FenixFooter';
import {
    Rocket,
    Code,
    Brain,
    Target,
    Award,
    Users,
    Clock,
    Star,
    Play,
    BookOpen,
    Zap,
    Shield,
    TrendingUp,
    ArrowRight,
    CheckCircle,
    Filter,
    Search,
    Grid,
    List,
    Heart,
    Bookmark,
    Share2,
    Download,
    Eye,
    Monitor,
    Smartphone,
    Database,
    Server,
    Cloud,
    Globe,
    Lock,
    Unlock,
    ChevronDown,
    ChevronUp,
    Plus,
    Minus,
    RefreshCw,
    ExternalLink,
    Copy,
    Edit,
    Trash2,
    Save,
    Settings,
    Bell,
    MessageCircle,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    DollarSign,
    CreditCard,
    ShoppingCart,
    Gift,
    Trophy,
    Medal,
    Flag,
    Tag,
    Hash,
    AtSign,
    Percent,
    Calculator,
    Wifi,
    Signal,
    Battery,
    Power,
    Volume2,
    VolumeX,
    Mic,
    MicOff,
    Camera,
    CameraOff,
    Video,
    VideoOff,
    Image,
    ImageOff,
    FileText,
    Folder,
    Upload,
    Home,
    Menu,
    X,
    ArrowLeft,
    ArrowUp,
    ArrowDown
} from 'lucide-react';

interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    instructorAvatar: string;
    duration: string;
    students: number;
    rating: number;
    price: number;
    originalPrice: number;
    level: 'Iniciante' | 'Intermediário' | 'Avançado';
    category: string;
    image: string;
    tags: string[];
    features: string[];
    isPopular: boolean;
    isNew: boolean;
    slug: string;
}

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = [
        { id: 'all', name: 'Todos os Cursos', icon: Grid, count: 26 },
        { id: 'frontend', name: 'Frontend', icon: Monitor, count: 8 },
        { id: 'backend', name: 'Backend', icon: Server, count: 6 },
        { id: 'fullstack', name: 'Full Stack', icon: Code, count: 4 },
        { id: 'mobile', name: 'Mobile', icon: Smartphone, count: 3 },
        { id: 'devops', name: 'DevOps', icon: Cloud, count: 2 },
        { id: 'data', name: 'Data Science', icon: Database, count: 1 },
        { id: 'ai', name: 'Inteligência Artificial', icon: Brain, count: 1 },
        { id: 'game', name: 'Desenvolvimento de Jogos', icon: Trophy, count: 1 }
    ];

    // Função para buscar cursos
    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (selectedCategory !== 'all') {
                params.append('category', selectedCategory);
            }
            if (searchTerm) {
                params.append('search', searchTerm);
            }

            const response = await fetch(`/api/courses?${params.toString()}`);
            const result = await response.json();

            if (result.success) {
                setCourses(result.data.courses);
            } else {
                setError(result.error || 'Erro ao carregar cursos');
            }
        } catch (err) {
            setError('Erro ao carregar cursos');
            console.error('Erro ao buscar cursos:', err);
        } finally {
            setLoading(false);
        }
    };

    // Buscar cursos quando a página carregar ou filtros mudarem
    useEffect(() => {
        fetchCourses();
    }, [selectedCategory, searchTerm]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-orange-900">
            <FenixHeader currentPage="/courses" />

            {/* Hero Section */}
            <section className="relative z-10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                Cursos de Programação
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Domine as tecnologias mais demandadas do mercado com nossos cursos práticos e atualizados
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="relative z-10 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="text"
                                        placeholder="Buscar cursos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategory === category.id
                                                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                            }`}
                                    >
                                        <category.icon className="h-4 w-4" />
                                        <span>{category.name}</span>
                                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                                            {category.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* View Mode */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                        }`}
                                >
                                    <Grid className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                        }`}
                                >
                                    <List className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="relative z-10 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {selectedCategory === 'all' ? 'Todos os Cursos' : categories.find(c => c.id === selectedCategory)?.name}
                        </h2>
                        <p className="text-gray-300">
                            Escolha o curso perfeito para acelerar sua carreira
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="col-span-full flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                            <span className="ml-4 text-white">Carregando cursos...</span>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="col-span-full text-center py-20">
                            <div className="text-red-400 text-lg mb-4">❌ {error}</div>
                            <button
                                onClick={fetchCourses}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Tentar Novamente
                            </button>
                        </div>
                    )}

                    {/* Lista de Cursos */}
                    {!loading && !error && (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {courses.map((course, index) => (
                                        <div
                                            key={course.id}
                                            className="group bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-6 hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-red-500/30 hover:border-orange-500/50 relative overflow-hidden"
                                        >
                                            {/* Badges */}
                                            <div className="absolute top-4 right-4 flex flex-col space-y-2">
                                                {course.isPopular && (
                                                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                        🔥 Popular
                                                    </span>
                                                )}
                                                {course.isNew && (
                                                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                        ⚡ Novo
                                                    </span>
                                                )}
                                            </div>

                                            {/* Course Image */}
                                            <div className="text-6xl mb-4 text-center">{course.image}</div>

                                            {/* Course Info */}
                                            <div className="mb-6">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                                    {course.description}
                                                </p>
                                            </div>

                                            {/* Instructor */}
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="text-2xl">{course.instructorAvatar}</div>
                                                <div>
                                                    <div className="text-white font-medium text-sm">{course.instructor}</div>
                                                    <div className="text-gray-400 text-xs">Instrutor</div>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{course.duration}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Users className="h-4 w-4" />
                                                    <span>{course.students.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {course.tags.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className="bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 px-2 py-1 rounded-full text-xs">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <span className="text-2xl font-bold text-white">R$ {course.price}</span>
                                                    {course.originalPrice > course.price && (
                                                        <span className="text-gray-400 line-through ml-2">R$ {course.originalPrice}</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="text-white font-medium">{course.rating}</span>
                                                </div>
                                            </div>

                                            {/* CTA Button */}
                                            <Link
                                                href={`/course/${course.slug}`}
                                                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center block"
                                            >
                                                Começar Agora
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {courses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                                        >
                                            <div className="flex items-center space-x-6">
                                                <div className="text-4xl">{course.image}</div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                                                    <p className="text-gray-300 mb-4">{course.description}</p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                                                            <div className="flex items-center space-x-2">
                                                                <Clock className="h-4 w-4" />
                                                                <span>{course.duration}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <Users className="h-4 w-4" />
                                                                <span>{course.students.toLocaleString()} alunos</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                                <span>{course.rating}</span>
                                                            </div>
                                                        </div>
                                                        <Link
                                                            href={`/course/${course.slug}`}
                                                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                                                        >
                                                            <Play className="inline h-5 w-5 mr-2" />
                                                            Começar Agora
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-16 border border-white/20">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            🎯 Não Encontrou o Curso Ideal?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Nossa equipe de especialistas pode criar um curso personalizado para suas necessidades específicas.
                        </p>

                        <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105">
                            <MessageCircle className="inline h-6 w-6 mr-3" />
                            Falar com Especialista
                        </button>
                    </div>
                </div>
            </section>

            <FenixFooter />
        </div>
    );
}