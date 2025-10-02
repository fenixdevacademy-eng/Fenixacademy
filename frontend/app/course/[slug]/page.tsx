'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import {
    Play,
    Pause,
    Volume2,
    Settings,
    Maximize2,
    RotateCcw,
    Hand,
    Zap,
    CheckCircle,
    Clock,
    BookOpen,
    FileText,
    Code,
    ChevronRight,
    ChevronDown,
    Star,
    Users,
    Award,
    Download,
    Share2,
    Heart,
    Bookmark,
    MessageCircle,
    Bell,
    Search,
    Filter,
    Grid,
    List,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowDown,
    Home,
    Menu,
    X,
    Plus,
    Minus,
    Eye,
    EyeOff,
    Lock,
    Unlock,
    RefreshCw,
    ExternalLink,
    Download as DownloadIcon,
    Upload,
    Save,
    Edit,
    Trash2,
    Copy,
    Share,
    Flag,
    HelpCircle,
    Info,
    AlertCircle,
    Check,
    X as XIcon,
    ChevronUp,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    ChevronDown as ChevronDownIcon,
    Sparkles,
    ArrowRight as ArrowRightIcon,
    Target,
    TrendingUp,
    Brain,
    Shield,
    Rocket,
    GraduationCap,
    Globe,
    Database,
    Smartphone,
    Crown,
    MessageSquare,
    FileText as FileTextIcon,
    BarChart3,
    Calendar,
    Timer,
    Award as AwardIcon,
    User,
    Mail,
    Phone,
    MapPin,
    Lock as LockIcon,
    Eye as EyeIcon,
    EyeOff as EyeOffIcon,
    Briefcase,
    Cloud,
    FileText as FileTextIcon2,
    AlertCircle as AlertCircleIcon,
    CheckCircle as CheckCircleIcon,
    X as XIcon2,
    ChevronUp as ChevronUpIcon,
    ChevronDown as ChevronDownIcon2,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon2,
    Play as PlayIcon,
    Pause as PauseIcon,
    Volume2 as Volume2Icon,
    Settings as SettingsIcon,
    Maximize2 as Maximize2Icon,
    RotateCcw as RotateCcwIcon,
    Hand as HandIcon,
    Zap as ZapIcon,
    CheckCircle as CheckCircleIcon2,
    Clock as ClockIcon,
    BookOpen as BookOpenIcon,
    FileText as FileTextIcon3,
    Code as CodeIcon,
    ChevronRight as ChevronRightIcon3,
    ChevronDown as ChevronDownIcon3,
    Star as StarIcon,
    Users as UsersIcon,
    Award as AwardIcon2,
    Download as DownloadIcon2,
    Share2 as Share2Icon,
    Heart as HeartIcon,
    Bookmark as BookmarkIcon,
    MessageCircle as MessageCircleIcon,
    Bell as BellIcon,
    Search as SearchIcon,
    Filter as FilterIcon,
    Grid as GridIcon,
    List as ListIcon,
    ArrowLeft as ArrowLeftIcon,
    ArrowRight as ArrowRightIcon2,
    ArrowUp as ArrowUpIcon,
    ArrowDown as ArrowDownIcon,
    Home as HomeIcon,
    Menu as MenuIcon,
    X as XIcon3,
    Plus as PlusIcon,
    Minus as MinusIcon,
    Eye as EyeIcon2,
    EyeOff as EyeOffIcon2,
    Lock as LockIcon2,
    Unlock as UnlockIcon,
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
    X as XIcon4,
    ChevronUp as ChevronUpIcon2,
    ChevronLeft as ChevronLeftIcon2,
    ChevronRight as ChevronRightIcon4,
    ChevronDown as ChevronDownIcon4,
    Gift
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { PageWrapperFunctional } from '@/app/components/PageWrapperFunctional';
import FenixLogo from '@/components/FenixLogo';

interface Lesson {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    current: boolean;
    type: 'video' | 'text' | 'exercise' | 'project';
    description?: string;
    content?: string;
    resources?: string[];
}

interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    completed: number;
    total: number;
    duration: string;
    expanded: boolean;
}

interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    rating: number;
    students: number;
    duration: string;
    modules: Module[];
    currentModule: string;
    currentLesson: string;
    progress: number;
}


export default function CourseContentPage() {
    const params = useParams();
    const { user, isAuthenticated } = useAuth();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'lesson' | 'exercises' | 'projects'>('lesson');
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [checkingAccess, setCheckingAccess] = useState(true);
    const [currentTime, setCurrentTime] = useState('00:29');
    const [volume, setVolume] = useState(80);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                setLoading(true);
                setCheckingAccess(true);

                // Verificar acesso ao curso
                if (user && isAuthenticated) {
                    // Para usuários premium, dar acesso automático a todos os cursos
                    if (user.role === 'premium_user' || user.role === 'admin') {
                        setHasAccess(true);
                    } else {
                        // Para outros usuários, verificar acesso específico
                        const accessResponse = await fetch(`/api/course-access?courseId=${params?.slug}&userId=${user.id}`);
                        const accessData = await accessResponse.json();

                        if (accessData.success) {
                            setHasAccess(accessData.hasAccess);
                        } else {
                            setHasAccess(false);
                        }
                    }
                } else {
                    setHasAccess(false);
                }

                const response = await fetch(`/api/courses/${params?.slug}/content`);

                if (!response.ok) {
                    throw new Error('Erro ao carregar curso');
                }

                const data = await response.json();

                if (data.success) {
                    const courseData = data.course;

                    // Encontrar o primeiro módulo e primeira aula
                    const firstModule = courseData.modules.find((m: any) => m.lessons.length > 0);
                    const firstLesson = firstModule?.lessons.find((l: any) => l.order === 1);

                    const course: Course = {
                        id: courseData.id,
                        title: courseData.title,
                        description: courseData.description,
                        instructor: courseData.instructor,
                        rating: courseData.rating,
                        students: courseData.students,
                        duration: courseData.duration,
                        progress: 15,
                        currentModule: firstModule?.id || 'default',
                        currentLesson: firstLesson?.id || 'default',
                        modules: courseData.modules.map((module: any) => ({
                            id: module.id,
                            title: module.title,
                            description: module.description,
                            completed: module.completed,
                            total: module.total,
                            duration: module.duration,
                            expanded: module.expanded,
                            lessons: module.lessons.map((lesson: any) => ({
                                id: lesson.id,
                                title: lesson.title,
                                duration: lesson.duration,
                                completed: lesson.completed,
                                current: lesson.current,
                                type: lesson.type,
                                description: lesson.description,
                                content: lesson.content
                            }))
                        }))
                    };

                    setCourse(course);
                } else {
                    throw new Error(data.error || 'Erro ao carregar curso');
                }
            } catch (error) {
                console.error('Erro ao carregar curso:', error);
                // Fallback para dados mock em caso de erro
                const mockCourse: Course = {
                    id: (params?.slug as string) || 'default',
                    title: 'Fundamentos de Desenvolvimento Web',
                    description: 'Aprenda HTML5 semântico, estrutura de documentos e técnicas de acessibilidade para criar páginas web inclusivas',
                    instructor: 'João Silva',
                    rating: 4.8,
                    students: 1247,
                    duration: '80 horas',
                    progress: 15,
                    currentModule: 'html5-semantico',
                    currentLesson: 'estrutura-documentos-html5',
                    modules: [
                        {
                            id: 'html5-semantico',
                            title: 'HTML5 Semântico e Acessibilidade',
                            description: 'Aprenda HTML5 semântico, estrutura de documentos e técnicas de acessibilidade para criar páginas web inclusivas',
                            completed: 1,
                            total: 20,
                            duration: '13h',
                            expanded: true,
                            lessons: [
                                {
                                    id: 'introducao-html5',
                                    title: 'Introdução ao HTML5 e Semântica',
                                    duration: '60 min',
                                    completed: true,
                                    current: false,
                                    type: 'text',
                                    description: 'Conceitos fundamentais do HTML5 e elementos semânticos'
                                },
                                {
                                    id: 'estrutura-documentos-html5',
                                    title: 'Estrutura de Documentos HTML5',
                                    duration: '90 min',
                                    completed: false,
                                    current: true,
                                    type: 'text',
                                    description: 'Aprenda a estrutura correta de documentos HTML5'
                                }
                            ]
                        }
                    ]
                };
                setCourse(mockCourse);
            } finally {
                setLoading(false);
                setCheckingAccess(false);
            }
        };

        if (params?.slug) {
            loadCourse();
        }
    }, [params?.slug]);

    if (loading || checkingAccess) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-xl theme-text-secondary">
                            {checkingAccess ? 'Verificando acesso...' : 'Carregando curso...'}
                        </p>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    // Verificar se o usuário tem acesso ao curso
    if (!hasAccess) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="max-w-2xl mx-auto px-4 text-center">
                        <div className="theme-surface rounded-xl theme-border shadow-lg p-8">
                            <div className="w-20 h-20 theme-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-10 h-10 text-white" />
                            </div>

                            <h1 className="text-3xl font-bold theme-text mb-4">
                                Acesso Restrito
                            </h1>

                            <p className="text-lg theme-text-secondary mb-6">
                                Este curso requer compra para ser acessado. Adquira agora e tenha acesso vitalício a todo o conteúdo!
                            </p>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                    <Gift className="w-6 h-6 text-green-600" />
                                    <span className="text-lg font-bold text-green-800">OFERTA ESPECIAL!</span>
                                </div>
                                <p className="text-green-700">
                                    97% de desconto para os primeiros 10.000 alunos!
                                </p>
                            </div>

                            <div className="space-y-4">
                                <Link
                                    href={`/course/${params?.slug}/purchase`}
                                    className="inline-block theme-gradient-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300"
                                >
                                    Comprar Agora com 97% de Desconto
                                </Link>

                                <div className="flex justify-center space-x-4">
                                    <Link
                                        href={ROUTES.COURSES}
                                        className="theme-text-secondary hover:theme-primary transition-colors"
                                    >
                                        Ver Outros Cursos
                                    </Link>
                                    <span className="theme-text-secondary">•</span>
                                    <Link
                                        href={ROUTES.HOME}
                                        className="theme-text-secondary hover:theme-primary transition-colors"
                                    >
                                        Voltar ao Início
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    if (!course) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold theme-text mb-4">Curso não encontrado</h1>
                        <Link href={ROUTES.COURSES} className="theme-primary hover:theme-primary/80 transition-colors">
                            Voltar para os cursos
                        </Link>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    const currentModule = course.modules.find(m => m.id === course.currentModule);
    const currentLesson = currentModule?.lessons.find(l => l.id === course.currentLesson);

    // Função para navegar para uma aula específica
    const navigateToLesson = (moduleId: string, lessonId: string) => {
        setCourse(prev => prev ? {
            ...prev,
            currentModule: moduleId,
            currentLesson: lessonId
        } : null);
    };

    // Função para navegar para a próxima aula
    const goToNextLesson = () => {
        if (!course) return;

        const allLessons = course.modules.flatMap(module =>
            module.lessons.map(lesson => ({ ...lesson, moduleId: module.id }))
        );

        const currentIndex = allLessons.findIndex(lesson =>
            lesson.moduleId === course.currentModule && lesson.id === course.currentLesson
        );

        if (currentIndex < allLessons.length - 1) {
            const nextLesson = allLessons[currentIndex + 1];
            navigateToLesson(nextLesson.moduleId, nextLesson.id);
        }
    };

    // Função para navegar para a aula anterior
    const goToPreviousLesson = () => {
        if (!course) return;

        const allLessons = course.modules.flatMap(module =>
            module.lessons.map(lesson => ({ ...lesson, moduleId: module.id }))
        );

        const currentIndex = allLessons.findIndex(lesson =>
            lesson.moduleId === course.currentModule && lesson.id === course.currentLesson
        );

        if (currentIndex > 0) {
            const prevLesson = allLessons[currentIndex - 1];
            navigateToLesson(prevLesson.moduleId, prevLesson.id);
        }
    };

    return (
        <PageWrapperFunctional>
            <div className="min-h-screen theme-bg">
                <div className="flex h-screen">
                    {/* Sidebar */}
                    <div className="w-80 theme-surface border-r theme-border flex flex-col">
                        {/* Course Title */}
                        <div className="p-6 border-b theme-border">
                            <h1 className="text-lg font-bold theme-text mb-2">{course.title}</h1>
                            <div className="flex items-center text-sm theme-text-secondary mb-2">
                                <span>{course.progress}/600 aulas</span>
                                <span className="mx-2">•</span>
                                <span>0/30 módulos</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="theme-gradient-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="p-4 border-b theme-border">
                            <h3 className="text-sm font-semibold theme-text mb-3">Ações Rápidas</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <Link
                                    href={ROUTES.IDE_ADVANCED}
                                    className="flex items-center gap-2 p-3 theme-surface-hover rounded-lg hover:shadow-md transition-all duration-300 group"
                                >
                                    <Code className="w-4 h-4 theme-primary group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium theme-text">IDE</span>
                                </Link>
                                <Link
                                    href={`/course/${params?.slug}/exercises`}
                                    className="flex items-center gap-2 p-3 theme-surface-hover rounded-lg hover:shadow-md transition-all duration-300 group"
                                >
                                    <Target className="w-4 h-4 theme-primary group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium theme-text">Exercícios</span>
                                </Link>
                                <Link
                                    href={`/course/${params?.slug}/projects`}
                                    className="flex items-center gap-2 p-3 theme-surface-hover rounded-lg hover:shadow-md transition-all duration-300 group"
                                >
                                    <FileText className="w-4 h-4 theme-primary group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium theme-text">Projetos</span>
                                </Link>
                                <Link
                                    href={`/course/${params?.slug}/quizzes`}
                                    className="flex items-center gap-2 p-3 theme-surface-hover rounded-lg hover:shadow-md transition-all duration-300 group"
                                >
                                    <Award className="w-4 h-4 theme-primary group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium theme-text">Quizzes</span>
                                </Link>
                            </div>
                        </div>

                        {/* Modules */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4">
                                <h3 className="text-sm font-semibold theme-text mb-3">Módulos do Curso</h3>
                            </div>
                            {course.modules.map((module) => (
                                <div key={module.id} className="border-b theme-border">
                                    <div
                                        className={`p-4 cursor-pointer hover:theme-surface/50 transition-colors ${module.expanded ? 'theme-surface/30' : ''}`}
                                        onClick={() => {
                                            setCourse(prev => prev ? {
                                                ...prev,
                                                modules: prev.modules.map(m =>
                                                    m.id === module.id ? { ...m, expanded: !m.expanded } : m
                                                )
                                            } : null);
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold theme-text">{module.title}</h3>
                                            {module.expanded ? <ChevronUp className="w-4 h-4 theme-text-secondary" /> : <ChevronDown className="w-4 h-4 theme-text-secondary" />}
                                        </div>
                                        <p className="text-sm theme-text-secondary mt-1">{module.description}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center text-sm theme-text-secondary">
                                                <span>{module.completed}/{module.total} concluídas</span>
                                                <span className="mx-2">•</span>
                                                <span>{module.lessons.length} aulas</span>
                                                <span className="mx-2">•</span>
                                                <span>{module.duration}</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                                            <div
                                                className="theme-gradient-primary h-1 rounded-full"
                                                style={{ width: `${(module.completed / module.total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Lessons */}
                                    {module.expanded && (
                                        <div className="theme-surface/30">
                                            {module.lessons.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    onClick={() => navigateToLesson(module.id, lesson.id)}
                                                    className={`p-4 border-l-4 cursor-pointer hover:theme-surface/50 transition-colors ${lesson.current ? 'border-blue-500 theme-surface/30' :
                                                        lesson.completed ? 'border-green-500' : 'theme-border'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            {lesson.completed ? (
                                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                            ) : lesson.current ? (
                                                                <div className="w-4 h-4 border-2 border-blue-500 rounded-full"></div>
                                                            ) : (
                                                                <div className="w-4 h-4 border-2 theme-border rounded-full"></div>
                                                            )}
                                                            <span className="text-sm font-medium theme-text">{lesson.title}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-xs theme-text-secondary">{lesson.duration}</span>
                                                            {lesson.type === 'video' && <Play className="w-3 h-3 theme-text-secondary" />}
                                                            {lesson.type === 'exercise' && <Code className="w-3 h-3 theme-text-secondary" />}
                                                            {lesson.type === 'project' && <FileText className="w-3 h-3 theme-text-secondary" />}
                                                        </div>
                                                    </div>
                                                    {lesson.description && (
                                                        <p className="text-xs theme-text-secondary mt-1 ml-6">{lesson.description}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                        {/* Breadcrumb */}
                        <div className="theme-surface border-b theme-border px-6 py-4">
                            <div className="flex items-center space-x-2 text-sm theme-text-secondary">
                                <Home className="w-4 h-4" />
                                <ChevronRight className="w-4 h-4" />
                                <Link href={ROUTES.COURSES} className="hover:theme-primary transition-colors">Cursos</Link>
                                <ChevronRight className="w-4 h-4" />
                                <span className="theme-text font-medium">{course.title}</span>
                                <ChevronRight className="w-4 h-4" />
                                <span className="theme-text-secondary">{currentModule?.title}</span>
                                <ChevronRight className="w-4 h-4" />
                                <span className="theme-text font-medium">{currentLesson?.title}</span>
                            </div>
                        </div>

                        {/* Content Display */}
                        <div className="theme-surface relative">
                            {currentLesson?.type === 'video' ? (
                                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                    {/* Video Controls */}
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => setIsPlaying(!isPlaying)}
                                                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                            >
                                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                            </button>
                                            <span className="text-sm">{currentTime}</span>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                                <RotateCcw className="w-4 h-4" />
                                            </button>
                                            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                                <Hand className="w-4 h-4" />
                                            </button>
                                            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                                <Volume2 className="w-4 h-4" />
                                            </button>
                                            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                                <Settings className="w-4 h-4" />
                                            </button>
                                            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                                <Maximize2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-12 h-12 theme-gradient-primary/10 rounded-lg flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 theme-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold theme-text">{currentLesson?.title}</h2>
                                            <p className="theme-text-secondary">{currentLesson?.description}</p>
                                        </div>
                                    </div>

                                    {currentLesson?.content ? (
                                        <div className="prose prose-lg max-w-none theme-text">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: currentLesson.content
                                                        .replace(/^#\s*(.*?)$/gm, '<h1 class="text-3xl font-bold theme-text mb-6 border-b theme-border pb-2">$1</h1>')
                                                        .replace(/^##\s*(.*?)$/gm, '<h2 class="text-2xl font-bold theme-text mt-8 mb-4">$1</h2>')
                                                        .replace(/^###\s*(.*?)$/gm, '<h3 class="text-xl font-bold theme-text mt-6 mb-3">$1</h3>')
                                                        .replace(/^####\s*(.*?)$/gm, '<h4 class="text-lg font-bold theme-text mt-4 mb-2">$1</h4>')
                                                        .replace(/^-\s*(.*?)$/gm, '<li class="theme-text mb-2 ml-4 list-disc">$1</li>')
                                                        .replace(/^\*\s*(.*?)$/gm, '<li class="theme-text mb-2 ml-4 list-disc">$1</li>')
                                                        .replace(/```([\s\S]*?)```/g, '<pre class="theme-surface border theme-border p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$1</code></pre>')
                                                        .replace(/`([^`]+)`/g, '<code class="theme-surface px-2 py-1 rounded text-sm font-mono">$1</code>')
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold theme-text">$1</strong>')
                                                        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                                                        .replace(/\n\n/g, '</p><p class="theme-text mb-4 leading-relaxed">')
                                                        .replace(/^(?!<[h|p|l|d|p])(.*?)$/gm, '<p class="theme-text mb-4 leading-relaxed">$1</p>')
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <BookOpen className="w-16 h-16 theme-text-secondary mx-auto mb-4" />
                                            <h3 className="text-lg font-medium theme-text mb-2">Conteúdo da Aula</h3>
                                            <p className="theme-text-secondary">O conteúdo desta aula será carregado em breve.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Tabs */}
                        <div className="theme-surface border-b theme-border">
                            <div className="flex">
                                <button
                                    onClick={() => setActiveTab('lesson')}
                                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'lesson'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent theme-text-secondary hover:theme-text'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Play className="w-4 h-4" />
                                        <span>Aula</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('exercises')}
                                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'exercises'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent theme-text-secondary hover:theme-text'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Code className="w-4 h-4" />
                                        <span>Exercícios</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('projects')}
                                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'projects'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent theme-text-secondary hover:theme-text'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <FileText className="w-4 h-4" />
                                        <span>Projetos</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {activeTab === 'lesson' && (
                                <div className="max-w-4xl">
                                    <div className="flex items-center space-x-2 mb-6">
                                        <Zap className="w-5 h-5 text-red-500" />
                                        <h1 className="text-2xl font-bold theme-text">
                                            Aula 01: Introdução ao Desenvolvimento Web Moderno
                                        </h1>
                                    </div>

                                    {/* Introduction */}
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                                        <div className="flex items-start space-x-3">
                                            <Zap className="w-5 h-5 text-yellow-600 mt-1" />
                                            <div>
                                                <h3 className="font-semibold text-yellow-800 mb-2">INTRODUÇÃO AO TÓPICO</h3>
                                                <div className="flex items-start space-x-2 mb-3">
                                                    <Play className="w-4 h-4 text-yellow-600 mt-1" />
                                                    <div>
                                                        <h4 className="font-medium text-yellow-800">Hook Visual e Contexto</h4>
                                                        <p className="text-yellow-700 text-sm mt-1">
                                                            Imagine que você está desenvolvendo uma solução para uma startup brasileira que precisa escalar rapidamente. Como você aplicaria os conceitos desta aula para resolver esse desafio?
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Agenda */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                                        <div className="flex items-start space-x-3">
                                            <FileText className="w-5 h-5 text-blue-600 mt-1" />
                                            <div>
                                                <h3 className="font-semibold text-blue-800 mb-3">Agenda da Aula</h3>
                                                <ul className="space-y-2 text-blue-700">
                                                    <li className="flex items-start space-x-2">
                                                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                                                        <span>Conceito Fundamental → Exemplo prático → Exercício rápido</span>
                                                    </li>
                                                    <li className="flex items-start space-x-2">
                                                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                                                        <span>Aplicação Avançada → Caso brasileiro → Implementação</span>
                                                    </li>
                                                    <li className="flex items-start space-x-2">
                                                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                                                        <span>Projeto Final → Desenvolvimento completo → Deploy</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Development of Concepts */}
                                    <div className="theme-surface border theme-border rounded-lg p-6">
                                        <div className="flex items-start space-x-3">
                                            <Code className="w-5 h-5 theme-text-secondary mt-1" />
                                            <div>
                                                <h3 className="font-semibold theme-text mb-3">DESENVOLVIMENTO DOS CONCEITOS</h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-start space-x-3">
                                                        <div className="w-6 h-6 theme-gradient-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                                                        <div>
                                                            <h4 className="font-medium theme-text">Conceito 1: Fundamentos Essenciais do Desenvolvimento Web</h4>
                                                            <div className="flex items-start space-x-2 mt-2">
                                                                <Zap className="w-4 h-4 text-yellow-600 mt-1" />
                                                                <span className="theme-text">História e Evolução da Web</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'exercises' && (
                                <div className="max-w-4xl">
                                    <h1 className="text-2xl font-bold theme-text mb-6">Exercícios</h1>
                                    <p className="theme-text-secondary">Conteúdo dos exercícios será exibido aqui.</p>
                                </div>
                            )}

                            {activeTab === 'projects' && (
                                <div className="max-w-4xl">
                                    <h1 className="text-2xl font-bold theme-text mb-6">Projetos</h1>
                                    <p className="theme-text-secondary">Conteúdo dos projetos será exibido aqui.</p>
                                </div>
                            )}
                        </div>

                        {/* Lesson Navigation */}
                        <div className="theme-surface border-t theme-border p-6">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={goToPreviousLesson}
                                    className="flex items-center space-x-2 px-4 py-2 theme-surface-hover rounded-lg hover:shadow-md transition-all duration-300 group"
                                >
                                    <ChevronLeft className="w-4 h-4 theme-text-secondary group-hover:theme-primary transition-colors" />
                                    <span className="theme-text-secondary group-hover:theme-text transition-colors">Aula Anterior</span>
                                </button>

                                <div className="flex items-center space-x-4">
                                    <div className="text-sm theme-text-secondary">
                                        Aula {course.modules.flatMap(m => m.lessons).findIndex(l =>
                                            l.id === course.currentLesson
                                        ) + 1} de {course.modules.flatMap(m => m.lessons).length}
                                    </div>
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="theme-gradient-primary h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${((course.modules.flatMap(m => m.lessons).findIndex(l =>
                                                    l.id === course.currentLesson
                                                ) + 1) / course.modules.flatMap(m => m.lessons).length) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <button
                                    onClick={goToNextLesson}
                                    className="flex items-center space-x-2 px-4 py-2 theme-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-300 group"
                                >
                                    <span>Próxima Aula</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapperFunctional>
    );
}