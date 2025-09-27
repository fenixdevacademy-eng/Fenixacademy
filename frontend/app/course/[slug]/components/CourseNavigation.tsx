'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Lock, Clock, Star, BookOpen, Video, FileText, Target, Award, Search, Bookmark, Download } from 'lucide-react';

interface CourseNavigationProps {
    className?: string;
    course?: Course;
    currentLesson?: string;
    onLessonSelect?: (lessonId: string) => void;
    onModuleToggle?: (moduleId: string) => void;
}

interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    rating: number;
    modules: Module[];
    progress: number;
}

interface Module {
    id: string;
    title: string;
    description: string;
    order: number;
    isExpanded: boolean;
    isCompleted: boolean;
    lessons: Lesson[];
    duration: number;
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'text' | 'quiz' | 'exercise' | 'project';
    duration: number;
    isCompleted: boolean;
    isLocked: boolean;
    isBookmarked: boolean;
    order: number;
}

const mockCourse: Course = {
    id: '1',
    title: 'JavaScript Completo do Zero ao Avançado',
    description: 'Aprenda JavaScript desde o básico até conceitos avançados',
    instructor: 'João Silva',
    duration: 1200,
    difficulty: 'intermediate',
    rating: 4.8,
    progress: 65,
    modules: [
        {
            id: '1',
            title: 'Fundamentos do JavaScript',
            description: 'Conceitos básicos e sintaxe fundamental',
            order: 1,
            isExpanded: true,
            isCompleted: false,
            duration: 180,
            lessons: [
                {
                    id: '1',
                    title: 'Introdução ao JavaScript',
                    description: 'Conceitos fundamentais e sintaxe básica',
                    type: 'video',
                    duration: 30,
                    isCompleted: true,
                    isLocked: false,
                    isBookmarked: false,
                    order: 1
                },
                {
                    id: '2',
                    title: 'Variáveis e Tipos de Dados',
                    description: 'Como declarar e usar variáveis em JavaScript',
                    type: 'video',
                    duration: 25,
                    isCompleted: true,
                    isLocked: false,
                    isBookmarked: true,
                    order: 2
                }
            ]
        }
    ]
};

export function CourseNavigation({
    className = '',
    course = mockCourse,
    currentLesson,
    onLessonSelect,
    onModuleToggle
}: CourseNavigationProps) {
    const [modules, setModules] = useState<Module[]>(course.modules);
    const [searchQuery, setSearchQuery] = useState('');

    const handleModuleToggle = (moduleId: string) => {
        setModules(prev => prev.map(module =>
            module.id === moduleId
                ? { ...module, isExpanded: !module.isExpanded }
                : module
        ));
        onModuleToggle?.(moduleId);
    };

    const handleLessonSelect = (lesson: Lesson) => {
        if (lesson.isLocked) return;
        onLessonSelect?.(lesson.id);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <Video className="w-4 h-4" />;
            case 'text':
                return <FileText className="w-4 h-4" />;
            case 'quiz':
                return <Target className="w-4 h-4" />;
            case 'exercise':
                return <Award className="w-4 h-4" />;
            case 'project':
                return <BookOpen className="w-4 h-4" />;
            default:
                return <BookOpen className="w-4 h-4" />;
        }
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

    const formatDuration = (minutes: number) => {
        if (minutes < 60) {
            return `${minutes}min`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}min`;
    };

    const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completedLessons = modules.reduce((sum, module) =>
        sum + module.lessons.filter(lesson => lesson.isCompleted).length, 0
    );
    const progressPercentage = (completedLessons / totalLessons) * 100;

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Navegação do Curso
                        </h3>
                    </div>
                </div>

                {/* Course Info */}
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {course.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDuration(course.duration)}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(course.difficulty)}`}>
                            {course.difficulty}
                        </span>
                    </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Progresso do Curso</span>
                        <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar lições..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Modules and Lessons */}
            <div className="overflow-y-auto max-h-96">
                {modules.map((module) => (
                    <div key={module.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        {/* Module Header */}
                        <button
                            onClick={() => handleModuleToggle(module.id)}
                            className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {module.order}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {module.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {module.lessons.length} lições • {formatDuration(module.duration)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {module.isCompleted && (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    )}
                                    {module.isExpanded ? (
                                        <ChevronUp className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </button>

                        {/* Module Lessons */}
                        {module.isExpanded && (
                            <div className="bg-gray-50 dark:bg-gray-700">
                                {module.lessons.map((lesson) => (
                                    <div
                                        key={lesson.id}
                                        className={`p-4 border-l-4 ${currentLesson === lesson.id
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
                                            } ${lesson.isLocked ? 'opacity-50' : 'cursor-pointer'}`}
                                        onClick={() => handleLessonSelect(lesson)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-1">
                                                {lesson.isCompleted ? (
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                ) : lesson.isLocked ? (
                                                    <Lock className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    getTypeIcon(lesson.type)
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h5 className={`font-medium ${lesson.isLocked
                                                                ? 'text-gray-400 dark:text-gray-500'
                                                                : 'text-gray-900 dark:text-white'
                                                            }`}>
                                                            {lesson.title}
                                                        </h5>
                                                        <p className={`text-sm ${lesson.isLocked
                                                                ? 'text-gray-400 dark:text-gray-500'
                                                                : 'text-gray-600 dark:text-gray-400'
                                                            }`}>
                                                            {lesson.description}
                                                        </p>
                                                        <div className="flex items-center gap-3 mt-2">
                                                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                                <Clock className="w-3 h-3" />
                                                                <span>{lesson.duration}min</span>
                                                            </div>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                                                {lesson.type}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1 ml-2">
                                                        {lesson.isBookmarked && (
                                                            <Bookmark className="w-4 h-4 text-yellow-500 fill-current" />
                                                        )}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Handle bookmark toggle
                                                            }}
                                                            className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                                                            title="Favoritar"
                                                        >
                                                            <Bookmark className={`w-4 h-4 ${lesson.isBookmarked ? 'text-yellow-500 fill-current' : ''}`} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}


