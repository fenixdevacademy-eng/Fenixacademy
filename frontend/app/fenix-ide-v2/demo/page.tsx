'use client';

import { useState, useEffect } from 'react';
import { Code, Play, Zap, Brain, Globe, ArrowLeft, Download, Terminal, Monitor } from 'lucide-react';
import Link from 'next/link';

export default function FenixIDE2DemoPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isRunningDemo, setIsRunningDemo] = useState(false);

    const tabs = [
        { id: 'overview', label: 'Visão Geral', icon: Monitor },
        { id: 'features', label: 'Funcionalidades', icon: Zap },
        { id: 'demo', label: 'Demonstração', icon: Play },
        { id: 'download', label: 'Download', icon: Download }
    ];

    const features = [
        {
            icon: Brain,
            title: 'IA Inteligente',
            description: 'Assistente de IA com contexto brasileiro',
            details: [
                'Múltiplos modelos de IA (GPT-4, Claude 3, Llama)',
                'Prompts especializados para o mercado brasileiro',
                'Cache inteligente para respostas rápidas',
                'Análise de código contextual'
            ]
        },
        {
            icon: Code,
            title: 'Editor Avançado',
            description: 'Editor com suporte a 20+ linguagens',
            details: [
                'Suporte a JavaScript, TypeScript, Python, Java, C#',
                'Snippets inteligentes e personalizáveis',
                'Linting e formatação automática',
                'Auto-save configurável'
            ]
        },
        {
            icon: Zap,
            title: 'Auto-Complete Inteligente',
            description: 'Sugestões contextuais prioritárias',
            details: [
                '🇧🇷 Snippets brasileiros (máxima prioridade)',
                '📝 Snippets da linguagem',
                '🧠 Sugestões da IA',
                '🔍 Código local (variáveis, funções, classes)'
            ]
        },
        {
            icon: Globe,
            title: 'Ferramentas Brasileiras',
            description: 'Funcionalidades específicas para o Brasil',
            details: [
                'Validação de CPF/CNPJ',
                'Geração de QR Code PIX',
                'Compliance com LGPD',
                'Consulta de CEP'
            ]
        }
    ];

    const runDemo = async () => {
        setIsRunningDemo(true);

        try {
            // Simular execução da demo
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Redirecionar para a versão desktop
            window.location.href = '/fenix-ide-v2/desktop';
        } catch (error) {
            console.error('Erro na demo:', error);
        } finally {
            setIsRunningDemo(false);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Fenix IDE 2.0 - Visão Geral
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                A próxima geração da IDE brasileira, inspirada no Cursor 2.0 e
                                desenvolvida especificamente para o mercado nacional.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    🚀 Arquitetura Modular
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <li>• Sistema de módulos extensível</li>
                                    <li>• Gerenciamento de dependências</li>
                                    <li>• Sistema de plugins robusto</li>
                                    <li>• Eventos personalizados</li>
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    🎯 Performance
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <li>• Cache inteligente</li>
                                    <li>• Monitoramento em tempo real</li>
                                    <li>• Otimizações automáticas</li>
                                    <li>• Métricas detalhadas</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );

            case 'features':
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Funcionalidades Principais
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Descubra o que torna a Fenix IDE 2.0 única
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                                            <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        {feature.details.map((detail, detailIndex) => (
                                            <li key={detailIndex} className="flex items-start">
                                                <span className="text-blue-500 mr-2">•</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'demo':
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Demonstração Interativa
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Experimente a Fenix IDE 2.0 em ação
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center">
                            <div className="mb-6">
                                <Terminal className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Demo da Fenix IDE 2.0
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Clique no botão abaixo para iniciar a demonstração completa
                                </p>
                            </div>

                            <button
                                onClick={runDemo}
                                disabled={isRunningDemo}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                                {isRunningDemo ? (
                                    <>
                                        <Play className="h-5 w-5 mr-2 animate-pulse" />
                                        Iniciando Demo...
                                    </>
                                ) : (
                                    <>
                                        <Play className="h-5 w-5 mr-2" />
                                        Iniciar Demonstração
                                    </>
                                )}
                            </button>

                            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                                <p>A demo será executada na versão desktop da IDE</p>
                            </div>
                        </div>
                    </div>
                );

            case 'download':
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Download da Fenix IDE 2.0
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Escolha a versão que melhor atende suas necessidades
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-blue-500">
                                <div className="text-center">
                                    <Download className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Versão Desktop
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        IDE completa para Windows, macOS e Linux
                                    </p>

                                    <button
                                        onClick={runDemo}
                                        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
                                    >
                                        Baixar Desktop
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-300">
                                <div className="text-center">
                                    <Code className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Versão Web
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        Acesso via navegador (em breve)
                                    </p>

                                    <button
                                        disabled
                                        className="w-full px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
                                    >
                                        Em Breve
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/fenix-ide-v2"
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Voltar para Fenix IDE 2.0</span>
                        </Link>

                        <div className="flex items-center space-x-2">
                            <Code className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-semibold text-gray-900 dark:text-white">
                                Fenix IDE 2.0
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <tab.icon className="h-5 w-5" />
                                    <span>{tab.label}</span>
                                </div>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {renderTabContent()}
            </div>
        </div>
    );
}










