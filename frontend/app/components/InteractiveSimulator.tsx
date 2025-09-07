'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Play,
    Pause,
    RotateCcw,
    Settings,
    BarChart3,
    Download,
    Share2,
    Eye,
    EyeOff,
    Zap,
    Cpu,
    Network,
    Database,
    Gamepad2
} from 'lucide-react';
import { Simulator, SimulatorConfig, SimulatorScenario } from '../data/interactiveElements';

interface InteractiveSimulatorProps {
    simulator: Simulator;
    onParameterChange?: (parameter: string, value: any) => void;
    onScenarioLoad?: (scenario: SimulatorScenario) => void;
    onExport?: (format: 'json' | 'csv' | 'png') => void;
    onShare?: () => void;
    showControls?: boolean;
    autoRun?: boolean;
}

export default function InteractiveSimulator({
    simulator,
    onParameterChange,
    onScenarioLoad,
    onExport,
    onShare,
    showControls = true,
    autoRun = false
}: InteractiveSimulatorProps) {
    const [isRunning, setIsRunning] = useState(autoRun);
    const [currentParameters, setCurrentParameters] = useState<Record<string, any>>({});
    const [simulationData, setSimulationData] = useState<any[]>([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [selectedScenario, setSelectedScenario] = useState<SimulatorScenario | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [showMetrics, setShowMetrics] = useState(true);

    const simulationRef = useRef<NodeJS.Timeout>();
    const startTimeRef = useRef<number>(Date.now());

    // Initialize parameters
    useEffect(() => {
        const initialParams: Record<string, any> = {};
        simulator.config.parameters.forEach(param => {
            initialParams[param.name] = param.value;
        });
        setCurrentParameters(initialParams);
    }, [simulator.config.parameters]);

    // Simulation loop
    useEffect(() => {
        if (isRunning) {
            simulationRef.current = setInterval(() => {
                const elapsed = (Date.now() - startTimeRef.current) / 1000;
                setCurrentTime(elapsed);

                // Generate simulation data based on parameters
                const newData = generateSimulationData(elapsed, currentParameters);
                setSimulationData(prev => [...prev.slice(-100), newData]); // Keep last 100 data points
            }, 100); // 10 FPS
        }

        return () => {
            if (simulationRef.current) {
                clearInterval(simulationRef.current);
            }
        };
    }, [isRunning, currentParameters]);

    const generateSimulationData = (time: number, params: Record<string, any>) => {
        // This is a mock data generation - in real implementation, this would use actual simulation logic
        const baseValue = params.bandwidth || 100;
        const noise = Math.random() * 0.2 - 0.1; // ±10% noise

        return {
            time,
            value: baseValue * (1 + Math.sin(time * 0.1) * 0.3 + noise),
            parameters: { ...params }
        };
    };

    const handleParameterChange = (paramName: string, value: any) => {
        setCurrentParameters(prev => ({
            ...prev,
            [paramName]: value
        }));
        onParameterChange?.(paramName, value);
    };

    const handleScenarioLoad = (scenario: SimulatorScenario) => {
        setSelectedScenario(scenario);
        setCurrentParameters(scenario.presetValues);
        setSimulationData([]);
        setCurrentTime(0);
        startTimeRef.current = Date.now();
        onScenarioLoad?.(scenario);
    };

    const toggleSimulation = () => {
        setIsRunning(!isRunning);
        if (!isRunning) {
            startTimeRef.current = Date.now() - (currentTime * 1000);
        }
    };

    const resetSimulation = () => {
        setIsRunning(false);
        setCurrentTime(0);
        setSimulationData([]);
        startTimeRef.current = Date.now();

        // Reset to initial parameters
        const initialParams: Record<string, any> = {};
        simulator.config.parameters.forEach(param => {
            initialParams[param.name] = param.value;
        });
        setCurrentParameters(initialParams);
    };

    const getSimulatorIcon = () => {
        switch (simulator.type) {
            case 'network': return <Network className="w-6 h-6" />;
            case 'database': return <Database className="w-6 h-6" />;
            case 'algorithm': return <Cpu className="w-6 h-6" />;
            case 'system': return <Zap className="w-6 h-6" />;
            case 'game': return <Gamepad2 className="w-6 h-6" />;
            default: return <Cpu className="w-6 h-6" />;
        }
    };

    const renderParameterControl = (param: any) => {
        switch (param.type) {
            case 'number':
                return (
                    <div key={param.name} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            {param.name}
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="range"
                                min={param.min || 0}
                                max={param.max || 1000}
                                step={param.step || 1}
                                value={currentParameters[param.name] || param.value}
                                onChange={(e) => handleParameterChange(param.name, parseFloat(e.target.value))}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <input
                                type="number"
                                min={param.min || 0}
                                max={param.max || 1000}
                                step={param.step || 1}
                                value={currentParameters[param.name] || param.value}
                                onChange={(e) => handleParameterChange(param.name, parseFloat(e.target.value))}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        <p className="text-xs text-gray-500">{param.description}</p>
                    </div>
                );

            case 'select':
                return (
                    <div key={param.name} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            {param.name}
                        </label>
                        <select
                            value={currentParameters[param.name] || param.value}
                            onChange={(e) => handleParameterChange(param.name, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                            {param.options?.map((option: string) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500">{param.description}</p>
                    </div>
                );

            case 'boolean':
                return (
                    <div key={param.name} className="flex items-center justify-between">
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                {param.name}
                            </label>
                            <p className="text-xs text-gray-500">{param.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={currentParameters[param.name] || param.value}
                                onChange={(e) => handleParameterChange(param.name, e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                );

            default:
                return (
                    <div key={param.name} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            {param.name}
                        </label>
                        <input
                            type="text"
                            value={currentParameters[param.name] || param.value}
                            onChange={(e) => handleParameterChange(param.name, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <p className="text-xs text-gray-500">{param.description}</p>
                    </div>
                );
        }
    };

    const renderVisualization = () => {
        switch (simulator.config.visualization) {
            case 'chart':
                return (
                    <div className="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                            <p>Gráfico em tempo real</p>
                            <p className="text-sm">Dados: {simulationData.length} pontos</p>
                        </div>
                    </div>
                );

            case '2d':
                return (
                    <div className="bg-gray-50 p-4 rounded-lg h-64 relative overflow-hidden">
                        <div className="text-center text-gray-500">
                            <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                            <p>Visualização 2D</p>
                            <p className="text-sm">Tempo: {currentTime.toFixed(1)}s</p>
                        </div>
                    </div>
                );

            case '3d':
                return (
                    <div className="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-2 transform rotate-45 animate-spin"></div>
                            <p>Visualização 3D</p>
                            <p className="text-sm">Renderizando...</p>
                        </div>
                    </div>
                );

            case 'table':
                return (
                    <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2">Tempo</th>
                                    <th className="text-left py-2">Valor</th>
                                    <th className="text-left py-2">Parâmetros</th>
                                </tr>
                            </thead>
                            <tbody>
                                {simulationData.slice(-10).map((data, index) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <td className="py-1">{data.time.toFixed(1)}s</td>
                                        <td className="py-1">{data.value.toFixed(2)}</td>
                                        <td className="py-1 text-xs text-gray-500">
                                            {Object.entries(data.parameters).map(([key, value]) => `${key}: ${value}`).join(', ')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {getSimulatorIcon()}
                        <div>
                            <h2 className="text-xl font-bold">{simulator.title}</h2>
                            <p className="text-blue-100 text-sm">{simulator.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${simulator.type === 'network' ? 'bg-blue-500/20' :
                                simulator.type === 'database' ? 'bg-green-500/20' :
                                    simulator.type === 'algorithm' ? 'bg-purple-500/20' :
                                        simulator.type === 'system' ? 'bg-orange-500/20' :
                                            'bg-gray-500/20'
                            }`}>
                            {simulator.type === 'network' ? 'Rede' :
                                simulator.type === 'database' ? 'Banco de Dados' :
                                    simulator.type === 'algorithm' ? 'Algoritmo' :
                                        simulator.type === 'system' ? 'Sistema' : 'Jogo'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            {showControls && (
                <div className="bg-gray-50 border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={toggleSimulation}
                                className={`px-4 py-2 rounded-lg transition-colors ${isRunning
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-green-500 text-white hover:bg-green-600'
                                    }`}
                            >
                                {isRunning ? (
                                    <>
                                        <Pause className="w-4 h-4 inline mr-2" />
                                        Pausar
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 inline mr-2" />
                                        Executar
                                    </>
                                )}
                            </button>

                            <button
                                onClick={resetSimulation}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                <RotateCcw className="w-4 h-4 inline mr-2" />
                                Reset
                            </button>

                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                <Settings className="w-4 h-4 inline mr-2" />
                                Configurações
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => onExport?.('json')}
                                className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                <Download className="w-4 h-4 inline mr-2" />
                                Exportar
                            </button>

                            <button
                                onClick={onShare}
                                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                                title="Compartilhar"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Main Visualization */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Visualização</h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setShowMetrics(!showMetrics)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title={showMetrics ? 'Ocultar métricas' : 'Mostrar métricas'}
                                >
                                    {showMetrics ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {renderVisualization()}

                        {/* Metrics */}
                        {showMetrics && (
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                {simulator.metrics.map((metric, index) => (
                                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="text-lg font-bold text-blue-600">
                                            {metric === 'latency' ? `${(Math.random() * 50).toFixed(1)}ms` :
                                                metric === 'throughput' ? `${(Math.random() * 1000).toFixed(0)}/s` :
                                                    metric === 'packet-loss' ? `${(Math.random() * 5).toFixed(2)}%` :
                                                        Math.random().toFixed(3)}
                                        </div>
                                        <div className="text-xs text-gray-600 capitalize">
                                            {metric.replace('-', ' ')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Parameters */}
                    {showSettings && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Parâmetros</h3>
                            <div className="space-y-4">
                                {simulator.config.parameters.map(renderParameterControl)}
                            </div>
                        </div>
                    )}

                    {/* Scenarios */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Cenários</h3>
                        <div className="space-y-3">
                            {simulator.scenarios.map((scenario) => (
                                <button
                                    key={scenario.id}
                                    onClick={() => handleScenarioLoad(scenario)}
                                    className={`w-full p-3 text-left rounded-lg border transition-colors ${selectedScenario?.id === scenario.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="font-medium text-gray-800">{scenario.name}</div>
                                    <div className="text-sm text-gray-600">{scenario.description}</div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${scenario.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                                scenario.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {scenario.difficulty === 'easy' ? 'Fácil' :
                                                scenario.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {scenario.expectedOutcome}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Current Status */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Status</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className={`font-medium ${isRunning ? 'text-green-600' : 'text-gray-600'
                                    }`}>
                                    {isRunning ? 'Executando' : 'Pausado'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tempo:</span>
                                <span className="font-medium">{currentTime.toFixed(1)}s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Dados:</span>
                                <span className="font-medium">{simulationData.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tempo Real:</span>
                                <span className="font-medium">
                                    {simulator.config.realTime ? 'Sim' : 'Não'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
