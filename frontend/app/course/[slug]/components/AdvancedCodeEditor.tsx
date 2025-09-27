'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Code,
    Play,
    Square,
    Download,
    Upload,
    Settings,
    Save,
    Undo,
    Redo,
    Copy,
    Paste,
    Search,
    Replace,
    Minimize2,
    Maximize2,
    X,
    FileText,
    Terminal,
    Bug,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

interface CodeEditorProps {
    className?: string;
    language?: string;
    theme?: 'light' | 'dark';
    readOnly?: boolean;
    onCodeChange?: (code: string) => void;
    onRun?: (code: string) => void;
    initialCode?: string;
}

export function AdvancedCodeEditor({
    className = '',
    language = 'javascript',
    theme = 'dark',
    readOnly = false,
    onCodeChange,
    onRun,
    initialCode = ''
}: CodeEditorProps) {
    const [code, setCode] = useState(initialCode);
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [tabSize, setTabSize] = useState(2);
    const [wordWrap, setWordWrap] = useState(true);
    const [showLineNumbers, setShowLineNumbers] = useState(true);
    const [showMinimap, setShowMinimap] = useState(true);
    const [activeTab, setActiveTab] = useState<'editor' | 'output' | 'terminal'>('editor');

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCode(initialCode);
    }, [initialCode]);

    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
        onCodeChange?.(newCode);
        setError(null);
    };

    const handleRun = async () => {
        if (!code.trim()) return;

        setIsRunning(true);
        setError(null);
        setOutput('');
        setActiveTab('output');

        try {
            // Simular execução de código
            await new Promise(resolve => setTimeout(resolve, 1000));

            const result = `Código executado com sucesso!\n\nEntrada: ${code}\n\nSaída: Resultado da execução`;
            setOutput(result);
            onRun?.(code);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            setError(errorMessage);
            setOutput(`Erro: ${errorMessage}`);
        } finally {
            setIsRunning(false);
        }
    };

    const handleSave = () => {
        // Simular salvamento
        console.log('Código salvo:', code);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            const textarea = textareaRef.current;
            if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const newCode = code.substring(0, start) + text + code.substring(end);
                handleCodeChange(newCode);
            }
        } catch (err) {
            console.error('Erro ao colar:', err);
        }
    };

    const handleUndo = () => {
        // Implementar undo
        console.log('Undo');
    };

    const handleRedo = () => {
        // Implementar redo
        console.log('Redo');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 's':
                    e.preventDefault();
                    handleSave();
                    break;
                case 'r':
                    e.preventDefault();
                    handleRun();
                    break;
                case 'c':
                    e.preventDefault();
                    handleCopy();
                    break;
                case 'v':
                    e.preventDefault();
                    handlePaste();
                    break;
                case 'z':
                    e.preventDefault();
                    handleUndo();
                    break;
                case 'y':
                    e.preventDefault();
                    handleRedo();
                    break;
            }
        }
    };

    const getLanguageIcon = (lang: string) => {
        switch (lang) {
            case 'javascript':
            case 'typescript':
                return '🟨';
            case 'python':
                return '🐍';
            case 'java':
                return '☕';
            case 'html':
                return '🌐';
            case 'css':
                return '🎨';
            default:
                return '📄';
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-900 dark:text-white">
                            Editor de Código
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{getLanguageIcon(language)}</span>
                        <span className="capitalize">{language}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleUndo}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        title="Desfazer (Ctrl+Z)"
                    >
                        <Undo className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleRedo}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        title="Refazer (Ctrl+Y)"
                    >
                        <Redo className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                    <button
                        onClick={handleCopy}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        title="Copiar (Ctrl+C)"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handlePaste}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        title="Colar (Ctrl+V)"
                    >
                        <Paste className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                    <button
                        onClick={handleSave}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        title="Salvar (Ctrl+S)"
                    >
                        <Save className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleRun}
                        disabled={isRunning || !code.trim()}
                        className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded transition-colors"
                        title="Executar (Ctrl+R)"
                    >
                        {isRunning ? (
                            <Square className="w-4 h-4" />
                        ) : (
                            <Play className="w-4 h-4" />
                        )}
                    </button>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        title="Configurações"
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                    {isFullscreen && (
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Fechar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tamanho da Fonte
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="24"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full"
                            />
                            <span className="text-xs text-gray-500 dark:text-gray-400">{fontSize}px</span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tamanho da Tab
                            </label>
                            <input
                                type="range"
                                min="2"
                                max="8"
                                value={tabSize}
                                onChange={(e) => setTabSize(Number(e.target.value))}
                                className="w-full"
                            />
                            <span className="text-xs text-gray-500 dark:text-gray-400">{tabSize} espaços</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="wordWrap"
                                checked={wordWrap}
                                onChange={(e) => setWordWrap(e.target.checked)}
                                className="rounded"
                            />
                            <label htmlFor="wordWrap" className="text-sm text-gray-700 dark:text-gray-300">
                                Quebra de linha
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="lineNumbers"
                                checked={showLineNumbers}
                                onChange={(e) => setShowLineNumbers(e.target.checked)}
                                className="rounded"
                            />
                            <label htmlFor="lineNumbers" className="text-sm text-gray-700 dark:text-gray-300">
                                Números da linha
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                {[
                    { id: 'editor', label: 'Editor', icon: Code },
                    { id: 'output', label: 'Output', icon: Terminal },
                    { id: 'terminal', label: 'Terminal', icon: Terminal }
                ].map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id as any)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === id
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1">
                {activeTab === 'editor' && (
                    <div className="relative">
                        {showLineNumbers && (
                            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
                                <div className="text-xs text-gray-500 dark:text-gray-400 p-2 font-mono">
                                    {code.split('\n').map((_, index) => (
                                        <div key={index} className="leading-6">
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <textarea
                            ref={textareaRef}
                            value={code}
                            onChange={(e) => handleCodeChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            readOnly={readOnly}
                            placeholder={`Digite seu código ${language} aqui...`}
                            className={`w-full h-96 p-4 font-mono text-sm border-0 bg-transparent text-gray-900 dark:text-white resize-none focus:outline-none ${showLineNumbers ? 'pl-16' : ''
                                }`}
                            style={{
                                fontSize: `${fontSize}px`,
                                tabSize: tabSize,
                                whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
                                overflow: wordWrap ? 'visible' : 'auto'
                            }}
                        />
                    </div>
                )}

                {activeTab === 'output' && (
                    <div className="p-4">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
                            {isRunning ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                                    Executando código...
                                </div>
                            ) : error ? (
                                <div className="text-red-400">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle className="w-4 h-4" />
                                        Erro na execução
                                    </div>
                                    {error}
                                </div>
                            ) : output ? (
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-green-400">
                                        <CheckCircle className="w-4 h-4" />
                                        Execução concluída
                                    </div>
                                    <pre className="whitespace-pre-wrap">{output}</pre>
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    Nenhuma saída ainda. Execute o código para ver os resultados.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'terminal' && (
                    <div className="p-4">
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
                            <div className="text-green-400 mb-2">
                                $ Terminal interativo
                            </div>
                            <div className="text-gray-400">
                                Digite comandos aqui...
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}