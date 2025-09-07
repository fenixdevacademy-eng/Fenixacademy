'use client';

import React, { useState } from 'react';
import { Brain, Target, CheckCircle, XCircle, Play, RotateCcw, Download, Upload } from 'lucide-react';
import PythonIDE from './PythonIDE';

interface MLExerciseProps {
    exercise: {
        id: string;
        title: string;
        description: string;
        difficulty: 'easy' | 'medium' | 'hard' | 'expert';
        category: 'classification' | 'regression' | 'clustering' | 'nlp' | 'deep_learning';
        starterCode: string;
        testCases: Array<{
            input: string;
            expected: string;
            description: string;
        }>;
        hints: string[];
        solution?: string;
        expectedOutput: string;
    };
    onComplete?: (exerciseId: string, score: number) => void;
}

export default function MLExercise({ exercise, onComplete }: MLExerciseProps) {
    const [showSolution, setShowSolution] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const [currentHint, setCurrentHint] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);

    const difficultyColors = {
        easy: 'bg-green-500',
        medium: 'bg-yellow-500',
        hard: 'bg-orange-500',
        expert: 'bg-red-500'
    };

    const categoryIcons = {
        classification: '🎯',
        regression: '📈',
        clustering: '🔍',
        nlp: '📝',
        deep_learning: '🧠'
    };

    const handleExerciseComplete = (output: string, success: boolean) => {
        if (success) {
            setIsCompleted(true);
            const newScore = Math.min(100, score + 25);
            setScore(newScore);

            if (onComplete) {
                onComplete(exercise.id, newScore);
            }
        }
    };

    const resetExercise = () => {
        setIsCompleted(false);
        setScore(0);
        setShowSolution(false);
        setShowHints(false);
        setCurrentHint(0);
    };

    const nextHint = () => {
        if (currentHint < exercise.hints.length - 1) {
            setCurrentHint(currentHint + 1);
        }
    };

    const previousHint = () => {
        if (currentHint > 0) {
            setCurrentHint(currentHint - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Brain className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {exercise.title}
                                </h1>
                                <div className="flex items-center space-x-3 mt-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${difficultyColors[exercise.difficulty]}`}>
                                        {exercise.difficulty.toUpperCase()}
                                    </span>
                                    <span className="text-2xl">{categoryIcons[exercise.category]}</span>
                                    <span className="text-gray-500 capitalize">{exercise.category.replace('_', ' ')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            {isCompleted && (
                                <div className="flex items-center space-x-2 text-green-600">
                                    <CheckCircle className="h-6 w-6" />
                                    <span className="font-medium">Completado!</span>
                                </div>
                            )}
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">{score}</div>
                                <div className="text-sm text-gray-500">pontos</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="prose max-w-none">
                        <h2 className="text-xl font-semibold mb-4">📋 Descrição do Exercício</h2>
                        <p className="text-gray-700 leading-relaxed">{exercise.description}</p>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">🎯 Objetivos</h3>
                                <ul className="text-blue-800 space-y-1">
                                    <li>• Implementar algoritmo de ML</li>
                                    <li>• Pré-processar dados corretamente</li>
                                    <li>• Avaliar performance do modelo</li>
                                    <li>• Interpretar resultados</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-900 mb-2">✅ Critérios de Sucesso</h3>
                                <ul className="text-green-800 space-y-1">
                                    <li>• Código executa sem erros</li>
                                    <li>• Modelo treina corretamente</li>
                                    <li>• Métricas de avaliação calculadas</li>
                                    <li>• Resultados interpretados adequadamente</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Test Cases */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h2 className="text-xl font-semibold mb-4">🧪 Casos de Teste</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {exercise.testCases.map((testCase, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">Teste {index + 1}</span>
                                    <span className="text-sm text-gray-500">#{index + 1}</span>
                                </div>
                                <p className="text-gray-700 text-sm mb-3">{testCase.description}</p>
                                <div className="space-y-2 text-xs">
                                    <div>
                                        <span className="font-medium text-gray-600">Input:</span>
                                        <code className="ml-2 bg-gray-200 px-2 py-1 rounded">{testCase.input}</code>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Expected:</span>
                                        <code className="ml-2 bg-gray-200 px-2 py-1 rounded">{testCase.expected}</code>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hints and Solution */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Hints */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">💡 Dicas</h2>
                                <button
                                    onClick={() => setShowHints(!showHints)}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    {showHints ? 'Ocultar' : 'Mostrar'} Dicas
                                </button>
                            </div>

                            {showHints && (
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm text-yellow-800 font-medium">
                                            Dica {currentHint + 1} de {exercise.hints.length}
                                        </span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={previousHint}
                                                disabled={currentHint === 0}
                                                className="p-1 text-yellow-600 hover:text-yellow-700 disabled:opacity-50"
                                            >
                                                ←
                                            </button>
                                            <button
                                                onClick={nextHint}
                                                disabled={currentHint === exercise.hints.length - 1}
                                                className="p-1 text-yellow-600 hover:text-yellow-700 disabled:opacity-50"
                                            >
                                                →
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-yellow-800">{exercise.hints[currentHint]}</p>
                                </div>
                            )}
                        </div>

                        {/* Solution */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">🔐 Solução</h2>
                                <button
                                    onClick={() => setShowSolution(!showSolution)}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    {showSolution ? 'Ocultar' : 'Ver'} Solução
                                </button>
                            </div>

                            {showSolution && exercise.solution && (
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-green-900 mb-2">Código da Solução:</h3>
                                    <pre className="text-sm text-green-800 bg-green-100 p-3 rounded overflow-x-auto">
                                        <code>{exercise.solution}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Python IDE */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-xl font-semibold">💻 Editor Python</h2>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={resetExercise}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Reiniciar
                            </button>
                            <button
                                onClick={() => setShowSolution(!showSolution)}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Target className="h-4 w-4" />
                                {showSolution ? 'Ocultar' : 'Ver'} Solução
                            </button>
                        </div>
                    </div>

                    <PythonIDE
                        initialCode={exercise.starterCode}
                        exercise={{
                            title: exercise.title,
                            description: exercise.description,
                            starterCode: exercise.starterCode,
                            testCases: exercise.testCases
                        }}
                        onCodeChange={(code) => console.log('Código alterado:', code)}
                        onRun={handleExerciseComplete}
                    />
                </div>
            </div>

            {/* Expected Output */}
            <div className="bg-gray-50 border-t">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h2 className="text-xl font-semibold mb-4">📊 Saída Esperada</h2>
                    <div className="bg-white p-4 rounded-lg border">
                        <pre className="text-sm text-gray-800 bg-gray-100 p-3 rounded overflow-x-auto">
                            <code>{exercise.expectedOutput}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

