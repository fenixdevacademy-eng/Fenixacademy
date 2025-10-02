'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    Target,
    Clock,
    CheckCircle,
    XCircle,
    Upload,
    Download,
    Eye,
    EyeOff,
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
    Code,
    FileText,
    BookOpen,
    HelpCircle,
    Settings,
    MessageCircle,
    Brain,
    BarChart3,
    User,
    Bell,
    Calendar,
    GitBranch,
    GitCommit,
    GitPullRequest,
    GitMerge,
    GitCompare,
    Terminal,
    Lightbulb,
    Play,
    Pause,
    RotateCcw,
    RotateCw,
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
    ThumbsUp,
    ThumbsDown,
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
    Share,
    MoreHorizontal,
    MoreVertical,
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
    Share2,
    Heart as HeartIcon,
    Bookmark,
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

interface Project {
    id: string;
    title: string;
    description: string;
    objectives: string[];
    requirements: string[];
    deliverables: string[];
    technologies: string[];
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    timeLimit?: number; // em dias
    isCompleted: boolean;
    submissions: Submission[];
    maxSubmissions: number;
    dueDate?: string;
    resources: Resource[];
    criteria: Criteria[];
}

interface Submission {
    id: string;
    title: string;
    description: string;
    files: File[];
    submittedAt: string;
    status: 'pending' | 'reviewed' | 'approved' | 'rejected';
    score?: number;
    feedback?: string;
    reviewer?: string;
}

interface File {
    id: string;
    name: string;
    type: string;
    size: string;
    url: string;
}

interface Resource {
    id: string;
    title: string;
    type: 'pdf' | 'zip' | 'link' | 'video' | 'image';
    url: string;
    description: string;
}

interface Criteria {
    id: string;
    title: string;
    description: string;
    weight: number; // porcentagem
    isMet: boolean;
}

const ProjectPage: React.FC = () => {
    const params = useParams();
    const slug = params?.slug as string;
    const projectId = params?.projectId as string;

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'submission' | 'resources'>('overview');
    const [submissionTitle, setSubmissionTitle] = useState('');
    const [submissionDescription, setSubmissionDescription] = useState('');
    const [submissionFiles, setSubmissionFiles] = useState<File[]>([]);

    // Mock data para o projeto
    const mockProject: Project = {
        id: 'project-1',
        title: 'Aplicação de Lista de Tarefas com React',
        description: 'Crie uma aplicação completa de lista de tarefas usando React, com funcionalidades de adicionar, editar, excluir e marcar tarefas como concluídas.',
        objectives: [
            'Implementar um componente principal de lista de tarefas',
            'Criar formulário para adicionar novas tarefas',
            'Implementar funcionalidade de edição inline',
            'Adicionar sistema de filtros (todas, ativas, concluídas)',
            'Implementar persistência local com localStorage',
            'Adicionar validação de formulários',
            'Criar interface responsiva e acessível'
        ],
        requirements: [
            'Usar React com hooks (useState, useEffect)',
            'Implementar pelo menos 3 componentes reutilizáveis',
            'Usar CSS ou styled-components para estilização',
            'Implementar validação de formulários',
            'Código deve estar bem documentado',
            'Aplicação deve ser responsiva',
            'Implementar testes unitários (opcional)'
        ],
        deliverables: [
            'Código fonte completo no GitHub',
            'Aplicação funcionando em produção (Vercel/Netlify)',
            'README.md com instruções de instalação e uso',
            'Demonstração em vídeo (2-3 minutos)',
            'Documentação da arquitetura da aplicação'
        ],
        technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Git', 'GitHub'],
        difficulty: 'medium',
        points: 100,
        timeLimit: 7, // 7 dias
        isCompleted: false,
        submissions: [],
        maxSubmissions: 3,
        dueDate: '2025-02-15',
        resources: [
            {
                id: '1',
                title: 'Template do Projeto',
                type: 'zip',
                url: '/resources/project-template.zip',
                description: 'Template inicial com estrutura de pastas e dependências'
            },
            {
                id: '2',
                title: 'Documentação React',
                type: 'link',
                url: 'https://reactjs.org/docs',
                description: 'Documentação oficial do React'
            },
            {
                id: '3',
                title: 'Tutorial de Hooks',
                type: 'video',
                url: 'https://example.com/hooks-tutorial',
                description: 'Vídeo explicativo sobre React Hooks'
            }
        ],
        criteria: [
            {
                id: '1',
                title: 'Funcionalidade Básica',
                description: 'Aplicação permite adicionar, editar e excluir tarefas',
                weight: 30,
                isMet: false
            },
            {
                id: '2',
                title: 'Interface de Usuário',
                description: 'Interface limpa, responsiva e intuitiva',
                weight: 25,
                isMet: false
            },
            {
                id: '3',
                title: 'Código Limpo',
                description: 'Código bem estruturado, documentado e reutilizável',
                weight: 20,
                isMet: false
            },
            {
                id: '4',
                title: 'Funcionalidades Avançadas',
                description: 'Implementa filtros, persistência e validações',
                weight: 15,
                isMet: false
            },
            {
                id: '5',
                title: 'Documentação',
                description: 'README completo e documentação da arquitetura',
                weight: 10,
                isMet: false
            }
        ]
    };

    useEffect(() => {
        setTimeout(() => {
            setProject(mockProject);
            setLoading(false);
        }, 1000);
    }, [slug, projectId]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles: File[] = Array.from(files).map((file, index) => ({
                id: `file-${Date.now()}-${index}`,
                name: file.name,
                type: file.type,
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                url: URL.createObjectURL(file)
            }));
            setSubmissionFiles([...submissionFiles, ...newFiles]);
        }
    };

    const handleSubmit = () => {
        if (!submissionTitle || !submissionDescription) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        const newSubmission: Submission = {
            id: `submission-${Date.now()}`,
            title: submissionTitle,
            description: submissionDescription,
            files: submissionFiles,
            submittedAt: new Date().toISOString(),
            status: 'pending'
        };

        // Aqui você enviaria para a API
        console.log('Nova submissão:', newSubmission);
        alert('Projeto enviado com sucesso!');
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
                        <p className="text-xl theme-text-secondary">Carregando projeto...</p>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    if (!project) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold theme-text mb-4">Projeto não encontrado</h2>
                        <p className="theme-text-secondary mb-6">O projeto solicitado não foi encontrado.</p>
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
                                    <h1 className="text-lg font-semibold theme-text">{project.title}</h1>
                                    <p className="text-sm theme-text-secondary">Projeto Prático</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(project.difficulty)} text-white`}>
                                    {getDifficultyText(project.difficulty)}
                                </span>
                                <span className="theme-primary font-semibold">{project.points} pontos</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Project Header */}
                    <div className="theme-gradient-primary rounded-2xl p-8 mb-8">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
                                <p className="text-xl text-gray-300 mb-6">{project.description}</p>

                                <div className="flex items-center space-x-6 mb-6">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-5 h-5 text-yellow-400" />
                                        <span className="text-white">{project.timeLimit} dias</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Target className="w-5 h-5 text-green-400" />
                                        <span className="text-white">{project.points} pontos</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Upload className="w-5 h-5 text-blue-400" />
                                        <span className="text-white">{project.submissions.length}/{project.maxSubmissions} submissões</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:scale-105 shadow-lg">
                                        Iniciar Projeto
                                    </button>
                                    <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors hover:scale-105">
                                        <Download className="w-5 h-5 mr-2" />
                                        Baixar Template
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
                                { id: 'requirements', label: 'Requisitos', icon: CheckCircle },
                                { id: 'submission', label: 'Submissão', icon: Upload },
                                { id: 'resources', label: 'Recursos', icon: FileText }
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
                                    <h3 className="text-xl font-bold theme-text mb-4">Objetivos</h3>
                                    <ul className="space-y-2">
                                        {project.objectives.map((objective, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                <Target className="w-5 h-5 theme-primary mt-1 flex-shrink-0" />
                                                <span className="theme-text-secondary">{objective}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="theme-surface rounded-xl p-6 border theme-border">
                                    <h3 className="text-xl font-bold theme-text mb-4">Tecnologias</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span key={index} className="px-3 py-1 theme-gradient-primary text-white text-sm rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="theme-surface rounded-xl p-6 border theme-border">
                                    <h3 className="text-xl font-bold theme-text mb-4">Entregáveis</h3>
                                    <ul className="space-y-2">
                                        {project.deliverables.map((deliverable, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                                <span className="theme-text-secondary">{deliverable}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="theme-surface rounded-xl p-6 border theme-border">
                                    <h3 className="text-xl font-bold theme-text mb-4">Critérios de Avaliação</h3>
                                    <div className="space-y-3">
                                        {project.criteria.map((criterion) => (
                                            <div key={criterion.id} className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h4 className="theme-text font-medium">{criterion.title}</h4>
                                                    <p className="theme-text-secondary text-sm">{criterion.description}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="theme-primary font-semibold">{criterion.weight}%</div>
                                                    <div className={`w-3 h-3 rounded-full ${criterion.isMet ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'requirements' && (
                        <div className="theme-surface rounded-xl p-6 border theme-border">
                            <h3 className="text-xl font-bold theme-text mb-6">Requisitos Técnicos</h3>
                            <div className="space-y-4">
                                {project.requirements.map((requirement, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-4 theme-surface rounded-lg border theme-border">
                                        <CheckCircle className="w-5 h-5 theme-primary mt-1 flex-shrink-0" />
                                        <span className="theme-text-secondary">{requirement}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'submission' && (
                        <div className="space-y-6">
                            <div className="theme-surface rounded-xl p-6 border theme-border">
                                <h3 className="text-xl font-bold theme-text mb-6">Submeter Projeto</h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium theme-text-secondary mb-2">
                                            Título do Projeto
                                        </label>
                                        <input
                                            type="text"
                                            value={submissionTitle}
                                            onChange={(e) => setSubmissionTitle(e.target.value)}
                                            className="w-full px-4 py-3 theme-surface text-white rounded-lg border theme-border focus:outline-none focus:border-blue-500"
                                            placeholder="Digite o título do seu projeto"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium theme-text-secondary mb-2">
                                            Descrição
                                        </label>
                                        <textarea
                                            value={submissionDescription}
                                            onChange={(e) => setSubmissionDescription(e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 theme-surface text-white rounded-lg border theme-border focus:outline-none focus:border-blue-500"
                                            placeholder="Descreva seu projeto, tecnologias utilizadas e funcionalidades implementadas"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium theme-text-secondary mb-2">
                                            Arquivos do Projeto
                                        </label>
                                        <div className="border-2 border-dashed theme-border rounded-lg p-6 text-center">
                                            <Upload className="w-12 h-12 theme-text-secondary mx-auto mb-4" />
                                            <p className="theme-text-secondary mb-4">Arraste e solte os arquivos aqui ou clique para selecionar</p>
                                            <input
                                                type="file"
                                                multiple
                                                onChange={handleFileUpload}
                                                className="hidden"
                                                id="file-upload"
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className="px-4 py-2 theme-gradient-primary text-white rounded-lg hover:scale-105 transition-all cursor-pointer shadow-lg"
                                            >
                                                Selecionar Arquivos
                                            </label>
                                        </div>

                                        {submissionFiles.length > 0 && (
                                            <div className="mt-4 space-y-2">
                                                {submissionFiles.map((file) => (
                                                    <div key={file.id} className="flex items-center justify-between p-3 theme-surface rounded-lg border theme-border">
                                                        <div className="flex items-center space-x-3">
                                                            <File className="w-5 h-5 theme-primary" />
                                                            <span className="theme-text">{file.name}</span>
                                                            <span className="theme-text-secondary text-sm">{file.size}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => setSubmissionFiles(submissionFiles.filter(f => f.id !== file.id))}
                                                            className="text-red-400 hover:text-red-300"
                                                        >
                                                            <XCircle className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors hover:scale-105 shadow-lg"
                                    >
                                        Submeter Projeto
                                    </button>
                                </div>
                            </div>

                            {/* Previous Submissions */}
                            {project.submissions.length > 0 && (
                                <div className="theme-surface rounded-xl p-6 border theme-border">
                                    <h3 className="text-xl font-bold theme-text mb-6">Submissões Anteriores</h3>
                                    <div className="space-y-4">
                                        {project.submissions.map((submission) => (
                                            <div key={submission.id} className="p-4 theme-surface rounded-lg border theme-border">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="theme-text font-medium">{submission.title}</h4>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${submission.status === 'approved' ? 'bg-green-600 text-white' :
                                                        submission.status === 'rejected' ? 'bg-red-600 text-white' :
                                                            'bg-yellow-600 text-white'
                                                        }`}>
                                                        {submission.status === 'approved' ? 'Aprovado' :
                                                            submission.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                                                    </span>
                                                </div>
                                                <p className="theme-text-secondary text-sm mb-2">{submission.description}</p>
                                                <div className="theme-text-secondary text-xs">
                                                    Enviado em: {new Date(submission.submittedAt).toLocaleDateString('pt-BR')}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="theme-surface rounded-xl p-6 border theme-border">
                            <h3 className="text-xl font-bold theme-text mb-6">Recursos e Materiais</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.resources.map((resource) => (
                                    <div key={resource.id} className="theme-surface rounded-lg p-4 hover:theme-surface/80 transition-colors border theme-border">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 theme-gradient-primary rounded-lg flex items-center justify-center">
                                                <Download className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium theme-text">{resource.title}</h4>
                                                <p className="text-sm theme-text-secondary mb-2">{resource.description}</p>
                                                <div className="flex items-center space-x-4 text-xs theme-text-secondary">
                                                    <span className="uppercase">{resource.type}</span>
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
export default ProjectPage;

