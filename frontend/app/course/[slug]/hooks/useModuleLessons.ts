import { useState, useEffect } from 'react';
import { MarkdownService, MarkdownLesson } from '../services/markdown-service';

export const useModuleLessons = (courseSlug: string, moduleId: number) => {
    const [lessons, setLessons] = useState<MarkdownLesson[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadLessons = async () => {
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
        };

        loadLessons();
    }, [courseSlug, moduleId]);

    const refreshLessons = async () => {
        if (!courseSlug || !moduleId) return;

        setIsLoading(true);
        try {
            const markdownService = MarkdownService.getInstance();
            const moduleLessons = await markdownService.loadModuleLessons(courseSlug, moduleId);
            setLessons(moduleLessons);
        } catch (err) {
            setError('Erro ao recarregar aulas do módulo');
            console.error('Error refreshing module lessons:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        lessons,
        isLoading,
        error,
        refreshLessons
    };
};
