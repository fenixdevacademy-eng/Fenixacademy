'use client';

import React, { useState, useEffect } from 'react';
import {
    Puzzle, Download, Upload, Settings, Star, Search,
    Filter, Grid, List, Heart, Eye, Code, Palette,
    Terminal, Database, Globe, Server, Zap
} from 'lucide-react';

interface Extension {
    id: string;
    name: string;
    description: string;
    author: string;
    version: string;
    category: 'productivity' | 'language' | 'theme' | 'debugger' | 'git' | 'database' | 'other';
    downloads: number;
    rating: number;
    lastUpdated: string;
    size: string;
    dependencies: string[];
    features: string[];
    icon: React.ComponentType<any>;
    isInstalled: boolean;
    isEnabled: boolean;
    isPopular: boolean;
    isVerified: boolean;
    price: 'free' | 'premium' | 'freemium';
    tags: string[];
}

const availableExtensions: Extension[] = [
    // Productivity
    {
        id: 'auto-rename-tag',
        name: 'Auto Rename Tag',
        description: 'Automatically rename paired HTML/XML tags',
        author: 'Jun Han',
        version: '0.1.0',
        category: 'productivity',
        downloads: 15000000,
        rating: 4.8,
        lastUpdated: '2024-01-15',
        size: '45KB',
        dependencies: [],
        features: ['Auto tag renaming', 'HTML/XML support', 'Real-time updates'],
        icon: Code,
        isInstalled: false,
        isEnabled: false,
        isPopular: true,
        isVerified: true,
        price: 'free',
        tags: ['html', 'xml', 'productivity', 'auto-complete']
    },
    {
        id: 'bracket-pair-colorizer',
        name: 'Bracket Pair Colorizer',
        description: 'Colorize matching brackets and parentheses',
        author: 'CoenraadS',
        version: '1.0.61',
        category: 'productivity',
        downloads: 8000000,
        rating: 4.7,
        lastUpdated: '2024-01-10',
        size: '32KB',
        dependencies: [],
        features: ['Bracket coloring', 'Multiple languages', 'Customizable colors'],
        icon: Palette,
        isInstalled: true,
        isEnabled: true,
        isPopular: true,
        isVerified: true,
        price: 'free',
        tags: ['brackets', 'color', 'productivity', 'syntax']
    },
    {
        id: 'git-lens',
        name: 'GitLens',
        description: 'Supercharge Git capabilities within VS Code',
        author: 'Eric Amodio',
        version: '13.0.0',
        category: 'git',
        downloads: 12000000,
        rating: 4.9,
        lastUpdated: '2024-01-20',
        size: '2.1MB',
        dependencies: ['git'],
        features: ['Git blame', 'File history', 'Branch comparison', 'Commit details'],
        icon: Code,
        isInstalled: false,
        isEnabled: false,
        isPopular: true,
        isVerified: true,
        price: 'freemium',
        tags: ['git', 'version-control', 'productivity', 'collaboration']
    },

    // Language Support
    {
        id: 'python',
        name: 'Python',
        description: 'IntelliSense, Linting, Debugging, code formatting, refactoring',
        author: 'Microsoft',
        version: '2024.1.0',
        category: 'language',
        downloads: 25000000,
        rating: 4.9,
        lastUpdated: '2024-01-25',
        size: '15.2MB',
        dependencies: ['python'],
        features: ['IntelliSense', 'Linting', 'Debugging', 'Formatting', 'Refactoring'],
        icon: Code,
        isInstalled: true,
        isEnabled: true,
        isPopular: true,
        isVerified: true,
        price: 'free',
        tags: ['python', 'language', 'microsoft', 'intellisense']
    },
    {
        id: 'typescript',
        name: 'TypeScript and JavaScript Language Features',
        description: 'Provides TypeScript language support',
        author: 'Microsoft',
        version: '1.85.0',
        category: 'language',
        downloads: 30000000,
        rating: 4.8,
        lastUpdated: '2024-01-28',
        size: '8.7MB',
        dependencies: ['typescript'],
        features: ['TypeScript support', 'JavaScript support', 'JSX/TSX', 'IntelliSense'],
        icon: Code,
        isInstalled: true,
        isEnabled: true,
        isPopular: true,
        isVerified: true,
        price: 'free',
        tags: ['typescript', 'javascript', 'microsoft', 'language']
    },
    {
        id: 'csharp',
        name: 'C#',
        description: 'C# language support for Visual Studio Code',
        author: 'Microsoft',
        version: '2.0.0',
        category: 'language',
        downloads: 18000000,
        rating: 4.7,
        lastUpdated: '2024-01-22',
        size: '12.1MB',
        dependencies: ['dotnet'],
        features: ['C# support', 'IntelliSense', 'Debugging', 'OmniSharp'],
        icon: Code,
        isInstalled: false,
        isEnabled: false,
        isPopular: true,
        isVerified: true,
        price: 'free',
        tags: ['csharp', 'dotnet', 'microsoft', 'language']
    },

    // Themes
    {
        id: 'dracula',
        name: 'Dracula Official',
        description: 'Official Dracula theme for VS Code',
        author: 'Dracula Theme',
        version: '2.24.3',
        category: 'theme',
        downloads: 10000000,
        rating: 4.8,
        lastUpdated: '2024-01-18',
        size: '156KB',
        dependencies: [],
        features: ['Dark theme', 'Colorful syntax', 'Multiple languages', 'Customizable'],
        icon: Palette,
        isInstalled: false,
        isEnabled: false,
        isPopular: true,
        isVerified: true,
        price: 'free',
        tags: ['theme', 'dark', 'dracula', 'colorful']
    },
    {
        id: 'material-icon-theme',
        name: 'Material Icon Theme',
        description: 'Material Design Icons for Visual Studio Code',
        author: 'Philipp Kief',
        version: '4.14.1',
        category: 'theme',
        downloads: 12000000,
        rating: 4.9,
        lastUpdated: '2024-01-20',
        size: '2.8MB',
        dependencies: [],
        features: ['File icons', 'Folder icons', 'Material design', 'Customizable'],
        icon: Palette,
        isInstalled: true,
        isEnabled: true,
        isPopular: true,
        isVerified: true,
        price: 'free',
        tags: ['icons', 'material', 'theme', 'files']
    },

    // Debuggers
    {
        id: 'debugger-for-chrome',
        name: 'Debugger for Chrome',
        description: 'Debug your JavaScript code in the Chrome browser',
        author: 'Microsoft',
        version: '4.13.0',
        category: 'debugger',
        downloads: 15000000,
        rating: 4.6,
        lastUpdated: '2024-01-15',
        size: '3.2MB',
        dependencies: ['chrome'],
        features: ['Chrome debugging', 'Breakpoints', 'Variable inspection', 'Call stack'],
        icon: Code,
        isInstalled: false,
        isEnabled: false,
        isPopular: true,
        isVerified: true,
        price: 'free',
        tags: ['debugger', 'chrome', 'javascript', 'microsoft']
    },

    // Database
    {
        id: 'sql-tools',
        name: 'SQLTools',
        description: 'Database management for VS Code',
        author: 'Matheus Teixeira',
        version: '0.25.0',
        category: 'database',
        downloads: 2000000,
        rating: 4.5,
        lastUpdated: '2024-01-12',
        size: '8.9MB',
        dependencies: [],
        features: ['Database connections', 'Query execution', 'Schema browsing', 'Multiple databases'],
        icon: Database,
        isInstalled: false,
        isEnabled: false,
        isPopular: false,
        isVerified: true,
        price: 'free',
        tags: ['database', 'sql', 'query', 'management']
    },

    // Other
    {
        id: 'live-server',
        name: 'Live Server',
        description: 'Launch a development local Server with live reload feature',
        author: 'Ritwick Dey',
        version: '5.7.9',
        category: 'other',
        downloads: 18000000,
        rating: 4.8,
        lastUpdated: '2024-01-16',
        size: '1.2MB',
        dependencies: [],
        features: ['Live reload', 'Local server', 'Multiple browsers', 'Custom port'],
        icon: Globe,
        isInstalled: false,
        isEnabled: false,
        isPopular: true,
        isVerified: true,
        price: 'free',
        tags: ['server', 'live-reload', 'development', 'web']
    }
];

export default function ExtensionSystem() {
    const [extensions, setExtensions] = useState<Extension[]>(availableExtensions);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'downloads' | 'rating' | 'lastUpdated'>('downloads');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showInstalled, setShowInstalled] = useState(false);
    const [showPopular, setShowPopular] = useState(false);
    const [showVerified, setShowVerified] = useState(false);

    const categories = [
        { id: 'all', name: 'Todas', icon: Puzzle, count: extensions.length },
        { id: 'productivity', name: 'Produtividade', icon: Zap, count: extensions.filter(e => e.category === 'productivity').length },
        { id: 'language', name: 'Linguagens', icon: Code, count: extensions.filter(e => e.category === 'language').length },
        { id: 'theme', name: 'Temas', icon: Palette, count: extensions.filter(e => e.category === 'theme').length },
        { id: 'debugger', name: 'Debuggers', icon: Code, count: extensions.filter(e => e.category === 'debugger').length },
        { id: 'git', name: 'Git', icon: Code, count: extensions.filter(e => e.category === 'git').length },
        { id: 'database', name: 'Banco de Dados', icon: Database, count: extensions.filter(e => e.category === 'database').length },
        { id: 'other', name: 'Outras', icon: Puzzle, count: extensions.filter(e => e.category === 'other').length }
    ];

    const filteredExtensions = extensions
        .filter(extension => {
            const matchesCategory = selectedCategory === 'all' || extension.category === selectedCategory;
            const matchesSearch = extension.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                extension.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                extension.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesInstalled = !showInstalled || extension.isInstalled;
            const matchesPopular = !showPopular || extension.isPopular;
            const matchesVerified = !showVerified || extension.isVerified;

            return matchesCategory && matchesSearch && matchesInstalled && matchesPopular && matchesVerified;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'downloads':
                    return b.downloads - a.downloads;
                case 'rating':
                    return b.rating - a.rating;
                case 'lastUpdated':
                    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
                default:
                    return 0;
            }
        });

    const installExtension = (extensionId: string) => {
        setExtensions(prev => prev.map(ext =>
            ext.id === extensionId
                ? { ...ext, isInstalled: true, isEnabled: true }
                : ext
        ));
    };

    const uninstallExtension = (extensionId: string) => {
        setExtensions(prev => prev.map(ext =>
            ext.id === extensionId
                ? { ...ext, isInstalled: false, isEnabled: false }
                : ext
        ));
    };

    const toggleExtension = (extensionId: string) => {
        setExtensions(prev => prev.map(ext =>
            ext.id === extensionId
                ? { ...ext, isEnabled: !ext.isEnabled }
                : ext
        ));
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'productivity': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'language': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'theme': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'debugger': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            case 'git': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'database': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
            case 'other': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getPriceBadge = (price: string) => {
        switch (price) {
            case 'free':
                return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Gratuito</span>;
            case 'premium':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Premium</span>;
            case 'freemium':
                return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Freemium</span>;
            default:
                return null;
        }
    };

    const formatDownloads = (downloads: number) => {
        if (downloads >= 1000000) {
            return `${(downloads / 1000000).toFixed(1)}M`;
        } else if (downloads >= 1000) {
            return `${(downloads / 1000).toFixed(1)}K`;
        }
        return downloads.toString();
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    🔌 Sistema de Extensões
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Expanda as funcionalidades da sua IDE com extensões poderosas
                </p>
            </div>

            {/* Filtros e Controles */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                    {categories.map(category => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{category.name}</span>
                                <span className="text-xs opacity-75">({category.count})</span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar extensões..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                        <option value="downloads">Ordenar por Downloads</option>
                        <option value="rating">Ordenar por Avaliação</option>
                        <option value="name">Ordenar por Nome</option>
                        <option value="lastUpdated">Ordenar por Atualização</option>
                    </select>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showInstalled}
                            onChange={(e) => setShowInstalled(e.target.checked)}
                            className="rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Mostrar Instaladas</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showPopular}
                            onChange={(e) => setShowPopular(e.target.checked)}
                            className="rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Apenas Populares</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showVerified}
                            onChange={(e) => setShowVerified(e.target.checked)}
                            className="rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Apenas Verificadas</span>
                    </label>
                </div>
            </div>

            {/* Grid de Extensões */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredExtensions.map(extension => {
                    const Icon = extension.icon;
                    return (
                        <div
                            key={extension.id}
                            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 ${viewMode === 'list' ? 'p-4' : 'p-6'
                                }`}
                        >
                            <div className={`${viewMode === 'list' ? 'flex items-center space-x-4' : ''}`}>
                                <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>

                                <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {extension.name}
                                            </h3>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(extension.category)}`}>
                                                    {extension.category}
                                                </span>
                                                {getPriceBadge(extension.price)}
                                                {extension.isPopular && (
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                )}
                                                {extension.isVerified && (
                                                    <Eye className="w-4 h-4 text-blue-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                                        {extension.description}
                                    </p>

                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                        <span>por {extension.author}</span>
                                        <span>v{extension.version}</span>
                                        <span>{extension.size}</span>
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                        <span>⬇️ {formatDownloads(extension.downloads)}</span>
                                        <span>⭐ {extension.rating}</span>
                                        <span>🔄 {extension.lastUpdated}</span>
                                    </div>

                                    {viewMode === 'grid' && (
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recursos</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {extension.features.slice(0, 3).map(feature => (
                                                    <span
                                                        key={feature}
                                                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-2">
                                            {extension.isInstalled ? (
                                                <>
                                                    <button
                                                        onClick={() => toggleExtension(extension.id)}
                                                        className={`px-3 py-1 text-sm rounded-lg ${extension.isEnabled
                                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                                            : 'bg-gray-600 text-white hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        {extension.isEnabled ? 'Ativada' : 'Desativada'}
                                                    </button>
                                                    <button
                                                        onClick={() => uninstallExtension(extension.id)}
                                                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                                                    >
                                                        Desinstalar
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => installExtension(extension.id)}
                                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                                                >
                                                    <Download className="w-4 h-4 inline mr-2" />
                                                    Instalar
                                                </button>
                                            )}
                                        </div>

                                        {extension.isInstalled && (
                                            <div className="text-green-600 text-sm font-medium">
                                                ✓ Instalada
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Estatísticas */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Marketplace de Extensões
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-4xl font-bold mb-2">{extensions.length}</div>
                        <div className="text-blue-100">Extensões Disponíveis</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">{extensions.filter(e => e.isInstalled).length}</div>
                        <div className="text-blue-100">Instaladas</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">{extensions.filter(e => e.isPopular).length}</div>
                        <div className="text-blue-100">Populares</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">{extensions.filter(e => e.price === 'free').length}</div>
                        <div className="text-blue-100">Gratuitas</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
