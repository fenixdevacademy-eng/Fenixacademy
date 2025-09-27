'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Moon, Sun, Monitor, Eye, EyeOff } from 'lucide-react';

export interface IDETheme {
    id: string;
    name: string;
    type: 'dark' | 'light' | 'high-contrast';
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
    }
    editor: {
        background: string;
        foreground: string;
        selection: string;
        lineHighlight: string;
        cursor: string;
        bracket: string;
        comment: string;
        keyword: string;
        string: string;
        number: string;
        function: string;
        variable: string;
    }
}

interface ThemeManagerProps {
    currentTheme: string;
    onThemeChange: (themeId: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

const ThemeManager: React.FC<ThemeManagerProps> = ({
    currentTheme,
    onThemeChange,
    isOpen,
    onClose
}) => {
    const [themes] = useState<IDETheme[]>([
        {
            id: 'vs-dark',
            name: 'Dark Classic',
            type: 'dark',
            colors: {
                background: '#1e1e1e',
                foreground: '#d4d4d4',
                primary: '#007acc',
                secondary: '#6c757d',
                accent: '#ff6b6b',
                muted: '#6c757d',
                border: '#3c3c3c',
                success: '#28a745',
                warning: '#ffc107',
                error: '#dc3545',
                info: '#17a2b8'
            },
            editor: {
                background: '#1e1e1e',
                foreground: '#d4d4d4',
                selection: '#264f78',
                lineHighlight: '#2a2d2e',
                cursor: '#aeafad',
                bracket: '#ffd700',
                comment: '#6a9955',
                keyword: '#569cd6',
                string: '#ce9178',
                number: '#b5cea8',
                function: '#dcdcaa',
                variable: '#9cdcfe'
            }
        },
        {
            id: 'vs-light',
            name: 'Light Classic',
            type: 'light',
            colors: {
                background: '#ffffff',
                foreground: '#333333',
                primary: '#007acc',
                secondary: '#6c757d',
                accent: '#ff6b6b',
                muted: '#6c757d',
                border: '#e1e4e8',
                success: '#28a745',
                warning: '#ffc107',
                error: '#dc3545',
                info: '#17a2b8'
            },
            editor: {
                background: '#ffffff',
                foreground: '#333333',
                selection: '#add6ff',
                lineHighlight: '#f0f0f0',
                cursor: '#000000',
                bracket: '#ffd700',
                comment: '#6a9955',
                keyword: '#0000ff',
                string: '#a31515',
                number: '#098658',
                function: '#795e26',
                variable: '#001080'
            }
        },
        {
            id: 'hc-black',
            name: 'High Contrast Dark',
            type: 'high-contrast',
            colors: {
                background: '#000000',
                foreground: '#ffffff',
                primary: '#007acc',
                secondary: '#ffffff',
                accent: '#ffff00',
                muted: '#cccccc',
                border: '#ffffff',
                success: '#00ff00',
                warning: '#ffff00',
                error: '#ff0000',
                info: '#00ffff'
            },
            editor: {
                background: '#000000',
                foreground: '#ffffff',
                selection: '#ffff00',
                lineHighlight: '#1a1a1a',
                cursor: '#ffffff',
                bracket: '#ffff00',
                comment: '#00ff00',
                keyword: '#00ffff',
                string: '#ffff00',
                number: '#ffffff',
                function: '#ffffff',
                variable: '#ffffff'
            }
        },
        {
            id: 'monokai',
            name: 'Monokai',
            type: 'dark',
            colors: {
                background: '#272822',
                foreground: '#f8f8f2',
                primary: '#a6e22e',
                secondary: '#75715e',
                accent: '#f92672',
                muted: '#75715e',
                border: '#49483e',
                success: '#a6e22e',
                warning: '#e6db74',
                error: '#f92672',
                info: '#66d9ef'
            },
            editor: {
                background: '#272822',
                foreground: '#f8f8f2',
                selection: '#49483e',
                lineHighlight: '#3e3d32',
                cursor: '#f8f8f0',
                bracket: '#f8f8f2',
                comment: '#75715e',
                keyword: '#f92672',
                string: '#e6db74',
                number: '#ae81ff',
                function: '#a6e22e',
                variable: '#f8f8f2'
            }
        },
        {
            id: 'github-dark',
            name: 'GitHub Dark',
            type: 'dark',
            colors: {
                background: '#0d1117',
                foreground: '#c9d1d9',
                primary: '#58a6ff',
                secondary: '#8b949e',
                accent: '#f85149',
                muted: '#8b949e',
                border: '#30363d',
                success: '#3fb950',
                warning: '#d29922',
                error: '#f85149',
                info: '#58a6ff'
            },
            editor: {
                background: '#0d1117',
                foreground: '#c9d1d9',
                selection: '#264f78',
                lineHighlight: '#161b22',
                cursor: '#c9d1d9',
                bracket: '#f85149',
                comment: '#8b949e',
                keyword: '#ff7b72',
                string: '#a5d6ff',
                number: '#79c0ff',
                function: '#d2a8ff',
                variable: '#ffa657'
            }
        },
        {
            id: 'dracula',
            name: 'Dracula',
            type: 'dark',
            colors: {
                background: '#282a36',
                foreground: '#f8f8f2',
                primary: '#bd93f9',
                secondary: '#6272a4',
                accent: '#ff79c6',
                muted: '#6272a4',
                border: '#44475a',
                success: '#50fa7b',
                warning: '#f1fa8c',
                error: '#ff5555',
                info: '#8be9fd'
            },
            editor: {
                background: '#282a36',
                foreground: '#f8f8f2',
                selection: '#44475a',
                lineHighlight: '#44475a',
                cursor: '#f8f8f0',
                bracket: '#f8f8f2',
                comment: '#6272a4',
                keyword: '#ff79c6',
                string: '#f1fa8c',
                number: '#bd93f9',
                function: '#50fa7b',
                variable: '#8be9fd'
            }
        }
    ]);

    const [previewTheme, setPreviewTheme] = useState<IDETheme | null>(null);

    useEffect(() => {
        const theme = themes.find(t => t.id === currentTheme);
        if (theme) {
            setPreviewTheme(theme);
        }
    }, [currentTheme, themes]);

    const applyTheme = (theme: IDETheme) => {
        // Aplicar tema ao CSS custom properties
        const root = document.documentElement;

        // Aplicar cores principais
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Aplicar cores do editor
        Object.entries(theme.editor).forEach(([key, value]) => {
            root.style.setProperty(`--editor-${key}`, value);
        });

        // Aplicar tema ao Monaco Editor
        if (window.monaco) {
            window.monaco.editor.setTheme(theme.id);
        }
    }

    const handleThemeSelect = (theme: IDETheme) => {
        setPreviewTheme(theme);
        applyTheme(theme);
        onThemeChange(theme.id);
    }

    const getThemeIcon = (theme: IDETheme) => {
        switch (theme.type) {
            case 'dark':
                return <Moon className="w-4 h-4" />;
            case 'light':
                return <Sun className="w-4 h-4" />;
            case 'high-contrast':
                return <Eye className="w-4 h-4" />;
            default:
                return <Monitor className="w-4 h-4" />;
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <Palette className="w-6 h-6 text-blue-400" />
                        <h2 className="text-xl font-bold text-white">Gerenciador de Temas</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${currentTheme === theme.id
                                    ? 'border-blue-500 bg-blue-900/20'
                                    : 'border-gray-600 hover:border-gray-500'
                                }`}
                            onClick={() => handleThemeSelect(theme)}
                        >
                            <div className="flex items-center space-x-2 mb-3">
                                {getThemeIcon(theme)}
                                <h3 className="font-semibold text-white">{theme.name}</h3>
                                {currentTheme === theme.id && (
                                    <span className="text-blue-400 text-sm">Ativo</span>
                                )}
                            </div>

                            {/* Preview das cores */}
                            <div className="space-y-2">
                                <div className="flex space-x-1">
                                    <div
                                        className="w-6 h-6 rounded"
                                        style={{ backgroundColor: theme.colors.background }}
                                        title="Background"
                                    />
                                    <div
                                        className="w-6 h-6 rounded"
                                        style={{ backgroundColor: theme.colors.foreground }}
                                        title="Foreground"
                                    />
                                    <div
                                        className="w-6 h-6 rounded"
                                        style={{ backgroundColor: theme.colors.primary }}
                                        title="Primary"
                                    />
                                    <div
                                        className="w-6 h-6 rounded"
                                        style={{ backgroundColor: theme.colors.accent }}
                                        title="Accent"
                                    />
                                </div>
                                <div className="flex space-x-1">
                                    <div
                                        className="w-6 h-6 rounded"
                                        style={{ backgroundColor: theme.colors.success }}
                                        title="Success"
                                    />
                                    <div
                                        className="w-6 h-6 rounded"
                                        style={{ backgroundColor: theme.colors.warning }}
                                        title="Warning"
                                    />
                                    <div
                                        className="w-6 h-6 rounded"
                                        style={{ backgroundColor: theme.colors.error }}
                                        title="Error"
                                    />
                                    <div
                                        className="w-6 h-6 rounded"
                                        style={{ backgroundColor: theme.colors.info }}
                                        title="Info"
                                    />
                                </div>
                            </div>

                            {/* Preview do editor */}
                            <div className="mt-3">
                                <div
                                    className="rounded p-2 text-xs font-mono"
                                    style={{
                                        backgroundColor: theme.editor.background,
                                        color: theme.editor.foreground
                                    }}
                                >
                                    <div style={{ color: theme.editor.comment }}>
                                        // Preview do editor
                                    </div>
                                    <div style={{ color: theme.editor.keyword }}>
                                        function
                                    </div>
                                    <div style={{ color: theme.editor.function }}>
                                        hello
                                    </div>
                                    <div style={{ color: theme.editor.string }}>
                                        "Hello World"
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Preview em tempo real */}
                {previewTheme && (
                    <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-3">Preview em Tempo Real</h3>
                        <div
                            className="rounded-lg p-4"
                            style={{
                                backgroundColor: previewTheme.colors.background,
                                color: previewTheme.colors.foreground,
                                border: `1px solid ${previewTheme.colors.border}`
                            }}
                        >
                            <div className="flex items-center space-x-2 mb-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: previewTheme.colors.error }}
                                />
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: previewTheme.colors.warning }}
                                />
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: previewTheme.colors.success }}
                                />
                                <span className="text-sm ml-2">Fenix IDE</span>
                            </div>
                            <div className="space-y-2">
                                <div
                                    className="p-2 rounded"
                                    style={{
                                        backgroundColor: previewTheme.colors.muted + '20',
                                        color: previewTheme.colors.foreground
                                    }}
                                >
                                    <div style={{ color: previewTheme.colors.comment }}>
                                        // Código de exemplo
                                    </div>
                                    <div style={{ color: previewTheme.colors.keyword }}>
                                        const
                                    </div>
                                    <div style={{ color: previewTheme.colors.variable }}>
                                        message
                                    </div>
                                    <div style={{ color: previewTheme.colors.string }}>
                                        = "Hello, Fenix Academy!"
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            if (previewTheme) {
                                onThemeChange(previewTheme.id);
                            }
                            onClose();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Aplicar Tema
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ThemeManager;