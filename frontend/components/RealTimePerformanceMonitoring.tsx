'use client';

import React, { useState, useEffect } from 'react';

interface PerformanceMetrics {
    timestamp: number;
    cpu: number;
    memory: number;
    fps: number;
}

const RealTimePerformanceMonitoring: React.FC = () => {
    const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
    const [isMonitoring, setIsMonitoring] = useState(false);

    useEffect(() => {
        if (!isMonitoring) return;

        const interval = setInterval(() => {
            // Simular métricas de performance
            const newMetric: PerformanceMetrics = {
                timestamp: Date.now(),
                cpu: Math.random() * 100,
                memory: Math.random() * 100,
                fps: 60 - Math.random() * 20
            };

            setMetrics(prev => [...prev.slice(-50), newMetric]);
        }, 1000);

        return () => clearInterval(interval);
    }, [isMonitoring]);

    const startMonitoring = () => {
        setIsMonitoring(true);
        setMetrics([]);
    };

    const stopMonitoring = () => {
        setIsMonitoring(false);
    };

    const avgCPU = metrics.length > 0 ? metrics.reduce((sum, m) => sum + m.cpu, 0) / metrics.length : 0;
    const avgMemory = metrics.length > 0 ? metrics.reduce((sum, m) => sum + m.memory, 0) / metrics.length : 0;
    const avgFPS = metrics.length > 0 ? metrics.reduce((sum, m) => sum + m.fps, 0) / metrics.length : 0;

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Performance Monitor</h3>

            <div className="flex gap-4 mb-4">
                <button
                    onClick={startMonitoring}
                    disabled={isMonitoring}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded"
                >
                    Start
                </button>
                <button
                    onClick={stopMonitoring}
                    disabled={!isMonitoring}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded"
                >
                    Stop
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-700 p-3 rounded">
                    <h4 className="text-sm font-medium">CPU</h4>
                    <p className="text-2xl font-bold">{avgCPU.toFixed(1)}%</p>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                    <h4 className="text-sm font-medium">Memory</h4>
                    <p className="text-2xl font-bold">{avgMemory.toFixed(1)}%</p>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                    <h4 className="text-sm font-medium">FPS</h4>
                    <p className="text-2xl font-bold">{avgFPS.toFixed(1)}</p>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-400">
                    Samples: {metrics.length} | Status: {isMonitoring ? 'Monitoring' : 'Stopped'}
                </p>
            </div>
        </div>
    );
};

export default RealTimePerformanceMonitoring;



