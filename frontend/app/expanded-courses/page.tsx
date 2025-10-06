'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, BookOpen, Star, Clock, Users, Play, Award, Zap, Brain, Code, ChevronRight, ArrowRight, CheckCircle } from 'lucide-react';
import { useExpandedCourses, useExpandedSearch } from '@/hooks/useExpandedContent';
import { ExpandedCourseCard } from '@/components/expanded-content/ExpandedCourseCard';
import { ExpandedCheckoutButton } from '@/components/expanded-content/ExpandedCheckoutButton';
import usePaymentStatus from '@/hooks/usePaymentStatus';
import FenixLogo from '@/components/FenixLogo';
import LoadingSpinner from '@/components/LoadingSpinner';
import DemoModal from '@/components/DemoModal';
// import AdvancedParticles from '@/components/AdvancedParticles'
// import VisualEffects from '@/components/VisualEffects'

export default function ExpandedCoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDemoOpen, setIsDemoOpen] = useState(false);
    const [demoCourse, setDemoCourse] = useState<{ slug: string, title: string } | null>(null);

    const { paymentStatus, redirectToCourse } = usePaymentStatus();

    const { courses, loading, error } = useExpandedCourses();
    const { results, loading: searchLoading, search } = useExpandedSearch();

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            search(query);
        }
    }

    const handleDemoCourse = (courseSlug: string, courseTitle: string) => {
        // Verificar se o usuário tem acesso baseado no status de pagamento
        if (paymentStatus.isPaid) {
            // Usuário pagante - redirecionar para o conteúdo do curso
            redirectToCourse(courseSlug, courseSlug);
        } else {
            // Usuário não pagante - mostrar modal de demonstração
            setDemoCourse({ slug: courseSlug, title: courseTitle });
            setIsDemoOpen(true);
        }
    }

    const filteredCourses = searchQuery.trim() ? results : courses;

    const levels = ['Iniciante', 'Intermediário', 'Avançado'];
    const types = ['Programação', 'Data Science', 'Web Development', 'Mobile', 'DevOps'];

    const stats = {
        total: courses.length,
        featured: courses.filter(c => c.is_featured).length,
        new: courses.filter(c => c.is_new).length,
        students: courses.reduce((sum, c) => sum + (c.students_count || 0), 0)
    }

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <AdvancedParticles />
                <VisualEffects />

                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                        <LoadingSpinner size="lg" />
                        <p className="text-white mt-4 text-lg">Carregando cursos expandidos...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <AdvancedParticles />
                <VisualEffects />

                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto px-4">
                        <div className="bg-red-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <Zap className="w-10 h-10 text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Ops! Algo deu errado</h2>
                        <p className="text-gray-300 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />
            {/* Hero Section */}
            <section className="relative pt-24 pb-16">
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mb-8">
                            <FenixLogo size="xl" variant="full" className="mx-auto" />
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                            Cursos <span className="gradient-text-neon animate-neon">Expandidos</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                            Conteúdo 3x mais detalhado com metodologia CS50 aplicada.
                            Aprenda com casos brasileiros reais e projetos práticos.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            <div className="card group hover:scale-105 transition-all duration-500">
                                <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:animate-glow">{stats.total}</div>
                                <div className="text-sm text-gray-300">Cursos</div>
                            </div>
                            <div className="card group hover:scale-105 transition-all duration-500">
                                <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:animate-glow">{stats.featured}</div>
                                <div className="text-sm text-gray-300">Destaque</div>
                            </div>
                            <div className="card group hover:scale-105 transition-all duration-500">
                                <div className="text-3xl font-bold text-green-400 mb-2 group-hover:animate-glow">{stats.new}</div>
                                <div className="text-sm text-gray-300">Novos</div>
                            </div>
                            <div className="card group hover:scale-105 transition-all duration-500">
                                <div className="text-3xl font-bold text-yellow-400 mb-2 group-hover:animate-glow">{stats.students.toLocaleString()}</div>
                                <div className="text-sm text-gray-300">Alunos</div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar cursos expandidos..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 glass-tech text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => {
                                    if (paymentStatus.isPaid) {
                                        window.location.href = '/courses';
                                    } else {
                                        window.location.href = '/pricing';
                                    }
                                }}
                                className="btn-primary group flex items-center gap-2"
                            >
                                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {paymentStatus.isPaid ? 'Começar Agora' : 'Ver Planos'}
                            </button>
                            <button className="btn-tech group flex items-center gap-2">
                                <Award className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Ver Certificados
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters and View Controls */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/20 flex items-center gap-2 transition-all"
                        >
                            <Filter className="w-4 h-4" />
                            Filtros
                        </button>

                        {isFilterOpen && (
                            <div className="flex flex-wrap gap-4">
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Todos os níveis</option>
                                    {levels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>

                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Todos os tipos</option>
                                    {types.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {/* View Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Courses Grid */}
                {searchLoading ? (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner size="lg" />
                    </div>
                ) : filteredCourses.length > 0 ? (
                    <div className={`grid gap-8 ${viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                        }`}>
                        {filteredCourses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 group"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                                <BookOpen className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm">{course.instructor}</p>
                                            </div>
                                        </div>
                                        {course.is_featured && (
                                            <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                                                DESTAQUE
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-gray-300 mb-6 line-clamp-3">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {course.duration}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {course.students_count?.toLocaleString() || 0} alunos
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            {course.rating}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-white">
                                                R$ {course.price}
                                            </span>
                                            {course.original_price && (
                                                <span className="text-gray-400 line-through">
                                                    R$ {course.original_price}
                                                </span>
                                            )}
                                        </div>
                                        <ExpandedCheckoutButton course={course} />
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {course.tags?.slice(0, 3).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-white/10 text-gray-300 px-2 py-1 rounded-lg text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Nenhum curso encontrado</h3>
                        <p className="text-gray-400 mb-6">
                            {searchQuery ? 'Tente ajustar seus filtros de busca' : 'Não há cursos disponíveis no momento'}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedLevel('');
                                    setSelectedType('');
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Limpar Filtros
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Por que escolher nossos <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Cursos Expandidos</span>?
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                        <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                            <Brain className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Metodologia CS50</h3>
                        <p className="text-gray-300">
                            Aplicamos a metodologia de Harvard para máxima eficácia no aprendizado
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                        <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                            <Code className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Casos Brasileiros</h3>
                        <p className="text-gray-300">
                            Exemplos reais do mercado brasileiro para aplicação prática
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                        <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                            <Award className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Certificação</h3>
                        <p className="text-gray-300">
                            Certificados reconhecidos pelo mercado de trabalho
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Pronto para transformar sua carreira?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Junte-se a milhares de desenvolvedores que já mudaram suas vidas com nossos cursos
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => window.location.href = '/auth/register'}
                            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                            Começar Agora
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleDemoCourse('fundamentos-desenvolvimento-web', 'Fundamentos de Desenvolvimento Web')}
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2"
                        >
                            <Play className="w-5 h-5" />
                            Ver Demonstração
                        </button>
                    </div>
                </div>
            </div>

            {/* Demo Modal */}
            <DemoModal
                isOpen={isDemoOpen}
                onClose={() => {
                    setIsDemoOpen(false);
                    setDemoCourse(null);
                }}
                courseSlug={demoCourse?.slug || ''}
                courseTitle={demoCourse?.title || ''}
            />
        </div>
    );
}