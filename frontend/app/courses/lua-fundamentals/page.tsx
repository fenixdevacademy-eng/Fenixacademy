'use client';

import React, { useState } from 'react';
import { Play, Code, BookOpen, Users, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react';

export default function LuaFundamentalsPage() {
    const [activeModule, setActiveModule] = useState(0);
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);

    const modules = [
        {
            id: 1,
            title: "Introdução ao Lua",
            duration: "2 horas",
            lessons: [
                {
                    id: 1,
                    title: "O que é Lua?",
                    duration: "30 min",
                    content: "Conheça a linguagem Lua, sua história e onde é usada no mundo real."
                },
                {
                    id: 2,
                    title: "Instalando Lua",
                    duration: "20 min",
                    content: "Aprenda a instalar Lua no seu computador e configurar o ambiente."
                },
                {
                    id: 3,
                    title: "Primeiro Programa",
                    duration: "40 min",
                    content: "Escreva seu primeiro programa em Lua e entenda a sintaxe básica."
                },
                {
                    id: 4,
                    title: "Variáveis e Tipos",
                    duration: "30 min",
                    content: "Aprenda sobre variáveis, tipos de dados e como usá-los em Lua."
                }
            ]
        },
        {
            id: 2,
            title: "Estruturas de Controle",
            duration: "2.5 horas",
            lessons: [
                {
                    id: 5,
                    title: "Condicionais (if/else)",
                    duration: "45 min",
                    content: "Use if, elseif e else para tomar decisões no seu código."
                },
                {
                    id: 6,
                    title: "Loops (for/while)",
                    duration: "50 min",
                    content: "Aprenda a repetir código com for e while loops."
                },
                {
                    id: 7,
                    title: "Tabelas",
                    duration: "55 min",
                    content: "Domine as tabelas, a estrutura de dados mais importante do Lua."
                }
            ]
        },
        {
            id: 3,
            title: "Funções e Módulos",
            duration: "2 horas",
            lessons: [
                {
                    id: 8,
                    title: "Criando Funções",
                    duration: "40 min",
                    content: "Aprenda a criar e usar funções para organizar seu código."
                },
                {
                    id: 9,
                    title: "Parâmetros e Retorno",
                    duration: "35 min",
                    content: "Entenda como passar parâmetros e retornar valores das funções."
                },
                {
                    id: 10,
                    title: "Módulos e Bibliotecas",
                    duration: "45 min",
                    content: "Organize seu código em módulos e use bibliotecas externas."
                }
            ]
        },
        {
            id: 4,
            title: "Projeto Prático",
            duration: "3 horas",
            lessons: [
                {
                    id: 11,
                    title: "Calculadora Simples",
                    duration: "60 min",
                    content: "Construa uma calculadora básica usando tudo que aprendeu."
                },
                {
                    id: 12,
                    title: "Jogo da Adivinhação",
                    duration: "60 min",
                    content: "Crie um jogo onde o computador adivinha o número que você pensou."
                },
                {
                    id: 13,
                    title: "Sistema de Notas",
                    duration: "60 min",
                    content: "Desenvolva um sistema para gerenciar notas de alunos."
                }
            ]
        }
    ];

    const toggleLessonComplete = (lessonId: number) => {
        if (completedLessons.includes(lessonId)) {
            setCompletedLessons(completedLessons.filter(id => id !== lessonId));
        } else {
            setCompletedLessons([...completedLessons, lessonId]);
        }
    }

    const progress = (completedLessons.length / 13) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            {/* Header */}
            <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Lua Fundamentals</h1>
                            <p className="text-blue-200 mt-2">Aprenda Lua de forma simples e prática</p>
                        </div>
                        <div className="flex items-center space-x-4 text-white">
                            <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5" />
                                <span>4 alunos</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5" />
                                <span>9.5 horas</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Star className="w-5 h-5" />
                                <span>4.8</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar - Módulos */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <h2 className="text-xl font-semibold text-white mb-4">Módulos do Curso</h2>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-blue-200 mb-2">
                                    <span>Progresso</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {modules.map((module, index) => (
                                    <div key={module.id} className="border border-white/20 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-white">{module.title}</h3>
                                            <span className="text-sm text-blue-200">{module.duration}</span>
                                        </div>

                                        <div className="space-y-2">
                                            {module.lessons.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${completedLessons.includes(lesson.id)
                                                            ? 'bg-green-500/20 border border-green-500/50'
                                                            : 'hover:bg-white/10'
                                                        }`}
                                                    onClick={() => toggleLessonComplete(lesson.id)}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        {completedLessons.includes(lesson.id) ? (
                                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                                        ) : (
                                                            <div className="w-4 h-4 border border-white/40 rounded-full"></div>
                                                        )}
                                                        <div>
                                                            <p className="text-sm text-white">{lesson.title}</p>
                                                            <p className="text-xs text-blue-200">{lesson.duration}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Code className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Bem-vindos ao Lua!</h2>
                                <p className="text-blue-200">
                                    Uma linguagem simples, poderosa e divertida de aprender
                                </p>
                            </div>

                            {/* Quick Start */}
                            <div className="bg-white/5 rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-semibold text-white mb-4">🚀 Comece Agora</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                                        <h4 className="font-semibold text-white mb-2">1. Instale o Lua</h4>
                                        <p className="text-sm text-blue-200">Baixe e instale o Lua no seu computador</p>
                                    </div>
                                    <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4">
                                        <h4 className="font-semibold text-white mb-2">2. Primeiro Código</h4>
                                        <p className="text-sm text-purple-200">Escreva "print('Olá, Lua!')" e veja a mágica</p>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <BookOpen className="w-6 h-6 text-green-400" />
                                    </div>
                                    <h4 className="font-semibold text-white mb-2">Fácil de Aprender</h4>
                                    <p className="text-sm text-blue-200">Sintaxe simples e intuitiva</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Play className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <h4 className="font-semibold text-white mb-2">Muito Rápida</h4>
                                    <p className="text-sm text-blue-200">Performance excelente</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Code className="w-6 h-6 text-red-400" />
                                    </div>
                                    <h4 className="font-semibold text-white mb-2">Versátil</h4>
                                    <p className="text-sm text-blue-200">Usada em jogos e sistemas</p>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="text-center">
                                <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
                                    <span>Começar Curso</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


























