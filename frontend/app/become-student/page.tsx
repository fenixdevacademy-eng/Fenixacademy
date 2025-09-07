'use client';

import {
    GraduationCap,
    Users,
    Award,
    BookOpen,
    Clock,
    Star,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function BecomeStudentPage() {
    const benefits = [
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Cursos Completos",
            description: "Acesso a todos os cursos da plataforma com conteúdo atualizado"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Comunidade Exclusiva",
            description: "Grupo de alunos com mentoria e suporte direto"
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Certificados",
            description: "Certificados reconhecidos ao completar os cursos"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Acesso Vitalício",
            description: "Acesso permanente aos cursos e atualizações"
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: "Mentoria Personalizada",
            description: "Sessões de mentoria individuais e em grupo"
        },
        {
            icon: <GraduationCap className="w-6 h-6" />,
            title: "Projetos Práticos",
            description: "Desenvolva projetos reais para seu portfólio"
        }
    ];

    const contactInfo = [
        {
            icon: <Mail className="w-5 h-5" />,
            label: "Email",
            value: "fenixdevacademy@gmail.com",
            link: "mailto:fenixdevacademy@gmail.com"
        },
        {
            icon: <Phone className="w-5 h-5" />,
            label: "WhatsApp",
            value: "+55 (21) 986289597",
            link: "https://wa.me/5521986289597"
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            label: "Localização",
            value: "Itaboraí, RJ - Brasil",
            link: null
        }
    ];

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
                            <h1 className="text-2xl font-bold text-gray-900">Como Se Tornar Aluno</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Torne-se um Aluno da Fenix Academy
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Junte-se à comunidade de desenvolvedores que estão transformando suas carreiras com nossos cursos práticos e mentoria personalizada.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Process Section */}
                <div className="bg-white rounded-xl shadow-sm border p-8 mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Como Funciona
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                                1
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Entre em Contato</h4>
                            <p className="text-gray-600">
                                Envie uma mensagem pelo WhatsApp ou email para conhecer nossos planos
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                                2
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Escolha seu Plano</h4>
                            <p className="text-gray-600">
                                Selecione o curso ou pacote que melhor atende suas necessidades
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                                3
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Comece a Estudar</h4>
                            <p className="text-gray-600">
                                Acesse a plataforma e comece sua jornada de aprendizado
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Entre em Contato
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {contactInfo.map((contact, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600">
                                    {contact.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{contact.label}</p>
                                    {contact.link ? (
                                        <a
                                            href={contact.link}
                                            className="text-gray-900 hover:text-blue-600 transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {contact.value}
                                        </a>
                                    ) : (
                                        <p className="text-gray-900">{contact.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/5521986289597"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Falar no WhatsApp
                        </a>
                        <a
                            href="mailto:fenixdevacademy@gmail.com"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            <Mail className="w-5 h-5 mr-2" />
                            Enviar Email
                        </a>
                    </div>
                </div>

                {/* Pricing Reminder */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">
                        Oferta Especial por Tempo Limitado
                    </h3>
                    <p className="text-xl mb-6">
                        Desconto de R$ 97 para os primeiros 1.000 alunos
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-lg">
                        <span className="line-through opacity-75">R$ 297</span>
                        <span className="text-3xl font-bold">R$ 197</span>
                        <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-medium">
                            Economia de R$ 100
                        </span>
                    </div>
                    <p className="mt-4 text-blue-100">
                        Inclui: Acesso vitalício + Mentoria + Certificado + Suporte
                    </p>
                </div>
            </div>
        </div>
    );
} 