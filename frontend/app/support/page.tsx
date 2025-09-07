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

const faqData = [
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

const supportChannels = [
    {
        title: "Chat Online",
        description: "Resposta em até 5 minutos",
        icon: MessageCircle,
        color: "bg-green-500",
        available: true,
        action: "Iniciar Chat"
    },
    {
        title: "WhatsApp",
        description: "Suporte direto via WhatsApp",
        icon: Phone,
        color: "bg-green-600",
        available: true,
        action: "Enviar Mensagem",
        link: "https://wa.me/5521986289597"
    },
    {
        title: "Email",
        description: "Resposta em até 24 horas",
        icon: Mail,
        color: "bg-blue-500",
        available: true,
        action: "Enviar Email",
        link: "mailto:fenixdevacademy@gmail.com"
    },
    {
        title: "Central de Ajuda",
        description: "Artigos e tutoriais",
        icon: BookOpen,
        color: "bg-purple-500",
        available: true,
        action: "Acessar"
    }
];

export default function SupportPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const filteredFaq = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                    >
                        <div className="flex justify-center mb-6">
                            <HelpCircle className="w-16 h-16" />
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            Central de Suporte
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
                            Estamos aqui para ajudar você a ter a melhor experiência possível
                        </p>
                    </AnimatedComponent>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                {/* Search Section */}
                <AnimatedComponent
                    animation="slideUp"
                    duration={0.8}
                    delay={0.2}
                    className="max-w-2xl mx-auto mb-12"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Pesquisar nas perguntas frequentes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        />
                    </div>
                </AnimatedComponent>

                {/* Support Channels */}
                <AnimatedComponent
                    animation="slideUp"
                    duration={0.8}
                    delay={0.4}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Canais de Suporte
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {supportChannels.map((channel, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 ${channel.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                                    <channel.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{channel.title}</h3>
                                <p className="text-gray-600 mb-4">{channel.description}</p>
                                {channel.link ? (
                                    <a
                                        href={channel.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {channel.action}
                                    </a>
                                ) : (
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        {channel.action}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </AnimatedComponent>

                {/* FAQ Section */}
                <AnimatedComponent
                    animation="slideUp"
                    duration={0.8}
                    delay={0.6}
                >
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Perguntas Frequentes
                    </h2>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {filteredFaq.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm border">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900">{faq.question}</span>
                                    <CheckCircle className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === index ? 'rotate-90' : ''}`} />
                                </button>
                                {expandedFaq === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </AnimatedComponent>

                {/* Contact Info */}
                <AnimatedComponent
                    animation="slideUp"
                    duration={0.8}
                    delay={0.8}
                    className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
                >
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">Precisa de Ajuda Específica?</h3>
                        <p className="text-blue-100 mb-6">
                            Nossa equipe está pronta para ajudar você com qualquer dúvida ou problema
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <Clock className="w-8 h-8 mx-auto mb-2" />
                                <h4 className="font-semibold mb-1">Horário de Atendimento</h4>
                                <p className="text-sm text-blue-100">Segunda a Sexta: 8h às 18h</p>
                            </div>
                            <div className="text-center">
                                <Zap className="w-8 h-8 mx-auto mb-2" />
                                <h4 className="font-semibold mb-1">Tempo de Resposta</h4>
                                <p className="text-sm text-blue-100">Chat: 5 min | Email: 24h</p>
                            </div>
                            <div className="text-center">
                                <Shield className="w-8 h-8 mx-auto mb-2" />
                                <h4 className="font-semibold mb-1">Garantia</h4>
                                <p className="text-sm text-blue-100">30 dias ou seu dinheiro de volta</p>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/5521986289597"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                WhatsApp
                            </a>
                            <a
                                href="mailto:fenixdevacademy@gmail.com"
                                className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                Email
                            </a>
                        </div>
                    </div>
                </AnimatedComponent>

                {/* Additional Resources */}
                <AnimatedComponent
                    animation="slideUp"
                    duration={0.8}
                    delay={1.0}
                    className="mt-16"
                >
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Recursos Adicionais
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentação</h3>
                            <p className="text-gray-600 mb-4">Guias detalhados e tutoriais</p>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Acessar
                            </button>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                            <Video className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vídeos Tutoriais</h3>
                            <p className="text-gray-600 mb-4">Aprenda com vídeos explicativos</p>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                Assistir
                            </button>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comunidade</h3>
                            <p className="text-gray-600 mb-4">Conecte-se com outros alunos</p>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                Participar
                            </button>
                        </div>
                    </div>
                </AnimatedComponent>
            </div>
        </div>
    );
} 