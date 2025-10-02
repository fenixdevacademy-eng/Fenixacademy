'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageWrapperFunctional } from '@/components/PageWrapperFunctional';
import { courses } from '@/lib/courses-data';
import { useCurrency } from '@/hooks/useCurrency';
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
    AlertCircle,
    Loader2,
    Users,
    Play,
    Gift,
    FileText,
    Sparkles,
    Target,
    Heart,
    Copy,
    X,
    Check,
    Globe
} from 'lucide-react';
import FenixLogo from '@/components/FenixLogo';

interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    processingTime: string;
    popular?: boolean;
}

// Sistema de oferta especial para os 10 mil primeiros alunos
const DISCOUNT_THRESHOLD = 10000;
const SPECIAL_PRICE = 97; // R$ 97 por TODOS os cursos

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const courseId = searchParams?.get('course') || '1';
    const {
        currencies,
        selectedCurrency,
        setSelectedCurrency,
        convertCurrency,
        formatCurrency,
        getCurrencySymbol,
        getCurrencyFlag,
        loading: currencyLoading
    } = useCurrency();

    const [course, setCourse] = useState<any>(null);
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [discountInfo, setDiscountInfo] = useState({ available: true, studentsCount: 0 });
    const [showPixInfo, setShowPixInfo] = useState(false);
    const [pixCopied, setPixCopied] = useState(false);
    const [showCardForm, setShowCardForm] = useState(false);
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
        installments: 1
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [invoiceData, setInvoiceData] = useState<any>(null);
    const [convertedPrice, setConvertedPrice] = useState<number>(0);
    const [showCurrencySelector, setShowCurrencySelector] = useState(false);

    const paymentMethods: PaymentMethod[] = [
        {
            id: 'pix',
            name: 'PIX',
            icon: QrCode,
            description: 'Pagamento instantâneo e seguro',
            processingTime: 'Aprovação imediata',
            popular: true
        },
        {
            id: 'credit_card',
            name: 'Cartão de Crédito',
            icon: CreditCard,
            description: 'Parcelamento em até 12x sem juros',
            processingTime: 'Aprovação imediata',
            popular: true
        },
        {
            id: 'boleto',
            name: 'Boleto Bancário',
            icon: FileText,
            description: 'Pagamento em até 3 dias úteis',
            processingTime: 'Até 3 dias úteis'
        }
    ];

    useEffect(() => {
        const loadCourse = async () => {
            try {
                setLoading(true);

                // Buscar curso pelos dados reais
                const courseData = courses.find(c => c.id === courseId);
                if (!courseData) {
                    router.push('/courses');
                    return;
                }

                // Verificar disponibilidade da oferta especial
                try {
                    const response = await fetch('/api/discount-status');
                    if (response.ok) {
                        const data = await response.json();
                        setDiscountInfo({
                            available: data.studentsCount < DISCOUNT_THRESHOLD,
                            studentsCount: data.studentsCount
                        });
                    }
                } catch (error) {
                    console.error('Erro ao verificar oferta especial:', error);
                }

                setCourse(courseData);
            } catch (error) {
                console.error('Erro ao carregar curso:', error);
                router.push('/courses');
            } finally {
                setLoading(false);
            }
        }

        loadCourse();
    }, [courseId, router]);

    // Converter preço quando a moeda muda
    useEffect(() => {
        if (course && selectedCurrency) {
            const convertPrice = async () => {
                const originalPrice = course.price; // Preço em BRL
                const conversion = await convertCurrency('BRL', selectedCurrency, originalPrice);
                if (conversion) {
                    setConvertedPrice(conversion.convertedAmount);
                }
            }
            convertPrice();
        }
    }, [course, selectedCurrency, convertCurrency]);

    const handlePayment = async () => {
        if (!selectedMethod) {
            setError('Selecione uma forma de pagamento');
            return;
        }

        // Se for PIX, mostrar informações do PIX
        if (selectedMethod === 'pix') {
            setShowPixInfo(true);
            return;
        }

        // Se for cartão de crédito, mostrar formulário
        if (selectedMethod === 'credit_card') {
            setShowCardForm(true);
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Calcular preços - oferta especial: R$ 97 por TODOS os cursos
            const originalPrice = course.price * 100; // Converter para centavos
            const finalPrice = discountInfo.available ? SPECIAL_PRICE * 100 : originalPrice;
            const discountAmount = discountInfo.available ? originalPrice - finalPrice : 0;

            const paymentData = {
                courseId: 'all-courses', // Acesso a todos os cursos
                method: selectedMethod,
                amount: finalPrice,
                originalPrice: originalPrice,
                discount: discountAmount,
                isSpecialOffer: discountInfo.available
            }

            const response = await fetch('/api/course-access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    courseId: 'all-courses',
                    paymentData,
                    userId: 'current-user-id'
                })});

            if (response.ok) {
                // Redirecionar para o curso com acesso liberado
                router.push(`/dashboard?access=all-courses`);
            } else {
                throw new Error('Erro ao processar pagamento');
            }
        } catch (error) {
            console.error('Erro no pagamento:', error);
            setError('Erro ao processar pagamento. Tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    }

    const copyPixKey = async () => {
        try {
            await navigator.clipboard.writeText('21986289597');
            setPixCopied(true);
            setTimeout(() => setPixCopied(false), 3000);
        } catch (error) {
            console.error('Erro ao copiar chave PIX:', error);
            alert('Erro ao copiar chave PIX. Tente novamente.');
        }
    }

    const confirmPixPayment = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            // Calcular preços - oferta especial: R$ 97 por TODOS os cursos
            const originalPrice = course.price * 100; // Converter para centavos
            const finalPrice = discountInfo.available ? SPECIAL_PRICE * 100 : originalPrice;
            const discountAmount = discountInfo.available ? originalPrice - finalPrice : 0;

            const response = await fetch('/api/payments/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    courseId: 'all-courses',
                    paymentMethod: 'pix',
                    amount: convertedPrice || course.price,
                    currency: selectedCurrency,
                    pixData: {
                        key: '21986289597'
                    },
                    userEmail: 'user@example.com',
                    userName: 'Usuário'
                })});

            if (response.ok) {
                // Redirecionar para o curso com acesso liberado
                router.push(`/dashboard?access=all-courses`);
            } else {
                throw new Error('Erro ao processar pagamento');
            }
        } catch (error) {
            console.error('Erro no pagamento:', error);
            setError('Erro ao processar pagamento. Tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    }

    const validateCardData = () => {
        if (!cardData.number || cardData.number.replace(/\s/g, '').length < 16) {
            setError('Número do cartão inválido');
            return false;
        }
        if (!cardData.name || cardData.name.length < 3) {
            setError('Nome no cartão inválido');
            return false;
        }
        if (!cardData.expiry || !/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
            setError('Data de validade inválida (MM/AA)');
            return false;
        }
        if (!cardData.cvv || cardData.cvv.length < 3) {
            setError('CVV inválido');
            return false;
        }
        return true;
    }

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    }

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    }

    const confirmCardPayment = async () => {
        if (!validateCardData()) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Calcular preços - oferta especial: R$ 97 por TODOS os cursos
            const originalPrice = course.price * 100; // Converter para centavos
            const finalPrice = discountInfo.available ? SPECIAL_PRICE * 100 : originalPrice;
            const discountAmount = discountInfo.available ? originalPrice - finalPrice : 0;

            const response = await fetch('/api/payments/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    courseId: 'all-courses',
                    paymentMethod: selectedMethod,
                    amount: convertedPrice || course.price,
                    currency: selectedCurrency,
                    cardData: selectedMethod === 'credit_card' ? {
                        number: cardData.number.replace(/\s/g, ''),
                        name: cardData.name,
                        expiry: cardData.expiry,
                        cvv: cardData.cvv,
                        installments: cardData.installments
                    } : undefined,
                    userEmail: 'user@example.com',
                    userName: 'Usuário'
                })});

            if (response.ok) {
                const result = await response.json();
                setInvoiceData(result.invoice);
                setPaymentSuccess(true);
                setShowPixInfo(false);
            } else {
                throw new Error('Erro ao processar pagamento');
            }
        } catch (error) {
            console.error('Erro no pagamento:', error);
            setError('Erro ao processar pagamento. Tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    }

    if (loading) {
        return (
            <PageWrapperFunctional>
                <div className="min-h-screen theme-bg flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 theme-primary mx-auto mb-4"></div>
                        <p className="theme-text">Carregando informações do curso...</p>
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
                        <Link
                            href="/courses"
                            className="theme-gradient-primary text-white px-6 py-3 rounded-lg"
                        >
                            Voltar aos Cursos
                        </Link>
                    </div>
                </div>
            </PageWrapperFunctional>
        );
    }

    // Calcular preços - oferta especial: R$ 97 por TODOS os cursos
    const originalPrice = course.price;
    const finalPrice = discountInfo.available ? SPECIAL_PRICE : originalPrice;
    const discountAmount = discountInfo.available ? originalPrice - finalPrice : 0;

    return (
        <PageWrapperFunctional>
            <div className="min-h-screen theme-bg">
                {/* Header com oferta especial */}
                {discountInfo.available && (
                    <div className="theme-gradient-primary text-white py-4">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <Gift className="w-6 h-6" />
                                <span className="text-lg font-bold">OFERTA FUNDADOR!</span>
                            </div>
                            <p className="text-sm">
                                R$ 97 por TODOS os cursos da Fênix com acesso vitalício!
                                Apenas {DISCOUNT_THRESHOLD - discountInfo.studentsCount} vagas restantes.
                            </p>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href={`/course/${course.slug}`}
                            className="flex items-center gap-2 theme-text-secondary hover:theme-primary transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Voltar ao Curso</span>
                        </Link>
                        <div className="h-6 w-px theme-border"></div>
                        <div className="flex items-center space-x-4">
                            <FenixLogo size="md" variant="icon" />
                            <h1 className="text-2xl font-bold theme-text">Finalizar Compra</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Course Info */}
                        <div className="theme-surface rounded-lg shadow-lg p-6 border theme-border">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-10 h-10 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold theme-text mb-2">
                                        {discountInfo.available ? 'ACESSO COMPLETO FÊNIX ACADEMY' : course.title}
                                    </h2>
                                    <p className="theme-text-secondary mb-4">
                                        {discountInfo.available
                                            ? 'Acesso vitalício a TODOS os 26 cursos da Fênix Academy com mentoria ilimitada, certificados e muito mais!'
                                            : course.description
                                        }
                                    </p>
                                    <div className="flex items-center gap-4 text-sm theme-text-secondary">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {discountInfo.available ? 'Acesso Vitalício' : course.duration}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {discountInfo.available ? '26 Cursos' : `${course.students?.toLocaleString()} alunos`}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            {discountInfo.available ? '5.0' : course.rating}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold theme-primary">
                                        {discountInfo.available ? '26' : (course.modules?.length || 0)}
                                    </div>
                                    <div className="text-sm theme-text-secondary">
                                        {discountInfo.available ? 'Cursos Completos' : 'Módulos'}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold theme-primary">
                                        {discountInfo.available ? '500+' : (course.lessons?.length || 0)}
                                    </div>
                                    <div className="text-sm theme-text-secondary">
                                        {discountInfo.available ? 'Aulas Totais' : 'Aulas'}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold theme-primary">
                                        {discountInfo.available ? '∞' : (course.exercises?.length || 0)}
                                    </div>
                                    <div className="text-sm theme-text-secondary">
                                        {discountInfo.available ? 'Mentorias' : 'Exercícios'}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold theme-primary">
                                        {discountInfo.available ? '26' : (course.projects?.length || 0)}
                                    </div>
                                    <div className="text-sm theme-text-secondary">
                                        {discountInfo.available ? 'Certificados' : 'Projetos'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {discountInfo.available ? (
                                    <>
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium">
                                            Acesso Vitalício
                                        </span>
                                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-sm font-medium">
                                            Mentoria Ilimitada
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                                            26 Certificados
                                        </span>
                                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg text-sm font-medium">
                                            Projetos Práticos
                                        </span>
                                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-lg text-sm font-medium">
                                            Suporte 24/7
                                        </span>
                                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-sm font-medium">
                                            Comunidade VIP
                                        </span>
                                    </>
                                ) : (
                                    course.tags?.map((tag: string, index: number) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="space-y-6">
                            {/* Pricing */}
                            <div className="theme-surface rounded-lg shadow-lg p-6 border theme-border">
                                <h3 className="text-xl font-bold theme-text mb-4">
                                    {discountInfo.available ? 'Oferta Fundador' : 'Resumo do Pedido'}
                                </h3>
                                <div className="space-y-4">
                                    {discountInfo.available ? (
                                        <>
                                            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Gift className="w-5 h-5 text-green-600" />
                                                    <span className="font-bold text-green-800">OFERTA ESPECIAL ATIVA!</span>
                                                </div>
                                                <p className="text-sm text-green-700">
                                                    Acesso vitalício a TODOS os 26 cursos da Fênix Academy
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="theme-text-secondary">Valor total dos cursos:</span>
                                                <span className="text-lg line-through text-gray-500">
                                                    R$ 15.997,00
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="theme-text-secondary">Desconto fundador:</span>
                                                <span className="text-lg text-green-600 flex items-center">
                                                    <Gift className="w-4 h-4 mr-1" />
                                                    -R$ 15.900,00
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="theme-text-secondary">Preço original:</span>
                                                <span className="text-lg line-through text-gray-500">
                                                    R$ {originalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                    {/* Seletor de Moeda */}
                                    <div className="border-t theme-border pt-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="theme-text font-medium">Moeda:</span>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowCurrencySelector(!showCurrencySelector)}
                                                    className="flex items-center gap-2 px-3 py-2 border theme-border rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="text-lg">{getCurrencyFlag(selectedCurrency)}</span>
                                                    <span className="font-medium">{selectedCurrency}</span>
                                                    <Globe className="w-4 h-4" />
                                                </button>

                                                {showCurrencySelector && (
                                                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border theme-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                                        {currencies.map((currency) => (
                                                            <button
                                                                key={currency.code}
                                                                onClick={() => {
                                                                    setSelectedCurrency(currency.code);
                                                                    setShowCurrencySelector(false);
                                                                }}
                                                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${selectedCurrency === currency.code ? 'bg-blue-50' : ''
                                                                    }`}
                                                            >
                                                                <span className="text-lg">{currency.flag}</span>
                                                                <div className="flex-1 text-left">
                                                                    <div className="font-medium">{currency.code}</div>
                                                                    <div className="text-sm text-gray-500">{currency.name}</div>
                                                                </div>
                                                                <span className="text-sm font-medium">{currency.symbol}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-xl font-bold">
                                            <span className="theme-text">
                                                {discountInfo.available ? 'Você paga apenas:' : 'Total:'}
                                            </span>
                                            <span className="theme-gradient-primary bg-clip-text text-transparent">
                                                {formatCurrency(convertedPrice || finalPrice, selectedCurrency)}
                                            </span>
                                        </div>
                                        {selectedCurrency !== 'BRL' && (
                                            <div className="text-sm text-gray-500 text-right mt-1">
                                                ≈ R$ {finalPrice.toFixed(2)} (BRL)
                                            </div>
                                        )}
                                    </div>
                                    {discountInfo.available && (
                                        <div className="text-center text-sm theme-text-secondary">
                                            <p>✅ Acesso vitalício garantido</p>
                                            <p>✅ Novos cursos inclusos automaticamente</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="theme-surface rounded-lg shadow-lg p-6 border theme-border">
                                <h3 className="text-xl font-bold theme-text mb-4">Forma de Pagamento</h3>
                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${selectedMethod === method.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            onClick={() => setSelectedMethod(method.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <method.icon className="w-6 h-6 theme-text" />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="theme-text font-medium">{method.name}</h4>
                                                        {method.popular && (
                                                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                                                Popular
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="theme-text-secondary text-sm">{method.description}</p>
                                                    <p className="text-gray-500 text-xs">{method.processingTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Security Info */}
                            <div className="theme-surface rounded-lg shadow-lg p-6 border theme-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="w-6 h-6 text-green-500" />
                                    <h3 className="text-lg font-bold theme-text">Pagamento Seguro</h3>
                                </div>
                                <div className="space-y-2 text-sm theme-text-secondary">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Dados criptografados com SSL</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Processamento seguro</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Garantia de 7 dias</span>
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                        <span className="text-red-700">{error}</span>
                                    </div>
                                </div>
                            )}

                            {/* PIX Information Modal */}
                            {showPixInfo && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                    <div className="theme-surface rounded-lg shadow-xl max-w-md w-full p-6 border theme-border">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-bold theme-text">Pagamento via PIX</h3>
                                            <button
                                                onClick={() => setShowPixInfo(false)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="text-center">
                                                <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                                                    <div className="text-center">
                                                        <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-1" />
                                                        <p className="text-xs text-gray-500">QR Code</p>
                                                    </div>
                                                </div>
                                                <p className="theme-text-secondary text-sm mb-4">
                                                    Escaneie o QR Code ou use a chave PIX abaixo:
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium theme-text-secondary">Chave PIX:</label>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="font-mono text-lg font-bold theme-text">21986289597</span>
                                                        <button
                                                            onClick={copyPixKey}
                                                            className={`p-2 rounded transition-colors ${pixCopied
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                                                }`}
                                                        >
                                                            {pixCopied ? (
                                                                <Check className="w-4 h-4" />
                                                            ) : (
                                                                <Copy className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {pixCopied && (
                                                        <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                                                            <Check className="w-3 h-3" />
                                                            Chave PIX copiada!
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="text-sm font-medium theme-text-secondary">Banco:</label>
                                                    <p className="font-medium theme-text">Santander</p>
                                                </div>

                                                <div>
                                                    <label className="text-sm font-medium theme-text-secondary">Valor:</label>
                                                    <p className="text-2xl font-bold theme-gradient-primary bg-clip-text text-transparent">
                                                        R$ {finalPrice.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <div className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                                                    <div className="text-sm text-blue-800">
                                                        <p className="font-medium mb-1">Instruções:</p>
                                                        <ul className="space-y-1 text-xs">
                                                            <li>• Copie a chave PIX e cole no seu app bancário</li>
                                                            <li>• Confirme o valor exato: R$ {finalPrice.toFixed(2)}</li>
                                                            <li>• Após o pagamento, clique em "Confirmar Pagamento"</li>
                                                            <li>• Seu acesso será liberado automaticamente</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setShowPixInfo(false)}
                                                    className="flex-1 px-4 py-2 border theme-border rounded-lg theme-text hover:bg-gray-50 transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={confirmPixPayment}
                                                    disabled={isProcessing}
                                                    className="flex-1 theme-gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                >
                                                    {isProcessing ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            Processando...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Check className="w-4 h-4" />
                                                            Confirmar Pagamento
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Card Payment Modal */}
                            {showCardForm && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                    <div className="theme-surface rounded-lg shadow-xl max-w-md w-full p-6 border theme-border">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-bold theme-text">Pagamento com Cartão</h3>
                                            <button
                                                onClick={() => setShowCardForm(false)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <CreditCard className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <p className="theme-text-secondary text-sm mb-4">
                                                    Preencha os dados do seu cartão de crédito
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium theme-text-secondary mb-1">
                                                        Número do Cartão
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="1234 5678 9012 3456"
                                                        value={cardData.number}
                                                        onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                                                        className="w-full px-3 py-2 border theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        maxLength={19}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium theme-text-secondary mb-1">
                                                        Nome no Cartão
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="JOÃO DA SILVA"
                                                        value={cardData.name}
                                                        onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                                                        className="w-full px-3 py-2 border theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium theme-text-secondary mb-1">
                                                            Validade
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="MM/AA"
                                                            value={cardData.expiry}
                                                            onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                                                            className="w-full px-3 py-2 border theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            maxLength={5}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium theme-text-secondary mb-1">
                                                            CVV
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="123"
                                                            value={cardData.cvv}
                                                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                                                            className="w-full px-3 py-2 border theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            maxLength={4}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium theme-text-secondary mb-1">
                                                        Parcelamento
                                                    </label>
                                                    <select
                                                        value={cardData.installments}
                                                        onChange={(e) => setCardData({ ...cardData, installments: parseInt(e.target.value) })}
                                                        className="w-full px-3 py-2 border theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                                                            <option key={num} value={num}>
                                                                {num}x de R$ {(finalPrice / num / 100).toFixed(2)} sem juros
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <div className="flex items-start gap-2">
                                                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                                                    <div className="text-sm text-blue-800">
                                                        <p className="font-medium mb-1">Pagamento Seguro</p>
                                                        <ul className="space-y-1 text-xs">
                                                            <li>• Dados criptografados com SSL</li>
                                                            <li>• Processamento seguro</li>
                                                            <li>• Garantia de 7 dias</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setShowCardForm(false)}
                                                    className="flex-1 px-4 py-2 border theme-border rounded-lg theme-text hover:bg-gray-50 transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={confirmCardPayment}
                                                    disabled={isProcessing}
                                                    className="flex-1 theme-gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                >
                                                    {isProcessing ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            Processando...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Check className="w-4 h-4" />
                                                            Confirmar Pagamento
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Payment Success Modal */}
                            {paymentSuccess && invoiceData && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                    <div className="theme-surface rounded-lg shadow-xl max-w-lg w-full p-6 border theme-border">
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle className="w-8 h-8 text-green-600" />
                                            </div>
                                            <h3 className="text-2xl font-bold theme-text mb-2">Pagamento Aprovado!</h3>
                                            <p className="theme-text-secondary">
                                                Seu acesso foi liberado com sucesso
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                            <h4 className="font-bold theme-text mb-3">Dados da Fatura</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="theme-text-secondary">Número da Fatura:</span>
                                                    <span className="font-mono theme-text">{invoiceData.invoiceNumber}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="theme-text-secondary">Valor:</span>
                                                    <span className="font-bold theme-text">
                                                        R$ {(invoiceData.finalAmount / 100).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="theme-text-secondary">Forma de Pagamento:</span>
                                                    <span className="theme-text">
                                                        {invoiceData.paymentMethod === 'pix' ? 'PIX' :
                                                            invoiceData.paymentMethod === 'credit_card' ? 'Cartão de Crédito' :
                                                                'Boleto'}
                                                    </span>
                                                </div>
                                                {invoiceData.installments > 1 && (
                                                    <div className="flex justify-between">
                                                        <span className="theme-text-secondary">Parcelamento:</span>
                                                        <span className="theme-text">
                                                            {invoiceData.installments}x de R$ {(invoiceData.installmentValue / 100).toFixed(2)}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span className="theme-text-secondary">Data de Emissão:</span>
                                                    <span className="theme-text">
                                                        {new Date(invoiceData.issueDate).toLocaleDateString('pt-BR')}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="theme-text-secondary">Status:</span>
                                                    <span className="text-green-600 font-bold">Pago</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                            <div className="flex items-start gap-2">
                                                <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                                                <div className="text-sm text-blue-800">
                                                    <p className="font-medium mb-1">Acesso Liberado!</p>
                                                    <p className="text-xs">
                                                        Você agora tem acesso vitalício a todos os 26 cursos da Fênix Academy,
                                                        incluindo mentoria ilimitada, certificados e muito mais!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setPaymentSuccess(false);
                                                    setInvoiceData(null);
                                                    router.push('/dashboard?access=all-courses');
                                                }}
                                                className="flex-1 theme-gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                            >
                                                <BookOpen className="w-4 h-4" />
                                                Acessar Cursos
                                            </button>
                                            <button
                                                onClick={() => {
                                                    // Simular download da fatura
                                                    const invoiceText = `
FATURA FÊNIX ACADEMY
====================

Número: ${invoiceData.invoiceNumber}
Data: ${new Date(invoiceData.issueDate).toLocaleDateString('pt-BR')}
Cliente: ${invoiceData.customerName}

Descrição: ${invoiceData.courseTitle}
Valor Original: R$ ${(invoiceData.amount / 100).toFixed(2)}
Desconto: R$ ${(invoiceData.discount / 100).toFixed(2)}
Valor Final: R$ ${(invoiceData.finalAmount / 100).toFixed(2)}

Forma de Pagamento: ${invoiceData.paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito'}
Status: Pago

Obrigado por escolher a Fênix Academy!
                                    `;

                                                    const blob = new Blob([invoiceText], { type: 'text/plain' });
                                                    const url = window.URL.createObjectURL(blob);
                                                    const a = document.createElement('a');
                                                    a.href = url;
                                                    a.download = `fatura-${invoiceData.invoiceNumber}.txt`;
                                                    a.click();
                                                    window.URL.revokeObjectURL(url);
                                                }}
                                                className="flex-1 px-4 py-2 border theme-border rounded-lg theme-text hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Baixar Fatura
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Payment Button */}
                            <button
                                onClick={handlePayment}
                                disabled={!selectedMethod || isProcessing}
                                className="w-full theme-gradient-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processando...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5" />
                                        {discountInfo.available
                                            ? `Garantir Acesso Completo - R$ ${finalPrice.toFixed(2)}`
                                            : `Finalizar Compra - R$ ${finalPrice.toFixed(2)}`
                                        }
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapperFunctional>
    );
}