import { useState, useEffect } from 'react';

interface CourseProgress {
    courseSlug: string;
    completedLessons: number;
    lastAccessed: Date;
    timeSpent: number; // em minutos
}

export const useCourseProgress = (courseSlug: string) => {
    const [progress, setProgress] = useState<CourseProgress>({
        courseSlug,
        completedLessons: 0,
        lastAccessed: new Date(),
        timeSpent: 0
    });

    // Carregar progresso do localStorage
    useEffect(() => {
        const savedProgress = localStorage.getItem(`course-progress-${courseSlug}`);
        if (savedProgress) {
            try {
                const parsed = JSON.parse(savedProgress);
                setProgress({
                    ...parsed,
                    lastAccessed: new Date(parsed.lastAccessed)
                });
            } catch (error) {
                console.error('Error parsing saved progress:', error);
            }
        }
    }, [courseSlug]);

    // Salvar progresso no localStorage
    const saveProgress = (newProgress: Partial<CourseProgress>) => {
        const updatedProgress = { ...progress, ...newProgress };
        setProgress(updatedProgress);

        try {
            localStorage.setItem(`course-progress-${courseSlug}`, JSON.stringify(updatedProgress));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    // Marcar aula como concluída
    const completeLesson = (lessonId: number) => {
        if (lessonId > progress.completedLessons) {
            saveProgress({ completedLessons: lessonId });
        }
    };

    // Atualizar tempo gasto
    const updateTimeSpent = (minutes: number) => {
        saveProgress({ timeSpent: progress.timeSpent + minutes });
    };

    // Atualizar último acesso
    const updateLastAccessed = () => {
        saveProgress({ lastAccessed: new Date() });
    };

    // Resetar progresso
    const resetProgress = () => {
        const resetProgress = {
            courseSlug,
            completedLessons: 0,
            lastAccessed: new Date(),
            timeSpent: 0
        };
        setProgress(resetProgress);
        localStorage.removeItem(`course-progress-${courseSlug}`);
    };

    return {
        progress,
        completeLesson,
        updateTimeSpent,
        updateLastAccessed,
        resetProgress
    };
};
