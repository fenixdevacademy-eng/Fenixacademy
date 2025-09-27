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

interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    processingTime: string;
    fees: string;
}

const mockCourses: Course[] = [
    {
        id: 1,
        title: "JavaScript Completo",
        description: "Do zero ao avançado: ES6+, async/await, frameworks modernos e projetos reais.",
        instructor: "João Silva",
        duration: "40 horas",
        lessons: 35,
        price: 197,
        originalPrice: 397,
        discount: 50,
        features: [
            "JavaScript ES6+ e moderno",
            "Async/await e Promises",
            "DOM e manipulação de elementos",
            "Projetos práticos",
            "Suporte vitalício",
            "Certificado de conclusão"
        ],
        image: "/courses/javascript.jpg"
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

const mockTestimonials: Testimonial[] = [
    {
        id: 1,
        name: "Carlos Mendes",
        role: "Desenvolvedor Frontend",
        content: "Consegui meu primeiro emprego como desenvolvedor em 3 meses após completar o curso. A metodologia é incrível!",
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

const benefits: Benefit[] = [
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

const paymentMethods: PaymentMethod[] = [
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

export default function ComecarAgoraPage() {
    const [selectedCourse, setSelectedCourse] = useState<number>(1);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Fenix Academy</span>
                        </div>
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            Voltar ao Início
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Comece Sua Jornada na
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {' '}Programação
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Aprenda as tecnologias mais demandadas do mercado com os melhores instrutores e metodologia comprovada.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>+10.000 alunos formados</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>95% de aprovação</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Suporte 24/7</span>
                        </div>
                    </div>
                </div>

                {/* Urgency Banner */}
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-6 mb-12 text-center">
                    <div className="flex items-center justify-center mb-2">
                        <Zap className="w-5 h-5 mr-2" />
                        <span className="font-semibold">Oferta por Tempo Limitado!</span>
                    </div>
                    <p className="text-lg">
                        Até 50% de desconto em todos os cursos. Oferta válida apenas hoje!
                    </p>
                </div>

                {/* Course Selection */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {mockCourses.map((course) => (
                        <div
                            key={course.id}
                            className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${selectedCourse === course.id
                                    ? 'border-blue-500 transform scale-105'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                            onClick={() => setSelectedCourse(course.id)}
                        >
                            <div className="p-6">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                        <BookOpen className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h4>
                                    <p className="text-gray-600 mb-4">{course.description}</p>
                                </div>

                                <div className="space-y-2 mb-6">
                                    {course.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4 mb-6">
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
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center justify-center mb-2">
                                        <span className="text-sm text-gray-500 line-through mr-2">
                                            {formatPrice(course.originalPrice)}
                                        </span>
                                        <span className="text-2xl font-bold text-gray-900">
                                            {formatPrice(course.price)}
                                        </span>
                                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                                            -{course.discount}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Por que escolher a Fenix Academy?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Nossa metodologia única combina teoria e prática para acelerar seu aprendizado
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

                    {/* Payment Options */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Formas de Pagamento</h3>
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

                    {/* CTA Buttons */}
                    <div className="text-center">
                        <Link
                            href={`/payment?course=${selectedCourse}`}
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Começar Agora
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <p className="text-sm text-gray-500 mt-4">
                            Garantia de 30 dias • Suporte 24/7 • Acesso vitalício
                        </p>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        O que nossos alunos dizem
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {mockTestimonials.map((testimonial) => (
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
                <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Pronto para transformar sua carreira?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Junte-se a milhares de desenvolvedores que já mudaram suas vidas com a Fenix Academy
                    </p>
                    <Link
                        href={`/payment?course=${selectedCourse}`}
                        className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Começar Agora
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}