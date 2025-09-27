'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    CheckCircle,
    Download,
    Share2,
    Mail,
    Calendar,
    Clock,
    BookOpen,
    Zap,
    Brain,
    Code,
    Award,
    ArrowRight,
    Home,
    Play,
    Star,
    Shield,
    Gift
} from 'lucide-react';
import { useExpandedCourse } from '@/hooks/useExpandedContent';

interface PaymentDetails {
    course: string;
    tier: string;
    method: string;
    amount: number;
    transactionId: string;
    purchaseDate: string;
}

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const courseSlug = searchParams.get('course') || '';
    const tier = searchParams.get('tier') || '';
    const method = searchParams.get('method') || '';
    const amount = searchParams.get('amount') || '0';

    const { course, loading: courseLoading } = useExpandedCourse(courseSlug);

    useEffect(() => {
        // Simular carregamento dos detalhes do pagamento
        const loadPaymentDetails = async () => {
            setIsLoading(true);

            // Simular delay de carregamento
            await new Promise(resolve => setTimeout(resolve, 1500));

            setPaymentDetails({
                course: courseSlug,
                tier: tier,
                method: method,
                amount: parseFloat(amount),
                transactionId: `TXN-${Date.now()}`,
                purchaseDate: new Date().toISOString()
            });

            setIsLoading(false);
        }

        loadPaymentDetails();
    }, [courseSlug, tier, method, amount]);

    const getTierInfo = (tierId: string) => {
        const tiers: Record<string, { name: string; duration: string; features: string[] }> = {
            basic: {
                name: 'Básico',
                duration: '3 meses',
                features: ['Acesso ao curso completo', 'Exercícios práticos', 'Certificado']
            },
            premium: {
                name: 'Premium',
                duration: '6 meses',
                features: ['Acesso ao curso completo', 'Exercícios + Quizzes', 'Projetos práticos', 'Suporte prioritário']
            },
            vip: {
                name: 'VIP',
                duration: '12 meses',
                features: ['Acesso a TODOS os cursos', 'Mentoria individual', 'Acesso vitalício', 'Comunidade VIP']
            }
        }
        return tiers[tierId] || tiers.premium;
    }

    const getMethodInfo = (methodId: string) => {
        const methods: Record<string, { name: string; icon: React.ReactNode }> = {
            credit_card: { name: 'Cartão de Crédito', icon: <BookOpen className="w-5 h-5" /> },
            pix: { name: 'PIX', icon: <Zap className="w-5 h-5" /> },
            boleto: { name: 'Boleto Bancário', icon: <Calendar className="w-5 h-5" /> }
        }
        return methods[methodId] || methods.credit_card;
    }

    const tierInfo = getTierInfo(tier);
    const methodInfo = getMethodInfo(method);

    if (isLoading || courseLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Processando seu pagamento...</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro no pagamento</h2>
                    <p className="text-gray-600 mb-6">Não foi possível processar seu pagamento.</p>
                    <Link
                        href="/expanded-courses"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Voltar aos Cursos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">
                            🎉 Pagamento Realizado com Sucesso!
                        </h1>
                        <p className="text-xl text-green-100 max-w-2xl mx-auto">
                            Parabéns! Você agora tem acesso completo ao conteúdo expandido.
                            Seu aprendizado está prestes a começar!
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Access */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Seu Acesso Foi Liberado!</h2>

                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                    {course.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                                    <p className="text-gray-600 mb-3">{course.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4" />
                                            <span>Conteúdo Expandido</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Zap className="w-4 h-4" />
                                            <span>3x Mais Detalhado</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{tierInfo.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                <h4 className="font-semibold text-blue-900 mb-2">Plano {tierInfo.name} Ativado</h4>
                                <ul className="space-y-1">
                                    {tierInfo.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm text-blue-800">
                                            <CheckCircle className="w-4 h-4 text-blue-600" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-4">
                                <Link
                                    href={`/expanded-course/${courseSlug}`}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <Play className="w-5 h-5" />
                                    <span>Começar a Estudar Agora</span>
                                </Link>
                                <Link
                                    href="/expanded-dashboard"
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <Award className="w-5 h-5" />
                                    <span>Ver Dashboard</span>
                                </Link>
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Próximos Passos</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-semibold text-sm">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Acesse seu curso</h4>
                                        <p className="text-gray-600 text-sm">Comece imediatamente a estudar com nosso conteúdo expandido</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-green-600 font-semibold text-sm">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Complete os exercícios</h4>
                                        <p className="text-gray-600 text-sm">Pratique com exercícios interativos e quizzes</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-purple-600 font-semibold text-sm">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Receba seu certificado</h4>
                                        <p className="text-gray-600 text-sm">Conclua o curso e ganhe seu certificado de conclusão</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Payment Details */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Detalhes do Pagamento</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Curso:</span>
                                    <span className="text-gray-900 font-medium">{course.title}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Plano:</span>
                                    <span className="text-gray-900 font-medium">{tierInfo.name}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Forma de pagamento:</span>
                                    <div className="flex items-center gap-1">
                                        {methodInfo.icon}
                                        <span className="text-gray-900 font-medium">{methodInfo.name}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Valor:</span>
                                    <span className="text-gray-900 font-medium">R$ {paymentDetails?.amount.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Data:</span>
                                    <span className="text-gray-900 font-medium">
                                        {paymentDetails?.purchaseDate ? new Date(paymentDetails.purchaseDate).toLocaleDateString('pt-BR') : 'Hoje'}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">ID da transação:</span>
                                    <span className="text-gray-500 text-sm font-mono">{paymentDetails?.transactionId}</span>
                                </div>
                            </div>
                        </div>

                        {/* Email Confirmation */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Mail className="w-5 h-5 text-blue-600" />
                                <h3 className="font-semibold text-gray-900">Confirmação por Email</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                                Enviamos um email de confirmação com todos os detalhes da sua compra e instruções de acesso.
                            </p>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Reenviar email
                            </button>
                        </div>

                        {/* Support */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="w-5 h-5 text-green-600" />
                                <h3 className="font-semibold text-gray-900">Precisa de Ajuda?</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                                Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida.
                            </p>
                            <div className="space-y-2">
                                <Link
                                    href="/support"
                                    className="block text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Central de Ajuda
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Contatar Suporte
                                </Link>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/expanded-courses"
                                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span>Ver Outros Cursos</span>
                                </Link>
                                <Link
                                    href="/expanded-exercises"
                                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <Brain className="w-4 h-4" />
                                    <span>Exercícios Práticos</span>
                                </Link>
                                <Link
                                    href="/expanded-quizzes"
                                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <Code className="w-4 h-4" />
                                    <span>Quizzes Interativos</span>
                                </Link>
                                <Link
                                    href="/certificates"
                                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <Award className="w-4 h-4" />
                                    <span>Meus Certificados</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">
                            🚀 Pronto para Revolucionar seu Aprendizado?
                        </h2>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Você agora tem acesso ao conteúdo mais detalhado e prático do mercado.
                            Comece sua jornada de transformação profissional hoje mesmo!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/expanded-course/${courseSlug}`}
                                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <Play className="w-5 h-5" />
                                <span>Começar Agora</span>
                            </Link>
                            <Link
                                href="/expanded-dashboard"
                                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <Award className="w-5 h-5" />
                                <span>Ver Dashboard</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



