'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Zap, Play, Square, RotateCcw, Eye, Code,
    Monitor, Smartphone, Globe, Settings, X
} from 'lucide-react';

interface HotReloadProps {
    isOpen: boolean;
    onClose: () => void;
    currentFile?: {
        name: string;
        language: string;
        content: string;
    };
    onReload?: (content: string) => void;
}

interface ReloadTarget {
    id: string;
    name: string;
    type: 'browser' | 'console' | 'mobile' | 'api';
    status: 'idle' | 'reloading' | 'success' | 'error';
    url?: string;
    lastReload?: Date;
}

export default function HotReload({
    isOpen,
    onClose,
    currentFile,
    onReload
}: HotReloadProps) {
    const [targets, setTargets] = useState<ReloadTarget[]>([
        {
            id: '1',
            name: 'Browser Preview',
            type: 'browser',
            status: 'idle',
            url: 'http://localhost:3000/preview',
            lastReload: new Date()
        },
        {
            id: '2',
            name: 'Console Output',
            type: 'console',
            status: 'idle',
            lastReload: new Date()
        },
        {
            id: '3',
            name: 'Mobile Preview',
            type: 'mobile',
            status: 'idle',
            url: 'http://localhost:3000/mobile',
            lastReload: new Date()
        },
        {
            id: '4',
            name: 'API Endpoint',
            type: 'api',
            status: 'idle',
            url: 'http://localhost:5000/api',
            lastReload: new Date()
        }
    ]);

    const [autoReload, setAutoReload] = useState(true);
    const [reloadDelay, setReloadDelay] = useState(1000);
    const [isWatching, setIsWatching] = useState(false);
    const [fileWatcher, setFileWatcher] = useState<NodeJS.Timeout | null>(null);
    const [lastContent, setLastContent] = useState<string>('');

    // Iniciar file watcher quando arquivo mudar
    useEffect(() => {
        if (currentFile && autoReload) {
            startFileWatcher();
        } else {
            stopFileWatcher();
        }

        return () => stopFileWatcher();
    }, [currentFile, autoReload]);

    // Comparar conteúdo para detectar mudanças
    useEffect(() => {
        if (currentFile && lastContent !== currentFile.content) {
            setLastContent(currentFile.content);
            if (autoReload && isWatching) {
                triggerHotReload();
            }
        }
    }, [currentFile?.content, lastContent, autoReload, isWatching]);

    const startFileWatcher = () => {
        setIsWatching(true);
        console.log('🔍 File watcher iniciado para:', currentFile?.name);
    };

    const stopFileWatcher = () => {
        if (fileWatcher) {
            clearTimeout(fileWatcher);
            setFileWatcher(null);
        }
        setIsWatching(false);
        console.log('⏹️ File watcher parado');
    };

    const triggerHotReload = async () => {
        console.log('🔥 Hot Reload disparado!');

        // Atualizar status de todos os targets
        setTargets(prev => prev.map(target => ({
            ...target,
            status: 'reloading' as const
        })));

        try {
            // Simular processo de reload para diferentes linguagens
            if (currentFile?.language === 'csharp') {
                await reloadCSharpProject();
            } else if (currentFile?.language === 'javascript' || currentFile?.language === 'typescript') {
                await reloadJavaScriptProject();
            } else {
                await reloadGenericProject();
            }

            // Marcar sucesso após delay
            setTimeout(() => {
                setTargets(prev => prev.map(target => ({
                    ...target,
                    status: 'success' as const,
                    lastReload: new Date()
                })));

                // Reset para idle após 2 segundos
                setTimeout(() => {
                    setTargets(prev => prev.map(target => ({
                        ...target,
                        status: 'idle' as const
                    })));
                }, 2000);
            }, reloadDelay);

        } catch (error) {
            console.error('Erro no Hot Reload:', error);
            setTargets(prev => prev.map(target => ({
                ...target,
                status: 'error' as const
            })));
        }
    };

    const reloadCSharpProject = async () => {
        console.log('🔄 Reloading C# project...');

        // Simular comandos .NET
        const commands = [
            'dotnet build --no-restore',
            'dotnet run --watch'
        ];

        for (const command of commands) {
            console.log(`Executando: ${command}`);
            await new Promise(resolve => setTimeout(resolve, 500)); // Simular execução
        }

        console.log('✅ C# project reloaded successfully');
    };

    const reloadJavaScriptProject = async () => {
        console.log('🔄 Reloading JavaScript project...');

        // Simular comandos Node.js/npm
        const commands = [
            'npm run build',
            'npm run dev'
        ];

        for (const command of commands) {
            console.log(`Executando: ${command}`);
            await new Promise(resolve => setTimeout(resolve, 300)); // Simular execução
        }

        console.log('✅ JavaScript project reloaded successfully');
    };

    const reloadGenericProject = async () => {
        console.log('🔄 Reloading generic project...');
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log('✅ Generic project reloaded successfully');
    };

    const manualReload = async (targetId: string) => {
        const target = targets.find(t => t.id === targetId);
        if (!target) return;

        setTargets(prev => prev.map(t =>
            t.id === targetId ? { ...t, status: 'reloading' } : t
        ));

        try {
            await triggerHotReload();
        } catch (error) {
            console.error('Erro no reload manual:', error);
        }
    };

    const reloadAllTargets = async () => {
        console.log('🚀 Reloading all targets...');
        await triggerHotReload();
    };

    const getStatusIcon = (status: ReloadTarget['status']) => {
        switch (status) {
            case 'idle':
                return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
            case 'reloading':
                return <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />;
            case 'success':
                return <div className="w-3 h-3 bg-green-500 rounded-full" />;
            case 'error':
                return <div className="w-3 h-3 bg-red-500 rounded-full" />;
            default:
                return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
        }
    };

    const getStatusColor = (status: ReloadTarget['status']) => {
        switch (status) {
            case 'idle':
                return 'text-gray-500';
            case 'reloading':
                return 'text-yellow-500';
            case 'success':
                return 'text-green-500';
            case 'error':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col border border-gray-200/50 dark:border-gray-700/50">
                {/* Header - Design Premium */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800/50 dark:to-gray-700/50">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                            <Zap className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Hot Reload
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                ⚡ Recarregamento automático para C# e JavaScript
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-3 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-xl hover:from-red-200 hover:to-red-300 dark:hover:from-red-800/30 dark:hover:to-red-700/30 transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                        <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </button>
                </div>

                {/* Content - Layout Moderno */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Status do arquivo atual - Design Elegante */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    📁 Arquivo Atual
                                </h3>
                                <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">
                                    {currentFile?.name || 'Nenhum arquivo selecionado'}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-500">
                                    🗣️ Linguagem: {currentFile?.language || 'N/A'} |
                                    📏 Linhas: {currentFile?.content?.split('\n').length || 0}
                                </p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3 p-3 bg-white/70 dark:bg-gray-700/70 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                                    <div className={`w-4 h-4 rounded-full ${isWatching ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {isWatching ? '👁️ Watching' : '⏸️ Idle'}
                                    </span>
                                </div>

                                <button
                                    onClick={reloadAllTargets}
                                    disabled={!currentFile}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg font-medium flex items-center space-x-2"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    <span>🔄 Reload All</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Configurações - Design Interativo */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                            ⚙️ Configurações
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center space-x-4 p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                                <input
                                    type="checkbox"
                                    id="autoReload"
                                    checked={autoReload}
                                    onChange={(e) => setAutoReload(e.target.checked)}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="autoReload" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    🔄 Auto-reload
                                </label>
                            </div>

                            <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    ⏱️ Delay (ms)
                                </label>
                                <input
                                    type="range"
                                    min="100"
                                    max="5000"
                                    step="100"
                                    value={reloadDelay}
                                    onChange={(e) => setReloadDelay(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <span className="text-xs text-gray-500 mt-2 block text-center font-medium">
                                    {reloadDelay}ms
                                </span>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                                <button
                                    onClick={() => setIsWatching(!isWatching)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isWatching
                                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500'
                                            : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-400 hover:to-gray-500'
                                        }`}
                                >
                                    {isWatching ? '⏹️ Stop Watching' : '▶️ Start Watching'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Targets - Design Premium */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            🎯 Targets de Reload
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {targets.map((target) => (
                                <div
                                    key={target.id}
                                    className="p-6 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl hover:border-gray-300/50 dark:hover:border-gray-500/50 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 shadow-lg"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                                                {target.type === 'browser' && <Globe className="w-5 h-5 text-white" />}
                                                {target.type === 'console' && <Code className="w-5 h-5 text-white" />}
                                                {target.type === 'mobile' && <Smartphone className="w-5 h-5 text-white" />}
                                                {target.type === 'api' && <Monitor className="w-5 h-5 text-white" />}
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {target.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {target.url || '💻 Local execution'}
                                                </p>
                                                {target.lastReload && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        🕐 Último reload: {target.lastReload.toLocaleTimeString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-3 p-2 bg-white/70 dark:bg-gray-700/70 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
                                                {getStatusIcon(target.status)}
                                                <span className={`text-sm font-medium ${getStatusColor(target.status)}`}>
                                                    {target.status === 'idle' && '⏸️ Idle'}
                                                    {target.status === 'reloading' && '🔄 Reloading...'}
                                                    {target.status === 'success' && '✅ Success'}
                                                    {target.status === 'error' && '❌ Error'}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => manualReload(target.id)}
                                                disabled={target.status === 'reloading'}
                                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg font-medium text-sm"
                                            >
                                                🔄 Reload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Logs - Design Elegante */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 shadow-inner">
                        <h3 className="text-xl font-semibold text-white mb-4">
                            📊 Logs de Reload
                        </h3>

                        <div className="bg-black text-green-400 p-4 rounded-xl font-mono text-sm h-40 overflow-y-auto border border-gray-700 shadow-inner">
                            <div className="space-y-1">
                                <div className="text-blue-400">$ Hot Reload System v2.0 iniciado</div>
                                <div className="text-green-400">$ Watching: {currentFile?.name || 'N/A'}</div>
                                <div className="text-yellow-400">$ Auto-reload: {autoReload ? 'ON' : 'OFF'}</div>
                                <div className="text-purple-400">$ Delay: {reloadDelay}ms</div>
                                {isWatching && <div className="text-green-400">$ File watcher ativo</div>}
                                <div className="text-blue-400">$ Aguardando mudanças...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

