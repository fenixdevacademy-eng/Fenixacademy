'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Activity,
    Cpu,
    MemoryStick,
    HardDrive,
    Wifi,
    WifiOff,
    AlertCircle,
    CheckCircle,
    Clock,
    Target,
    Zap,
    TrendingUp,
    TrendingDown,
    BarChart3,
    LineChart,
    PieChart,
    Settings,
    Play,
    Pause,
    Square,
    RotateCcw,
    Download,
    Upload,
    Eye,
    EyeOff,
    Maximize2,
    Minimize2,
    RefreshCw,
    Filter,
    Search,
    MoreVertical,
    Trash2,
    Edit,
    Copy,
    Share2,
    ExternalLink,
    Monitor,
    Smartphone,
    Tablet,
    Globe,
    Server,
    Database,
    Cloud,
    Shield,
    Lock,
    Unlock,
    Power,
    PowerOff
} from 'lucide-react';

interface RealTimePerformanceMonitoringProps {
    className?: string;
    onPerformanceAlert?: (alert: PerformanceAlert) => void;
    onThresholdChange?: (thresholds: PerformanceThresholds) => void;
    onSettingsChange?: (settings: MonitoringSettings) => void;
    onExport?: (data: PerformanceData) => void;
}

interface PerformanceAlert {
    id: string;
    type: 'cpu' | 'memory' | 'disk' | 'network' | 'error' | 'warning' | 'info';
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    timestamp: string;
    value: number;
    threshold: number;
    isResolved: boolean;
    resolvedAt?: string;
}

interface PerformanceThresholds {
    cpu: {
        warning: number;
        critical: number;
    };
    memory: {
        warning: number;
        critical: number;
    };
    disk: {
        warning: number;
        critical: number;
    };
    network: {
        warning: number;
        critical: number;
    };
}

interface MonitoringSettings {
    enabled: boolean;
    refreshInterval: number;
    maxDataPoints: number;
    enableAlerts: boolean;
    enableNotifications: boolean;
    enableSound: boolean;
    enableDesktopNotifications: boolean;
    autoRefresh: boolean;
    showTrends: boolean;
    showForecasts: boolean;
    enableLogging: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
}

interface PerformanceData {
    timestamp: string;
    cpu: {
        usage: number;
        cores: number;
        temperature: number;
        frequency: number;
    };
    memory: {
        used: number;
        total: number;
        available: number;
        percentage: number;
    };
    disk: {
        used: number;
        total: number;
        available: number;
        percentage: number;
        readSpeed: number;
        writeSpeed: number;
    };
    network: {
        bytesIn: number;
        bytesOut: number;
        packetsIn: number;
        packetsOut: number;
        latency: number;
        bandwidth: number;
    };
    system: {
        uptime: number;
        loadAverage: number[];
        processes: number;
        threads: number;
    };
}

const defaultThresholds: PerformanceThresholds = {
    cpu: { warning: 70, critical: 90 },
    memory: { warning: 80, critical: 95 },
    disk: { warning: 85, critical: 95 },
    network: { warning: 80, critical: 95 }
};

const defaultSettings: MonitoringSettings = {
    enabled: true,
    refreshInterval: 1000,
    maxDataPoints: 100,
    enableAlerts: true,
    enableNotifications: true,
    enableSound: true,
    enableDesktopNotifications: false,
    autoRefresh: true,
    showTrends: true,
    showForecasts: false,
    enableLogging: true,
    logLevel: 'info'
};

const mockPerformanceData: PerformanceData[] = [
    {
        timestamp: '2024-01-20T15:30:00Z',
        cpu: { usage: 45, cores: 8, temperature: 65, frequency: 3200 },
        memory: { used: 6144, total: 16384, available: 10240, percentage: 37.5 },
        disk: { used: 500, total: 1000, available: 500, percentage: 50, readSpeed: 150, writeSpeed: 120 },
        network: { bytesIn: 1024000, bytesOut: 512000, packetsIn: 1500, packetsOut: 800, latency: 25, bandwidth: 1000 },
        system: { uptime: 3600, loadAverage: [1.2, 1.5, 1.8], processes: 156, threads: 1200 }
    }
];

const mockAlerts: PerformanceAlert[] = [
    {
        id: '1',
        type: 'cpu',
        severity: 'warning',
        message: 'CPU usage is above 70%',
        timestamp: '2024-01-20T15:25:00Z',
        value: 75,
        threshold: 70,
        isResolved: false
    },
    {
        id: '2',
        type: 'memory',
        severity: 'info',
        message: 'Memory usage is normal',
        timestamp: '2024-01-20T15:20:00Z',
        value: 45,
        threshold: 80,
        isResolved: true,
        resolvedAt: '2024-01-20T15:22:00Z'
    }
];

const severityColors = {
    low: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
    medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
    high: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
    critical: 'text-red-600 bg-red-100 dark:bg-red-900/20'
};

const alertTypeIcons = {
    cpu: Cpu,
    memory: MemoryStick,
    disk: HardDrive,
    network: Wifi,
    error: AlertCircle,
    warning: AlertCircle,
    info: CheckCircle
};

export function RealTimePerformanceMonitoring({
    className = '',
    onPerformanceAlert,
    onThresholdChange,
    onSettingsChange,
    onExport
}: RealTimePerformanceMonitoringProps) {
    const [performanceData, setPerformanceData] = useState<PerformanceData[]>(mockPerformanceData);
    const [alerts, setAlerts] = useState<PerformanceAlert[]>(mockAlerts);
    const [thresholds, setThresholds] = useState<PerformanceThresholds>(defaultThresholds);
    const [settings, setSettings] = useState<MonitoringSettings>(defaultSettings);
    const [isRunning, setIsRunning] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [showAlerts, setShowAlerts] = useState(true);
    const [selectedMetric, setSelectedMetric] = useState<'cpu' | 'memory' | 'disk' | 'network'>('cpu');
    const [viewMode, setViewMode] = useState<'realtime' | 'historical' | 'forecast'>('realtime');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout>();
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (settings.enabled && settings.autoRefresh) {
            startMonitoring();
        } else {
            stopMonitoring();
        }

        return () => {
            stopMonitoring();
        };
    }, [settings.enabled, settings.autoRefresh, settings.refreshInterval]);

    const startMonitoring = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            generateNewDataPoint();
        }, settings.refreshInterval);
    };

    const stopMonitoring = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
    };

    const generateNewDataPoint = () => {
        const now = new Date().toISOString();
        const lastData = performanceData[0];

        const newData: PerformanceData = {
            timestamp: now,
            cpu: {
                usage: Math.max(0, Math.min(100, lastData.cpu.usage + (Math.random() - 0.5) * 10)),
                cores: lastData.cpu.cores,
                temperature: Math.max(30, Math.min(90, lastData.cpu.temperature + (Math.random() - 0.5) * 5)),
                frequency: lastData.cpu.frequency
            },
            memory: {
                used: Math.max(0, Math.min(lastData.memory.total, lastData.memory.used + (Math.random() - 0.5) * 100)),
                total: lastData.memory.total,
                available: lastData.memory.total - Math.max(0, Math.min(lastData.memory.total, lastData.memory.used + (Math.random() - 0.5) * 100)),
                percentage: 0
            },
            disk: {
                used: Math.max(0, Math.min(lastData.disk.total, lastData.disk.used + (Math.random() - 0.5) * 10)),
                total: lastData.disk.total,
                available: lastData.disk.total - Math.max(0, Math.min(lastData.disk.total, lastData.disk.used + (Math.random() - 0.5) * 10)),
                percentage: 0,
                readSpeed: Math.max(0, lastData.disk.readSpeed + (Math.random() - 0.5) * 20),
                writeSpeed: Math.max(0, lastData.disk.writeSpeed + (Math.random() - 0.5) * 20)
            },
            network: {
                bytesIn: lastData.network.bytesIn + Math.random() * 1000,
                bytesOut: lastData.network.bytesOut + Math.random() * 500,
                packetsIn: lastData.network.packetsIn + Math.floor(Math.random() * 10),
                packetsOut: lastData.network.packetsOut + Math.floor(Math.random() * 5),
                latency: Math.max(1, lastData.network.latency + (Math.random() - 0.5) * 10),
                bandwidth: lastData.network.bandwidth
            },
            system: {
                uptime: lastData.system.uptime + 1,
                loadAverage: lastData.system.loadAverage.map(load => Math.max(0, load + (Math.random() - 0.5) * 0.2)),
                processes: lastData.system.processes + Math.floor((Math.random() - 0.5) * 2),
                threads: lastData.system.threads + Math.floor((Math.random() - 0.5) * 10)
            }
        };

        // Calculate percentages
        newData.memory.percentage = (newData.memory.used / newData.memory.total) * 100;
        newData.disk.percentage = (newData.disk.used / newData.disk.total) * 100;

        setPerformanceData(prev => [newData, ...prev.slice(0, settings.maxDataPoints - 1)]);

        // Check for alerts
        checkForAlerts(newData);
    };

    const checkForAlerts = (data: PerformanceData) => {
        const newAlerts: PerformanceAlert[] = [];

        // CPU Alert
        if (data.cpu.usage >= thresholds.cpu.critical) {
            newAlerts.push({
                id: Date.now().toString(),
                type: 'cpu',
                severity: 'critical',
                message: `CPU usage is critical: ${data.cpu.usage.toFixed(1)}%`,
                timestamp: data.timestamp,
                value: data.cpu.usage,
                threshold: thresholds.cpu.critical,
                isResolved: false
            });
        } else if (data.cpu.usage >= thresholds.cpu.warning) {
            newAlerts.push({
                id: Date.now().toString(),
                type: 'cpu',
                severity: 'high',
                message: `CPU usage is high: ${data.cpu.usage.toFixed(1)}%`,
                timestamp: data.timestamp,
                value: data.cpu.usage,
                threshold: thresholds.cpu.warning,
                isResolved: false
            });
        }

        // Memory Alert
        if (data.memory.percentage >= thresholds.memory.critical) {
            newAlerts.push({
                id: (Date.now() + 1).toString(),
                type: 'memory',
                severity: 'critical',
                message: `Memory usage is critical: ${data.memory.percentage.toFixed(1)}%`,
                timestamp: data.timestamp,
                value: data.memory.percentage,
                threshold: thresholds.memory.critical,
                isResolved: false
            });
        } else if (data.memory.percentage >= thresholds.memory.warning) {
            newAlerts.push({
                id: (Date.now() + 1).toString(),
                type: 'memory',
                severity: 'high',
                message: `Memory usage is high: ${data.memory.percentage.toFixed(1)}%`,
                timestamp: data.timestamp,
                value: data.memory.percentage,
                threshold: thresholds.memory.warning,
                isResolved: false
            });
        }

        if (newAlerts.length > 0) {
            setAlerts(prev => [...newAlerts, ...prev.slice(0, 99)]);
            newAlerts.forEach(alert => onPerformanceAlert?.(alert));
        }
    };

    const handleStartStop = () => {
        if (isRunning) {
            setIsRunning(false);
            stopMonitoring();
        } else {
            setIsRunning(true);
            startMonitoring();
        }
    };

    const handleClearData = () => {
        setPerformanceData([]);
    };

    const handleClearAlerts = () => {
        setAlerts([]);
    };

    const handleResolveAlert = (alertId: string) => {
        setAlerts(prev => prev.map(alert =>
            alert.id === alertId
                ? { ...alert, isResolved: true, resolvedAt: new Date().toISOString() }
                : alert
        ));
    };

    const handleThresholdChange = (metric: keyof PerformanceThresholds, type: 'warning' | 'critical', value: number) => {
        const newThresholds = {
            ...thresholds,
            [metric]: {
                ...thresholds[metric],
                [type]: value
            }
        };
        setThresholds(newThresholds);
        onThresholdChange?.(newThresholds);
    };

    const handleSettingsChange = (newSettings: Partial<MonitoringSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        onSettingsChange?.(updatedSettings);
    };

    const handleExport = () => {
        const data = {
            performanceData,
            alerts,
            thresholds,
            settings,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        onExport?.(performanceData[0]);
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatUptime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getCurrentData = () => performanceData[0] || mockPerformanceData[0];

    const renderMetricCard = (title: string, value: number, unit: string, icon: React.ComponentType<any>, color: string) => {
        const Icon = icon;
        return (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${color}`} />
                        <span className="font-medium text-gray-900 dark:text-white">{title}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {value.toFixed(1)}{unit}
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ${color.replace('text-', 'bg-')}`}
                        style={{ width: `${Math.min(100, value)}%` }}
                    ></div>
                </div>
            </div>
        );
    };

    const renderAlert = (alert: PerformanceAlert) => {
        const AlertIcon = alertTypeIcons[alert.type];
        return (
            <div
                key={alert.id}
                className={`p-3 border-l-4 rounded-lg ${alert.isResolved
                        ? 'border-gray-300 bg-gray-50 dark:bg-gray-700'
                        : `border-${alert.severity === 'critical' ? 'red' : alert.severity === 'high' ? 'orange' : 'yellow'}-500 bg-${alert.severity === 'critical' ? 'red' : alert.severity === 'high' ? 'orange' : 'yellow'}-50 dark:bg-${alert.severity === 'critical' ? 'red' : alert.severity === 'high' ? 'orange' : 'yellow'}-900/20`
                    }`}
            >
                <div className="flex items-start gap-3">
                    <AlertIcon className={`w-5 h-5 mt-0.5 ${alert.isResolved ? 'text-gray-400' :
                            alert.severity === 'critical' ? 'text-red-500' :
                                alert.severity === 'high' ? 'text-orange-500' :
                                    'text-yellow-500'
                        }`} />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${severityColors[alert.severity]}`}>
                                {alert.severity}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatTime(alert.timestamp)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white mb-2">
                            {alert.message}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>Value: {alert.value.toFixed(1)}</span>
                            <span>Threshold: {alert.threshold}</span>
                            {alert.resolvedAt && (
                                <span>Resolved: {formatTime(alert.resolvedAt)}</span>
                            )}
                        </div>
                    </div>
                    {!alert.isResolved && (
                        <button
                            onClick={() => handleResolveAlert(alert.id)}
                            className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                            title="Resolve alert"
                        >
                            <CheckCircle className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Activity className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Monitoramento de Performance
                        </h3>
                        <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowAlerts(!showAlerts)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Mostrar/Ocultar Alertas"
                        >
                            {showAlerts ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                            title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                        >
                            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
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

                {/* Status Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                            Uptime: {formatUptime(getCurrentData().system.uptime)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                            Processos: {getCurrentData().system.processes}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                            Load: {getCurrentData().system.loadAverage[0].toFixed(2)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                            Latência: {getCurrentData().network.latency.toFixed(0)}ms
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex h-96">
                {/* Main Content */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {renderMetricCard(
                            'CPU Usage',
                            getCurrentData().cpu.usage,
                            '%',
                            Cpu,
                            'text-blue-500'
                        )}
                        {renderMetricCard(
                            'Memory Usage',
                            getCurrentData().memory.percentage,
                            '%',
                            MemoryStick,
                            'text-green-500'
                        )}
                        {renderMetricCard(
                            'Disk Usage',
                            getCurrentData().disk.percentage,
                            '%',
                            HardDrive,
                            'text-orange-500'
                        )}
                        {renderMetricCard(
                            'Network Usage',
                            (getCurrentData().network.bytesIn + getCurrentData().network.bytesOut) / 1000000,
                            'MB/s',
                            Wifi,
                            'text-purple-500'
                        )}
                    </div>

                    {/* Detailed Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                CPU Details
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Cores:</span>
                                    <span className="text-gray-900 dark:text-white">{getCurrentData().cpu.cores}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Temperature:</span>
                                    <span className="text-gray-900 dark:text-white">{getCurrentData().cpu.temperature.toFixed(1)}°C</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Frequency:</span>
                                    <span className="text-gray-900 dark:text-white">{getCurrentData().cpu.frequency}MHz</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Memory Details
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Used:</span>
                                    <span className="text-gray-900 dark:text-white">{formatBytes(getCurrentData().memory.used)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Available:</span>
                                    <span className="text-gray-900 dark:text-white">{formatBytes(getCurrentData().memory.available)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Total:</span>
                                    <span className="text-gray-900 dark:text-white">{formatBytes(getCurrentData().memory.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alerts */}
                    {showAlerts && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    Alertas ({alerts.filter(a => !a.isResolved).length} ativos)
                                </h4>
                                <button
                                    onClick={handleClearAlerts}
                                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 rounded transition-colors"
                                >
                                    Limpar
                                </button>
                            </div>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {alerts.slice(0, 10).map(renderAlert)}
                            </div>
                        </div>
                    )}
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
                                        Habilitar Monitoramento
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.autoRefresh}
                                        onChange={(e) => handleSettingsChange({ autoRefresh: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Atualização Automática
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Intervalo (ms): {settings.refreshInterval}
                                </label>
                                <input
                                    type="range"
                                    min="500"
                                    max="5000"
                                    step="100"
                                    value={settings.refreshInterval}
                                    onChange={(e) => handleSettingsChange({ refreshInterval: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Máximo de Pontos: {settings.maxDataPoints}
                                </label>
                                <input
                                    type="range"
                                    min="50"
                                    max="500"
                                    step="10"
                                    value={settings.maxDataPoints}
                                    onChange={(e) => handleSettingsChange({ maxDataPoints: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableAlerts}
                                        onChange={(e) => handleSettingsChange({ enableAlerts: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Habilitar Alertas
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
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                                Limites de Alerta
                            </h5>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        CPU Warning: {thresholds.cpu.warning}%
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={thresholds.cpu.warning}
                                        onChange={(e) => handleThresholdChange('cpu', 'warning', parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Memory Warning: {thresholds.memory.warning}%
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={thresholds.memory.warning}
                                        onChange={(e) => handleThresholdChange('memory', 'warning', parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



