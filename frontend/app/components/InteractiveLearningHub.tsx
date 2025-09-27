'use client';

import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Star, Clock, Award, BarChart3, Brain, Target, Shield } from 'lucide-react';

interface LearningHubProps {
    className?: string;
    onLessonStart?: (lesson: Lesson) => void;
    onProgressUpdate?: (progress: number) => void;
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'interactive' | 'quiz' | 'project';
    duration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    points: number;
    isCompleted: boolean;
    isLocked: boolean;
    thumbnail: string;
    progress: number;
}

const mockLessons: Lesson[] = [
    {
        id: '1',
        title: 'Introdução ao JavaScript',
        description: 'Aprenda os conceitos fundamentais do JavaScript',
        type: 'video',
        duration: 30,
        difficulty: 'beginner',
        points: 100,
        isCompleted: false,
        isLocked: false,
        thumbnail: '/images/lessons/js-intro.jpg',
        progress: 0
    },
    {
        id: '2',
        title: 'Manipulação do DOM',
        description: 'Interaja com elementos da página web',
        type: 'interactive',
        duration: 45,
        difficulty: 'intermediate',
        points: 150,
        isCompleted: false,
        isLocked: false,
        thumbnail: '/images/lessons/dom-manipulation.jpg',
        progress: 25
    },
    {
        id: '3',
        title: 'Quiz: Arrays e Objetos',
        description: 'Teste seus conhecimentos sobre estruturas de dados',
        type: 'quiz',
        duration: 20,
        difficulty: 'intermediate',
        points: 75,
        isCompleted: true,
        isLocked: false,
        thumbnail: '/images/lessons/arrays-quiz.jpg',
        progress: 100
    }
];

export function InteractiveLearningHub({
    className = '',
    onLessonStart,
    onProgressUpdate
}: LearningHubProps) {
    const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
    const [activeTab, setActiveTab] = useState<'lessons' | 'achievements' | 'stats'>('lessons');

    const handleLessonStart = (lesson: Lesson) => {
        if (lesson.isLocked) return;
        onLessonStart?.(lesson);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'text-green-600 bg-green-100 dark:bg-green-900/20';
            case 'intermediate':
                return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
            case 'advanced':
                return 'text-red-600 bg-red-100 dark:bg-red-900/20';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <Play className="w-4 h-4" />;
            case 'interactive':
                return <Brain className="w-4 h-4" />;
            case 'quiz':
                return <Target className="w-4 h-4" />;
            case 'project':
                return <Award className="w-4 h-4" />;
            default:
                return <BookOpen className="w-4 h-4" />;
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Hub de Aprendizado
                        </h3>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    {[
                        { id: 'lessons', label: 'Lições', icon: BookOpen },
                        { id: 'achievements', label: 'Conquistas', icon: Award },
                        { id: 'stats', label: 'Estatísticas', icon: BarChart3 }
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
                {activeTab === 'lessons' && (
                    <div className="space-y-4">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className={`border rounded-lg p-4 transition-all ${lesson.isLocked
                                        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 opacity-60'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                        <img
                                            src={lesson.thumbnail}
                                            alt={lesson.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className={`font-semibold ${lesson.isLocked
                                                        ? 'text-gray-400 dark:text-gray-500'
                                                        : 'text-gray-900 dark:text-white'
                                                    }`}>
                                                    {lesson.title}
                                                </h4>
                                                <p className={`text-sm ${lesson.isLocked
                                                        ? 'text-gray-400 dark:text-gray-500'
                                                        : 'text-gray-600 dark:text-gray-400'
                                                    }`}>
                                                    {lesson.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {lesson.isCompleted && (
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                )}
                                                {lesson.isLocked && (
                                                    <Shield className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                                            <div className="flex items-center gap-1">
                                                {getTypeIcon(lesson.type)}
                                                <span className="capitalize">{lesson.type}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{lesson.duration}min</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                <span>{lesson.points} pts</span>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                                                {lesson.difficulty}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleLessonStart(lesson)}
                                                disabled={lesson.isLocked}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${lesson.isLocked
                                                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                                        : lesson.isCompleted
                                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                                    }`}
                                            >
                                                {lesson.isLocked ? 'Bloqueada' : lesson.isCompleted ? 'Revisar' : 'Iniciar'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'achievements' && (
                    <div className="text-center py-8">
                        <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Conquistas
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Complete lições para desbloquear conquistas
                        </p>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="text-center py-8">
                        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Estatísticas
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Visualize seu progresso de aprendizado
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}


