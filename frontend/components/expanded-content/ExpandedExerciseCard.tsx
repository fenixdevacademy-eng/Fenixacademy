'use client';

import React, { useState } from 'react';
import {
    Brain,
    Code,
    CheckCircle,
    XCircle,
    Clock,
    Target,
    Play,
    RotateCcw,
    Send
} from 'lucide-react';
import { ExpandedExercise } from '@/lib/expanded-content-api';

interface ExpandedExerciseCardProps {
    exercise: ExpandedExercise;
    onSubmit?: (answer: string) => Promise<{ correct: boolean; feedback: string }>;
    onComplete?: (exerciseId: string, isCorrect: boolean) => void;
    className?: string;
}

export function ExpandedExerciseCard({
    exercise,
    onSubmit,
    onComplete,
    className = ''
}: ExpandedExerciseCardProps) {
    const [answer, setAnswer] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<{ correct: boolean; feedback: string } | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = async () => {
        if (!answer.trim() || submitting) return;

        try {
            setSubmitting(true);
            setAttempts(prev => prev + 1);

            if (onSubmit) {
                const result = await onSubmit(answer);
                setResult(result);

                if (result.correct) {
                    setIsCompleted(true);
                    onComplete?.(exercise.id || '', true);
                }
            } else {
                // Mock result for demonstration
                const mockResult = {
                    correct: answer.length > 10,
                    feedback: answer.length > 10 ? 'Excelente! Resposta correta!' : 'Tente novamente. Dê mais detalhes na sua resposta.'
                }
                setResult(mockResult);

                if (mockResult.correct) {
                    setIsCompleted(true);
                    onComplete?.(exercise.id || '', true);
                }
            }
        } catch (error) {
            setResult({
                correct: false,
                feedback: 'Erro ao enviar resposta. Tente novamente.'
            });
        } finally {
            setSubmitting(false);
        }
    }

    const handleReset = () => {
        setAnswer('');
        setResult(null);
        setAttempts(0);
        setIsCompleted(false);
    }

    const getExerciseIcon = (type: string) => {
        switch (type) {
            case 'coding':
                return <Code className="w-5 h-5" />;
            case 'practical':
                return <Brain className="w-5 h-5" />;
            default:
                return <Target className="w-5 h-5" />;
        }
    }

    const getExerciseColor = (type: string) => {
        switch (type) {
            case 'coding':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'practical':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }

    const getDifficultyColor = (difficulty?: string) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'bg-green-100 text-green-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'hard':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className={`bg-white rounded-xl shadow-lg border overflow-hidden ${className}`}>
            {/* Exercise Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {getExerciseIcon(exercise.type)}
                        <div>
                            <h3 className="font-semibold text-lg">{exercise.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExerciseColor(exercise.type)}`}>
                                    {exercise.type === 'coding' ? 'Código' : 'Prático'}
                                </span>
                                {exercise.difficulty && (
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                                        {exercise.difficulty}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 text-purple-100 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>Exercício Interativo</span>
                        </div>
                        {isCompleted && (
                            <div className="flex items-center gap-1 text-green-200 mt-1">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">Concluído</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Exercise Content */}
            <div className="p-6">
                {/* Description */}
                <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">{exercise.description}</p>
                </div>

                {/* Answer Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sua Resposta:
                    </label>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder={
                            exercise.type === 'coding'
                                ? 'Digite seu código aqui...'
                                : 'Descreva sua resposta aqui...'
                        }
                        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        disabled={isCompleted || submitting}
                    />
                </div>

                {/* Result Display */}
                {result && (
                    <div className={`mb-6 p-4 rounded-lg border ${result.correct
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}>
                        <div className="flex items-start gap-3">
                            {result.correct ? (
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            ) : (
                                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                            )}
                            <div>
                                <p className={`font-medium ${result.correct ? 'text-green-800' : 'text-red-800'
                                    }`}>
                                    {result.correct ? 'Correto!' : 'Tente novamente'}
                                </p>
                                <p className={`text-sm mt-1 ${result.correct ? 'text-green-700' : 'text-red-700'
                                    }`}>
                                    {result.feedback}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            <span>Tentativas: {attempts}</span>
                        </div>
                        {exercise.difficulty && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>Dificuldade: {exercise.difficulty}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {attempts > 0 && !isCompleted && (
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>Resetar</span>
                            </button>
                        )}

                        {!isCompleted && (
                            <button
                                onClick={handleSubmit}
                                disabled={!answer.trim() || submitting}
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Enviando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Enviar Resposta</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Exercise Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                            <Play className="w-4 h-4" />
                            <span>Exercício Interativo</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Brain className="w-4 h-4" />
                            <span>Conteúdo Expandido</span>
                        </div>
                    </div>
                    <div className="text-gray-500">
                        {isCompleted ? 'Concluído com sucesso!' : 'Aguardando resposta...'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpandedExerciseCard;