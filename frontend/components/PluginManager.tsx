'use client';

import React, { useState } from 'react';
import { Puzzle, Download, Settings, Search, Grid, List, Star, StarOff, CheckCircle, XCircle, Clock, User, Code, Zap, Shield, Package, Activity, Cpu, MemoryStick, Trash2 } from 'lucide-react';

interface PluginManagerProps {
    className?: string;
    onPluginInstall?: (plugin: Plugin) => void;
    onPluginUninstall?: (pluginId: string) => void;
    onPluginEnable?: (pluginId: string) => void;
    onPluginDisable?: (pluginId: string) => void;
    onPluginUpdate?: (plugin: Plugin) => void;
}

interface Plugin {
    id: string;
    name: string;
    description: string;
    version: string;
    author: string;
    category: 'productivity' | 'development' | 'design' | 'analytics' | 'security' | 'other';
    status: 'installed' | 'available' | 'updating' | 'error';
    isEnabled: boolean;
    isStarred: boolean;
    isOfficial: boolean;
    rating: number;
    downloads: number;
    size: number;
    lastUpdated: string;
    dependencies: string[];
    tags: string[];
    performance: {
        memoryUsage: number;
        cpuUsage: number;
        loadTime: number;
    };
}

const mockPlugins: Plugin[] = [
    {
        id: '1',
        name: 'Code Formatter',
        description: 'Formata automaticamente código em múltiplas linguagens',
        version: '2.1.0',
        author: 'DevTools Inc',
        category: 'development',
        status: 'installed',
        isEnabled: true,
        isStarred: true,
        isOfficial: true,
        rating: 4.8,
        downloads: 15420,
        size: 2048000,
        lastUpdated: '2024-01-15T10:00:00Z',
        dependencies: ['eslint', 'prettier'],
        tags: ['formatting', 'code', 'eslint', 'prettier'],
        performance: {
            memoryUsage: 45,
            cpuUsage: 12,
            loadTime: 1.2
        }
    },
    {
        id: '2',
        name: 'AI Assistant',
        description: 'Assistente de IA integrado para desenvolvimento',
        version: '1.5.2',
        author: 'AI Solutions',
        category: 'productivity',
        status: 'available',
        isEnabled: false,
        isStarred: false,
        isOfficial: false,
        rating: 4.6,
        downloads: 8930,
        size: 5120000,
        lastUpdated: '2024-01-10T15:30:00Z',
        dependencies: ['openai', 'axios'],
        tags: ['ai', 'assistant', 'productivity', 'openai'],
        performance: {
            memoryUsage: 120,
            cpuUsage: 25,
            loadTime: 3.5
        }
    }
];

const categories = [
    { value: 'all', label: 'Todos', icon: Package },
    { value: 'productivity', label: 'Produtividade', icon: Zap },
    { value: 'development', label: 'Desenvolvimento', icon: Code },
    { value: 'design', label: 'Design', icon: Activity },
    { value: 'analytics', label: 'Analytics', icon: Cpu },
    { value: 'security', label: 'Segurança', icon: Shield },
    { value: 'other', label: 'Outros', icon: Puzzle }
];

const statusColors = {
    installed: 'text-green-600 bg-green-100 dark:bg-green-900/20',
    available: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
    updating: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
    error: 'text-red-600 bg-red-100 dark:bg-red-900/20'
};

export function PluginManager({
    className = '',
    onPluginInstall,
    onPluginUninstall,
    onPluginEnable,
    onPluginDisable,
    onPluginUpdate
}: PluginManagerProps) {
    const [plugins, setPlugins] = useState<Plugin[]>(mockPlugins);
    const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showSettings, setShowSettings] = useState(false);

    const filteredPlugins = plugins.filter(plugin => {
        const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plugin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = filterCategory === 'all' || plugin.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || plugin.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handlePluginSelect = (plugin: Plugin) => {
        setSelectedPlugin(plugin);
    };

    const handleInstall = (plugin: Plugin) => {
        setPlugins(prev => prev.map(p =>
            p.id === plugin.id
                ? { ...p, status: 'installed', isEnabled: true }
                : p
        ));
        onPluginInstall?.(plugin);
    };

    const handleUninstall = (pluginId: string) => {
        setPlugins(prev => prev.map(p =>
            p.id === pluginId
                ? { ...p, status: 'available', isEnabled: false }
                : p
        ));
        if (selectedPlugin?.id === pluginId) {
            setSelectedPlugin(null);
        }
        onPluginUninstall?.(pluginId);
    };

    const handleEnable = (pluginId: string) => {
        setPlugins(prev => prev.map(p =>
            p.id === pluginId
                ? { ...p, isEnabled: true }
                : p
        ));
        onPluginEnable?.(pluginId);
    };

    const handleDisable = (pluginId: string) => {
        setPlugins(prev => prev.map(p =>
            p.id === pluginId
                ? { ...p, isEnabled: false }
                : p
        ));
        onPluginDisable?.(pluginId);
    };

    const handleStarToggle = (pluginId: string) => {
        setPlugins(prev => prev.map(p =>
            p.id === pluginId
                ? { ...p, isStarred: !p.isStarred }
                : p
        ));
    };

    const handleUpdate = (plugin: Plugin) => {
        setPlugins(prev => prev.map(p =>
            p.id === plugin.id
                ? { ...p, status: 'updating' }
                : p
        ));

        // Simulate update
        setTimeout(() => {
            setPlugins(prev => prev.map(p =>
                p.id === plugin.id
                    ? { ...p, status: 'installed', lastUpdated: new Date().toISOString() }
                    : p
            ));
            onPluginUpdate?.(plugin);
        }, 3000);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getCategoryIcon = (category: string) => {
        const cat = categories.find(c => c.value === category);
        return cat ? cat.icon : Package;
    };

    const renderPluginCard = (plugin: Plugin) => {
        const CategoryIcon = getCategoryIcon(plugin.category);

        return (
            <div
                key={plugin.id}
                onClick={() => handlePluginSelect(plugin)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedPlugin?.id === plugin.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
            >
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                {plugin.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {plugin.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStarToggle(plugin.id);
                            }}
                            className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                        >
                            {plugin.isStarred ? (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            ) : (
                                <StarOff className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[plugin.status]}`}>
                            {plugin.status}
                        </span>
                        {plugin.isOfficial && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                                Oficial
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{plugin.rating}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>v{plugin.version}</span>
                    <span>{formatFileSize(plugin.size)}</span>
                    <span>{plugin.downloads.toLocaleString()} downloads</span>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                    {plugin.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                        >
                            {tag}
                        </span>
                    ))}
                    {plugin.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            +{plugin.tags.length - 3}
                        </span>
                    )}
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
                        <Puzzle className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Gerenciador de Plugins
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title={viewMode === 'grid' ? 'Lista' : 'Grade'}
                        >
                            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Configurações"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar plugins..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todos os status</option>
                        <option value="installed">Instalado</option>
                        <option value="available">Disponível</option>
                        <option value="updating">Atualizando</option>
                        <option value="error">Erro</option>
                    </select>
                </div>
            </div>

            <div className="flex h-96">
                {/* Plugins List */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredPlugins.map(renderPluginCard)}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredPlugins.map((plugin) => (
                                <div
                                    key={plugin.id}
                                    onClick={() => handlePluginSelect(plugin)}
                                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedPlugin?.id === plugin.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                                {React.createElement(getCategoryIcon(plugin.category), { className: "w-4 h-4 text-gray-600 dark:text-gray-400" })}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {plugin.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {plugin.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[plugin.status]}`}>
                                                {plugin.status}
                                            </span>
                                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                <span>{plugin.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {plugin.status === 'installed' ? (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleUninstall(plugin.id);
                                                        }}
                                                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                                                    >
                                                        Desinstalar
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleInstall(plugin);
                                                        }}
                                                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                                                    >
                                                        Instalar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Plugin Details */}
                {selectedPlugin && (
                    <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 p-4">
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {selectedPlugin.name}
                                </h4>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleStarToggle(selectedPlugin.id)}
                                        className={`p-1 transition-colors ${selectedPlugin.isStarred
                                                ? 'text-yellow-500'
                                                : 'text-gray-400 hover:text-yellow-500'
                                            }`}
                                    >
                                        {selectedPlugin.isStarred ? (
                                            <Star className="w-4 h-4 fill-current" />
                                        ) : (
                                            <StarOff className="w-4 h-4" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleUninstall(selectedPlugin.id)}
                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {selectedPlugin.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                <div>
                                    <span className="font-medium">Versão:</span> {selectedPlugin.version}
                                </div>
                                <div>
                                    <span className="font-medium">Autor:</span> {selectedPlugin.author}
                                </div>
                                <div>
                                    <span className="font-medium">Tamanho:</span> {formatFileSize(selectedPlugin.size)}
                                </div>
                                <div>
                                    <span className="font-medium">Downloads:</span> {selectedPlugin.downloads.toLocaleString()}
                                </div>
                                <div>
                                    <span className="font-medium">Avaliação:</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                        <span>{selectedPlugin.rating}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="font-medium">Última atualização:</span> {formatDate(selectedPlugin.lastUpdated)}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                {selectedPlugin.status === 'installed' ? (
                                    <button
                                        onClick={() => selectedPlugin.isEnabled ? handleDisable(selectedPlugin.id) : handleEnable(selectedPlugin.id)}
                                        className={`px-4 py-2 rounded-lg transition-colors ${selectedPlugin.isEnabled
                                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                                : 'bg-green-500 hover:bg-green-600 text-white'
                                            }`}
                                    >
                                        {selectedPlugin.isEnabled ? 'Desabilitar' : 'Habilitar'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleInstall(selectedPlugin)}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                    >
                                        Instalar
                                    </button>
                                )}
                                <button
                                    onClick={() => handleUpdate(selectedPlugin)}
                                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                >
                                    Atualizar
                                </button>
                            </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                                Performance
                            </h5>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <MemoryStick className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600 dark:text-gray-400">Memória</span>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {selectedPlugin.performance.memoryUsage}MB
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <Cpu className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600 dark:text-gray-400">CPU</span>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {selectedPlugin.performance.cpuUsage}%
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600 dark:text-gray-400">Tempo</span>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {selectedPlugin.performance.loadTime}s
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                                Tags
                            </h5>
                            <div className="flex flex-wrap gap-1">
                                {selectedPlugin.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



