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
    BarChart3,
    Lightbulb,
    Eye,
    EyeOff,
    Terminal,
    GitBranch,
    GitCommit,
    GitPullRequest,
    GitMerge,
    GitCompare,
    GitBranch as GitBranchIcon,
    GitCommit as GitCommitIcon,
    GitPullRequest as GitPullRequestIcon,
    GitMerge as GitMergeIcon,
    GitCompare as GitCompareIcon,
    GitBranch as GitBranchIcon2,
    GitCommit as GitCommitIcon2,
    GitPullRequest as GitPullRequestIcon2,
    GitMerge as GitMergeIcon2,
    GitCompare as GitCompareIcon2,
    Sparkles,
    ArrowRight as ArrowRightIcon,
    Target as TargetIcon,
    TrendingUp as TrendingUpIcon,
    Brain as BrainIcon,
    Shield as ShieldIcon,
    Rocket,
    GraduationCap,
    Globe as GlobeIcon,
    Database as DatabaseIcon,
    Smartphone as SmartphoneIcon2,
    Crown,
    MessageSquare,
    FileText as FileTextIcon,
    BarChart3 as BarChart3Icon,
    Calendar as CalendarIcon,
    Timer,
    Award as AwardIcon,
    User as UserIcon,
    Mail,
    Phone,
    MapPin,
    Lock as LockIcon,
    Eye as EyeIcon,
    EyeOff as EyeOffIcon,
    Briefcase,
    Cloud as CloudIcon,
    FileText as FileTextIcon2,
    AlertCircle as AlertCircleIcon,
    CheckCircle as CheckCircleIcon,
    X as XIcon,
    ChevronUp as ChevronUpIcon,
    ChevronDown as ChevronDownIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon2,
    Play as PlayIcon,
    Pause as PauseIcon,
    Volume2 as Volume2Icon,
    Settings as SettingsIcon2,
    Maximize2,
    RotateCcw as RotateCcwIcon,
    Hand,
    Zap as ZapIcon,
    CheckCircle as CheckCircleIcon2,
    Clock as ClockIcon,
    BookOpen as BookOpenIcon,
    FileText as FileTextIcon3,
    Code as CodeIcon,
    ChevronRight as ChevronRightIcon3,
    ChevronDown as ChevronDownIcon2,
    Star as StarIcon,
    Users,
    Award as AwardIcon2,
    Download as DownloadIcon,
    Share2 as Share2Icon,
    Heart as HeartIcon,
    Bookmark as BookmarkIcon,
    MessageCircle as MessageCircleIcon,
    Bell as BellIcon,
    Search,
    Filter,
    Grid,
    List,
    ArrowLeft as ArrowLeftIcon,
    ArrowRight as ArrowRightIcon4,
    ArrowUp,
    ArrowDown,
    Home,
    Menu,
    X as XIcon2,
    Plus as PlusIcon,
    Minus as MinusIcon,
    Eye as EyeIcon2,
    EyeOff as EyeOffIcon2,
    Lock as LockIcon2,
    Unlock,
    RefreshCw as RefreshCwIcon,
    ExternalLink as ExternalLinkIcon,
    Upload as UploadIcon,
    Save as SaveIcon,
    Edit as EditIcon,
    Trash2 as Trash2Icon,
    Copy as CopyIcon,
    Share as ShareIcon,
    Flag as FlagIcon,
    HelpCircle as HelpCircleIcon,
    Info as InfoIcon,
    AlertCircle as AlertCircleIcon2,
    Check as CheckIcon,
    X as XIcon3,
    ChevronUp as ChevronUpIcon2,
    ChevronLeft as ChevronLeftIcon2,
    ChevronRight as ChevronRightIcon5,
    ChevronDown as ChevronDownIcon3
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import PageWrapperFunctional from '@/components/PageWrapperFunctional';

interface Exercise {
    id: string;
    title: string;
    description: string;
    instructions: string;
    starterCode: string;
    solution: string;
    tests: Test[];
    hints: Hint[];
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    timeLimit?: number; // em minutos
    language: string;
    isCompleted: boolean;
    attempts: number;
    maxAttempts: number;
    bestScore: number;
    tags: string[];
}

interface Test {
    id: string;
    name: string;
    description: string;
    input: string;
    expectedOutput: string;
    isPassing: boolean;
    errorMessage?: string;
}

interface Hint {
    id: string;
    text: string;
    isUnlocked: boolean;
    cost: number; // pontos para desbloquear
}

interface TestResult {
    testId: string;
    passed: boolean;
    output: string;
    error?: string;
    executionTime: number;
}

const ExercisePage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;
    const exerciseId = params?.exerciseId as string;

    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState('');
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const [unlockedHints, setUnlockedHints] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [activeTab, setActiveTab] = useState<'instructions' | 'code' | 'tests' | 'hints'>('instructions');

    // Mock data para o exercício
    const mockExercise: Exercise = {
        id: 'exercise-1',
        title: 'Criar um Componente React Simples',
        description: 'Crie um componente React que exiba uma mensagem de boas-vindas personalizada.',
        instructions: `
# Exercício: Componente React Simples

## Objetivo
Crie um componente React funcional que exiba uma mensagem de boas-vindas personalizada.

## Requisitos
1. O componente deve aceitar uma prop \`name\` (string)
2. O componente deve exibir "Olá, [nome]! Bem-vindo ao React!"
3. Se nenhum nome for fornecido, deve exibir "Olá, Visitante! Bem-vindo ao React!"
4. O componente deve ser exportado como default

## Exemplo de Uso
\`\`\`jsx
<Welcome name="João" />
// Deve exibir: "Olá, João! Bem-vindo ao React!"

<Welcome />
// Deve exibir: "Olá, Visitante! Bem-vindo ao React!"
\`\`\`

## Dicas
- Use props para receber o nome
- Use JSX para renderizar a mensagem
- Lembre-se de exportar o componente como default
- Use valores padrão para props quando necessário

## Testes
O exercício será testado com diferentes valores de props para verificar se o componente funciona corretamente.
    `,
        starterCode: `import React from 'react';

// Crie seu componente aqui
function Welcome() {
  return (
    <div>
      {/* Seu código aqui */}
    </div>
  );
}

// Função necessária para geração estática com output: export
export async function generateStaticParams() {
    // Lista de cursos disponíveis para geração estática
    const courses = [
        'fundamentos-programacao',
        'html-css-basico',
        'javascript-fundamentos',
        'javascript-es6',
        'react-fundamentos',
        'react-advanced',
        'nodejs-fundamentos',
        'nodejs-backend',
        'python-fundamentos',
        'python-avancado',
        'django-fundamentos',
        'flask-avancado',
        'sql-fundamentos',
        'postgresql-avancado',
        'mongodb-fundamentos',
        'git-github',
        'docker-fundamentos',
        'kubernetes-avancado',
        'aws-fundamentos',
        'azure-avancado',
        'data-science-python',
        'machine-learning',
        'cybersecurity-fundamentos',
        'mobile-react-native',
        'flutter-avancado'
    ];

    return courses.map((slug) => ({
        slug: slug,
    }));
}

export default Welcome;`,
        solution: `import React from 'react';

function Welcome({ name = 'Visitante' }) {
  return (
    <div>
      <h1>Olá, {name}! Bem-vindo ao React!</h1>
    </div>
  );
}

export default Welcome;`,
        tests: [
            {
                id: 'test-1',
                name: 'Teste com nome específico',
                description: 'Deve exibir a mensagem com o nome fornecido',
                input: 'name="João"',
                expectedOutput: 'Olá, João! Bem-vindo ao React!',
                isPassing: false
            },
            {
                id: 'test-2',
                name: 'Teste sem nome',
                description: 'Deve exibir a mensagem padrão quando nenhum nome for fornecido',
                input: 'sem props',
                expectedOutput: 'Olá, Visitante! Bem-vindo ao React!',
                isPassing: false
            },
            {
                id: 'test-3',
                name: 'Teste com nome vazio',
                description: 'Deve exibir a mensagem padrão quando nome for vazio',
                input: 'name=""',
                expectedOutput: 'Olá, Visitante! Bem-vindo ao React!',
                isPassing: false
            }
        ],
        hints: [
            {
                id: 'hint-1',
                text: 'Use destructuring para receber a prop name: function Welcome({ name })',
                isUnlocked: false,
                cost: 5
            },
            {
                id: 'hint-2',
                text: 'Use valores padrão para props: function Welcome({ name = "Visitante" })',
                isUnlocked: false,
                cost: 10
            },
            {
                id: 'hint-3',
                text: 'Use interpolação JSX para exibir o nome: <h1>Olá, {name}!</h1>',
                isUnlocked: false,
                cost: 15
            }
        ],
        difficulty: 'easy',
        points: 50,
        timeLimit: 30,
        language: 'javascript',
        isCompleted: false,
        attempts: 0,
        maxAttempts: 5,
        bestScore: 0,
        tags: ['react', 'jsx', 'props', 'components']
    };

    useEffect(() => {
        // Simular carregamento
        setTimeout(() => {
            setExercise(mockExercise);
            setCode(mockExercise.starterCode);
            setLoading(false);
        }, 1000);
    }, [slug, exerciseId]);

    useEffect(() => {
        if (isTimerActive && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && isTimerActive) {
            handleSubmit();
        }
    }, [timeLeft, isTimerActive]);

    const startTimer = () => {
        if (exercise?.timeLimit) {
            setTimeLeft(exercise.timeLimit * 60);
            setIsTimerActive(true);
        }
    };

    const stopTimer = () => {
        setIsTimerActive(false);
    };

    const runTests = async () => {
        setIsRunning(true);

        // Simular execução dos testes
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock dos resultados dos testes
        const results: TestResult[] = exercise?.tests.map(test => ({
            testId: test.id,
            passed: Math.random() > 0.5, // Simular resultado aleatório
            output: test.expectedOutput,
            executionTime: Math.random() * 1000
        })) || [];

        setTestResults(results);
        setIsRunning(false);
    };

    const handleSubmit = () => {
        runTests();
        stopTimer();
    };

    const unlockHint = (hintId: string, cost: number) => {
        if (!unlockedHints.includes(hintId)) {
            setUnlockedHints([...unlockedHints, hintId]);
            // Aqui você subtrairia os pontos do usuário
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

    if (loading) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-xl theme-text-secondary">Carregando exercício...</p>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    if (!exercise) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold theme-text mb-4">Exercício não encontrado</h2>
                        <p className="theme-text-secondary mb-6">O exercício solicitado não foi encontrado.</p>
                        <Link href={`/course/${slug}`} className="theme-gradient-primary text-white px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg">
                            Voltar ao Curso
                        </Link>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    return (
        <PageWrapperFunctional>
            <div className="min-h-screen theme-bg">
                {/* Header */}
                <header className="theme-surface border-b theme-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4">
                                <Link href={`/course/${slug}`} className="flex items-center theme-primary hover:theme-primary/80 transition-colors">
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Voltar ao Curso
                                </Link>
                                <div className="h-6 w-px theme-border"></div>
                                <div>
                                    <h1 className="text-lg font-semibold theme-text">{exercise.title}</h1>
                                    <p className="text-sm theme-text-secondary">Exercício de Programação</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {exercise.timeLimit && (
                                    <div className="flex items-center space-x-2 text-yellow-400">
                                        <Clock className="w-5 h-5" />
                                        <span className="text-lg font-semibold">{formatTime(timeLeft)}</span>
                                    </div>
                                )}
                                <button
                                    onClick={handleSubmit}
                                    disabled={isRunning}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 hover:scale-105 shadow-lg"
                                >
                                    {isRunning ? 'Executando...' : 'Executar Testes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex h-screen">
                    {/* Sidebar - Instruções e Navegação */}
                    <div className="w-80 theme-surface border-r theme-border overflow-y-auto">
                        <div className="p-4">
                            {/* Exercise Info */}
                            <div className="mb-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(exercise.difficulty)} text-white`}>
                                        {getDifficultyText(exercise.difficulty)}
                                    </span>
                                    <span className="theme-primary font-semibold">{exercise.points} pontos</span>
                                </div>
                                <h3 className="text-lg font-semibold theme-text mb-2">{exercise.title}</h3>
                                <p className="theme-text-secondary text-sm mb-4">{exercise.description}</p>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="theme-surface rounded-lg p-3 border theme-border">
                                        <div className="theme-primary font-semibold">{exercise.attempts}</div>
                                        <div className="theme-text-secondary">Tentativas</div>
                                    </div>
                                    <div className="theme-surface rounded-lg p-3 border theme-border">
                                        <div className="text-green-400 font-semibold">{exercise.bestScore}%</div>
                                        <div className="theme-text-secondary">Melhor Score</div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Tabs */}
                            <div className="space-y-2">
                                {[
                                    { id: 'instructions', label: 'Instruções', icon: FileText },
                                    { id: 'code', label: 'Código', icon: Code },
                                    { id: 'tests', label: 'Testes', icon: CheckCircle },
                                    { id: 'hints', label: 'Dicas', icon: Lightbulb }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === tab.id
                                            ? 'theme-gradient-primary text-white'
                                            : 'theme-surface text-gray-300 hover:theme-surface/80'
                                            }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto">
                            {activeTab === 'instructions' && (
                                <div className="p-6">
                                    <div className="prose prose-invert max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: exercise.instructions.replace(/\n/g, '<br>') }} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'code' && (
                                <div className="p-6">
                                    <div className="theme-surface rounded-lg p-4 mb-4 border theme-border">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold theme-text">Editor de Código</h3>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => setCode(exercise.starterCode)}
                                                    className="px-3 py-1 theme-surface text-white rounded hover:theme-surface/80 transition-colors border theme-border"
                                                >
                                                    Reset
                                                </button>
                                                <button
                                                    onClick={() => setShowSolution(!showSolution)}
                                                    className="px-3 py-1 theme-gradient-primary text-white rounded hover:scale-105 transition-all shadow-lg"
                                                >
                                                    {showSolution ? 'Ocultar' : 'Ver'} Solução
                                                </button>
                                            </div>
                                        </div>

                                        {showSolution ? (
                                            <div className="theme-surface rounded p-4 border theme-border">
                                                <h4 className="text-green-400 font-semibold mb-2">Solução:</h4>
                                                <pre className="theme-text-secondary text-sm overflow-x-auto">
                                                    <code>{exercise.solution}</code>
                                                </pre>
                                            </div>
                                        ) : (
                                            <textarea
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                className="w-full h-96 theme-surface text-white p-4 rounded border theme-border font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                                                placeholder="Digite seu código aqui..."
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tests' && (
                                <div className="p-6">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold theme-text mb-4">Testes</h3>
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={runTests}
                                                disabled={isRunning}
                                                className="px-4 py-2 theme-gradient-primary text-white rounded-lg hover:scale-105 transition-all disabled:opacity-50 shadow-lg"
                                            >
                                                {isRunning ? 'Executando...' : 'Executar Testes'}
                                            </button>
                                            <span className="theme-text-secondary">
                                                {testResults.filter(r => r.passed).length} de {exercise.tests.length} testes passando
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {exercise.tests.map((test, index) => {
                                            const result = testResults.find(r => r.testId === test.id);
                                            return (
                                                <div key={test.id} className="theme-surface rounded-lg p-4 border theme-border">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold theme-text mb-1">{test.name}</h4>
                                                            <p className="theme-text-secondary text-sm mb-2">{test.description}</p>
                                                            <div className="text-sm theme-text-secondary">
                                                                <div><strong>Entrada:</strong> {test.input}</div>
                                                                <div><strong>Saída Esperada:</strong> {test.expectedOutput}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            {result ? (
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${result.passed ? 'bg-green-600' : 'bg-red-600'
                                                                    }`}>
                                                                    {result.passed ? <CheckCircle className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-white" />}
                                                                </div>
                                                            ) : (
                                                                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                                                                    <HelpCircle className="w-5 h-5 text-gray-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {result && (
                                                        <div className="mt-3 p-3 theme-surface rounded border theme-border">
                                                            <div className="text-sm">
                                                                <div className="theme-text-secondary mb-1">
                                                                    <strong>Saída Real:</strong> {result.output}
                                                                </div>
                                                                {result.error && (
                                                                    <div className="text-red-400 mb-1">
                                                                        <strong>Erro:</strong> {result.error}
                                                                    </div>
                                                                )}
                                                                <div className="theme-text-secondary">
                                                                    <strong>Tempo de Execução:</strong> {result.executionTime.toFixed(2)}ms
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'hints' && (
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold theme-text mb-6">Dicas</h3>
                                    <div className="space-y-4">
                                        {exercise.hints.map((hint, index) => {
                                            const isUnlocked = unlockedHints.includes(hint.id);
                                            return (
                                                <div key={hint.id} className={`theme-surface rounded-lg p-4 ${isUnlocked ? 'border border-blue-500' : 'border theme-border'
                                                    }`}>
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-2">
                                                                <span className="text-lg font-semibold theme-text">Dica {index + 1}</span>
                                                                <span className="theme-primary text-sm">{hint.cost} pontos</span>
                                                            </div>
                                                            {isUnlocked ? (
                                                                <p className="theme-text-secondary">{hint.text}</p>
                                                            ) : (
                                                                <p className="theme-text-secondary">Dica bloqueada - Custa {hint.cost} pontos</p>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => unlockHint(hint.id, hint.cost)}
                                                            disabled={isUnlocked}
                                                            className={`px-4 py-2 rounded-lg transition-colors ${isUnlocked
                                                                ? 'bg-green-600 text-white cursor-not-allowed'
                                                                : 'theme-gradient-primary text-white hover:scale-105 shadow-lg'
                                                                }`}
                                                        >
                                                            {isUnlocked ? 'Desbloqueada' : 'Desbloquear'}
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Floating Actions */}
                <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                    <button className="theme-gradient-primary text-white w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                    </button>
                    <button className="bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 hover:scale-110 transition-all flex items-center justify-center">
                        <Brain className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </PageWrapperFunctional>
    );
};

export default ExercisePage;

