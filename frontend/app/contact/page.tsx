'use client';

import { useState } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

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
            value: 'fenixdevacademy@gmail.com',
            description: 'Respondemos em até 24 horas'
        },
        {
            icon: Phone,
            title: 'Telefone',
            value: '+55 (21) 986289597',
            description: 'Segunda a Sexta, 8h às 18h'
        },
        {
            icon: MapPin,
            title: 'Endereço',
            value: 'Itaboraí, RJ - Brasil',
            description: 'Escritório principal'
        },
        {
            icon: Clock,
            title: 'Horário de Atendimento',
            value: 'Segunda a Sexta',
            description: '8h às 18h (GMT-3)'
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Simular envio do formulário
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');

            // Reset form after success
            setTimeout(() => {
                setFormData({ name: '', email: '', subject: '', message: '' });
                setSubmitStatus('idle');
            }, 3000);
        }, 2000);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            Fale Conosco
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
                            Estamos aqui para ajudar você em sua jornada de aprendizado
                        </p>
                    </AnimatedComponent>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <AnimatedComponent
                        animation="slideLeft"
                        duration={0.8}
                        className="bg-white rounded-2xl shadow-lg p-8"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Envie sua Mensagem
                        </h2>

                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="text-green-800 font-medium">Mensagem enviada com sucesso!</p>
                                    <p className="text-green-600 text-sm">Entraremos em contato em breve.</p>
                                </div>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <div>
                                    <p className="text-red-800 font-medium">Erro ao enviar mensagem</p>
                                    <p className="text-red-600 text-sm">Tente novamente em alguns instantes.</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nome Completo *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Seu nome completo"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Assunto *
                                </label>
                                <select
                                    id="subject"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                >
                                    <option value="">Selecione um assunto</option>
                                    <option value="duvida">Dúvida sobre cursos</option>
                                    <option value="suporte">Suporte técnico</option>
                                    <option value="parceria">Proposta de parceria</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensagem *
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    required
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                    placeholder="Descreva sua dúvida ou solicitação..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Enviando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Enviar Mensagem</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </AnimatedComponent>

                    {/* Contact Information */}
                    <AnimatedComponent
                        animation="slideRight"
                        duration={0.8}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Informações de Contato
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Entre em contato conosco através dos canais abaixo ou preencha o formulário ao lado.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <AnimatedComponent
                                    key={info.title}
                                    animation="slideUp"
                                    duration={0.5}
                                    delay={index * 0.1}
                                    className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                            <info.icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {info.title}
                                        </h3>
                                        <p className="text-blue-600 font-medium mb-1">
                                            {info.value}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {info.description}
                                        </p>
                                    </div>
                                </AnimatedComponent>
                            ))}
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Perguntas Frequentes
                            </h3>
                            <div className="space-y-4">
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Como funciona o acesso aos cursos?
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Após a compra, você recebe acesso imediato ao curso através da sua conta.
                                    </p>
                                </div>
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Os certificados são reconhecidos?
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Sim, nossos certificados são aceitos pelo mercado e empresas parceiras.
                                    </p>
                                </div>
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Posso cancelar minha inscrição?
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Oferecemos garantia de 30 dias para todos os nossos cursos.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Há suporte disponível?
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Sim, oferecemos suporte completo através de chat, email e comunidade.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </AnimatedComponent>
                </div>
            </div>

            {/* Map Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Nossa Localização
                        </h2>
                        <p className="text-gray-600">
                            Itaboraí, Rio de Janeiro - Brasil
                        </p>
                    </AnimatedComponent>

                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Itaboraí, RJ - Brasil
                                </h3>
                                <p className="text-gray-600">
                                    Nossa sede está localizada no coração do Rio de Janeiro
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 