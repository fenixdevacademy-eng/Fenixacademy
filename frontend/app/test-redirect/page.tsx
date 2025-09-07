'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigationConfig } from '../navigation-config';

export default function TestRedirect() {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

    const testCourses = [
        { id: 1, name: 'Fundamentos de Desenvolvimento Web', slug: 'fundamentos-desenvolvimento-web' },
        { id: 2, name: 'Python Data Science', slug: 'python-data-science' },
        { id: 3, name: 'React Avançado', slug: 'react-avancado' },
        { id: 4, name: 'Node.js Backend Development', slug: 'nodejs-backend-development' },
        { id: 5, name: 'Machine Learning com Python', slug: 'machine-learning-python' },
        { id: 6, name: 'Desenvolvimento Mobile', slug: 'desenvolvimento-mobile' },
        { id: 7, name: 'Cybersecurity e Ethical Hacking', slug: 'cybersecurity-ethical-hacking' },
        { id: 8, name: 'DevOps e CI/CD', slug: 'devops-cicd' },
        { id: 9, name: 'Flutter Mobile Development', slug: 'flutter-mobile' },
        { id: 10, name: 'AWS Cloud', slug: 'aws-cloud' },
        { id: 11, name: 'Blockchain e Smart Contracts', slug: 'blockchain-smart-contracts' },
        { id: 12, name: 'React Native Mobile Development', slug: 'react-native-mobile' },
        { id: 13, name: 'Data Engineering', slug: 'data-engineering' },
        { id: 14, name: 'Game Development', slug: 'game-development' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🧪 Teste de Redirecionamento - Fenix Academy
                    </h1>
                    <p className="text-lg text-gray-600">
                        Teste o sistema de redirecionamento para todos os cursos
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testCourses.map((course) => (
                        <div
                            key={course.id}
                            className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all ${selectedCourse === course.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {course.id}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {course.name}
                                </h3>

                                <p className="text-sm text-gray-600 mb-4">
                                    Slug: <code className="bg-gray-100 px-2 py-1 rounded">{course.slug}</code>
                                </p>

                                <div className="space-y-2">
                                    {/* Link direto */}
                                    <Link
                                        href={`/course/${course.slug}`}
                                        className="block w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center text-sm"
                                    >
                                        🎯 Acesso Direto
                                    </Link>

                                    {/* Link via redirecionamento */}
                                    <Link
                                        href={navigationConfig.getRedirectUrl(course.id)}
                                        className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center text-sm"
                                    >
                                        🔄 Via Redirecionamento
                                    </Link>

                                    {/* URL de redirecionamento */}
                                    <div className="text-xs text-gray-500 mt-2">
                                        <code className="bg-gray-100 px-2 py-1 rounded">
                                            {navigationConfig.getRedirectUrl(course.id)}
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/courses"
                        className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors"
                    >
                        ← Voltar para Cursos
                    </Link>
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        📋 Informações do Sistema de Redirecionamento
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h3 className="font-medium text-gray-700 mb-2">Configurações:</h3>
                            <ul className="space-y-1 text-gray-600">
                                <li>• Total de cursos: {testCourses.length}</li>
                                <li>• Base URL: {navigationConfig.courseBase}</li>
                                <li>• Página de redirecionamento: {navigationConfig.courseRedirect}</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-700 mb-2">Funcionalidades:</h3>
                            <ul className="space-y-1 text-gray-600">
                                <li>• Redirecionamento automático por ID</li>
                                <li>• Validação de slugs</li>
                                <li>• Fallback para página de cursos</li>
                                <li>• URLs limpas e SEO-friendly</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
