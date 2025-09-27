'use client';

import React, { useState, useEffect } from 'react';
import { X, Activity, Cpu, HardDrive, Wifi, Zap, TrendingUp, TrendingDown, Monitor, Smartphone, Tablet } from 'lucide-react';

interface PerformanceMonitorProps {
    onClose: () => void;
    className?: string;
}

interface PerformanceMetrics {
    memory: {
        used: number;
        total: number;
        heap: number;
    };
    cpu: {
        usage: number;
        cores: number;
    };
    network: {
        requests: number;
        bytesReceived: number;
        bytesSent: number;
    };
    editor: {
        latency: number;
        renderTime: number;
        updateTime: number;
    };
    fps: number;
    loadTime: number;
    bundleSize: number;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ onClose, className = '' }) => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        memory: { used: 0, total: 0, heap: 0 },
        cpu: { usage: 0, cores: 4 },
        network: { requests: 0, bytesReceived: 0, bytesSent: 0 },
        editor: { latency: 0, renderTime: 0, updateTime: 0 },
        fps: 0,
        loadTime: 0,
        bundleSize: 0
    });

    const [isMonitoring, setIsMonitoring] = useState(false);
    const [history, setHistory] = useState<PerformanceMetrics[]>([]);
    const [deviceType, setDeviceType] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');

    useEffect(() => {
        // Detect device type
        const detectDevice = () => {
            const width = window.innerWidth;
            if (width < 768) return 'mobile';
            if (width < 1024) return 'tablet';
            return 'desktop';
        };

        setDeviceType(detectDevice());

        // Start monitoring
        startMonitoring();

        return () => {
            stopMonitoring();
        };
    }, []);

    const startMonitoring = () => {
        setIsMonitoring(true);
        const interval = setInterval(updateMetrics, 1000);
        return () => clearInterval(interval);
    };

    const stopMonitoring = () => {
        setIsMonitoring(false);
    };

    const updateMetrics = () => {
        if (!isMonitoring) return;

        // Simulate performance metrics
        const newMetrics: PerformanceMetrics = {
            memory: {
                used: Math.random() * 1000 + 500, // MB
                total: 2048, // MB
                heap: Math.random() * 500 + 200 // MB
            },
            cpu: {
                usage: Math.random() * 100, // %
                cores: navigator.hardwareConcurrency || 4
            },
            network: {
                requests: Math.floor(Math.random() * 50) + 10,
                bytesReceived: Math.floor(Math.random() * 1000000) + 500000,
                bytesSent: Math.floor(Math.random() * 100000) + 50000
            },
            editor: {
                latency: Math.random() * 50 + 10, // ms
                renderTime: Math.random() * 16 + 8, // ms
                updateTime: Math.random() * 20 + 5 // ms
            },
            fps: Math.floor(Math.random() * 30) + 30, // FPS
            loadTime: Math.random() * 2000 + 500, // ms
            bundleSize: Math.random() * 500 + 200 // KB
        };

        setMetrics(newMetrics);
        setHistory(prev => [...prev.slice(-29), newMetrics]); // Keep last 30 measurements
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatTime = (ms: number) => {
        return ms < 1000 ? `${ms.toFixed(0)}ms` : `${(ms / 1000).toFixed(1)}s`;
    };

    const getPerformanceColor = (value: number, thresholds: { good: number; warning: number }) => {
        if (value <= thresholds.good) return 'text-green-600';
        if (value <= thresholds.warning) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getDeviceIcon = () => {
        switch (deviceType) {
            case 'mobile': return <Smartphone className="w-4 h-4" />;
            case 'tablet': return <Tablet className="w-4 h-4" />;
            default: return <Monitor className="w-4 h-4" />;
        }
    };

    const memoryUsage = (metrics.memory.used / metrics.memory.total) * 100;
    const cpuUsage = metrics.cpu.usage;
    const fps = metrics.fps;

    return (
        <div className={`performance-monitor bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Performance Monitor</h2>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        {getDeviceIcon()}
                        <span className="capitalize">{deviceType}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="p-4 space-y-6">
                {/* Memory Usage */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <HardDrive className="w-4 h-4 text-gray-600" />
                            <h3 className="font-medium text-gray-900">Memory Usage</h3>
                        </div>
                        <span className={`text-sm font-medium ${getPerformanceColor(memoryUsage, { good: 60, warning: 80 })}`}>
                            {memoryUsage.toFixed(1)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${memoryUsage <= 60 ? 'bg-green-500' :
                                    memoryUsage <= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${memoryUsage}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                        <span>Used: {formatBytes(metrics.memory.used * 1024 * 1024)}</span>
                        <span>Total: {formatBytes(metrics.memory.total * 1024 * 1024)}</span>
                    </div>
                </div>

                {/* CPU Usage */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-gray-600" />
                            <h3 className="font-medium text-gray-900">CPU Usage</h3>
                        </div>
                        <span className={`text-sm font-medium ${getPerformanceColor(cpuUsage, { good: 50, warning: 80 })}`}>
                            {cpuUsage.toFixed(1)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${cpuUsage <= 50 ? 'bg-green-500' :
                                    cpuUsage <= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${cpuUsage}%` }}
                        ></div>
                    </div>
                    <div className="text-xs text-gray-600">
                        {metrics.cpu.cores} cores available
                    </div>
                </div>

                {/* Network Activity */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Wifi className="w-4 h-4 text-gray-600" />
                        <h3 className="font-medium text-gray-900">Network Activity</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-gray-600">Requests</div>
                            <div className="font-medium">{metrics.network.requests}</div>
                        </div>
                        <div>
                            <div className="text-gray-600">Received</div>
                            <div className="font-medium">{formatBytes(metrics.network.bytesReceived)}</div>
                        </div>
                        <div>
                            <div className="text-gray-600">Sent</div>
                            <div className="font-medium">{formatBytes(metrics.network.bytesSent)}</div>
                        </div>
                        <div>
                            <div className="text-gray-600">Total</div>
                            <div className="font-medium">
                                {formatBytes(metrics.network.bytesReceived + metrics.network.bytesSent)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor Performance */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-gray-600" />
                        <h3 className="font-medium text-gray-900">Editor Performance</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <div className="text-gray-600">Latency</div>
                            <div className={`font-medium ${getPerformanceColor(metrics.editor.latency, { good: 20, warning: 50 })}`}>
                                {metrics.editor.latency.toFixed(1)}ms
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-600">Render Time</div>
                            <div className={`font-medium ${getPerformanceColor(metrics.editor.renderTime, { good: 16, warning: 33 })}`}>
                                {metrics.editor.renderTime.toFixed(1)}ms
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-600">Update Time</div>
                            <div className={`font-medium ${getPerformanceColor(metrics.editor.updateTime, { good: 16, warning: 33 })}`}>
                                {metrics.editor.updateTime.toFixed(1)}ms
                            </div>
                        </div>
                    </div>
                </div>

                {/* FPS and Load Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-gray-600" />
                            <h3 className="font-medium text-gray-900">FPS</h3>
                        </div>
                        <div className={`text-2xl font-bold ${getPerformanceColor(fps, { good: 50, warning: 30 })}`}>
                            {fps}
                        </div>
                        <div className="text-xs text-gray-600">
                            {fps >= 50 ? 'Smooth' : fps >= 30 ? 'Good' : 'Poor'}
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-gray-600" />
                            <h3 className="font-medium text-gray-900">Load Time</h3>
                        </div>
                        <div className={`text-2xl font-bold ${getPerformanceColor(metrics.loadTime, { good: 1000, warning: 3000 })}`}>
                            {formatTime(metrics.loadTime)}
                        </div>
                        <div className="text-xs text-gray-600">
                            {metrics.loadTime < 1000 ? 'Fast' : metrics.loadTime < 3000 ? 'Good' : 'Slow'}
                        </div>
                    </div>
                </div>

                {/* Bundle Size */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-gray-600" />
                            <h3 className="font-medium text-gray-900">Bundle Size</h3>
                        </div>
                        <div className={`font-medium ${getPerformanceColor(metrics.bundleSize, { good: 200, warning: 500 })}`}>
                            {metrics.bundleSize.toFixed(0)} KB
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setIsMonitoring(!isMonitoring)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${isMonitoring
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                    >
                        {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
                    </button>

                    <div className="text-xs text-gray-500">
                        Last updated: {new Date().toLocaleTimeString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceMonitor;