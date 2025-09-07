'use client';

import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import {
    Save,
    Play,
    Settings,
    Maximize2,
    Minimize2,
    FileText,
    X,
    Brain,
    Zap
} from 'lucide-react';
import AdvancedIntelliSense from './AdvancedIntelliSenseFixed';
import SmartSuggestions from './SmartSuggestionsSimple';

interface AdvancedEditorProps {
    content: string;
    language: string;
    filename: string;
    onContentChange: (content: string) => void;
    onSave: () => void;
    onExecute: () => void;
    theme: 'dark' | 'light';
}

export default function AdvancedEditor({
    content,
    language,
    filename,
    onContentChange,
    onSave,
    onExecute,
    theme
}: AdvancedEditorProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [wordWrap, setWordWrap] = useState(true);
    const [minimap, setMinimap] = useState(false);
    const [lineNumbers, setLineNumbers] = useState(true);
    const [editor, setEditor] = useState<any>(null);
    const [monaco, setMonaco] = useState<any>(null);
    const [intelliSenseEnabled, setIntelliSenseEnabled] = useState(true);

    // Toggle fullscreen
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Toggle settings
    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    // Toggle IntelliSense
    const toggleIntelliSense = () => {
        setIntelliSenseEnabled(!intelliSenseEnabled);
    };

    // Handle editor mount
    const handleEditorDidMount = (editor: any, monaco: any) => {
        setEditor(editor);
        setMonaco(monaco);
        console.log('Monaco Editor montado com IntelliSense avançado');

        // Configurar atalhos de teclado para sugestões
        editor.addCommand(monaco.KeyCode.Tab, () => {
            editor.trigger('editor', 'editor.action.triggerSuggest', {});
        });

        // Configurar atalho Ctrl+Space para forçar sugestões
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
            editor.trigger('editor', 'editor.action.triggerSuggest', {});
        });

        // Configurar para mostrar sugestões automaticamente após 100ms
        // editor.onDidChangeModelContent(() => {
        //     setTimeout(() => {
        //         editor.trigger('editor', 'editor.action.triggerSuggest', {});
        //     }, 100);
        // });
    };

    // Configurações do editor
    const editorOptions = {
        fontSize: fontSize,
        wordWrap: wordWrap ? 'on' : 'off',
        minimap: { enabled: minimap },
        lineNumbers: lineNumbers ? 'on' : 'off',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line' as const,
        scrollbar: {
            vertical: 'visible' as const,
            horizontal: 'visible' as const,
            verticalScrollbarSize: 14,
            horizontalScrollbarSize: 14
        },
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        overviewRulerLanes: 0,
        selectionHighlight: false,
        matchBrackets: 'always' as const,
        autoClosingBrackets: 'always' as const,
        autoClosingQuotes: 'always' as const,
        autoIndent: 'full' as const,
        formatOnType: true,
        formatOnPaste: true,
        // Configurações para autocompletar
        quickSuggestions: {
            other: true,
            comments: false,
            strings: true
        },
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        tabCompletion: 'on',
        wordBasedSuggestions: 'off',
        quickSuggestionsDelay: 100,
        // Configurações específicas para sugestões
        suggest: {
            showKeywords: true,
            showSnippets: true,
            showFunctions: true,
            showConstructors: true,
            showFields: true,
            showVariables: true,
            showClasses: true,
            showStructs: true,
            showInterfaces: true,
            showModules: true,
            showProperties: true,
            showEvents: true,
            showOperators: true,
            showUnits: true,
            showValues: true,
            showConstants: true,
            showEnums: true,
            showEnumMembers: true,
            showColors: true,
            showFiles: true,
            showReferences: true,
            showFolders: true,
            showTypeParameters: true,
            showIssues: true,
            showUsers: true,
            showWords: true
        }
    };

    return (
        <div
            className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col min-h-screen max-w-full overflow-hidden`}
            style={{
                background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
                color: theme === 'dark' ? '#d4d4d4' : '#000000'
            }}
        >
            {/* Header do Editor */}
            <div
                className="flex items-center justify-between p-2 sm:p-3 border-b text-sm sm:text-base"
                style={{
                    background: theme === 'dark' ? '#3c3c3c' : '#dddddd',
                    borderColor: theme === 'dark' ? '#3c3c3c' : '#e7e7e7',
                    color: theme === 'dark' ? '#cccccc' : '#000000'
                }}
            >
                <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span className="font-medium">{filename}</span>
                    <span className="text-xs opacity-60">({language})</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        onClick={onSave}
                        className="p-1.5 sm:p-2 rounded transition-all duration-200 hover:scale-105"
                        style={{
                            background: '#28a745',
                            color: '#ffffff'
                        }}
                        title="Salvar Arquivo (Ctrl+S)"
                    >
                        <Save size={14} />
                    </button>

                    <button
                        onClick={onExecute}
                        className="p-1.5 sm:p-2 rounded transition-all duration-200 hover:scale-105"
                        style={{
                            background: '#007acc',
                            color: '#ffffff'
                        }}
                        title="Executar Código (F5)"
                    >
                        <Play size={14} />
                    </button>

                    <button
                        onClick={toggleIntelliSense}
                        className={`p-1.5 sm:p-2 rounded transition-all duration-200 hover:scale-105 ${intelliSenseEnabled ? 'ring-2 ring-green-400' : ''}`}
                        style={{
                            background: intelliSenseEnabled ? '#28a745' : (theme === 'dark' ? '#3c3c3c' : '#dddddd'),
                            color: intelliSenseEnabled ? '#ffffff' : (theme === 'dark' ? '#cccccc' : '#000000')
                        }}
                        title={intelliSenseEnabled ? "IntelliSense Ativado" : "IntelliSense Desativado"}
                    >
                        <Brain size={14} />
                    </button>

                    <button
                        onClick={toggleSettings}
                        className={`p-1.5 sm:p-2 rounded transition-all duration-200 hover:scale-105 ${showSettings ? 'ring-2 ring-blue-400' : ''}`}
                        style={{
                            background: showSettings ? '#ffc107' : (theme === 'dark' ? '#3c3c3c' : '#dddddd'),
                            color: showSettings ? '#000000' : (theme === 'dark' ? '#cccccc' : '#000000')
                        }}
                        title="Configurações"
                    >
                        <Settings size={14} />
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className="p-1.5 sm:p-2 rounded transition-all duration-200 hover:scale-105"
                        style={{
                            background: isFullscreen ? '#dc3545' : '#6c757d',
                            color: '#ffffff'
                        }}
                        title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                    >
                        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                </div>
            </div>

            {/* Área do Editor */}
            <div className="flex-1 relative">
                <Editor
                    height="100%"
                    language={language || 'plaintext'}
                    value={content}
                    theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                    onChange={(value) => onContentChange(value || '')}
                    options={editorOptions}
                    onMount={handleEditorDidMount}
                />
            </div>

            {/* Status Bar */}
            <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-3 py-1 sm:py-2 text-xs border-t"
                style={{
                    background: '#007acc',
                    borderColor: '#007acc',
                    color: '#ffffff'
                }}
            >
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    <span className="text-xs">L{1}, C{1}</span>
                    <span className="text-xs">{content.length} chars</span>
                    <span className="text-xs hidden sm:inline">Linguagem: {language}</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-0">
                    <span className="text-xs">{theme === 'dark' ? '🌙' : '☀️'} {theme === 'dark' ? 'Escuro' : 'Claro'}</span>
                    <span className="text-xs">{fontSize}px</span>
                    <span className="text-xs hidden sm:inline">Wrap: {wordWrap ? 'ON' : 'OFF'}</span>
                    <span className="text-xs flex items-center gap-1">
                        <Brain size={12} />
                        {intelliSenseEnabled ? 'IA ON' : 'IA OFF'}
                    </span>
                </div>
            </div>

            {/* Painel de Configurações */}
            {showSettings && (
                <div
                    className="absolute top-16 right-4 w-80 rounded-lg shadow-2xl border-2 p-4 z-50"
                    style={{
                        background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
                        borderColor: theme === 'dark' ? '#3c3c3c' : '#e7e7e7',
                        color: theme === 'dark' ? '#cccccc' : '#000000'
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Configurações do Editor</h3>
                        <button
                            onClick={toggleSettings}
                            className="p-1 rounded hover:bg-opacity-20 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Tamanho da Fonte */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Tamanho da Fonte</label>
                            <input
                                type="range"
                                min="10"
                                max="24"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full"
                            />
                            <span className="text-xs opacity-60">{fontSize}px</span>
                        </div>

                        {/* Word Wrap */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Word Wrap</label>
                            <input
                                type="checkbox"
                                checked={wordWrap}
                                onChange={(e) => setWordWrap(e.target.checked)}
                                className="rounded"
                            />
                        </div>

                        {/* Minimap */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Minimap</label>
                            <input
                                type="checkbox"
                                checked={minimap}
                                onChange={(e) => setMinimap(e.target.checked)}
                                className="rounded"
                            />
                        </div>

                        {/* Números de Linha */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Números de Linha</label>
                            <input
                                type="checkbox"
                                checked={lineNumbers}
                                onChange={(e) => setLineNumbers(e.target.checked)}
                                className="rounded"
                            />
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex gap-2 pt-4">
                            <button
                                onClick={onSave}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                <Save size={16} />
                                Salvar
                            </button>

                            <button
                                onClick={onExecute}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
                            >
                                <Play size={16} />
                                Executar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* IntelliSense Avançado */}
            {intelliSenseEnabled && editor && monaco && (
                <AdvancedIntelliSense
                    editor={editor}
                    monaco={monaco}
                    language={language}
                    theme={theme}
                    onSuggestionSelect={(suggestion) => {
                        console.log('Sugestão selecionada:', suggestion);
                    }}
                />
            )}

            {/* Sugestões Inteligentes */}
            <SmartSuggestions
                content={content}
                language={language}
                theme={theme}
                onSuggestionApply={(suggestion) => {
                    console.log('Aplicando sugestão:', suggestion);
                    // Aqui você pode implementar a lógica para aplicar a sugestão
                }}
            />
        </div>
    );
}
