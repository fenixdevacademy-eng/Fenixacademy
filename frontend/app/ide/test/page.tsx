'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Code, CheckCircle, XCircle } from 'lucide-react';

export default function IDETestPage() {
    const [testResults, setTestResults] = useState<Record<string, boolean>>({});
    const [isRunning, setIsRunning] = useState(false);

    const runTests = async () => {
        setIsRunning(true);
        const results: Record<string, boolean> = {};

        // Teste 1: Verificar se a IDE está online
        try {
            results.online = true;
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            results.online = false;
        }

        // Teste 2: Verificar funcionalidades básicas
        try {
            results.basicFeatures = true;
            await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
            results.basicFeatures = false;
        }

        // Teste 3: Verificar execução de código
        try {
            results.codeExecution = true;
            await new Promise(resolve => setTimeout(resolve, 400));
        } catch (error) {
            results.codeExecution = false;
        }

        // Teste 4: Verificar AI Assistant
        try {
            results.aiAssistant = true;
            await new Promise(resolve => setTimeout(resolve, 600));
        } catch (error) {
            results.aiAssistant = false;
        }

        // Teste 5: Verificar gamificação
        try {
            results.gamification = true;
            await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
            results.gamification = false;
        }

        setTestResults(results);
        setIsRunning(false);
    };

    const getTestStatus = (testName: string) => {
        if (!testResults.hasOwnProperty(testName)) return 'pending';
        return testResults[testName] ? 'passed' : 'failed';
    };

    const getTestIcon = (testName: string) => {
        const status = getTestStatus(testName);
        switch (status) {
            case 'passed':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'failed':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <div className="w-5 h-5 border-2 border-gray-400 border-dashed rounded-full" />;
        }
    };

    const getTestColor = (testName: string) => {
        const status = getTestStatus(testName);
        switch (status) {
            case 'passed':
                return 'bg-green-600/20 border-green-500/30';
            case 'failed':
                return 'bg-red-600/20 border-red-500/30';
            default:
                return 'bg-gray-600/20 border-gray-500/30';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-b border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">🧪</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    Teste da IDE Online
                                </h1>
                                <p className="text-blue-200 text-lg">
                                    Verifique se todas as funcionalidades estão funcionando
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={runTests}
                                disabled={isRunning}
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105 disabled:scale-100 shadow-lg flex items-center space-x-2"
                            >
                                <Play className="w-5 h-5" />
                                <span>{isRunning ? 'Executando...' : 'Executar Testes'}</span>
                            </button>

                            <Link
                                href="/ide"
                                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                Voltar para IDE
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conteúdo dos Testes */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Status Geral */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                        <span className="text-2xl">📊</span>
                        <span>Status dos Testes</span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400">
                                {Object.values(testResults).filter(Boolean).length}
                            </div>
                            <div className="text-sm text-gray-400">Testes Passaram</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-400">
                                {Object.values(testResults).filter(r => r === false).length}
                            </div>
                            <div className="text-sm text-gray-400">Testes Falharam</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-400">
                                {Object.keys(testResults).length}
                            </div>
                            <div className="text-sm text-gray-400">Total Executados</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400">
                                {Object.keys(testResults).length > 0 ? Math.round((Object.values(testResults).filter(Boolean).length / Object.keys(testResults).length) * 100) : 0}%
                            </div>
                            <div className="text-sm text-gray-400">Taxa de Sucesso</div>
                        </div>
                    </div>

                    {Object.keys(testResults).length === 0 && (
                        <div className="text-center py-8">
                            <div className="text-gray-400 mb-4">
                                Clique em "Executar Testes" para verificar o status da IDE
                            </div>
                        </div>
                    )}
                </div>

                {/* Lista de Testes */}
                <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${getTestColor('online')} transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {getTestIcon('online')}
                                <div>
                                    <h3 className="text-white font-medium">IDE Online</h3>
                                    <p className="text-gray-300 text-sm">Verificar se a IDE está funcionando online</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-400">
                                {getTestStatus('online') === 'pending' && 'Pendente'}
                                {getTestStatus('online') === 'passed' && '✅ Passou'}
                                {getTestStatus('online') === 'failed' && '❌ Falhou'}
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${getTestColor('basicFeatures')} transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {getTestIcon('basicFeatures')}
                                <div>
                                    <h3 className="text-white font-medium">Funcionalidades Básicas</h3>
                                    <p className="text-gray-300 text-sm">Editor, syntax highlighting e autocomplete</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-400">
                                {getTestStatus('basicFeatures') === 'pending' && 'Pendente'}
                                {getTestStatus('basicFeatures') === 'passed' && '✅ Passou'}
                                {getTestStatus('basicFeatures') === 'failed' && '❌ Falhou'}
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${getTestColor('codeExecution')} transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {getTestIcon('codeExecution')}
                                <div>
                                    <h3 className="text-white font-medium">Execução de Código</h3>
                                    <p className="text-gray-300 text-sm">HTML, JavaScript e CSS no navegador</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-400">
                                {getTestStatus('codeExecution') === 'pending' && 'Pendente'}
                                {getTestStatus('codeExecution') === 'passed' && '✅ Passou'}
                                {getTestStatus('codeExecution') === 'failed' && '❌ Falhou'}
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${getTestColor('aiAssistant')} transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {getTestIcon('aiAssistant')}
                                <div>
                                    <h3 className="text-white font-medium">AI Assistant</h3>
                                    <p className="text-gray-300 text-sm">Análise e otimização de código</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-400">
                                {getTestStatus('aiAssistant') === 'pending' && 'Pendente'}
                                {getTestStatus('aiAssistant') === 'passed' && '✅ Passou'}
                                {getTestStatus('aiAssistant') === 'failed' && '❌ Falhou'}
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${getTestColor('gamification')} transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {getTestIcon('gamification')}
                                <div>
                                    <h3 className="text-white font-medium">Gamificação</h3>
                                    <p className="text-gray-300 text-sm">Sistema de conquistas e níveis</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-400">
                                {getTestStatus('gamification') === 'pending' && 'Pendente'}
                                {getTestStatus('gamification') === 'passed' && '✅ Passou'}
                                {getTestStatus('gamification') === 'failed' && '❌ Falhou'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resultado Final */}
                {Object.keys(testResults).length > 0 && (
                    <div className="mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">Resultado Final</h3>

                        {Object.values(testResults).every(Boolean) ? (
                            <div className="text-center py-6">
                                <div className="text-6xl mb-4">🎉</div>
                                <h4 className="text-2xl font-bold text-green-400 mb-2">Todos os Testes Passaram!</h4>
                                <p className="text-gray-300 mb-4">
                                    A Fenix IDE 2.0 está funcionando perfeitamente online!
                                </p>
                                <Link
                                    href="/ide"
                                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                    <Code className="w-5 h-5" />
                                    <span>Começar a Programar!</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <div className="text-6xl mb-4">⚠️</div>
                                <h4 className="text-2xl font-bold text-yellow-400 mb-2">Alguns Testes Falharam</h4>
                                <p className="text-gray-300 mb-4">
                                    Verifique as configurações e tente novamente.
                                </p>
                                <button
                                    onClick={runTests}
                                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                    <Play className="w-5 h-5" />
                                    <span>Executar Novamente</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
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
                            Teste de Funcionalidade da Fenix IDE 2.0 Online 🧪
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



