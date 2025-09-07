'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Zap,
    Eye,
    EyeOff,
    RefreshCw,
    Monitor,
    Smartphone,
    Tablet,
    Maximize2,
    Minimize2,
    Settings,
    Play,
    Square,
    RotateCcw
} from 'lucide-react';

interface HotReloadProps {
    htmlContent: string;
    cssContent: string;
    jsContent: string;
    theme: 'dark' | 'light';
    onReload: () => void;
}

interface DeviceSize {
    name: string;
    width: number;
    height: number;
    icon: React.ReactNode;
}

export default function RealTimeHotReload({
    htmlContent,
    cssContent,
    jsContent,
    theme,
    onReload
}: HotReloadProps) {
    const [isPreviewVisible, setIsPreviewVisible] = useState(true);
    const [currentDevice, setCurrentDevice] = useState<DeviceSize>({
        name: 'Desktop',
        width: 1200,
        height: 800,
        icon: <Monitor className="w-4 h-4" />
    });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [autoReload, setAutoReload] = useState(true);
    const [reloadDelay, setReloadDelay] = useState(100);
    const [showConsole, setShowConsole] = useState(false);
    const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const reloadTimeoutRef = useRef<NodeJS.Timeout>();

    // Tamanhos de dispositivos predefinidos
    const deviceSizes: DeviceSize[] = [
        { name: 'Mobile', width: 375, height: 667, icon: <Smartphone className="w-4 h-4" /> },
        { name: 'Tablet', width: 768, height: 1024, icon: <Tablet className="w-4 h-4" /> },
        { name: 'Desktop', width: 1200, height: 800, icon: <Monitor className="w-4 h-4" /> },
        { name: 'Large', width: 1920, height: 1080, icon: <Maximize2 className="w-4 h-4" /> }
    ];

    // Gerar HTML completo com CSS e JS integrados
    const generateFullHTML = useCallback(() => {
        return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview - Fenix IDE</title>
    <style>
        ${cssContent}
        
        /* Estilos para o preview */
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
        }
        
        .preview-header {
            background: #333;
            color: white;
            padding: 10px 20px;
            margin: -20px -20px 20px -20px;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .preview-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .preview-status {
            background: #4CAF50;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
        }
        
        .preview-time {
            font-size: 12px;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="preview-header">
        <div class="preview-info">
            <span class="preview-status">🟢 LIVE PREVIEW</span>
            <span>Fenix IDE - Hot Reload Ativo</span>
        </div>
        <div class="preview-time">${new Date().toLocaleTimeString()}</div>
    </div>
    
    <div id="preview-content">
        ${htmlContent}
    </div>
    
    <script>
        // Interceptar console.log para mostrar no preview
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        
        function sendToParent(type, ...args) {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({
                    type: 'console',
                    logType: type,
                    message: args.map(arg => 
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ')
                }, '*');
            }
        }
        
        console.log = function(...args) {
            originalLog.apply(console, args);
            sendToParent('log', ...args);
        };
        
        console.error = function(...args) {
            originalError.apply(console, args);
            sendToParent('error', ...args);
        };
        
        console.warn = function(...args) {
            originalWarn.apply(console, args);
            sendToParent('warn', ...args);
        };
        
        // Executar JavaScript customizado
        try {
            ${jsContent}
        } catch (error) {
            console.error('Erro no JavaScript:', error);
        }
        
        // Notificar que o preview carregou
        window.parent.postMessage({ type: 'previewLoaded' }, '*');
    </script>
</body>
</html>`;
    }, [htmlContent, cssContent, jsContent]);

    // Recarregar o preview
    const reloadPreview = useCallback(() => {
        if (!iframeRef.current) return;

        const iframe = iframeRef.current;
        const fullHTML = generateFullHTML();

        // Limpar console logs
        setConsoleLogs([]);

        // Recarregar iframe
        iframe.srcdoc = fullHTML;

        // Notificar mudança
        onReload();

        console.log('🔄 Preview recarregado:', new Date().toLocaleTimeString());
    }, [generateFullHTML, onReload]);

    // Auto-reload quando conteúdo mudar
    useEffect(() => {
        if (!autoReload) return;

        // Limpar timeout anterior
        if (reloadTimeoutRef.current) {
            clearTimeout(reloadTimeoutRef.current);
        }

        // Configurar novo timeout para reload
        reloadTimeoutRef.current = setTimeout(() => {
            reloadPreview();
        }, reloadDelay);

        return () => {
            if (reloadTimeoutRef.current) {
                clearTimeout(reloadTimeoutRef.current);
            }
        };
    }, [htmlContent, cssContent, jsContent, autoReload, reloadDelay, reloadPreview]);

    // Listener para mensagens do iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'console') {
                const { logType, message } = event.data;
                const timestamp = new Date().toLocaleTimeString();
                const logEntry = `[${timestamp}] ${logType.toUpperCase()}: ${message}`;

                setConsoleLogs(prev => [...prev, logEntry]);
            } else if (event.data.type === 'previewLoaded') {
                setIsRunning(true);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Limpar logs antigos
    useEffect(() => {
        if (consoleLogs.length > 100) {
            setConsoleLogs(prev => prev.slice(-50));
        }
    }, [consoleLogs]);

    // Alternar tela cheia
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Limpar console
    const clearConsole = () => {
        setConsoleLogs([]);
    };

    // Parar preview
    const stopPreview = () => {
        if (iframeRef.current) {
            iframeRef.current.srcdoc = '';
        }
        setIsRunning(false);
    };

    // Restart preview
    const restartPreview = () => {
        stopPreview();
        setTimeout(() => {
            reloadPreview();
        }, 100);
    };

    return (
        <div className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            {/* Barra de Ferramentas */}
            <div className={`flex items-center justify-between p-3 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
                }`}>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Zap className={`w-4 h-4 ${autoReload ? 'text-green-500' : 'text-gray-500'}`} />
                        <span className="text-sm font-medium">
                            Hot Reload {autoReload ? 'Ativo' : 'Inativo'}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        {deviceSizes.map((device) => (
                            <button
                                key={device.name}
                                onClick={() => setCurrentDevice(device)}
                                className={`p-2 rounded-lg transition-colors ${currentDevice.name === device.name
                                        ? theme === 'dark'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-blue-100 text-blue-900'
                                        : theme === 'dark'
                                            ? 'hover:bg-gray-700 text-gray-300'
                                            : 'hover:bg-gray-200 text-gray-600'
                                    }`}
                                title={device.name}
                            >
                                {device.icon}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                ? 'hover:bg-gray-700 text-gray-300'
                                : 'hover:bg-gray-200 text-gray-600'
                            }`}
                        title="Configurações"
                    >
                        <Settings className="w-4 h-4" />
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                ? 'hover:bg-gray-700 text-gray-300'
                                : 'hover:bg-gray-200 text-gray-600'
                            }`}
                        title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>

                    <button
                        onClick={reloadPreview}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        title="Recarregar Preview"
                    >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reload</span>
                    </button>

                    <button
                        onClick={restartPreview}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                        title="Reiniciar Preview"
                    >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restart</span>
                    </button>

                    <button
                        onClick={stopPreview}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                        title="Parar Preview"
                    >
                        <Square className="w-3 h-3" />
                        <span>Stop</span>
                    </button>
                </div>
            </div>

            {/* Configurações */}
            {showSettings && (
                <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
                    }`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-gray-500" />
                            <label className="text-sm text-gray-600">Auto Reload:</label>
                            <input
                                type="checkbox"
                                checked={autoReload}
                                onChange={(e) => setAutoReload(e.target.checked)}
                                className="rounded"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <RefreshCw className="w-4 h-4 text-gray-500" />
                            <label className="text-sm text-gray-600">Delay (ms):</label>
                            <input
                                type="range"
                                min="50"
                                max="1000"
                                step="50"
                                value={reloadDelay}
                                onChange={(e) => setReloadDelay(Number(e.target.value))}
                                className="w-20"
                            />
                            <span className="text-sm text-gray-500">{reloadDelay}ms</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-gray-500" />
                            <label className="text-sm text-gray-600">Preview:</label>
                            <input
                                type="checkbox"
                                checked={isPreviewVisible}
                                onChange={(e) => setIsPreviewVisible(e.target.checked)}
                                className="rounded"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Monitor className="w-4 h-4 text-gray-500" />
                            <label className="text-sm text-gray-600">Console:</label>
                            <input
                                type="checkbox"
                                checked={showConsole}
                                onChange={(e) => setShowConsole(e.target.checked)}
                                className="rounded"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Área Principal */}
            <div className="flex-1 flex">
                {/* Preview */}
                {isPreviewVisible && (
                    <div className="flex-1 flex flex-col">
                        <div className={`p-2 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
                            }`}>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    📱 {currentDevice.name} ({currentDevice.width}x{currentDevice.height})
                                </span>
                                <div className="flex items-center space-x-2 text-xs">
                                    <span className={`px-2 py-1 rounded ${isRunning
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {isRunning ? '🟢 Rodando' : '🔴 Parado'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative overflow-hidden">
                            <div
                                ref={previewRef}
                                className="w-full h-full flex items-center justify-center bg-gray-100"
                                style={{
                                    width: currentDevice.width,
                                    height: currentDevice.height,
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    margin: '0 auto'
                                }}
                            >
                                <iframe
                                    ref={iframeRef}
                                    srcDoc={generateFullHTML()}
                                    className="w-full h-full border-0 shadow-lg"
                                    title="Preview"
                                    sandbox="allow-scripts allow-same-origin"
                                    onLoad={() => setIsRunning(true)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Console */}
                {showConsole && (
                    <div className={`w-80 border-l ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
                        }`}>
                        <div className={`p-3 border-b ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-100'
                            }`}>
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold flex items-center space-x-2">
                                    <Monitor className="w-4 h-4" />
                                    <span>Console</span>
                                </h3>
                                <button
                                    onClick={clearConsole}
                                    className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                                >
                                    Limpar
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-3">
                            <div className={`h-64 overflow-y-auto font-mono text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                {consoleLogs.length === 0 ? (
                                    <div className="text-gray-500 text-center py-8">
                                        Nenhum log ainda...
                                    </div>
                                ) : (
                                    consoleLogs.map((log, index) => (
                                        <div key={index} className="py-1 border-b border-gray-200 last:border-b-0">
                                            {log}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



