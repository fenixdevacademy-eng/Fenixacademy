'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Zap, RefreshCw, Play, Pause, Settings, Eye, EyeOff, Wifi, WifiOff, AlertCircle, CheckCircle, Clock, Activity, Target, Monitor, Smartphone, Tablet, Code, FileText, Image, Video, Music, X } from 'lucide-react';

interface RealTimeHotReloadProps {
    className?: string;
    onReload?: (file: string) => void;
    onFileChange?: (file: string, content: string) => void;
    onConnectionChange?: (connected: boolean) => void;
    onSettingsChange?: (settings: HotReloadSettings) => void;
}

interface HotReloadSettings {
    enabled: boolean;
    autoReload: boolean;
    watchPatterns: string[];
    ignorePatterns: string[];
    debounceDelay: number;
    maxFileSize: number;
    enableNotifications: boolean;
    enableSound: boolean;
    port: number;
    host: string;
    protocol: 'http' | 'https' | 'ws' | 'wss';
    reconnectAttempts: number;
    reconnectDelay: number;
}

interface FileChange {
    id: string;
    file: string;
    type: 'added' | 'modified' | 'deleted' | 'renamed';
    timestamp: string;
    size: number;
    content?: string;
    oldPath?: string;
    newPath?: string;
}

interface ConnectionStatus {
    connected: boolean;
    lastConnected: string;
    reconnectAttempts: number;
    latency: number;
    uptime: number;
}

const defaultSettings: HotReloadSettings = {
    enabled: true,
    autoReload: true,
    watchPatterns: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.css', '**/*.scss', '**/*.html'],
    ignorePatterns: ['node_modules/**', '.git/**', 'dist/**', 'build/**'],
    debounceDelay: 300,
    maxFileSize: 10485760, // 10MB
    enableNotifications: true,
    enableSound: true,
    port: 3001,
    host: 'localhost',
    protocol: 'ws',
    reconnectAttempts: 5,
    reconnectDelay: 1000
};

const mockFileChanges: FileChange[] = [
    {
        id: '1',
        file: 'src/components/Header.tsx',
        type: 'modified',
        timestamp: '2024-01-20T15:30:00Z',
        size: 2048,
        content: 'export function Header() { return <div>Header</div>; }'
    },
    {
        id: '2',
        file: 'src/styles/globals.css',
        type: 'modified',
        timestamp: '2024-01-20T15:29:45Z',
        size: 1024,
        content: 'body { margin: 0; padding: 0; }'
    },
    {
        id: '3',
        file: 'src/utils/helpers.ts',
        type: 'added',
        timestamp: '2024-01-20T15:29:30Z',
        size: 512,
        content: 'export const formatDate = (date: Date) => date.toISOString();'
    }
];

const fileTypeIcons = {
    'ts': Code,
    'tsx': Code,
    'js': Code,
    'jsx': Code,
    'css': FileText,
    'scss': FileText,
    'html': FileText,
    'json': FileText,
    'md': FileText,
    'jpg': Image,
    'jpeg': Image,
    'png': Image,
    'gif': Image,
    'svg': Image,
    'mp4': Video,
    'webm': Video,
    'mp3': Music,
    'wav': Music,
    'default': FileText
};

const deviceTypes = [
    { type: 'desktop', label: 'Desktop', icon: Monitor, color: 'text-blue-500' },
    { type: 'tablet', label: 'Tablet', icon: Tablet, color: 'text-green-500' },
    { type: 'mobile', label: 'Mobile', icon: Smartphone, color: 'text-purple-500' }
];

export function RealTimeHotReload({
    className = '',
    onReload,
    onFileChange,
    onConnectionChange,
    onSettingsChange
}: RealTimeHotReloadProps) {
    const [settings, setSettings] = useState<HotReloadSettings>(defaultSettings);
    const [fileChanges, setFileChanges] = useState<FileChange[]>(mockFileChanges);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
        connected: true,
        lastConnected: '2024-01-20T15:30:00Z',
        reconnectAttempts: 0,
        latency: 45,
        uptime: 3600
    });
    const [isRunning, setIsRunning] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [showFileChanges, setShowFileChanges] = useState(true);
    const [selectedFile, setSelectedFile] = useState<FileChange | null>(null);
    const [connectedDevices, setConnectedDevices] = useState([
        { id: '1', type: 'desktop', name: 'Chrome - Windows', lastSeen: '2024-01-20T15:30:00Z' },
        { id: '2', type: 'mobile', name: 'Safari - iOS', lastSeen: '2024-01-20T15:29:45Z' },
        { id: '3', type: 'tablet', name: 'Chrome - Android', lastSeen: '2024-01-20T15:29:30Z' }
    ]);

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
    const statsRef = useRef({
        filesChanged: 0,
        reloadsTriggered: 0,
        errors: 0,
        startTime: Date.now()
    });

    useEffect(() => {
        if (settings.enabled) {
            startHotReload();
        } else {
            stopHotReload();
        }

        return () => {
            stopHotReload();
        };
    }, [settings.enabled]);

    const startHotReload = () => {
        try {
            const wsUrl = `${settings.protocol}://${settings.host}:${settings.port}`;
            wsRef.current = new WebSocket(wsUrl);

            wsRef.current.onopen = () => {
                setConnectionStatus(prev => ({
                    ...prev,
                    connected: true,
                    lastConnected: new Date().toISOString(),
                    reconnectAttempts: 0
                }));
                onConnectionChange?.(true);
            };

            wsRef.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    handleFileChange(data);
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            wsRef.current.onclose = () => {
                setConnectionStatus(prev => ({
                    ...prev,
                    connected: false
                }));
                onConnectionChange?.(false);

                if (settings.enabled && connectionStatus.reconnectAttempts < settings.reconnectAttempts) {
                    scheduleReconnect();
                }
            };

            wsRef.current.onerror = (error) => {
                console.error('WebSocket error:', error);
                statsRef.current.errors++;
            };
        } catch (error) {
            console.error('Error starting hot reload:', error);
        }
    };

    const stopHotReload = () => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }
    };

    const scheduleReconnect = () => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }

        reconnectTimeoutRef.current = setTimeout(() => {
            setConnectionStatus(prev => ({
                ...prev,
                reconnectAttempts: prev.reconnectAttempts + 1
            }));
            startHotReload();
        }, settings.reconnectDelay);
    };

    const handleFileChange = (data: any) => {
        const fileChange: FileChange = {
            id: Date.now().toString(),
            file: data.file,
            type: data.type || 'modified',
            timestamp: new Date().toISOString(),
            size: data.size || 0,
            content: data.content,
            oldPath: data.oldPath,
            newPath: data.newPath
        };

        setFileChanges(prev => [fileChange, ...prev.slice(0, 99)]); // Keep last 100 changes
        statsRef.current.filesChanged++;

        onFileChange?.(fileChange.file, fileChange.content || '');

        if (settings.autoReload) {
            triggerReload(fileChange.file);
        }
    };

    const triggerReload = (file: string) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                type: 'reload',
                file: file,
                timestamp: new Date().toISOString()
            }));
            statsRef.current.reloadsTriggered++;
            onReload?.(file);
        }
    };

    const handleSettingsChange = (newSettings: Partial<HotReloadSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        onSettingsChange?.(updatedSettings);
    };

    const handleStartStop = () => {
        if (isRunning) {
            setIsRunning(false);
            stopHotReload();
        } else {
            setIsRunning(true);
            startHotReload();
        }
    };

    const handleClearChanges = () => {
        setFileChanges([]);
    };

    const handleFileSelect = (fileChange: FileChange) => {
        setSelectedFile(fileChange);
    };

    const getFileIcon = (filename: string) => {
        const extension = filename.split('.').pop()?.toLowerCase() || 'default';
        const IconComponent = fileTypeIcons[extension as keyof typeof fileTypeIcons] || fileTypeIcons.default;
        return IconComponent;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatUptime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    const getChangeTypeColor = (type: string) => {
        switch (type) {
            case 'added':
                return 'text-green-600 bg-green-100 dark:bg-green-900/20';
            case 'modified':
                return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
            case 'deleted':
                return 'text-red-600 bg-red-100 dark:bg-red-900/20';
            case 'renamed':
                return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Zap className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Hot Reload em Tempo Real
                        </h3>
                        <div className={`w-2 h-2 rounded-full ${connectionStatus.connected ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFileChanges(!showFileChanges)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Mostrar/Ocultar Mudanças"
                        >
                            {showFileChanges ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Configurações"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleStartStop}
                            className={`p-2 rounded-lg transition-colors ${isRunning
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                            title={isRunning ? 'Parar' : 'Iniciar'}
                        >
                            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Connection Status */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${connectionStatus.connected ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                        <span className="text-gray-600 dark:text-gray-400">
                            {connectionStatus.connected ? 'Conectado' : 'Desconectado'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                            Latência: {connectionStatus.latency}ms
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                            Uptime: {formatUptime(connectionStatus.uptime)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                            Arquivos: {statsRef.current.filesChanged}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex h-96">
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* File Changes */}
                    {showFileChanges && (
                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    Mudanças de Arquivos
                                </h4>
                                <button
                                    onClick={handleClearChanges}
                                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 rounded transition-colors"
                                >
                                    Limpar
                                </button>
                            </div>

                            <div className="space-y-2">
                                {fileChanges.map((change) => {
                                    const FileIcon = getFileIcon(change.file);
                                    return (
                                        <div
                                            key={change.id}
                                            onClick={() => handleFileSelect(change)}
                                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedFile?.id === change.id
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileIcon className="w-4 h-4 text-gray-500" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-medium text-gray-900 dark:text-white truncate">
                                                            {change.file}
                                                        </span>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${getChangeTypeColor(change.type)}`}>
                                                            {change.type}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                                        <span>{formatTime(change.timestamp)}</span>
                                                        <span>{formatFileSize(change.size)}</span>
                                                        {change.oldPath && (
                                                            <span>De: {change.oldPath}</span>
                                                        )}
                                                        {change.newPath && (
                                                            <span>Para: {change.newPath}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        triggerReload(change.file);
                                                    }}
                                                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                                                    title="Recarregar arquivo"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Connected Devices */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Dispositivos Conectados
                        </h4>
                        <div className="flex gap-4">
                            {connectedDevices.map((device) => {
                                const deviceType = deviceTypes.find(d => d.type === device.type);
                                const DeviceIcon = deviceType?.icon || Monitor;
                                return (
                                    <div
                                        key={device.id}
                                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                    >
                                        <DeviceIcon className={`w-4 h-4 ${deviceType?.color || 'text-gray-500'}`} />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {device.name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {formatTime(device.lastSeen)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Configurações
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enabled}
                                        onChange={(e) => handleSettingsChange({ enabled: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Habilitar Hot Reload
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.autoReload}
                                        onChange={(e) => handleSettingsChange({ autoReload: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Recarregamento Automático
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableNotifications}
                                        onChange={(e) => handleSettingsChange({ enableNotifications: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Notificações
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableSound}
                                        onChange={(e) => handleSettingsChange({ enableSound: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Som
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Porta: {settings.port}
                                </label>
                                <input
                                    type="range"
                                    min="3000"
                                    max="9999"
                                    value={settings.port}
                                    onChange={(e) => handleSettingsChange({ port: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Delay (ms): {settings.debounceDelay}
                                </label>
                                <input
                                    type="range"
                                    min="100"
                                    max="2000"
                                    step="100"
                                    value={settings.debounceDelay}
                                    onChange={(e) => handleSettingsChange({ debounceDelay: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tamanho Máximo (MB): {Math.round(settings.maxFileSize / 1048576)}
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={Math.round(settings.maxFileSize / 1048576)}
                                    onChange={(e) => handleSettingsChange({ maxFileSize: parseInt(e.target.value) * 1048576 })}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* File Details */}
                {selectedFile && (
                    <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 p-4">
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {selectedFile.file}
                                </h4>
                                <button
                                    onClick={() => setSelectedFile(null)}
                                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                <div>
                                    <span className="font-medium">Tipo:</span> {selectedFile.type}
                                </div>
                                <div>
                                    <span className="font-medium">Tamanho:</span> {formatFileSize(selectedFile.size)}
                                </div>
                                <div>
                                    <span className="font-medium">Timestamp:</span> {formatTime(selectedFile.timestamp)}
                                </div>
                                <div>
                                    <span className="font-medium">Arquivo:</span> {selectedFile.file}
                                </div>
                            </div>

                            {selectedFile.content && (
                                <div>
                                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                                        Conteúdo
                                    </h5>
                                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto max-h-48">
                                        <code>{selectedFile.content}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}





