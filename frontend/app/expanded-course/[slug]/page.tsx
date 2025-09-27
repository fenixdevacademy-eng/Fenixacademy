'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    ArrowLeft,
    Play,
    Clock,
    Users,
    Star,
    BookOpen,
    Code,
    Brain,
    Award,
    CheckCircle,
    ChevronRight,
    Download,
    Share2,
    Heart,
    Bookmark,
    Zap,
    Target,
    Globe,
    Lock,
    Unlock,
    Crown,
    Eye,
    EyeOff,
    Pause,
    Volume2,
    Settings,
    Maximize2,
    RotateCcw,
    Hand,
    ChevronDown,
    ChevronUp,
    FileText,
    Video,
    Image,
    Music,
    Settings as SettingsIcon,
    Bell,
    MessageCircle,
    ThumbsUp,
    Plus,
    Minus,
    ExternalLink,
    BarChart3,
    TrendingUp,
    Shield,
    Sparkles,
    Rocket,
    Lightbulb
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import FunctionalButton from '@/components/FunctionalButton'
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection'
import MobileOptimizedCard from '@/components/MobileOptimizedCard'

interface Course {
    id: number
    title: string
    slug: string
    description: string
    instructor: string
    rating: number
    students: number
    duration: string
    level: string
    price: string
    originalPrice: string
    image: string
    category: string
    tags: string[]
    isNew: boolean
    isPopular: boolean
    modules: Module[]
    previewLessons: PreviewLesson[]
}

interface Module {
    id: string
    title: string
    description: string
    lessons: Lesson[]
    duration: string
}

interface Lesson {
    id: string
    title: string
    duration: string
    type: 'video' | 'text' | 'exercise' | 'project'
    description: string
    isPreview: boolean
    content?: string
}

interface PreviewLesson {
    id: string
    title: string
    description: string
    duration: string
    type: 'video' | 'text' | 'exercise' | 'project'
    content: string
    videoUrl?: string
    codeExample?: string
    exercise?: string
}

export default function CourseDemoPage() {
    const params = useParams()
    const router = useRouter()
    const [isLoaded, setIsLoaded] = useState(false)
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')
    const [currentLesson, setCurrentLesson] = useState<PreviewLesson | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState('00:29')
    const [volume, setVolume] = useState(80)
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsLoaded(true)
        if (params?.slug) {
            loadCourse()
        }
    }, [params?.slug])

    const loadCourse = async () => {
        try {
            setLoading(true)

            // Buscar conteúdo real do curso
            const response = await fetch(`/api/courses/${params?.slug}/content`)
            const data = await response.json()

            if (data.success) {
                // Converter dados da API para o formato esperado
                const courseData: Course = {
                id: 1,
                title: data.course.title,
                slug: params?.slug as string,
                    description: data.course.description,
                    instructor: 'Fênix Dev Academy',
                    rating: 4.9,
                    students: 1247,
                    duration: `${data.course.estimatedHours} horas`,
                    level: data.course.level,
                    price: 'R$ 197,00',
                    originalPrice: 'R$ 497,00',
                    image: '/api/placeholder/400/300',
                    category: data.course.category.toLowerCase(),
                    tags: [data.course.category, 'Programação', 'Desenvolvimento'],
                    isNew: true,
                    isPopular: true,
                    modules: [
                        {
                            id: 'fundamentos',
                            title: 'Fundamentos do React',
                            description: 'Conceitos básicos e essenciais do React',
                            duration: '12h',
                            lessons: [
                                {
                                    id: 'intro-react',
                                    title: 'Introdução ao React',
                                    duration: '45 min',
                                    type: 'video',
                                    description: 'O que é React e por que usar',
                                    isPreview: true
                                },
                                {
                                    id: 'componentes',
                                    title: 'Componentes e JSX',
                                    duration: '60 min',
                                    type: 'video',
                                    description: 'Criando seu primeiro componente',
                                    isPreview: false
                                }
                            ]
                        }
                    ],
                    previewLessons: data.previewLessons.map((lesson: any, index: number) => ({
                        id: lesson.id.toString(),
                        title: lesson.title,
                        description: lesson.description,
                        duration: '45 min',
                        type: 'video',
                        content: lesson.content,
                        codeExamples: lesson.codeExamples,
                        isFree: index < 2 // Primeiras 2 aulas gratuitas
                }))
            }

            setCourse(courseData)
            if (courseData.previewLessons.length > 0) {
                setCurrentLesson(courseData.previewLessons[0])
            }
        } else {
            setError(data.error || 'Erro ao carregar curso')
        }
    } catch (error) {
        console.error('Erro ao carregar curso:', error)
        setError('Erro ao carregar curso')
    } finally {
        setLoading(false)
    }
}

const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
        newExpanded.delete(moduleId)
    } else {
        newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
}

const handleBookmark = () => {
    // Implementar lógica de bookmark
}

const handleLike = () => {
    // Implementar lógica de like
}

    if (loading) {
        return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
            <AdvancedParticles />
            <VisualEffects />
                <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-lg">Carregando prévia do curso...</p>
            </div>
        </div>
    )
    }

if (!course) {
        return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
            <AdvancedParticles />
            <VisualEffects />
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Curso não encontrado</h1>
                <Link href="/courses" className="text-blue-400 hover:text-blue-300">
                    Voltar para os cursos
                    </Link>
                </div>
            </div>
    )
}

    return (
    <div className="min-h-screen relative overflow-hidden">
        <AdvancedParticles />
        <VisualEffects />

            {/* Header */}
        <section className="relative pt-24 pb-16">
            <div className="absolute inset-0 tech-grid opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-gray-300 mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/courses" className="hover:text-white transition-colors">Cursos</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white font-medium">{course.title}</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-blue-400 font-medium">Demo</span>
            </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar com lições de preview */}
                        <div className="lg:col-span-1">
                            <MobileOptimizedCard className="p-6">
                                <div className="flex items-center space-x-2 mb-6">
                                    <Eye className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-lg font-bold text-white">Prévia Gratuita</h3>
                            </div>

                                <div className="space-y-2">
                                    {course.previewLessons.map((lesson, index) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => setCurrentLesson(lesson)}
                                            className={`w-full text-left p-3 rounded-lg transition-colors ${currentLesson?.id === lesson.id
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                {lesson.type === 'video' && <Play className="w-4 h-4" />}
                                                {lesson.type === 'text' && <FileText className="w-4 h-4" />}
                                                {lesson.type === 'exercise' && <Code className="w-4 h-4" />}
                                                {lesson.type === 'project' && <Target className="w-4 h-4" />}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{lesson.title}</p>
                                                    <p className="text-xs opacity-75">{lesson.duration}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                            </div>

                                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Lock className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm font-semibold text-yellow-400">Conteúdo Limitado</span>
                                        </div>
                                    <p className="text-xs text-yellow-300">
                                        Esta é apenas uma prévia. Compre o curso para acessar todo o conteúdo!
                                    </p>
                                                    </div>
                            </MobileOptimizedCard>
                                            </div>

                        {/* Conteúdo Principal */}
                        <div className="lg:col-span-3">
                            {currentLesson ? (
                                <MobileOptimizedCard className="p-6">
                                    <div className="mb-6">
                                        <div className="flex items-center space-x-2 mb-4">
                                            {currentLesson.type === 'video' && <Play className="w-5 h-5 text-blue-400" />}
                                            {currentLesson.type === 'text' && <FileText className="w-5 h-5 text-green-400" />}
                                            {currentLesson.type === 'exercise' && <Code className="w-5 h-5 text-purple-400" />}
                                            {currentLesson.type === 'project' && <Target className="w-5 h-5 text-orange-400" />}
                                            <h2 className="text-2xl font-bold text-white">{currentLesson.title}</h2>
                                        </div>
                                        <p className="text-gray-300 mb-4">{currentLesson.description}</p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{currentLesson.duration}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Eye className="w-4 h-4" />
                                                <span>Prévia Gratuita</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Player de Vídeo */}
                                    {currentLesson.type === 'video' && (
                                        <div className="mb-8">
                                            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                            <Play className="w-8 h-8 text-white" />
                                                    </div>
                                                        <p className="text-white text-lg">Player de Vídeo</p>
                                                        <p className="text-gray-400 text-sm">Clique para reproduzir</p>
                                                    </div>
                                                </div>

                                                {/* Controles do Player */}
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
                                        </div>
                                    )}

                                    {/* Conteúdo da Aula */}
                                    <div className="prose prose-lg max-w-none text-gray-300">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: currentLesson.content
                                                    .replace(/^#\s*(.*?)$/gm, '<h1 class="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">$1</h1>')
                                                    .replace(/^##\s*(.*?)$/gm, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>')
                                                    .replace(/^###\s*(.*?)$/gm, '<h3 class="text-xl font-bold text-white mt-6 mb-3">$1</h3>')
                                                    .replace(/^####\s*(.*?)$/gm, '<h4 class="text-lg font-bold text-white mt-4 mb-2">$1</h4>')
                                                    .replace(/^-\s*(.*?)$/gm, '<li class="text-gray-300 mb-2 ml-4 list-disc">$1</li>')
                                                    .replace(/^\*\s*(.*?)$/gm, '<li class="text-gray-300 mb-2 ml-4 list-disc">$1</li>')
                                                    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 border border-gray-700 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm text-green-400">$1</code></pre>')
                                                    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-green-400">$1</code>')
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
                                                    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                                                    .replace(/\n\n/g, '</p><p class="text-gray-300 mb-4 leading-relaxed">')
                                                    .replace(/^(?!<[h|p|l|d|p])(.*?)$/gm, '<p class="text-gray-300 mb-4 leading-relaxed">$1</p>')
                                            }}
                                        />
                                    </div>

                                    {/* Código de Exemplo */}
                                    {currentLesson.codeExample && (
                                        <div className="mt-8">
                                            <h4 className="text-lg font-bold text-white mb-4">Exemplo de Código</h4>
                                            <pre className="bg-gray-800 border border-gray-700 p-4 rounded-lg overflow-x-auto">
                                                <code className="text-sm text-green-400">{currentLesson.codeExample}</code>
                                            </pre>
                                    </div>
                                )}

                                    {/* Exercício Prático */}
                                    {currentLesson.exercise && (
                                        <div className="mt-8">
                                            <h4 className="text-lg font-bold text-white mb-4">Exercício Prático</h4>
                                            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                                                <pre className="text-sm text-gray-300 whitespace-pre-wrap">{currentLesson.exercise}</pre>
                                            </div>
                                        </div>
                                    )}

                                    {/* Aviso de Conteúdo Limitado */}
                                    <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <Lock className="w-5 h-5 text-blue-400 mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-blue-400 mb-2">Conteúdo Limitado</h4>
                                                <p className="text-sm text-blue-300 mb-4">
                                                    Esta é apenas uma prévia do curso. Para acessar todo o conteúdo,
                                                    exercícios práticos, projetos e certificado, adquira o curso completo.
                                                </p>
                                                <div className="flex space-x-4">
                                                    <FunctionalButton
                                                        href={`/course-info/${course.slug}`}
                                                        variant="outline"
                                                        size="sm"
                                                        icon={<BookOpen className="w-4 h-4" />}
                                                    >
                                                        Ver Informações
                                                    </FunctionalButton>
                                                    <FunctionalButton
                                                        href={`/payment?course=${course.id}`}
                                                        variant="primary"
                                                        size="sm"
                                                        icon={<Lock className="w-4 h-4" />}
                                                    >
                                                        Comprar Curso
                                                    </FunctionalButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </MobileOptimizedCard>
                            ) : (
                                <MobileOptimizedCard className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Play className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Selecione uma aula</h3>
                                    <p className="text-gray-400">Escolha uma das aulas de prévia na barra lateral</p>
                                </MobileOptimizedCard>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
)
}