'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Code,
    Brain,
    Zap,
    Target,
    Shield,
    Play,
    Settings,
    Star,
    Clock,
    Users,
    Award,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Plus,
    Download,
    Share,
    BookOpen,
    Lightbulb,
    AlertTriangle,
    CheckCircle,
    Globe,
    MessageCircle
} from 'lucide-react';
import IntelliSense from '../../components/IntelliSense';

export default function IntelliSensePage() {
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [code, setCode] = useState(`// Bem-vindo ao IntelliSense da Fenix Academy!
// Digite seu código aqui e veja a mágica acontecer

function helloWorld() {
    console.log("Hello, Fenix Academy!");
    return "Programação é incrível!";
}

// Experimente digitar: console. ou function ou const
helloWorld();`);

    const languages = [
        { value: 'javascript', label: 'JavaScript', icon: '🟨', color: 'bg-yellow-500' },
        { value: 'python', label: 'Python', icon: '🐍', color: 'bg-green-500' },
        { value: 'typescript', label: 'TypeScript', icon: '🔷', color: 'bg-blue-500' },
        { value: 'html', label: 'HTML', icon: '🌐', color: 'bg-orange-500' },
        { value: 'css', label: 'CSS', icon: '🎨', color: 'bg-purple-500' },
        { value: 'java', label: 'Java', icon: '☕', color: 'bg-red-500' }
    ];

    const features = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: 'IA Superinteligente',
            description: 'Sugestões baseadas em IA que aprendem com seu código'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Autocompletar Instantâneo',
            description: 'Sugestões em tempo real enquanto você digita'
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: 'Detecção de Erros',
            description: 'Identifica e corrige erros antes mesmo de executar'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Análise de Código',
            description: 'Análise estática e sugestões de melhoria'
        },
        {
            icon: <Play className="w-8 h-8" />,
            title: 'Execução em Tempo Real',
            description: 'Execute e teste seu código instantaneamente'
        },
        {
            icon: <Settings className="w-8 h-8" />,
            title: 'Personalização Total',
            description: 'Configure temas, atalhos e preferências'
        }
    ];

    const handleSuggestionSelect = (suggestion: any) => {
        console.log('Sugestão selecionada:', suggestion);
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link href="/" className="flex items-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-2xl font-bold">
                                <span className="text-blue-500">FENIX</span> INTELLISENSE
                            </span>
                        </Link>
                        <nav className="hidden lg:flex space-x-8">
                            <Link href="/courses" className="text-white hover:text-blue-400">Cursos</Link>
                            <Link href="/ide-advanced" className="text-white hover:text-blue-400">IDE</Link>
                            <Link href="/ai" className="text-white hover:text-blue-400">IA</Link>
                            <Link href="/intellisense" className="text-blue-400 font-semibold">IntelliSense</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Link href="/auth/login" className="text-white hover:text-blue-400">Entrar</Link>
                            <Link href="/comecar-agora" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                Começar Agora
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 to-purple-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-blue-400">IntelliSense</span> Avançado
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        A revolução no desenvolvimento de código com IA superinteligente, autocompletar instantâneo e análise em tempo real
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                            <Play className="w-5 h-5 mr-2" />
                            Experimentar Agora
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                            Ver Demonstração
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Recursos Revolucionários
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Tecnologia de ponta que transforma a forma como você desenvolve código
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-750 transition-colors">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* IntelliSense Demo */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Experimente o IntelliSense
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Teste nossa tecnologia de autocompletar inteligente em tempo real
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Language Selector */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-800 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Linguagem</h3>
                                <div className="space-y-2">
                                    {languages.map(lang => (
                                        <button
                                            key={lang.value}
                                            onClick={() => setSelectedLanguage(lang.value)}
                                            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${selectedLanguage === lang.value ? 'bg-blue-600' : 'hover:bg-gray-700'
                                                }`}
                                        >
                                            <span className="text-2xl">{lang.icon}</span>
                                            <span className="text-sm font-medium">{lang.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gray-800 rounded-xl p-6 mt-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
                                <div className="space-y-2">
                                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                                        <Download className="w-4 h-4" />
                                        <span className="text-sm">Exportar Código</span>
                                    </button>
                                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                                        <Share className="w-4 h-4" />
                                        <span className="text-sm">Compartilhar</span>
                                    </button>
                                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                                        <Settings className="w-4 h-4" />
                                        <span className="text-sm">Configurações</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Code Editor */}
                        <div className="lg:col-span-3">
                            <div className="bg-gray-800 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white">Editor de Código</h3>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-400">{selectedLanguage.toUpperCase()}</span>
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>

                                <IntelliSense
                                    language={selectedLanguage}
                                    code={code}
                                    onCodeChange={setCode}
                                    onSuggestionSelect={handleSuggestionSelect}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-4xl font-bold text-blue-500 mb-2">50+</h3>
                            <p className="text-gray-300">Linguagens Suportadas</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-green-500 mb-2">99.9%</h3>
                            <p className="text-gray-300">Precisão das Sugestões</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-purple-500 mb-2">10ms</h3>
                            <p className="text-gray-300">Latência de Resposta</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-orange-500 mb-2">1M+</h3>
                            <p className="text-gray-300">Sugestões por Dia</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Pronto para revolucionar seu desenvolvimento?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Experimente o IntelliSense mais avançado do mundo e acelere sua produtividade em 300%
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/comecar-agora"
                            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Começar Agora
                        </Link>
                        <Link
                            href="/ide-advanced"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Ver IDE Completo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Floating Actions */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                <button className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                </button>
                <button className="bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}








