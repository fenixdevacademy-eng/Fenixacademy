'use client';

import { useState, useEffect, useCallback } from 'react';
import { MarkdownService, MarkdownLesson } from '../services/markdown-service';

interface UseModuleLessonsProps {
    courseSlug: string;
    moduleId: number;
}

interface UseModuleLessonsReturn {
    lessons: MarkdownLesson[];
    isLoading: boolean;
    error: string | null;
    loadLessons: () => Promise<void>;
    refreshLessons: () => Promise<void>;
    getLessonById: (lessonId: number) => MarkdownLesson | undefined;
    getNextLesson: (currentLessonId: number) => MarkdownLesson | undefined;
    getPreviousLesson: (currentLessonId: number) => MarkdownLesson | undefined;
    getTotalLessons: () => number;
    getCompletedLessons: () => number;
    getProgressPercentage: () => number;
}

export const useModuleLessons = ({
    courseSlug,
    moduleId
}: UseModuleLessonsProps): UseModuleLessonsReturn => {
    const [lessons, setLessons] = useState<MarkdownLesson[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadLessons = useCallback(async () => {
        if (!courseSlug || !moduleId) return;

        setIsLoading(true);
        setError(null);

        try {
            const markdownService = MarkdownService.getInstance();
            const moduleLessons = await markdownService.loadModuleLessons(courseSlug, moduleId);
            setLessons(moduleLessons);
        } catch (err) {
            setError('Erro ao carregar aulas do módulo');
            console.error('Error loading module lessons:', err);
        } finally {
            setIsLoading(false);
        }
    }, [courseSlug, moduleId]);

    const refreshLessons = useCallback(async () => {
        await loadLessons();
    }, [loadLessons]);

    const getLessonById = useCallback((lessonId: number): MarkdownLesson | undefined => {
        return lessons.find(lesson => lesson.id === lessonId);
    }, [lessons]);

    const getNextLesson = useCallback((currentLessonId: number): MarkdownLesson | undefined => {
        const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
        if (currentIndex === -1 || currentIndex >= lessons.length - 1) return undefined;
        return lessons[currentIndex + 1];
    }, [lessons]);

    const getPreviousLesson = useCallback((currentLessonId: number): MarkdownLesson | undefined => {
        const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
        if (currentIndex <= 0) return undefined;
        return lessons[currentIndex - 1];
    }, [lessons]);

    const getTotalLessons = useCallback((): number => {
        return lessons.length;
    }, [lessons]);

    const getCompletedLessons = useCallback((): number => {
        return lessons.filter(lesson => lesson.completed).length;
    }, [lessons]);

    const getProgressPercentage = useCallback((): number => {
        const total = getTotalLessons();
        if (total === 0) return 0;
        const completed = getCompletedLessons();
        return Math.round((completed / total) * 100);
    }, [getTotalLessons, getCompletedLessons]);

    useEffect(() => {
        loadLessons();
    }, [loadLessons]);

    return {
        lessons,
        isLoading,
        error,
        loadLessons,
        refreshLessons,
        getLessonById,
        getNextLesson,
        getPreviousLesson,
        getTotalLessons,
        getCompletedLessons,
        getProgressPercentage
    };
};

export default useModuleLessons;