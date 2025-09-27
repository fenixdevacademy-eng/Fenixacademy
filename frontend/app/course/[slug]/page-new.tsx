'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    ArrowLeft,
    Play,
    Star,
    Users,
    Clock,
    BookOpen,
    CheckCircle,
    Download,
    Share2,
    Heart,
    Bookmark,
    MessageCircle,
    Award,
    Code,
    Database,
    Smartphone,
    Shield,
    Brain
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import FunctionalButton from '@/components/FunctionalButton'
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection'
import MobileOptimizedCard from '@/components/MobileOptimizedCard'
import PaymentModal from '@/components/PaymentModal'
import ProgressTracker from '@/components/ProgressTracker'
import { useProgress } from '@/hooks/useProgress'

// Mock data para demonstração
const mockCourse = {
    id: 1,
    title: 'React Avançado - Do Zero ao Profissional',
    slug: 'react-avancado-do-zero-ao-profissional',
    description: 'Aprenda React com padrões avançados, hooks customizados e otimizações de performance. Domine as melhores práticas da indústria.',
    instructor: 'João Silva',
    rating: 4.9,
    students: 15420,
    duration: '40h',
    level: 'Intermediário',
    price: 'R$ 297',
    originalPrice: 'R$ 497',
    image: '/api/placeholder/800/450',
    category: 'web',
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
    isNew: true,
    isPopular: true,
    modules: [
        {
            id: 1,
            title: 'Fundamentos do React',
            lessons: 8,
            duration: '4h 30min',
            completed: true
        },
        {
            id: 2,
            title: 'Hooks Avançados',
            lessons: 12,
            duration: '6h 15min',
            completed: true
        },
        {
            id: 3,
            title: 'Performance e Otimização',
            lessons: 10,
            duration: '5h 20min',
            completed: false
        },
        {
            id: 4,
            title: 'Projeto Final',
            lessons: 15,
            duration: '8h 45min',
            completed: false
        }
    ],
    requirements: [
        'Conhecimento básico de JavaScript',
        'Experiência com HTML/CSS',
        'Node.js instalado no computador'
    ],
    whatYouWillLearn: [
        'Criar aplicações React modernas e escaláveis',
        'Implementar hooks customizados avançados',
        'Otimizar performance de aplicações React',
        'Gerenciar estado complexo com Context API',
        'Implementar testes unitários e de integração'
    ]
}

export default function CoursePage() {
    const params = useParams()
    const router = useRouter()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isEnrolled, setIsEnrolled] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [activeModule, setActiveModule] = useState(1)
    const [showPaymentModal, setShowPaymentModal] = useState(false)

    const { progress, markLessonComplete, getProgressStats } = useProgress(mockCourse.id)

    useEffect(() => {
        setIsLoaded(true)
        // Simular verificação de matrícula
        setIsEnrolled(Math.random() > 0.5)
    }, [])

    const handleEnroll = () => {
        if (isEnrolled) {
            router.push(`/course/${params.slug}/lesson/1`)
        } else {
            setShowPaymentModal(true)
        }
    }

    const handlePaymentSuccess = async (paymentMethod: string) => {
        try {
            // Simular chamada para API de matrícula
            const response = await fetch(`/api/courses/${mockCourse.id}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('fenix-jwt-token') || 'fenix-jwt-token-demo'}`
                },
                body: JSON.stringify({
                    paymentMethod,
                    paymentId: `payment_${Date.now()}`,
                    amount: parseFloat(mockCourse.price.replace('R$ ', '').replace(',', '.'))
                })
            })

            if (response.ok) {
                setIsEnrolled(true)
                // Redirecionar para a primeira lição
                router.push(`/course/${params.slug}/lesson/1`)
            }
        } catch (error) {
            console.error('Erro ao processar matrícula:', error)
        }
    }

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked)
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: mockCourse.title,
                text: mockCourse.description,
                url: window.location.href
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('Link copiado para a área de transferência!')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <AdvancedParticles />
            <VisualEffects />

            {/* Header */}
            <ScrollAnimatedSection delay={0.2} direction="down">
                <div className="relative pt-24 pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-8">
                            <Link
                                href="/courses"
                                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Voltar aos Cursos
                            </Link>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Course Info */}
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                            <span className="text-white font-semibold">{mockCourse.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Users className="w-5 h-5" />
                                            <span>{mockCourse.students.toLocaleString()} alunos</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Clock className="w-5 h-5" />
                                            <span>{mockCourse.duration}</span>
                                        </div>
                                    </div>

                                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                                        {mockCourse.title}
                                    </h1>

                                    <p className="text-xl text-gray-300 leading-relaxed">
                                        {mockCourse.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {mockCourse.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <FunctionalButton
                                        onClick={handleEnroll}
                                        variant="primary"
                                        size="lg"
                                        icon={<Play className="w-5 h-5" />}
                                        iconPosition="left"
                                        glowEffect={true}
                                        rippleEffect={true}
                                        className="flex-1"
                                    >
                                        {isEnrolled ? 'Continuar Curso' : 'Matricular-se'}
                                    </FunctionalButton>

                                    <FunctionalButton
                                        onClick={handleBookmark}
                                        variant={isBookmarked ? "primary" : "outline"}
                                        size="lg"
                                        icon={<Bookmark className="w-5 h-5" />}
                                        iconPosition="left"
                                        glowEffect={true}
                                        rippleEffect={true}
                                    >
                                        {isBookmarked ? 'Salvo' : 'Salvar'}
                                    </FunctionalButton>

                                    <FunctionalButton
                                        onClick={handleLike}
                                        variant={isLiked ? "primary" : "outline"}
                                        size="lg"
                                        icon={<Heart className="w-5 h-5" />}
                                        iconPosition="left"
                                        glowEffect={true}
                                        rippleEffect={true}
                                    >
                                        {isLiked ? 'Curtido' : 'Curtir'}
                                    </FunctionalButton>

                                    <FunctionalButton
                                        onClick={handleShare}
                                        variant="outline"
                                        size="lg"
                                        icon={<Share2 className="w-5 h-5" />}
                                        iconPosition="left"
                                        glowEffect={true}
                                        rippleEffect={true}
                                    >
                                        Compartilhar
                                    </FunctionalButton>
                                </div>
                            </div>

                            {/* Course Video/Image */}
                            <div className="relative">
                                <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                                    <img
                                        src={mockCourse.image}
                                        alt={mockCourse.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <FunctionalButton
                                            variant="primary"
                                            size="xl"
                                            icon={<Play className="w-8 h-8" />}
                                            iconPosition="left"
                                            glowEffect={true}
                                            rippleEffect={true}
                                            className="rounded-full"
                                        >
                                            Assistir Preview
                                        </FunctionalButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollAnimatedSection>

            {/* Course Content */}
            <ScrollAnimatedSection delay={0.4} direction="up">
                <div className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-12">
                                {/* Modules */}
                                <MobileOptimizedCard hover={true} glow={false}>
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                            <BookOpen className="w-6 h-6" />
                                            Conteúdo do Curso
                                        </h2>

                                        <div className="space-y-4">
                                            {mockCourse.modules.map((module, index) => (
                                                <div
                                                    key={module.id}
                                                    className={`p-4 rounded-xl border transition-all duration-300 ${activeModule === module.id
                                                        ? 'border-blue-500 bg-blue-500/10'
                                                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                                                        }`}
                                                    onClick={() => setActiveModule(module.id)}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${module.completed
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-white/20 text-gray-300'
                                                                }`}>
                                                                {module.completed ? (
                                                                    <CheckCircle className="w-5 h-5" />
                                                                ) : (
                                                                    <span className="text-sm font-bold">{index + 1}</span>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h3 className="text-white font-semibold">{module.title}</h3>
                                                                <p className="text-gray-300 text-sm">
                                                                    {module.lessons} aulas • {module.duration}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-sm text-gray-400">
                                                                {module.completed ? 'Concluído' : 'Pendente'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </MobileOptimizedCard>

                                {/* What You'll Learn */}
                                <MobileOptimizedCard hover={true} glow={false}>
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                            <Award className="w-6 h-6" />
                                            O que você vai aprender
                                        </h2>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {mockCourse.whatYouWillLearn.map((item, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-300">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </MobileOptimizedCard>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Progress Tracker */}
                                {isEnrolled && (
                                    <MobileOptimizedCard hover={true} glow={false}>
                                        <ProgressTracker
                                            courseId={mockCourse.id}
                                            showDetails={true}
                                            compact={false}
                                        />
                                    </MobileOptimizedCard>
                                )}

                                {/* Course Info Card */}
                                <MobileOptimizedCard hover={true} glow={true}>
                                    <div className="space-y-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-white mb-2">{mockCourse.price}</div>
                                            <div className="text-gray-400 line-through">{mockCourse.originalPrice}</div>
                                        </div>

                                        <FunctionalButton
                                            onClick={handleEnroll}
                                            variant="primary"
                                            size="lg"
                                            icon={<Play className="w-5 h-5" />}
                                            iconPosition="left"
                                            glowEffect={true}
                                            rippleEffect={true}
                                            className="w-full"
                                        >
                                            {isEnrolled ? 'Continuar Curso' : 'Matricular-se Agora'}
                                        </FunctionalButton>

                                        <div className="text-center text-sm text-gray-300">
                                            Garantia de 30 dias ou seu dinheiro de volta
                                        </div>
                                    </div>
                                </MobileOptimizedCard>

                                {/* Requirements */}
                                <MobileOptimizedCard hover={true} glow={false}>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white">Pré-requisitos</h3>
                                        <ul className="space-y-2">
                                            {mockCourse.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-300 text-sm">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </MobileOptimizedCard>

                                {/* Instructor */}
                                <MobileOptimizedCard hover={true} glow={false}>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white">Instrutor</h3>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">
                                                    {mockCourse.instructor.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="text-white font-semibold">{mockCourse.instructor}</div>
                                                <div className="text-gray-400 text-sm">Especialista em React</div>
                                            </div>
                                        </div>
                                    </div>
                                </MobileOptimizedCard>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollAnimatedSection>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                course={mockCourse}
                onPaymentSuccess={handlePaymentSuccess}
            />
        </div>
    )
}
