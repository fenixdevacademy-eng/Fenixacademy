'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Play,
    Pause,
    Clock,
    CheckCircle,
    XCircle,
    HelpCircle,
    BookOpen,
    Code,
    Target,
    FileText,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    RotateCw,
    Download,
    Share2,
    Bookmark,
    Settings,
    Maximize,
    Minimize,
    Volume2,
    VolumeX,
    SkipBack,
    SkipForward,
    ZoomIn,
    ZoomOut,
    Move,
    Grip,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Link as LinkIcon,
    Image as ImageIcon,
    Video,
    File,
    Folder,
    FolderOpen,
    Archive,
    Tag,
    Hash,
    AtSign,
    DollarSign,
    Percent,
    Calculator,
    Database,
    Server,
    Cloud,
    CloudOff,
    WifiOff,
    SignalZero,
    SignalLow,
    SignalMedium,
    Signal as SignalMaxIcon,
    Battery,
    BatteryLow,
    BatteryMedium,
    Battery as BatteryHigh,
    BatteryFull,
    Power,
    PowerOff,
    Wifi as WifiIcon,
    Signal as SignalIcon,
    SignalHigh as SignalHighIcon,
    Smartphone as SmartphoneIcon,
    Laptop as LaptopIcon,
    Monitor as MonitorIcon,
    Headphones as HeadphonesIcon,
    Mic as MicIcon,
    Camera as CameraIcon,
    Trophy,
    Award,
    Star,
    Heart,
    Flag,
    AlertCircle,
    Info,
    Zap,
    Shield,
    Globe,
    Smartphone,
    Laptop,
    Monitor,
    Headphones,
    Mic,
    Camera,
    Wifi,
    Signal,
    SignalHigh,
    Activity,
    PieChart,
    LineChart,
    TrendingUp,
    TrendingDown,
    Minus,
    Plus,
    X,
    Check,
    AlertTriangle,
    ThumbsUp,
    ThumbsDown,
    Calendar,
    Bell,
    User,
    Settings as SettingsIcon,
    LogOut,
    ChevronDown,
    ChevronUp,
    RefreshCw,
    ExternalLink,
    Copy,
    Edit,
    Trash2,
    Save,
    Upload,
    Share,
    MoreHorizontal,
    MoreVertical,
    MessageCircle,
    Brain,
    BarChart3
} from 'lucide-react';
import { PageWrapperFunctional } from '@/components/PageWrapperFunctional';

interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    timeLimit: number; // em minutos
    passingScore: number; // porcentagem
    attempts: number;
    maxAttempts: number;
    isCompleted: boolean;
    bestScore: number;
    lastAttempt?: Attempt;
}

interface Question {
    id: string;
    text: string;
    type: 'multiple-choice' | 'true-false' | 'multiple-select';
    options: Option[];
    correctAnswers: string[];
    explanation?: string;
    points: number;
    difficulty: 'easy' | 'medium' | 'hard';
}

interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface Attempt {
    id: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
    completedAt: string;
    answers: Answer[];
}

interface Answer {
    questionId: string;
    selectedOptions: string[];
    isCorrect: boolean;
    timeSpent: number;
}

const QuizPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;
    const quizId = params?.quizId as string;

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [quizResults, setQuizResults] = useState<Attempt | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    // Mock data para o quiz
    const mockQuiz: Quiz = {
        id: 'quiz-1',
        title: 'Quiz: Fundamentos do React',
        description: 'Teste seus conhecimentos sobre os conceitos fundamentais do React, incluindo componentes, JSX, props e estado.',
        timeLimit: 15, // 15 minutos
        passingScore: 70, // 70%
        attempts: 0,
        maxAttempts: 3,
        isCompleted: false,
        bestScore: 0,
        questions: [
            {
                id: 'q1',
                text: 'O que é React?',
                type: 'multiple-choice',
                options: [
                    { id: 'a', text: 'Uma linguagem de programação', isCorrect: false },
                    { id: 'b', text: 'Uma biblioteca JavaScript para construir interfaces de usuário', isCorrect: true },
                    { id: 'c', text: 'Um framework para backend', isCorrect: false },
                    { id: 'd', text: 'Um banco de dados', isCorrect: false }
                ],
                correctAnswers: ['b'],
                explanation: 'React é uma biblioteca JavaScript criada pelo Facebook para construir interfaces de usuário, especialmente para aplicações de página única.',
                points: 10,
                difficulty: 'easy'
            },
            {
                id: 'q2',
                text: 'JSX é obrigatório para usar React.',
                type: 'true-false',
                options: [
                    { id: 'true', text: 'Verdadeiro', isCorrect: false },
                    { id: 'false', text: 'Falso', isCorrect: true }
                ],
                correctAnswers: ['false'],
                explanation: 'JSX não é obrigatório. Você pode usar React sem JSX, mas JSX torna o código mais legível e intuitivo.',
                points: 10,
                difficulty: 'easy'
            },
            {
                id: 'q3',
                text: 'Quais são as principais características dos componentes React? (Selecione todas as corretas)',
                type: 'multiple-select',
                options: [
                    { id: 'a', text: 'Reutilizáveis', isCorrect: true },
                    { id: 'b', text: 'Aceitam props', isCorrect: true },
                    { id: 'c', text: 'Podem ter estado', isCorrect: true },
                    { id: 'd', text: 'São sempre classes', isCorrect: false },
                    { id: 'e', text: 'Retornam elementos React', isCorrect: true }
                ],
                correctAnswers: ['a', 'b', 'c', 'e'],
                explanation: 'Os componentes React são reutilizáveis, aceitam props, podem ter estado e retornam elementos React. Eles podem ser tanto funções quanto classes.',
                points: 15,
                difficulty: 'medium'
            },
            {
                id: 'q4',
                text: 'O que acontece quando o estado de um componente React muda?',
                type: 'multiple-choice',
                options: [
                    { id: 'a', text: 'O componente é destruído', isCorrect: false },
                    { id: 'b', text: 'O componente é re-renderizado', isCorrect: true },
                    { id: 'c', text: 'Nada acontece', isCorrect: false },
                    { id: 'd', text: 'O componente é movido para o final da lista', isCorrect: false }
                ],
                correctAnswers: ['b'],
                explanation: 'Quando o estado de um componente React muda, o componente é automaticamente re-renderizado para refletir as mudanças.',
                points: 10,
                difficulty: 'easy'
            },
            {
                id: 'q5',
                text: 'Qual hook é usado para gerenciar estado em componentes funcionais?',
                type: 'multiple-choice',
                options: [
                    { id: 'a', text: 'useEffect', isCorrect: false },
                    { id: 'b', text: 'useState', isCorrect: true },
                    { id: 'c', text: 'useContext', isCorrect: false },
                    { id: 'd', text: 'useReducer', isCorrect: false }
                ],
                correctAnswers: ['b'],
                explanation: 'O hook useState é usado para gerenciar estado em componentes funcionais. Ele retorna um array com o valor atual do estado e uma função para atualizá-lo.',
                points: 10,
                difficulty: 'medium'
            }
        ]
    };

    useEffect(() => {
        // Simular carregamento
        setTimeout(() => {
            setQuiz(mockQuiz);
            setLoading(false);
        }, 1000);
    }, [slug, quizId]);

    useEffect(() => {
        if (isQuizStarted && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && isQuizStarted) {
            handleSubmitQuiz();
        }
    }, [timeLeft, isQuizStarted]);

    const startQuiz = () => {
        setIsQuizStarted(true);
        setTimeLeft(quiz?.timeLimit || 0);
    };

    const handleAnswerChange = (questionId: string, optionId: string, isMultiple: boolean = false) => {
        setAnswers(prev => {
            if (isMultiple) {
                const currentAnswers = prev[questionId] || [];
                const newAnswers = currentAnswers.includes(optionId)
                    ? currentAnswers.filter(id => id !== optionId)
                    : [...currentAnswers, optionId];
                return { ...prev, [questionId]: newAnswers };
            } else {
                return { ...prev, [questionId]: [optionId] };
            }
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestion < (quiz?.questions.length || 0) - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmitQuiz = () => {
        if (!quiz) return;

        let correctAnswers = 0;
        let totalPoints = 0;
        let earnedPoints = 0;

        const attemptAnswers: Answer[] = [];

        quiz.questions.forEach(question => {
            const userAnswers = answers[question.id] || [];
            const isCorrect = question.correctAnswers.every(answer => userAnswers.includes(answer)) &&
                userAnswers.every(answer => question.correctAnswers.includes(answer));

            if (isCorrect) {
                correctAnswers++;
                earnedPoints += question.points;
            }

            totalPoints += question.points;

            attemptAnswers.push({
                questionId: question.id,
                selectedOptions: userAnswers,
                isCorrect,
                timeSpent: 0 // Simplificado para o exemplo
            });
        });

        const score = Math.round((correctAnswers / quiz.questions.length) * 100);
        const passed = score >= quiz.passingScore;

        const attempt: Attempt = {
            id: `attempt-${Date.now()}`,
            score,
            correctAnswers,
            totalQuestions: quiz.questions.length,
            timeSpent: (quiz.timeLimit * 60) - timeLeft,
            completedAt: new Date().toISOString(),
            answers: attemptAnswers
        };

        setQuizResults(attempt);
        setIsQuizCompleted(true);
        setShowResults(true);
        setIsQuizStarted(false);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-600';
            case 'medium': return 'bg-yellow-600';
            case 'hard': return 'bg-red-600';
            default: return 'bg-gray-600';
        }
    };

    const getDifficultyText = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'Fácil';
            case 'medium': return 'Médio';
            case 'hard': return 'Difícil';
            default: return 'Desconhecido';
        }
    };

    if (loading) {
        return (
            <PageWrapperFunctional>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-xl theme-text-secondary">Carregando quiz...</p>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    if (!quiz) {
        return (
            <PageWrapperFunctional>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4 theme-text">Quiz não encontrado</h2>
                        <p className="theme-text-secondary mb-6">O quiz solicitado não foi encontrado.</p>
                        <Link href={`/course/${slug}`} className="px-6 py-3 theme-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg">
                            Voltar ao Curso
                        </Link>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    if (showResults && quizResults) {
        return (
            <PageWrapperFunctional>
                {/* Header */}
                <header className="theme-surface border-b theme-border sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4">
                                <Link href={`/course/${slug}`} className="flex items-center theme-primary hover:opacity-80 transition-all duration-300">
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Voltar ao Curso
                                </Link>
                                <div className="h-6 w-px theme-border"></div>
                                <div>
                                    <h1 className="text-lg font-semibold theme-text">Resultado do Quiz</h1>
                                    <p className="text-sm theme-text-secondary">{quiz.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Result Summary */}
                    <div className="theme-surface rounded-xl p-8 mb-8 border theme-border shadow-lg">
                        <div className="text-center">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${quizResults.score >= quiz.passingScore ? 'bg-green-600' : 'bg-red-600'
                                } shadow-lg`}>
                                <Trophy className="w-12 h-12 text-white" />
                            </div>

                            <h2 className="text-3xl font-bold mb-4 theme-text">
                                {quizResults.score >= quiz.passingScore ? 'Parabéns!' : 'Tente Novamente'}
                            </h2>

                            <div className="text-6xl font-bold mb-4 theme-gradient-primary bg-clip-text text-transparent">
                                {quizResults.score}%
                            </div>

                            <p className="text-xl theme-text-secondary mb-6">
                                {quizResults.correctAnswers} de {quizResults.totalQuestions} questões corretas
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="theme-surface rounded-lg p-4 border theme-border hover:shadow-lg transition-all duration-300">
                                    <div className="text-2xl font-bold theme-primary">{quizResults.score}%</div>
                                    <div className="theme-text-secondary">Pontuação</div>
                                </div>
                                <div className="theme-surface rounded-lg p-4 border theme-border hover:shadow-lg transition-all duration-300">
                                    <div className="text-2xl font-bold text-green-400">{quizResults.correctAnswers}</div>
                                    <div className="theme-text-secondary">Corretas</div>
                                </div>
                                <div className="theme-surface rounded-lg p-4 border theme-border hover:shadow-lg transition-all duration-300">
                                    <div className="text-2xl font-bold text-yellow-400">{formatTime(quizResults.timeSpent)}</div>
                                    <div className="theme-text-secondary">Tempo</div>
                                </div>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={() => {
                                        setShowResults(false);
                                        setIsQuizCompleted(false);
                                        setCurrentQuestion(0);
                                        setAnswers({});
                                        setTimeLeft(quiz.timeLimit);
                                    }}
                                    className="px-6 py-3 theme-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
                                >
                                    Tentar Novamente
                                </button>
                                <Link
                                    href={`/course/${slug}`}
                                    className="px-6 py-3 theme-surface text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg border theme-border"
                                >
                                    Voltar ao Curso
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Question Review */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold mb-6">Revisão das Questões</h3>
                        {quiz.questions.map((question, index) => {
                            const userAnswer = answers[question.id] || [];
                            const isCorrect = question.correctAnswers.every(answer => userAnswer.includes(answer)) &&
                                userAnswer.every(answer => question.correctAnswers.includes(answer));

                            return (
                                <div key={question.id} className="bg-gray-800 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-2">
                                                <span className="text-lg font-semibold">Questão {index + 1}</span>
                                                <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(question.difficulty)} text-white`}>
                                                    {getDifficultyText(question.difficulty)}
                                                </span>
                                                <span className="text-blue-400">{question.points} pontos</span>
                                            </div>
                                            <p className="text-white mb-4">{question.text}</p>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-600' : 'bg-red-600'
                                            }`}>
                                            {isCorrect ? <CheckCircle className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-white" />}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {question.options.map((option) => {
                                            const isSelected = userAnswer.includes(option.id);
                                            const isCorrectAnswer = question.correctAnswers.includes(option.id);

                                            return (
                                                <div
                                                    key={option.id}
                                                    className={`p-3 rounded-lg border-2 ${isCorrectAnswer
                                                        ? 'border-green-500 bg-green-900/20'
                                                        : isSelected && !isCorrectAnswer
                                                            ? 'border-red-500 bg-red-900/20'
                                                            : 'border-gray-600 bg-gray-700'
                                                        }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`w-4 h-4 rounded-full border-2 ${isCorrectAnswer
                                                            ? 'border-green-500 bg-green-500'
                                                            : isSelected && !isCorrectAnswer
                                                                ? 'border-red-500 bg-red-500'
                                                                : 'border-gray-400'
                                                            }`}></div>
                                                        <span className={`${isCorrectAnswer
                                                            ? 'text-green-400'
                                                            : isSelected && !isCorrectAnswer
                                                                ? 'text-red-400'
                                                                : 'text-gray-300'
                                                            }`}>
                                                            {option.text}
                                                        </span>
                                                        {isCorrectAnswer && <CheckCircle className="w-4 h-4 text-green-400" />}
                                                        {isSelected && !isCorrectAnswer && <XCircle className="w-4 h-4 text-red-400" />}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {question.explanation && (
                                        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
                                            <h4 className="text-blue-400 font-semibold mb-2">Explicação:</h4>
                                            <p className="theme-text">{question.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    if (!isQuizStarted) {
        return (
            <PageWrapperFunctional>
                {/* Header */}
                <header className="theme-surface border-b theme-border sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4">
                                <Link href={`/course/${slug}`} className="flex items-center theme-primary hover:opacity-80 transition-all duration-300">
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Voltar ao Curso
                                </Link>
                                <div className="h-6 w-px theme-border"></div>
                                <div>
                                    <h1 className="text-lg font-semibold theme-text">{quiz.title}</h1>
                                    <p className="text-sm theme-text-secondary">Preparação para o Quiz</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Quiz Info */}
                    <div className="theme-surface rounded-xl p-8 mb-8 border theme-border shadow-lg">
                        <div className="text-center">
                            <div className="w-16 h-16 theme-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <HelpCircle className="w-8 h-8 text-white" />
                            </div>

                            <h2 className="text-3xl font-bold mb-4 theme-text">{quiz.title}</h2>
                            <p className="text-xl theme-text-secondary mb-8">{quiz.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                <div className="theme-surface rounded-lg p-4 border theme-border hover:shadow-lg transition-all duration-300">
                                    <div className="text-2xl font-bold theme-primary">{quiz.questions.length}</div>
                                    <div className="theme-text-secondary">Questões</div>
                                </div>
                                <div className="theme-surface rounded-lg p-4 border theme-border hover:shadow-lg transition-all duration-300">
                                    <div className="text-2xl font-bold text-yellow-400">{quiz.timeLimit} min</div>
                                    <div className="theme-text-secondary">Tempo Limite</div>
                                </div>
                                <div className="theme-surface rounded-lg p-4 border theme-border hover:shadow-lg transition-all duration-300">
                                    <div className="text-2xl font-bold text-green-400">{quiz.passingScore}%</div>
                                    <div className="theme-text-secondary">Pontuação Mínima</div>
                                </div>
                                <div className="theme-surface rounded-lg p-4 border theme-border hover:shadow-lg transition-all duration-300">
                                    <div className="text-2xl font-bold text-purple-400">{quiz.maxAttempts - quiz.attempts}</div>
                                    <div className="theme-text-secondary">Tentativas Restantes</div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <h3 className="text-xl font-semibold theme-text">Instruções:</h3>
                                <ul className="text-left space-y-2 theme-text-secondary">
                                    <li>• Leia cada questão cuidadosamente antes de responder</li>
                                    <li>• Você pode navegar entre as questões usando os botões Anterior/Próximo</li>
                                    <li>• Para questões de múltipla escolha, selecione apenas uma opção</li>
                                    <li>• Para questões de múltipla seleção, marque todas as opções corretas</li>
                                    <li>• O tempo será contado automaticamente</li>
                                    <li>• Você pode submeter o quiz a qualquer momento</li>
                                </ul>
                            </div>

                            <button
                                onClick={startQuiz}
                                className="px-8 py-4 theme-gradient-primary text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg"
                            >
                                Iniciar Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    const currentQuestionData = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    return (
        <PageWrapperFunctional>
            {/* Header */}
            <header className="theme-surface border-b theme-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Link href={`/course/${slug}`} className="flex items-center theme-primary hover:opacity-80 transition-all duration-300">
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Voltar ao Curso
                            </Link>
                            <div className="h-6 w-px theme-border"></div>
                            <div>
                                <h1 className="text-lg font-semibold theme-text">{quiz.title}</h1>
                                <p className="text-sm theme-text-secondary">Questão {currentQuestion + 1} de {quiz.questions.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-yellow-400">
                                <Clock className="w-5 h-5" />
                                <span className="text-lg font-semibold">{formatTime(timeLeft)}</span>
                            </div>
                            <button
                                onClick={handleSubmitQuiz}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg"
                            >
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm theme-text-secondary">Progresso</span>
                        <span className="text-sm theme-text-secondary">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full theme-surface rounded-full h-2 border theme-border">
                        <div
                            className="theme-gradient-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question */}
                <div className="theme-surface rounded-xl p-8 mb-8 border theme-border shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-4">
                                <span className="text-2xl font-bold theme-text">Questão {currentQuestion + 1}</span>
                                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(currentQuestionData.difficulty)} text-white`}>
                                    {getDifficultyText(currentQuestionData.difficulty)}
                                </span>
                                <span className="theme-primary font-semibold">{currentQuestionData.points} pontos</span>
                            </div>
                            <h2 className="text-xl theme-text mb-6">{currentQuestionData.text}</h2>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        {currentQuestionData.options.map((option) => {
                            const isSelected = (answers[currentQuestionData.id] || []).includes(option.id);

                            return (
                                <label
                                    key={option.id}
                                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${isSelected
                                        ? 'border-theme-primary bg-theme-primary/20'
                                        : 'theme-border theme-surface hover:opacity-80'
                                        }`}
                                >
                                    <input
                                        type={currentQuestionData.type === 'multiple-select' ? 'checkbox' : 'radio'}
                                        name={`question-${currentQuestionData.id}`}
                                        value={option.id}
                                        checked={isSelected}
                                        onChange={() => handleAnswerChange(
                                            currentQuestionData.id,
                                            option.id,
                                            currentQuestionData.type === 'multiple-select'
                                        )}
                                        className="w-5 h-5 theme-primary theme-surface theme-border focus:ring-theme-primary"
                                    />
                                    <span className="theme-text">{option.text}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${currentQuestion === 0
                            ? 'theme-surface text-gray-500 cursor-not-allowed'
                            : 'theme-surface text-white hover:opacity-80'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Anterior</span>
                    </button>

                    <div className="flex space-x-2">
                        {quiz.questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestion(index)}
                                className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-300 ${index === currentQuestion
                                    ? 'theme-gradient-primary text-white'
                                    : answers[quiz.questions[index].id]?.length > 0
                                        ? 'bg-green-600 text-white'
                                        : 'theme-surface text-gray-400 hover:opacity-80'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    {currentQuestion === quiz.questions.length - 1 ? (
                        <button
                            onClick={handleSubmitQuiz}
                            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg"
                        >
                            <span>Finalizar Quiz</span>
                            <CheckCircle className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="flex items-center space-x-2 px-6 py-3 theme-surface text-white rounded-lg hover:opacity-80 transition-all duration-300"
                        >
                            <span>Próxima</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </PageWrapperFunctional>
    );
};
export default QuizPage;

