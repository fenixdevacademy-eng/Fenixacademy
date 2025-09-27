'use client';

import { useState } from 'react';
import Link from 'next/link';
// import { navigationConfig } from '../navigation-config';

interface CourseModule {
    id: number;
    title: string;
    description: string;
    lessons: number;
    duration: string;
}

interface CourseContent {
    id: number;
    title: string;
    slug: string;
    category: string;
    totalLessons: number;
    totalModules: number;
    duration: string;
    modules: CourseModule[];
}

export default function CourseContentPage() {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

    const toggleSection = (key: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(key)) {
            newExpanded.delete(key);
        } else {
            newExpanded.add(key);
        }
        setExpandedSections(newExpanded);
    }

    const coursesContent: CourseContent[] = [
        {
            id: 1,
            title: 'Fundamentos de Desenvolvimento Web',
            slug: 'fundamentos-desenvolvimento-web',
            category: 'Desenvolvimento Web',
            totalLessons: 72,
            totalModules: 4,
            duration: '70h',
            modules: [
                {
                    id: 1,
                    title: 'Introdução ao Desenvolvimento Web',
                    description: 'Conceitos básicos e história da web',
                    lessons: 18,
                    duration: '18h'
                },
                {
                    id: 2,
                    title: 'HTML e CSS',
                    description: 'Estrutura e estilização de páginas web',
                    lessons: 24,
                    duration: '24h'
                },
                {
                    id: 3,
                    title: 'JavaScript Básico',
                    description: 'Programação com JavaScript',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Projetos Práticos',
                    description: 'Desenvolvimento de projetos reais',
                    lessons: 10,
                    duration: '8h'
                }
            ]
        },
        {
            id: 2,
            title: 'React.js Avançado',
            slug: 'react-js-avancado',
            category: 'Frontend',
            totalLessons: 45,
            totalModules: 3,
            duration: '50h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos do React',
                    description: 'Componentes, props e estado',
                    lessons: 15,
                    duration: '15h'
                },
                {
                    id: 2,
                    title: 'Hooks e Context API',
                    description: 'Gerenciamento de estado moderno',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Projetos Avançados',
                    description: 'Aplicações complexas com React',
                    lessons: 10,
                    duration: '15h'
                }
            ]
        },
        {
            id: 3,
            title: 'Node.js e Backend',
            slug: 'node-js-backend',
            category: 'Backend',
            totalLessons: 38,
            totalModules: 3,
            duration: '45h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos do Node.js',
                    description: 'JavaScript no servidor',
                    lessons: 12,
                    duration: '15h'
                },
                {
                    id: 2,
                    title: 'Express.js e APIs',
                    description: 'Criação de APIs RESTful',
                    lessons: 16,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Banco de Dados',
                    description: 'MongoDB e integração',
                    lessons: 10,
                    duration: '10h'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Conteúdo dos Cursos</h1>
                    <p className="text-gray-600 mt-2">Gerencie e visualize todo o conteúdo dos cursos da plataforma</p>
                </div>

                <div className="space-y-6">
                    {coursesContent.map((course) => (
                        <div key={course.id} className="bg-white rounded-lg shadow-sm border">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>
                                        <p className="text-gray-600">{course.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">
                                            {course.totalLessons} aulas • {course.duration}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {course.totalModules} módulos
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <button
                                        onClick={() => toggleSection(`course-${course.id}`)}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <span className="font-medium text-gray-900">
                                            Módulos do Curso
                                        </span>
                                        <svg
                                            className={`w-5 h-5 transform transition-transform ${expandedSections.has(`course-${course.id}`) ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {expandedSections.has(`course-${course.id}`) && (
                                        <div className="mt-4 space-y-3">
                                            {course.modules.map((module) => (
                                                <div key={module.id} className="bg-gray-50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">{module.title}</h3>
                                                            <p className="text-sm text-gray-600">{module.description}</p>
                                                        </div>
                                                        <div className="text-right text-sm text-gray-500">
                                                            <div>{module.lessons} aulas</div>
                                                            <div>{module.duration}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}