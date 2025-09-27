'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cookie, Shield, Settings, Eye, Database } from 'lucide-react';
import PageWrapperFunctional from '@/components/PageWrapperFunctional';

export default function CookiesPage() {
    return (
        <PageWrapperFunctional>
            <div className="min-h-screen theme-bg">
                {/* Header */}
                <header className="theme-surface border-b theme-border sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <Link href="/" className="flex items-center">
                                <div className="w-8 h-8 theme-gradient-primary rounded-full flex items-center justify-center mr-2">
                                    <span className="text-white font-bold text-sm">F</span>
                                </div>
                                <span className="text-2xl font-bold">
                                    <span className="theme-primary">FENIX</span> ACADEMY
                                </span>
                            </Link>
                            <Link
                                href="/"
                                className="flex items-center theme-text hover:theme-primary transition-all duration-300"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar ao Início
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 theme-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Cookie className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold theme-text mb-4">
                            Política de Cookies
                        </h1>
                        <p className="text-lg theme-text-secondary">
                            Entenda como utilizamos cookies para melhorar sua experiência na Fênix Academy
                        </p>
                        <p className="text-sm theme-text-secondary mt-2">
                            Última atualização: 15 de janeiro de 2025
                        </p>
                    </div>

                    {/* Content */}
                    <div className="theme-surface rounded-2xl p-8 border theme-border">
                        <div className="prose prose-lg max-w-none">

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold theme-text mb-4 flex items-center">
                                    <Shield className="w-6 h-6 mr-3 theme-primary" />
                                    O que são Cookies?
                                </h2>
                                <p className="theme-text-secondary mb-4">
                                    Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita nosso site.
                                    Eles nos ajudam a fornecer uma experiência personalizada e melhorar nossos serviços.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold theme-text mb-4 flex items-center">
                                    <Settings className="w-6 h-6 mr-3 theme-primary" />
                                    Tipos de Cookies que Utilizamos
                                </h2>

                                <div className="space-y-6">
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Cookies Essenciais</h3>
                                        <p className="text-blue-800 text-sm">
                                            Necessários para o funcionamento básico do site, incluindo autenticação e segurança.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <h3 className="text-lg font-semibold text-green-900 mb-2">Cookies de Funcionalidade</h3>
                                        <p className="text-green-800 text-sm">
                                            Lembram suas preferências e configurações para personalizar sua experiência.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <h3 className="text-lg font-semibold text-yellow-900 mb-2">Cookies de Análise</h3>
                                        <p className="text-yellow-800 text-sm">
                                            Coletam informações sobre como você usa nosso site para melhorarmos nossos serviços.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                        <h3 className="text-lg font-semibold text-purple-900 mb-2">Cookies de Marketing</h3>
                                        <p className="text-purple-800 text-sm">
                                            Usados para exibir anúncios relevantes e medir a eficácia de campanhas.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold theme-text mb-4 flex items-center">
                                    <Eye className="w-6 h-6 mr-3 theme-primary" />
                                    Como Gerenciar Cookies
                                </h2>
                                <p className="theme-text-secondary mb-4">
                                    Você pode controlar e gerenciar cookies através das configurações do seu navegador:
                                </p>
                                <ul className="list-disc list-inside space-y-2 theme-text-secondary">
                                    <li>Bloquear todos os cookies</li>
                                    <li>Permitir apenas cookies essenciais</li>
                                    <li>Excluir cookies existentes</li>
                                    <li>Receber notificações antes de aceitar cookies</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold theme-text mb-4 flex items-center">
                                    <Database className="w-6 h-6 mr-3 theme-primary" />
                                    Cookies de Terceiros
                                </h2>
                                <p className="theme-text-secondary mb-4">
                                    Utilizamos serviços de terceiros que podem definir cookies em nosso site:
                                </p>
                                <ul className="list-disc list-inside space-y-2 theme-text-secondary">
                                    <li><strong>Google Analytics:</strong> Para análise de tráfego e comportamento</li>
                                    <li><strong>OpenAI:</strong> Para funcionalidades de IA</li>
                                    <li><strong>Stripe:</strong> Para processamento de pagamentos</li>
                                    <li><strong>YouTube:</strong> Para vídeos incorporados</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold theme-text mb-4">
                                    Contato
                                </h2>
                                <p className="theme-text-secondary mb-4">
                                    Se você tiver dúvidas sobre nossa política de cookies, entre em contato conosco:
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-700">
                                        <strong>Email:</strong> contato@fenixdevacademy.com<br />
                                        <strong>Equipe:</strong> Fênix Academy<br />
                                        <strong>Para mais informações:</strong> <a href="/contact" className="text-blue-600 hover:underline">Página de Contato</a>
                                    </p>
                                </div>
                            </section>

                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12">
                        <Link
                            href="/"
                            className="theme-gradient-primary text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Voltar ao Início
                        </Link>
                    </div>
                </div>
            </div>
        </PageWrapperFunctional>
    );
}
