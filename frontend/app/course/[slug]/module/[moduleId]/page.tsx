'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import FenixHeader from '@/components/FenixHeader';
import FenixFooter from '@/components/FenixFooter';
import {
    BookOpen,
    Clock,
    CheckCircle,
    Lock,
    Play,
    Code,
    Target,
    HelpCircle,
    FileText,
    ChevronLeft,
    ChevronRight,
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
    Settings,
    MessageCircle,
    Brain,
    BarChart3,
    User,
    Bell,
    Calendar,
    Download,
    Upload,
    Share2,
    Bookmark,
    Eye,
    EyeOff,
    ChevronDown,
    ChevronUp,
    RefreshCw,
    ExternalLink,
    Copy,
    Edit,
    Trash2,
    Save,
    Share,
    MoreHorizontal,
    MoreVertical,
    Maximize,
    Minimize,
    Volume2,
    VolumeX,
    SkipBack,
    SkipForward,
    RotateCcw,
    RotateCw,
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
    ThumbsUp,
    ThumbsDown,
    Settings as SettingsIcon,
    LogOut,
    Lightbulb,
    Terminal,
    GitBranch,
    GitCommit,
    GitPullRequest,
    GitMerge,
    GitCompare,
    Sparkles,
    ArrowRight as ArrowRightIcon,
    Target as TargetIcon,
    TrendingUp,
    Brain as BrainIcon,
    Shield as ShieldIcon,
    Rocket,
    GraduationCap,
    Globe as GlobeIcon,
    Database as DatabaseIcon,
    Smartphone,
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
    X,
    ChevronUp as ChevronUpIcon,
    ChevronDown as ChevronDownIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon2,
    Play as PlayIcon,
    Pause,
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
    X as XIcon,
    Plus,
    Minus,
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
    X as XIcon2,
    ChevronUp as ChevronUpIcon2,
    ChevronLeft as ChevronLeftIcon2,
    ChevronRight as ChevronRightIcon5,
    ChevronDown as ChevronDownIcon3
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { PageWrapperFunctional } from '@/components/PageWrapperFunctional';

interface Module {
    id: string;
    title: string;
    description: string;
    duration: string;
    lessons: Lesson[];
    resources: Resource[];
    objectives: string[];
    prerequisites: string[];
    isCompleted: boolean;
    progress: number;
    order: number;
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;
    type: 'video' | 'text' | 'quiz' | 'project' | 'exercise';
    isCompleted: boolean;
    isLocked: boolean;
    order: number;
    points: number;
}

interface Resource {
    id: string;
    title: string;
    type: 'pdf' | 'zip' | 'link' | 'video' | 'image';
    url: string;
    description: string;
    size?: string;
}

interface Course {
    id: string;
    title: string;
    slug: string;
    instructor: string;
    modules: Module[];
}

const ModulePage: React.FC = () => {
    const params = useParams();
    const slug = params?.slug as string;
    const moduleId = params?.moduleId as string;

    const [module, setModule] = useState<Module | null>(null);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'resources' | 'progress'>('overview');

    // Mock data para o módulo
    const mockModule: Module = {
        id: '1',
        title: 'Fundamentos do React',
        description: 'Aprenda os conceitos básicos e fundamentais do React, incluindo componentes, JSX, props e estado. Este módulo estabelece a base sólida para todo o desenvolvimento React.',
        duration: '5 horas',
        lessons: [
            {
                id: '1-1',
                title: 'Introdução ao React',
                description: 'O que é React e por que usá-lo',
                duration: '45 min',
                type: 'video',
                isCompleted: false,
                isLocked: false,
                order: 1,
                points: 10
            },
            {
                id: '1-2',
                title: 'Configurando o Ambiente',
                description: 'Como configurar o ambiente de desenvolvimento',
                duration: '30 min',
                type: 'video',
                isCompleted: false,
                isLocked: false,
                order: 2,
                points: 10
            },
            {
                id: '1-3',
                title: 'Primeiro Componente',
                description: 'Criando seu primeiro componente React',
                duration: '60 min',
                type: 'video',
                isCompleted: false,
                isLocked: false,
                order: 3,
                points: 15
            },
            {
                id: '1-4',
                title: 'Quiz: Fundamentos',
                description: 'Teste seus conhecimentos sobre os conceitos básicos',
                duration: '15 min',
                type: 'quiz',
                isCompleted: false,
                isLocked: true,
                order: 4,
                points: 20
            },
            {
                id: '1-5',
                title: 'Exercício: Componente Simples',
                description: 'Pratique criando um componente React básico',
                duration: '30 min',
                type: 'exercise',
                isCompleted: false,
                isLocked: true,
                order: 5,
                points: 25
            }
        ],
        resources: [
            {
                id: '1',
                title: 'Slides do Módulo',
                type: 'pdf',
                url: '/resources/module-1-slides.pdf',
                description: 'Apresentação completa do módulo',
                size: '3.2 MB'
            },
            {
                id: '2',
                title: 'Código Fonte',
                type: 'zip',
                url: '/resources/module-1-code.zip',
                description: 'Todos os exemplos de código do módulo',
                size: '1.8 MB'
            },
            {
                id: '3',
                title: 'Documentação React',
                type: 'link',
                url: 'https://reactjs.org/docs',
                description: 'Documentação oficial do React'
            },
            {
                id: '4',
                title: 'Tutorial Interativo',
                type: 'link',
                url: 'https://reactjs.org/tutorial',
                description: 'Tutorial interativo oficial do React'
            }
        ],
        objectives: [
            'Entender o que é React e suas vantagens',
            'Configurar o ambiente de desenvolvimento',
            'Criar componentes React funcionais',
            'Entender JSX e sua sintaxe',
            'Trabalhar com props e estado básico',
            'Implementar interações simples'
        ],
        prerequisites: [
            'Conhecimento básico de JavaScript',
            'Familiaridade com HTML e CSS',
            'Node.js instalado no computador',
            'Editor de código (VS Code recomendado)'
        ],
        isCompleted: false,
        progress: 0,
        order: 1
    };

    const mockCourse: Course = {
        id: 'react-advanced',
        title: 'React Avançado - Do Zero ao Profissional',
        slug: 'react-advanced',
        instructor: 'Prof. João Silva',
        modules: [
            mockModule,
            {
                id: '2',
                title: 'Hooks Avançados',
                description: 'Domine todos os hooks do React',
                duration: '8 horas',
                lessons: [],
                resources: [],
                objectives: [],
                prerequisites: [],
                isCompleted: false,
                progress: 0,
                order: 2
            }
        ]
    };

    useEffect(() => {
        setTimeout(() => {
            setModule(mockModule);
            setCourse(mockCourse);
            setLoading(false);
        }, 1000);
    }, [slug, moduleId]);

    const getLessonIcon = (type: string) => {
        switch (type) {
            case 'video': return <Play className="w-4 h-4" />;
            case 'text': return <FileText className="w-4 h-4" />;
            case 'quiz': return <HelpCircle className="w-4 h-4" />;
            case 'project': return <Target className="w-4 h-4" />;
            case 'exercise': return <Code className="w-4 h-4" />;
            default: return <BookOpen className="w-4 h-4" />;
        }
    };

    const getResourceIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="w-5 h-5" />;
            case 'zip': return <Archive className="w-5 h-5" />;
            case 'link': return <ExternalLink className="w-5 h-5" />;
            case 'video': return <Video className="w-5 h-5" />;
            case 'image': return <ImageIcon className="w-5 h-5" />;
            default: return <File className="w-5 h-5" />;
        }
    };

    if (loading) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-xl theme-text-secondary">Carregando módulo...</p>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    if (!module || !course) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold theme-text mb-4">Módulo não encontrado</h2>
                        <p className="theme-text-secondary mb-6">O módulo solicitado não foi encontrado.</p>
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
                <FenixHeader currentPage="/courses" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Module Header */}
                    <div className="theme-gradient-primary rounded-2xl p-8 mb-8">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">Módulo {module.order}</span>
                                    <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">{module.duration}</span>
                                    <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">{module.lessons.length} aulas</span>
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-4">{module.title}</h2>
                                <p className="text-xl text-gray-300 mb-6 max-w-3xl">{module.description}</p>

                                <div className="flex items-center space-x-6 mb-6">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-5 h-5 text-yellow-400" />
                                        <span className="text-white">{module.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <BookOpen className="w-5 h-5 text-blue-400" />
                                        <span className="text-white">{module.lessons.length} aulas</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Trophy className="w-5 h-5 text-green-400" />
                                        <span className="text-white">{module.lessons.reduce((sum, lesson) => sum + lesson.points, 0)} pontos</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <button className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center hover:scale-105 shadow-lg">
                                        <Play className="w-5 h-5 mr-2" />
                                        Iniciar Módulo
                                    </button>
                                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-colors flex items-center hover:scale-105">
                                        <Bookmark className="w-5 h-5 mr-2" />
                                        Favoritar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="theme-surface rounded-xl p-1 mb-8 border theme-border">
                        <div className="flex space-x-1">
                            {[
                                { id: 'overview', label: 'Visão Geral', icon: Eye },
                                { id: 'lessons', label: 'Aulas', icon: BookOpen },
                                { id: 'resources', label: 'Recursos', icon: FileText },
                                { id: 'progress', label: 'Progresso', icon: BarChart3 }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${activeTab === tab.id
                                        ? 'theme-gradient-primary text-white'
                                        : 'theme-text-secondary hover:theme-text hover:theme-surface/50'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="theme-surface rounded-xl p-6 border theme-border">
                                    <h3 className="text-xl font-bold theme-text mb-4">Objetivos de Aprendizado</h3>
                                    <ul className="space-y-2">
                                        {module.objectives.map((objective, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                <Target className="w-5 h-5 theme-primary mt-1 flex-shrink-0" />
                                                <span className="theme-text-secondary">{objective}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="theme-surface rounded-xl p-6 border theme-border">
                                    <h3 className="text-xl font-bold theme-text mb-4">Pré-requisitos</h3>
                                    <ul className="space-y-2">
                                        {module.prerequisites.map((prerequisite, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                                <span className="theme-text-secondary">{prerequisite}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="theme-surface rounded-xl p-6 border theme-border">
                                    <h3 className="text-xl font-bold theme-text mb-4">Estatísticas do Módulo</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold theme-primary">{module.lessons.length}</div>
                                            <div className="theme-text-secondary">Aulas</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-400">{module.duration}</div>
                                            <div className="theme-text-secondary">Duração</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-yellow-400">{module.lessons.reduce((sum, lesson) => sum + lesson.points, 0)}</div>
                                            <div className="theme-text-secondary">Pontos</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-400">{module.resources.length}</div>
                                            <div className="theme-text-secondary">Recursos</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="theme-surface rounded-xl p-6 border theme-border">
                                    <h3 className="text-xl font-bold theme-text mb-4">Progresso</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="theme-text-secondary">Concluído</span>
                                            <span className="theme-text font-semibold">{module.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="theme-gradient-primary h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${module.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-sm theme-text-secondary">
                                            {module.lessons.filter(lesson => lesson.isCompleted).length} de {module.lessons.length} aulas concluídas
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lessons' && (
                        <div className="theme-surface rounded-xl p-6 border theme-border">
                            <h3 className="text-xl font-bold theme-text mb-6">Aulas do Módulo</h3>
                            <div className="space-y-4">
                                {module.lessons.map((lesson, index) => (
                                    <Link
                                        key={lesson.id}
                                        href={`/course/${slug}/lesson/${lesson.id}`}
                                        className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${lesson.isCompleted
                                            ? 'bg-green-900/20 border border-green-500'
                                            : lesson.isLocked
                                                ? 'theme-surface/50 opacity-50 cursor-not-allowed'
                                                : 'theme-surface hover:theme-surface/80'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lesson.isCompleted
                                            ? 'bg-green-600'
                                            : lesson.isLocked
                                                ? 'bg-gray-600'
                                                : 'theme-gradient-primary'
                                            }`}>
                                            {lesson.isCompleted ? (
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            ) : lesson.isLocked ? (
                                                <Lock className="w-5 h-5 text-white" />
                                            ) : (
                                                getLessonIcon(lesson.type)
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-1">
                                                <h4 className="theme-text font-medium">{lesson.title}</h4>
                                                <span className="theme-primary text-sm">{lesson.points} pontos</span>
                                            </div>
                                            <p className="theme-text-secondary text-sm">{lesson.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="theme-text-secondary text-sm">{lesson.duration}</div>
                                            <div className="text-xs theme-text-secondary capitalize">{lesson.type}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="theme-surface rounded-xl p-6 border theme-border">
                            <h3 className="text-xl font-bold theme-text mb-6">Recursos e Materiais</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {module.resources.map((resource) => (
                                    <div key={resource.id} className="theme-surface rounded-lg p-4 hover:theme-surface/80 transition-colors border theme-border">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 theme-gradient-primary rounded-lg flex items-center justify-center">
                                                {getResourceIcon(resource.type)}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium theme-text">{resource.title}</h4>
                                                <p className="text-sm theme-text-secondary mb-2">{resource.description}</p>
                                                <div className="flex items-center space-x-4 text-xs theme-text-secondary">
                                                    <span className="uppercase">{resource.type}</span>
                                                    {resource.size && <span>{resource.size}</span>}
                                                </div>
                                            </div>
                                            <button className="theme-primary hover:theme-primary/80">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'progress' && (
                        <div className="space-y-6">
                            <div className="theme-surface rounded-xl p-6 border theme-border">
                                <h3 className="text-xl font-bold theme-text mb-6">Progresso Detalhado</h3>
                                <div className="space-y-4">
                                    {module.lessons.map((lesson, index) => (
                                        <div key={lesson.id} className="flex items-center space-x-4 p-4 theme-surface rounded-lg border theme-border">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.isCompleted ? 'bg-green-600' : 'bg-gray-600'
                                                }`}>
                                                {lesson.isCompleted ? (
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                ) : (
                                                    <span className="text-white text-sm font-semibold">{index + 1}</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="theme-text font-medium">{lesson.title}</h4>
                                                <p className="theme-text-secondary text-sm">{lesson.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="theme-primary font-semibold">{lesson.points} pts</div>
                                                <div className="theme-text-secondary text-sm">{lesson.duration}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="theme-surface rounded-xl p-6 border theme-border">
                                <h3 className="text-xl font-bold theme-text mb-6">Conquistas</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 theme-surface rounded-lg border theme-border">
                                        <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                                        <div className="theme-text font-semibold">Primeira Aula</div>
                                        <div className="theme-text-secondary text-sm">Assista sua primeira aula</div>
                                    </div>
                                    <div className="text-center p-4 theme-surface rounded-lg border theme-border">
                                        <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                        <div className="theme-text font-semibold">50% Concluído</div>
                                        <div className="theme-text-secondary text-sm">Complete metade do módulo</div>
                                    </div>
                                    <div className="text-center p-4 theme-surface rounded-lg border theme-border">
                                        <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                        <div className="theme-text font-semibold">Módulo Completo</div>
                                        <div className="theme-text-secondary text-sm">Finalize todo o módulo</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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

                <FenixFooter />
            </div>
        </PageWrapperFunctional>
    );
};


export default ModulePage;

