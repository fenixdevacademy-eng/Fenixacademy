'use client';

import { useState } from 'react';
import { Code, BookOpen, FileText, Download, Github, Terminal, ArrowLeft, Search, Play } from 'lucide-react';
import Link from 'next/link';

export default function FenixIDE2DocsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSection, setActiveSection] = useState('getting-started');

    const sections = [
        {
            id: 'getting-started',
            title: '🚀 Começando',
            icon: '🎯',
            content: [
                { title: 'Instalação', content: 'Como instalar e configurar a Fenix IDE 2.0' },
                { title: 'Primeiros Passos', content: 'Configuração inicial e primeiro projeto' },
                { title: 'Interface', content: 'Conhecendo a interface da IDE' }
            ]
        },
        {
            id: 'features',
            title: '✨ Funcionalidades',
            icon: '⚡',
            content: [
                { title: 'Editor Avançado', content: 'Editor com suporte a múltiplas linguagens' },
                { title: 'IA Inteligente', content: 'Assistente de IA com contexto brasileiro' },
                { title: 'Auto-Complete', content: 'Sistema de auto-complete inteligente' },
                { title: 'Ferramentas Brasileiras', content: 'Validação CPF/CNPJ, PIX, LGPD' }
            ]
        },
        {
            id: 'modules',
            title: '🏗️ Módulos',
            icon: '🔧',
            content: [
                { title: 'Core', content: 'Núcleo principal da IDE' },
                { title: 'Editor', content: 'Módulo de edição de código' },
                { title: 'AI Assistant', content: 'Assistente de inteligência artificial' },
                { title: 'Auto-Complete', content: 'Sistema de sugestões inteligentes' }
            ]
        },
        {
            id: 'api',
            title: '📚 API',
            icon: '🔌',
            content: [
                { title: 'Referência da API', content: 'Documentação completa da API' },
                { title: 'Exemplos', content: 'Exemplos de uso e integração' },
                { title: 'Plugins', content: 'Como criar e usar plugins' }
            ]
        },
        {
            id: 'troubleshooting',
            title: '🔧 Solução de Problemas',
            icon: '🛠️',
            content: [
                { title: 'Problemas Comuns', content: 'Soluções para problemas frequentes' },
                { title: 'Logs', content: 'Como interpretar logs de erro' },
                { title: 'Suporte', content: 'Como obter ajuda e suporte' }
            ]
        }
    ];

    const filteredSections = sections.filter(section =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.some(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const renderSectionContent = (sectionId: string) => {
        const section = sections.find(s => s.id === sectionId);
        if (!section) return null;

        return (
            <div className="space-y-6">
                <div className="text-center mb-8">
                    <div className="text-4xl mb-4">{section.icon}</div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {section.title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.content.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {item.content}
                            </p>
                            <button className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                                <FileText className="h-4 w-4 mr-2" />
                                Ler Mais
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
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
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-semibold text-gray-900 dark:text-white">
                                Documentação
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search */}
                <div className="mb-12">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar na documentação..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-12">
                    <nav className="flex flex-wrap justify-center space-x-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeSection === section.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                <span className="mr-2">{section.icon}</span>
                                {section.title.split(' ')[1]}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="mb-16">
                    {renderSectionContent(activeSection)}
                </div>

                {/* Quick Links */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        🔗 Links Rápidos
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link
                            href="/fenix-ide-v2/demo"
                            className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            <Play className="h-8 w-8 text-blue-600 mr-4" />
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Demo Interativa</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Experimente a IDE em ação</p>
                            </div>
                        </Link>

                        <Link
                            href="/fenix-ide-v2/desktop"
                            className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                            <Download className="h-8 w-8 text-green-600 mr-4" />
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Download</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Baixe a versão desktop</p>
                            </div>
                        </Link>

                        <Link
                            href="https://github.com/fenix-academy/fenix-ide-v2"
                            className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                        >
                            <Github className="h-8 w-8 text-purple-600 mr-4" />
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">GitHub</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Código fonte e issues</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}










