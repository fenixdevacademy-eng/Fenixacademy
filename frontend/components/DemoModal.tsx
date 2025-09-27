'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, Clock, BookOpen, ArrowRight, Lock } from 'lucide-react';
import { getCourseContent } from '@/app/course/[slug]/courseContent';

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseSlug: string;
    courseTitle: string;
}

interface LessonContent {
    id: number;
    title: string;
    type: 'text' | 'video' | 'quiz' | 'project' | 'exercise' | 'ide';
    duration: string;
    content?: string;
    videoUrl?: string;
    resources?: string[];
    exercises?: string[];
}

export default function DemoModal({ isOpen, onClose, courseSlug, courseTitle }: DemoModalProps) {
    const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && courseSlug) {
            loadFirstLesson();
        }
    }, [isOpen, courseSlug]);

    const loadFirstLesson = async () => {
        setLoading(true);
        try {
            console.log('🔍 Carregando primeira aula para o curso:', courseSlug);

            // Obter conteúdo do curso
            const courseContent = getCourseContent(courseSlug);
            console.log('📚 Conteúdo do curso encontrado:', courseContent);

            if (courseContent && courseContent.modules.length > 0) {
                const firstModule = courseContent.modules[0];
                console.log('📖 Primeiro módulo:', firstModule);

                if (firstModule.lessons.length > 0) {
                    const firstLesson = firstModule.lessons[0];
                    console.log('🎯 Primeira aula:', firstLesson);
                    setLessonContent(firstLesson);
                } else {
                    console.warn('⚠️ Nenhuma aula encontrada no primeiro módulo');
                }
            } else {
                console.warn('⚠️ Nenhum conteúdo encontrado para o curso:', courseSlug);
            }
        } catch (error) {
            console.error('❌ Erro ao carregar primeira aula:', error);
        } finally {
            setLoading(false);
        }
    }

    const renderLessonContent = () => {
        if (!lessonContent) return null;

        return (
            <div className="space-y-6">
                {/* Header da Aula */}
                <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Primeira Aula - {courseTitle}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{lessonContent.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{lessonContent.duration}</span>
                        </div>
                        <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {lessonContent.type.toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* Conteúdo da Aula */}
                <div className="prose prose-lg max-w-none">
                    {lessonContent.content ? (
                        <div
                            className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                                __html: lessonContent.content
                                    .replace(/\n/g, '<br>')
                                    .replace(/#{1,6}\s/g, (match) => {
                                        const level = match.trim().length;
                                        return `<h${level} class="font-bold text-gray-900 mt-6 mb-3">`;
                                    })
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                                    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
                                    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
                            }}
                        />
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-gray-500 mb-4">
                                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                                <p>Conteúdo da primeira aula será exibido aqui</p>
                                <p className="text-sm mt-2">Esta é uma demonstração da metodologia de ensino</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recursos Adicionais */}
                {lessonContent.resources && lessonContent.resources.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Recursos da Aula:</h4>
                        <ul className="space-y-1">
                            {lessonContent.resources.map((resource, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                    <ArrowRight className="w-3 h-3" />
                                    {resource}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Demonstração Gratuita</h1>
                            <p className="text-sm text-gray-600">Veja como é nossa metodologia de ensino</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-600">Carregando primeira aula...</p>
                                </div>
                            </div>
                        ) : (
                            renderLessonContent()
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                <p>Esta é apenas uma demonstração da primeira aula.</p>
                                <p>Para acessar o curso completo, faça sua inscrição!</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Fechar
                                </button>
                                <button
                                    onClick={() => {
                                        onClose();
                                        window.location.href = `/course/${courseSlug}`;
                                    }}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    Ver Curso Completo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
