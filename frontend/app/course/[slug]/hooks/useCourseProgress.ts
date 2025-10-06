'use client';

import { useState, useEffect, useCallback } from 'react';

interface CourseProgress {
    courseSlug: string;
    completedLessons: number;
    totalLessons: number;
    lastAccessed: Date;
    timeSpent: number; // em minutos
    currentLesson: number;
    completedModules: number[];
    achievements: string[];
    notes: string;
    bookmarks: number[];
    rating?: number;
    review?: string;
}

interface UseCourseProgressReturn {
    progress: CourseProgress;
    isLoading: boolean;
    error: string | null;
    updateProgress: (updates: Partial<CourseProgress>) => void;
    completeLesson: (lessonId: number) => void;
    completeModule: (moduleId: number) => void;
    addBookmark: (lessonId: number) => void;
    removeBookmark: (lessonId: number) => void;
    addNote: (note: string) => void;
    setRating: (rating: number) => void;
    setReview: (review: string) => void;
    resetProgress: () => void;
    saveProgress: () => void;
    loadProgress: () => void;
}

export function useCourseProgress(courseSlug: string, totalLessons: number = 0): UseCourseProgressReturn {
    const [progress, setProgress] = useState<CourseProgress>({
        courseSlug,
        completedLessons: 0,
        totalLessons,
        lastAccessed: new Date(),
        timeSpent: 0,
        currentLesson: 1,
        completedModules: [],
        achievements: [],
        notes: '',
        bookmarks: [],
        rating: undefined,
        review: undefined
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Carregar progresso do localStorage
    const loadProgress = useCallback(() => {
        try {
            setIsLoading(true);
            setError(null);

            const savedProgress = localStorage.getItem(`course-progress-${courseSlug}`);
            if (savedProgress) {
                const parsed = JSON.parse(savedProgress);
                setProgress({
                    ...parsed,
                    lastAccessed: new Date(parsed.lastAccessed),
                    totalLessons: totalLessons || parsed.totalLessons
                });
            } else {
                setProgress(prev => ({
                    ...prev,
                    totalLessons,
                    lastAccessed: new Date()
                }));
            }
        } catch (err) {
            console.error('Error loading progress:', err);
            setError('Erro ao carregar progresso');
        } finally {
            setIsLoading(false);
        }
    }, [courseSlug, totalLessons]);

    // Salvar progresso no localStorage
    const saveProgress = useCallback(() => {
        try {
            const progressToSave = {
                ...progress,
                lastAccessed: progress.lastAccessed.toISOString()
            };
            localStorage.setItem(`course-progress-${courseSlug}`, JSON.stringify(progressToSave));
        } catch (err) {
            console.error('Error saving progress:', err);
            setError('Erro ao salvar progresso');
        }
    }, [progress, courseSlug]);

    // Atualizar progresso
    const updateProgress = useCallback((updates: Partial<CourseProgress>) => {
        setProgress(prev => ({
            ...prev,
            ...updates,
            lastAccessed: new Date()
        }));
    }, []);

    // Completar aula
    const completeLesson = useCallback((lessonId: number) => {
        setProgress(prev => {
            const newCompletedLessons = Math.max(prev.completedLessons, lessonId);
            const newCurrentLesson = Math.min(lessonId + 1, prev.totalLessons);

            // Verificar conquistas
            const newAchievements = [...prev.achievements];
            if (newCompletedLessons === 1 && !newAchievements.includes('first-lesson')) {
                newAchievements.push('first-lesson');
            }
            if (newCompletedLessons === prev.totalLessons && !newAchievements.includes('course-completed')) {
                newAchievements.push('course-completed');
            }
            if (newCompletedLessons >= prev.totalLessons * 0.5 && !newAchievements.includes('halfway')) {
                newAchievements.push('halfway');
            }

            return {
                ...prev,
                completedLessons: newCompletedLessons,
                currentLesson: newCurrentLesson,
                achievements: newAchievements,
                lastAccessed: new Date()
            };
        });
    }, []);

    // Completar módulo
    const completeModule = useCallback((moduleId: number) => {
        setProgress(prev => ({
            ...prev,
            completedModules: [...prev.completedModules.filter(id => id !== moduleId), moduleId],
            lastAccessed: new Date()
        }));
    }, []);

    // Adicionar bookmark
    const addBookmark = useCallback((lessonId: number) => {
        setProgress(prev => ({
            ...prev,
            bookmarks: [...prev.bookmarks.filter(id => id !== lessonId), lessonId],
            lastAccessed: new Date()
        }));
    }, []);

    // Remover bookmark
    const removeBookmark = useCallback((lessonId: number) => {
        setProgress(prev => ({
            ...prev,
            bookmarks: prev.bookmarks.filter(id => id !== lessonId),
            lastAccessed: new Date()
        }));
    }, []);

    // Adicionar nota
    const addNote = useCallback((note: string) => {
        setProgress(prev => ({
            ...prev,
            notes: note,
            lastAccessed: new Date()
        }));
    }, []);

    // Definir avaliação
    const setRating = useCallback((rating: number) => {
        setProgress(prev => ({
            ...prev,
            rating,
            lastAccessed: new Date()
        }));
    }, []);

    // Definir resenha
    const setReview = useCallback((review: string) => {
        setProgress(prev => ({
            ...prev,
            review,
            lastAccessed: new Date()
        }));
    }, []);

    // Resetar progresso
    const resetProgress = useCallback(() => {
        setProgress({
            courseSlug,
            completedLessons: 0,
            totalLessons,
            lastAccessed: new Date(),
            timeSpent: 0,
            currentLesson: 1,
            completedModules: [],
            achievements: [],
            notes: '',
            bookmarks: [],
            rating: undefined,
            review: undefined
        });
    }, [courseSlug, totalLessons]);

    // Carregar progresso na inicialização
    useEffect(() => {
        loadProgress();
    }, [loadProgress]);

    // Salvar progresso automaticamente quando mudar
    useEffect(() => {
        if (!isLoading) {
            saveProgress();
        }
    }, [progress, isLoading, saveProgress]);

    // Atualizar total de aulas quando mudar
    useEffect(() => {
        if (totalLessons > 0) {
            setProgress(prev => ({
                ...prev,
                totalLessons
            }));
        }
    }, [totalLessons]);

    return {
        progress,
        isLoading,
        error,
        updateProgress,
        completeLesson,
        completeModule,
        addBookmark,
        removeBookmark,
        addNote,
        setRating,
        setReview,
        resetProgress,
        saveProgress,
        loadProgress
    };
}

export default useCourseProgress;