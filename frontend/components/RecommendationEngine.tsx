'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Brain,
    Star,
    TrendingUp,
    Users,
    BookOpen,
    Code,
    Zap,
    Target,
    Filter,
    Search,
    Settings,
    Play,
    Pause,
    RefreshCw,
    Eye,
    EyeOff,
    Download,
    Upload,
    Share2,
    Heart,
    Bookmark,
    Clock,
    Award,
    ChevronRight,
    ChevronLeft,
    MoreVertical,
    Edit,
    Trash2,
    Copy,
    ExternalLink,
    Monitor,
    Smartphone,
    Tablet,
    Globe,
    Database,
    Cloud,
    Shield,
    Lock,
    Unlock,
    Power,
    PowerOff
} from 'lucide-react';

interface RecommendationEngineProps {
    className?: string;
    onRecommendationClick?: (recommendation: Recommendation) => void;
    onSettingsChange?: (settings: RecommendationSettings) => void;
    onExport?: (data: RecommendationData) => void;
}

interface Recommendation {
    id: string;
    type: 'course' | 'lesson' | 'project' | 'resource' | 'tool' | 'community';
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // in minutes
    rating: number;
    tags: string[];
    author: string;
    thumbnail?: string;
    url?: string;
    isBookmarked: boolean;
    isCompleted: boolean;
    progress: number;
    createdAt: string;
    updatedAt: string;
    metadata: {
        views: number;
        likes: number;
        shares: number;
        comments: number;
        completionRate: number;
        averageRating: number;
        difficultyScore: number;
        relevanceScore: number;
        popularityScore: number;
    };
}

interface RecommendationSettings {
    enabled: boolean;
    maxRecommendations: number;
    refreshInterval: number;
    enablePersonalization: boolean;
    enableCollaborativeFiltering: boolean;
    enableContentBasedFiltering: boolean;
    enableHybridFiltering: boolean;
    enableRealTimeUpdates: boolean;
    enableNotifications: boolean;
    enableSound: boolean;
    enableDesktopNotifications: boolean;
    enableLogging: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    algorithm: 'collaborative' | 'content' | 'hybrid' | 'popularity' | 'trending';
    weightFactors: {
        rating: number;
        difficulty: number;
        duration: number;
        popularity: number;
        recency: number;
        personalization: number;
    };
}

interface RecommendationData {
    recommendations: Recommendation[];
    settings: RecommendationSettings;
    userProfile: {
        id: string;
        preferences: string[];
        completedCourses: string[];
        bookmarkedItems: string[];
        skillLevel: string;
        interests: string[];
        learningGoals: string[];
    };
    analytics: {
        totalRecommendations: number;
        clickThroughRate: number;
        conversionRate: number;
        averageRating: number;
        userSatisfaction: number;
    };
}

const defaultSettings: RecommendationSettings = {
    enabled: true,
    maxRecommendations: 10,
    refreshInterval: 30000, // 30 seconds
    enablePersonalization: true,
    enableCollaborativeFiltering: true,
    enableContentBasedFiltering: true,
    enableHybridFiltering: true,
    enableRealTimeUpdates: true,
    enableNotifications: true,
    enableSound: true,
    enableDesktopNotifications: false,
    enableLogging: true,
    logLevel: 'info',
    algorithm: 'hybrid',
    weightFactors: {
        rating: 0.3,
        difficulty: 0.2,
        duration: 0.1,
        popularity: 0.2,
        recency: 0.1,
        personalization: 0.1
    }
};

const mockRecommendations: Recommendation[] = [
    {
        id: '1',
        type: 'course',
        title: 'Advanced React Patterns',
        description: 'Learn advanced React patterns and best practices for building scalable applications',
        difficulty: 'advanced',
        duration: 180,
        rating: 4.8,
        tags: ['react', 'javascript', 'frontend', 'patterns'],
        author: 'John Doe',
        thumbnail: '/images/courses/react-patterns.jpg',
        url: '/courses/advanced-react-patterns',
        isBookmarked: false,
        isCompleted: false,
        progress: 0,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z',
        metadata: {
            views: 1250,
            likes: 89,
            shares: 23,
            comments: 45,
            completionRate: 78.5,
            averageRating: 4.8,
            difficultyScore: 8.5,
            relevanceScore: 9.2,
            popularityScore: 8.7
        }
    },
    {
        id: '2',
        type: 'lesson',
        title: 'TypeScript Fundamentals',
        description: 'Master TypeScript from basics to advanced concepts',
        difficulty: 'intermediate',
        duration: 120,
        rating: 4.6,
        tags: ['typescript', 'javascript', 'programming', 'fundamentals'],
        author: 'Jane Smith',
        thumbnail: '/images/lessons/typescript-fundamentals.jpg',
        url: '/lessons/typescript-fundamentals',
        isBookmarked: true,
        isCompleted: false,
        progress: 35,
        createdAt: '2024-01-10T14:00:00Z',
        updatedAt: '2024-01-19T09:15:00Z',
        metadata: {
            views: 2100,
            likes: 156,
            shares: 34,
            comments: 67,
            completionRate: 82.3,
            averageRating: 4.6,
            difficultyScore: 6.2,
            relevanceScore: 8.8,
            popularityScore: 9.1
        }
    },
    {
        id: '3',
        type: 'project',
        title: 'E-commerce Dashboard',
        description: 'Build a complete e-commerce dashboard with React and Node.js',
        difficulty: 'advanced',
        duration: 300,
        rating: 4.9,
        tags: ['react', 'nodejs', 'ecommerce', 'dashboard', 'fullstack'],
        author: 'Mike Johnson',
        thumbnail: '/images/projects/ecommerce-dashboard.jpg',
        url: '/projects/ecommerce-dashboard',
        isBookmarked: false,
        isCompleted: true,
        progress: 100,
        createdAt: '2024-01-05T08:00:00Z',
        updatedAt: '2024-01-18T16:45:00Z',
        metadata: {
            views: 3200,
            likes: 234,
            shares: 56,
            comments: 89,
            completionRate: 91.2,
            averageRating: 4.9,
            difficultyScore: 9.1,
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
    community: Users
};

export function RecommendationEngine({
    className = '',
    onRecommendationClick,
    onSettingsChange,
    onExport
}: RecommendationEngineProps) {
    const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);
    const [settings, setSettings] = useState<RecommendationSettings>(defaultSettings);
    const [isRunning, setIsRunning] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'popularity' | 'recent'>('relevance');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const intervalRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (settings.enabled && settings.enableRealTimeUpdates) {
            startRecommendationUpdates();
        } else {
            stopRecommendationUpdates();
        }

        return () => {
            stopRecommendationUpdates();
        };
    }, [settings.enabled, settings.enableRealTimeUpdates, settings.refreshInterval]);

    const startRecommendationUpdates = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            generateNewRecommendations();
        }, settings.refreshInterval);
    };

    const stopRecommendationUpdates = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
    };

    const generateNewRecommendations = () => {
        // Simulate new recommendations being generated
        const newRecommendation: Recommendation = {
            id: Date.now().toString(),
            type: 'course',
            title: `New Course ${Date.now()}`,
            description: 'A newly recommended course based on your learning patterns',
            difficulty: 'intermediate',
            duration: Math.floor(Math.random() * 180) + 60,
            rating: Math.random() * 2 + 3, // 3-5 rating
            tags: ['new', 'recommended', 'trending'],
            author: 'AI Recommendation Engine',
            isBookmarked: false,
            isCompleted: false,
            progress: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            metadata: {
                views: Math.floor(Math.random() * 1000),
                likes: Math.floor(Math.random() * 100),
                shares: Math.floor(Math.random() * 50),
                comments: Math.floor(Math.random() * 30),
                completionRate: Math.random() * 100,
                averageRating: Math.random() * 2 + 3,
                difficultyScore: Math.random() * 10,
                relevanceScore: Math.random() * 10,
                popularityScore: Math.random() * 10
            }
        };

        setRecommendations(prev => [newRecommendation, ...prev.slice(0, settings.maxRecommendations - 1)]);
    };

    const handleRecommendationClick = (recommendation: Recommendation) => {
        onRecommendationClick?.(recommendation);
    };

    const handleBookmark = (recommendationId: string) => {
        setRecommendations(prev => prev.map(rec =>
            rec.id === recommendationId
                ? { ...rec, isBookmarked: !rec.isBookmarked }
                : rec
        ));
    };

    const handleSettingsChange = (newSettings: Partial<RecommendationSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        onSettingsChange?.(updatedSettings);
    };

    const handleStartStop = () => {
        if (isRunning) {
            setIsRunning(false);
            stopRecommendationUpdates();
        } else {
            setIsRunning(true);
            startRecommendationUpdates();
        }
    };

    const handleExport = () => {
        const data: RecommendationData = {
            recommendations,
            settings,
            userProfile: {
                id: 'user-123',
                preferences: ['react', 'typescript', 'frontend'],
                completedCourses: ['1', '3'],
                bookmarkedItems: ['2'],
                skillLevel: 'intermediate',
                interests: ['web development', 'mobile development'],
                learningGoals: ['become senior developer', 'learn new technologies']
            },
            analytics: {
                totalRecommendations: recommendations.length,
                clickThroughRate: 0.15,
                conversionRate: 0.08,
                averageRating: recommendations.reduce((sum, rec) => sum + rec.rating, 0) / recommendations.length,
                userSatisfaction: 0.85
            }
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recommendations-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        onExport?.(data);
    };

    const filteredRecommendations = recommendations.filter(rec => {
        if (selectedType !== 'all' && rec.type !== selectedType) return false;
        if (selectedDifficulty !== 'all' && rec.difficulty !== selectedDifficulty) return false;
        if (searchQuery && !rec.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !rec.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'popularity':
                return b.metadata.popularityScore - a.metadata.popularityScore;
            case 'recent':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default: // relevance
                return b.metadata.relevanceScore - a.metadata.relevanceScore;
        }
    });

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

    const renderRecommendationCard = (recommendation: Recommendation) => {
        const TypeIcon = typeIcons[recommendation.type];
        return (
            <div
                key={recommendation.id}
                onClick={() => handleRecommendationClick(recommendation)}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
                <div className="flex items-start gap-3 mb-3">
                    <TypeIcon className="w-6 h-6 text-blue-500 mt-1" />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                {recommendation.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[recommendation.difficulty]}`}>
                                {recommendation.difficulty}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                            {recommendation.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {recommendation.rating.toFixed(1)}
                            </span>
                            <span>{formatDuration(recommendation.duration)}</span>
                            <span>{recommendation.author}</span>
                            <span>{formatTime(recommendation.createdAt)}</span>
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(recommendation.id);
                        }}
                        className={`p-1 transition-colors ${recommendation.isBookmarked
                                ? 'text-yellow-500 hover:text-yellow-600'
                                : 'text-gray-400 hover:text-yellow-500'
                            }`}
                        title={recommendation.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                        <Bookmark className={`w-4 h-4 ${recommendation.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {recommendation.tags.slice(0, 3).map(tag => (
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
                            {recommendation.metadata.views}
                        </span>
                        <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {recommendation.metadata.likes}
                        </span>
                        <span className="flex items-center gap-1">
                            <Share2 className="w-3 h-3" />
                            {recommendation.metadata.shares}
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
                        <Brain className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Motor de Recomendações
                        </h3>
                        <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
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
                        <button
                            onClick={handleStartStop}
                            className={`p-2 rounded-lg transition-colors ${isRunning
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                            title={isRunning ? 'Parar' : 'Iniciar'}
                        >
                            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar recomendações..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="relevance">Relevância</option>
                        <option value="rating">Avaliação</option>
                        <option value="popularity">Popularidade</option>
                        <option value="recent">Recente</option>
                    </select>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tipo
                            </label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Todos</option>
                                <option value="course">Cursos</option>
                                <option value="lesson">Lições</option>
                                <option value="project">Projetos</option>
                                <option value="resource">Recursos</option>
                                <option value="tool">Ferramentas</option>
                                <option value="community">Comunidade</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Dificuldade
                            </label>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Todas</option>
                                <option value="beginner">Iniciante</option>
                                <option value="intermediate">Intermediário</option>
                                <option value="advanced">Avançado</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Visualização
                            </label>
                            <select
                                value={viewMode}
                                onChange={(e) => setViewMode(e.target.value as any)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="grid">Grade</option>
                                <option value="list">Lista</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setSelectedType('all');
                                    setSelectedDifficulty('all');
                                    setSearchQuery('');
                                    setSortBy('relevance');
                                }}
                                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex h-96">
                {/* Main Content */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                Recomendações ({sortedRecommendations.length})
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>Algoritmo: {settings.algorithm}</span>
                                <span>•</span>
                                <span>Atualização: {settings.refreshInterval / 1000}s</span>
                            </div>
                        </div>

                        <div className={`grid gap-4 ${viewMode === 'grid'
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1'
                            }`}>
                            {sortedRecommendations.map(renderRecommendationCard)}
                        </div>
                    </div>
                </div>

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
                                        Habilitar Recomendações
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enablePersonalization}
                                        onChange={(e) => handleSettingsChange({ enablePersonalization: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Personalização
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableCollaborativeFiltering}
                                        onChange={(e) => handleSettingsChange({ enableCollaborativeFiltering: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Filtro Colaborativo
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableContentBasedFiltering}
                                        onChange={(e) => handleSettingsChange({ enableContentBasedFiltering: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Filtro Baseado em Conteúdo
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Algoritmo: {settings.algorithm}
                                </label>
                                <select
                                    value={settings.algorithm}
                                    onChange={(e) => handleSettingsChange({ algorithm: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="collaborative">Colaborativo</option>
                                    <option value="content">Conteúdo</option>
                                    <option value="hybrid">Híbrido</option>
                                    <option value="popularity">Popularidade</option>
                                    <option value="trending">Tendências</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Máximo de Recomendações: {settings.maxRecommendations}
                                </label>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    step="5"
                                    value={settings.maxRecommendations}
                                    onChange={(e) => handleSettingsChange({ maxRecommendations: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Intervalo (s): {settings.refreshInterval / 1000}
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="300"
                                    step="10"
                                    value={settings.refreshInterval / 1000}
                                    onChange={(e) => handleSettingsChange({ refreshInterval: parseInt(e.target.value) * 1000 })}
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





