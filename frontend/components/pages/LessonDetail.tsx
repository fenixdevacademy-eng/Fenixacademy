'use client';

﻿import React, { useState } from 'react';
import {
    Play,
    CheckCircle,
    Clock,
    BookOpen,
    Code,
    Target,
    Trophy,
    ArrowLeft,
    ArrowRight,
    Download,
    ExternalLink,
    Star,
    Users,
    Zap
} from 'lucide-react';

interface Lesson {
    id: number;
    title: string;
    duration: string;
    type: 'video' | 'text' | 'practice';
    completed: boolean;
    content: string;
    objectives: string[];
    codeExample?: string;
    resources: string[];
}

interface Module {
    id: number;
    title: string;
    focus: string;
    project: string;
    lessons: Lesson[];
    exercises: Exercise[];
    projectDetails: ProjectDetails;
}

interface Exercise {
    id: number;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedTime: string;
    completed: boolean;
}

interface ProjectDetails {
    title: string;
    description: string;
    technologies: string[];
    requirements: string[];
    deliverables: string[];
}

const LessonDetail: React.FC<{ module: Module; onBack: () => void }> = ({ module, onBack }) => {
    const [selectedLesson, setSelectedLesson] = useState<number>(0);
    const [showExercises, setShowExercises] = useState(false);
    const [showProject, setShowProject] = useState(false);

    const currentLesson = module.lessons[selectedLesson];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Play className="w-4 h-4" />;
            case 'text': return <BookOpen className="w-4 h-4" />;
            case 'practice': return <Code className="w-4 h-4" />;
            default: return <BookOpen className="w-4 h-4" />;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onBack}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
                                <p className="text-gray-600">{module.focus}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Progresso</div>
                                <div className="text-lg font-semibold text-indigo-600">
                                    {Math.round((module.lessons.filter(l => l.completed).length / module.lessons.length) * 100)}%
                                </div>
                            </div>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(module.lessons.filter(l => l.completed).length / module.lessons.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Lessons */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Aulas do Módulo</h2>
                            <div className="space-y-2">
                                {module.lessons.map((lesson, index) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setSelectedLesson(index)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${selectedLesson === index
                                                ? 'bg-indigo-50 border-indigo-200 border'
                                                : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {lesson.completed ? (
                                                        <CheckCircle className="w-4 h-4" />
                                                    ) : (
                                                        <span className="text-xs font-medium">{index + 1}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm text-gray-900">{lesson.title}</div>
                                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                        {getTypeIcon(lesson.type)}
                                                        <span>{lesson.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={() => setShowExercises(!showExercises)}
                                    className="w-full flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <Code className="w-4 h-4 mr-2" />
                                    Exercícios ({module.exercises.length})
                                </button>
                                <button
                                    onClick={() => setShowProject(!showProject)}
                                    className="w-full flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                                >
                                    <Target className="w-4 h-4 mr-2" />
                                    Projeto
                                </button>
                                <button className="w-full flex items-center justify-center p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Avaliação
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Lesson Content */}
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h2>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                        <span className="flex items-center">
                                            {getTypeIcon(currentLesson.type)}
                                            <span className="ml-1">{currentLesson.type}</span>
                                        </span>
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {currentLesson.duration}
                                        </span>
                                        <span className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {module.lessons.length} aulas
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Objectives */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Objetivos de Aprendizado</h3>
                                <div className="space-y-2">
                                    {currentLesson.objectives.map((objective, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{objective}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conteúdo da Aula</h3>
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 leading-relaxed">{currentLesson.content}</p>
                                </div>
                            </div>

                            {/* Code Example */}
                            {currentLesson.codeExample && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Exemplo de Código</h3>
                                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                        <pre className="text-green-400 text-sm">
                                            <code>{currentLesson.codeExample}</code>
                                        </pre>
                                    </div>
                                </div>
                            )}

                            {/* Resources */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recursos Adicionais</h3>
                                <div className="space-y-2">
                                    {currentLesson.resources.map((resource, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-3 text-indigo-500" />
                                            <span className="text-indigo-600 hover:text-indigo-800">{resource}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
                                    disabled={selectedLesson === 0}
                                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Aula Anterior
                                </button>

                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Marcar como Concluída
                                    </button>
                                </div>

                                <button
                                    onClick={() => setSelectedLesson(Math.min(module.lessons.length - 1, selectedLesson + 1))}
                                    disabled={selectedLesson === module.lessons.length - 1}
                                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Próxima Aula
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exercises Modal */}
                {showExercises && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Exercícios do Módulo</h2>
                                    <button
                                        onClick={() => setShowExercises(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {module.exercises.map((exercise) => (
                                        <div key={exercise.id} className="bg-gray-50 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-semibold text-gray-900">{exercise.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                                                    {exercise.difficulty}
                                                </span>
                                            </div>

                                            <p className="text-gray-600 mb-4">{exercise.description}</p>

                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">
                                                    <Clock className="w-4 h-4 inline mr-1" />
                                                    {exercise.estimatedTime}
                                                </span>
                                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                                                    Iniciar Exercício
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Project Modal */}
                {showProject && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Projeto: {module.projectDetails.title}</h2>
                                    <button
                                        onClick={() => setShowProject(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
                                        <p className="text-gray-700">{module.projectDetails.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tecnologias</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {module.projectDetails.technologies.map((tech, index) => (
                                                <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Requisitos</h3>
                                        <ul className="space-y-2">
                                            {module.projectDetails.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start space-x-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Entregáveis</h3>
                                        <ul className="space-y-2">
                                            {module.projectDetails.deliverables.map((deliverable, index) => (
                                                <li key={index} className="flex items-start space-x-2">
                                                    <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{deliverable}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex space-x-4">
                                        <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                                            Iniciar Projeto
                                        </button>
                                        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                            Baixar Template
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LessonDetail;

import {
    Play,
    CheckCircle,
    Clock,
    BookOpen,
    Code,
    Target,
    Trophy,
    ArrowLeft,
    ArrowRight,
    Download,
    ExternalLink,
    Star,
    Users,
    Zap
} from 'lucide-react';

interface Lesson {
    id: number;
    title: string;
    duration: string;
    type: 'video' | 'text' | 'practice';
    completed: boolean;
    content: string;
    objectives: string[];
    codeExample?: string;
    resources: string[];
}

interface Module {
    id: number;
    title: string;
    focus: string;
    project: string;
    lessons: Lesson[];
    exercises: Exercise[];
    projectDetails: ProjectDetails;
}

interface Exercise {
    id: number;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedTime: string;
    completed: boolean;
}

interface ProjectDetails {
    title: string;
    description: string;
    technologies: string[];
    requirements: string[];
    deliverables: string[];
}

const LessonDetail: React.FC<{ module: Module; onBack: () => void }> = ({ module, onBack }) => {
    const [selectedLesson, setSelectedLesson] = useState<number>(0);
    const [showExercises, setShowExercises] = useState(false);
    const [showProject, setShowProject] = useState(false);

    const currentLesson = module.lessons[selectedLesson];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Play className="w-4 h-4" />;
            case 'text': return <BookOpen className="w-4 h-4" />;
            case 'practice': return <Code className="w-4 h-4" />;
            default: return <BookOpen className="w-4 h-4" />;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onBack}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
                                <p className="text-gray-600">{module.focus}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Progresso</div>
                                <div className="text-lg font-semibold text-indigo-600">
                                    {Math.round((module.lessons.filter(l => l.completed).length / module.lessons.length) * 100)}%
                                </div>
                            </div>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(module.lessons.filter(l => l.completed).length / module.lessons.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Lessons */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Aulas do Módulo</h2>
                            <div className="space-y-2">
                                {module.lessons.map((lesson, index) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setSelectedLesson(index)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${selectedLesson === index
                                                ? 'bg-indigo-50 border-indigo-200 border'
                                                : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {lesson.completed ? (
                                                        <CheckCircle className="w-4 h-4" />
                                                    ) : (
                                                        <span className="text-xs font-medium">{index + 1}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm text-gray-900">{lesson.title}</div>
                                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                        {getTypeIcon(lesson.type)}
                                                        <span>{lesson.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={() => setShowExercises(!showExercises)}
                                    className="w-full flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <Code className="w-4 h-4 mr-2" />
                                    Exercícios ({module.exercises.length})
                                </button>
                                <button
                                    onClick={() => setShowProject(!showProject)}
                                    className="w-full flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                                >
                                    <Target className="w-4 h-4 mr-2" />
                                    Projeto
                                </button>
                                <button className="w-full flex items-center justify-center p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Avaliação
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Lesson Content */}
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h2>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                        <span className="flex items-center">
                                            {getTypeIcon(currentLesson.type)}
                                            <span className="ml-1">{currentLesson.type}</span>
                                        </span>
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {currentLesson.duration}
                                        </span>
                                        <span className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {module.lessons.length} aulas
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Objectives */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Objetivos de Aprendizado</h3>
                                <div className="space-y-2">
                                    {currentLesson.objectives.map((objective, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{objective}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conteúdo da Aula</h3>
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 leading-relaxed">{currentLesson.content}</p>
                                </div>
                            </div>

                            {/* Code Example */}
                            {currentLesson.codeExample && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Exemplo de Código</h3>
                                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                        <pre className="text-green-400 text-sm">
                                            <code>{currentLesson.codeExample}</code>
                                        </pre>
                                    </div>
                                </div>
                            )}

                            {/* Resources */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recursos Adicionais</h3>
                                <div className="space-y-2">
                                    {currentLesson.resources.map((resource, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-3 text-indigo-500" />
                                            <span className="text-indigo-600 hover:text-indigo-800">{resource}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
                                    disabled={selectedLesson === 0}
                                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Aula Anterior
                                </button>

                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Marcar como Concluída
                                    </button>
                                </div>

                                <button
                                    onClick={() => setSelectedLesson(Math.min(module.lessons.length - 1, selectedLesson + 1))}
                                    disabled={selectedLesson === module.lessons.length - 1}
                                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Próxima Aula
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exercises Modal */}
                {showExercises && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Exercícios do Módulo</h2>
                                    <button
                                        onClick={() => setShowExercises(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {module.exercises.map((exercise) => (
                                        <div key={exercise.id} className="bg-gray-50 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-semibold text-gray-900">{exercise.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                                                    {exercise.difficulty}
                                                </span>
                                            </div>

                                            <p className="text-gray-600 mb-4">{exercise.description}</p>

                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">
                                                    <Clock className="w-4 h-4 inline mr-1" />
                                                    {exercise.estimatedTime}
                                                </span>
                                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                                                    Iniciar Exercício
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Project Modal */}
                {showProject && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Projeto: {module.projectDetails.title}</h2>
                                    <button
                                        onClick={() => setShowProject(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
                                        <p className="text-gray-700">{module.projectDetails.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tecnologias</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {module.projectDetails.technologies.map((tech, index) => (
                                                <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Requisitos</h3>
                                        <ul className="space-y-2">
                                            {module.projectDetails.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start space-x-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Entregáveis</h3>
                                        <ul className="space-y-2">
                                            {module.projectDetails.deliverables.map((deliverable, index) => (
                                                <li key={index} className="flex items-start space-x-2">
                                                    <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{deliverable}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex space-x-4">
                                        <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                                            Iniciar Projeto
                                        </button>
                                        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                            Baixar Template
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


























































