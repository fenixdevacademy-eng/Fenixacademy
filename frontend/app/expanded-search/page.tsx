'use client';

import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    BookOpen,
    Brain,
    Code,
    Target,
    Clock,
    Star,
    ChevronRight,
    Play,
    CheckCircle,
    Zap,
    Award,
    FileText,
    Video
} from 'lucide-react';
import { useExpandedSearch, useExpandedCourses } from '@/hooks/useExpandedContent';
import Link from 'next/link';

interface SearchResultProps {
    result: any;
    onSelect?: () => void;
}

function SearchResult({ result, onSelect }: SearchResultProps) {
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'module':
                return <BookOpen className="w-5 h-5 text-blue-500" />;
            case 'lesson':
                return <FileText className="w-5 h-5 text-green-500" />;
            default:
                return <Target className="w-5 h-5 text-gray-500" />;
        }
    }

    const getMatchTypeColor = (matchType: string) => {
        switch (matchType) {
            case 'title':
                return 'bg-blue-100 text-blue-800';
            case 'description':
                return 'bg-green-100 text-green-800';
            case 'content':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    const getMatchTypeText = (matchType: string) => {
        switch (matchType) {
            case 'title':
                return 'Título';
            case 'description':
                return 'Descrição';
            case 'content':
                return 'Conteúdo';
            default:
                return 'Geral';
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300">
            <div className="p-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        {getTypeIcon(result.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                    {result.module.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {result.course_name} • {result.module.level?.charAt(0).toUpperCase() + result.module.level?.slice(1)}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchTypeColor(result.match_type)}`}>
                                    {getMatchTypeText(result.match_type)}
                                </span>
                            </div>
                        </div>

                        {result.module.description && (
                            <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                                {result.module.description}
                            </p>
                        )}

                        {result.lesson && (
                            <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="w-4 h-4 text-green-500" />
                                    <span className="font-medium text-sm text-gray-900">Conteúdo da Aula:</span>
                                </div>
                                <p className="text-sm text-gray-700 line-clamp-3">
                                    {result.lesson.description || result.lesson.title}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Target className="w-4 h-4" />
                                    <span>{result.module.objectives?.length || 0} objetivos</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Brain className="w-4 h-4" />
                                    <span>{result.module.exercises?.length || 0} exercícios</span>
                                </div>
                            </div>

                            <Link
                                href={`/expanded-course/${result.course_slug}`}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                                onClick={onSelect}
                            >
                                <span>Ver Curso</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ExpandedSearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [isSearching, setIsSearching] = useState(false);

    const { courses } = useExpandedCourses();
    const { results, loading, error, search } = useExpandedSearch();

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            setIsSearching(true);
            await search(query, selectedCourse, selectedLevel);
            setIsSearching(false);
        }
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            handleSearch(searchQuery);
        }
    }

    const getSearchStats = () => {
        if (!results || results.length === 0) return null;

        const stats = {
            total: results.length,
            modules: results.filter(r => r.type === 'module').length,
            lessons: results.filter(r => r.type === 'lesson').length,
            byMatchType: {
                title: results.filter(r => r.match_type === 'title').length,
                description: results.filter(r => r.match_type === 'description').length,
                content: results.filter(r => r.match_type === 'content').length}
        }
        return stats;
    }

    const stats = getSearchStats();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            🔍 Busca Inteligente
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Encontre exatamente o que você precisa em nosso conteúdo expandido.
                            Busque por cursos, módulos, aulas e exercícios.
                        </p>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearchSubmit} className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar por cursos, módulos, aulas, exercícios..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!searchQuery.trim() || isSearching}
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSearching ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Buscando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" />
                                        <span>Buscar</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Todos os cursos</option>
                                {courses.map(course => (
                                    <option key={course.slug} value={course.slug}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Todos os níveis</option>
                                <option value="iniciante">Iniciante</option>
                                <option value="intermediario">Intermediário</option>
                                <option value="avancado">Avançado</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!searchQuery.trim() ? (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="text-6xl mb-6">🔍</div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            O que você gostaria de aprender?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Digite sua busca acima para encontrar cursos, módulos, aulas e exercícios
                            que correspondam ao que você está procurando.
                        </p>

                        {/* Quick Search Suggestions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            {[
                                { query: 'Python', icon: '🐍', description: 'Data Science e Machine Learning' },
                                { query: 'React', icon: '⚛️', description: 'Desenvolvimento Frontend' },
                                { query: 'Node.js', icon: '🟢', description: 'Desenvolvimento Backend' },
                                { query: 'AWS', icon: '☁️', description: 'Cloud Computing' },
                                { query: 'Docker', icon: '🐳', description: 'DevOps e Containers' },
                                { query: 'Flutter', icon: '📱', description: 'Desenvolvimento Mobile' },
                            ].map((suggestion) => (
                                <button
                                    key={suggestion.query}
                                    onClick={() => handleSearch(suggestion.query)}
                                    className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left group"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl">{suggestion.icon}</span>
                                        <span className="font-semibold text-gray-900 group-hover:text-blue-600">
                                            {suggestion.query}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{suggestion.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : loading || isSearching ? (
                    /* Loading State */
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Buscando conteúdo...</p>
                    </div>
                ) : error ? (
                    /* Error State */
                    <div className="text-center py-12">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro na busca</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => handleSearch(searchQuery)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                ) : results.length === 0 ? (
                    /* No Results State */
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Nenhum resultado encontrado
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Não encontramos resultados para "{searchQuery}". Tente ajustar sua busca.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCourse('');
                                setSelectedLevel('');
                            }}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Nova Busca
                        </button>
                    </div>
                ) : (
                    /* Results State */
                    <>
                        {/* Results Header */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Resultados da Busca
                                    </h2>
                                    <p className="text-gray-600">
                                        {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''} para "{searchQuery}"
                                    </p>
                                </div>
                            </div>

                            {/* Search Stats */}
                            {stats && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                                        <div className="text-sm text-blue-800">Total de Resultados</div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-green-600">{stats.modules}</div>
                                        <div className="text-sm text-green-800">Módulos</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600">{stats.lessons}</div>
                                        <div className="text-sm text-purple-800">Aulas</div>
                                    </div>
                                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-orange-600">{stats.byMatchType.title}</div>
                                        <div className="text-sm text-orange-800">Títulos</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Results Grid */}
                        <div className="space-y-6">
                            {results.map((result, index) => (
                                <SearchResult
                                    key={index}
                                    result={result}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Busca Inteligente e Poderosa
                        </h2>
                        <p className="text-xl text-gray-600">
                            Encontre exatamente o que você precisa em nosso vasto conteúdo
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Busca Semântica
                            </h3>
                            <p className="text-gray-600">
                                Encontre conteúdo por significado, não apenas palavras-chave
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Filter className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Filtros Inteligentes
                            </h3>
                            <p className="text-gray-600">
                                Refine sua busca por curso, nível e tipo de conteúdo
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Resultados Instantâneos
                            </h3>
                            <p className="text-gray-600">
                                Busca rápida e precisa em todo o conteúdo expandido
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



