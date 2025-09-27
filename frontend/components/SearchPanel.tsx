'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Search,
    Filter,
    X,
    ChevronDown,
    ChevronUp,
    Clock,
    Star,
    Tag,
    User,
    Calendar,
    SortAsc,
    SortDesc,
    Grid,
    List,
    Eye,
    EyeOff,
    Download,
    Upload,
    Share2,
    Bookmark,
    Heart,
    MessageCircle,
    ThumbsUp,
    ThumbsDown,
    MoreVertical,
    Edit,
    Trash2,
    Copy,
    ExternalLink,
    ArrowRight,
    ArrowLeft,
    RefreshCw,
    Settings,
    Play,
    Pause,
    Square,
    RotateCcw,
    Target,
    Zap,
    Brain,
    Database,
    Cloud,
    Shield,
    Lock,
    Unlock,
    Power,
    PowerOff,
    BookOpen,
    Code,
    Users,
    FileText
} from 'lucide-react';

interface SearchPanelProps {
    className?: string;
    onSearch?: (query: string, filters: SearchFilters) => void;
    onResultClick?: (result: SearchResult) => void;
    onSettingsChange?: (settings: SearchSettings) => void;
    onExport?: (data: SearchData) => void;
}

interface SearchResult {
    id: string;
    type: 'course' | 'lesson' | 'project' | 'resource' | 'tool' | 'community' | 'user' | 'content';
    title: string;
    description: string;
    url: string;
    thumbnail?: string;
    author: string;
    rating: number;
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // in minutes
    createdAt: string;
    updatedAt: string;
    metadata: {
        views: number;
        likes: number;
        shares: number;
        comments: number;
        bookmarks: number;
        completionRate: number;
        relevanceScore: number;
        popularityScore: number;
    };
}

interface SearchFilters {
    type: string[];
    difficulty: string[];
    duration: {
        min: number;
        max: number;
    };
    rating: {
        min: number;
        max: number;
    };
    tags: string[];
    author: string[];
    dateRange: {
        start: string;
        end: string;
    };
    sortBy: 'relevance' | 'rating' | 'popularity' | 'recent' | 'duration';
    sortOrder: 'asc' | 'desc';
}

interface SearchSettings {
    enabled: boolean;
    maxResults: number;
    enableAutoComplete: boolean;
    enableSuggestions: boolean;
    enableFilters: boolean;
    enableSorting: boolean;
    enableBookmarks: boolean;
    enableHistory: boolean;
    enableNotifications: boolean;
    enableSound: boolean;
    enableDesktopNotifications: boolean;
    enableLogging: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    searchAlgorithm: 'fuzzy' | 'exact' | 'semantic' | 'hybrid';
    weightFactors: {
        title: number;
        description: number;
        tags: number;
        content: number;
        popularity: number;
        recency: number;
    };
}

interface SearchData {
    query: string;
    results: SearchResult[];
    filters: SearchFilters;
    settings: SearchSettings;
    analytics: {
        totalResults: number;
        searchTime: number;
        clickThroughRate: number;
        conversionRate: number;
        averageRating: number;
        userSatisfaction: number;
    };
}

const defaultFilters: SearchFilters = {
    type: [],
    difficulty: [],
    duration: { min: 0, max: 300 },
    rating: { min: 0, max: 5 },
    tags: [],
    author: [],
    dateRange: { start: '', end: '' },
    sortBy: 'relevance',
    sortOrder: 'desc'
};

const defaultSettings: SearchSettings = {
    enabled: true,
    maxResults: 50,
    enableAutoComplete: true,
    enableSuggestions: true,
    enableFilters: true,
    enableSorting: true,
    enableBookmarks: true,
    enableHistory: true,
    enableNotifications: true,
    enableSound: true,
    enableDesktopNotifications: false,
    enableLogging: true,
    logLevel: 'info',
    searchAlgorithm: 'hybrid',
    weightFactors: {
        title: 0.4,
        description: 0.3,
        tags: 0.2,
        content: 0.1,
        popularity: 0.1,
        recency: 0.1
    }
};

const mockSearchResults: SearchResult[] = [
    {
        id: '1',
        type: 'course',
        title: 'Advanced React Patterns',
        description: 'Learn advanced React patterns and best practices for building scalable applications',
        url: '/courses/advanced-react-patterns',
        thumbnail: '/images/courses/react-patterns.jpg',
        author: 'John Doe',
        rating: 4.8,
        tags: ['react', 'javascript', 'frontend', 'patterns'],
        difficulty: 'advanced',
        duration: 180,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z',
        metadata: {
            views: 1250,
            likes: 89,
            shares: 23,
            comments: 45,
            bookmarks: 67,
            completionRate: 78.5,
            relevanceScore: 9.2,
            popularityScore: 8.7
        }
    },
    {
        id: '2',
        type: 'lesson',
        title: 'TypeScript Fundamentals',
        description: 'Master TypeScript from basics to advanced concepts',
        url: '/lessons/typescript-fundamentals',
        thumbnail: '/images/lessons/typescript-fundamentals.jpg',
        author: 'Jane Smith',
        rating: 4.6,
        tags: ['typescript', 'javascript', 'programming', 'fundamentals'],
        difficulty: 'intermediate',
        duration: 120,
        createdAt: '2024-01-10T14:00:00Z',
        updatedAt: '2024-01-19T09:15:00Z',
        metadata: {
            views: 2100,
            likes: 156,
            shares: 34,
            comments: 67,
            bookmarks: 89,
            completionRate: 82.3,
            relevanceScore: 8.8,
            popularityScore: 9.1
        }
    },
    {
        id: '3',
        type: 'project',
        title: 'E-commerce Dashboard',
        description: 'Build a complete e-commerce dashboard with React and Node.js',
        url: '/projects/ecommerce-dashboard',
        thumbnail: '/images/projects/ecommerce-dashboard.jpg',
        author: 'Mike Johnson',
        rating: 4.9,
        tags: ['react', 'nodejs', 'ecommerce', 'dashboard', 'fullstack'],
        difficulty: 'advanced',
        duration: 300,
        createdAt: '2024-01-05T08:00:00Z',
        updatedAt: '2024-01-18T16:45:00Z',
        metadata: {
            views: 3200,
            likes: 234,
            shares: 56,
            comments: 89,
            bookmarks: 123,
            completionRate: 91.2,
            relevanceScore: 9.5,
            popularityScore: 9.3
        }
    }
];

const difficultyColors = {
    beginner: 'text-green-600 bg-green-100 dark:bg-green-900/20',
    intermediate: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
    advanced: 'text-red-600 bg-red-100 dark:bg-red-900/20'
};

const typeIcons = {
    course: BookOpen,
    lesson: Code,
    project: Target,
    resource: Database,
    tool: Zap,
    community: Users,
    user: User,
    content: FileText
};

export function SearchPanel({
    className = '',
    onSearch,
    onResultClick,
    onSettingsChange,
    onExport
}: SearchPanelProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>(mockSearchResults);
    const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
    const [settings, setSettings] = useState<SearchSettings>(defaultSettings);
    const [isSearching, setIsSearching] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    const searchInputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchQuery.length > 2 && settings.enableAutoComplete) {
            generateSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [searchQuery, settings.enableAutoComplete]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const generateSuggestions = () => {
        // Simulate suggestions based on search query
        const mockSuggestions = [
            'React patterns',
            'TypeScript fundamentals',
            'Node.js backend',
            'JavaScript ES6',
            'CSS Grid',
            'Vue.js components',
            'Python Django',
            'MongoDB database',
            'Docker containers',
            'AWS cloud'
        ].filter(suggestion =>
            suggestion.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSuggestions(mockSuggestions.slice(0, 5));
    };

    const handleSearch = async (query: string = searchQuery) => {
        if (!query.trim()) return;

        setIsSearching(true);
        setShowSuggestions(false);

        // Add to search history
        if (settings.enableHistory) {
            setSearchHistory(prev => [query, ...prev.filter(h => h !== query).slice(0, 9)]);
        }

        try {
            // Simulate search API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Filter results based on query and filters
            const filteredResults = mockSearchResults.filter(result => {
                const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase()) ||
                    result.description.toLowerCase().includes(query.toLowerCase()) ||
                    result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

                const matchesType = filters.type.length === 0 || filters.type.includes(result.type);
                const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(result.difficulty);
                const matchesDuration = result.duration >= filters.duration.min && result.duration <= filters.duration.max;
                const matchesRating = result.rating >= filters.rating.min && result.rating <= filters.rating.max;
                const matchesTags = filters.tags.length === 0 || filters.tags.some(tag => result.tags.includes(tag));
                const matchesAuthor = filters.author.length === 0 || filters.author.includes(result.author);

                return matchesQuery && matchesType && matchesDifficulty && matchesDuration &&
                    matchesRating && matchesTags && matchesAuthor;
            });

            // Sort results
            const sortedResults = [...filteredResults].sort((a, b) => {
                let comparison = 0;

                switch (filters.sortBy) {
                    case 'rating':
                        comparison = b.rating - a.rating;
                        break;
                    case 'popularity':
                        comparison = b.metadata.popularityScore - a.metadata.popularityScore;
                        break;
                    case 'recent':
                        comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                        break;
                    case 'duration':
                        comparison = b.duration - a.duration;
                        break;
                    default: // relevance
                        comparison = b.metadata.relevanceScore - a.metadata.relevanceScore;
                }

                return filters.sortOrder === 'asc' ? -comparison : comparison;
            });

            setSearchResults(sortedResults.slice(0, settings.maxResults));
            onSearch?.(query, filters);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleResultClick = (result: SearchResult) => {
        setSelectedResult(result);
        onResultClick?.(result);
    };

    const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
    };

    const handleSettingsChange = (newSettings: Partial<SearchSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        onSettingsChange?.(updatedSettings);
    };

    const handleClearFilters = () => {
        setFilters(defaultFilters);
    };

    const handleClearHistory = () => {
        setSearchHistory([]);
    };

    const handleExport = () => {
        const data: SearchData = {
            query: searchQuery,
            results: searchResults,
            filters,
            settings,
            analytics: {
                totalResults: searchResults.length,
                searchTime: 1000,
                clickThroughRate: 0.15,
                conversionRate: 0.08,
                averageRating: searchResults.reduce((sum, result) => sum + result.rating, 0) / searchResults.length,
                userSatisfaction: 0.85
            }
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `search-results-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        onExport?.(data);
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const renderSearchResult = (result: SearchResult) => {
        const TypeIcon = typeIcons[result.type];
        return (
            <div
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
                <div className="flex items-start gap-3 mb-3">
                    <TypeIcon className="w-6 h-6 text-blue-500 mt-1" />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                {result.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[result.difficulty]}`}>
                                {result.difficulty}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                            {result.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {result.rating.toFixed(1)}
                            </span>
                            <span>{formatDuration(result.duration)}</span>
                            <span>{result.author}</span>
                            <span>{formatTime(result.createdAt)}</span>
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle bookmark
                        }}
                        className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                        title="Add bookmark"
                    >
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {result.tags.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {result.metadata.views}
                        </span>
                        <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {result.metadata.likes}
                        </span>
                        <span className="flex items-center gap-1">
                            <Share2 className="w-3 h-3" />
                            {result.metadata.shares}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Search className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Painel de Busca
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Filtros"
                        >
                            <Filter className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Configurações"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleExport}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Exportar"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Buscar cursos, lições, projetos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSearchResults([]);
                            }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                    <div
                        ref={suggestionsRef}
                        className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg"
                    >
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setSearchQuery(suggestion);
                                    handleSearch(suggestion);
                                }}
                                className="w-full px-4 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}

                {/* Search History */}
                {showSuggestions && searchHistory.length > 0 && (
                    <div
                        ref={suggestionsRef}
                        className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg"
                    >
                        <div className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                            Histórico de Busca
                        </div>
                        {searchHistory.map((historyItem, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setSearchQuery(historyItem);
                                    handleSearch(historyItem);
                                }}
                                className="w-full px-4 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                                {historyItem}
                            </button>
                        ))}
                        <button
                            onClick={handleClearHistory}
                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            Limpar Histórico
                        </button>
                    </div>
                )}
            </div>

            <div className="flex h-96">
                {/* Main Content */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {/* Search Results */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                Resultados ({searchResults.length})
                            </h4>
                            <div className="flex items-center gap-2">
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="relevance">Relevância</option>
                                    <option value="rating">Avaliação</option>
                                    <option value="popularity">Popularidade</option>
                                    <option value="recent">Recente</option>
                                    <option value="duration">Duração</option>
                                </select>
                                <button
                                    onClick={() => handleFilterChange({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
                                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    title="Ordem"
                                >
                                    {filters.sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    title="Visualização"
                                >
                                    {viewMode === 'grid' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {isSearching ? (
                            <div className="flex items-center justify-center py-8">
                                <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
                                <span className="ml-2 text-gray-600 dark:text-gray-400">Buscando...</span>
                            </div>
                        ) : searchResults.length > 0 ? (
                            <div className={`grid gap-4 ${viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    : 'grid-cols-1'
                                }`}>
                                {searchResults.map(renderSearchResult)}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 dark:text-gray-400">
                                    {searchQuery ? 'Nenhum resultado encontrado' : 'Digite algo para buscar'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Filtros
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tipo
                                </label>
                                <div className="space-y-2">
                                    {['course', 'lesson', 'project', 'resource', 'tool', 'community'].map(type => (
                                        <label key={type} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={filters.type.includes(type)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        handleFilterChange({ type: [...filters.type, type] });
                                                    } else {
                                                        handleFilterChange({ type: filters.type.filter(t => t !== type) });
                                                    }
                                                }}
                                                className="rounded"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Dificuldade
                                </label>
                                <div className="space-y-2">
                                    {['beginner', 'intermediate', 'advanced'].map(difficulty => (
                                        <label key={difficulty} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={filters.difficulty.includes(difficulty)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        handleFilterChange({ difficulty: [...filters.difficulty, difficulty] });
                                                    } else {
                                                        handleFilterChange({ difficulty: filters.difficulty.filter(d => d !== difficulty) });
                                                    }
                                                }}
                                                className="rounded"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{difficulty}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Duração: {filters.duration.min} - {filters.duration.max} min
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="300"
                                        value={filters.duration.min}
                                        onChange={(e) => handleFilterChange({ duration: { ...filters.duration, min: parseInt(e.target.value) } })}
                                        className="w-full"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="300"
                                        value={filters.duration.max}
                                        onChange={(e) => handleFilterChange({ duration: { ...filters.duration, max: parseInt(e.target.value) } })}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Avaliação: {filters.rating.min} - {filters.rating.max} ⭐
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={filters.rating.min}
                                        onChange={(e) => handleFilterChange({ rating: { ...filters.rating, min: parseFloat(e.target.value) } })}
                                        className="w-full"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={filters.rating.max}
                                        onChange={(e) => handleFilterChange({ rating: { ...filters.rating, max: parseFloat(e.target.value) } })}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleClearFilters}
                                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    </div>
                )}

                {/* Settings Panel */}
                {showSettings && (
                    <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Configurações
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enabled}
                                        onChange={(e) => handleSettingsChange({ enabled: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Habilitar Busca
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableAutoComplete}
                                        onChange={(e) => handleSettingsChange({ enableAutoComplete: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Auto-completar
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableSuggestions}
                                        onChange={(e) => handleSettingsChange({ enableSuggestions: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Sugestões
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableHistory}
                                        onChange={(e) => handleSettingsChange({ enableHistory: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Histórico
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Algoritmo: {settings.searchAlgorithm}
                                </label>
                                <select
                                    value={settings.searchAlgorithm}
                                    onChange={(e) => handleSettingsChange({ searchAlgorithm: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="fuzzy">Fuzzy</option>
                                    <option value="exact">Exato</option>
                                    <option value="semantic">Semântico</option>
                                    <option value="hybrid">Híbrido</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Máximo de Resultados: {settings.maxResults}
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="10"
                                    value={settings.maxResults}
                                    onChange={(e) => handleSettingsChange({ maxResults: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


