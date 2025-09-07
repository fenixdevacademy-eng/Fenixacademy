'use client';

import { useState, useEffect } from 'react';
import { Code, Download, Play, Zap, Brain, Globe, Shield, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function FenixIDE2Page() {
    const [isDownloading, setIsDownloading] = useState(false);

    const features = [
        {
            icon: Brain,
            title: 'IA Inteligente',
            description: 'Assistente de IA avançado com contexto brasileiro integrado',
            color: 'text-blue-600'
        },
        {
            icon: Code,
            title: 'Editor Avançado',
            description: 'Editor com suporte a 20+ linguagens e snippets inteligentes',
            color: 'text-green-600'
        },
        {
            icon: Zap,
            title: 'Auto-Complete Inteligente',
            description: 'Sugestões contextuais com priorização brasileira',
            color: 'text-yellow-600'
        },
        {
            icon: Globe,
            title: 'Ferramentas Brasileiras',
            description: 'Validação CPF/CNPJ, PIX, LGPD e muito mais',
            color: 'text-purple-600'
        },
        {
            icon: Shield,
            title: 'Segurança Avançada',
            description: 'Validação robusta e compliance com regulamentações',
            color: 'text-red-600'
        },
        {
            icon: BarChart3,
            title: 'Analytics em Tempo Real',
            description: 'Métricas de performance e produtividade do desenvolvedor',
            color: 'text-indigo-600'
        }
    ];

    const handleDownload = async () => {
        setIsDownloading(true);

        try {
            // Simular download da versão desktop
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Redirecionar para a versão desktop
            window.location.href = '/fenix-ide-v2/desktop';
        } catch (error) {
            console.error('Erro no download:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header Hero */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                                <Code className="h-16 w-16 text-white" />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Fenix IDE 2.0
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            A próxima geração da IDE brasileira. Inspirada no Cursor 2.0,
                            com funcionalidades específicas para o mercado nacional.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                                {isDownloading ? (
                                    <>
                                        <Download className="h-5 w-5 mr-2 animate-pulse" />
                                        Baixando...
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-5 w-5 mr-2" />
                                        Baixar Fenix IDE 2.0
                                    </>
                                )}
                            </button>

                            <Link
                                href="/fenix-ide-v2/demo"
                                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                            >
                                <Play className="h-5 w-5 mr-2" />
                                Ver Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Funcionalidades Revolucionárias
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Descubra o que torna a Fenix IDE 2.0 única
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
                        >
                            <div className={`inline-flex p-3 rounded-lg bg-gray-100 dark:bg-gray-700 mb-4`}>
                                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Pronto para revolucionar seu desenvolvimento?
                    </h2>

                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Junte-se aos milhares de desenvolvedores que já estão usando
                        a Fenix IDE 2.0 para criar código de qualidade brasileira.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
                        >
                            {isDownloading ? (
                                <>
                                    <Download className="h-5 w-5 mr-2 animate-pulse" />
                                    Baixando...
                                </>
                            ) : (
                                <>
                                    <Download className="h-5 w-5 mr-2" />
                                    Baixar Agora
                                </>
                            )}
                        </button>

                        <Link
                            href="/fenix-ide-v2/docs"
                            className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                        >
                            <Code className="h-5 w-5 mr-2" />
                            Documentação
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">
                        © 2024 Fenix Academy. Fenix IDE 2.0 - Revolucionando o desenvolvimento brasileiro.
                    </p>
                </div>
            </div>
        </div>
    );
}






