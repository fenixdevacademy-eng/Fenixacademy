'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Lightbulb,
    Trophy,
    BarChart3,
    RotateCcw,
    Share2,
    Download
} from 'lucide-react';
import { Quiz, QuizQuestion } from '../data/interactiveElements';

interface InteractiveQuizProps {
    quiz: Quiz;
    onComplete?: (score: number, totalQuestions: number, timeSpent: number) => void;
    onClose?: () => void;
    showTimer?: boolean;
    allowRetry?: boolean;
}

export default function InteractiveQuiz({
    quiz,
    onComplete,
    onClose,
    showTimer = true,
    allowRetry = true
}: InteractiveQuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});
    const [showResults, setShowResults] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [showHints, setShowHints] = useState<Record<string, boolean>>({});
    const [attempts, setAttempts] = useState(0);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const timerRef = useRef<NodeJS.Timeout>();
    const startTimeRef = useRef<number>(Date.now());

    // Timer countdown
    useEffect(() => {
        if (quiz.timeLimit && showTimer && !showResults) {
            timerRef.current = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
                setTimeSpent(elapsed);

                if (elapsed >= quiz.timeLimit!) {
                    setIsTimeUp(true);
                    handleSubmitQuiz();
                }
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [quiz.timeLimit, showTimer, showResults]);

    const handleAnswerSelect = (questionId: string, answer: string | string[]) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleMultipleChoiceAnswer = (questionId: string, selectedOption: string) => {
        const currentAnswers = userAnswers[questionId] as string[] || [];
        const newAnswers = currentAnswers.includes(selectedOption)
            ? currentAnswers.filter(a => a !== selectedOption)
            : [...currentAnswers, selectedOption];

        handleAnswerSelect(questionId, newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleSubmitQuiz();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmitQuiz = () => {
        setShowResults(true);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    const handleRetry = () => {
        if (attempts < quiz.attempts) {
            setAttempts(prev => prev + 1);
            setCurrentQuestionIndex(0);
            setUserAnswers({});
            setShowResults(false);
            setTimeSpent(0);
            setIsTimeUp(false);
            setShowHints({});
            startTimeRef.current = Date.now();
        }
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        let totalPoints = 0;

        quiz.questions.forEach(question => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = Array.isArray(question.correctAnswer)
                ? Array.isArray(userAnswer) &&
                question.correctAnswer.length === userAnswer.length &&
                question.correctAnswer.every(ans => userAnswer.includes(ans))
                : userAnswer === question.correctAnswer;

            if (isCorrect) {
                correctAnswers++;
                totalPoints += question.points;
            }
        });

        return { correctAnswers, totalPoints };
    };

    const getScorePercentage = () => {
        const { correctAnswers } = calculateScore();
        return (correctAnswers / quiz.questions.length) * 100;
    };

    const isPassing = () => {
        return getScorePercentage() >= quiz.passingScore;
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const renderQuestion = (question: QuizQuestion) => {
        const userAnswer = userAnswers[question.id];
        const isAnswered = userAnswer !== undefined;

        switch (question.type) {
            case 'multiple-choice':
                return (
                    <div className="space-y-3">
                        {question.options?.map((option, index) => (
                            <label
                                key={index}
                                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${Array.isArray(userAnswer) && userAnswer.includes(option)
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    className="mr-3 w-4 h-4 text-blue-600"
                                    checked={Array.isArray(userAnswer) && userAnswer.includes(option)}
                                    onChange={() => handleMultipleChoiceAnswer(question.id, option)}
                                />
                                <span className="text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'true-false':
                return (
                    <div className="grid grid-cols-2 gap-4">
                        {['true', 'false'].map((option) => (
                            <button
                                key={option}
                                onClick={() => handleAnswerSelect(question.id, option)}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${userAnswer === option
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                {option === 'true' ? 'Verdadeiro' : 'Falso'}
                            </button>
                        ))}
                    </div>
                );

            case 'fill-blank':
                return (
                    <div>
                        <input
                            type="text"
                            placeholder="Digite sua resposta..."
                            value={userAnswer as string || ''}
                            onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                );

            case 'code':
                return (
                    <div>
                        <textarea
                            placeholder="Digite seu código aqui..."
                            value={userAnswer as string || ''}
                            onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none font-mono text-sm"
                            rows={6}
                        />
                    </div>
                );

            case 'matching':
                return (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-600">Arraste as opções para fazer a correspondência correta</p>
                        {/* Implementar lógica de drag and drop aqui */}
                    </div>
                );

            default:
                return null;
        }
    };

    if (showResults) {
        const { correctAnswers, totalPoints } = calculateScore();
        const scorePercentage = getScorePercentage();

        return (
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl mx-auto">
                {/* Results Header */}
                <div className="text-center mb-6">
                    <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${isPassing() ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                        {isPassing() ? (
                            <Trophy className="w-12 h-12 text-green-600" />
                        ) : (
                            <AlertCircle className="w-12 h-12 text-red-600" />
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {isPassing() ? 'Parabéns! Você passou!' : 'Continue estudando!'}
                    </h2>

                    <p className="text-gray-600">
                        {isPassing()
                            ? 'Você demonstrou conhecimento suficiente no assunto.'
                            : 'Não desanime! Revise o conteúdo e tente novamente.'
                        }
                    </p>
                </div>

                {/* Score Details */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{correctAnswers}</div>
                        <div className="text-sm text-gray-600">Corretas</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">{quiz.questions.length - correctAnswers}</div>
                        <div className="text-sm text-gray-600">Incorretas</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
                        <div className="text-sm text-gray-600">Pontos</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Sua pontuação</span>
                        <span>{Math.round(scorePercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className={`h-3 rounded-full transition-all duration-500 ${isPassing() ? 'bg-green-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${scorePercentage}%` }}
                        />
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-1">
                        Pontuação mínima: {quiz.passingScore}%
                    </div>
                </div>

                {/* Time Spent */}
                {showTimer && (
                    <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
                        <Clock className="w-5 h-5 inline mr-2 text-gray-600" />
                        <span className="text-gray-700">
                            Tempo gasto: {formatTime(timeSpent)}
                        </span>
                    </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                    {allowRetry && attempts < quiz.attempts && (
                        <button
                            onClick={handleRetry}
                            className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4 inline mr-2" />
                            Tentar Novamente ({quiz.attempts - attempts} restantes)
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Fechar
                    </button>
                </div>

                {/* Certificate */}
                {isPassing() && quiz.certificate && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                        <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-800 font-medium">
                            Certificado disponível para download!
                        </p>
                        <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                            <Download className="w-4 h-4 inline mr-2" />
                            Baixar Certificado
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto">
            {/* Quiz Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h2>
                <p className="text-gray-600">{quiz.description}</p>
            </div>

            {/* Progress and Timer */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                        Questão {currentQuestionIndex + 1} de {quiz.questions.length}
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                        />
                    </div>
                </div>

                {showTimer && quiz.timeLimit && (
                    <div className="flex items-center space-x-2 text-red-600">
                        <Clock className="w-5 h-5" />
                        <span className="font-mono font-bold">
                            {formatTime(Math.max(0, quiz.timeLimit - timeSpent))}
                        </span>
                    </div>
                )}
            </div>

            {/* Question */}
            <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex-1">
                        {currentQuestion.question}
                    </h3>

                    <div className="flex items-center space-x-2 ml-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                            }`}>
                            {currentQuestion.difficulty === 'easy' ? 'Fácil' :
                                currentQuestion.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                        </span>

                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {currentQuestion.points} pts
                        </span>
                    </div>
                </div>

                {/* Hints */}
                {currentQuestion.hints && currentQuestion.hints.length > 0 && (
                    <div className="mb-4">
                        <button
                            onClick={() => setShowHints(prev => ({ ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }))}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <Lightbulb className="w-4 h-4" />
                            <span className="text-sm">
                                {showHints[currentQuestion.id] ? 'Ocultar dica' : 'Mostrar dica'}
                            </span>
                        </button>

                        {showHints[currentQuestion.id] && (
                            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    💡 {currentQuestion.hints![0]}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Question Content */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    {renderQuestion(currentQuestion)}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`px-4 py-2 rounded-lg transition-colors ${currentQuestionIndex === 0
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    ← Anterior
                </button>

                <div className="flex items-center space-x-3">
                    {currentQuestionIndex === quiz.questions.length - 1 ? (
                        <button
                            onClick={handleSubmitQuiz}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Finalizar Quiz
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            disabled={!userAnswers[currentQuestion.id]}
                            className={`px-6 py-2 rounded-lg transition-colors ${!userAnswers[currentQuestion.id]
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            Próxima →
                        </button>
                    )}
                </div>
            </div>

            {/* Time Warning */}
            {showTimer && quiz.timeLimit && (quiz.timeLimit - timeSpent) <= 30 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                    <AlertCircle className="w-5 h-5 text-red-600 inline mr-2" />
                    <span className="text-red-800 font-medium">
                        Tempo acabando! Finalize o quiz rapidamente.
                    </span>
                </div>
            )}
        </div>
    );
}
