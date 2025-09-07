'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Code, Zap, Bot, Trophy, Globe } from 'lucide-react';

export default function IDEDemoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-b border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">🚀</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    Fenix IDE 2.0 - Demo Online
                                </h1>
                                <p className="text-blue-200 text-lg">
                                    Veja a IDE funcionando diretamente no navegador
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/ide"
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
                        >
                            <Play className="w-5 h-5" />
                            <span>Testar IDE Online</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Conteúdo da Demo */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Funcionalidades Principais */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-blue-600/20 rounded-lg">
                                <Globe className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">100% Online</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">
                            Funciona diretamente no navegador sem downloads, instalações ou configurações.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">Sem Download</span>
                            <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">Instantâneo</span>
                            <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">Cross-Platform</span>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-green-500 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-green-600/20 rounded-lg">
                                <Code className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Editor Completo</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">
                            Editor profissional com syntax highlighting, autocomplete e suporte a 20+ linguagens.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Syntax Highlighting</span>
                            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Autocomplete</span>
                            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">20+ Linguagens</span>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-purple-600/20 rounded-lg">
                                <Bot className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">
                            Assistente de IA integrado para análise, otimização e debugging de código.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">Code Review</span>
                            <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">Otimização</span>
                            <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">Debug IA</span>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-yellow-600/20 rounded-lg">
                                <Zap className="w-6 h-6 text-yellow-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Hot Reload</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">
                            Recarregamento automático em tempo real para desenvolvimento ágil.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full">Tempo Real</span>
                            <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full">Automático</span>
                            <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full">Ágil</span>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-orange-600/20 rounded-lg">
                                <Trophy className="w-6 h-6 text-orange-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Gamificação</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">
                            Sistema de conquistas, níveis e progressão para motivar o desenvolvimento.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full">Conquistas</span>
                            <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full">Níveis</span>
                            <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full">Progressão</span>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-red-500 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-red-600/20 rounded-lg">
                                <span className="text-2xl">🇧🇷</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Ferramentas Brasileiras</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">
                            Validações CPF/CNPJ, sistema PIX, compliance LGPD e formatações nacionais.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full">CPF/CNPJ</span>
                            <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full">PIX</span>
                            <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full">LGPD</span>
                        </div>
                    </div>
                </div>

                {/* Como Funciona */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                        <span className="text-2xl">⚡</span>
                        <span>Como Funciona a IDE Online</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🌐</span>
                            </div>
                            <h4 className="text-white font-medium mb-2">1. Acesse no Navegador</h4>
                            <p className="text-gray-300 text-sm">Digite /ide na URL ou clique no botão da IDE em qualquer curso</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">💻</span>
                            </div>
                            <h4 className="text-white font-medium mb-2">2. Comece a Programar</h4>
                            <p className="text-gray-300 text-sm">Crie arquivos, use templates e edite código com todas as funcionalidades</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <h4 className="text-white font-medium mb-2">3. Execute e Teste</h4>
                            <p className="text-gray-300 text-sm">Execute código diretamente no navegador e veja resultados em tempo real</p>
                        </div>
                    </div>
                </div>

                {/* CTA Principal */}
                <div className="text-center">
                    <Link
                        href="/ide"
                        className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xl font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
                    >
                        <Play className="w-6 h-6" />
                        <span>🚀 Testar Fenix IDE 2.0 Online Agora!</span>
                    </Link>
                    <p className="text-gray-400 mt-4 text-sm">
                        Sem downloads • Sem instalações • Funciona em qualquer dispositivo
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800/50 border-t border-gray-700/50 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/ide"
                                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Voltar para IDE</span>
                            </Link>
                        </div>
                        <div className="text-gray-400 text-sm">
                            Fenix IDE 2.0 - Revolucionando o desenvolvimento online! 🚀
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



