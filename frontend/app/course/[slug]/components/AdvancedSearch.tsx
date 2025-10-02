'use client';

import React, { useState, useRef } from 'react';
import { Search, Filter, X, Clock, Star, BookOpen, Code, Video, FileText, Check } from 'lucide-react';

interface AdvancedSearchProps {
    className?: string;
    onSearch?: (query: string) => void;
    onResultSelect?: (result: SearchResult) => void;
}

interface SearchResult {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'text' | 'exercise' | 'quiz' | 'project';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    rating: number;
    tags: string[];
    url: string;
}

const mockResults: SearchResult[] = [
    {
        id: '1',
        title: 'Introdução ao JavaScript',
        description: 'Aprenda os conceitos fundamentais do JavaScript',
        type: 'video',
        difficulty: 'beginner',
        duration: 30,
        rating: 4.8,
        tags: ['javascript', 'programming', 'basics'],
        url: '/course/javascript/intro'
    },
    {
        id: '2',
        title: 'Manipulação do DOM',
        description: 'Como interagir com elementos da página web',
        type: 'exercise',
        difficulty: 'intermediate',
        duration: 45,
        rating: 4.6,
        tags: ['javascript', 'dom', 'html'],
        url: '/course/javascript/dom'
    }
];

export function AdvancedSearch({
    className = '',
    onSearch,
    onResultSelect
}: AdvancedSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setIsSearching(true);

        // Simulate search
        await new Promise(resolve => setTimeout(resolve, 1000));

        const filteredResults = mockResults.filter(result =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase()) ||
            result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        setResults(filteredResults);
        setIsSearching(false);
        onSearch?.(query);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <Video className="w-4 h-4" />;
            case 'exercise':
                return <Code className="w-4 h-4" />;
            case 'quiz':
                return <BookOpen className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'text-green-600 bg-green-100 dark:bg-green-900/20';
            case 'intermediate':
                return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
            case 'advanced':
                return 'text-red-600 bg-red-100 dark:bg-red-900/20';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Search Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Buscar cursos, lições, exercícios..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => handleSearch()}
                        disabled={isSearching || !query.trim()}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                        {isSearching ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Buscando...
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4" />
                                Buscar
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-2 rounded-lg transition-colors ${showFilters
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        title="Filtros"
                    >
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="p-4">
                {results.length > 0 ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {results.length} resultado(s) encontrado(s)
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {results.map((result) => (
                                <div
                                    key={result.id}
                                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                                    onClick={() => onResultSelect?.(result)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            {getTypeIcon(result.type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {result.title}
                                                </h4>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {result.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                                {result.description}
                                            </p>

                                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{result.duration}min</span>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full ${getDifficultyColor(result.difficulty)}`}>
                                                    {result.difficulty}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-1 mt-3">
                                                {result.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : query && !isSearching ? (
                    <div className="text-center py-12">
                        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Nenhum resultado encontrado
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Tente ajustar sua busca
                        </p>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Busque por conteúdo
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Digite uma palavra-chave para começar
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}





