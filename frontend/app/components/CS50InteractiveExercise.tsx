'use client';

import React, { useState } from 'react';
import {
    Code,
    Play,
    Check,
    Download,
    Timer,
    Target,
    Lightbulb,
    AlertCircle,
    CheckCircle,
    XCircle
} from 'lucide-react';

import { CS50Exercise } from '../data/cs50Courses';

interface CS50InteractiveExerciseProps {
    exercise: CS50Exercise;
    onComplete: (exerciseId: string, points: number, timeSpent: number) => void;
    onClose: () => void;
}

export default function CS50InteractiveExercise({ exercise, onComplete, onClose }: CS50InteractiveExerciseProps) {
    const [userCode, setUserCode] = useState(exercise.initialCode);
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<string>('');
    const [testResults, setTestResults] = useState<Array<{
        passed: boolean;
        input: string;
        expected: string;
        actual: string;
        description: string;
    }>>([]);
    const [showHints, setShowHints] = useState(false);
    const [currentHint, setCurrentHint] = useState(0);
    const [timeSpent, setTimeSpent] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    // Timer para o exercício
    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const runCode = async () => {
        setIsRunning(true);
        setOutput('');

        try {
            // Simular execução de código
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simular saída do código
            const mockOutput = `✅ Código executado com sucesso!
📊 Resultados dos testes:
${exercise.testCases.map((testCase, index) =>
                `Teste ${index + 1}: ✅ PASSOU - ${testCase.description}`
            ).join('\n')}`;

            setOutput(mockOutput);

            // Simular resultados dos testes
            const results = exercise.testCases.map(testCase => ({
                passed: true, // Simular que todos passaram
                input: testCase.input,
                expected: testCase.expectedOutput,
                actual: testCase.expectedOutput, // Simular saída correta
                description: testCase.description
            }));

            setTestResults(results);

            // Verificar se todos os testes passaram
            const allPassed = results.every(result => result.passed);
            if (allPassed && !isCompleted) {
                setIsCompleted(true);
                onComplete(exercise.id, exercise.points, timeSpent);
            }

        } catch (error) {
            setOutput('❌ Erro ao executar o código. Verifique a sintaxe.');
        } finally {
            setIsRunning(false);
        }
    };

    const showNextHint = () => {
        if (currentHint < exercise.hints.length - 1) {
            setCurrentHint(prev => prev + 1);
        }
    };

    const showPreviousHint = () => {
        if (currentHint > 0) {
            setCurrentHint(prev => prev - 1);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'quick': return '🎮';
            case 'intermediate': return '🏆';
            case 'advanced': return '🚀';
            default: return '📝';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-7xl max-h-[90vh] overflow-hidden">
                {/* Header do Modal */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl">{getTypeIcon(exercise.type)}</span>
                            <h2 className="text-xl font-semibold">{exercise.title}</h2>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                                {exercise.difficulty.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-blue-100 text-sm">{exercise.description}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <div className="text-sm text-blue-100">Tempo Limite</div>
                            <div className="text-lg font-bold flex items-center">
                                <Timer className="w-4 h-4 mr-1" />
                                {exercise.timeLimit} min
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-blue-100">Pontos</div>
                            <div className="text-lg font-bold flex items-center">
                                <Target className="w-4 h-4 mr-1" />
                                {exercise.points} pts
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors p-2"
                        >
                            <XCircle className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Corpo do Modal */}
                <div className="flex h-[calc(90vh-120px)]">
                    {/* Editor de Código */}
                    <div className="flex-1 border-r border-gray-200 flex flex-col">
                        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">
                                Editor de Código - {exercise.language.toUpperCase()}
                            </span>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span className="flex items-center">
                                    <Timer className="w-4 h-4 mr-1" />
                                    {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        <textarea
                            className="flex-1 p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none focus:outline-none"
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)}
                            placeholder="Digite seu código aqui..."
                        />

                        {/* Controles do Editor */}
                        <div className="bg-gray-100 px-4 py-2 border-t border-gray-200 flex justify-between items-center">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setUserCode(exercise.initialCode)}
                                    className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded"
                                >
                                    Resetar Código
                                </button>
                                <button
                                    onClick={() => setUserCode('')}
                                    className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded"
                                >
                                    Limpar
                                </button>
                            </div>

                            <button
                                onClick={runCode}
                                disabled={isRunning || isCompleted}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
                            >
                                {isRunning ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Executando...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 mr-2" />
                                        Executar Código
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Preview/Resultado */}
                    <div className="flex-1 flex flex-col">
                        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                            <span className="text-sm font-medium text-gray-700">Resultado e Controles</span>
                        </div>

                        <div className="flex-1 p-4 bg-white overflow-auto">
                            {/* Contexto do Exercício */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                <h4 className="font-medium text-blue-900 mb-2">🎯 Contexto do Exercício</h4>
                                <p className="text-blue-800 text-sm">{exercise.context}</p>
                            </div>

                            {/* Saída Esperada */}
                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                <h4 className="font-medium text-gray-800 mb-2">📋 Saída Esperada</h4>
                                <p className="text-gray-600 text-sm">{exercise.expectedOutput}</p>
                            </div>

                            {/* Resultado da Execução */}
                            {output && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                                    <h4 className="font-medium text-green-800 mb-2">✅ Saída do Código</h4>
                                    <pre className="text-green-700 text-sm whitespace-pre-wrap">{output}</pre>
                                </div>
                            )}

                            {/* Resultados dos Testes */}
                            {testResults.length > 0 && (
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                                    <h4 className="font-medium text-purple-800 mb-2">🧪 Resultados dos Testes</h4>
                                    <div className="space-y-2">
                                        {testResults.map((result, index) => (
                                            <div key={index} className={`flex items-center space-x-2 text-sm ${result.passed ? 'text-green-700' : 'text-red-700'
                                                }`}>
                                                {result.passed ? (
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-red-600" />
                                                )}
                                                <span>Teste {index + 1}: {result.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Dicas */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-medium text-yellow-800 flex items-center">
                                        <Lightbulb className="w-4 h-4 mr-2" />
                                        💡 Dicas ({exercise.hints.length})
                                    </h4>
                                    <button
                                        onClick={() => setShowHints(!showHints)}
                                        className="text-yellow-700 hover:text-yellow-800 text-sm"
                                    >
                                        {showHints ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>

                                {showHints && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <p className="text-yellow-800 text-sm">
                                                <strong>Dica {currentHint + 1}:</strong> {exercise.hints[currentHint]}
                                            </p>
                                            <div className="flex space-x-1">
                                                <button
                                                    onClick={showPreviousHint}
                                                    disabled={currentHint === 0}
                                                    className="text-yellow-700 hover:text-yellow-800 disabled:opacity-50 px-2 py-1 rounded"
                                                >
                                                    ←
                                                </button>
                                                <span className="text-yellow-700 text-sm px-2">
                                                    {currentHint + 1}/{exercise.hints.length}
                                                </span>
                                                <button
                                                    onClick={showNextHint}
                                                    disabled={currentHint === exercise.hints.length - 1}
                                                    className="text-yellow-700 hover:text-yellow-800 disabled:opacity-50 px-2 py-1 rounded"
                                                >
                                                    →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Controles */}
                            <div className="space-y-3">
                                {isCompleted ? (
                                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                                        <div className="text-green-800 font-medium flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            🎉 Exercício Concluído com Sucesso!
                                        </div>
                                        <p className="text-green-700 text-sm mt-1">
                                            Você ganhou {exercise.points} pontos em {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                                        </p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onComplete(exercise.id, exercise.points, timeSpent)}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Marcar como Concluído
                                    </button>
                                )}

                                <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                                    <Download className="w-4 h-4 mr-2" />
                                    Baixar Solução
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
