'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    AlertCircle,
    Sparkles,
    Bookmark,
    Share2,
    Eye,
    ThumbsUp,
    RefreshCw,
    Filter as FilterIcon,
    SortAsc,
    SortDesc,
    ChevronDown,
    ChevronUp,
    Tag,
    Filter,
    RefreshCw as RefreshIcon,
    Users,
    ArrowRight,
    Play,
    Trophy,
    GraduationCap,
    Lightbulb,
    Shield,
    Crown,
    MessageCircle,
    Calendar,
    TrendingUp,
    Target,
    Heart,
    Globe,
    BookOpen,
    Code,
    Brain,
    Zap,
    Star
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import AdvancedParticles from '@/components/AdvancedParticles';
import VisualEffects from '@/components/VisualEffects';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'contato@fenixdevacademy.com',
            description: 'Respondemos em até 24 horas'
        },
        {
            icon: Phone,
            title: 'Telefone',
            value: 'Entre em contato',
            description: 'Segunda a Sexta, 8h às 18h'
        },
        {
            icon: MapPin,
            title: 'Localização',
            value: 'Brasil',
            description: 'Atendimento nacional'
        },
        {
            icon: Clock,
            title: 'Horário',
            value: 'Seg - Sex: 8h às 18h',
            description: 'Atendimento comercial'
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simular envio do formulário
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16">
                <div className="absolute inset-0 tech-grid opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium mb-6 animate-glow">
                            <MessageCircle className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
                            <span className="gradient-text-neon">Entre em Contato</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Entre em <span className="gradient-text-neon animate-neon">Contato</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
                            Entre em contato conosco e responderemos o mais rápido possível.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">
                                    Informações de Contato
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className="card group hover:scale-105 transition-all duration-500"
                                        style={{ transitionDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-start space-x-6">
                                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <info.icon className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-colors duration-300">
                                                    {info.title}
                                                </h3>
                                                <p className="text-lg font-medium text-white mb-2">
                                                    {info.value}
                                                </p>
                                                <p className="text-gray-300">
                                                    {info.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="mt-12 card">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">
                                        Por que escolher a Fênix Academy?
                                    </h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                                        <span className="text-gray-300 text-lg">Suporte especializado 24/7</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                                        <span className="text-gray-300 text-lg">Metodologia comprovada</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                                        <span className="text-gray-300 text-lg">Comunidade ativa de desenvolvedores</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                                        <span className="text-gray-300 text-lg">Certificados reconhecidos no mercado</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <Send className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">
                                    Envie sua Mensagem
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-white mb-3">
                                            Nome Completo
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 transition-all duration-300"
                                            placeholder="Seu nome completo"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-white mb-3">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 transition-all duration-300"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-3">
                                        Assunto
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 transition-all duration-300"
                                        placeholder="Qual o assunto da sua mensagem?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-white mb-3">
                                        Mensagem
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 transition-all duration-300 resize-none"
                                        placeholder="Conte-nos como podemos ajudar..."
                                    />
                                </div>

                                {/* Submit Status */}
                                {submitStatus === 'success' && (
                                    <div className="flex items-center space-x-3 text-green-400 bg-green-500/20 p-6 rounded-2xl border border-green-500/30">
                                        <CheckCircle className="w-6 h-6" />
                                        <span className="font-medium">Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="flex items-center space-x-3 text-red-400 bg-red-500/20 p-6 rounded-2xl border border-red-500/30">
                                        <AlertCircle className="w-6 h-6" />
                                        <span className="font-medium">Erro ao enviar mensagem. Tente novamente.</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary group flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                                            Enviar Mensagem
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}