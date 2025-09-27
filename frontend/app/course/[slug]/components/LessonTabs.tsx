'use client';

import React, { useState } from 'react';
import {
    BookOpen,
    Play,
    CheckCircle,
    Clock,
    Lock,
    Star,
    FileText,
    Video,
    Code,
    Image,
    Download,
    ExternalLink
} from 'lucide-react';

interface Lesson {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'text' | 'exercise' | 'quiz' | 'project';
    duration: number; // in minutes
    isCompleted: boolean;
    isLocked: boolean;
    isCurrent: boolean;
    order: number;
    thumbnail?: string;
    videoUrl?: string;
    content?: string;
    exercises?: Exercise[];
    resources?: Resource[];
}

interface Exercise {
    id: string;
    title: string;
    type: 'coding' | 'multiple_choice' | 'fill_blank';
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    isCompleted: boolean;
}

interface Resource {
    id: string;
    title: string;
    type: 'document' | 'video' | 'link' | 'code';
    url: string;
    size?: string;
}

interface LessonTabsProps {
    className?: string;
    lessons: Lesson[];
    currentLessonId?: string;
    onLessonSelect?: (lesson: Lesson) => void;
    onLessonComplete?: (lessonId: string) => void;
}

export function LessonTabs({
    className = '',
    lessons = [],
    currentLessonId,
    onLessonSelect,
    onLessonComplete
}: LessonTabsProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'resources'>('lessons');
    const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

    const toggleLessonExpansion = (lessonId: string) => {
        const newExpanded = new Set(expandedLessons);
        if (newExpanded.has(lessonId)) {
            newExpanded.delete(lessonId);
        } else {
            newExpanded.add(lessonId);
        }
        setExpandedLessons(newExpanded);
    };

    const handleLessonClick = (lesson: Lesson) => {
        if (lesson.isLocked) return;
        onLessonSelect?.(lesson);
    };

    const handleLessonComplete = (lessonId: string) => {
        onLessonComplete?.(lessonId);
    };

    const getLessonIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <Video className="w-4 h-4" />;
            case 'text':
                return <FileText className="w-4 h-4" />;
            case 'exercise':
                return <Code className="w-4 h-4" />;
            case 'quiz':
                return <Star className="w-4 h-4" />;
            case 'project':
                return <BookOpen className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'video':
                return 'text-red-500 bg-red-100 dark:bg-red-900/20';
            case 'text':
                return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
            case 'exercise':
                return 'text-green-500 bg-green-100 dark:bg-green-900/20';
            case 'quiz':
                return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
            case 'project':
                return 'text-purple-500 bg-purple-100 dark:bg-purple-900/20';
            default:
                return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
        }
    };

    const completedLessons = lessons.filter(l => l.isCompleted).length;
    const totalLessons = lessons.length;
    const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Conteúdo do Curso
                        </h3>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {completedLessons}/{totalLessons} concluídas
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Progresso do Curso</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    {[
                        { id: 'overview', label: 'Visão Geral', icon: BookOpen },
                        { id: 'lessons', label: 'Aulas', icon: Play },
                        { id: 'resources', label: 'Recursos', icon: Download }
                    ].map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id as any)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === id
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {activeTab === 'overview' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-2xl font-bold text-blue-500">{totalLessons}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total de Aulas</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-2xl font-bold text-green-500">{completedLessons}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Concluídas</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-2xl font-bold text-yellow-500">
                                    {lessons.reduce((sum, lesson) => sum + lesson.duration, 0)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Minutos</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-2xl font-bold text-purple-500">
                                    {lessons.filter(l => l.type === 'project').length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Projetos</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">Tipos de Conteúdo</h4>
                            <div className="flex flex-wrap gap-2">
                                {['video', 'text', 'exercise', 'quiz', 'project'].map(type => {
                                    const count = lessons.filter(l => l.type === type).length;
                                    if (count === 0) return null;
                                    return (
                                        <span
                                            key={type}
                                            className={`px-3 py-1 text-xs rounded-full ${getTypeColor(type)}`}
                                        >
                                            {count} {type}s
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'lessons' && (
                    <div className="space-y-2">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className={`border rounded-lg transition-all ${lesson.isCurrent
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : lesson.isLocked
                                            ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                <div
                                    className={`p-4 cursor-pointer ${lesson.isLocked ? 'cursor-not-allowed' : ''}`}
                                    onClick={() => handleLessonClick(lesson)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            {lesson.isCompleted ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : lesson.isLocked ? (
                                                <Lock className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className={`font-medium ${lesson.isLocked
                                                            ? 'text-gray-400 dark:text-gray-500'
                                                            : 'text-gray-900 dark:text-white'
                                                        }`}>
                                                        {lesson.title}
                                                    </h4>
                                                    <p className={`text-sm mt-1 ${lesson.isLocked
                                                            ? 'text-gray-400 dark:text-gray-500'
                                                            : 'text-gray-600 dark:text-gray-400'
                                                        }`}>
                                                        {lesson.description}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 ml-4">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(lesson.type)}`}>
                                                        {getLessonIcon(lesson.type)}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{lesson.duration}min</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {lesson.exercises && lesson.exercises.length > 0 && (
                                                <div className="mt-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleLessonExpansion(lesson.id);
                                                        }}
                                                        className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        {expandedLessons.has(lesson.id) ? 'Ocultar' : 'Mostrar'} exercícios ({lesson.exercises.length})
                                                    </button>

                                                    {expandedLessons.has(lesson.id) && (
                                                        <div className="mt-2 space-y-1">
                                                            {lesson.exercises.map((exercise) => (
                                                                <div
                                                                    key={exercise.id}
                                                                    className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded"
                                                                >
                                                                    <div className="flex-shrink-0">
                                                                        {exercise.isCompleted ? (
                                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                                        ) : (
                                                                            <div className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded"></div>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                            {exercise.title}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                            {exercise.type} • {exercise.points} pontos
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            if (!exercise.isCompleted) {
                                                                                handleLessonComplete(exercise.id);
                                                                            }
                                                                        }}
                                                                        disabled={exercise.isCompleted}
                                                                        className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded transition-colors"
                                                                    >
                                                                        {exercise.isCompleted ? 'Concluído' : 'Fazer'}
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Recursos do Curso</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lessons.flatMap(lesson => lesson.resources || []).map((resource, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                                >
                                    <div className="flex-shrink-0">
                                        {resource.type === 'document' && <FileText className="w-5 h-5 text-blue-500" />}
                                        {resource.type === 'video' && <Video className="w-5 h-5 text-red-500" />}
                                        {resource.type === 'code' && <Code className="w-5 h-5 text-green-500" />}
                                        {resource.type === 'link' && <ExternalLink className="w-5 h-5 text-purple-500" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {resource.title}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {resource.type} {resource.size && `• ${resource.size}`}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.open(resource.url, '_blank')}
                                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}