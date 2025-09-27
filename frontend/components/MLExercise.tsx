'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Brain, Play, Pause, Square, RotateCcw, Settings, Download, Upload,
    Eye, EyeOff, RefreshCw, Target, Zap, Database, Cloud, Shield,
    Lock, Unlock, Power, PowerOff, Monitor, Smartphone, Tablet, Globe, Server, Code
} from 'lucide-react';

interface MLExerciseProps {
    exerciseId: string;
    onComplete?: (result: ExerciseResult) => void;
    className?: string;
}

interface ExerciseResult {
    accuracy: number;
    loss: number;
    epochs: number;
    timeSpent: number;
    predictions: number[];
    actual: number[];
}

interface ModelConfig {
    learningRate: number;
    epochs: number;
    batchSize: number;
    hiddenLayers: number;
    neuronsPerLayer: number;
    activationFunction: string;
    optimizer: string;
}

interface Dataset {
    name: string;
    size: number;
    features: number;
    samples: Array<{
        inputs: number[];
        output: number;
    }>;
}

const MLExercise: React.FC<MLExerciseProps> = ({ exerciseId, onComplete, className = '' }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentEpoch, setCurrentEpoch] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [loss, setLoss] = useState(0);
    const [predictions, setPredictions] = useState<number[]>([]);
    const [actual, setActual] = useState<number[]>([]);
    const [showConfig, setShowConfig] = useState(false);
    const [showDataset, setShowDataset] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);

    const [modelConfig, setModelConfig] = useState<ModelConfig>({
        learningRate: 0.01,
        epochs: 100,
        batchSize: 32,
        hiddenLayers: 2,
        neuronsPerLayer: 64,
        activationFunction: 'relu',
        optimizer: 'adam'
    });

    const [dataset, setDataset] = useState<Dataset>({
        name: 'Sample Dataset',
        size: 1000,
        features: 4,
        samples: []
    });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        generateSampleDataset();
    }, []);

    useEffect(() => {
        if (isRunning && !isPaused) {
            intervalRef.current = setInterval(() => {
                setTimeSpent(Date.now() - startTimeRef.current);
            }, 100);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, isPaused]);

    const generateSampleDataset = () => {
        const samples = [];
        for (let i = 0; i < dataset.size; i++) {
            const inputs = Array.from({ length: dataset.features }, () => Math.random());
            const output = Math.random() > 0.5 ? 1 : 0;
            samples.push({ inputs, output });
        }
        setDataset(prev => ({ ...prev, samples }));
    };

    const startTraining = () => {
        setIsRunning(true);
        setIsPaused(false);
        setIsCompleted(false);
        setCurrentEpoch(0);
        setAccuracy(0);
        setLoss(1);
        setTimeSpent(0);
        startTimeRef.current = Date.now();

        // Simulate training
        simulateTraining();
    };

    const pauseTraining = () => {
        setIsPaused(!isPaused);
    };

    const stopTraining = () => {
        setIsRunning(false);
        setIsPaused(false);
        setCurrentEpoch(0);
        setAccuracy(0);
        setLoss(1);
        setTimeSpent(0);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const resetExercise = () => {
        stopTraining();
        setIsCompleted(false);
        setPredictions([]);
        setActual([]);
    };

    const simulateTraining = () => {
        let epoch = 0;
        const maxEpochs = modelConfig.epochs;

        const trainEpoch = () => {
            if (!isRunning || isPaused) return;

            epoch++;
            setCurrentEpoch(epoch);

            // Simulate improving accuracy and decreasing loss
            const progress = epoch / maxEpochs;
            const newAccuracy = Math.min(0.95, 0.1 + (progress * 0.85));
            const newLoss = Math.max(0.05, 1 - (progress * 0.95));

            setAccuracy(newAccuracy);
            setLoss(newLoss);

            if (epoch < maxEpochs) {
                setTimeout(trainEpoch, 100);
            } else {
                finishTraining();
            }
        };

        trainEpoch();
    };

    const finishTraining = () => {
        setIsRunning(false);
        setIsCompleted(true);

        // Generate sample predictions
        const samplePredictions = Array.from({ length: 10 }, () => Math.random());
        const sampleActual = Array.from({ length: 10 }, () => Math.random() > 0.5 ? 1 : 0);

        setPredictions(samplePredictions);
        setActual(sampleActual);

        if (onComplete) {
            onComplete({
                accuracy,
                loss,
                epochs: currentEpoch,
                timeSpent: Math.floor(timeSpent / 1000),
                predictions: samplePredictions,
                actual: sampleActual
            });
        }
    };

    const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`ml-exercise bg-white rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Brain className="w-6 h-6 text-purple-600" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Machine Learning Exercise</h2>
                            <p className="text-sm text-gray-600">Exercise ID: {exerciseId}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowConfig(!showConfig)}
                            className="p-2 hover:bg-gray-100 rounded"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setShowDataset(!showDataset)}
                            className="p-2 hover:bg-gray-100 rounded"
                        >
                            <Database className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Configuration Panel */}
            {showConfig && (
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Learning Rate</label>
                            <input
                                type="number"
                                step="0.001"
                                value={modelConfig.learningRate}
                                onChange={(e) => setModelConfig(prev => ({ ...prev, learningRate: parseFloat(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Epochs</label>
                            <input
                                type="number"
                                value={modelConfig.epochs}
                                onChange={(e) => setModelConfig(prev => ({ ...prev, epochs: parseInt(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Batch Size</label>
                            <input
                                type="number"
                                value={modelConfig.batchSize}
                                onChange={(e) => setModelConfig(prev => ({ ...prev, batchSize: parseInt(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hidden Layers</label>
                            <input
                                type="number"
                                value={modelConfig.hiddenLayers}
                                onChange={(e) => setModelConfig(prev => ({ ...prev, hiddenLayers: parseInt(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Neurons per Layer</label>
                            <input
                                type="number"
                                value={modelConfig.neuronsPerLayer}
                                onChange={(e) => setModelConfig(prev => ({ ...prev, neuronsPerLayer: parseInt(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Activation Function</label>
                            <select
                                value={modelConfig.activationFunction}
                                onChange={(e) => setModelConfig(prev => ({ ...prev, activationFunction: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="relu">ReLU</option>
                                <option value="sigmoid">Sigmoid</option>
                                <option value="tanh">Tanh</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Dataset Panel */}
            {showDataset && (
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dataset Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded border">
                            <h4 className="font-medium text-gray-900">Dataset Name</h4>
                            <p className="text-sm text-gray-600">{dataset.name}</p>
                        </div>
                        <div className="bg-white p-4 rounded border">
                            <h4 className="font-medium text-gray-900">Size</h4>
                            <p className="text-sm text-gray-600">{dataset.size.toLocaleString()} samples</p>
                        </div>
                        <div className="bg-white p-4 rounded border">
                            <h4 className="font-medium text-gray-900">Features</h4>
                            <p className="text-sm text-gray-600">{dataset.features} features</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="p-6">
                {/* Training Status */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Training Status</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Time: {formatTime(timeSpent)}</span>
                            <span className="text-sm text-gray-600">Epoch: {currentEpoch}/{modelConfig.epochs}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 p-4 rounded">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-900">Accuracy</span>
                                <span className="text-2xl font-bold text-blue-600">{(accuracy * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${accuracy * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-red-50 p-4 rounded">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-red-900">Loss</span>
                                <span className="text-2xl font-bold text-red-600">{loss.toFixed(4)}</span>
                            </div>
                            <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                                <div
                                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(1 - loss) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 mb-6">
                    {!isRunning ? (
                        <button
                            onClick={startTraining}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                            <Play className="w-4 h-4" />
                            Start Training
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={pauseTraining}
                                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
                            >
                                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                                {isPaused ? 'Resume' : 'Pause'}
                            </button>
                            <button
                                onClick={stopTraining}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                            >
                                <Square className="w-4 h-4" />
                                Stop
                            </button>
                        </>
                    )}

                    <button
                        onClick={resetExercise}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                </div>

                {/* Results */}
                {isCompleted && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-green-900 mb-2">Training Completed!</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <span className="text-sm text-green-700">Final Accuracy:</span>
                                <span className="ml-2 font-bold text-green-900">{(accuracy * 100).toFixed(1)}%</span>
                            </div>
                            <div>
                                <span className="text-sm text-green-700">Final Loss:</span>
                                <span className="ml-2 font-bold text-green-900">{loss.toFixed(4)}</span>
                            </div>
                            <div>
                                <span className="text-sm text-green-700">Time Spent:</span>
                                <span className="ml-2 font-bold text-green-900">{formatTime(timeSpent)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MLExercise;