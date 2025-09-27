'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    CreditCard,
    Smartphone,
    QrCode,
    Shield,
    CheckCircle,
    Clock,
    Star,
    Zap,
    BookOpen,
    Brain,
    Code,
    Award,
    Lock,
    Unlock,
    AlertCircle,
    Loader2,
    Users,
    Play
} from 'lucide-react';
import FenixLogo from '@/components/FenixLogo';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdvancedParticles from '@/components/AdvancedParticles';
import VisualEffects from '@/components/VisualEffects';

interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    fee?: number;
    processingTime: string;
    popular?: boolean;
}

interface PricingTier {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    duration: string;
    features: string[];
    popular?: boolean;
    badge?: string;
}

export default function ExpandedPaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const courseSlug = searchParams?.get('course') || 'python-data-science';
    const tier = searchParams?.get('tier') || 'premium';

    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [loading, setLoading] = useState(false);

    // Dados do curso (fallback para quando a API não estiver disponível)
    const [course, setCourse] = useState({
        id: courseSlug,
        title: `${courseSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Curso Completo`,
        description: `Aprenda ${courseSlug.replace(/-/g, ' ')} do zero ao avançado com projetos práticos e exemplos reais.`,
        instructor: 'Prof. Fênix Academy',
        duration: '40 horas',
        level: 'Iniciante',
        rating: 4.9,
        students_count: 1250,
        image_url: `/images/courses/${courseSlug}.jpg`,
        modules_count: 8,
        lessons_count: 45,
        exercises_count: 120,
        quizzes_count: 15,
        projects_count: 5,
        certificate_included: true,
        lifetime_access: true,
        mobile_friendly: true,
        tags: [courseSlug.replace(/-/g, ' '), 'Programação', 'Desenvolvimento']
    });

    useEffect(() => {
        // Simular carregamento do curso
        const loadCourse = async () => {
            console.log('Iniciando carregamento do curso...');
            setLoading(true);
            try {
                // Aqui você pode implementar uma chamada real para a API
                // Por enquanto, vamos usar dados mockados baseados no slug
                const courseData = {
                    'python-data-science': {
                        id: 'python-data-science',
                        title: 'Python para Data Science',
                        description: 'Aprenda Python do zero ao avançado com foco em Data Science e Machine Learning',
                        instructor: 'Dr. Carlos Silva',
                        duration: '40 horas',
                        level: 'Iniciante',
                        rating: 4.9,
                        students_count: 1250,
                        image_url: '/images/courses/python-data-science.jpg',
                        modules_count: 8,
                        lessons_count: 45,
                        exercises_count: 120,
                        quizzes_count: 15,
                        projects_count: 5,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        tags: ['Python', 'Data Science', 'Machine Learning']
                    },
                    'web-development': {
                        id: 'web-development',
                        title: 'Desenvolvimento Web Completo',
                        description: 'Domine React, Node.js e as melhores práticas de desenvolvimento web moderno',
                        instructor: 'Ana Costa',
                        duration: '60 horas',
                        level: 'Intermediário',
                        rating: 4.8,
                        students_count: 2100,
                        image_url: '/images/courses/web-development.jpg',
                        modules_count: 12,
                        lessons_count: 80,
                        exercises_count: 150,
                        quizzes_count: 20,
                        projects_count: 8,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        tags: ['React', 'Node.js', 'JavaScript', 'MongoDB']
                    }
                }

                const selectedCourse = courseData[courseSlug as keyof typeof courseData] || courseData['python-data-science'];
                console.log('Curso selecionado:', selectedCourse);
                setCourse(selectedCourse);
                console.log('Curso definido, definindo loading como false...');
            } catch (error) {
                console.error('Erro ao carregar curso:', error);
            } finally {
                console.log('Finalizando carregamento, setLoading(false)');
                setLoading(false);
            }
        }

        loadCourse();

        // Timeout de segurança para garantir que o loading seja definido como false
        const timeout = setTimeout(() => {
            console.log('Timeout de segurança ativado, definindo loading como false');
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [courseSlug]);

    const paymentMethods: PaymentMethod[] = [
        {
            id: 'credit_card',
            name: 'Cartão de Crédito',
            icon: CreditCard,
            description: 'Parcelamento em até 12x sem juros',
            processingTime: 'Aprovação imediata',
            popular: true
        },
        {
            id: 'pix',
            name: 'PIX',
            icon: QrCode,
            description: 'Pagamento instantâneo e seguro',
            processingTime: 'Aprovação imediata',
            popular: true
        },
        {
            id: 'boleto',
            name: 'Boleto Bancário',
            icon: Smartphone,
            description: 'Pagamento em até 3 dias úteis',
            processingTime: 'Até 3 dias úteis'
        }
    ];

    const pricingTiers: PricingTier[] = [
        {
            id: 'founder',
            name: 'Fundador',
            price: 97,
            originalPrice: 997,
            discount: 90,
            duration: 'Vitalício',
            features: [
                'Acesso a TODOS os cursos da Fénix',
                'Acesso vitalício garantido',
                'Novos cursos gratuitos para sempre',
                'Projetos práticos ilimitados',
                'Mentoria 1:1 semanal',
                'Certificado premium de fundador',
                'Suporte prioritário 24/7',
                'Comunidade exclusiva de fundadores',
                'Garantia de emprego ou devolução',
                'Badge especial de fundador'
            ],
            popular: true,
            badge: 'LIMITADO - 100.000 vagas'
        },
        {
            id: 'basic',
            name: 'Básico',
            price: 197,
            originalPrice: 397,
            discount: 50,
            duration: '3 meses',
            features: [
                'Acesso a todos os módulos',
                'Exercícios práticos',
                'Suporte por email',
                'Certificado de conclusão'
            ]
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 297,
            originalPrice: 597,
            discount: 50,
            duration: '6 meses',
            features: [
                'Tudo do plano Básico',
                'Projetos práticos',
                'Mentoria 1:1',
                'Certificado premium',
                'Acesso vitalício',
                'Suporte prioritário'
            ]
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: 497,
            originalPrice: 997,
            discount: 50,
            duration: '12 meses',
            features: [
                'Tudo do plano Premium',
                'Projetos reais',
                'Mentoria ilimitada',
                'Certificado profissional',
                'Acesso vitalício',
                'Suporte 24/7',
                'Garantia de emprego'
            ],
            badge: 'Recomendado'
        }
    ];

    const selectedTier = pricingTiers.find(t => t.id === tier) || pricingTiers[1];
    const finalPrice = selectedTier.price - couponDiscount;

    const handlePayment = async () => {
        if (!selectedMethod) {
            setError('Selecione uma forma de pagamento');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Criar intent de pagamento
            const paymentData = {
                course: courseSlug,
                tier: tier,
                method: selectedMethod,
                amount: finalPrice,
                coupon: couponApplied ? couponCode : null
            }

            const response = await fetch('/api/expanded-payments/create-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify(paymentData)
            });

            if (response.ok) {
                const data = await response.json();

                if (data.success) {
                    // Redirecionar para página de sucesso
                    router.push(`/expanded-payment/success?course=${courseSlug}&tier=${tier}&method=${selectedMethod}&payment_id=${data.payment_id}`);
                } else {
                    setError(data.error || 'Erro ao processar pagamento');
                }
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Erro ao processar pagamento');
            }
        } catch (error) {
            console.error('Erro no pagamento:', error);
            setError('Erro ao processar pagamento. Tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    }

    const handleCouponApply = () => {
        if (couponCode.toLowerCase() === 'fenix50') {
            setCouponApplied(true);
            setCouponDiscount(50);
            setError(null);
        } else {
            setError('Cupom inválido');
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <AdvancedParticles />
                <VisualEffects />

                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                        <LoadingSpinner size="lg" />
                        <p className="text-white mt-4 text-lg">Carregando informações do curso...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />
            {/* Header */}
            <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/expanded-course/${courseSlug}`}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Voltar ao Curso</span>
                        </Link>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <div className="flex items-center space-x-4">
                            <FenixLogo size="md" variant="icon" />
                            <h1 className="text-2xl font-bold text-white">Finalizar Compra - Fênix Dev Academy</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Course Info */}
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
                                    <p className="text-gray-300 mb-4">{course.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {course.duration}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {course.students_count?.toLocaleString()} alunos
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            {course.rating}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-400">{course.modules_count}</div>
                                    <div className="text-sm text-gray-400">Módulos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-400">{course.lessons_count}</div>
                                    <div className="text-sm text-gray-400">Aulas</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">{course.exercises_count}</div>
                                    <div className="text-sm text-gray-400">Exercícios</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">{course.projects_count}</div>
                                    <div className="text-sm text-gray-400">Projetos</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {course.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-white/10 text-gray-300 px-3 py-1 rounded-lg text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Pricing Tiers */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-4">Escolha seu plano</h3>
                            <div className="space-y-4">
                                {pricingTiers.map((tierOption) => (
                                    <div
                                        key={tierOption.id}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${tier === tierOption.id
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-white/20 hover:border-white/40'
                                            }`}
                                        onClick={() => router.push(`/expanded-payment?course=${courseSlug}&tier=${tierOption.id}`)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-lg font-bold text-white">{tierOption.name}</h4>
                                                {tierOption.badge && (
                                                    <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                                                        {tierOption.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-white">R$ {tierOption.price}</div>
                                                {tierOption.originalPrice && (
                                                    <div className="text-sm text-gray-400 line-through">
                                                        R$ {tierOption.originalPrice}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-300">{tierOption.duration}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="space-y-6">
                        {/* Selected Tier */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-4">Resumo do Pedido</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Plano {selectedTier.name}</span>
                                    <span className="text-white font-bold">R$ {selectedTier.price}</span>
                                </div>
                                {couponApplied && (
                                    <div className="flex justify-between items-center text-green-400">
                                        <span>Desconto ({couponCode})</span>
                                        <span>-R$ {couponDiscount}</span>
                                    </div>
                                )}
                                <div className="border-t border-white/20 pt-4">
                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span className="text-white">Total</span>
                                        <span className="text-blue-400">R$ {finalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Coupon Code */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-4">Cupom de Desconto</h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Digite seu cupom"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleCouponApply}
                                    disabled={couponApplied}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    {couponApplied ? 'Aplicado' : 'Aplicar'}
                                </button>
                            </div>
                            {couponApplied && (
                                <p className="text-green-400 text-sm mt-2">
                                    ✓ Cupom aplicado com sucesso!
                                </p>
                            )}
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-4">Forma de Pagamento</h3>
                            <div className="space-y-3">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedMethod === method.id
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-white/20 hover:border-white/40'
                                            }`}
                                        onClick={() => setSelectedMethod(method.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <method.icon className="w-6 h-6 text-white" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-white font-medium">{method.name}</h4>
                                                    {method.popular && (
                                                        <span className="bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                                                            Popular
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-400 text-sm">{method.description}</p>
                                                <p className="text-gray-500 text-xs">{method.processingTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security Info */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-green-400" />
                                <h3 className="text-lg font-bold text-white">Pagamento Seguro</h3>
                            </div>
                            <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span>Dados criptografados com SSL</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span>Processamento seguro</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span>Garantia de 30 dias</span>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-400" />
                                    <span className="text-red-400">{error}</span>
                                </div>
                            </div>
                        )}

                        {/* Payment Button */}
                        <button
                            onClick={handlePayment}
                            disabled={!selectedMethod || isProcessing}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processando...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    Finalizar Compra - R$ {finalPrice}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}