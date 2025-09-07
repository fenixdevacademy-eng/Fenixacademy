'use client';

import React, { useState, useEffect } from 'react';
import { Quiz, QuizQuestion } from '../data/interactiveElements';

interface GamifiedQuizProps {
    quiz: Quiz;
    title: string;
    onComplete?: (score: number, timeSpent: number, badges: string[]) => void;
}

interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    unlocked: boolean;
}

interface UserProgress {
    totalQuizzes: number;
    totalPoints: number;
    averageScore: number;
    streak: number;
    badges: Badge[];
}

export const GamifiedQuiz: React.FC<GamifiedQuizProps> = ({
    quiz,
    title,
    onComplete
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: string]: any }>({});
    const [timeSpent, setTimeSpent] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [userProgress, setUserProgress] = useState<UserProgress>({
        totalQuizzes: 0,
        totalPoints: 0,
        averageScore: 0,
        streak: 0,
        badges: []
    });

    // Timer para o quiz
    useEffect(() => {
        if (!isCompleted && quiz.timeLimit && quiz.timeLimit > 0) {
            const timer = setInterval(() => {
                setTimeSpent(prev => prev + 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isCompleted, quiz.timeLimit]);

    // Verificar se o tempo acabou
    useEffect(() => {
        if (quiz.timeLimit && quiz.timeLimit > 0 && timeSpent >= quiz.timeLimit && !isCompleted) {
            handleQuizComplete();
        }
    }, [timeSpent, quiz.timeLimit, isCompleted]);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;
    const progress = (currentQuestionIndex / totalQuestions) * 100;

    const handleAnswerSelect = (questionId: string, answer: any) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleQuizComplete();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const calculateScore = (): number => {
        let correctAnswers = 0;
        quiz.questions.forEach(question => {
            const userAnswer = userAnswers[question.id];
            if (userAnswer !== undefined) {
                if (question.type === 'multiple-choice') {
                    if (userAnswer === question.correctAnswer) {
                        correctAnswers++;
                    }
                } else if (question.type === 'fill-blank') {
                    const correctAnswerStr = Array.isArray(question.correctAnswer)
                        ? question.correctAnswer[0]
                        : question.correctAnswer;
                    const userAnswerStr = Array.isArray(userAnswer)
                        ? userAnswer[0]
                        : userAnswer;

                    if (typeof correctAnswerStr === 'string' && typeof userAnswerStr === 'string' &&
                        userAnswerStr.toLowerCase().trim() === correctAnswerStr.toLowerCase().trim()) {
                        correctAnswers++;
                    }
                } else if (question.type === 'matching') {
                    // Para questões de matching, verificar se todas as respostas estão corretas
                    if (Array.isArray(userAnswer) && Array.isArray(question.correctAnswer)) {
                        const allCorrect = userAnswer.every((ans, index) =>
                            ans === question.correctAnswer[index]
                        );
                        if (allCorrect) correctAnswers++;
                    }
                }
            }
        });
        return Math.round((correctAnswers / totalQuestions) * 100);
    };

    const handleQuizComplete = () => {
        setIsCompleted(true);
        const finalScore = calculateScore();

        // Calcular badges baseado no desempenho
        const earnedBadges = calculateBadges(finalScore, timeSpent);

        // Atualizar progresso do usuário
        setUserProgress(prev => ({
            ...prev,
            totalQuizzes: prev.totalQuizzes + 1,
            totalPoints: prev.totalPoints + finalScore,
            averageScore: Math.round((prev.totalPoints + finalScore) / (prev.totalQuizzes + 1)),
            streak: finalScore >= 80 ? prev.streak + 1 : 0,
            badges: [...prev.badges, ...earnedBadges]
        }));

        if (onComplete) {
            onComplete(finalScore, timeSpent, earnedBadges.map(b => b.name));
        }
    };

    const calculateBadges = (score: number, time: number): Badge[] => {
        const badges: Badge[] = [];

        if (score >= 90) {
            badges.push({
                id: 'expert',
                name: 'Expert',
                description: 'Mestre do conhecimento!',
                icon: '🏆',
                color: 'gold',
                unlocked: true
            });
        } else if (score >= 80) {
            badges.push({
                id: 'advanced',
                name: 'Avançado',
                description: 'Excelente desempenho!',
                icon: '⭐',
                color: 'blue',
                unlocked: true
            });
        } else if (score >= 70) {
            badges.push({
                id: 'intermediate',
                name: 'Intermediário',
                description: 'Bom trabalho!',
                icon: '🎯',
                color: 'green',
                unlocked: true
            });
        }

        if (time < (quiz.timeLimit || 0) * 0.5) {
            badges.push({
                id: 'speedster',
                name: 'Speedster',
                description: 'Rápido como um raio!',
                icon: '⚡',
                color: 'yellow',
                unlocked: true
            });
        }

        return badges;
    };

    const renderQuestion = () => {
        if (!currentQuestion) return null;

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Questão {currentQuestionIndex + 1} de {totalQuestions}</span>
                    <span>{currentQuestion.points} pontos</span>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {currentQuestion.question}
                    </h3>

                    {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <label
                                    key={index}
                                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion.id}`}
                                        value={index}
                                        checked={userAnswers[currentQuestion.id] === index}
                                        onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {currentQuestion.type === 'fill-blank' && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Digite sua resposta..."
                                value={userAnswers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    )}

                    {currentQuestion.type === 'true-false' && (
                        <div className="space-y-3">
                            {['Verdadeiro', 'Falso'].map((option, index) => (
                                <label
                                    key={index}
                                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion.id}`}
                                        value={option}
                                        checked={userAnswers[currentQuestion.id] === option}
                                        onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {currentQuestion.type === 'matching' && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Arraste as opções para fazer a correspondência correta:
                            </p>
                            {/* Implementar interface de drag and drop para matching */}
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Interface de matching em desenvolvimento...</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between pt-6">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Anterior
                    </button>

                    <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {currentQuestionIndex === totalQuestions - 1 ? 'Finalizar' : 'Próxima →'}
                    </button>
                </div>
            </div>
        );
    };

    const renderResults = () => {
        const finalScore = calculateScore();
        const earnedBadges = calculateBadges(finalScore, timeSpent);

        return (
            <div className="text-center space-y-6">
                <div className="text-6xl mb-4">
                    {finalScore >= 90 ? '🏆' : finalScore >= 80 ? '⭐' : finalScore >= 70 ? '🎯' : '📚'}
                </div>

                <h2 className="text-3xl font-bold text-gray-900">
                    Quiz Concluído!
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{finalScore}%</div>
                        <div className="text-sm text-blue-600">Pontuação</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{timeSpent}s</div>
                        <div className="text-sm text-green-600">Tempo</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-2xl font-bold text-purple-600">{earnedBadges.length}</div>
                        <div className="text-sm text-purple-600">Badges</div>
                    </div>
                </div>

                {earnedBadges.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Badges Desbloqueados:</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {earnedBadges.map(badge => (
                                <div
                                    key={badge.id}
                                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-full"
                                >
                                    <span className="text-xl">{badge.icon}</span>
                                    <span className="text-sm font-medium text-yellow-800">{badge.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={() => setShowResults(true)}
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        📋 Ver Resultados Detalhados
                    </button>
                    <button
                        onClick={() => {
                            setCurrentQuestionIndex(0);
                            setUserAnswers({});
                            setTimeSpent(0);
                            setIsCompleted(false);
                            setShowResults(false);
                        }}
                        className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        🔄 Tentar Novamente
                    </button>
                </div>
            </div>
        );
    };

    const renderDetailedResults = () => {
        return (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                    📋 Resultados Detalhados
                </h3>

                {quiz.questions.map((question, index) => {
                    const userAnswer = userAnswers[question.id];
                    let isCorrect = false;

                    if (question.type === 'multiple-choice') {
                        isCorrect = userAnswer === question.correctAnswer;
                    } else if (question.type === 'fill-blank') {
                        const correctAnswerStr = Array.isArray(question.correctAnswer)
                            ? question.correctAnswer[0]
                            : question.correctAnswer;
                        const userAnswerStr = Array.isArray(userAnswer)
                            ? userAnswer[0]
                            : userAnswer;

                        if (typeof correctAnswerStr === 'string' && typeof userAnswerStr === 'string') {
                            isCorrect = userAnswerStr.toLowerCase().trim() === correctAnswerStr.toLowerCase().trim();
                        }
                    } else if (question.type === 'true-false') {
                        isCorrect = userAnswer === question.correctAnswer;
                    }

                    return (
                        <div key={question.id} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                            }`}>
                            <div className="flex items-start space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                    }`}>
                                    {isCorrect ? '✓' : '✗'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 mb-2">
                                        Questão {index + 1}: {question.question}
                                    </h4>

                                    {question.type === 'multiple-choice' && question.options && (
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">
                                                <strong>Sua resposta:</strong> {typeof userAnswer === 'number' && question.options[userAnswer] ? question.options[userAnswer] : 'Não respondida'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Resposta correta:</strong> {typeof question.correctAnswer === 'number' && question.options[question.correctAnswer] ? question.options[question.correctAnswer] : 'Resposta inválida'}
                                            </p>
                                        </div>
                                    )}

                                    {question.type === 'fill-blank' && (
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">
                                                <strong>Sua resposta:</strong> {userAnswer || 'Não respondida'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Resposta correta:</strong> {Array.isArray(question.correctAnswer) ? question.correctAnswer[0] : question.correctAnswer}
                                            </p>
                                        </div>
                                    )}

                                    {question.type === 'true-false' && (
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">
                                                <strong>Sua resposta:</strong> {userAnswer || 'Não respondida'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Resposta correta:</strong> {question.correctAnswer}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-3 p-3 bg-white rounded border">
                                        <p className="text-sm text-gray-700">
                                            <strong>💡 Explicação:</strong> {question.explanation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="text-center pt-6">
                    <button
                        onClick={() => setShowResults(false)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        ← Voltar aos Resultados
                    </button>
                </div>
            </div>
        );
    };

    if (!quiz) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz não disponível</h2>
                <p className="text-gray-600">Este quiz ainda não foi configurado.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header do Quiz */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                <p className="text-gray-600 mb-4">{quiz.title}</p>

                {/* Barra de progresso */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Timer */}
                {quiz.timeLimit && quiz.timeLimit > 0 && (
                    <div className="text-sm text-gray-600">
                        ⏱️ Tempo restante: {Math.max(0, quiz.timeLimit - timeSpent)}s
                    </div>
                )}
            </div>

            {/* Conteúdo do Quiz */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
                {!isCompleted && renderQuestion()}
                {isCompleted && !showResults && renderResults()}
                {isCompleted && showResults && renderDetailedResults()}
            </div>
        </div>
    );
};
