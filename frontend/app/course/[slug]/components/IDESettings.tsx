'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Palette, Code, Zap, Target, Cpu, Save, RotateCcw, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

interface IDESettingsProps {
    className?: string;
    onSettingsChange?: (settings: IDESettings) => void;
    onSave?: (settings: IDESettings) => void;
    onReset?: () => void;
}

interface IDESettings {
    theme: {
        name: string;
        type: 'light' | 'dark' | 'auto';
        colors: {
            background: string;
            foreground: string;
            primary: string;
            secondary: string;
            accent: string;
        };
    };
    editor: {
        fontSize: number;
        fontFamily: string;
        tabSize: number;
        wordWrap: boolean;
        lineNumbers: boolean;
        autoSave: boolean;
        autoComplete: boolean;
    };
    performance: {
        enableLazyLoading: boolean;
        maxFileSize: number;
        maxMemoryUsage: number;
        enableCaching: boolean;
    };
    features: {
        enableAI: boolean;
        enableGit: boolean;
        enableDebugger: boolean;
        enableTerminal: boolean;
        enableExtensions: boolean;
    };
}

const defaultSettings: IDESettings = {
    theme: {
        name: 'Dark Pro',
        type: 'dark',
        colors: {
            background: '#1e1e1e',
            foreground: '#d4d4d4',
            primary: '#007acc',
            secondary: '#6c757d',
            accent: '#ff6b6b'
        }
    },
    editor: {
        fontSize: 14,
        fontFamily: 'Fira Code',
        tabSize: 2,
        wordWrap: true,
        lineNumbers: true,
        autoSave: true,
        autoComplete: true
    },
    performance: {
        enableLazyLoading: true,
        maxFileSize: 10,
        maxMemoryUsage: 512,
        enableCaching: true
    },
    features: {
        enableAI: true,
        enableGit: true,
        enableDebugger: true,
        enableTerminal: true,
        enableExtensions: true
    }
};

const themes = [
    {
        name: 'Dark Pro',
        type: 'dark' as const,
        colors: {
            background: '#1e1e1e',
            foreground: '#d4d4d4',
            primary: '#007acc',
            secondary: '#6c757d',
            accent: '#ff6b6b'
        }
    },
    {
        name: 'Light Pro',
        type: 'light' as const,
        colors: {
            background: '#ffffff',
            foreground: '#333333',
            primary: '#007acc',
            secondary: '#6c757d',
            accent: '#ff6b6b'
        }
    },
    {
        name: 'Monokai',
        type: 'dark' as const,
        colors: {
            background: '#272822',
            foreground: '#f8f8f2',
            primary: '#a6e22e',
            secondary: '#f92672',
            accent: '#fd971f'
        }
    }
];

const fontFamilies = [
    'Fira Code',
    'JetBrains Mono',
    'Source Code Pro',
    'Consolas',
    'Monaco',
    'Courier New'
];

export function IDESettings({
    className = '',
    onSettingsChange,
    onSave,
    onReset
}: IDESettingsProps) {
    const [settings, setSettings] = useState<IDESettings>(defaultSettings);
    const [activeTab, setActiveTab] = useState<'appearance' | 'editor' | 'performance' | 'features'>('appearance');
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        const savedSettings = localStorage.getItem('ide-settings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings({ ...defaultSettings, ...parsed });
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        }
    }, []);

    const updateSettings = (updates: Partial<IDESettings>) => {
        setSettings(prev => {
            const newSettings = { ...prev, ...updates };
            setHasUnsavedChanges(true);
            onSettingsChange?.(newSettings);
            return newSettings;
        });
    };

    const handleSave = () => {
        localStorage.setItem('ide-settings', JSON.stringify(settings));
        setHasUnsavedChanges(false);
        onSave?.(settings);
    };

    const handleReset = () => {
        setSettings(defaultSettings);
        setHasUnsavedChanges(true);
        onReset?.();
    };

    const handleThemeChange = (theme: typeof themes[0]) => {
        updateSettings({
            theme: {
                name: theme.name,
                type: theme.type,
                colors: theme.colors
            }
        });
    };

    const handleEditorSettingChange = (key: keyof IDESettings['editor'], value: any) => {
        updateSettings({
            editor: {
                ...settings.editor,
                [key]: value
            }
        });
    };

    const handlePerformanceSettingChange = (key: keyof IDESettings['performance'], value: any) => {
        updateSettings({
            performance: {
                ...settings.performance,
                [key]: value
            }
        });
    };

    const handleFeatureToggle = (key: keyof IDESettings['features']) => {
        updateSettings({
            features: {
                ...settings.features,
                [key]: !settings.features[key]
            }
        });
    };

    const tabs = [
        { id: 'appearance', label: 'Aparência', icon: Palette },
        { id: 'editor', label: 'Editor', icon: Code },
        { id: 'performance', label: 'Performance', icon: Zap },
        { id: 'features', label: 'Recursos', icon: Target }
    ] as const;

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Settings className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Configurações do IDE
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Visualizar"
                        >
                            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={handleReset}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Resetar"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!hasUnsavedChanges}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Salvar
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${activeTab === tab.id
                                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex h-96">
                {/* Settings Panel */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {activeTab === 'appearance' && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Tema
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {themes.map((theme) => (
                                        <button
                                            key={theme.name}
                                            onClick={() => handleThemeChange(theme)}
                                            className={`p-4 border-2 rounded-lg transition-colors ${settings.theme.name === theme.name
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div
                                                    className="w-4 h-4 rounded-full"
                                                    style={{ backgroundColor: theme.colors.primary }}
                                                ></div>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {theme.name}
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {theme.type}
                                                </span>
                                            </div>
                                            <div className="flex gap-1">
                                                <div
                                                    className="w-8 h-4 rounded"
                                                    style={{ backgroundColor: theme.colors.background }}
                                                ></div>
                                                <div
                                                    className="w-8 h-4 rounded"
                                                    style={{ backgroundColor: theme.colors.primary }}
                                                ></div>
                                                <div
                                                    className="w-8 h-4 rounded"
                                                    style={{ backgroundColor: theme.colors.accent }}
                                                ></div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'editor' && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Configurações do Editor
                                </h4>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tamanho da Fonte
                                            </label>
                                            <input
                                                type="range"
                                                min="10"
                                                max="24"
                                                value={settings.editor.fontSize}
                                                onChange={(e) => handleEditorSettingChange('fontSize', parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {settings.editor.fontSize}px
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Fonte
                                            </label>
                                            <select
                                                value={settings.editor.fontFamily}
                                                onChange={(e) => handleEditorSettingChange('fontFamily', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {fontFamilies.map((font) => (
                                                    <option key={font} value={font}>
                                                        {font}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {Object.entries(settings.editor).filter(([key]) =>
                                            typeof settings.editor[key as keyof typeof settings.editor] === 'boolean'
                                        ).map(([key, value]) => (
                                            <label key={key} className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={value as boolean}
                                                    onChange={(e) => handleEditorSettingChange(key as keyof IDESettings['editor'], e.target.checked)}
                                                    className="rounded"
                                                />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'performance' && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Configurações de Performance
                                </h4>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tamanho Máximo do Arquivo (MB)
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="100"
                                                value={settings.performance.maxFileSize}
                                                onChange={(e) => handlePerformanceSettingChange('maxFileSize', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Uso Máximo de Memória (MB)
                                            </label>
                                            <input
                                                type="number"
                                                min="128"
                                                max="2048"
                                                value={settings.performance.maxMemoryUsage}
                                                onChange={(e) => handlePerformanceSettingChange('maxMemoryUsage', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {Object.entries(settings.performance).filter(([key]) =>
                                            typeof settings.performance[key as keyof typeof settings.performance] === 'boolean'
                                        ).map(([key, value]) => (
                                            <label key={key} className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={value as boolean}
                                                    onChange={(e) => handlePerformanceSettingChange(key as keyof IDESettings['performance'], e.target.checked)}
                                                    className="rounded"
                                                />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'features' && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Recursos Disponíveis
                                </h4>
                                <div className="space-y-3">
                                    {Object.entries(settings.features).map(([key, value]) => (
                                        <label key={key} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={value}
                                                    onChange={() => handleFeatureToggle(key as keyof IDESettings['features'])}
                                                    className="rounded"
                                                />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {value ? (
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-gray-400" />
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview Panel */}
                {showPreview && (
                    <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 p-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Visualização
                        </h4>
                        <div
                            className="h-full rounded-lg border p-4 font-mono text-sm"
                            style={{
                                backgroundColor: settings.theme.colors.background,
                                color: settings.theme.colors.foreground,
                                fontSize: `${settings.editor.fontSize}px`,
                                fontFamily: settings.editor.fontFamily
                            }}
                        >
                            <div className="space-y-2">
                                <div style={{ color: settings.theme.colors.primary }}>
                                    function helloWorld() {'{'}
                                </div>
                                <div className="ml-4" style={{ color: settings.theme.colors.foreground }}>
                                    console.log('Hello, World!');
                                </div>
                                <div style={{ color: settings.theme.colors.primary }}>
                                    {'}'}
                                </div>
                                <div className="mt-4" style={{ color: settings.theme.colors.accent }}>
                  // Comentário de exemplo
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



