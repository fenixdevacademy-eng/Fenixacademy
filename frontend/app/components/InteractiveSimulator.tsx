'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Square, RotateCcw, Settings, Terminal, Code, Clock, MemoryStick, Cpu, Target } from 'lucide-react';

interface InteractiveSimulatorProps {
    className?: string;
    onSimulationStart?: (config: any) => void;
    onSimulationStop?: () => void;
    onSimulationComplete?: (results: any) => void;
    onCodeChange?: (code: string) => void;
}

interface SimulationConfig {
    id: string;
    name: string;
    type: 'algorithm' | 'physics' | 'network' | 'ai';
    description: string;
    code: string;
    language: 'javascript' | 'python' | 'typescript';
    maxExecutionTime: number;
}

const mockSimulations: SimulationConfig[] = [
    {
        id: '1',
        name: 'Bubble Sort',
        type: 'algorithm',
        description: 'Simulação do algoritmo de ordenação Bubble Sort',
        code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Array original:", numbers);
const sorted = bubbleSort([...numbers]);
console.log("Array ordenado:", sorted);`,
        language: 'javascript',
        maxExecutionTime: 30
    }
];

export function InteractiveSimulator({
    className = '',
    onSimulationStart,
    onSimulationStop,
    onSimulationComplete,
    onCodeChange
}: InteractiveSimulatorProps) {
    const [simulations] = useState<SimulationConfig[]>(mockSimulations);
    const [selectedSimulation, setSelectedSimulation] = useState<SimulationConfig>(simulations[0]);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [code, setCode] = useState(selectedSimulation.code);
    const [output, setOutput] = useState<string>('');
    const [executionTime, setExecutionTime] = useState<number>(0);
    const [memoryUsed, setMemoryUsed] = useState<number>(0);
    const [currentStep, setCurrentStep] = useState<number>(0);

    const outputRef = useRef<HTMLDivElement>(null);

    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
        onCodeChange?.(newCode);
    };

    const handleSimulationSelect = (simulation: SimulationConfig) => {
        setSelectedSimulation(simulation);
        setIsRunning(false);
        setIsPaused(false);
    };

    const startSimulation = async () => {
        if (isRunning) return;

        setIsRunning(true);
        setIsPaused(false);
        setOutput('');
        setExecutionTime(0);
        setMemoryUsed(0);
        setCurrentStep(0);

        onSimulationStart?.(selectedSimulation);

        // Simulate execution
        const startTime = Date.now();
        let stepCount = 0;

        const runSimulation = () => {
            if (!isRunning || isPaused) return;

            stepCount++;
            const elapsed = Date.now() - startTime;
            setExecutionTime(elapsed);
            setCurrentStep(stepCount);

            // Simulate output
            if (stepCount % 3 === 0) {
                setOutput(prev => prev + `Passo ${stepCount}: Processando dados...\n`);
            }

            // Simulate memory usage
            setMemoryUsed(prev => Math.min(prev + Math.random() * 5, 100));

            // Check if simulation should complete
            if (stepCount >= 20 || elapsed >= selectedSimulation.maxExecutionTime * 1000) {
                completeSimulation();
                return;
            }

            // Continue simulation
            setTimeout(runSimulation, 500);
        };

        runSimulation();
    };

    const pauseSimulation = () => {
        setIsPaused(!isPaused);
    };

    const stopSimulation = () => {
        setIsRunning(false);
        setIsPaused(false);
        onSimulationStop?.();
    };

    const resetSimulation = () => {
        stopSimulation();
        setCode(selectedSimulation.code);
        setOutput('');
        setExecutionTime(0);
        setMemoryUsed(0);
        setCurrentStep(0);
    };

    const completeSimulation = () => {
        setIsRunning(false);
        setIsPaused(false);

        const results = {
            success: true,
            output: output + '\nSimulação concluída com sucesso!',
            executionTime,
            memoryUsed,
            steps: currentStep
        };

        setOutput(prev => prev + '\nSimulação concluída com sucesso!');
        onSimulationComplete?.(results);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'algorithm':
                return <Code className="w-4 h-4" />;
            case 'physics':
                return <Target className="w-4 h-4" />;
            case 'network':
                return <Cpu className="w-4 h-4" />;
            case 'ai':
                return <Terminal className="w-4 h-4" />;
            default:
                return <Code className="w-4 h-4" />;
        }
    };

    const getLanguageColor = (language: string) => {
        switch (language) {
            case 'javascript':
                return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
            case 'python':
                return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
            case 'typescript':
                return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-6 h-6 text-blue-500" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Simulador Interativo
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            {getTypeIcon(selectedSimulation.type)}
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {selectedSimulation.name}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getLanguageColor(selectedSimulation.language)}`}>
                                {selectedSimulation.language}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Simulation Selection */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Simulação:
                        </label>
                        <select
                            value={selectedSimulation.id}
                            onChange={(e) => {
                                const simulation = simulations.find(s => s.id === e.target.value);
                                if (simulation) handleSimulationSelect(simulation);
                            }}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {simulations.map((simulation) => (
                                <option key={simulation.id} value={simulation.id}>
                                    {simulation.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            onClick={startSimulation}
                            disabled={isRunning}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            {isRunning ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Executando...
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" />
                                    Executar
                                </>
                            )}
                        </button>

                        {isRunning && (
                            <button
                                onClick={pauseSimulation}
                                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                                {isPaused ? 'Continuar' : 'Pausar'}
                            </button>
                        )}

                        <button
                            onClick={stopSimulation}
                            disabled={!isRunning}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Square className="w-4 h-4" />
                            Parar
                        </button>

                        <button
                            onClick={resetSimulation}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Resetar
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex h-96">
                {/* Code Editor */}
                <div className="flex-1 flex flex-col">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Código
                        </h4>
                    </div>
                    <div className="flex-1 p-4">
                        <textarea
                            value={code}
                            onChange={(e) => handleCodeChange(e.target.value)}
                            className="w-full h-full resize-none border-none outline-none bg-gray-900 text-green-400 font-mono text-sm leading-relaxed"
                            placeholder="Digite seu código aqui..."
                        />
                    </div>
                </div>

                {/* Output Panel */}
                <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Output
                        </h4>
                    </div>

                    <div
                        ref={outputRef}
                        className="flex-1 p-4 overflow-y-auto bg-gray-900 text-green-400 font-mono text-sm"
                    >
                        {output || (
                            <div className="text-gray-500 text-center py-8">
                                <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>Execute a simulação para ver o output aqui</p>
                            </div>
                        )}
                    </div>

                    {/* Performance Metrics */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    Tempo: {(executionTime / 1000).toFixed(2)}s
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MemoryStick className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    Memória: {memoryUsed.toFixed(1)}MB
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    Passos: {currentStep}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





