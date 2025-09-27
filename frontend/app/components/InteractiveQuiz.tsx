'use client';

import React, { useState, useEffect } from 'react';
import {
    CheckCircle,
    XCircle,
    Clock,
    Star,
    RotateCcw,
    Play,
    Pause,
    SkipForward,
    Award,
    Target,
    Brain,
    Zap,
    Trophy,
    BarChart3
} from 'lucide-react';

interface QuizProps {
    className?: string;
    onQuizComplete?: (score: number, totalQuestions: number) => void;
    onQuestionAnswer?: (questionId: string, answer: string, isCorrect: boolean) => void;
}

interface Question {
    id: string;
    question: string;
    type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'code';
    options?: string[];
    correctAnswer: string | string[];
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    timeLimit?: number; // in seconds
    codeLanguage?: string;
}

interface QuizResult {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    timeSpent: number;
    accuracy: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

const mockQuestions: Question[] = [
    {
        id: '1',
        question: 'Qual é a sintaxe correta para declarar uma variável em JavaScript?',
        type: 'multiple_choice',
        options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'],
        correctAnswer: 'var x = 5;',
        explanation: 'Em JavaScript, usamos "var", "let" ou "const" para declarar variáveis.',
        difficulty: 'easy',
        points: 10,
        timeLimit: 30
    },
    {
        id: '2',
        question: 'JavaScript é uma linguagem de programação orientada a objetos.',
        type: 'true_false',
        correctAnswer: 'true',
        explanation: 'JavaScript é uma linguagem multi-paradigma que suporta programação orientada a objetos.',
        difficulty: 'medium',
        points: 15,
        timeLimit: 20
    },
    {
        id: '3',
        question: 'Complete o código: function soma(a, b) { return _____; }',
        type: 'fill_blank',
        correctAnswer: 'a + b',
        explanation: 'A função deve retornar a soma dos parâmetros a e b.',
        difficulty: 'easy',
        points: 10,
        timeLimit: 45
    },
    {
        id: '4',
        question: 'Escreva uma função que retorna o maior número entre dois valores:',
        type: 'code',
        correctAnswer: 'function max(a, b) { return a > b ? a : b; }',
        explanation: 'A função usa o operador ternário para comparar os valores e retornar o maior.',
        difficulty: 'hard',
        points: 25,
        codeLanguage: 'javascript',
        timeLimit: 60
    }
];

export function InteractiveQuiz({
    className = '',
    onQuizComplete,
    onQuestionAnswer
}: QuizProps) {
    const [questions, setQuestions] = useState<Question[]>(mockQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isQuizPaused, setIsQuizPaused] = useState(false);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(userAnswers).length;

    useEffect(() => {
        if (isQuizStarted && !isQuizPaused && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && isQuizStarted) {
            handleNextQuestion();
        }
    }, [timeLeft, isQuizStarted, isQuizPaused]);

    useEffect(() => {
        if (currentQuestion?.timeLimit) {
            setTimeLeft(currentQuestion.timeLimit);
        }
    }, [currentQuestionIndex, currentQuestion?.timeLimit]);

    const startQuiz = () => {
        setIsQuizStarted(true);
        setIsQuizPaused(false);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowResults(false);
        setQuizResult(null);
    };

    const pauseQuiz = () => {
        setIsQuizPaused(!isQuizPaused);
    };

    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleAnswerSubmit = () => {
        if (!selectedAnswer) return;

        const isCorrect = checkAnswer(currentQuestion, selectedAnswer);

        setUserAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: selectedAnswer
        }));

        onQuestionAnswer?.(currentQuestion.id, selectedAnswer, isCorrect);
        setShowExplanation(true);
    };

    const checkAnswer = (question: Question, answer: string): boolean => {
        if (question.type === 'multiple_choice' || question.type === 'true_false') {
            return answer === question.correctAnswer;
        } else if (question.type === 'fill_blank') {
            return answer.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase().trim();
        } else if (question.type === 'code') {
            // Simplificado - em um caso real, seria mais complexo
            return answer.toLowerCase().includes('function') && answer.includes('return');
        }
        return false;
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
            setShowExplanation(false);
        } else {
            completeQuiz();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(userAnswers[questions[currentQuestionIndex - 1].id] || '');
            setShowExplanation(false);
        }
    };

    const completeQuiz = () => {
        setIsQuizCompleted(true);
        setIsQuizStarted(false);

        const result = calculateResult();
        setQuizResult(result);
        setShowResults(true);

        onQuizComplete?.(result.score, totalQuestions);
    };

    const calculateResult = (): QuizResult => {
        let correctAnswers = 0;
        let totalPoints = 0;
        let earnedPoints = 0;

        questions.forEach(question => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer ? checkAnswer(question, userAnswer) : false;

            totalPoints += question.points;
            if (isCorrect) {
                correctAnswers++;
                earnedPoints += question.points;
            }
        });

        const wrongAnswers = totalQuestions - correctAnswers;
        const accuracy = (correctAnswers / totalQuestions) * 100;
        const score = Math.round((earnedPoints / totalPoints) * 100);

        let grade: 'A' | 'B' | 'C' | 'D' | 'F';
        if (score >= 90) grade = 'A';
        else if (score >= 80) grade = 'B';
        else if (score >= 70) grade = 'C';
        else if (score >= 60) grade = 'D';
        else grade = 'F';

        return {
            score,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            timeSpent: 0, // Implementar cálculo de tempo
            accuracy,
            grade
        };
    };

    const resetQuiz = () => {
        setIsQuizStarted(false);
        setIsQuizCompleted(false);
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setSelectedAnswer('');
        setUserAnswers({});
        setQuizResult(null);
        setShowExplanation(false);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'text-green-600 bg-green-100 dark:bg-green-900/20';
            case 'medium':
                return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
            case 'hard':
                return 'text-red-600 bg-red-100 dark:bg-red-900/20';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
        }
    };

    const getGradeColor = (grade: string) => {
        switch (grade) {
            case 'A':
                return 'text-green-600 bg-green-100 dark:bg-green-900/20';
            case 'B':
                return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
            case 'C':
                return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
            case 'D':
                return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
            case 'F':
                return 'text-red-600 bg-red-100 dark:bg-red-900/20';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
        }
    };

    if (showResults && quizResult) {
        return (
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
                <div className="text-center">
                    <div className="mb-6">
                        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Quiz Concluído!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Parabéns por completar o quiz
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-blue-500">{quizResult.score}%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Pontuação</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-green-500">{quizResult.correctAnswers}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Corretas</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-red-500">{quizResult.wrongAnswers}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Incorretas</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <div className={`text-2xl font-bold px-3 py-1 rounded-full ${getGradeColor(quizResult.grade)}`}>
                                {quizResult.grade}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Nota</div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={resetQuiz}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Refazer Quiz
                        </button>
                        <button
                            onClick={() => setShowResults(false)}
                            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!isQuizStarted) {
        return (
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
                <div className="text-center">
                    <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Quiz Interativo
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Teste seus conhecimentos com {totalQuestions} perguntas
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">{totalQuestions}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Perguntas</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {questions.reduce((sum, q) => sum + (q.timeLimit || 0), 0)}s
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Tempo Total</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {questions.reduce((sum, q) => sum + q.points, 0)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Pontos</div>
                        </div>
                    </div>

                    <button
                        onClick={startQuiz}
                        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
                    >
                        <Play className="w-4 h-4" />
                        Iniciar Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Pergunta {currentQuestionIndex + 1} de {totalQuestions}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        {timeLeft > 0 && (
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <Clock className="w-4 h-4" />
                                <span>{timeLeft}s</span>
                            </div>
                        )}
                        <button
                            onClick={pauseQuiz}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            {isQuizPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Question Content */}
            <div className="p-6">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(currentQuestion.difficulty)}`}>
                            {currentQuestion.difficulty}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {currentQuestion.points} pontos
                        </span>
                        {currentQuestion.codeLanguage && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                • {currentQuestion.codeLanguage}
                            </span>
                        )}
                    </div>

                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        {currentQuestion.question}
                    </h4>

                    {currentQuestion.type === 'multiple_choice' && (
                        <div className="space-y-3">
                            {currentQuestion.options?.map((option, index) => (
                                <label
                                    key={index}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${selectedAnswer === option
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={option}
                                        checked={selectedAnswer === option}
                                        onChange={(e) => handleAnswerSelect(e.target.value)}
                                        className="text-blue-500"
                                    />
                                    <span className="text-gray-900 dark:text-white">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {currentQuestion.type === 'true_false' && (
                        <div className="space-y-3">
                            {['true', 'false'].map((option) => (
                                <label
                                    key={option}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${selectedAnswer === option
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={option}
                                        checked={selectedAnswer === option}
                                        onChange={(e) => handleAnswerSelect(e.target.value)}
                                        className="text-blue-500"
                                    />
                                    <span className="text-gray-900 dark:text-white">
                                        {option === 'true' ? 'Verdadeiro' : 'Falso'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}

                    {currentQuestion.type === 'fill_blank' && (
                        <div>
                            <input
                                type="text"
                                value={selectedAnswer}
                                onChange={(e) => handleAnswerSelect(e.target.value)}
                                placeholder="Digite sua resposta..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {currentQuestion.type === 'code' && (
                        <div>
                            <textarea
                                value={selectedAnswer}
                                onChange={(e) => handleAnswerSelect(e.target.value)}
                                placeholder="Digite seu código aqui..."
                                className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-900 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
                </div>

                {/* Explanation */}
                {showExplanation && (
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                            Explicação:
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {currentQuestion.explanation}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                        Anterior
                    </button>

                    <div className="flex items-center gap-2">
                        {!showExplanation ? (
                            <button
                                onClick={handleAnswerSubmit}
                                disabled={!selectedAnswer}
                                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                            >
                                Responder
                            </button>
                        ) : (
                            <button
                                onClick={handleNextQuestion}
                                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                {currentQuestionIndex < totalQuestions - 1 ? 'Próxima' : 'Finalizar'}
                                <SkipForward className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}