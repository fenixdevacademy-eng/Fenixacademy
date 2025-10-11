'use client';

import { useState, useCallback } from 'react';
import { djangoApiRequest, API_CONFIG } from '@/lib/api-config';

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface UseDjangoApiReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    execute: (endpoint: string, options?: RequestInit) => Promise<void>;
    reset: () => void;
}

export function useDjangoApi<T = any>(): UseDjangoApiReturn<T> {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(async (endpoint: string, options: RequestInit = {}) => {
        setState(prev => ({
            ...prev,
            loading: true,
            error: null,
        }));

        try {
            // Obter token do localStorage
            const token = localStorage.getItem('fenix-jwt-token');

            const data = await djangoApiRequest<T>(endpoint, options, token || undefined);

            setState({
                data,
                loading: false,
                error: null,
            });
        } catch (error) {
            setState({
                data: null,
                loading: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido',
            });
        }
    }, []);

    const reset = useCallback(() => {
        setState({
            data: null,
            loading: false,
            error: null,
        });
    }, []);

    return {
        data: state.data,
        loading: state.loading,
        error: state.error,
        execute,
        reset,
    };
}

// Hook específico para profile
export function useProfile() {
    const { data, loading, error, execute, reset } = useDjangoApi();

    const fetchProfile = useCallback(() => {
        execute(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    }, [execute]);

    const updateProfile = useCallback((profileData: any) => {
        execute(API_CONFIG.ENDPOINTS.AUTH.UPDATE_PROFILE, {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    }, [execute]);

    return {
        profile: data,
        loading,
        error,
        fetchProfile,
        updateProfile,
        reset,
    };
}

// Hook específico para dashboard
export function useDashboard() {
    const { data, loading, error, execute, reset } = useDjangoApi();

    const fetchDashboard = useCallback(() => {
        execute(API_CONFIG.ENDPOINTS.DASHBOARD.DATA);
    }, [execute]);

    return {
        dashboard: data,
        loading,
        error,
        fetchDashboard,
        reset,
    };
}

// Hook específico para cursos
export function useCourses() {
    const { data, loading, error, execute, reset } = useDjangoApi();

    const fetchCourses = useCallback((params?: Record<string, string>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        execute(API_CONFIG.ENDPOINTS.COURSES.LIST + queryString);
    }, [execute]);

    const fetchCourse = useCallback((id: string) => {
        execute(API_CONFIG.ENDPOINTS.COURSES.DETAIL(id));
    }, [execute]);

    const enrollInCourse = useCallback((id: string) => {
        execute(API_CONFIG.ENDPOINTS.COURSES.ENROLL(id), {
            method: 'POST',
        });
    }, [execute]);

    return {
        courses: data,
        loading,
        error,
        fetchCourses,
        fetchCourse,
        enrollInCourse,
        reset,
    };
}

// Hook específico para progresso
export function useProgress() {
    const { data, loading, error, execute, reset } = useDjangoApi();

    const fetchCourseProgress = useCallback((slug: string) => {
        execute(API_CONFIG.ENDPOINTS.PROGRESS.COURSE(slug));
    }, [execute]);

    const enrollInCourse = useCallback((slug: string) => {
        execute(API_CONFIG.ENDPOINTS.PROGRESS.ENROLL(slug), {
            method: 'POST',
        });
    }, [execute]);

    const markLessonComplete = useCallback((slug: string, lesson: string) => {
        execute(API_CONFIG.ENDPOINTS.PROGRESS.LESSON_COMPLETE(slug, lesson), {
            method: 'POST',
        });
    }, [execute]);

    const markExerciseComplete = useCallback((slug: string, exercise: string) => {
        execute(API_CONFIG.ENDPOINTS.PROGRESS.EXERCISE_COMPLETE(slug, exercise), {
            method: 'POST',
        });
    }, [execute]);

    return {
        progress: data,
        loading,
        error,
        fetchCourseProgress,
        enrollInCourse,
        markLessonComplete,
        markExerciseComplete,
        reset,
    };
}

// Hook específico para sessões de estudo
export function useStudySession() {
    const { data, loading, error, execute, reset } = useDjangoApi();

    const updateStudySession = useCallback((sessionData: any) => {
        execute(API_CONFIG.ENDPOINTS.STUDY.SESSION, {
            method: 'POST',
            body: JSON.stringify(sessionData),
        });
    }, [execute]);

    return {
        session: data,
        loading,
        error,
        updateStudySession,
        reset,
    };
}



















