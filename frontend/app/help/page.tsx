'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    HelpCircle,
    Search,
    BookOpen,
    MessageCircle,
    Phone,
    Mail,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    ChevronRight,
    ArrowRight,
    Star,
    Users,
    Settings,
    Bell,
    User,
    Code,
    Globe,
    Shield,
    Trophy,
    Flame,
    Target,
    BarChart3,
    TrendingUp,
    Play,
    Download,
    Share,
    Eye,
    Filter,
    Grid,
    List,
    Activity,
    PieChart,
    LineChart,
    TrendingDown,
    Minus,
    Plus,
    Zap,
    Brain,
    Award,
    Calendar,
    FileText,
    Image,
    Music,
    Headphones,
    Mic,
    Camera,
    Monitor,
    Smartphone,
    Tablet,
    Laptop,
    Wifi,
    WifiOff,
    Signal,
    SignalZero,
    SignalLow,
    SignalMedium,
    SignalHigh,
    Home,
    ChevronLeft,
    ExternalLink,
    Copy,
    ThumbsUp,
    ThumbsDown,
    Share2,
    RefreshCw,
    Info,
    Lightbulb,
    Bookmark,
    Flag,
    Send,
    SendHorizontal,
    Bot,
    HeadphonesIcon,
    Video,
    FileVideo,
    FileImage,
    FileAudio,
    File,
    Folder,
    FolderOpen,
    Database,
    Server,
    Cloud,
    CloudOff,
    WifiIcon,
    WifiOffIcon,
    SignalIcon,
    SignalZeroIcon,
    SignalLowIcon,
    SignalMediumIcon,
    SignalHighIcon
} from 'lucide-react';
import { PageWrapperFunctional } from '@/components/PageWrapperFunctional';
import FenixLogo from '@/components/FenixLogo';
import { ROUTES } from '@/lib/routes';

export default function HelpPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState('faq');

    const faqs = [
        {
            id: '1',
            question: 'Como acessar meus cursos?',
            answer: 'Após fazer login, vá para a seção "Meus Cursos" no menu principal. Todos os cursos que você comprou estarão disponíveis lá.',
            category: 'courses',
            tags: ['cursos', 'acesso', 'navegação'],
            helpful: 45,
            notHelpful: 2
        },
        {
            id: '2',
            question: 'Como funciona o sistema de pagamento?',
            answer: 'Aceitamos PIX, cartão de crédito e boleto bancário. O pagamento é processado de forma segura e você recebe acesso imediato após a confirmação.',
            category: 'billing',
            tags: ['pagamento', 'pix', 'cartão', 'segurança'],
            helpful: 38,
            notHelpful: 1
        },
        {
            id: '3',
            question: 'Posso baixar os vídeos dos cursos?',
            answer: 'Os vídeos são para visualização online para garantir que você sempre tenha acesso ao conteúdo mais atualizado.',
            category: 'courses',
            tags: ['vídeos', 'download', 'offline'],
            helpful: 29,
            notHelpful: 8
        },
        {
            id: '4',
            question: 'Como obter meu certificado?',
            answer: 'Após completar 100% do curso e passar em todas as avaliações, seu certificado será gerado automaticamente na seção "Certificados".',
            category: 'courses',
            tags: ['certificado', 'conclusão', 'avaliação'],
            helpful: 52,
            notHelpful: 3
        },
        {
            id: '5',
            question: 'O que fazer se esqueci minha senha?',
            answer: 'Use a opção "Esqueci minha senha" na página de login. Você receberá um email com instruções para redefinir sua senha.',
            category: 'account',
            tags: ['senha', 'recuperação', 'email'],
            helpful: 41,
            notHelpful: 4
        },
        {
            id: '6',
            question: 'Os cursos têm prazo de validade?',
            answer: 'Não! Uma vez que você compra um curso, ele é seu para sempre. Você pode assistir quantas vezes quiser, quando quiser.',
            category: 'courses',
            tags: ['validade', 'acesso', 'permanente'],
            helpful: 67,
            notHelpful: 1
        }
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesSearch;
    });

    const tabs = [
        { id: 'faq', label: 'Perguntas Frequentes', icon: <HelpCircle className="w-4 h-4" /> },
        { id: 'articles', label: 'Artigos de Ajuda', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'contact', label: 'Contato', icon: <MessageCircle className="w-4 h-4" /> }
    ];

    return (
        <PageWrapperFunctional>
            <div className="min-h-screen theme-bg">
                {/* Header */}
                <header className="theme-surface border-b theme-border sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <FenixLogo className="w-8 h-8" />
                                <div>
                                    <h1 className="text-xl font-bold theme-text">Central de Ajuda</h1>
                                    <p className="text-sm theme-text-secondary">Fenix Academy</p>
                                </div>
                            </div>

                            <nav className="hidden lg:flex items-center space-x-8">
                                <Link href={ROUTES.DASHBOARD} className="theme-text-secondary hover:theme-primary transition-colors">Dashboard</Link>
                                <Link href={ROUTES.COURSES} className="theme-text-secondary hover:theme-primary transition-colors">Cursos</Link>
                                <Link href={ROUTES.IDE_ADVANCED} className="theme-text-secondary hover:theme-primary transition-colors">IDE</Link>
                                <Link href="/help" className="theme-primary font-semibold">Ajuda</Link>
                            </nav>

                            <div className="flex items-center space-x-4">
                                <button className="p-2 theme-surface hover:theme-surface-hover border theme-border rounded-lg transition-colors">
                                    <Bell className="w-4 h-4 theme-text" />
                                </button>
                                <Link href={ROUTES.PROFILE} className="theme-text-secondary hover:theme-primary transition-colors">Perfil</Link>
                                <Link href={ROUTES.SETTINGS} className="theme-text-secondary hover:theme-primary transition-colors">Configurações</Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm theme-text-secondary mb-8">
                        <Home className="w-4 h-4" />
                        <ChevronRight className="w-4 h-4" />
                        <Link href={ROUTES.DASHBOARD} className="hover:theme-primary transition-colors">Dashboard</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="theme-text font-medium">Central de Ajuda</span>
                    </div>

                    {/* Hero Section */}
                    <div className="theme-gradient-background rounded-2xl p-8 mb-8 relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="w-16 h-16 theme-gradient-primary/20 rounded-2xl flex items-center justify-center">
                                    <HelpCircle className="w-8 h-8 theme-primary" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">
                                        Central de Ajuda
                                    </h1>
                                    <p className="text-white/80">
                                        Encontre respostas para suas dúvidas e aprenda a usar a plataforma
                                    </p>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="max-w-2xl mx-auto">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Pesquisar ajuda..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 theme-surface border theme-border rounded-xl theme-text placeholder-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                            <Lightbulb className="w-full h-full text-white" />
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-8">
                        <div className="theme-surface rounded-xl p-1 border theme-border">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${activeTab === tab.id
                                        ? 'theme-gradient-primary text-white shadow-sm'
                                        : 'theme-text-secondary hover:theme-text hover:theme-surface-hover'
                                        }`}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    {activeTab === 'faq' && (
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => (
                                <div key={faq.id} className="theme-surface rounded-xl overflow-hidden border theme-border hover:shadow-lg transition-all duration-300">
                                    <button
                                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:theme-surface-hover transition-colors"
                                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold theme-text mb-2">{faq.question}</h3>
                                            <div className="flex items-center space-x-4 text-sm theme-text-secondary">
                                                <span className="flex items-center">
                                                    <ThumbsUp className="w-4 h-4 mr-1 text-green-500" />
                                                    {faq.helpful} úteis
                                                </span>
                                                <span className="flex items-center">
                                                    <ThumbsDown className="w-4 h-4 mr-1 text-red-500" />
                                                    {faq.notHelpful} não úteis
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            {expandedFaq === index ? (
                                                <ChevronDown className="w-5 h-5 theme-text-secondary" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 theme-text-secondary" />
                                            )}
                                        </div>
                                    </button>
                                    {expandedFaq === index && (
                                        <div className="px-6 pb-4 border-t theme-border">
                                            <p className="theme-text leading-relaxed mb-4 mt-4">{faq.answer}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {faq.tags.map((tag) => (
                                                    <span key={tag} className="px-3 py-1 theme-gradient-primary/20 theme-primary text-xs rounded-full font-medium">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex space-x-2">
                                                    <button className="text-green-500 hover:text-green-400 text-sm flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-green-50 transition-colors">
                                                        <ThumbsUp className="w-4 h-4" />
                                                        Útil
                                                    </button>
                                                    <button className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors">
                                                        <ThumbsDown className="w-4 h-4" />
                                                        Não útil
                                                    </button>
                                                </div>
                                                <button className="theme-primary hover:theme-primary/80 text-sm flex items-center gap-1 px-3 py-1 rounded-lg hover:theme-surface-hover transition-colors">
                                                    <Share2 className="w-4 h-4" />
                                                    Compartilhar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'articles' && (
                        <div className="theme-surface rounded-xl border theme-border p-12 text-center">
                            <div className="w-24 h-24 theme-gradient-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-12 h-12 theme-primary" />
                            </div>
                            <h3 className="text-2xl font-semibold theme-text mb-4">Artigos de Ajuda</h3>
                            <p className="theme-text-secondary mb-8 max-w-md mx-auto">
                                Artigos detalhados e guias completos serão disponibilizados em breve
                            </p>
                            <button className="theme-gradient-primary text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                                Ser notificado quando disponível
                            </button>
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold theme-text mb-6">Entre em Contato</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4 p-4 theme-surface rounded-xl border theme-border hover:shadow-lg transition-all duration-300">
                                            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-6 h-6 text-green-500" />
                                            </div>
                                            <div>
                                                <h4 className="theme-text font-semibold mb-1">WhatsApp</h4>
                                                <p className="theme-text-secondary mb-1">+55 (21) 99999-9999</p>
                                                <p className="text-sm theme-text-secondary">Resposta em até 2 horas</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4 p-4 theme-surface rounded-xl border theme-border hover:shadow-lg transition-all duration-300">
                                            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="theme-text font-semibold mb-1">Email</h4>
                                                <p className="theme-text-secondary mb-1">contato@fenixdevacademy.com</p>
                                                <p className="text-sm theme-text-secondary">Resposta em até 24 horas</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4 p-4 theme-surface rounded-xl border theme-border hover:shadow-lg transition-all duration-300">
                                            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MessageCircle className="w-6 h-6 text-purple-500" />
                                            </div>
                                            <div>
                                                <h4 className="theme-text font-semibold mb-1">Chat Online</h4>
                                                <p className="theme-text-secondary mb-1">Disponível 24/7</p>
                                                <p className="text-sm theme-text-secondary">Resposta instantânea</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="theme-surface rounded-xl border theme-border p-6">
                                    <h4 className="text-lg font-semibold theme-text mb-6">Enviar Mensagem</h4>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium theme-text mb-2">Nome</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 theme-surface border theme-border rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium theme-text mb-2">Email</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 theme-surface border theme-border rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium theme-text mb-2">Assunto</label>
                                            <select className="w-full px-4 py-3 theme-surface border theme-border rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option>Problema técnico</option>
                                                <option>Dúvida sobre curso</option>
                                                <option>Problema de pagamento</option>
                                                <option>Outro</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium theme-text mb-2">Mensagem</label>
                                            <textarea
                                                rows={4}
                                                className="w-full px-4 py-3 theme-surface border theme-border rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full theme-gradient-primary text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <Send className="w-4 h-4" />
                                            Enviar Mensagem
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Floating Actions */}
                    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                        <button className="theme-gradient-primary text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="bg-purple-500 hover:bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                            <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </PageWrapperFunctional>
    );
}