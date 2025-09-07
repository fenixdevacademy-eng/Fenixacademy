'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, GitBranch, Palette, Globe, Puzzle, Play, Settings, Terminal, FileText, Folder, Plus, Trash2 } from 'lucide-react';
import FenixIDE from '../../../components/FenixIDE';
import IDEThemeManager from '../../../components/IDEThemeManager';
import LanguageSupport from '../../../components/LanguageSupport';
import ExtensionSystem from '../../../components/ExtensionSystem';
import GitIntegration from '../../../components/GitIntegration';

export default function FenixIDEDemoPage() {
    const [activeFeature, setActiveFeature] = useState<'ide' | 'themes' | 'languages' | 'extensions' | 'git'>('ide');
    const [showFeature, setShowFeature] = useState(false);

    const features = [
        {
            id: 'ide',
            name: 'IDE Principal',
            description: 'Editor de código completo com gerenciamento de arquivos e pastas',
            icon: Code,
            color: 'bg-blue-600'
        },
        {
            id: 'themes',
            name: 'Gerenciador de Temas',
            description: 'Personalize cores, fontes e aparência da IDE',
            icon: Palette,
            color: 'bg-purple-600'
        },
        {
            id: 'languages',
            name: 'Suporte a Linguagens',
            description: 'Mais de 50 linguagens de programação suportadas',
            icon: Globe,
            color: 'bg-green-600'
        },
        {
            id: 'extensions',
            name: 'Sistema de Extensões',
            description: 'Marketplace de extensões para expandir funcionalidades',
            icon: Puzzle,
            color: 'bg-orange-600'
        },
        {
            id: 'git',
            name: 'Integração Git',
            description: 'Controle de versão completo integrado à IDE',
            icon: GitBranch,
            color: 'bg-red-600'
        }
    ];

    const openFeature = (featureId: string) => {
        setActiveFeature(featureId as any);
        setShowFeature(true);
    };

    const closeFeature = () => {
        setShowFeature(false);
    };

    const renderFeatureContent = () => {
        switch (activeFeature) {
            case 'ide':
                return <FenixIDE />;
            case 'themes':
                return <IDEThemeManager
                    currentTheme={{
                        id: 'fenix-dark',
                        name: 'Fenix Dark',
                        description: 'Tema escuro padrão',
                        category: 'dark',
                        colors: {
                            background: '#1a1a1a',
                            surface: '#2d2d2d',
                            primary: '#3b82f6',
                            secondary: '#10b981',
                            accent: '#f59e0b',
                            text: '#ffffff',
                            textSecondary: '#9ca3af',
                            border: '#4b5563',
                            error: '#ef4444',
                            warning: '#f59e0b',
                            success: '#10b981',
                            info: '#3b82f6'
                        },
                        editor: {
                            background: '#1a1a1a',
                            foreground: '#ffffff',
                            selection: '#3b82f6',
                            cursor: '#ffffff',
                            lineNumbers: '#6b7280',
                            activeLine: '#2d2d2d',
                            bracketMatching: '#3b82f6',
                            findMatch: '#f59e0b',
                            findMatchHighlight: '#f59e0b'
                        }
                    }}
                    onThemeChange={() => { }}
                    onClose={closeFeature}
                />;
            case 'languages':
                return <LanguageSupport />;
            case 'extensions':
                return <ExtensionSystem />;
            case 'git':
                return <GitIntegration onClose={closeFeature} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/fenix-ide-v2" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Ir para Fenix IDE 2.0</span>
                            </Link>
                            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                🚀 Demonstração da IDE Fenix
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                v2.0.0 - Funcionalidades Avançadas
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!showFeature ? (
                    <>
                        {/* Introduction */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Explore Todas as Funcionalidades da IDE Fenix
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                                Uma IDE moderna e poderosa com recursos avançados de desenvolvimento,
                                controle de versão integrado e suporte a múltiplas linguagens de programação.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {features.map((feature) => (
                                <div
                                    key={feature.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                    onClick={() => openFeature(feature.id)}
                                >
                                    <div className={`${feature.color} p-6 rounded-t-xl`}>
                                        <feature.icon className="w-12 h-12 text-white mx-auto" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {feature.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {feature.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                Clique para explorar
                                            </span>
                                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                                                <Play className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Key Benefits */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                🎯 Principais Benefícios
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Desenvolvimento Rápido
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Editor inteligente com autocompletar e debugging integrado
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <GitBranch className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Controle de Versão
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Git integrado com interface visual intuitiva
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Personalização Total
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Temas, cores e configurações personalizáveis
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Puzzle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Extensível
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Sistema de extensões para funcionalidades adicionais
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Getting Started */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">
                                🚀 Comece a Usar Agora
                            </h3>
                            <p className="text-blue-100 mb-6 max-w-2xl">
                                A IDE Fenix está pronta para impulsionar sua produtividade de desenvolvimento.
                                Explore as funcionalidades acima ou vá direto para a IDE principal.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/fenix-ide-v2"
                                    className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                                >
                                    Abrir IDE Principal
                                </Link>
                                <button
                                    onClick={() => openFeature('ide')}
                                    className="px-6 py-3 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Demo da IDE
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-8 h-8 ${features.find(f => f.id === activeFeature)?.color} rounded-lg flex items-center justify-center`}>
                                        {React.createElement(features.find(f => f.id === activeFeature)?.icon || Code, { className: 'w-5 h-5 text-white' })}
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {features.find(f => f.id === activeFeature)?.name}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeFeature}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                >
                                    Voltar à Demonstração
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            {renderFeatureContent()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
