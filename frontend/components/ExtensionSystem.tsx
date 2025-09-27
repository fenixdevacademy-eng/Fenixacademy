'use client';

import React, { useState, useEffect } from 'react';
import {
    Puzzle,
    Download,
    Trash2,
    Settings,
    Play,
    Pause,
    RotateCcw,
    CheckCircle,
    AlertCircle,
    Code,
    Zap
} from 'lucide-react';

interface Extension {
    id: string;
    name: string;
    version: string;
    description: string;
    author: string;
    category: string;
    status: 'active' | 'inactive' | 'error' | 'loading';
    size: string;
    dependencies: string[];
    features: string[];
    icon?: string;
}

interface ExtensionSystemProps {
    className?: string;
    onExtensionToggle?: (extension: Extension) => void;
    onExtensionInstall?: (extension: Extension) => void;
    onExtensionRemove?: (extension: Extension) => void;
}

const mockExtensions: Extension[] = [
    {
        id: 'code-formatter',
        name: 'Code Formatter',
        version: '1.2.0',
        description: 'Formata código automaticamente com Prettier',
        author: 'Fenix Team',
        category: 'Code Quality',
        status: 'active',
        size: '2.1 MB',
        dependencies: ['prettier'],
        features: ['Auto Format', 'Save Format', 'Format on Paste'],
        icon: '🎨'
    },
    {
        id: 'syntax-highlighter',
        name: 'Syntax Highlighter',
        version: '2.0.1',
        description: 'Destaque de sintaxe para múltiplas linguagens',
        author: 'Fenix Team',
        category: 'Editor',
        status: 'active',
        size: '5.3 MB',
        dependencies: ['prismjs'],
        features: ['Multi Language', 'Theme Support', 'Line Numbers'],
        icon: '🌈'
    },
    {
        id: 'auto-complete',
        name: 'Auto Complete',
        version: '1.5.2',
        description: 'Sugestões inteligentes de código',
        author: 'Fenix Team',
        category: 'Intelligence',
        status: 'inactive',
        size: '8.7 MB',
        dependencies: ['typescript', 'monaco-editor'],
        features: ['IntelliSense', 'Code Snippets', 'API Suggestions'],
        icon: '🧠'
    },
    {
        id: 'git-integration',
        name: 'Git Integration',
        version: '3.1.0',
        description: 'Integração completa com Git',
        author: 'Fenix Team',
        category: 'Version Control',
        status: 'error',
        size: '12.4 MB',
        dependencies: ['git', 'node-git'],
        features: ['Git Status', 'Commit History', 'Branch Management'],
        icon: '📁'
    },
    {
        id: 'debugger',
        name: 'Debugger',
        version: '2.3.1',
        description: 'Ferramenta de debug avançada',
        author: 'Fenix Team',
        category: 'Debugging',
        status: 'loading',
        size: '15.2 MB',
        dependencies: ['node-inspector'],
        features: ['Breakpoints', 'Step Through', 'Variable Inspector'],
        icon: '🐛'
    }
];

export function ExtensionSystem({
    className = '',
    onExtensionToggle,
    onExtensionInstall,
    onExtensionRemove
}: ExtensionSystemProps) {
    const [extensions, setExtensions] = useState<Extension[]>(mockExtensions);
    const [filter, setFilter] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'name' | 'status' | 'category'>('name');

    const categories = ['all', ...Array.from(new Set(extensions.map(ext => ext.category)))];

    const filteredExtensions = extensions
        .filter(ext => {
            const matchesFilter = ext.name.toLowerCase().includes(filter.toLowerCase()) ||
                ext.description.toLowerCase().includes(filter.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || ext.category === categoryFilter;
            return matchesFilter && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });

    const handleToggleExtension = (extension: Extension) => {
        const newStatus = extension.status === 'active' ? 'inactive' : 'active';
        const updatedExtension = { ...extension, status: newStatus };

        setExtensions(prev =>
            prev.map(ext => ext.id === extension.id ? updatedExtension : ext)
        );

        onExtensionToggle?.(updatedExtension);
    };

    const handleInstallExtension = (extension: Extension) => {
        const updatedExtension = { ...extension, status: 'loading' as const };

        setExtensions(prev =>
            prev.map(ext => ext.id === extension.id ? updatedExtension : ext)
        );

        // Simular instalação
        setTimeout(() => {
            const installedExtension = { ...extension, status: 'active' as const };
            setExtensions(prev =>
                prev.map(ext => ext.id === extension.id ? installedExtension : ext)
            );
            onExtensionInstall?.(installedExtension);
        }, 2000);
    };

    const handleRemoveExtension = (extension: Extension) => {
        setExtensions(prev => prev.filter(ext => ext.id !== extension.id));
        onExtensionRemove?.(extension);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'inactive':
                return <Pause className="w-4 h-4 text-gray-400" />;
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'loading':
                return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>;
            default:
                return <Play className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'text-green-500 bg-green-100 dark:bg-green-900/20';
            case 'inactive':
                return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
            case 'error':
                return 'text-red-500 bg-red-100 dark:bg-red-900/20';
            case 'loading':
                return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
            default:
                return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
        }
    };

    const activeCount = extensions.filter(ext => ext.status === 'active').length;
    const totalCount = extensions.length;

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Puzzle className="w-6 h-6 text-blue-500" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Sistema de Extensões
                    </h3>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {activeCount}/{totalCount} ativas
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 space-y-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Buscar extensões..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'Todas as categorias' : category}
                            </option>
                        ))}
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="name">Nome</option>
                        <option value="status">Status</option>
                        <option value="category">Categoria</option>
                    </select>
                </div>
            </div>

            {/* Extensions List */}
            <div className="space-y-3">
                {filteredExtensions.map((extension) => (
                    <div
                        key={extension.id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                                <div className="text-2xl">{extension.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {extension.name}
                                        </h4>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            v{extension.version}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(extension.status)}`}>
                                            {extension.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {extension.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                        <span>Por {extension.author}</span>
                                        <span>•</span>
                                        <span>{extension.size}</span>
                                        <span>•</span>
                                        <span>{extension.category}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {extension.features.slice(0, 3).map((feature, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                        {extension.features.length > 3 && (
                                            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                                +{extension.features.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                                {getStatusIcon(extension.status)}

                                {extension.status === 'inactive' && (
                                    <button
                                        onClick={() => handleToggleExtension(extension)}
                                        className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/20 rounded transition-colors"
                                        title="Ativar extensão"
                                    >
                                        <Play className="w-4 h-4" />
                                    </button>
                                )}

                                {extension.status === 'active' && (
                                    <button
                                        onClick={() => handleToggleExtension(extension)}
                                        className="p-2 text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 rounded transition-colors"
                                        title="Desativar extensão"
                                    >
                                        <Pause className="w-4 h-4" />
                                    </button>
                                )}

                                {extension.status === 'error' && (
                                    <button
                                        onClick={() => handleInstallExtension(extension)}
                                        className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                                        title="Reinstalar extensão"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                )}

                                <button
                                    onClick={() => handleRemoveExtension(extension)}
                                    className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                                    title="Remover extensão"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredExtensions.length === 0 && (
                <div className="text-center py-8">
                    <Puzzle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                        Nenhuma extensão encontrada
                    </p>
                </div>
            )}
        </div>
    );
}