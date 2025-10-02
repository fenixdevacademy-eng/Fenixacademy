'use client';

import React, { useState, useEffect } from 'react';
import {
    Package,
    Search,
    Filter,
    Download,
    Upload,
    Settings,
    Play,
    Pause,
    Trash2,
    Edit,
    Star,
    StarOff,
    Code,
    Palette,
    Database,
    Zap,
    Globe,
    Smartphone,
    Shield,
    Bug,
    FileText,
    Image,
    Music,
    Video,
    BarChart3,
    GitBranch,
    Terminal,
    Eye,
    EyeOff,
    RefreshCw,
    AlertCircle,
    CheckCircle,
    Clock,
    User,
    Heart,
    Download as DownloadIcon,
    Upload as UploadIcon,
    Plus,
    X,
    Info,
    ExternalLink
} from 'lucide-react';

interface Extension {
    id: string;
    name: string;
    displayName: string;
    description: string;
    version: string;
    author: string;
    category: string;
    tags: string[];
    icon: string;
    isInstalled: boolean;
    isEnabled: boolean;
    isActive: boolean;
    downloadCount: number;
    rating: number;
    size: string;
    lastUpdated: Date;
    compatibility: string[];
    dependencies: string[];
    permissions: string[];
    screenshots: string[];
    readme: string;
    changelog: string[];
    repository?: string;
    homepage?: string;
    license: string;
    price: number;
    isPremium: boolean;
    features: string[];
    commands: ExtensionCommand[];
    keybindings: ExtensionKeybinding[];
    settings: ExtensionSetting[];
    status: 'stable' | 'beta' | 'alpha' | 'deprecated';
}

interface ExtensionCommand {
    id: string;
    title: string;
    command: string;
    category: string;
    description: string;
    keybinding?: string;
}

interface ExtensionKeybinding {
    key: string;
    command: string;
    when?: string;
}

interface ExtensionSetting {
    id: string;
    title: string;
    description: string;
    type: 'boolean' | 'string' | 'number' | 'select' | 'color';
    default: any;
    options?: { label: string; value: any }[];
    min?: number;
    max?: number;
}

interface ExtensionCategory {
    id: string;
    name: string;
    icon: React.ComponentType<any>;
    color: string;
    count: number;
}

const ExtensionManager: React.FC = () => {
    const [extensions, setExtensions] = useState<Extension[]>([
        {
            id: '1',
            name: 'prettier',
            displayName: 'Prettier - Code formatter',
            description: 'Code formatter using Prettier',
            version: '9.0.0',
            author: 'Prettier',
            category: 'formatters',
            tags: ['formatting', 'javascript', 'css', 'html'],
            icon: '🎨',
            isInstalled: true,
            isEnabled: true,
            isActive: true,
            downloadCount: 15000000,
            rating: 4.8,
            size: '2.1 MB',
            lastUpdated: new Date('2024-01-15'),
            compatibility: ['javascript', 'typescript', 'css', 'html', 'json'],
            dependencies: [],
            permissions: ['read', 'write'],
            screenshots: [],
            readme: 'Prettier is an opinionated code formatter...',
            changelog: ['v9.0.0: Updated dependencies', 'v8.0.0: New features'],
            repository: 'https://github.com/prettier/prettier',
            homepage: 'https://prettier.io',
            license: 'MIT',
            price: 0,
            isPremium: false,
            features: ['Auto-format on save', 'Multiple language support', 'Configurable'],
            commands: [
                { id: 'format', title: 'Format Document', command: 'prettier.format', category: 'Formatting', description: 'Format the current document' }
            ],
            keybindings: [
                { key: 'Shift+Alt+F', command: 'prettier.format' }
            ],
            settings: [
                { id: 'autoFormat', title: 'Format On Save', description: 'Format document on save', type: 'boolean', default: true }
            ],
            status: 'stable'
        },
        {
            id: '2',
            name: 'eslint',
            displayName: 'ESLint',
            description: 'JavaScript and TypeScript linter',
            version: '8.0.0',
            author: 'ESLint',
            category: 'linters',
            tags: ['linting', 'javascript', 'typescript', 'quality'],
            icon: '🔍',
            isInstalled: true,
            isEnabled: true,
            isActive: true,
            downloadCount: 12000000,
            rating: 4.7,
            size: '3.2 MB',
            lastUpdated: new Date('2024-01-10'),
            compatibility: ['javascript', 'typescript'],
            dependencies: [],
            permissions: ['read', 'write'],
            screenshots: [],
            readme: 'ESLint is a tool for identifying and reporting...',
            changelog: ['v8.0.0: New rules', 'v7.0.0: Performance improvements'],
            repository: 'https://github.com/eslint/eslint',
            homepage: 'https://eslint.org',
            license: 'MIT',
            price: 0,
            isPremium: false,
            features: ['Real-time linting', 'Customizable rules', 'Auto-fix'],
            commands: [
                { id: 'lint', title: 'Lint Document', command: 'eslint.lint', category: 'Linting', description: 'Lint the current document' }
            ],
            keybindings: [
                { key: 'Ctrl+Shift+L', command: 'eslint.lint' }
            ],
            settings: [
                { id: 'autoFix', title: 'Auto Fix', description: 'Automatically fix fixable issues', type: 'boolean', default: true }
            ],
            status: 'stable'
        },
        {
            id: '3',
            name: 'gitlens',
            displayName: 'GitLens — Git supercharged',
            description: 'Supercharge Git within VS Code',
            version: '14.0.0',
            author: 'Eric Amodio',
            category: 'git',
            tags: ['git', 'version-control', 'blame', 'history'],
            icon: '🔍',
            isInstalled: false,
            isEnabled: false,
            isActive: false,
            downloadCount: 8000000,
            rating: 4.9,
            size: '5.8 MB',
            lastUpdated: new Date('2024-01-12'),
            compatibility: ['all'],
            dependencies: [],
            permissions: ['read', 'write', 'git'],
            screenshots: [],
            readme: 'GitLens supercharges Git capabilities...',
            changelog: ['v14.0.0: New features', 'v13.0.0: Performance improvements'],
            repository: 'https://github.com/gitlens/gitlens-vscode',
            homepage: 'https://gitlens.amod.io',
            license: 'MIT',
            price: 0,
            isPremium: false,
            features: ['Git blame', 'File history', 'Commit graph', 'Compare changes'],
            commands: [
                { id: 'blame', title: 'Toggle Git Blame', command: 'gitlens.toggleBlame', category: 'Git', description: 'Toggle Git blame annotations' }
            ],
            keybindings: [
                { key: 'Alt+B', command: 'gitlens.toggleBlame' }
            ],
            settings: [
                { id: 'blameEnabled', title: 'Blame Enabled', description: 'Enable Git blame annotations', type: 'boolean', default: true }
            ],
            status: 'stable'
        },
        {
            id: '4',
            name: 'ai-assistant',
            displayName: 'AI Code Assistant',
            description: 'AI-powered code completion and suggestions',
            version: '2.0.0',
            author: 'AI Team',
            category: 'ai',
            tags: ['ai', 'completion', 'suggestions', 'intelligence'],
            icon: '🤖',
            isInstalled: false,
            isEnabled: false,
            isActive: false,
            downloadCount: 5000000,
            rating: 4.6,
            size: '8.2 MB',
            lastUpdated: new Date('2024-01-08'),
            compatibility: ['javascript', 'typescript', 'python', 'java'],
            dependencies: ['openai-api'],
            permissions: ['read', 'write', 'network'],
            screenshots: [],
            readme: 'AI-powered code assistant with intelligent suggestions...',
            changelog: ['v2.0.0: New AI models', 'v1.0.0: Initial release'],
            repository: 'https://github.com/ai/assistant',
            homepage: 'https://ai-assistant.com',
            license: 'MIT',
            price: 9.99,
            isPremium: true,
            features: ['Code completion', 'Bug detection', 'Code explanation', 'Refactoring suggestions'],
            commands: [
                { id: 'complete', title: 'AI Complete', command: 'ai.complete', category: 'AI', description: 'Get AI code completion' }
            ],
            keybindings: [
                { key: 'Ctrl+Space', command: 'ai.complete' }
            ],
            settings: [
                { id: 'apiKey', title: 'API Key', description: 'OpenAI API key', type: 'string', default: '' }
            ],
            status: 'beta'
        }
    ]);

    const [categories] = useState<ExtensionCategory[]>([
        { id: 'all', name: 'Todas', icon: Package, color: 'bg-gray-500', count: 0 },
        { id: 'formatters', name: 'Formatadores', icon: Palette, color: 'bg-blue-500', count: 0 },
        { id: 'linters', name: 'Linters', icon: Bug, color: 'bg-red-500', count: 0 },
        { id: 'git', name: 'Git', icon: GitBranch, color: 'bg-orange-500', count: 0 },
        { id: 'ai', name: 'IA', icon: Zap, color: 'bg-purple-500', count: 0 },
        { id: 'themes', name: 'Temas', icon: Palette, color: 'bg-pink-500', count: 0 },
        { id: 'productivity', name: 'Produtividade', icon: BarChart3, color: 'bg-green-500', count: 0 },
        { id: 'languages', name: 'Linguagens', icon: Code, color: 'bg-yellow-500', count: 0 },
        { id: 'debugging', name: 'Debug', icon: Bug, color: 'bg-red-600', count: 0 },
        { id: 'testing', name: 'Testes', icon: CheckCircle, color: 'bg-green-600', count: 0 }
    ]);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'downloads' | 'rating' | 'date'>('downloads');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [filterInstalled, setFilterInstalled] = useState<'all' | 'installed' | 'not-installed'>('all');
    const [filterStatus, setFilterStatus] = useState<'all' | 'stable' | 'beta' | 'alpha'>('all');
    const [showExtensionDetails, setShowExtensionDetails] = useState<Extension | null>(null);
    const [showSettings, setShowSettings] = useState(false);

    // Update category counts
    useEffect(() => {
        categories.forEach(category => {
            if (category.id === 'all') {
                category.count = extensions.length;
            } else {
                category.count = extensions.filter(ext => ext.category === category.id).length;
            }
        });
    }, [extensions, categories]);

    const filteredExtensions = extensions.filter(extension => {
        const matchesCategory = selectedCategory === 'all' || extension.category === selectedCategory;
        const matchesSearch = extension.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            extension.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            extension.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            extension.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesInstalled = filterInstalled === 'all' ||
            (filterInstalled === 'installed' && extension.isInstalled) ||
            (filterInstalled === 'not-installed' && !extension.isInstalled);
        const matchesStatus = filterStatus === 'all' || extension.status === filterStatus;

        return matchesCategory && matchesSearch && matchesInstalled && matchesStatus;
    });

    const sortedExtensions = [...filteredExtensions].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'name':
                comparison = a.displayName.localeCompare(b.displayName);
                break;
            case 'downloads':
                comparison = a.downloadCount - b.downloadCount;
                break;
            case 'rating':
                comparison = a.rating - b.rating;
                break;
            case 'date':
                comparison = a.lastUpdated.getTime() - b.lastUpdated.getTime();
                break;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const handleInstallExtension = (id: string) => {
        setExtensions(prev => prev.map(ext =>
            ext.id === id ? { ...ext, isInstalled: true, isEnabled: true, isActive: true } : ext
        ));
    }

    const handleUninstallExtension = (id: string) => {
        setExtensions(prev => prev.map(ext =>
            ext.id === id ? { ...ext, isInstalled: false, isEnabled: false, isActive: false } : ext
        ));
    }

    const handleToggleExtension = (id: string) => {
        setExtensions(prev => prev.map(ext =>
            ext.id === id ? { ...ext, isEnabled: !ext.isEnabled, isActive: !ext.isActive } : ext
        ));
    }

    const handleToggleFavorite = (id: string) => {
        // In a real app, this would update a favorites list
        console.log('Toggle favorite:', id);
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'stable': return 'text-green-400 bg-green-900/20';
            case 'beta': return 'text-yellow-400 bg-yellow-900/20';
            case 'alpha': return 'text-red-400 bg-red-900/20';
            case 'deprecated': return 'text-gray-400 bg-gray-900/20';
            default: return 'text-gray-400 bg-gray-900/20';
        }
    }

    const formatDownloadCount = (count: number) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
    }

    return (
        <div className="h-full bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold">Extensões</h3>
                        <div className="text-sm text-gray-400">
                            {extensions.filter(ext => ext.isInstalled).length} instaladas
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar extensões..."
                            className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="downloads">Downloads</option>
                        <option value="rating">Avaliação</option>
                        <option value="name">Nome</option>
                        <option value="date">Data</option>
                    </select>

                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <select
                        value={filterInstalled}
                        onChange={(e) => setFilterInstalled(e.target.value as any)}
                        className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todas</option>
                        <option value="installed">Instaladas</option>
                        <option value="not-installed">Não instaladas</option>
                    </select>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todos os status</option>
                        <option value="stable">Estável</option>
                        <option value="beta">Beta</option>
                        <option value="alpha">Alpha</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 flex">
                {/* Categories Sidebar */}
                <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-4">Categorias</h4>
                    <div className="space-y-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${selectedCategory === category.id
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <category.icon className="w-4 h-4" />
                                    <span className="text-sm">{category.name}</span>
                                </div>
                                <span className="text-xs bg-gray-600 px-2 py-1 rounded-full">
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Extensions List */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                        {sortedExtensions.map(extension => (
                            <div key={extension.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="text-2xl">{extension.icon}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h4 className="text-sm font-semibold text-white">{extension.displayName}</h4>
                                                <span className="text-xs text-gray-400">v{extension.version}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(extension.status)}`}>
                                                    {extension.status}
                                                </span>
                                                {extension.isPremium && (
                                                    <span className="text-xs bg-yellow-600 text-yellow-100 px-2 py-1 rounded">
                                                        Premium
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-400 mb-2">{extension.description}</p>
                                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                <div className="flex items-center space-x-1">
                                                    <DownloadIcon className="w-3 h-3" />
                                                    <span>{formatDownloadCount(extension.downloadCount)}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-3 h-3" />
                                                    <span>{extension.rating}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <User className="w-3 h-3" />
                                                    <span>{extension.author}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{extension.lastUpdated.toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleToggleFavorite(extension.id)}
                                            className="text-gray-400 hover:text-yellow-400"
                                        >
                                            <Star className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setShowExtensionDetails(extension)}
                                            className="text-gray-400 hover:text-blue-400"
                                        >
                                            <Info className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-3">
                                    {extension.tags.slice(0, 5).map(tag => (
                                        <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                    {extension.tags.length > 5 && (
                                        <span className="text-xs text-gray-500">+{extension.tags.length - 5}</span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {extension.isInstalled ? (
                                            <>
                                                <button
                                                    onClick={() => handleToggleExtension(extension.id)}
                                                    className={`px-3 py-1 rounded text-sm ${extension.isEnabled
                                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                                            : 'bg-gray-600 hover:bg-gray-700 text-white'
                                                        }`}
                                                >
                                                    {extension.isEnabled ? 'Ativo' : 'Inativo'}
                                                </button>
                                                <button
                                                    onClick={() => handleUninstallExtension(extension.id)}
                                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                                                >
                                                    Desinstalar
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleInstallExtension(extension.id)}
                                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                                            >
                                                Instalar
                                            </button>
                                        )}
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        {extension.size}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {sortedExtensions.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 mb-4">Nenhuma extensão encontrada</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Extension Details Modal */}
            {showExtensionDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg w-4/5 max-w-4xl max-h-4/5 overflow-y-auto">
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl">{showExtensionDetails.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{showExtensionDetails.displayName}</h3>
                                        <p className="text-sm text-gray-400">por {showExtensionDetails.author}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowExtensionDetails(null)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-3">Descrição</h4>
                                    <p className="text-gray-300 mb-4">{showExtensionDetails.description}</p>

                                    <h4 className="text-lg font-semibold text-white mb-3">Recursos</h4>
                                    <ul className="space-y-1">
                                        {showExtensionDetails.features.map((feature, index) => (
                                            <li key={index} className="text-sm text-gray-300 flex items-center space-x-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-3">Informações</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Versão:</span>
                                            <span className="text-white">{showExtensionDetails.version}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Tamanho:</span>
                                            <span className="text-white">{showExtensionDetails.size}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Downloads:</span>
                                            <span className="text-white">{formatDownloadCount(showExtensionDetails.downloadCount)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Avaliação:</span>
                                            <span className="text-white">{showExtensionDetails.rating}/5</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Licença:</span>
                                            <span className="text-white">{showExtensionDetails.license}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Status:</span>
                                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(showExtensionDetails.status)}`}>
                                                {showExtensionDetails.status}
                                            </span>
                                        </div>
                                    </div>

                                    {showExtensionDetails.repository && (
                                        <div className="mt-4">
                                            <a
                                                href={showExtensionDetails.repository}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                <span className="text-sm">Repositório</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3">
                                <button
                                    onClick={() => setShowExtensionDetails(null)}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Fechar
                                </button>
                                {showExtensionDetails.isInstalled ? (
                                    <button
                                        onClick={() => {
                                            handleToggleExtension(showExtensionDetails.id);
                                            setShowExtensionDetails(null);
                                        }}
                                        className={`px-4 py-2 rounded ${showExtensionDetails.isEnabled
                                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                                : 'bg-green-600 hover:bg-green-700 text-white'
                                            }`}
                                    >
                                        {showExtensionDetails.isEnabled ? 'Desativar' : 'Ativar'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            handleInstallExtension(showExtensionDetails.id);
                                            setShowExtensionDetails(null);
                                        }}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                                    >
                                        Instalar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExtensionManager;









