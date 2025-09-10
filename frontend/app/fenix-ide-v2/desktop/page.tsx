'use client';

import { useState, useEffect } from 'react';
import { Code, Download, Terminal, ArrowLeft, Play, FileText, Github, Globe } from 'lucide-react';
import Link from 'next/link';

export default function FenixIDE2DesktopPage() {
    const [selectedPlatform, setSelectedPlatform] = useState('windows');
    const [isDownloading, setIsDownloading] = useState(false);

    const platforms = [
        {
            id: 'windows',
            name: 'Windows',
            icon: '🪟',
            description: 'Windows 10/11 (64-bit)',
            downloadUrl: '/desktop-setup/fenix-ide-v2-core.js',
            requirements: ['Windows 10 ou superior', 'Node.js 18+', '4GB RAM', '2GB espaço livre']
        },
        {
            id: 'macos',
            name: 'macOS',
            icon: '🍎',
            description: 'macOS 11+ (Intel/Apple Silicon)',
            downloadUrl: '/desktop-setup/fenix-ide-v2-core.js',
            requirements: ['macOS 11.0 ou superior', 'Node.js 18+', '4GB RAM', '2GB espaço livre']
        },
        {
            id: 'linux',
            name: 'Linux',
            icon: '🐧',
            description: 'Ubuntu 20.04+, Debian 11+',
            downloadUrl: '/desktop-setup/fenix-ide-v2-core.js',
            requirements: ['Ubuntu 20.04+ ou Debian 11+', 'Node.js 18+', '4GB RAM', '2GB espaço livre']
        }
    ];

    const desktopFiles = [
        {
            name: 'fenix-ide-v2-core.js',
            description: 'Núcleo principal da IDE com arquitetura modular',
            size: '45.2 KB',
            type: 'core'
        },
        {
            name: 'modules/editor.js',
            description: 'Editor avançado com suporte a múltiplas linguagens',
            size: '32.1 KB',
            type: 'module'
        },
        {
            name: 'modules/ai-assistant.js',
            description: 'Assistente de IA com contexto brasileiro',
            size: '28.7 KB',
            type: 'module'
        },
        {
            name: 'modules/auto-complete.js',
            description: 'Sistema de auto-complete inteligente',
            size: '25.3 KB',
            type: 'module'
        },
        {
            name: 'demo-fenix-ide-v2.js',
            description: 'Demonstração completa da IDE',
            size: '18.9 KB',
            type: 'demo'
        },
        {
            name: 'README-FENIX-IDE-V2.md',
            description: 'Documentação completa da IDE',
            size: '15.6 KB',
            type: 'docs'
        }
    ];

    const handleDownload = async (platform: string) => {
        setIsDownloading(true);

        try {
            // Simular download
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Redirecionar para o arquivo específico
            const platformData = platforms.find(p => p.id === platform);
            if (platformData) {
                window.open(platformData.downloadUrl, '_blank');
            }
        } catch (error) {
            console.error('Erro no download:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    const getFileTypeIcon = (type: string) => {
        switch (type) {
            case 'core':
                return <Code className="h-5 w-5 text-blue-600" />;
            case 'module':
                return <Terminal className="h-5 w-5 text-green-600" />;
            case 'demo':
                return <Play className="h-5 w-5 text-yellow-600" />;
            case 'docs':
                return <FileText className="h-5 w-5 text-purple-600" />;
            default:
                return <FileText className="h-5 w-5 text-gray-600" />;
        }
    };

    const getFileTypeColor = (type: string) => {
        switch (type) {
            case 'core':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'module':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'demo':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'docs':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
                            <Terminal className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-semibold text-gray-900 dark:text-white">
                                Fenix IDE 2.0 - Desktop
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Download Section */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Download da Fenix IDE 2.0
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Escolha sua plataforma e baixe a versão desktop da IDE mais avançada do Brasil
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {platforms.map((platform) => (
                            <div
                                key={platform.id}
                                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 transition-all duration-200 ${selectedPlatform === platform.id
                                        ? 'border-blue-500 shadow-xl'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <div className="text-center">
                                    <div className="text-4xl mb-4">{platform.icon}</div>
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {platform.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {platform.description}
                                    </p>

                                    <button
                                        onClick={() => setSelectedPlatform(platform.id)}
                                        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${selectedPlatform === platform.id
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Selecionar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedPlatform && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Download para {platforms.find(p => p.id === selectedPlatform)?.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Clique no botão abaixo para baixar a versão desktop
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        📋 Requisitos do Sistema
                                    </h4>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        {platforms.find(p => p.id === selectedPlatform)?.requirements.map((req, index) => (
                                            <li key={index} className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        🚀 Instalação Rápida
                                    </h4>
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                                        <div className="text-gray-600 dark:text-gray-400 mb-2"># Clone o repositório</div>
                                        <div className="text-green-600">git clone https://github.com/fenix-academy/fenix-ide-v2.git</div>
                                        <div className="text-gray-600 dark:text-gray-400 my-2"># Entre no diretório</div>
                                        <div className="text-green-600">cd fenix-ide-v2</div>
                                        <div className="text-gray-600 dark:text-gray-400 my-2"># Execute a demo</div>
                                        <div className="text-green-600">node desktop-setup/demo-fenix-ide-v2.js</div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => handleDownload(selectedPlatform)}
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
                                            Baixar Fenix IDE 2.0 para {platforms.find(p => p.id === selectedPlatform)?.name}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Files Section */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Arquivos da IDE
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Explore os componentes modulares da Fenix IDE 2.0
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {desktopFiles.map((file, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        {getFileTypeIcon(file.type)}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {file.name}
                                            </h3>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(file.type)}`}>
                                                {file.type.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {file.size}
                                    </span>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {file.description}
                                </p>

                                <div className="flex space-x-2">
                                    <button className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                                        <FileText className="h-4 w-4 mr-1" />
                                        Ver Código
                                    </button>
                                    <button className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Pronto para começar?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Baixe a Fenix IDE 2.0 e revolucione sua experiência de desenvolvimento
                        com funcionalidades brasileiras integradas.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => handleDownload(selectedPlatform)}
                            disabled={isDownloading}
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
                        >
                            <Download className="h-5 w-5 mr-2" />
                            Baixar Agora
                        </button>

                        <Link
                            href="https://github.com/fenix-academy/fenix-ide-v2"
                            className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                        >
                            <Github className="h-5 w-5 mr-2" />
                            Ver no GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}










