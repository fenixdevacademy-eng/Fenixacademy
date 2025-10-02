'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { expandedCourseService, ExpandedCourse, ExpandedLesson } from '@/lib/expanded-course-service';
import { useFenixActions } from '@/lib/fenix-button-actions';
import NotificationSystem from '@/components/NotificationSystem';
import {
    StartCourseButton,
    CompleteLessonButton,
    ActionButton
} from '@/components/RedirectButton';
import {
    Play,
    Clock,
    BookOpen,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Lock,
    FileText,
    Video,
    Code,
    Target,
    HelpCircle,
    Brain,
    Zap,
    Award,
    Share2,
    Heart,
    Sparkles,
    ArrowRight as ArrowRightIcon,
    Target as TargetIcon,
    TrendingUp,
    Brain as BrainIcon,
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
    Eye,
    EyeOff,
    Briefcase,
    Cloud,
    FileText as FileTextIcon2,
    AlertCircle,
    CheckCircle as CheckCircleIcon,
    X,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight as ChevronRightIcon2,
    Play as PlayIcon,
    Pause,
    Volume2,
    Settings,
    Maximize2,
    RotateCcw,
    Hand,
    Zap as ZapIcon,
    CheckCircle as CheckCircleIcon2,
    Clock as ClockIcon,
    BookOpen as BookOpenIcon,
    FileText as FileTextIcon3,
    Code as CodeIcon,
    ChevronRight as ChevronRightIcon3,
    ChevronDown as ChevronDownIcon,
    Star,
    Users,
    Award as AwardIcon2,
    Download,
    Share2 as Share2Icon,
    Heart as HeartIcon,
    Bookmark,
    MessageCircle,
    Bell,
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
    Eye as EyeIcon,
    EyeOff as EyeOffIcon,
    Lock as LockIcon2,
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
    HelpCircle as HelpCircleIcon,
    Info,
    AlertCircle as AlertCircleIcon,
    Check,
    X as XIcon2,
    ChevronUp as ChevronUpIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon5,
    ChevronDown as ChevronDownIcon2
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import PageWrapperFunctional from '@/components/PageWrapperFunctional';

const LessonPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;
    const lessonId = params?.lessonId as string;

    const [course, setCourse] = useState<ExpandedCourse | null>(null);
    const [lesson, setLesson] = useState<ExpandedLesson | null>(null);
    const [lessonContent, setLessonContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [currentModule, setCurrentModule] = useState<number>(0);
    const [currentLesson, setCurrentLesson] = useState<number>(0);

    useEffect(() => {
        const loadLesson = async () => {
            if (!slug || !lessonId) return;

            setLoading(true);
            try {
                // Carregar curso
                const courseData = await expandedCourseService.getExpandedCourse(slug);
                setCourse(courseData);

                // Encontrar a aula específica
                const allLessons = courseData?.modules.flatMap(module =>
                    module.lessons.map(lesson => ({ ...lesson, moduleOrder: module.order }))
                ) || [];

                const foundLesson = allLessons.find(l => l.id === lessonId);
                if (foundLesson) {
                    setLesson(foundLesson);
                    setCurrentModule(foundLesson.moduleOrder - 1);
                    setCurrentLesson(foundLesson.order - 1);

                    // Carregar conteúdo da aula
                    const content = await expandedCourseService.getLessonContent(
                        slug,
                        foundLesson.level,
                        foundLesson.moduleOrder,
                        foundLesson.order
                    );
                    setLessonContent(content);
                }
            } catch (error) {
                console.error('Error loading lesson:', error);
            } finally {
                setLoading(false);
            }
        };

        loadLesson();
    }, [slug, lessonId]);

    if (loading) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-xl theme-text-secondary">Carregando aula...</p>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    if (!course || !lesson) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold theme-text mb-4">Aula não encontrada</h2>
                        <p className="theme-text-secondary mb-6">A aula solicitada não foi encontrada.</p>
                        <Link href={`/course/${slug}`} className="theme-gradient-primary text-white px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg">
                            Voltar ao Curso
                        </Link>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    const getLessonIcon = (type: 'video' | 'text' | 'quiz' | 'project' | 'exercise') => {
        switch (type) {
            case 'video': return <Video className="w-5 h-5" />;
            case 'text': return <FileText className="w-5 h-5" />;
            case 'quiz': return <HelpCircle className="w-5 h-5" />;
            case 'project': return <Code className="w-5 h-5" />;
            case 'exercise': return <Target className="w-5 h-5" />;
            default: return <BookOpen className="w-5 h-5" />;
        }
    };

    const formatContent = (content: string) => {
        // Converter markdown básico para HTML
        return content
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold theme-text mb-4">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold theme-text mb-3">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold theme-text mb-2">$1</h3>')
            .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold theme-text mb-2">$1</h4>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong class="theme-text font-bold">$1</strong>')
            .replace(/\*(.*?)\*/gim, '<em class="theme-text-secondary italic">$1</em>')
            .replace(/```([\s\S]*?)```/gim, '<pre class="theme-surface p-4 rounded-lg overflow-x-auto mb-4"><code class="text-green-400">$1</code></pre>')
            .replace(/`([^`]+)`/gim, '<code class="theme-surface px-2 py-1 rounded text-green-400">$1</code>')
            .replace(/^- (.*$)/gim, '<li class="theme-text-secondary mb-1">$1</li>')
            .replace(/\n\n/gim, '</p><p class="theme-text-secondary mb-4">')
            .replace(/^(?!<[h|l])/gim, '<p class="theme-text-secondary mb-4">')
            .replace(/(<li.*<\/li>)/gim, '<ul class="list-disc list-inside mb-4">$1</ul>');
    };

    return (
        <PageWrapperFunctional>
            <div className="min-h-screen theme-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Botão Voltar */}
                    <div className="mb-6">
                        <Link href={`/course/${slug}`} className="inline-flex items-center theme-primary hover:theme-primary/80 transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Voltar ao Curso
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar com navegação */}
                        <div className="lg:col-span-1">
                            <div className="theme-surface rounded-xl p-6 sticky top-24 border theme-border">
                                <h3 className="text-lg font-bold theme-text mb-4">Navegação</h3>
                                <div className="space-y-2">
                                    {course.modules
                                        .filter(module => module.level === lesson.level)
                                        .map((module, moduleIndex) => (
                                            <div key={module.id} className="space-y-1">
                                                <div className="text-sm font-semibold theme-text-secondary mb-2">
                                                    Módulo {module.order}: {module.title}
                                                </div>
                                                {module.lessons.map((moduleLesson, lessonIndex) => (
                                                    <Link
                                                        key={moduleLesson.id}
                                                        href={`/course/${slug}/lesson/${moduleLesson.id}`}
                                                        className={`block p-2 rounded-lg text-sm transition-colors ${moduleLesson.id === lessonId
                                                            ? 'theme-gradient-primary text-white'
                                                            : 'theme-text-secondary hover:theme-surface/50'
                                                            }`}
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            {getLessonIcon(moduleLesson.type)}
                                                            <span>Aula {moduleLesson.order}</span>
                                                        </div>
                                                        <div className="text-xs theme-text-secondary mt-1 truncate">
                                                            {moduleLesson.title}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Conteúdo principal */}
                        <div className="lg:col-span-3">
                            {/* Cabeçalho da aula */}
                            <div className="theme-gradient-primary rounded-xl p-6 mb-8">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                                                {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
                                            </span>
                                            <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                                                {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                                            </span>
                                            <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                                                {lesson.duration}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl font-bold text-white mb-4">{lesson.title}</h1>
                                        <p className="text-xl text-gray-300 mb-6">{lesson.description}</p>

                                        {lesson.objectives && lesson.objectives.length > 0 && (
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold text-white mb-3">Objetivos de Aprendizado</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {lesson.objectives.map((objective, index) => (
                                                        <div key={index} className="flex items-start space-x-2">
                                                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                                            <span className="text-gray-300 text-sm">{objective}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center space-x-4">
                                            <StartCourseButton
                                                courseSlug={slug}
                                                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center hover:scale-105 shadow-lg"
                                            >
                                                <Play className="w-5 h-5 mr-2" />
                                                Começar Aula
                                            </StartCourseButton>
                                            <CompleteLessonButton
                                                lessonId={lessonId}
                                                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-colors flex items-center hover:scale-105"
                                            >
                                                <BookOpen className="w-5 h-5 mr-2" />
                                                Marcar como Concluída
                                            </CompleteLessonButton>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Conteúdo da aula */}
                            <div className="theme-surface rounded-xl p-8 border theme-border">
                                <div
                                    className="prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: formatContent(lessonContent) }}
                                />
                            </div>

                            {/* Navegação entre aulas */}
                            <div className="flex justify-between items-center mt-8">
                                <button
                                    className="px-6 py-3 theme-surface text-white rounded-lg hover:theme-surface/80 transition-colors flex items-center hover:scale-105 shadow-lg border theme-border"
                                    onClick={() => {
                                        // Lógica para ir para aula anterior
                                    }}
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Aula Anterior
                                </button>
                                <button
                                    className="px-6 py-3 theme-gradient-primary text-white rounded-lg hover:scale-105 transition-all flex items-center shadow-lg"
                                    onClick={() => {
                                        // Lógica para ir para próxima aula
                                    }}
                                >
                                    Próxima Aula
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Actions */}
                <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                    <button
                        onClick={() => useFenixActions().actions.openAI(router)}
                        className="theme-gradient-primary text-white w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center"
                    >
                        <Brain className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => useFenixActions().actions.goToCommunity(router)}
                        className="bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 hover:scale-110 transition-all flex items-center justify-center"
                    >
                        <Zap className="w-5 h-5" />
                    </button>
                </div>

                {/* Notification System */}
                <NotificationSystem />
            </div>
        </PageWrapperFunctional>
    );
};

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

export default LessonPage;