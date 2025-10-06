'use client';

import React, { useState, useEffect } from 'react';
import { MarkdownService, MarkdownLesson } from '../services/markdown-service';

interface MarkdownLessonViewerProps {
    courseSlug: string;
    moduleId: number;
    lessonId: number;
    onLessonLoaded?: (lesson: MarkdownLesson) => void;
    onNavigateToLesson?: (lessonId: number) => void;
    onLessonCompleted?: (lessonId: number) => void;
    totalLessons?: number;
    isCompleted?: boolean;
}

export default function MarkdownLessonViewer({
    courseSlug,
    moduleId,
    lessonId,
    onLessonLoaded,
    onNavigateToLesson,
    onLessonCompleted,
    totalLessons = 0,
    isCompleted = false
}: MarkdownLessonViewerProps) {
    const [lesson, setLesson] = useState<MarkdownLesson | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentLessonId, setCurrentLessonId] = useState(lessonId);

    useEffect(() => {
        const loadLesson = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const markdownService = MarkdownService.getInstance();
                const lessonData = await markdownService.loadLesson(courseSlug, moduleId, currentLessonId);

                if (lessonData) {
                    setLesson(lessonData);
                    onLessonLoaded?.(lessonData);
                } else {
                    setError('Lição não encontrada');
                }
            } catch (err) {
                console.error('Error loading lesson:', err);
                setError('Erro ao carregar lição');
            } finally {
                setIsLoading(false);
            }
        };

        loadLesson();
    }, [courseSlug, moduleId, currentLessonId, onLessonLoaded]);

    const handlePreviousLesson = () => {
        if (currentLessonId > 1) {
            const newLessonId = currentLessonId - 1;
            setCurrentLessonId(newLessonId);
            onNavigateToLesson?.(newLessonId);
        }
    };

    const handleNextLesson = () => {
        if (currentLessonId < totalLessons) {
            const newLessonId = currentLessonId + 1;
            setCurrentLessonId(newLessonId);
            onNavigateToLesson?.(newLessonId);
        }
    };

    const handleCompleteLesson = () => {
        onLessonCompleted?.(currentLessonId);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando lição...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">📄</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Lição não encontrada</h3>
                    <p className="text-gray-600">Esta lição não está disponível no momento.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="markdown-lesson-viewer">
            {/* Lesson Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {lesson.title}
                        </h1>
                        <p className="text-gray-600">
                            Módulo {moduleId} • Lição {currentLessonId} de {totalLessons}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {isCompleted && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                ✓ Concluída
                            </span>
                        )}
                    </div>
                </div>

                {/* Lesson Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {lesson.duration && (
                        <span>⏱️ {lesson.duration}</span>
                    )}
                    {lesson.difficulty && (
                        <span>📊 {lesson.difficulty}</span>
                    )}
                    {lesson.tags && lesson.tags.length > 0 && (
                        <span>🏷️ {lesson.tags.join(', ')}</span>
                    )}
                </div>
            </div>

            {/* Lesson Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
            </div>

            {/* Lesson Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePreviousLesson}
                        disabled={currentLessonId <= 1}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ← Anterior
                    </button>

                    <div className="flex items-center gap-3">
                        {!isCompleted && (
                            <button
                                onClick={handleCompleteLesson}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Marcar como Concluída
                            </button>
                        )}

                        <button
                            onClick={handleNextLesson}
                            disabled={currentLessonId >= totalLessons}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Próxima →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}