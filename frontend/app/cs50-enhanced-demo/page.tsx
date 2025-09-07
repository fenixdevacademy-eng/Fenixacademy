'use client';

import React, { useState } from 'react';
import CS50EnhancedDisplay from '../components/CS50EnhancedDisplay';

export default function CS50EnhancedDemoPage() {
    const [selectedCourse, setSelectedCourse] = useState('1');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedLesson, setSelectedLesson] = useState('');

    const courses = [
        { id: '1', name: 'Fundamentos de Desenvolvimento Web (20 módulos, 60 aulas)', folder: 'web-fundamentals' },
        { id: '2', name: 'React.js Avançado (20 módulos, 60 aulas)', folder: 'react-advanced' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🎓 Demonstração do Sistema CS50 Melhorado
                    </h1>
                    <p className="text-xl text-gray-600">
                        Sistema completo com padrão CS50 de Harvard implementado
                    </p>
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 font-medium">
                            ✅ Sistema CS50 completo implementado! Inclui estrutura de aula, exercícios interativos, projetos práticos e métricas de progresso.
                        </p>
                    </div>
                </div>

                {/* Controles de Seleção */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Selecione o Conteúdo</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Seleção de Curso */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📚 Curso
                            </label>
                            <select
                                value={selectedCourse}
                                onChange={(e) => {
                                    setSelectedCourse(e.target.value);
                                    setSelectedModule('');
                                    setSelectedLesson('');
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Seleção de Módulo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📖 Módulo (Opcional)
                            </label>
                            <input
                                type="text"
                                value={selectedModule}
                                onChange={(e) => setSelectedModule(e.target.value)}
                                placeholder="Nome do módulo"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Seleção de Aula */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🎯 Aula (Opcional)
                            </label>
                            <input
                                type="text"
                                value={selectedLesson}
                                onChange={(e) => setSelectedLesson(e.target.value)}
                                placeholder="Nome da aula"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-sm">
                            <strong>Funcionalidades CS50 implementadas:</strong><br />
                            • 🎬 Estrutura de aula CS50 (Abertura, Desenvolvimento, Aplicação, Conclusão)<br />
                            • 🧪 Exercícios interativos com diferentes níveis de dificuldade<br />
                            • 🏆 Sistema de pontos e progresso<br />
                            • 💼 Casos reais do mercado brasileiro<br />
                            • 📊 Métricas de progresso e streak<br />
                            • 🎯 Projetos práticos baseados em problemas reais
                        </p>
                    </div>
                </div>

                {/* Componente CS50 Melhorado */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <CS50EnhancedDisplay
                        courseId={selectedCourse}
                        moduleId={selectedModule}
                        lessonId={selectedLesson}
                    />
                </div>

                {/* Informações Adicionais */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Como Funciona o Sistema CS50</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Estrutura de Aula CS50</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    <strong>🎬 Abertura (2-3 min):</strong> Hook visual e pergunta provocativa
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <strong>🏗️ Desenvolvimento (15-20 min):</strong> Conceitos + exemplos + exercícios
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    <strong>🎯 Aplicação (10-15 min):</strong> Problema real + solução passo a passo
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                    <strong>📝 Conclusão (3-5 min):</strong> Resumo visual + próximos passos
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">🧪 Exercícios e Problemas</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <strong>🎮 Problema Rápido (2-3 min):</strong> Contexto simples, solução em 3 passos
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                    <strong>🏆 Problema Intermediário (5-8 min):</strong> Cenário realista, múltiplas soluções
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    <strong>🚀 Problema Avançado (10-15 min):</strong> Projeto completo com requisitos claros
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Diferenciação CS50</h3>
                        <p className="text-blue-800 text-sm">
                            Este sistema implementa o mesmo padrão de qualidade do CS50 de Harvard, incluindo clareza absoluta nas explicações,
                            estrutura perfeita de progressão, engajamento constante com problemas práticos, e aplicação imediata hands-on.
                            Os casos reais do mercado brasileiro tornam o aprendizado relevante e prático para o contexto local.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
