'use client';

import { useState } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import {
    HelpCircle,
    MessageCircle,
    Phone,
    Mail,
    Clock,
    CheckCircle,
    Search,
    BookOpen,
    Video,
    Users,
    Zap,
    Shield
} from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

interface SupportChannel {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    available: boolean;
    action: string;
    link: string;
}

const faqData: FAQ[] = [
    {
        question: "Como acessar meus cursos?",
        answer: "Após fazer login, vá para a seção 'Meus Cursos' no menu principal. Todos os cursos que você comprou estarão disponíveis lá."
    },
    {
        question: "Como funciona o sistema de pagamento?",
        answer: "Aceitamos PIX e cartão de crédito. O pagamento é processado de forma segura e você recebe acesso imediato após a confirmação."
    },
    {
        question: "Posso baixar os vídeos dos cursos?",
        answer: "Os vídeos são para visualização online. Isso garante que você sempre tenha acesso ao conteúdo mais atualizado."
    },
    {
        question: "Como obter meu certificado?",
        answer: "Após completar 100% do curso e passar em todas as avaliações, seu certificado será gerado automaticamente na seção 'Certificados'."
    },
    {
        question: "O que fazer se esqueci minha senha?",
        answer: "Use a opção 'Esqueci minha senha' na página de login. Você receberá um email com instruções para redefinir sua senha."
    },
    {
        question: "Os cursos têm prazo de validade?",
        answer: "Não! Uma vez que você compra um curso, ele é seu para sempre. Você pode assistir quantas vezes quiser."
    }
];

const supportChannels: SupportChannel[] = [
    {
        title: "WhatsApp",
        description: "Suporte direto via WhatsApp",
        icon: Phone,
        color: "bg-green-600",
        available: true,
        action: "Conversar",
        link: "https://wa.me/5511999999999"
    },
    {
        title: "Email",
        description: "Suporte por email",
        icon: Mail,
        color: "bg-blue-600",
        available: true,
        action: "Enviar",
        link: "mailto:suporte@fenix.com"
    },
    {
        title: "Chat Online",
        description: "Chat em tempo real",
        icon: MessageCircle,
        color: "bg-purple-600",
        available: false,
        action: "Em breve",
        link: "#"
    }
];

export default function SupportPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const filteredFaqs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <AnimatedComponent
                    duration={500}
                    delay={0}
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Central de Suporte
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Estamos aqui para ajudar você a ter a melhor experiência possível
                        </p>
                    </div>
                </AnimatedComponent>

                {/* Search */}
                <AnimatedComponent
                    duration={500}
                    delay={100}
                >
                    <div className="mb-12">
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Pesquisar perguntas frequentes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </AnimatedComponent>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* FAQ Section */}
                    <div className="lg:col-span-2">
                        <AnimatedComponent
                            duration={500}
                            delay={200}
                        >
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Perguntas Frequentes
                                </h2>
                                <div className="space-y-4">
                                    {filteredFaqs.map((faq, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg"
                                        >
                                            <button
                                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                            >
                                                <span className="font-medium text-gray-900">
                                                    {faq.question}
                                                </span>
                                                <div className="flex items-center">
                                                    {expandedFaq === index ? (
                                                        <span className="text-blue-600">-</span>
                                                    ) : (
                                                        <span className="text-gray-400">+</span>
                                                    )}
                                                </div>
                                            </button>
                                            {expandedFaq === index && (
                                                <div className="px-6 pb-4">
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedComponent>
                    </div>

                    {/* Support Channels */}
                    <div className="space-y-6">
                        <AnimatedComponent
                            duration={500}
                            delay={300}
                        >
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">
                                    Canais de Suporte
                                </h3>
                                <div className="space-y-4">
                                    {supportChannels.map((channel, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className={`p-2 rounded-lg ${channel.color}`}>
                                                    <channel.icon className="h-5 w-5 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">
                                                        {channel.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {channel.description}
                                                    </p>
                                                    <div className="mt-3">
                                                        {channel.available ? (
                                                            <a
                                                                href={channel.link}
                                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                            >
                                                                {channel.action}
                                                            </a>
                                                        ) : (
                                                            <span className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-500 bg-gray-100">
                                                                {channel.action}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedComponent>

                        {/* Quick Help */}
                        <AnimatedComponent
                            duration={500}
                            delay={400}
                        >
                            <div className="bg-blue-50 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-blue-900 mb-4">
                                    Precisa de ajuda rápida?
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-blue-800">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        <span>Verifique nossa FAQ acima</span>
                                    </div>
                                    <div className="flex items-center text-sm text-blue-800">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        <span>Entre em contato via WhatsApp</span>
                                    </div>
                                    <div className="flex items-center text-sm text-blue-800">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        <span>Envie um email para suporte</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedComponent>

                        {/* Features */}
                        <AnimatedComponent
                            duration={500}
                            delay={500}
                        >
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Recursos Disponíveis
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Cursos Online</p>
                                    </div>
                                    <div className="text-center">
                                        <Video className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Vídeos HD</p>
                                    </div>
                                    <div className="text-center">
                                        <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Comunidade</p>
                                    </div>
                                    <div className="text-center">
                                        <Shield className="h-8 w-8 text-red-500 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Seguro</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedComponent>
                    </div>
                </div>
            </div>
        </div>
    );
}