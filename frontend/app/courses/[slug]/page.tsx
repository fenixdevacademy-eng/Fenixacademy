'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
    Lightbulb,
    ShoppingCart
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import { FunctionalButton } from '@/components/FunctionalButton'

interface Course {
    id: string
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

export default function CoursePage() {
    const params = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)
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
                    id: '1',
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
                            title: 'Fundamentos',
                            description: 'Conceitos básicos e essenciais',
                            duration: '12h',
                            lessons: [
                                {
                                    id: 'intro',
                                    title: 'Introdução',
                                    duration: '45 min',
                                    type: 'video',
                                    description: 'Introdução ao curso',
                                    isPreview: true
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

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
                <AdvancedParticles />
                <VisualEffects />
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Carregando curso...</p>
                </div>
            </div>
        )
    }

    if (error || !course) {
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
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Conteúdo Principal */}
                            <div className="lg:col-span-2">
                                <div className="glass-tech rounded-2xl p-8">
                                    <h1 className="text-4xl font-bold gradient-text-neon mb-4">{course.title}</h1>
                                    <p className="text-gray-300 text-lg mb-6">{course.description}</p>

                                    {/* Informações do Curso */}
                                    <div className="flex flex-wrap items-center gap-6 mb-8">
                                        <div className="flex items-center space-x-2 text-gray-300">
                                            <Clock className="w-5 h-5" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-300">
                                            <Users className="w-5 h-5" />
                                            <span>{course.students} alunos</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-300">
                                            <Star className="w-5 h-5" />
                                            <span>{course.rating}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-300">
                                            <BookOpen className="w-5 h-5" />
                                            <span>{course.level}</span>
                                        </div>
                                    </div>

                                    {/* Botões de Ação */}
                                    <div className="flex flex-wrap gap-4">
                                        <FunctionalButton
                                            href={`/expanded-course/${course.slug}`}
                                            variant="primary"
                                            size="lg"
                                            icon={<Play className="w-5 h-5" />}
                                        >
                                            Ver Demo
                                        </FunctionalButton>
                                        <FunctionalButton
                                            href={`/payment?course=${course.id}`}
                                            variant="outline"
                                            size="lg"
                                            icon={<ShoppingCart className="w-5 h-5" />}
                                        >
                                            Comprar Agora
                                        </FunctionalButton>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="glass-tech rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Informações do Curso</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-gray-400">Instrutor:</span>
                                            <p className="text-white">{course.instructor}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Categoria:</span>
                                            <p className="text-white capitalize">{course.category}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Nível:</span>
                                            <p className="text-white">{course.level}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Duração:</span>
                                            <p className="text-white">{course.duration}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-400 mb-2">Garantia de 30 dias</h4>
                                        <p className="text-sm text-blue-300">
                                            Se não ficar satisfeito, devolvemos seu dinheiro.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
