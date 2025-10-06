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
    Database,
    Server,
    Cloud,
    Wifi,
    WifiOff,
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
    BarChart3,
    Lightbulb,
    Eye,
    EyeOff,
    Terminal,
    GitBranch,
    GitCommit,
    GitPullRequest,
    GitMerge,
    GitCompare
} from 'lucide-react';

interface Exercise {
    id: string;
    title: string;
    description: string;
    instructions: string;
    starterCode: string;
    solution: string;
    tests: Array<{
        id: string;
        name: string;
        description: string;
        input: string;
        expectedOutput: string;
        isPassing: boolean;
    }>;
    hints: Array<{
        id: string;
        text: string;
        isUnlocked: boolean;
        cost: number;
    }>;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    timeLimit: number;
    language: string;
    isCompleted: boolean;
    attempts: number;
    maxAttempts: number;
    bestScore: number;
    tags: string[];
}

interface TestResult {
    testId: string;
    passed: boolean;
    output: string;
    error: string | null;
    executionTime: number;
}

export default function ExercisePage() {
    const params = useParams();
    const router = useRouter();
    const { slug, exerciseId } = params as { slug: string; exerciseId: string };

    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [code, setCode] = useState<string>('');
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [showHints, setShowHints] = useState<boolean>(false);
    const [unlockedHints, setUnlockedHints] = useState<Set<string>>(new Set());
    const [score, setScore] = useState<number>(0);
    const [attempts, setAttempts] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [showSolution, setShowSolution] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        loadExercise();
    }, [slug, exerciseId]);

    useEffect(() => {
        if (exercise && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        handleTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [exercise, timeRemaining]);

    const loadExercise = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/exercises/${slug}/${exerciseId}`);
            const data = await response.json();

            if (data.success) {
                setExercise(data.exercise);
                setCode(data.exercise.starterCode);
                setTimeRemaining(data.exercise.timeLimit * 60);
                setAttempts(data.exercise.attempts);
                setIsCompleted(data.exercise.isCompleted);
                setScore(data.exercise.bestScore);
            }
        } catch (error) {
            console.error('Erro ao carregar exercício:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTimeUp = () => {
        setIsRunning(false);
        alert('Tempo esgotado! O exercício foi finalizado automaticamente.');
    };

    const runTests = async () => {
        if (!exercise) return;

        setIsRunning(true);
        setAttempts(prev => prev + 1);

        try {
            const response = await fetch(`/api/exercises/${slug}/${exerciseId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code,
                    language: exercise.language
                })
            });

            const data = await response.json();

            if (data.success) {
                setTestResults(data.testResults);
                setScore(data.score);

                if (data.score === 100) {
                    setIsCompleted(true);
                    alert('Parabéns! Você completou o exercício!');
                }
            }
        } catch (error) {
            console.error('Erro ao executar testes:', error);
        } finally {
            setIsRunning(false);
        }
    };

    const unlockHint = (hintId: string) => {
        if (!exercise) return;

        const hint = exercise.hints.find(h => h.id === hintId);
        if (hint && !unlockedHints.has(hintId)) {
            setUnlockedHints(prev => new Set([...prev, hintId]));
        }
    };

    const resetCode = () => {
        if (exercise) {
            setCode(exercise.starterCode);
        }
    };

    const loadSolution = () => {
        if (exercise) {
            setCode(exercise.solution);
            setShowSolution(true);
        }
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando exercício...</p>
                </div>
            </div>
        );
    }

    if (!exercise) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Exercício não encontrado</h2>
                    <p className="text-gray-600 mb-4">O exercício solicitado não foi encontrado.</p>
                    <Link
                        href={`/course/${slug}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Voltar ao Curso
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link
                                href={`/course/${slug}`}
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Voltar ao Curso
                            </Link>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <h1 className="text-lg font-semibold text-gray-900">{exercise.title}</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Timer */}
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">
                                    {formatTime(timeRemaining)}
                                </span>
                            </div>

                            {/* Difficulty */}
                            <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(exercise.difficulty)}`}>
                                {getDifficultyText(exercise.difficulty)}
                            </div>

                            {/* Points */}
                            <div className="flex items-center space-x-1">
                                <Target className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium text-gray-700">{exercise.points} pts</span>
                            </div>

                            {/* Fullscreen Toggle */}
                            <button
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Instructions Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Instruções</h2>
                            <div className="prose max-w-none text-sm text-gray-700">
                                <div dangerouslySetInnerHTML={{ __html: exercise.instructions.replace(/\n/g, '<br>') }} />
                            </div>

                            {/* Hints */}
                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-gray-900">Dicas</h3>
                                    <button
                                        onClick={() => setShowHints(!showHints)}
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        {showHints ? 'Ocultar' : 'Mostrar'} ({exercise.hints.length})
                                    </button>
                                </div>

                                {showHints && (
                                    <div className="space-y-2">
                                        {exercise.hints.map((hint) => (
                                            <div
                                                key={hint.id}
                                                className={`p-3 rounded-lg border ${unlockedHints.has(hint.id)
                                                    ? 'bg-blue-50 border-blue-200'
                                                    : 'bg-gray-50 border-gray-200'
                                                    }`}
                                            >
                                                {unlockedHints.has(hint.id) ? (
                                                    <p className="text-sm text-gray-700">{hint.text}</p>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-500">
                                                            Dica bloqueada ({hint.cost} pontos)
                                                        </span>
                                                        <button
                                                            onClick={() => unlockHint(hint.id)}
                                                            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                                                        >
                                                            Desbloquear
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-6 space-y-2">
                                <button
                                    onClick={resetCode}
                                    className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Resetar Código
                                </button>

                                <button
                                    onClick={loadSolution}
                                    className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Ver Solução
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Code Editor Panel */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border">
                            {/* Editor Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center space-x-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Editor de Código</h3>
                                    <span className="text-sm text-gray-500">{exercise.language}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={runTests}
                                        disabled={isRunning}
                                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isRunning ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Executando...
                                            </>
                                        ) : (
                                            <>
                                                <Play className="w-4 h-4 mr-2" />
                                                Executar
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Code Editor */}
                            <div className="p-4">
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full h-96 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Digite seu código aqui..."
                                />
                            </div>

                            {/* Test Results */}
                            {testResults.length > 0 && (
                                <div className="border-t p-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Resultados dos Testes</h4>
                                    <div className="space-y-2">
                                        {testResults.map((result) => (
                                            <div
                                                key={result.testId}
                                                className={`flex items-center justify-between p-3 rounded-lg ${result.passed
                                                    ? 'bg-green-50 border border-green-200'
                                                    : 'bg-red-50 border border-red-200'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    {result.passed ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-red-600" />
                                                    )}
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {exercise.tests.find(t => t.id === result.testId)?.name}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {result.executionTime.toFixed(0)}ms
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-900">Pontuação:</span>
                                            <span className="text-lg font-bold text-blue-600">{score}%</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-sm text-gray-600">Tentativas:</span>
                                            <span className="text-sm font-medium text-gray-900">{attempts}/{exercise.maxAttempts}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}