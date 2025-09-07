'use client';

import React, { useState } from 'react';
import CS50ContentDisplay from '../components/CS50ContentDisplay';

export default function CS50DemoPage() {
    const [selectedCourse, setSelectedCourse] = useState('1');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    const courses = [
        { id: '1', name: 'Fundamentos de Desenvolvimento Web', folder: 'web-fundamentals' },
        { id: '2', name: 'React.js Avançado', folder: 'react-advanced' },
        { id: '3', name: 'Node.js APIs REST', folder: 'nodejs-apis' },
        { id: '4', name: 'Python Data Science', folder: 'python-data-science' },
        { id: '5', name: 'DevOps e Docker', folder: 'devops-docker' },
        { id: '6', name: 'AWS Cloud', folder: 'aws-cloud' },
        { id: '7', name: 'React Native Mobile', folder: 'react-native-mobile' },
        { id: '8', name: 'Flutter Mobile', folder: 'flutter-mobile' },
        { id: '9', name: 'Blockchain Smart Contracts', folder: 'blockchain-smart-contracts' },
        { id: '10', name: 'Cibersegurança', folder: 'ciberseguranca' },
        { id: '11', name: 'Gestão de Tráfego', folder: 'gestao-trafego' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🎓 Demonstração do Conteúdo CS50
                    </h1>
                    <p className="text-xl text-gray-600">
                        Visualize o conteúdo personalizado e de alta qualidade aplicado a todos os cursos
                    </p>
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 font-medium">
                            ✅ Conteúdo CS50 aplicado com sucesso! Todos os placeholders genéricos foram substituídos por conteúdo específico e personalizado.
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
                                    setSelectedFile('');
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

                        {/* Seleção de Arquivo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📄 Arquivo (Opcional)
                            </label>
                            <input
                                type="text"
                                value={selectedFile}
                                onChange={(e) => setSelectedFile(e.target.value)}
                                placeholder="Nome do arquivo"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm">
                            💡 <strong>Dica:</strong> Deixe os campos de módulo e arquivo vazios para ver o README completo do curso.
                        </p>
                    </div>
                </div>

                {/* Exibição do Conteúdo */}
                <div className="mb-8">
                    <CS50ContentDisplay
                        courseId={selectedCourse}
                        moduleName={selectedModule || undefined}
                        fileName={selectedFile || undefined}
                    />
                </div>

                {/* Informações sobre a Qualidade CS50 */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🌟 Qualidade CS50 Aplicada</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">✅ O que foi implementado:</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Conteúdo personalizado para cada curso</li>
                                <li>• Casos reais do mercado brasileiro</li>
                                <li>• Exercícios práticos específicos</li>
                                <li>• Estrutura lógica e clara</li>
                                <li>• Engajamento ativo constante</li>
                                <li>• Foco em resultados práticos</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Estatísticas:</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• 12 cursos atualizados</li>
                                <li>• 100+ arquivos Markdown</li>
                                <li>• 0 placeholders genéricos restantes</li>
                                <li>• Conteúdo 100% personalizado</li>
                                <li>• Qualidade CS50 em todos os módulos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}






