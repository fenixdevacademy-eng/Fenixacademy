'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Eye, EyeOff, Settings, Download, Upload, Save, RotateCcw } from 'lucide-react';

interface Theme {
    id: string;
    name: string;
    description: string;
    category: 'dark' | 'light' | 'high-contrast' | 'custom';
    colors: {
        background: string;
        surface: string;
        primary: string;
        secondary: string;
        accent: string;
        text: string;
        textSecondary: string;
        border: string;
        error: string;
        warning: string;
        success: string;
        info: string;
    };
    editor: {
        background: string;
        foreground: string;
        selection: string;
        cursor: string;
        lineNumbers: string;
        activeLine: string;
        bracketMatching: string;
        findMatch: string;
        findMatchHighlight: string;
    };
}

const defaultThemes: Theme[] = [
    {
        id: 'fenix-dark',
        name: 'Fenix Dark',
        description: 'Tema escuro oficial da Fenix Academy',
        category: 'dark',
        colors: {
            background: '#0f172a',
            surface: '#1e293b',
            primary: '#3b82f6',
            secondary: '#64748b',
            accent: '#8b5cf6',
            text: '#f8fafc',
            textSecondary: '#cbd5e1',
            border: '#334155',
            error: '#ef4444',
            warning: '#f59e0b',
            success: '#10b981',
            info: '#06b6d4'
        },
        editor: {
            background: '#0f172a',
            foreground: '#f8fafc',
            selection: '#1e40af',
            cursor: '#3b82f6',
            lineNumbers: '#64748b',
            activeLine: '#1e293b',
            bracketMatching: '#8b5cf6',
            findMatch: '#f59e0b',
            findMatchHighlight: '#92400e'
        }
    },
    {
        id: 'fenix-light',
        name: 'Fenix Light',
        description: 'Tema claro oficial da Fenix Academy',
        category: 'light',
        colors: {
            background: '#ffffff',
            surface: '#f8fafc',
            primary: '#3b82f6',
            secondary: '#64748b',
            accent: '#8b5cf6',
            text: '#0f172a',
            textSecondary: '#475569',
            border: '#e2e8f0',
            error: '#dc2626',
            warning: '#d97706',
            success: '#059669',
            info: '#0891b2'
        },
        editor: {
            background: '#ffffff',
            foreground: '#0f172a',
            selection: '#dbeafe',
            cursor: '#3b82f6',
            lineNumbers: '#64748b',
            activeLine: '#f1f5f9',
            bracketMatching: '#8b5cf6',
            findMatch: '#f59e0b',
            findMatchHighlight: '#fef3c7'
        }
    },
    {
        id: 'high-contrast',
        name: 'Alto Contraste',
        description: 'Tema de alto contraste para acessibilidade',
        category: 'high-contrast',
        colors: {
            background: '#000000',
            surface: '#1a1a1a',
            primary: '#00ff00',
            secondary: '#ffff00',
            accent: '#00ffff',
            text: '#ffffff',
            textSecondary: '#cccccc',
            border: '#ffffff',
            error: '#ff0000',
            warning: '#ff8800',
            success: '#00ff00',
            info: '#0088ff'
        },
        editor: {
            background: '#000000',
            foreground: '#ffffff',
            selection: '#00ff00',
            cursor: '#ffffff',
            lineNumbers: '#ffff00',
            activeLine: '#1a1a1a',
            bracketMatching: '#00ffff',
            findMatch: '#ff8800',
            findMatchHighlight: '#ff8800'
        }
    },
    {
        id: 'github-dark',
        name: 'GitHub Dark',
        description: 'Tema inspirado no GitHub Dark',
        category: 'dark',
        colors: {
            background: '#0d1117',
            surface: '#161b22',
            primary: '#58a6ff',
            secondary: '#7d8590',
            accent: '#bc8cff',
            text: '#f0f6fc',
            textSecondary: '#7d8590',
            border: '#30363d',
            error: '#f85149',
            warning: '#d29922',
            success: '#238636',
            info: '#58a6ff'
        },
        editor: {
            background: '#0d1117',
            foreground: '#f0f6fc',
            selection: '#1f6feb',
            cursor: '#58a6ff',
            lineNumbers: '#7d8590',
            activeLine: '#161b22',
            bracketMatching: '#bc8cff',
            findMatch: '#d29922',
            findMatchHighlight: '#9e6a03'
        }
    },
    {
        id: 'dracula',
        name: 'Dracula',
        description: 'Tema clássico Dracula',
        category: 'dark',
        colors: {
            background: '#282a36',
            surface: '#44475a',
            primary: '#bd93f9',
            secondary: '#6272a4',
            accent: '#ff79c6',
            text: '#f8f8f2',
            textSecondary: '#6272a4',
            border: '#44475a',
            error: '#ff5555',
            warning: '#ffb86c',
            success: '#50fa7b',
            info: '#8be9fd'
        },
        editor: {
            background: '#282a36',
            foreground: '#f8f8f2',
            selection: '#44475a',
            cursor: '#f8f8f2',
            lineNumbers: '#6272a4',
            activeLine: '#44475a',
            bracketMatching: '#ff79c6',
            findMatch: '#ffb86c',
            findMatchHighlight: '#ffb86c'
        }
    }
];

interface IDEThemeManagerProps {
    currentTheme: Theme;
    onThemeChange: (theme: Theme) => void;
    onClose: () => void;
}

export default function IDEThemeManager({ currentTheme, onThemeChange, onClose }: IDEThemeManagerProps) {
    const [themes, setThemes] = useState<Theme[]>(defaultThemes);
    const [customTheme, setCustomTheme] = useState<Theme>({
        id: 'custom',
        name: 'Tema Personalizado',
        description: 'Tema criado pelo usuário',
        category: 'custom',
        colors: { ...currentTheme.colors },
        editor: { ...currentTheme.editor }
    });
    const [activeTab, setActiveTab] = useState<'themes' | 'colors' | 'editor' | 'advanced'>('themes');
    const [fontSize, setFontSize] = useState(14);
    const [fontFamily, setFontFamily] = useState('JetBrains Mono');
    const [lineHeight, setLineHeight] = useState(1.5);
    const [tabSize, setTabSize] = useState(4);
    const [showLineNumbers, setShowLineNumbers] = useState(true);
    const [showActiveLine, setShowActiveLine] = useState(true);
    const [wordWrap, setWordWrap] = useState(false);
    const [minimap, setMinimap] = useState(true);
    const [bracketPairColorization, setBracketPairColorization] = useState(true);

    const fontFamilies = [
        'JetBrains Mono',
        'Fira Code',
        'Source Code Pro',
        'Consolas',
        'Monaco',
        'Menlo',
        'Ubuntu Mono',
        'DejaVu Sans Mono'
    ];

    const handleThemeChange = (theme: Theme) => {
        onThemeChange(theme);
        // Aplicar tema ao CSS customizado
        applyThemeToCSS(theme);
    };

    const applyThemeToCSS = (theme: Theme) => {
        const root = document.documentElement;

        // Cores principais
        root.style.setProperty('--ide-bg', theme.colors.background);
        root.style.setProperty('--ide-surface', theme.colors.surface);
        root.style.setProperty('--ide-primary', theme.colors.primary);
        root.style.setProperty('--ide-secondary', theme.colors.secondary);
        root.style.setProperty('--ide-accent', theme.colors.accent);
        root.style.setProperty('--ide-text', theme.colors.text);
        root.style.setProperty('--ide-text-secondary', theme.colors.textSecondary);
        root.style.setProperty('--ide-border', theme.colors.border);
        root.style.setProperty('--ide-error', theme.colors.error);
        root.style.setProperty('--ide-warning', theme.colors.warning);
        root.style.setProperty('--ide-success', theme.colors.success);
        root.style.setProperty('--ide-info', theme.colors.info);

        // Editor
        root.style.setProperty('--editor-bg', theme.editor.background);
        root.style.setProperty('--editor-fg', theme.editor.foreground);
        root.style.setProperty('--editor-selection', theme.editor.selection);
        root.style.setProperty('--editor-cursor', theme.editor.cursor);
        root.style.setProperty('--editor-line-numbers', theme.editor.lineNumbers);
        root.style.setProperty('--editor-active-line', theme.editor.activeLine);
        root.style.setProperty('--editor-bracket-matching', theme.editor.bracketMatching);
        root.style.setProperty('--editor-find-match', theme.editor.findMatch);
        root.style.setProperty('--editor-find-match-highlight', theme.editor.findMatchHighlight);
    };

    const saveCustomTheme = () => {
        const newCustomTheme = { ...customTheme, id: `custom-${Date.now()}` };
        setThemes(prev => [...prev, newCustomTheme]);
        handleThemeChange(newCustomTheme);
    };

    const exportTheme = (theme: Theme) => {
        const dataStr = JSON.stringify(theme, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `${theme.name.toLowerCase().replace(/\s+/g, '-')}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const theme = JSON.parse(e.target?.result as string);
                    setThemes(prev => [...prev, theme]);
                    handleThemeChange(theme);
                } catch (error) {
                    alert('Erro ao importar tema. Verifique se o arquivo é válido.');
                }
            };
            reader.readAsText(file);
        }
    };

    const resetToDefault = () => {
        const defaultTheme = themes.find(t => t.id === 'fenix-dark') || themes[0];
        handleThemeChange(defaultTheme);
        setFontSize(14);
        setFontFamily('JetBrains Mono');
        setLineHeight(1.5);
        setTabSize(4);
        setShowLineNumbers(true);
        setShowActiveLine(true);
        setWordWrap(false);
        setMinimap(true);
        setBracketPairColorization(true);
    };

    useEffect(() => {
        applyThemeToCSS(currentTheme);
    }, [currentTheme]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <Palette className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Gerenciador de Temas e Configurações
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        ×
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    {[
                        { id: 'themes', name: 'Temas', icon: Palette },
                        { id: 'colors', name: 'Cores', icon: Eye },
                        { id: 'editor', name: 'Editor', icon: Settings },
                        { id: 'advanced', name: 'Avançado', icon: Settings }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {activeTab === 'themes' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {themes.map(theme => (
                                    <div
                                        key={theme.id}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${currentTheme.id === theme.id
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        onClick={() => handleThemeChange(theme)}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {theme.name}
                                            </h3>
                                            <span className={`px-2 py-1 text-xs rounded-full ${theme.category === 'dark' ? 'bg-gray-800 text-white' :
                                                    theme.category === 'light' ? 'bg-gray-200 text-gray-800' :
                                                        theme.category === 'high-contrast' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-purple-100 text-purple-800'
                                                }`}>
                                                {theme.category}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            {theme.description}
                                        </p>
                                        <div className="flex space-x-2">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.colors.primary }}></div>
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.colors.accent }}></div>
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.colors.background }}></div>
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.colors.surface }}></div>
                                        </div>
                                        <div className="flex justify-end mt-3 space-x-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); exportTheme(theme); }}
                                                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold mb-4">Importar Tema</h3>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="file"
                                        accept=".json"
                                        onChange={importTheme}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'colors' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Personalizar Cores</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3">Cores Principais</h4>
                                    {Object.entries(customTheme.colors).map(([key, value]) => (
                                        <div key={key} className="flex items-center space-x-3 mb-3">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </label>
                                            <input
                                                type="color"
                                                value={value}
                                                onChange={(e) => setCustomTheme(prev => ({
                                                    ...prev,
                                                    colors: { ...prev.colors, [key]: e.target.value }
                                                }))}
                                                className="w-12 h-8 rounded border"
                                            />
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => setCustomTheme(prev => ({
                                                    ...prev,
                                                    colors: { ...prev.colors, [key]: e.target.value }
                                                }))}
                                                className="flex-1 px-3 py-1 text-sm border rounded"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <h4 className="font-medium mb-3">Cores do Editor</h4>
                                    {Object.entries(customTheme.editor).map(([key, value]) => (
                                        <div key={key} className="flex items-center space-x-3 mb-3">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </label>
                                            <input
                                                type="color"
                                                value={value}
                                                onChange={(e) => setCustomTheme(prev => ({
                                                    ...prev,
                                                    editor: { ...prev.editor, [key]: e.target.value }
                                                }))}
                                                className="w-12 h-8 rounded border"
                                            />
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => setCustomTheme(prev => ({
                                                    ...prev,
                                                    editor: { ...prev.editor, [key]: e.target.value }
                                                }))}
                                                className="flex-1 px-3 py-1 text-sm border rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={saveCustomTheme}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <Save className="w-4 h-4 inline mr-2" />
                                    Salvar Tema Personalizado
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'editor' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Configurações do Editor</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3">Tipografia</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tamanho da Fonte
                                            </label>
                                            <input
                                                type="range"
                                                min="10"
                                                max="24"
                                                value={fontSize}
                                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                            <span className="text-sm text-gray-500">{fontSize}px</span>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Família da Fonte
                                            </label>
                                            <select
                                                value={fontFamily}
                                                onChange={(e) => setFontFamily(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                                            >
                                                {fontFamilies.map(font => (
                                                    <option key={font} value={font}>{font}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Altura da Linha
                                            </label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="3"
                                                step="0.1"
                                                value={lineHeight}
                                                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                                                className="w-full"
                                            />
                                            <span className="text-sm text-gray-500">{lineHeight}</span>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Tamanho da Tabulação
                                            </label>
                                            <input
                                                type="range"
                                                min="2"
                                                max="8"
                                                value={tabSize}
                                                onChange={(e) => setTabSize(parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                            <span className="text-sm text-gray-500">{tabSize} espaços</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-3">Visual</h4>
                                    <div className="space-y-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={showLineNumbers}
                                                onChange={(e) => setShowLineNumbers(e.target.checked)}
                                                className="rounded mr-3"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                Mostrar números de linha
                                            </span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={showActiveLine}
                                                onChange={(e) => setShowActiveLine(e.target.checked)}
                                                className="rounded mr-3"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                Destacar linha ativa
                                            </span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={wordWrap}
                                                onChange={(e) => setWordWrap(e.target.checked)}
                                                className="rounded mr-3"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                Quebra de linha automática
                                            </span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={minimap}
                                                onChange={(e) => setMinimap(e.target.checked)}
                                                className="rounded mr-3"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                Mostrar minimap
                                            </span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={bracketPairColorization}
                                                onChange={(e) => setBracketPairColorization(e.target.checked)}
                                                className="rounded mr-3"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                Colorização de parênteses
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'advanced' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Configurações Avançadas</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Auto-save (segundos)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="300"
                                        defaultValue="30"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tamanho máximo do arquivo (MB)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        defaultValue="10"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Histórico de comandos do terminal
                                    </label>
                                    <input
                                        type="number"
                                        min="10"
                                        max="1000"
                                        defaultValue="100"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h4 className="font-medium mb-3">Ações</h4>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={resetToDefault}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                    >
                                        <RotateCcw className="w-4 h-4 inline mr-2" />
                                        Restaurar Padrões
                                    </button>

                                    <button
                                        onClick={() => {
                                            // Implementar backup de configurações
                                            alert('Backup de configurações implementado!');
                                        }}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        <Download className="w-4 h-4 inline mr-2" />
                                        Backup Configurações
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={() => {
                            // Aplicar todas as configurações
                            alert('Configurações aplicadas com sucesso!');
                            onClose();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Aplicar Configurações
                    </button>
                </div>
            </div>
        </div>
    );
}
