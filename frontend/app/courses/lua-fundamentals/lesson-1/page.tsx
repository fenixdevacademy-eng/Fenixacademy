'use client';

import React, { useState } from 'react';
import { Play, CheckCircle, ArrowLeft, ArrowRight, Code, BookOpen } from 'lucide-react';

export default function Lesson1Page() {
    const [code, setCode] = useState(`-- Meu primeiro programa em Lua
print("Olá, mundo!")
print("Bem-vindos à Fênix Academy!")

-- Variáveis em Lua
nome = "João"
idade = 25
altura = 1.75
ativo = true

print("Nome:", nome)
print("Idade:", idade)
print("Altura:", altura)
print("Ativo:", ativo)`);

    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const runCode = () => {
        setIsRunning(true);
        setOutput('Executando código...\n');

        // Simular execução do código
        setTimeout(() => {
            setOutput(`Olá, mundo!
Bem-vindos à Fênix Academy!
Nome: João
Idade: 25
Altura: 1.75
Ativo: true`);
            setIsRunning(false);
        }, 1000);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            {/* Header */}
            <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="text-white hover:text-blue-200 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-white">Aula 1: O que é Lua?</h1>
                                <p className="text-blue-200 text-sm">Introdução ao Lua</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                <CheckCircle className="w-4 h-4 mr-2 inline" />
                                Marcar como Concluída
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Conteúdo da Aula */}
                    <div className="space-y-6">
                        {/* Introdução */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-4">🌙 O que é Lua?</h2>
                            <div className="space-y-4 text-blue-100">
                                <p>
                                    Lua é uma linguagem de programação <strong className="text-white">simples</strong>,
                                    <strong className="text-white"> rápida</strong> e <strong className="text-white">leve</strong>
                                    criada no Brasil em 1993.
                                </p>
                                <p>
                                    O nome "Lua" significa "lua" em português, e foi escolhido porque a linguagem
                                    é como uma lua - pequena, mas com grande influência!
                                </p>
                                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                                    <h3 className="font-semibold text-white mb-2">🎯 Onde Lua é usada?</h3>
                                    <ul className="space-y-1 text-sm">
                                        <li>• <strong>Jogos:</strong> World of Warcraft, Angry Birds, Roblox</li>
                                        <li>• <strong>Web:</strong> Nginx, Redis</li>
                                        <li>• <strong>IoT:</strong> Dispositivos inteligentes</li>
                                        <li>• <strong>Automação:</strong> Scripts e ferramentas</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Características */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <h2 className="text-xl font-bold text-white mb-4">✨ Por que aprender Lua?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                                    <h3 className="font-semibold text-white mb-2">Fácil de Aprender</h3>
                                    <p className="text-sm text-green-200">Sintaxe simples e intuitiva</p>
                                </div>
                                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
                                    <h3 className="font-semibold text-white mb-2">Muito Rápida</h3>
                                    <p className="text-sm text-yellow-200">Performance excelente</p>
                                </div>
                                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                                    <h3 className="font-semibold text-white mb-2">Leve</h3>
                                    <p className="text-sm text-blue-200">Apenas 200KB de tamanho</p>
                                </div>
                                <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                                    <h3 className="font-semibold text-white mb-2">Flexível</h3>
                                    <p className="text-sm text-purple-200">Muitas formas de resolver problemas</p>
                                </div>
                            </div>
                        </div>

                        {/* Primeiros Passos */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <h2 className="text-xl font-bold text-white mb-4">🚀 Primeiros Passos</h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                                    <div>
                                        <h3 className="font-semibold text-white">Instale o Lua</h3>
                                        <p className="text-sm text-blue-200">Baixe em lua.org e instale no seu computador</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                                    <div>
                                        <h3 className="font-semibold text-white">Abra o terminal</h3>
                                        <p className="text-sm text-blue-200">Digite 'lua' para abrir o interpretador</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                                    <div>
                                        <h3 className="font-semibold text-white">Escreva seu primeiro código</h3>
                                        <p className="text-sm text-blue-200">print("Olá, Lua!")</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor de Código */}
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                            <div className="flex items-center justify-between p-4 border-b border-white/20">
                                <h3 className="text-lg font-semibold text-white flex items-center">
                                    <Code className="w-5 h-5 mr-2" />
                                    Editor de Código
                                </h3>
                                <button
                                    onClick={runCode}
                                    disabled={isRunning}
                                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                                >
                                    <Play className="w-4 h-4" />
                                    <span>{isRunning ? 'Executando...' : 'Executar'}</span>
                                </button>
                            </div>

                            <div className="p-4">
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Digite seu código Lua aqui..."
                                />
                            </div>
                        </div>

                        {/* Output */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                            <div className="p-4 border-b border-white/20">
                                <h3 className="text-lg font-semibold text-white">Saída do Código</h3>
                            </div>
                            <div className="p-4">
                                <pre className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 min-h-32 whitespace-pre-wrap">
                                    {output || 'Execute o código para ver a saída aqui...'}
                                </pre>
                            </div>
                        </div>

                        {/* Navegação */}
                        <div className="flex justify-between">
                            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Aula Anterior</span>
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                                <span>Próxima Aula</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




















