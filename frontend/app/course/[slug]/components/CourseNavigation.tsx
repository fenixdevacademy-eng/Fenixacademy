'use client';

import React, { useState, useEffect } from 'react';
import { ProgressManager } from '../utils/progress-manager';
import { CourseProgress, ModuleProgress, LessonProgress } from '../types/progress-types';
import { getCourseContent } from '../index';

interface CourseNavigationProps {
    courseId: string;
    currentModuleId?: number;
    currentLessonId?: number;
    onNavigate: (moduleId: number, lessonId: number) => void;
}

export const CourseNavigation: React.FC<CourseNavigationProps> = ({
    courseId,
    currentModuleId,
    currentLessonId,
    onNavigate
}) => {
    const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null);
    const [moduleProgresses, setModuleProgresses] = useState<{ [key: number]: ModuleProgress }>({});
    const [lessonProgresses, setLessonProgresses] = useState<{ [key: string]: LessonProgress }>({});
    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set(currentModuleId ? [currentModuleId] : []));
    const progressManager = ProgressManager.getInstance();

    const courseContent = getCourseContent(courseId);

    useEffect(() => {
        loadProgress();

        // Expandir automaticamente o módulo atual
        if (currentModuleId && !expandedModules.has(currentModuleId)) {
            const newExpanded = new Set(expandedModules);
            newExpanded.add(currentModuleId);
            setExpandedModules(newExpanded);
        }
    }, [courseId, currentModuleId]);

    const loadProgress = () => {
        const progress = progressManager.getCourseProgress(courseId);
        setCourseProgress(progress);

        if (courseContent) {
            const moduleProgs: { [key: number]: ModuleProgress } = {};
            const lessonProgs: { [key: string]: LessonProgress } = {};

            courseContent.modules.forEach(module => {
                const moduleProgress = progressManager.getModuleProgress(courseId, module.id);
                if (moduleProgress) {
                    moduleProgs[module.id] = moduleProgress;
                }

                module.lessons.forEach(lesson => {
                    const lessonProgress = progressManager.getLessonProgress(courseId, module.id, lesson.id);
                    if (lessonProgress) {
                        lessonProgs[`${module.id}-${lesson.id}`] = lessonProgress;
                    }
                });
            });

            setModuleProgresses(moduleProgs);
            setLessonProgresses(lessonProgs);
        }
    };

    const toggleModule = (moduleId: number) => {
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId);
        } else {
            newExpanded.add(moduleId);
        }
        setExpandedModules(newExpanded);
    };

    const getProgressIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return '✅';
            case 'in_progress':
                return '🔄';
            default:
                return '⚪';
        }
    };

    const getLessonTypeIcon = (type: string) => {
        switch (type) {
            case 'project':
                return '🛠️';
            case 'quiz':
                return '❓';
            case 'exercise':
                return '💪';
            case 'discussion':
                return '💬';
            default:
                return '📖';
        }
    };

    const getDifficultyColor = (difficulty?: string) => {
        if (!difficulty) return 'text-gray-600';

        switch (difficulty) {
            case 'beginner':
                return 'text-green-600';
            case 'intermediate':
                return 'text-yellow-600';
            case 'advanced':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    if (!courseContent) {
        return <div className="p-4">Curso não encontrado</div>;
    }

    return (
        <div className="course-navigation bg-white shadow-lg rounded-lg p-4 max-h-screen overflow-y-auto">
            {/* Header do Curso */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{courseContent.title}</h2>
                <div className="bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                            width: `${courseProgress ?
                                (courseProgress.completedLessons / courseProgress.totalLessons) * 100 : 0}%`
                        }}
                    ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{courseProgress?.completedLessons || 0} / {courseProgress?.totalLessons || 600} aulas</span>
                    <span>{courseProgress?.completedModules || 0} / {courseProgress?.totalModules || 30} módulos</span>
                </div>
            </div>

            {/* Lista de Módulos */}
            <div className="space-y-2">
                {courseContent.modules.map((module) => {
                    const moduleProgress = moduleProgresses[module.id];
                    const isExpanded = expandedModules.has(module.id);
                    const isCurrent = currentModuleId === module.id;

                    return (
                        <div key={module.id} className={`border rounded-lg ${isCurrent ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                            {/* Header do Módulo */}
                            <div
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleModule(module.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">
                                        {getProgressIcon(moduleProgress ? 'in_progress' : 'not_started')}
                                    </span>
                                    <div>
                                        <h3 className="font-medium text-gray-800">{module.title}</h3>
                                        <p className="text-sm text-gray-600">{module.description}</p>
                                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                            <span>{module.lessons.length} aulas</span>
                                            <span>{module.duration_hours}h</span>
                                            {moduleProgress && (
                                                <span>{moduleProgress.completedLessons}/{moduleProgress.totalLessons} concluídas</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {moduleProgress && (
                                        <div className="bg-gray-200 rounded-full h-1 w-16">
                                            <div
                                                className="bg-green-600 h-1 rounded-full"
                                                style={{
                                                    width: `${(moduleProgress.completedLessons / moduleProgress.totalLessons) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                    <span className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                                        ▶
                                    </span>
                                </div>
                            </div>

                            {/* Lista de Aulas */}
                            {isExpanded && (
                                <div className="border-t border-gray-200 bg-gray-50">
                                    {module.lessons.map((lesson) => {
                                        const lessonProgress = lessonProgresses[`${module.id}-${lesson.id}`];
                                        const isCurrentLesson = currentLessonId === lesson.id && currentModuleId === module.id;

                                        return (
                                            <div
                                                key={lesson.id}
                                                className={`flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-white transition-colors ${isCurrentLesson ? 'bg-blue-100 border-blue-200' : ''
                                                    }`}
                                                onClick={() => onNavigate(module.id, lesson.id)}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm">
                                                        {getProgressIcon(lessonProgress?.status || 'not_started')}
                                                    </span>
                                                    <span className="text-sm">
                                                        {getLessonTypeIcon(lesson.type)}
                                                    </span>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-800">{lesson.title}</h4>
                                                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                                                            <span>{lesson.duration}</span>
                                                            {lessonProgress && (
                                                                <span className="text-green-600">
                                                                    {lessonProgress.timeSpent}min
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                {isCurrentLesson && (
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer com estatísticas */}
            <div className="mt-6 p-3 bg-gray-100 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">Tempo total:</span>
                        <div className="font-medium">
                            {courseProgress ? Math.floor(courseProgress.timeSpent / 60) : 0}h {courseProgress ? courseProgress.timeSpent % 60 : 0}m
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-600">Progresso:</span>
                        <div className="font-medium">
                            {courseProgress ? Math.round((courseProgress.completedLessons / courseProgress.totalLessons) * 100) : 0}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseNavigation;
