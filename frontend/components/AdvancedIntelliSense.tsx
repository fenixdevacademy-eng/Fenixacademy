'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useIntelliSense } from './IntelliSenseProvider';
import {
    Lightbulb,
    Code,
    Zap,
    Brain,
    Settings,
    X,
    ChevronDown,
    ChevronRight,
    Star,
    Clock,
    BookOpen
} from 'lucide-react';

interface AdvancedIntelliSenseProps {
    editor: any;
    monaco: any;
    language: string;
    theme: 'dark' | 'light';
    onSuggestionSelect?: (suggestion: any) => void;
}

interface SuggestionItem {
    label: string;
    kind: string;
    detail?: string;
    documentation?: string;
    insertText: string;
    insertTextRules?: string;
    range?: any;
    sortText?: string;
    isRecent?: boolean;
    isFavorite?: boolean;
    usage?: number;
}

export default function AdvancedIntelliSense({
    editor,
    monaco,
    language,
    theme,
    onSuggestionSelect
}: AdvancedIntelliSenseProps) {
    const intelliSense = useIntelliSense();
    const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
    const [showSettings, setShowSettings] = useState(false);
    const [recentSuggestions, setRecentSuggestions] = useState<string[]>([]);
    const [favoriteSuggestions, setFavoriteSuggestions] = useState<string[]>([]);
    const [suggestionStats, setSuggestionStats] = useState<Record<string, number>>({});

    const suggestionsRef = useRef<HTMLDivElement>(null);
    const [settings, setSettings] = useState({
        enableAutoComplete: true,
        enableSnippets: true,
        enableHover: true,
        enableSignatureHelp: true,
        maxSuggestions: 10,
        showDocumentation: true,
        showRecent: true,
        showFavorites: true,
        showUsage: true
    });

    // Carregar configurações salvas
    useEffect(() => {
        const savedSettings = localStorage.getItem('intellisense-settings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }

        const savedRecent = localStorage.getItem('intellisense-recent');
        if (savedRecent) {
            setRecentSuggestions(JSON.parse(savedRecent));
        }

        const savedFavorites = localStorage.getItem('intellisense-favorites');
        if (savedFavorites) {
            setFavoriteSuggestions(JSON.parse(savedFavorites));
        }

        const savedStats = localStorage.getItem('intellisense-stats');
        if (savedStats) {
            setSuggestionStats(JSON.parse(savedStats));
        }
    }, []);

    // Salvar configurações
    const saveSettings = useCallback((newSettings: typeof settings) => {
        setSettings(newSettings);
        localStorage.setItem('intellisense-settings', JSON.stringify(newSettings));
    }, []);

    // Adicionar sugestão aos recentes
    const addToRecent = useCallback((suggestion: string) => {
        const newRecent = [suggestion, ...recentSuggestions.filter(s => s !== suggestion)].slice(0, 10);
        setRecentSuggestions(newRecent);
        localStorage.setItem('intellisense-recent', JSON.stringify(newRecent));
    }, [recentSuggestions]);

    // Adicionar/remover dos favoritos
    const toggleFavorite = useCallback((suggestion: string) => {
        const newFavorites = favoriteSuggestions.includes(suggestion)
            ? favoriteSuggestions.filter(s => s !== suggestion)
            : [...favoriteSuggestions, suggestion];
        setFavoriteSuggestions(newFavorites);
        localStorage.setItem('intellisense-favorites', JSON.stringify(newFavorites));
    }, [favoriteSuggestions]);

    // Atualizar estatísticas de uso
    const updateUsageStats = useCallback((suggestion: string) => {
        const newStats = { ...suggestionStats };
        newStats[suggestion] = (newStats[suggestion] || 0) + 1;
        setSuggestionStats(newStats);
        localStorage.setItem('intellisense-stats', JSON.stringify(newStats));
    }, [suggestionStats]);

    // Obter ícone baseado no tipo
    const getSuggestionIcon = (kind: string) => {
        switch (kind) {
            case 'keyword': return '🔑';
            case 'function': return '🔧';
            case 'variable': return '📦';
            case 'class': return '🏗️';
            case 'interface': return '📋';
            case 'property': return '⚙️';
            case 'method': return '🔨';
            case 'snippet': return '📝';
            case 'module': return '📚';
            default: return '💡';
        }
    };

    // Obter cor baseada no tipo
    const getSuggestionColor = (kind: string) => {
        switch (kind) {
            case 'keyword': return '#569cd6';
            case 'function': return '#dcdcaa';
            case 'variable': return '#9cdcfe';
            case 'class': return '#4ec9b0';
            case 'interface': return '#4ec9b0';
            case 'property': return '#9cdcfe';
            case 'method': return '#dcdcaa';
            case 'snippet': return '#ce9178';
            case 'module': return '#4ec9b0';
            default: return '#d4d4d4';
        }
    };

    // Configurar IntelliSense no Monaco
    useEffect(() => {
        if (!editor || !monaco || !settings.enableAutoComplete) return;

        // Registrar provider de completions
        const completionProvider = monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: (model: any, position: any) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };

                const suggestions = intelliSense.getSuggestions(model, position, language);

                // Adicionar informações extras
                const enhancedSuggestions = suggestions.map(suggestion => ({
                    ...suggestion,
                    isRecent: recentSuggestions.includes(suggestion.label),
                    isFavorite: favoriteSuggestions.includes(suggestion.label),
                    usage: suggestionStats[suggestion.label] || 0
                }));

                // Ordenar sugestões
                const sortedSuggestions = enhancedSuggestions.sort((a, b) => {
                    // Favoritos primeiro
                    if (a.isFavorite && !b.isFavorite) return -1;
                    if (!a.isFavorite && b.isFavorite) return 1;

                    // Recentes em seguida
                    if (a.isRecent && !b.isRecent) return -1;
                    if (!a.isRecent && b.isRecent) return 1;

                    // Por uso
                    if (a.usage > b.usage) return -1;
                    if (a.usage < b.usage) return 1;

                    // Por sortText
                    return (a.sortText || '').localeCompare(b.sortText || '');
                });

                return {
                    suggestions: sortedSuggestions.slice(0, settings.maxSuggestions)
                };
            }
        });

        // Registrar provider de hover
        if (settings.enableHover) {
            const hoverProvider = monaco.languages.registerHoverProvider(language, {
                provideHover: (model: any, position: any) => {
                    const hoverInfo = intelliSense.getHoverInfo(model, position, language);
                    if (hoverInfo) {
                        return {
                            range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
                            contents: [{ value: hoverInfo }]
                        };
                    }
                    return null;
                }
            });
        }

        // Registrar provider de signature help
        if (settings.enableSignatureHelp) {
            const signatureProvider = monaco.languages.registerSignatureHelpProvider(language, {
                signatureHelpTriggerCharacters: ['(', ','],
                provideSignatureHelp: (model: any, position: any) => {
                    return intelliSense.getSignatureHelp(model, position, language);
                }
            });
        }

        // Configurar eventos do editor
        const onDidChangeModelContent = editor.onDidChangeModelContent(() => {
            // Lógica para atualizar sugestões em tempo real
        });

        const onDidChangeCursorPosition = editor.onDidChangeCursorPosition((e: any) => {
            // Lógica para atualizar posição das sugestões
        });

        return () => {
            completionProvider.dispose();
            onDidChangeModelContent.dispose();
            onDidChangeCursorPosition.dispose();
        };
    }, [editor, monaco, language, settings, intelliSense, recentSuggestions, favoriteSuggestions, suggestionStats]);

    // Manipular seleção de sugestão
    const handleSuggestionSelect = useCallback((suggestion: SuggestionItem) => {
        addToRecent(suggestion.label);
        updateUsageStats(suggestion.label);

        if (onSuggestionSelect) {
            onSuggestionSelect(suggestion);
        }
    }, [addToRecent, updateUsageStats, onSuggestionSelect]);

    // Painel de configurações
    const renderSettingsPanel = () => {
        if (!showSettings) return null;

        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowSettings(false)}
            >
                <div
                    className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg border p-6"
                    style={{
                        background: theme === 'dark' ? '#2d2d30' : '#ffffff',
                        borderColor: theme === 'dark' ? '#3c3c3c' : '#e5e7eb',
                        color: theme === 'dark' ? '#d4d4d4' : '#000000'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <Settings size={20} />
                            Configurações do IntelliSense
                        </h3>
                        <button
                            onClick={() => setShowSettings(false)}
                            className="p-2 rounded-lg hover:bg-opacity-20 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Configurações Gerais */}
                        <div>
                            <h4 className="font-medium mb-3">Configurações Gerais</h4>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between">
                                    <span>Auto Complete</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.enableAutoComplete}
                                        onChange={(e) => saveSettings({ ...settings, enableAutoComplete: e.target.checked })}
                                        className="rounded"
                                    />
                                </label>
                                <label className="flex items-center justify-between">
                                    <span>Snippets</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.enableSnippets}
                                        onChange={(e) => saveSettings({ ...settings, enableSnippets: e.target.checked })}
                                        className="rounded"
                                    />
                                </label>
                                <label className="flex items-center justify-between">
                                    <span>Hover Information</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.enableHover}
                                        onChange={(e) => saveSettings({ ...settings, enableHover: e.target.checked })}
                                        className="rounded"
                                    />
                                </label>
                                <label className="flex items-center justify-between">
                                    <span>Signature Help</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.enableSignatureHelp}
                                        onChange={(e) => saveSettings({ ...settings, enableSignatureHelp: e.target.checked })}
                                        className="rounded"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Configurações de Exibição */}
                        <div>
                            <h4 className="font-medium mb-3">Exibição</h4>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between">
                                    <span>Mostrar Documentação</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.showDocumentation}
                                        onChange={(e) => saveSettings({ ...settings, showDocumentation: e.target.checked })}
                                        className="rounded"
                                    />
                                </label>
                                <label className="flex items-center justify-between">
                                    <span>Mostrar Recentes</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.showRecent}
                                        onChange={(e) => saveSettings({ ...settings, showRecent: e.target.checked })}
                                        className="rounded"
                                    />
                                </label>
                                <label className="flex items-center justify-between">
                                    <span>Mostrar Favoritos</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.showFavorites}
                                        onChange={(e) => saveSettings({ ...settings, showFavorites: e.target.checked })}
                                        className="rounded"
                                    />
                                </label>
                                <label className="flex items-center justify-between">
                                    <span>Mostrar Estatísticas de Uso</span>
                                    <input
                                        type="checkbox"
                                        checked={settings.showUsage}
                                        onChange={(e) => saveSettings({ ...settings, showUsage: e.target.checked })}
                                        className="rounded"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Configurações Avançadas */}
                        <div>
                            <h4 className="font-medium mb-3">Avançado</h4>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between">
                                    <span>Máximo de Sugestões</span>
                                    <input
                                        type="number"
                                        min="5"
                                        max="50"
                                        value={settings.maxSuggestions}
                                        onChange={(e) => saveSettings({ ...settings, maxSuggestions: parseInt(e.target.value) })}
                                        className="w-20 px-2 py-1 rounded border"
                                        style={{
                                            background: theme === 'dark' ? '#3c3c3c' : '#ffffff',
                                            borderColor: theme === 'dark' ? '#5a5a5a' : '#d1d5db',
                                            color: theme === 'dark' ? '#d4d4d4' : '#000000'
                                        }}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Estatísticas */}
                        <div>
                            <h4 className="font-medium mb-3">Estatísticas</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Sugestões Recentes:</span>
                                    <span>{recentSuggestions.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Favoritos:</span>
                                    <span>{favoriteSuggestions.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total de Usos:</span>
                                    <span>{Object.values(suggestionStats).reduce((a, b) => a + b, 0)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Botão de Configurações */}
            <button
                onClick={() => setShowSettings(true)}
                className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                style={{
                    background: theme === 'dark' ? '#007acc' : '#0066cc',
                    color: '#ffffff'
                }}
                title="Configurações do IntelliSense"
            >
                <Brain size={20} />
            </button>

            {/* Painel de Configurações */}
            {renderSettingsPanel()}
        </>
    );
}
