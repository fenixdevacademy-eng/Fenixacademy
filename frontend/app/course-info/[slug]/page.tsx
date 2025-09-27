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
    Calendar,
    BarChart3,
    TrendingUp,
    Shield,
    Sparkles,
    Rocket,
    Lightbulb,
    FileText,
    Video,
    Image,
    Music,
    Settings,
    Bell,
    MessageCircle,
    ThumbsUp,
    Eye,
    EyeOff,
    Plus,
    Minus,
    ExternalLink
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
    requirements: string[]
    whatYouWillLearn: string[]
    curriculum: CurriculumItem[]
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
}

interface CurriculumItem {
    id: string
    title: string
    type: 'module' | 'lesson'
    duration: string
    isPreview: boolean
    children?: CurriculumItem[]
}

export default function CourseInfoPage() {
    const params = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

    useEffect(() => {
        setIsLoaded(true)
        loadCourse()
    }, [params.slug])

    const loadCourse = async () => {
        try {
            setLoading(true)

            // Simular carregamento do curso
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Dados mock do curso
            const mockCourse: Course = {
                id: 1,
                title: 'React Avançado - Do Zero ao Profissional',
                slug: params.slug as string,
                description: 'Aprenda React do básico ao avançado com projetos reais, hooks personalizados, context API, performance optimization e muito mais. Este curso completo te prepara para o mercado de trabalho.',
                instructor: 'João Silva',
                rating: 4.9,
                students: 1247,
                duration: '80 horas',
                level: 'Intermediário',
                price: 'R$ 197,00',
                originalPrice: 'R$ 497,00',
                image: '/api/placeholder/400/300',
                category: 'web',
                tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'Context API'],
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
                    },
                    {
                        id: 'hooks',
                        title: 'Hooks Avançados',
                        description: 'useState, useEffect e hooks personalizados',
                        duration: '15h',
                        lessons: [
                            {
                                id: 'useState-avancado',
                                title: 'useState Avançado',
                                duration: '90 min',
                                type: 'video',
                                description: 'Gerenciamento de estado complexo',
                                isPreview: true
                            }
                        ]
                    }
                ],
                requirements: [
                    'Conhecimento básico de JavaScript',
                    'HTML e CSS fundamentais',
                    'Node.js instalado',
                    'Editor de código (VS Code recomendado)'
                ],
                whatYouWillLearn: [
                    'Criar aplicações React modernas e escaláveis',
                    'Gerenciar estado com hooks e Context API',
                    'Otimizar performance de aplicações React',
                    'Implementar roteamento com React Router',
                    'Testar componentes React',
                    'Deploy de aplicações React'
                ],
                curriculum: [
                    {
                        id: 'fundamentos',
                        title: 'Fundamentos do React',
                        type: 'module',
                        duration: '12h',
                        isPreview: true,
                        children: [
                            {
                                id: 'intro-react',
                                title: 'Introdução ao React',
                                type: 'lesson',
                                duration: '45 min',
                                isPreview: true
                            },
                            {
                                id: 'componentes',
                                title: 'Componentes e JSX',
                                type: 'lesson',
                                duration: '60 min',
                                isPreview: false
                            }
                        ]
                    }
                ]
            }

            setCourse(mockCourse)
        } catch (error) {
            console.error('Erro ao carregar curso:', error)
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
        setIsBookmarked(!isBookmarked)
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
    }

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
                <AdvancedParticles />
                <VisualEffects />
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Carregando informações do curso...</p>
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
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Informações Principais */}
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        {course.isNew && (
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Novo
                                            </span>
                                        )}
                                        {course.isPopular && (
                                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Popular
                                            </span>
                                        )}
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${course.level === 'Iniciante' ? 'bg-green-100 text-green-800' :
                                                course.level === 'Intermediário' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {course.level}
                                        </span>
                                    </div>

                                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                                        {course.title}
                                    </h1>

                                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center space-x-6 text-gray-300">
                                        <div className="flex items-center space-x-2">
                                            <Star className="w-5 h-5 text-yellow-400" />
                                            <span className="font-semibold">{course.rating}</span>
                                            <span>({course.students.toLocaleString()} alunos)</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="w-5 h-5" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Users className="w-5 h-5" />
                                            <span>{course.instructor}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="border-b border-gray-700">
                                    <nav className="flex space-x-8">
                                        {[
                                            { id: 'overview', label: 'Visão Geral', icon: BookOpen },
                                            { id: 'curriculum', label: 'Currículo', icon: FileText },
                                            { id: 'instructor', label: 'Instrutor', icon: Users },
                                            { id: 'reviews', label: 'Avaliações', icon: Star }
                                        ].map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                                        ? 'border-blue-500 text-blue-400'
                                                        : 'border-transparent text-gray-400 hover:text-white'
                                                    }`}
                                            >
                                                <tab.icon className="w-4 h-4" />
                                                <span>{tab.label}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                {/* Conteúdo das Tabs */}
                                <div className="py-8">
                                    {activeTab === 'overview' && (
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-4">O que você aprenderá</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {course.whatYouWillLearn.map((item, index) => (
                                                        <div key={index} className="flex items-start space-x-3">
                                                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                                            <span className="text-gray-300">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-4">Requisitos</h3>
                                                <ul className="space-y-2">
                                                    {course.requirements.map((req, index) => (
                                                        <li key={index} className="flex items-start space-x-3">
                                                            <Minus className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                                            <span className="text-gray-300">{req}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-4">Tags</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {course.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'curriculum' && (
                                        <div className="space-y-6">
                                            {course.curriculum.map((item) => (
                                                <div key={item.id} className="border border-gray-700 rounded-lg">
                                                    <div
                                                        className="p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
                                                        onClick={() => toggleModule(item.id)}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                <BookOpen className="w-5 h-5 text-blue-400" />
                                                                <div>
                                                                    <h4 className="text-white font-semibold">{item.title}</h4>
                                                                    <p className="text-gray-400 text-sm">{item.duration}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                {item.isPreview && (
                                                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                                                        Preview
                                                                    </span>
                                                                )}
                                                                {expandedModules.has(item.id) ? (
                                                                    <Minus className="w-4 h-4 text-gray-400" />
                                                                ) : (
                                                                    <Plus className="w-4 h-4 text-gray-400" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {expandedModules.has(item.id) && item.children && (
                                                        <div className="border-t border-gray-700 p-4 space-y-2">
                                                            {item.children.map((child) => (
                                                                <div key={child.id} className="flex items-center justify-between py-2">
                                                                    <div className="flex items-center space-x-3">
                                                                        <Play className="w-4 h-4 text-gray-400" />
                                                                        <span className="text-gray-300">{child.title}</span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        {child.isPreview && (
                                                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                                                                Preview
                                                                            </span>
                                                                        )}
                                                                        <span className="text-gray-400 text-sm">{child.duration}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'instructor' && (
                                        <div className="space-y-6">
                                            <div className="flex items-start space-x-6">
                                                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-2xl font-bold">
                                                        {course.instructor.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-2">{course.instructor}</h3>
                                                    <p className="text-gray-300 mb-4">Instrutor Sênior de Desenvolvimento Web</p>
                                                    <p className="text-gray-400 leading-relaxed">
                                                        Especialista em React com mais de 8 anos de experiência no desenvolvimento de aplicações web modernas.
                                                        Já trabalhou em empresas como Google, Facebook e Microsoft, e ajudou mais de 10.000 alunos a
                                                        dominarem as tecnologias mais demandadas do mercado.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'reviews' && (
                                        <div className="space-y-6">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-white mb-2">{course.rating}</div>
                                                <div className="flex items-center justify-center space-x-1 mb-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-5 h-5 ${star <= Math.floor(course.rating)
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-gray-400'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-gray-400">Baseado em {course.students.toLocaleString()} avaliações</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Card de Compra */}
                                <MobileOptimizedCard className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-white mb-2">{course.price}</div>
                                        <div className="text-lg text-gray-400 line-through">{course.originalPrice}</div>
                                        <div className="text-sm text-green-400">60% de desconto</div>
                                    </div>

                                    <div className="space-y-4">
                                        <FunctionalButton
                                            href={`/course/${course.slug}`}
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                            icon={<Play className="w-5 h-5" />}
                                        >
                                            Ver Demo Gratuita
                                        </FunctionalButton>

                                        <FunctionalButton
                                            href={`/payment?course=${course.id}`}
                                            variant="outline"
                                            size="lg"
                                            className="w-full"
                                            icon={<Lock className="w-5 h-5" />}
                                        >
                                            Comprar Curso
                                        </FunctionalButton>
                                    </div>

                                    <div className="mt-6 space-y-3 text-sm text-gray-300">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span>Acesso vitalício</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span>Certificado de conclusão</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span>Suporte 24/7</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span>Garantia de 30 dias</span>
                                        </div>
                                    </div>
                                </MobileOptimizedCard>

                                {/* Ações */}
                                <MobileOptimizedCard className="p-6">
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handleBookmark}
                                            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors ${isBookmarked
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            <Bookmark className="w-4 h-4" />
                                            <span>{isBookmarked ? 'Salvo' : 'Salvar'}</span>
                                        </button>
                                        <button
                                            onClick={handleLike}
                                            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors ${isLiked
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            <Heart className="w-4 h-4" />
                                            <span>{isLiked ? 'Curtido' : 'Curtir'}</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                                            <Share2 className="w-4 h-4" />
                                            <span>Compartilhar</span>
                                        </button>
                                    </div>
                                </MobileOptimizedCard>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

