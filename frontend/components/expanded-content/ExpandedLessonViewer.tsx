'use client';

import React, { useState } from 'react';
import {
    BookOpen,
    Clock,
    Target,
    Code,
    Play,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    FileText,
    Video,
    Brain,
    Zap
} from 'lucide-react';
import { ExpandedLesson } from '@/lib/expanded-content-api';

interface ExpandedLessonViewerProps {
    lesson: ExpandedLesson;
    courseSlug: string;
    level: string;
    lessonFile: string;
    onComplete?: (timeSpent: number) => void;
    className?: string;
}

export function ExpandedLessonViewer({
    lesson,
    courseSlug,
    level,
    lessonFile,
    onComplete,
    className = ''
}: ExpandedLessonViewerProps) {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        objectives: true,
        content: true,
        code: true,
        exercises: false});
    const [timeSpent, setTimeSpent] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    }

    const handleComplete = () => {
        setIsCompleted(true);
        onComplete?.(timeSpent);
    }

    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'iniciante':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'intermediario':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'avancado':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }

    return (
        <div className={`max-w-4xl mx-auto ${className}`}>
            {/* Lesson Header */}
            <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <BookOpen className="w-6 h-6" />
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(level)}`}>
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
                            <p className="text-blue-100 text-lg">{lesson.description}</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2 text-blue-100 mb-2">
                                <Clock className="w-4 h-4" />
                                <span>Conteúdo Expandido</span>
                            </div>
                            {isCompleted && (
                                <div className="flex items-center gap-2 text-green-200">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">Concluída</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Lesson Content */}
                <div className="p-6">
                    {/* Objectives Section */}
                    {lesson.objectives && lesson.objectives.length > 0 && (
                        <div className="mb-6">
                            <button
                                onClick={() => toggleSection('objectives')}
                                className="flex items-center gap-2 w-full text-left font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors"
                            >
                                <Target className="w-5 h-5" />
                                <span>Objetivos de Aprendizagem</span>
                                {expandedSections.objectives ? (
                                    <ChevronUp className="w-5 h-5 ml-auto" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 ml-auto" />
                                )}
                            </button>
                            {expandedSections.objectives && (
                                <div className="mt-3 pl-7">
                                    <ul className="space-y-2">
                                        {lesson.objectives.map((objective, index) => (
                                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                <span>{objective}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Code Blocks Section */}
                    {lesson.code_blocks && lesson.code_blocks.length > 0 && (
                        <div className="mb-6">
                            <button
                                onClick={() => toggleSection('code')}
                                className="flex items-center gap-2 w-full text-left font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors"
                            >
                                <Code className="w-5 h-5" />
                                <span>Exemplos de Código ({lesson.code_blocks.length})</span>
                                {expandedSections.code ? (
                                    <ChevronUp className="w-5 h-5 ml-auto" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 ml-auto" />
                                )}
                            </button>
                            {expandedSections.code && (
                                <div className="mt-3 space-y-4">
                                    {lesson.code_blocks.map((block, index) => (
                                        <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                                            <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                                                {block.language || 'text'}
                                            </div>
                                            <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                                                <code>{block.code}</code>
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Exercises Section */}
                    {lesson.exercises && lesson.exercises.length > 0 && (
                        <div className="mb-6">
                            <button
                                onClick={() => toggleSection('exercises')}
                                className="flex items-center gap-2 w-full text-left font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors"
                            >
                                <Brain className="w-5 h-5" />
                                <span>Exercícios Práticos ({lesson.exercises.length})</span>
                                {expandedSections.exercises ? (
                                    <ChevronUp className="w-5 h-5 ml-auto" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 ml-auto" />
                                )}
                            </button>
                            {expandedSections.exercises && (
                                <div className="mt-3 space-y-4">
                                    {lesson.exercises.map((exercise, index) => (
                                        <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-800 mb-2">{exercise.title}</h4>
                                                    <p className="text-gray-600 text-sm">{exercise.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Raw Content Section */}
                    {lesson.raw_content && (
                        <div className="mb-6">
                            <button
                                onClick={() => toggleSection('content')}
                                className="flex items-center gap-2 w-full text-left font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors"
                            >
                                <FileText className="w-5 h-5" />
                                <span>Conteúdo Completo</span>
                                {expandedSections.content ? (
                                    <ChevronUp className="w-5 h-5 ml-auto" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 ml-auto" />
                                )}
                            </button>
                            {expandedSections.content && (
                                <div className="mt-3">
                                    <div className="prose max-w-none">
                                        <div
                                            className="text-gray-700 leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: lesson.raw_content.replace(/\n/g, '<br>')
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Lesson Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>Tempo estimado: 30-45 min</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Zap className="w-4 h-4" />
                                <span>Conteúdo Premium</span>
                            </div>
                        </div>
                        {!isCompleted && (
                            <button
                                onClick={handleComplete}
                                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Marcar como Concluída
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpandedLessonViewer;