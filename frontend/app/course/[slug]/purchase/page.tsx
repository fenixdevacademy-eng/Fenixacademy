'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CourseItem } from '../../../../lib/payment-service';
import StripePayment from '../../../../app/components/StripePayment';
import HeaderWithCart from '../../../../components/HeaderWithCart';
import { PageWrapperFunctional } from '@/components/PageWrapperFunctional';
import { courses } from '@/lib/courses-data';
import {
    CheckCircle,
    Clock,
    Star,
    Users,
    Award,
    Shield,
    Zap,
    BookOpen,
    Code,
    Database,
    Smartphone,
    Globe,
    Brain,
    Rocket,
    TrendingUp,
    Target,
    Heart,
    Gift,
    CreditCard,
    Lock,
    ArrowRight,
    ChevronRight,
    Info,
    AlertCircle,
    Loader2
} from 'lucide-react';

interface CoursePurchasePageProps {
    params: {
        slug: string;
    };
}


export default function CoursePurchasePage({ params }: CoursePurchasePageProps) {
    const router = useRouter();
    const [course, setCourse] = useState<CourseItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
    const [showPayment, setShowPayment] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadCourse();
    }, [params.slug]);

    const loadCourse = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Simulate API call
            const foundCourse = courses.find(c => c.slug === params.slug);

            if (!foundCourse) {
                setError('Curso não encontrado');
                return;
            }

            // Convert Course to CourseItem
            const courseItem: CourseItem = {
                id: foundCourse.id,
                title: foundCourse.title,
                description: foundCourse.description || 'Curso de programação completo',
                price: foundCourse.price,
                currency: 'BRL',
                image: foundCourse.image,
                category: foundCourse.category,
                level: foundCourse.level,
                duration_hours: 10, // Default value
                total_lessons: 20, // Default value
                total_modules: 5 // Default value
            };
            setCourse(courseItem);
        } catch (err) {
            console.error('Error loading course:', err);
            setError('Erro ao carregar curso');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePurchase = () => {
        if (!course) return;
        setShowPayment(true);
    };

    const handlePaymentSuccess = () => {
        router.push(`/course/${params.slug}?purchased=true`);
    };

    const handlePaymentError = (error: string) => {
        setError(error);
        setShowPayment(false);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const getPlanPrice = () => {
        if (!course) return 0;
        return selectedPlan === 'yearly' ? course.price * 0.8 : course.price;
    };

    const getSavings = () => {
        if (!course) return 0;
        return course.price - getPlanPrice();
    };

    if (isLoading) {
        return (
            <PageWrapperFunctional title="Carregando...">
                <div className="flex items-center justify-center min-h-64">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600">Carregando curso...</p>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    if (error || !course) {
        return (
            <PageWrapperFunctional title="Erro">
                <div className="flex items-center justify-center min-h-64">
                    <div className="text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro</h2>
                        <p className="text-gray-600 mb-4">{error || 'Curso não encontrado'}</p>
                        <button
                            onClick={() => router.push('/courses')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Voltar aos Cursos
                        </button>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    return (
        <PageWrapperFunctional title={`Comprar ${course.title}`}>
            <div className="min-h-screen bg-gray-50">
                <HeaderWithCart />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Course Info */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-start gap-6">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                            {course.title}
                                        </h1>
                                        <p className="text-gray-600 mb-4">
                                            {course.description}
                                        </p>

                                        <div className="flex flex-wrap gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                {course.duration_hours} horas
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <BookOpen className="w-4 h-4" />
                                                {course.total_lessons} aulas
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Users className="w-4 h-4" />
                                                {course.total_modules} módulos
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Star className="w-4 h-4" />
                                                {course.level}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                {course.category}
                                            </span>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                                {course.level}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Course Features */}
                            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    O que você vai aprender
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">Conceitos fundamentais</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">Exercícios práticos</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">Projetos reais</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">Certificado de conclusão</span>
                                    </div>
                                </div>
                            </div>

                            {/* Course Modules */}
                            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Conteúdo do Curso
                                </h2>
                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            Módulo 1: Fundamentos
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            Aprenda os conceitos básicos e fundamentais
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                2 horas
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <BookOpen className="w-4 h-4" />
                                                5 aulas
                                            </span>
                                        </div>
                                    </div>
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            Módulo 2: Intermediário
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            Aprofunde seus conhecimentos com conceitos intermediários
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                3 horas
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <BookOpen className="w-4 h-4" />
                                                8 aulas
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Purchase Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Escolha seu Plano
                                </h3>

                                {/* Plan Selection */}
                                <div className="space-y-3 mb-6">
                                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="plan"
                                            value="monthly"
                                            checked={selectedPlan === 'monthly'}
                                            onChange={(e) => setSelectedPlan(e.target.value as 'monthly')}
                                            className="text-blue-600"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">
                                                Plano Mensal
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {formatPrice(course.price)}/mês
                                            </div>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="plan"
                                            value="yearly"
                                            checked={selectedPlan === 'yearly'}
                                            onChange={(e) => setSelectedPlan(e.target.value as 'yearly')}
                                            className="text-blue-600"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">
                                                Plano Anual
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {formatPrice(getPlanPrice())}/ano
                                            </div>
                                            <div className="text-xs text-green-600 font-medium">
                                                Economize {formatPrice(getSavings())}
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {/* Price Summary */}
                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-600">Preço:</span>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {formatPrice(getPlanPrice())}
                                        </span>
                                    </div>
                                    {selectedPlan === 'yearly' && (
                                        <div className="flex items-center justify-between text-sm text-green-600">
                                            <span>Desconto:</span>
                                            <span>-{formatPrice(getSavings())}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                        <span>Total:</span>
                                        <span>{formatPrice(getPlanPrice())}</span>
                                    </div>
                                </div>

                                {/* Purchase Button */}
                                <button
                                    onClick={handlePurchase}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    Comprar Agora
                                </button>

                                {/* Guarantee */}
                                <div className="mt-4 text-center">
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                        <Shield className="w-4 h-4" />
                                        <span>Garantia de 30 dias</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Modal */}
                {showPayment && course && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Finalizar Compra
                                    </h3>
                                    <button
                                        onClick={() => setShowPayment(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        ×
                                    </button>
                                </div>

                                <StripePayment
                                    course={course}
                                    onSuccess={handlePaymentSuccess}
                                    onError={handlePaymentError}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapperFunctional>
    );
}