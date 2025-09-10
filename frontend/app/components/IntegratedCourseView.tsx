'use client';

import React, { useState } from 'react';
import InteractiveSlides from './InteractiveSlides';
import InteractiveQuiz from './InteractiveQuiz';
import InteractiveSimulator from './InteractiveSimulator';
import CodePlayground from './CodePlayground';
import CollaborativeProjects from './CollaborativeProjects';
import { sampleInteractiveElements } from '../data/interactiveElements';

interface CourseContent {
    id: string;
    title: string;
    description: string;
    modules: Module[];
    totalModules: number;
    totalLessons: number;
    duration: string;
    level: string;
    category: string;
}

interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
}

interface Lesson {
    id: string;
    title: string;
    content: string;
    duration: string;
    type: string;
}

function IntegratedCourseView() {
    const [activeTab, setActiveTab] = useState('overview');
    const [courseContent, setCourseContent] = useState<CourseContent | null>(null);

    // Simular carregamento de conteúdo do curso
    React.useEffect(() => {
        // Simular dados do curso
        const mockCourseContent: CourseContent = {
            id: 'web-fundamentals',
            title: 'Fundamentos de Desenvolvimento Web',
            description: 'Curso completo de HTML, CSS e JavaScript',
            modules: [
                {
                    id: 'module-1',
                    title: 'Introdução ao HTML',
                    description: 'Aprenda os fundamentos do HTML',
                    lessons: [
                        {
                            id: 'lesson-1',
                            title: 'Estrutura HTML Básica',
                            content: 'Conteúdo da primeira aula...',
                            duration: '30 min',
                            type: 'theory'
                        }
                    ]
                }
            ],
            totalModules: 5,
            totalLessons: 25,
            duration: '20 horas',
            level: 'Iniciante',
            category: 'Web Development'
        };

        setCourseContent(mockCourseContent);
    }, []);

    if (!courseContent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-600 mb-4">Curso não encontrado</h2>
                    <p className="text-gray-500">O conteúdo solicitado não está disponível.</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: '📚 Visão Geral', icon: '📚' },
        { id: 'slides', label: '🎯 Slides', icon: '🎯' },
        { id: 'quiz', label: '🧠 Quiz', icon: '🧠' },
        { id: 'simulator', label: '🔬 Simulador', icon: '🔬' },
        { id: 'playground', label: '💻 Code Playground', icon: '💻' },
        { id: 'project', label: '👥 Projeto Colaborativo', icon: '👥' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {courseContent.title}
                            </h2>
                            <p className="text-gray-600 mb-6">{courseContent.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{courseContent.totalModules}</div>
                                    <div className="text-sm text-gray-600">Módulos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{courseContent.totalLessons}</div>
                                    <div className="text-sm text-gray-600">Aulas</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">{courseContent.duration}</div>
                                    <div className="text-sm text-gray-600">Duração</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">{courseContent.level}</div>
                                    <div className="text-sm text-gray-600">Nível</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Módulos do Curso</h3>
                            <div className="space-y-4">
                                {courseContent.modules.map((module) => (
                                    <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-800 mb-2">{module.title}</h4>
                                        <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                                        <div className="text-xs text-gray-500">
                                            {module.lessons.length} aulas
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'slides':
                return (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Slides Interativos</h3>
                        <InteractiveSlides slides={sampleInteractiveElements.slides.map(slide => ({
                            ...slide,
                            type: slide.type as "summary" | "exercise" | "concept" | "example",
                            elements: slide.elements.map(element => ({
                                ...element,
                                type: element.type as "text" | "code" | "video" | "image" | "interactive",
                                animation: {
                                    ...element.animation,
                                    entrance: element.animation.entrance as "fade" | "slide" | "zoom" | "bounce"
                                }
                            }))
                        }))} />
                    </div>
                );

            case 'quiz':
                return (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quiz Interativo</h3>
                        <InteractiveQuiz quiz={{
                            ...sampleInteractiveElements.quizzes[0],
                            questions: sampleInteractiveElements.quizzes[0].questions.map(q => ({
                                ...q,
                                type: q.type as "code" | "multiple-choice" | "true-false" | "fill-blank" | "matching",
                                difficulty: q.difficulty as "easy" | "medium" | "hard"
                            }))
                        }} />
                    </div>
                );

            case 'simulator':
                return (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Simulador</h3>
                        <InteractiveSimulator simulator={{
                            ...sampleInteractiveElements.simulators[0],
                            type: sampleInteractiveElements.simulators[0].type as "system" | "game" | "network" | "database" | "algorithm",
                            config: {
                                ...sampleInteractiveElements.simulators[0].config,
                                parameters: sampleInteractiveElements.simulators[0].config.parameters.map(param => ({
                                    ...param,
                                    type: param.type as "string" | "number" | "boolean" | "select"
                                })),
                                visualization: sampleInteractiveElements.simulators[0].config.visualization as "2d" | "table" | "3d" | "chart"
                            },
                            scenarios: sampleInteractiveElements.simulators[0].scenarios.map(scenario => ({
                                ...scenario,
                                difficulty: scenario.difficulty as "easy" | "medium" | "hard"
                            }))
                        }} />
                    </div>
                );

            case 'playground':
                return (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Code Playground</h3>
                        <CodePlayground playground={{
                            ...sampleInteractiveElements.codePlaygrounds[0],
                            examples: sampleInteractiveElements.codePlaygrounds[0].examples.map(ex => ({
                                ...ex,
                                difficulty: ex.difficulty as "beginner" | "intermediate" | "advanced"
                            }))
                        }} />
                    </div>
                );

            case 'project':
                return (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Projeto Colaborativo</h3>
                        <CollaborativeProjects project={{
                            ...sampleInteractiveElements.collaborativeProjects[0],
                            type: sampleInteractiveElements.collaborativeProjects[0].type as "web-app" | "mobile-app" | "api" | "data-analysis" | "game",
                            status: sampleInteractiveElements.collaborativeProjects[0].status as "planning" | "development" | "completed" | "testing" | "deployment",
                            phases: sampleInteractiveElements.collaborativeProjects[0].phases.map(phase => ({
                                ...phase,
                                status: phase.status as "pending" | "in-progress" | "review" | "completed",
                                tasks: phase.tasks.map(task => ({
                                    ...task,
                                    status: task.status as "todo" | "in-progress" | "review" | "done",
                                    priority: task.priority === "critical" ? "high" : task.priority as "high" | "medium" | "low"
                                }))
                            }))
                        }} />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header do Curso */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {courseContent.title}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Curso integrado com elementos interativos
                        </p>
                    </div>
                </div>
            </div>

            {/* Navegação por Abas */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    {renderContent()}
                </div>
            </div>

            {/* Barra de Progresso */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Progresso da aula:</span>
                            <div className="w-64 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: '25%' }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-600">25%</span>
                        </div>

                        <div className="flex space-x-2">
                            <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                                Anterior
                            </button>
                            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                Próxima
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegratedCourseView;
