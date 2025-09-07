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

const MarkdownLessonViewer: React.FC<MarkdownLessonViewerProps> = ({
    courseSlug,
    moduleId,
    lessonId,
    onLessonLoaded,
    onNavigateToLesson,
    onLessonCompleted,
    totalLessons,
    isCompleted
}) => {
    const [lesson, setLesson] = useState<MarkdownLesson | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadLesson = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const markdownService = MarkdownService.getInstance();
                const lessonData = await markdownService.loadLesson(courseSlug, moduleId, lessonId);

                if (lessonData) {
                    setLesson(lessonData);
                    onLessonLoaded?.(lessonData);
                } else {
                    setError('Aula não encontrada');
                }
            } catch (err) {
                setError('Erro ao carregar a aula');
                console.error('Error loading lesson:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (courseSlug && moduleId && lessonId) {
            loadLesson();
        }
    }, [courseSlug, moduleId, lessonId, onLessonLoaded]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Carregando aula...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar aula</h3>
                <p className="text-gray-600">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Tentar novamente
                </button>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aula não encontrada</h3>
                <p className="text-gray-600">A aula solicitada não foi encontrada no sistema.</p>
            </div>
        );
    }

    return (
        <div className="markdown-content">
            {/* Cabeçalho da Aula */}
            <div className="mb-6 pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Módulo {lesson.moduleId}</span>
                    <span>•</span>
                    <span>Aula {lesson.id}</span>
                </div>
            </div>

            {/* Conteúdo da Aula */}
            <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
            />

            {/* Rodapé da Aula */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => onLessonCompleted?.(lessonId)}
                            className={`px-4 py-2 rounded-lg transition-colors ${isCompleted
                                    ? 'bg-green-600 text-white cursor-default'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            disabled={isCompleted}
                        >
                            {isCompleted ? '✓ Concluída' : 'Marcar como Concluída'}
                        </button>
                        {lessonId > 1 && (
                            <button
                                onClick={() => onNavigateToLesson?.(lessonId - 1)}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Aula Anterior
                            </button>
                        )}
                        {totalLessons && lessonId < totalLessons && (
                            <button
                                onClick={() => onNavigateToLesson?.(lessonId + 1)}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Próxima Aula
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownLessonViewer;
