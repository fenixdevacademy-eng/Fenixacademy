'use client';

import { useState } from 'react';
import {
    CheckCircle,
    Clock,
    Star,
    BookOpen,
    ArrowRight,
    Heart,
    Zap,
    Target,
    Shield,
    Globe,
    Smartphone,
    Monitor,
    DollarSign
} from 'lucide-react';
import Link from 'next/link';

interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    lessons: number;
    price: number;
    originalPrice: number;
    discount: number;
    features: string[];
    image: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
}

export default function ComecarAgoraPage() {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [showUrgency] = useState(true);

    const courses: Course[] = [
        {
            id: 1,
            title: "Fundamentos de Desenvolvimento Web",
            description: "Aprenda HTML, CSS e JavaScript do zero. Construa sites responsivos e interativos.",
            instructor: "Alexandre Mendes",
            duration: "80 horas",
            lessons: 80,
            price: 197,
            originalPrice: 297,
            discount: 34,
            features: [
                "HTML5, CSS3 e JavaScript ES6+",
                "Sites responsivos e modernos",
                "Projetos práticos reais",
                "Certificado reconhecido",
                "Mentoria personalizada",
                "Acesso vitalício"
            ],
            image: "/courses/web-dev.jpg"
        },
        {
            id: 2,
            title: "React.js Avançado",
            description: "Domine React com Hooks, Context API, Redux e padrões avançados.",
            instructor: "Maria Santos",
            duration: "35 horas",
            lessons: 28,
            price: 297,
            originalPrice: 397,
            discount: 25,
            features: [
                "React Hooks e Context API",
                "Redux e gerenciamento de estado",
                "Componentes reutilizáveis",
                "Projetos do mundo real",
                "Suporte especializado",
                "Comunidade exclusiva"
            ],
            image: "/courses/react.jpg"
        },
        {
            id: 3,
            title: "Node.js e APIs RESTful",
            description: "Desenvolva APIs robustas com Node.js, Express e MongoDB.",
            instructor: "Pedro Costa",
            duration: "30 horas",
            lessons: 22,
            price: 247,
            originalPrice: 347,
            discount: 29,
            features: [
                "Node.js e Express.js",
                "APIs RESTful e GraphQL",
                "MongoDB e banco de dados",
                "Autenticação JWT",
                "Deploy em produção",
                "Arquitetura escalável"
            ],
            image: "/courses/nodejs.jpg"
        }
    ];

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Carlos Silva",
            role: "Desenvolvedor Frontend",
            content: "Consegui meu primeiro emprego como desenvolvedor após 3 meses estudando na Fenix. Os projetos práticos fizeram toda a diferença!",
            rating: 5,
            avatar: "/avatars/carlos.jpg"
        },
        {
            id: 2,
            name: "Ana Costa",
            role: "Full Stack Developer",
            content: "A mentoria personalizada me ajudou a entender conceitos complexos de forma simples. Recomendo para todos!",
            rating: 5,
            avatar: "/avatars/ana.jpg"
        },
        {
            id: 3,
            name: "Roberto Lima",
            role: "Tech Lead",
            content: "Investi R$ 197 e hoje ganho R$ 8.000/mês como desenvolvedor. Melhor investimento da minha vida!",
            rating: 5,
            avatar: "/avatars/roberto.jpg"
        }
    ];

    const benefits = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Acesso Imediato",
            description: "Comece a estudar agora mesmo, sem esperas"
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Garantia de 30 Dias",
            description: "Se não gostar, devolvemos 100% do dinheiro"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Pagamento Seguro",
            description: "Transações protegidas e criptografadas"
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Suporte Mundial",
            description: "Atendimento em português e inglês"
        }
    ];

    const paymentMethods = [
        {
            id: 'pix',
            name: 'PIX',
            icon: <Smartphone className="w-5 h-5" />,
            description: 'Pagamento instantâneo',
            processingTime: 'Imediato',
            fees: 'Grátis'
        },
        {
            id: 'stripe',
            name: 'Cartão de Crédito',
            icon: <Monitor className="w-5 h-5" />,
            description: 'Visa, Mastercard, Amex',
            processingTime: '2-3 dias',
            fees: '2.9% + R$ 0.30'
        },
        {
            id: 'paypal',
            name: 'PayPal',
            icon: <Globe className="w-5 h-5" />,
            description: 'Pagamento internacional',
            processingTime: '1-2 dias',
            fees: '3.5% + R$ 0.50'
        },
        {
            id: 'crypto',
            name: 'Criptomoedas',
            icon: <DollarSign className="w-5 h-5" />,
            description: 'Bitcoin, Ethereum, USDT',
            processingTime: '10-30 min',
            fees: '1%'
        }
    ];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-blue-600 hover:text-blue-700">
                                ← Voltar
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Começar Agora</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-red-500" />
                            <span className="text-sm text-red-600 font-medium">Oferta por tempo limitado</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
                        <Target className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Transforme sua Carreira em
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> 90 Dias</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Junte-se aos mais de 1.000 alunos que já transformaram suas vidas com nossos cursos práticos e mentoria personalizada.
                    </p>

                    {/* Urgency Banner */}
                    {showUrgency && (
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                            <div className="flex items-center justify-center space-x-4 mb-4">
                                <Clock className="w-6 h-6" />
                                <span className="text-lg font-semibold">Oferta Especial por Tempo Limitado</span>
                            </div>
                            <div className="flex items-center justify-center space-x-6 text-2xl font-bold">
                                <div>
                                    <span className="line-through opacity-75">R$ 297</span>
                                </div>
                                <div className="text-4xl">R$ 197</div>
                                <div className="bg-green-500 px-4 py-2 rounded-full text-sm">
                                    Economia de R$ 100
                                </div>
                            </div>
                            <p className="text-sm mt-2 opacity-90">
                                ⏰ Apenas para os primeiros 1.000 alunos • Inclui mentoria + certificado
                            </p>
                        </div>
                    )}
                </div>

                {/* Course Selection */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Escolha seu Curso
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${selectedCourse === course.id
                                    ? 'border-blue-500 shadow-blue-100'
                                    : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                onClick={() => setSelectedCourse(course.id)}
                            >
                                <div className="p-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                                        <BookOpen className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h4>
                                    <p className="text-gray-600 mb-4">{course.description}</p>

                                    <div className="space-y-2 mb-6">
                                        {course.features.map((feature, index) => (
                                            <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-500">Instrutor:</span>
                                            <span className="font-medium">{course.instructor}</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-500">Duração:</span>
                                            <span className="font-medium">{course.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-gray-500">Aulas:</span>
                                            <span className="font-medium">{course.lessons} aulas</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-sm text-gray-500 line-through">
                                                    {formatPrice(course.originalPrice)}
                                                </span>
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {formatPrice(course.price)}
                                                </div>
                                            </div>
                                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                -{course.discount}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                {selectedCourse && (
                    <div className="bg-white rounded-xl shadow-lg border p-8 mb-16">
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Pronto para Transformar sua Carreira?
                            </h3>
                            <p className="text-lg text-gray-600">
                                Junte-se aos milhares de alunos que já mudaram suas vidas com a Fenix Academy
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Benefits */}
                            <div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-6">O que você recebe:</h4>
                                <div className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600">
                                                {benefit.icon}
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-gray-900">{benefit.title}</h5>
                                                <p className="text-sm text-gray-600">{benefit.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Options */}
                            <div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-6">Formas de Pagamento:</h4>
                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <div key={method.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600">
                                                    {method.icon}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{method.name}</div>
                                                    <div className="text-sm text-gray-500">{method.description}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-500">{method.processingTime}</div>
                                                <div className="text-xs text-gray-400">{method.fees}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-8 text-center">
                            <Link
                                href={`/payment?course=${selectedCourse}`}
                                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Começar Agora - R$ 197
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <p className="text-sm text-gray-500 mt-4">
                                ⚡ Acesso imediato • 🔒 Pagamento seguro • 💯 Garantia de 30 dias
                            </p>
                        </div>
                    </div>
                )}

                {/* Testimonials */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        O que nossos alunos dizem
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                                <div className="flex items-center space-x-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
                    <h3 className="text-3xl font-bold mb-4">
                        Não perca esta oportunidade única!
                    </h3>
                    <p className="text-xl mb-6 opacity-90">
                        Junte-se aos mais de 1.000 alunos que já transformaram suas carreiras
                    </p>
                    <div className="flex items-center justify-center space-x-6 mb-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold">1.000+</div>
                            <div className="text-sm opacity-75">Alunos formados</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">95%</div>
                            <div className="text-sm opacity-75">Taxa de satisfação</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">R$ 8K</div>
                            <div className="text-sm opacity-75">Salário médio</div>
                        </div>
                    </div>
                    <Link
                        href="/payment"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg"
                    >
                        Quero Começar Agora
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                    <p className="text-sm opacity-75 mt-4">
                        ⏰ Oferta válida apenas para os primeiros 1.000 alunos
                    </p>
                </div>
            </div>
        </div>
    );
} 