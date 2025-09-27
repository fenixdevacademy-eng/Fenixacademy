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
    type: 'browser' | 'mobile' | 'desktop';
    url: string;
    isActive: boolean;
    lastReload: Date | null;
}

export function HotReload({ isOpen, onClose, currentFile, onReload }: HotReloadProps) {
    const [targets, setTargets] = useState<ReloadTarget[]>([
        {
            id: '1',
            name: 'Chrome - Desktop',
            type: 'browser',
            url: 'http://localhost:3000',
            isActive: true,
            lastReload: null
        },
        {
            id: '2',
            name: 'Firefox - Desktop',
            type: 'browser',
            url: 'http://localhost:3000',
            isActive: false,
            lastReload: null
        },
        {
            id: '3',
            name: 'Mobile - iPhone',
            type: 'mobile',
            url: 'http://192.168.1.100:3000',
            isActive: false,
            lastReload: null
        }
    ]);

    const [isReloading, setIsReloading] = useState(false);
    const [autoReload, setAutoReload] = useState(true);
    const [reloadDelay, setReloadDelay] = useState(500);
    const [showSettings, setShowSettings] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isOpen) {
            connectWebSocket();
        } else {
            disconnectWebSocket();
        }

        return () => {
            disconnectWebSocket();
        };
    }, [isOpen]);

    useEffect(() => {
        if (autoReload && currentFile) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            
            timeoutRef.current = setTimeout(() => {
                handleReloadAll();
            }, reloadDelay);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentFile, autoReload, reloadDelay]);

    const connectWebSocket = () => {
        try {
            wsRef.current = new WebSocket('ws://localhost:3001');
            
            wsRef.current.onopen = () => {
                console.log('Hot reload WebSocket connected');
            };
            
            wsRef.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'reload') {
                    handleReloadAll();
                }
            };
            
            wsRef.current.onclose = () => {
                console.log('Hot reload WebSocket disconnected');
            };
            
            wsRef.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        } catch (error) {
            console.error('Failed to connect to WebSocket:', error);
        }
    };

    const disconnectWebSocket = () => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
    };

    const handleReloadAll = async () => {
        if (isReloading) return;
        
        setIsReloading(true);
        
        try {
            const activeTargets = targets.filter(target => target.isActive);
            
            for (const target of activeTargets) {
                await reloadTarget(target);
            }
            
            // Update last reload time
            setTargets(prev => prev.map(target => ({
                ...target,
                lastReload: target.isActive ? new Date() : target.lastReload
            })));
            
            // Call onReload callback if provided
            if (onReload && currentFile) {
                onReload(currentFile.content);
            }
        } catch (error) {
            console.error('Error reloading targets:', error);
        } finally {
            setIsReloading(false);
        }
    };

    const reloadTarget = async (target: ReloadTarget) => {
        try {
            // Simulate reload by sending message to target
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({
                    type: 'reload',
                    target: target.id,
                    url: target.url
                }));
            }
            
            // In a real implementation, you would send a message to the target
            // This could be through WebSocket, HTTP request, or other means
            console.log(`Reloading ${target.name} at ${target.url}`);
        } catch (error) {
            console.error(`Failed to reload ${target.name}:`, error);
        }
    };

    const toggleTarget = (targetId: string) => {
        setTargets(prev => prev.map(target => 
            target.id === targetId 
                ? { ...target, isActive: !target.isActive }
                : target
        ));
    };

    const getTargetIcon = (type: string) => {
        switch (type) {
            case 'browser': return <Globe className="w-4 h-4" />;
            case 'mobile': return <Smartphone className="w-4 h-4" />;
            case 'desktop': return <Monitor className="w-4 h-4" />;
            default: return <Code className="w-4 h-4" />;
        }
    };

    const formatLastReload = (date: Date | null) => {
        if (!date) return 'Never';
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <h2 className="text-lg font-semibold text-gray-900">Hot Reload</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 hover:bg-gray-100 rounded"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="font-medium text-gray-900 mb-3">Settings</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-700">Auto Reload</label>
                                <button
                                    onClick={() => setAutoReload(!autoReload)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        autoReload ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            autoReload ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Reload Delay (ms)</label>
                                <input
                                    type="number"
                                    value={reloadDelay}
                                    onChange={(e) => setReloadDelay(Number(e.target.value))}
                                    className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                                    min="100"
                                    max="5000"
                                    step="100"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="p-4 overflow-y-auto max-h-96">
                    {/* Current File Info */}
                    {currentFile && (
                        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Code className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-blue-900">Current File</span>
                            </div>
                            <p className="text-sm text-blue-800">{currentFile.name}</p>
                            <p className="text-xs text-blue-600">{currentFile.language}</p>
                        </div>
                    )}

                    {/* Reload Targets */}
                    <div className="space-y-3">
                        <h3 className="font-medium text-gray-900">Reload Targets</h3>
                        {targets.map((target) => (
                            <div
                                key={target.id}
                                className={`p-3 border rounded-lg ${
                                    target.isActive ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {getTargetIcon(target.type)}
                                        <div>
                                            <p className="font-medium text-gray-900">{target.name}</p>
                                            <p className="text-sm text-gray-600">{target.url}</p>
                                            <p className="text-xs text-gray-500">
                                                Last reload: {formatLastReload(target.lastReload)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleTarget(target.id)}
                                            className={`px-3 py-1 rounded text-sm ${
                                                target.isActive
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700'
                                            }`}
                                        >
                                            {target.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-2">
                        <button
                            onClick={handleReloadAll}
                            disabled={isReloading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isReloading ? (
                                <>
                                    <RotateCcw className="w-4 h-4 animate-spin" />
                                    Reloading...
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" />
                                    Reload All
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => setAutoReload(!autoReload)}
                            className={`px-4 py-2 rounded flex items-center gap-2 ${
                                autoReload
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            <Zap className="w-4 h-4" />
                            {autoReload ? 'Auto ON' : 'Auto OFF'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}