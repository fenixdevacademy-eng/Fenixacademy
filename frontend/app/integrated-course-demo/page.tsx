'use client';

import React, { useState } from 'react';
import IntegratedCourseView from '../components/IntegratedCourseView';

export default function IntegratedCourseDemoPage() {
    const [courseId, setCourseId] = useState('1');
    const [lessonId, setLessonId] = useState('1');

    const courses = [
        { id: '1', name: 'Web Development', description: 'Desenvolvimento web completo' },
        { id: '2', name: 'Data Science', description: 'Ciência de dados e ML' },
        { id: '3', name: 'Mobile Development', description: 'Desenvolvimento mobile' },
        { id: '4', name: 'DevOps', description: 'DevOps e infraestrutura' },
        { id: '5', name: 'AI & ML', description: 'Inteligência artificial' }
    ];

    const lessons = [
        { id: '1', name: 'Fundamentos', description: 'Conceitos básicos' },
        { id: '2', name: 'Implementação', description: 'Código prático' },
        { id: '3', name: 'Projeto Final', description: 'Aplicação completa' }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header da Demonstração */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-bold mb-4">
                        🚀 Demonstração: Curso Integrado com Elementos Interativos
                    </h1>
                    <p className="text-xl opacity-90">
                        Experimente como o conteúdo real dos cursos se integra com slides, quizzes, simuladores e muito mais!
                    </p>
                </div>
            </div>

            {/* Seletor de Curso e Aula */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Seletor de Curso */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📚 Selecione o Curso:
                            </label>
                            <select
                                value={courseId}
                                onChange={(e) => setCourseId(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name} - {course.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Seletor de Aula */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🎯 Selecione a Aula:
                            </label>
                            <select
                                value={lessonId}
                                onChange={(e) => setLessonId(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                {lessons.map((lesson) => (
                                    <option key={lesson.id} value={lesson.id}>
                                        Aula {lesson.id} - {lesson.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Informações do Curso Selecionado */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">
                            🎓 Curso Atual: {courses.find(c => c.id === courseId)?.name}
                        </h3>
                        <p className="text-blue-700 mb-3">
                            {courses.find(c => c.id === courseId)?.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">20</div>
                                <div className="text-blue-700">Módulos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">60</div>
                                <div className="text-blue-700">Aulas</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">5</div>
                                <div className="text-blue-700">Elementos Interativos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">120h</div>
                                <div className="text-blue-700">Duração Total</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualizador do Curso Integrado */}
            <IntegratedCourseView />

            {/* Footer Informativo */}
            <div className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">🎯 Elementos Interativos</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>• Slides visuais e animados</li>
                                <li>• Quizzes integrados</li>
                                <li>• Simuladores práticos</li>
                                <li>• Code playgrounds</li>
                                <li>• Projetos colaborativos</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">🚀 Benefícios</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>• Aprendizado ativo</li>
                                <li>• Retenção melhorada</li>
                                <li>• Aplicação prática</li>
                                <li>• Colaboração em equipe</li>
                                <li>• Feedback imediato</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">📊 Métricas</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>• 95% de engajamento</li>
                                <li>• 40% mais retenção</li>
                                <li>• 60% menos tempo de aprendizado</li>
                                <li>• 80% satisfação dos alunos</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                        <p className="text-gray-400">
                            🎉 Esta é a evolução da plataforma Fenix Academy com elementos interativos integrados!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
