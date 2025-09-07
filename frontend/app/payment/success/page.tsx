'use client';

import { useState, useEffect } from 'react';
import {
    CheckCircle,
    Download,
    Play,
    Users,
    Award,
    MessageCircle,
    ArrowRight,
    Star,
    Calendar,
    Clock,
    Mail,
    Phone
} from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
    const [countdown, setCountdown] = useState(5);
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setShowWelcome(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const courseData = {
        title: "Python para Iniciantes",
        instructor: "Alexandre Mendes",
        duration: "80 horas",
        lessons: 80,
        price: "R$ 197,00",
        startDate: new Date().toLocaleDateString('pt-BR'),
        certificate: true
    };

    const nextSteps = [
        {
            icon: <Play className="w-6 h-6" />,
            title: "Começar o Curso",
            description: "Acesse o primeiro módulo e comece sua jornada",
            action: "Ir para o curso",
            href: "/dashboard"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Juntar-se à Comunidade",
            description: "Conecte-se com outros alunos e instrutores",
            action: "Acessar comunidade",
            href: "/community"
        },
        {
            icon: <Download className="w-6 h-6" />,
            title: "Baixar Materiais",
            description: "Acesse exercícios, projetos e recursos extras",
            action: "Ver materiais",
            href: "/materials"
        }
    ];

    const supportInfo = [
        {
            icon: <Mail className="w-5 h-5" />,
            label: "Email",
            value: "fenixdevacademy@gmail.com",
            href: "mailto:fenixdevacademy@gmail.com"
        },
        {
            icon: <Phone className="w-5 h-5" />,
            label: "WhatsApp",
            value: "+55 (21) 98628-9597",
            href: "https://wa.me/5521986289597"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
            {/* Header de Sucesso */}
            <div className="bg-green-500/20 backdrop-blur-sm border-b border-green-500/30">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Pagamento Aprovado!
                        </h1>
                        <p className="text-green-200 text-xl">
                            Parabéns! Você agora tem acesso completo ao curso
                        </p>
                        {countdown > 0 && (
                            <p className="text-gray-300 mt-2">
                                Redirecionando para o dashboard em {countdown} segundos...
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Informações do Curso */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        {/* Detalhes do Curso */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <h2 className="text-2xl font-bold text-white mb-6">Detalhes da Compra</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                                        <div>
                                            <h3 className="text-white font-semibold">{courseData.title}</h3>
                                            <p className="text-gray-300 text-sm">Instrutor: {courseData.instructor}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-400 font-bold">{courseData.price}</p>
                                            <p className="text-gray-400 text-sm">Pago com sucesso</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-white/5 rounded-lg">
                                            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                            <p className="text-white font-semibold">{courseData.duration}</p>
                                            <p className="text-gray-400 text-sm">Duração</p>
                                        </div>
                                        <div className="text-center p-4 bg-white/5 rounded-lg">
                                            <Play className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                            <p className="text-white font-semibold">{courseData.lessons}</p>
                                            <p className="text-gray-400 text-sm">Aulas</p>
                                        </div>
                                        <div className="text-center p-4 bg-white/5 rounded-lg">
                                            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                                            <p className="text-white font-semibold">Sim</p>
                                            <p className="text-gray-400 text-sm">Certificado</p>
                                        </div>
                                        <div className="text-center p-4 bg-white/5 rounded-lg">
                                            <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                            <p className="text-white font-semibold">{courseData.startDate}</p>
                                            <p className="text-gray-400 text-sm">Início</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Próximos Passos */}
                        <div className="space-y-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold text-white mb-4">Próximos Passos</h3>
                                <div className="space-y-4">
                                    {nextSteps.map((step, index) => (
                                        <Link
                                            key={index}
                                            href={step.href}
                                            className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                                                    {step.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-white font-semibold">{step.title}</h4>
                                                    <p className="text-gray-300 text-sm">{step.description}</p>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Suporte */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold text-white mb-4">Precisa de Ajuda?</h3>
                                <div className="space-y-3">
                                    {supportInfo.map((info, index) => (
                                        <a
                                            key={index}
                                            href={info.href}
                                            className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                                        >
                                            <div className="p-2 bg-green-500/20 rounded-lg">
                                                {info.icon}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white font-semibold">{info.label}</p>
                                                <p className="text-gray-300 text-sm">{info.value}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benefícios */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">O que você ganhou</h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Play className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Acesso Vitalício</h3>
                                <p className="text-gray-300 text-sm">Acesse o curso quando quiser, sem limites</p>
                            </div>

                            <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Certificado</h3>
                                <p className="text-gray-300 text-sm">Certificado reconhecido pelo mercado</p>
                            </div>

                            <div className="text-center p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg">
                                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Comunidade</h3>
                                <p className="text-gray-300 text-sm">Conecte-se com outros desenvolvedores</p>
                            </div>

                            <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Suporte</h3>
                                <p className="text-gray-300 text-sm">Suporte personalizado quando precisar</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                            Começar a Estudar Agora
                            <ArrowRight className="w-6 h-6 ml-2" />
                        </Link>

                        <p className="text-gray-300 mt-4">
                            Ou <Link href="/courses" className="text-blue-400 hover:underline">explorar outros cursos</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal de Boas-vindas */}
            {showWelcome && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md mx-4 border border-white/20">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Bem-vindo à Fenix Academy!</h3>
                            <p className="text-gray-300 mb-6">
                                Você deu o primeiro passo para transformar sua carreira.
                                Estamos aqui para apoiar sua jornada de aprendizado.
                            </p>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                            >
                                Começar Agora
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 