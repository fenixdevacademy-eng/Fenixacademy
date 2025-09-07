'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, BookOpen, Users, Star, Filter, TrendingUp } from 'lucide-react';
import { CourseContent } from '../app/course/[slug]/types/course-types';
import { getAllCourses } from '../app/course/[slug]/courses';

interface SearchResult {
    type: 'course' | 'module' | 'lesson';
    id: string;
    title: string;
    description: string;
    category?: string;
    level?: string;
    price?: number;
    duration_hours?: number;
    total_lessons?: number;
    total_modules?: number;
    thumbnail?: string;
    relevance: number;
}

interface SearchAutocompleteProps {
    onCourseSelect?: (course: CourseContent) => void;
    onModuleSelect?: (courseId: string, moduleId: number) => void;
    onLessonSelect?: (courseId: string, moduleId: number, lessonId: number) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchAutocomplete({
    onCourseSelect,
    onModuleSelect,
    onLessonSelect,
    placeholder = "Buscar cursos, módulos, lições...",
    className = ""
}: SearchAutocompleteProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [filters, setFilters] = useState({
        category: '',
        level: '',
        priceRange: '',
        duration: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const courses = getAllCourses();

    // Calcula relevância usando algoritmo de scoring
    const calculateRelevance = (query: string, title: string, description: string, tags?: string[]): number => {
        let score = 0;
        const titleLower = title.toLowerCase();
        const descLower = description.toLowerCase();

        // Match exato no título (maior peso)
        if (titleLower.includes(query)) {
            score += 100;
            if (titleLower.startsWith(query)) score += 50;
        }

        // Match no título (peso médio)
        const titleWords = titleLower.split(' ');
        const queryWords = query.split(' ');
        titleWords.forEach(word => {
            queryWords.forEach(queryWord => {
                if (word.includes(queryWord)) score += 30;
                if (word === queryWord) score += 40;
            });
        });

        // Match na descrição (peso menor)
        if (descLower.includes(query)) score += 20;

        // Match nas tags (peso médio)
        if (tags) {
            tags.forEach(tag => {
                if (tag.toLowerCase().includes(query)) score += 25;
            });
        }

        return score;
    };

    // Efeito para buscar quando query muda
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setSelectedIndex(-1);
            return;
        }

        const searchQuery = query.toLowerCase();
        const results: SearchResult[] = [];

        courses.forEach(course => {
            // Busca no curso
            const courseMatch = calculateRelevance(searchQuery, course.title, course.description, course.tags);
            if (courseMatch > 0) {
                results.push({
                    type: 'course',
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    category: course.category,
                    level: course.level,
                    price: course.price,
                    duration_hours: course.duration_hours,
                    total_lessons: course.total_lessons,
                    total_modules: course.total_modules,
                    thumbnail: course.thumbnail,
                    relevance: courseMatch
                });
            }

            // Busca nos módulos
            course.modules.forEach(module => {
                const moduleMatch = calculateRelevance(searchQuery, module.title, module.description);
                if (moduleMatch > 0) {
                    results.push({
                        type: 'module',
                        id: `${course.id}-${module.id}`,
                        title: module.title,
                        description: module.description,
                        category: course.category,
                        level: course.level,
                        duration_hours: module.duration_hours,
                        relevance: moduleMatch * 0.8 // Módulos têm relevância menor que cursos
                    });
                }

                // Busca nas lições
                module.lessons.forEach(lesson => {
                    const lessonMatch = calculateRelevance(searchQuery, lesson.title, lesson.content);
                    if (lessonMatch > 0) {
                        results.push({
                            type: 'lesson',
                            id: `${course.id}-${module.id}-${lesson.id}`,
                            title: lesson.title,
                            description: lesson.content.substring(0, 100) + '...',
                            category: course.category,
                            level: course.level,
                            relevance: lessonMatch * 0.6 // Lições têm relevância menor
                        });
                    }
                });
            });
        });

        // Aplica filtros
        let filteredResults = results;

        if (filters.category) {
            filteredResults = filteredResults.filter(r => r.category === filters.category);
        }

        if (filters.level) {
            filteredResults = filteredResults.filter(r => r.level === filters.level);
        }

        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filteredResults = filteredResults.filter(r => {
                if (!r.price) return true;
                if (max) return r.price >= min && r.price <= max;
                return r.price >= min;
            });
        }

        if (filters.duration) {
            const [min, max] = filters.duration.split('-').map(Number);
            filteredResults = filteredResults.filter(r => {
                if (!r.duration_hours) return true;
                if (max) return r.duration_hours >= min && r.duration_hours <= max;
                return r.duration_hours >= min;
            });
        }

        // Ordena por relevância e retorna top 20
        const finalResults = filteredResults
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, 20);

        setResults(finalResults);
        setSelectedIndex(-1);
    }, [query, filters, courses]);

    // Efeito para fechar resultados quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
                resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Navegação com teclado
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || results.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleResultSelect(results[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSelectedIndex(-1);
                break;
        }
    };

    // Seleção de resultado
    const handleResultSelect = (result: SearchResult) => {
        if (result.type === 'course') {
            const course = courses.find(c => c.id === result.id);
            if (course && onCourseSelect) {
                onCourseSelect(course);
            }
        } else if (result.type === 'module') {
            const [courseId, moduleId] = result.id.split('-');
            if (onModuleSelect) {
                onModuleSelect(courseId, parseInt(moduleId));
            }
        } else if (result.type === 'lesson') {
            const [courseId, moduleId, lessonId] = result.id.split('-');
            if (onLessonSelect) {
                onLessonSelect(courseId, parseInt(moduleId), parseInt(lessonId));
            }
        }

        setIsOpen(false);
        setQuery('');
        setSelectedIndex(-1);
    };

    // Filtros disponíveis
    const categories = Array.from(new Set(courses.map(c => c.category)));
    const levels = Array.from(new Set(courses.map(c => c.level)));
    const priceRanges = ['0-100', '100-200', '200-300', '300+'];
    const durationRanges = ['0-50', '50-100', '100-150', '150+'];

    return (
        <div className={`relative ${className}`}>
            {/* Campo de busca */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />

                {/* Botão de filtros */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors ${showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    <Filter className="h-5 w-5" />
                </button>

                {/* Botão de limpar */}
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Filtros */}
            {showFilters && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Categoria */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Todas</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Nível */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nível</label>
                            <select
                                value={filters.level}
                                onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Todos</option>
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>

                        {/* Faixa de Preço */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preço</label>
                            <select
                                value={filters.priceRange}
                                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Qualquer</option>
                                {priceRanges.map(range => (
                                    <option key={range} value={range}>R$ {range}</option>
                                ))}
                            </select>
                        </div>

                        {/* Duração */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duração</label>
                            <select
                                value={filters.duration}
                                onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Qualquer</option>
                                {durationRanges.map(range => (
                                    <option key={range} value={range}>{range}h</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Resultados da busca */}
            {isOpen && results.length > 0 && (
                <div
                    ref={resultsRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
                >
                    {results.map((result, index) => (
                        <div
                            key={result.id}
                            onClick={() => handleResultSelect(result)}
                            className={`p-4 cursor-pointer transition-colors ${index === selectedIndex
                                ? 'bg-blue-50 border-l-4 border-l-blue-500'
                                : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                                }`}
                        >
                            <div className="flex items-start space-x-3">
                                {/* Ícone baseado no tipo */}
                                <div className="flex-shrink-0 mt-1">
                                    {result.type === 'course' && <BookOpen className="h-5 w-5 text-blue-600" />}
                                    {result.type === 'module' && <Users className="h-5 w-5 text-green-600" />}
                                    {result.type === 'lesson' && <Clock className="h-5 w-5 text-purple-600" />}
                                </div>

                                {/* Conteúdo */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {result.title}
                                        </h4>
                                        {result.type === 'course' && result.price && (
                                            <span className="text-xs font-medium text-blue-600">
                                                R$ {result.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                        {result.description}
                                    </p>

                                    {/* Metadados */}
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        {result.category && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100">
                                                {result.category}
                                            </span>
                                        )}
                                        {result.level && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                                {result.level}
                                            </span>
                                        )}
                                        {result.duration_hours && (
                                            <span className="flex items-center space-x-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{result.duration_hours}h</span>
                                            </span>
                                        )}
                                        {result.total_lessons && (
                                            <span className="flex items-center space-x-1">
                                                <Users className="h-3 w-3" />
                                                <span>{result.total_lessons} lições</span>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Indicador de relevância */}
                                <div className="flex-shrink-0">
                                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                                        <TrendingUp className="h-3 w-3" />
                                        <span>{Math.round(result.relevance)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Estado vazio */}
            {isOpen && query && results.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-8 text-center z-50">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhum resultado encontrado
                    </h3>
                    <p className="text-gray-500">
                        Tente ajustar os filtros ou usar termos diferentes
                    </p>
                </div>
            )}
        </div>
    );
}
