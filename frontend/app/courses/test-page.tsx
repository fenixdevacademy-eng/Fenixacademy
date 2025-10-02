'use client';

import React, { useState } from 'react';
import { Search, Grid, List, Star, Clock, Users, Play, Eye } from 'lucide-react';
import Link from 'next/link';
import { PageWrapperFunctional } from '@/components/PageWrapperFunctional';
import DemoModal from '@/components/DemoModal';
import { courses } from '@/lib/courses-data';

export default function TestCoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isDemoOpen, setIsDemoOpen] = useState(false);
    const [demoCourse, setDemoCourse] = useState<{ slug: string, title: string } | null>(null);

    const handleDemoCourse = (courseSlug: string, courseTitle: string) => {
        setDemoCourse({ slug: courseSlug, title: courseTitle });
        setIsDemoOpen(true);
    }

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <PageWrapperFunctional>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">F</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">
                                    Fênix Dev Academy
                                </span>
                            </Link>

                            <div className="flex items-center space-x-4">
                                <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium">
                                    Começar Agora
                                </Link>
                                <Link href="/login" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium">
                                    Entrar
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Nossos Cursos
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Aprenda as tecnologias mais demandadas do mercado com projetos práticos
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">26</div>
                                <div className="text-gray-600">Cursos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">17,030</div>
                                <div className="text-gray-600">Alunos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">4.7</div>
                                <div className="text-gray-600">Avaliação</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
                                <div className="text-gray-600">Conclusão</div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar cursos..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {filteredCourses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                {/* Course Image */}
                                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        {course.isFeatured && (
                                            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-current" />
                                                Destaque
                                            </span>
                                        )}
                                        {course.isNew && (
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                Novo
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-white text-6xl font-bold opacity-20">
                                            <Play className="w-16 h-16" />
                                        </div>
                                    </div>
                                </div>

                                {/* Course Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                            {course.category}
                                        </span>
                                        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                            {course.level === 'beginner' ? 'Iniciante' :
                                                course.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {course.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            <span>{course.students.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span>{course.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-gray-900">
                                                R$ {course.price.toFixed(2).replace('.', ',')}
                                            </span>
                                            {course.originalPrice && (
                                                <span className="text-lg text-gray-500 line-through">
                                                    R$ {course.originalPrice.toFixed(2).replace('.', ',')}
                                                </span>
                                            )}
                                        </div>
                                        {course.discount && (
                                            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                                                {course.discount}% OFF
                                            </span>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/course/${course.slug}`}
                                                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium text-center hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Play className="w-4 h-4" />
                                                Ver Curso
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => handleDemoCourse(course.slug, course.title)}
                                            className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Ver Demo Gratuita
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-16 py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            Pronto para transformar sua carreira?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Junte-se a milhares de desenvolvedores que já transformaram suas carreiras
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
                            >
                                Começar Agora
                            </Link>
                            <button
                                onClick={() => handleDemoCourse('fundamentos-programacao', 'Fundamentos de Programação')}
                                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
                            >
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
        </PageWrapperFunctional>
    );
}
