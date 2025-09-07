'use client';

import React, { useState, useEffect } from 'react';
import { X, Activity, Cpu, HardDrive, Wifi, Zap, TrendingUp, TrendingDown } from 'lucide-react';

interface PerformanceMonitorProps {
    onClose: () => void;
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
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ onClose }) => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        memory: { used: 0, total: 0, heap: 0 },
        cpu: { usage: 0, cores: 4 },
        network: { requests: 0, bytesReceived: 0, bytesSent: 0 },
        editor: { latency: 0, renderTime: 0, updateTime: 0 }
    });

    const [isMonitoring, setIsMonitoring] = useState(true);
    const [alerts, setAlerts] = useState<string[]>([]);

    useEffect(() => {
        if (!isMonitoring) return;

        const interval = setInterval(() => {
            // Simular métricas em tempo real
            const newMetrics: PerformanceMetrics = {
                memory: {
                    used: Math.random() * 100,
                    total: 100,
                    heap: Math.random() * 50
                },
                cpu: {
                    usage: Math.random() * 100,
                    cores: 4
                },
                network: {
                    requests: Math.floor(Math.random() * 100),
                    bytesReceived: Math.floor(Math.random() * 1000000),
                    bytesSent: Math.floor(Math.random() * 100000)
                },
                editor: {
                    latency: Math.random() * 10,
                    renderTime: Math.random() * 5,
                    updateTime: Math.random() * 3
                }
            };

            setMetrics(newMetrics);

            // Verificar alertas
            const newAlerts: string[] = [];
            if (newMetrics.memory.used > 80) {
                newAlerts.push('Uso de memória alto');
            }
            if (newMetrics.cpu.usage > 90) {
                newAlerts.push('Uso de CPU alto');
            }
            if (newMetrics.editor.latency > 5) {
                newAlerts.push('Latência do editor alta');
            }
            setAlerts(newAlerts);
        }, 1000);

        return () => clearInterval(interval);
    }, [isMonitoring]);

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getPerformanceColor = (value: number, max: number = 100) => {
        const percentage = (value / max) * 100;
        if (percentage < 50) return '#4ade80';
        if (percentage < 80) return '#fbbf24';
        return '#ef4444';
    };

    const getPerformanceIcon = (value: number, max: number = 100) => {
        const percentage = (value / max) * 100;
        if (percentage < 50) return <TrendingDown className="w-4 h-4" />;
        if (percentage < 80) return <Activity className="w-4 h-4" />;
        return <TrendingUp className="w-4 h-4" />;
    };

    return (
        <div className="performance-monitor">
            <div className="performance-header">
                <div className="performance-title">
                    <Activity className="w-5 h-5" />
                    <span>Monitor de Performance</span>
                </div>
                <div className="performance-actions">
                    <button
                        className={`monitor-toggle ${isMonitoring ? 'active' : ''}`}
                        onClick={() => setIsMonitoring(!isMonitoring)}
                    >
                        {isMonitoring ? 'Pausar' : 'Iniciar'}
                    </button>
                    <button
                        className="performance-close"
                        onClick={onClose}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="performance-content">
                {/* Alerts */}
                {alerts.length > 0 && (
                    <div className="performance-alerts">
                        <h3>Alertas</h3>
                        {alerts.map((alert, index) => (
                            <div key={index} className="alert-item">
                                <Zap className="w-4 h-4" />
                                <span>{alert}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Memory Metrics */}
                <div className="performance-section">
                    <h3>
                        <HardDrive className="w-4 h-4" />
                        Memória
                    </h3>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-header">
                                <span className="metric-label">Uso Total</span>
                                {getPerformanceIcon(metrics.memory.used)}
                            </div>
                            <div className="metric-value">
                                {metrics.memory.used.toFixed(1)}MB
                            </div>
                            <div className="metric-bar">
                                <div
                                    className="metric-fill"
                                    style={{
                                        width: `${metrics.memory.used}%`,
                                        backgroundColor: getPerformanceColor(metrics.memory.used)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-header">
                                <span className="metric-label">Heap</span>
                                {getPerformanceIcon(metrics.memory.heap, 50)}
                            </div>
                            <div className="metric-value">
                                {metrics.memory.heap.toFixed(1)}MB
                            </div>
                            <div className="metric-bar">
                                <div
                                    className="metric-fill"
                                    style={{
                                        width: `${(metrics.memory.heap / 50) * 100}%`,
                                        backgroundColor: getPerformanceColor(metrics.memory.heap, 50)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CPU Metrics */}
                <div className="performance-section">
                    <h3>
                        <Cpu className="w-4 h-4" />
                        CPU
                    </h3>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-header">
                                <span className="metric-label">Uso</span>
                                {getPerformanceIcon(metrics.cpu.usage)}
                            </div>
                            <div className="metric-value">
                                {metrics.cpu.usage.toFixed(1)}%
                            </div>
                            <div className="metric-bar">
                                <div
                                    className="metric-fill"
                                    style={{
                                        width: `${metrics.cpu.usage}%`,
                                        backgroundColor: getPerformanceColor(metrics.cpu.usage)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-header">
                                <span className="metric-label">Núcleos</span>
                                <Cpu className="w-4 h-4" />
                            </div>
                            <div className="metric-value">
                                {metrics.cpu.cores}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Network Metrics */}
                <div className="performance-section">
                    <h3>
                        <Wifi className="w-4 h-4" />
                        Rede
                    </h3>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-header">
                                <span className="metric-label">Requisições</span>
                                <Activity className="w-4 h-4" />
                            </div>
                            <div className="metric-value">
                                {metrics.network.requests}
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-header">
                                <span className="metric-label">Recebido</span>
                                <TrendingDown className="w-4 h-4" />
                            </div>
                            <div className="metric-value">
                                {formatBytes(metrics.network.bytesReceived)}
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-header">
                                <span className="metric-label">Enviado</span>
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <div className="metric-value">
                                {formatBytes(metrics.network.bytesSent)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor Metrics */}
                <div className="performance-section">
                    <h3>
                        <Activity className="w-4 h-4" />
                        Editor
                    </h3>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-header">
                                <span className="metric-label">Latência</span>
                                {getPerformanceIcon(metrics.editor.latency, 10)}
                            </div>
                            <div className="metric-value">
                                {metrics.editor.latency.toFixed(2)}ms
                            </div>
                            <div className="metric-bar">
                                <div
                                    className="metric-fill"
                                    style={{
                                        width: `${(metrics.editor.latency / 10) * 100}%`,
                                        backgroundColor: getPerformanceColor(metrics.editor.latency, 10)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-header">
                                <span className="metric-label">Render</span>
                                {getPerformanceIcon(metrics.editor.renderTime, 5)}
                            </div>
                            <div className="metric-value">
                                {metrics.editor.renderTime.toFixed(2)}ms
                            </div>
                            <div className="metric-bar">
                                <div
                                    className="metric-fill"
                                    style={{
                                        width: `${(metrics.editor.renderTime / 5) * 100}%`,
                                        backgroundColor: getPerformanceColor(metrics.editor.renderTime, 5)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-header">
                                <span className="metric-label">Atualização</span>
                                {getPerformanceIcon(metrics.editor.updateTime, 3)}
                            </div>
                            <div className="metric-value">
                                {metrics.editor.updateTime.toFixed(2)}ms
                            </div>
                            <div className="metric-bar">
                                <div
                                    className="metric-fill"
                                    style={{
                                        width: `${(metrics.editor.updateTime / 3) * 100}%`,
                                        backgroundColor: getPerformanceColor(metrics.editor.updateTime, 3)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="performance-section">
                    <h3>Recomendações</h3>
                    <div className="recommendations">
                        {metrics.memory.used > 80 && (
                            <div className="recommendation">
                                <Zap className="w-4 h-4" />
                                <span>Considere fechar abas não utilizadas para liberar memória</span>
                            </div>
                        )}
                        {metrics.cpu.usage > 90 && (
                            <div className="recommendation">
                                <Zap className="w-4 h-4" />
                                <span>Uso de CPU alto - verifique extensões ativas</span>
                            </div>
                        )}
                        {metrics.editor.latency > 5 && (
                            <div className="recommendation">
                                <Zap className="w-4 h-4" />
                                <span>Latência alta - considere reduzir o tamanho do arquivo</span>
                            </div>
                        )}
                        {alerts.length === 0 && (
                            <div className="recommendation success">
                                <Zap className="w-4 h-4" />
                                <span>Performance estável - tudo funcionando bem!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceMonitor;

