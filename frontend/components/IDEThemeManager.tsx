'use client';

import React, { useState, useEffect } from 'react';
import {
    Palette,
    Moon,
    Sun,
    Monitor,
    Download,
    Upload,
    Settings,
    Eye,
    Check,
    Plus,
    Trash2,
    Edit,
    Save
} from 'lucide-react';

interface Theme {
    id: string;
    name: string;
    displayName: string;
    description: string;
    type: 'light' | 'dark' | 'auto';
    colors: {
        background: string;
        foreground: string;
        primary: string;
        secondary: string;
        accent: string;
        muted: string;
        border: string;
        success: string;
        warning: string;
        error: string;
        info: string;
    };
    syntax: {
        keyword: string;
        string: string;
        comment: string;
        number: string;
        function: string;
        variable: string;
        operator: string;
        punctuation: string;
    };
    isCustom: boolean;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

interface IDEThemeManagerProps {
    className?: string;
    onThemeChange?: (theme: Theme) => void;
    onThemeCreate?: (theme: Omit<Theme, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onThemeUpdate?: (theme: Theme) => void;
    onThemeDelete?: (themeId: string) => void;
}

const defaultThemes: Theme[] = [
    {
        id: 'default-light',
        name: 'default-light',
        displayName: 'Light Default',
        description: 'Tema claro padrão do IDE',
        type: 'light',
        colors: {
            background: '#ffffff',
            foreground: '#000000',
            primary: '#0066cc',
            secondary: '#6c757d',
            accent: '#28a745',
            muted: '#f8f9fa',
            border: '#dee2e6',
            success: '#28a745',
            warning: '#ffc107',
            error: '#dc3545',
            info: '#17a2b8'
        },
        syntax: {
            keyword: '#0000ff',
            string: '#008000',
            comment: '#808080',
            number: '#ff0000',
            function: '#795e26',
            variable: '#001080',
            operator: '#000000',
            punctuation: '#000000'
        },
        isCustom: false,
        isDefault: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    },
    {
        id: 'default-dark',
        name: 'default-dark',
        displayName: 'Dark Default',
        description: 'Tema escuro padrão do IDE',
        type: 'dark',
        colors: {
            background: '#1e1e1e',
            foreground: '#d4d4d4',
            primary: '#007acc',
            secondary: '#6c757d',
            accent: '#28a745',
            muted: '#2d2d30',
            border: '#3e3e42',
            success: '#28a745',
            warning: '#ffc107',
            error: '#f44747',
            info: '#17a2b8'
        },
        syntax: {
            keyword: '#569cd6',
            string: '#ce9178',
            comment: '#6a9955',
            number: '#b5cea8',
            function: '#dcdcaa',
            variable: '#9cdcfe',
            operator: '#d4d4d4',
            punctuation: '#d4d4d4'
        },
        isCustom: false,
        isDefault: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    },
    {
        id: 'monokai',
        name: 'monokai',
        displayName: 'Monokai',
        description: 'Tema inspirado no Monokai',
        type: 'dark',
        colors: {
            background: '#272822',
            foreground: '#f8f8f2',
            primary: '#f92672',
            secondary: '#a6e22e',
            accent: '#e6db74',
            muted: '#3e3d32',
            border: '#49483e',
            success: '#a6e22e',
            warning: '#e6db74',
            error: '#f92672',
            info: '#66d9ef'
        },
        syntax: {
            keyword: '#f92672',
            string: '#e6db74',
            comment: '#75715e',
            number: '#ae81ff',
            function: '#a6e22e',
            variable: '#f8f8f2',
            operator: '#f8f8f2',
            punctuation: '#f8f8f2'
        },
        isCustom: false,
        isDefault: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    }
];

export function IDEThemeManager({
    className = '',
    onThemeChange,
    onThemeCreate,
    onThemeUpdate,
    onThemeDelete
}: IDEThemeManagerProps) {
    const [themes, setThemes] = useState<Theme[]>(defaultThemes);
    const [selectedTheme, setSelectedTheme] = useState<Theme | null>(defaultThemes[0]);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filters = ['all', 'light', 'dark', 'custom'];

    const filteredThemes = themes.filter(theme => {
        const matchesFilter = filter === 'all' || theme.type === filter || (filter === 'custom' && theme.isCustom);
        const matchesSearch = theme.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            theme.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleThemeSelect = (theme: Theme) => {
        setSelectedTheme(theme);
        onThemeChange?.(theme);
    };

    const handleCreateTheme = () => {
        const newTheme: Theme = {
            id: `custom-${Date.now()}`,
            name: 'new-theme',
            displayName: 'New Theme',
            description: 'Custom theme created by user',
            type: 'dark',
            colors: {
                background: '#1e1e1e',
                foreground: '#d4d4d4',
                primary: '#007acc',
                secondary: '#6c757d',
                accent: '#28a745',
                muted: '#2d2d30',
                border: '#3e3e42',
                success: '#28a745',
                warning: '#ffc107',
                error: '#f44747',
                info: '#17a2b8'
            },
            syntax: {
                keyword: '#569cd6',
                string: '#ce9178',
                comment: '#6a9955',
                number: '#b5cea8',
                function: '#dcdcaa',
                variable: '#9cdcfe',
                operator: '#d4d4d4',
                punctuation: '#d4d4d4'
            },
            isCustom: true,
            isDefault: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setThemes(prev => [...prev, newTheme]);
        setEditingTheme(newTheme);
        setIsEditing(true);
        onThemeCreate?.(newTheme);
    };

    const handleEditTheme = (theme: Theme) => {
        setEditingTheme(theme);
        setIsEditing(true);
    };

    const handleSaveTheme = () => {
        if (!editingTheme) return;

        const updatedTheme = {
            ...editingTheme,
            updatedAt: new Date().toISOString()
        };

        setThemes(prev =>
            prev.map(theme => theme.id === editingTheme.id ? updatedTheme : theme)
        );
        setSelectedTheme(updatedTheme);
        setIsEditing(false);
        setEditingTheme(null);
        onThemeUpdate?.(updatedTheme);
    };

    const handleDeleteTheme = (themeId: string) => {
        if (themes.find(t => t.id === themeId)?.isDefault) return;

        setThemes(prev => prev.filter(theme => theme.id !== themeId));
        if (selectedTheme?.id === themeId) {
            setSelectedTheme(themes.find(t => t.id !== themeId) || themes[0]);
        }
        onThemeDelete?.(themeId);
    };

    const handleColorChange = (category: 'colors' | 'syntax', key: string, value: string) => {
        if (!editingTheme) return;

        setEditingTheme(prev => ({
            ...prev!,
            [category]: {
                ...prev![category],
                [key]: value
            }
        }));
    };

    const getThemeIcon = (type: string) => {
        switch (type) {
            case 'light':
                return <Sun className="w-4 h-4" />;
            case 'dark':
                return <Moon className="w-4 h-4" />;
            case 'auto':
                return <Monitor className="w-4 h-4" />;
            default:
                return <Palette className="w-4 h-4" />;
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Palette className="w-6 h-6 text-purple-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Theme Manager
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCreateTheme}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Tema
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4">
                {/* Filters */}
                <div className="mb-6 space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Buscar temas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {filters.map(filterOption => (
                                <option key={filterOption} value={filterOption}>
                                    {filterOption === 'all' ? 'Todos os temas' :
                                        filterOption === 'custom' ? 'Personalizados' :
                                            filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Themes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {filteredThemes.map((theme) => (
                        <div
                            key={theme.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTheme?.id === theme.id
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                            onClick={() => handleThemeSelect(theme)}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    {getThemeIcon(theme.type)}
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {theme.displayName}
                                    </h4>
                                    {theme.isDefault && (
                                        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                                            Padrão
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    {theme.isCustom && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditTheme(theme);
                                            }}
                                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                        >
                                            <Edit className="w-3 h-3" />
                                        </button>
                                    )}
                                    {theme.isCustom && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteTheme(theme.id);
                                            }}
                                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {theme.description}
                            </p>

                            {/* Color Preview */}
                            <div className="grid grid-cols-4 gap-1 mb-3">
                                <div
                                    className="h-8 rounded"
                                    style={{ backgroundColor: theme.colors.background }}
                                    title="Background"
                                ></div>
                                <div
                                    className="h-8 rounded"
                                    style={{ backgroundColor: theme.colors.primary }}
                                    title="Primary"
                                ></div>
                                <div
                                    className="h-8 rounded"
                                    style={{ backgroundColor: theme.colors.accent }}
                                    title="Accent"
                                ></div>
                                <div
                                    className="h-8 rounded"
                                    style={{ backgroundColor: theme.colors.muted }}
                                    title="Muted"
                                ></div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>{theme.type}</span>
                                {selectedTheme?.id === theme.id && (
                                    <Check className="w-4 h-4 text-purple-500" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Theme Editor */}
                {isEditing && editingTheme && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Editar Tema: {editingTheme.displayName}
                            </h4>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSaveTheme}
                                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Salvar
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditingTheme(null);
                                    }}
                                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Colors */}
                            <div>
                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Cores Principais
                                </h5>
                                <div className="space-y-3">
                                    {Object.entries(editingTheme.colors).map(([key, value]) => (
                                        <div key={key} className="flex items-center gap-3">
                                            <label className="w-24 text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {key}:
                                            </label>
                                            <input
                                                type="color"
                                                value={value}
                                                onChange={(e) => handleColorChange('colors', key, e.target.value)}
                                                className="w-12 h-8 border border-gray-300 dark:border-gray-600 rounded"
                                            />
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleColorChange('colors', key, e.target.value)}
                                                className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Syntax Colors */}
                            <div>
                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Cores de Sintaxe
                                </h5>
                                <div className="space-y-3">
                                    {Object.entries(editingTheme.syntax).map(([key, value]) => (
                                        <div key={key} className="flex items-center gap-3">
                                            <label className="w-24 text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {key}:
                                            </label>
                                            <input
                                                type="color"
                                                value={value}
                                                onChange={(e) => handleColorChange('syntax', key, e.target.value)}
                                                className="w-12 h-8 border border-gray-300 dark:border-gray-600 rounded"
                                            />
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleColorChange('syntax', key, e.target.value)}
                                                className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}