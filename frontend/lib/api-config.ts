// Configuração da API
export const API_CONFIG = {
    // URLs base
    DJANGO_API_URL: process.env.NEXT_PUBLIC_DJANGO_API_URL || 'http://localhost:8000/api/v1',
    NEXTJS_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',

    // Endpoints
    ENDPOINTS: {
        // Autenticação
        AUTH: {
            LOGIN: '/auth/token/',
            REFRESH: '/auth/token/refresh/',
            PROFILE: '/profile/',
            UPDATE_PROFILE: '/profile/update/',
        },

        // Dashboard
        DASHBOARD: {
            DATA: '/dashboard/data/',
        },

        // Cursos
        COURSES: {
            LIST: '/courses/',
            DETAIL: (id: string) => `/courses/${id}/`,
            ENROLL: (id: string) => `/courses/${id}/enroll/`,
        },

        // Progresso
        PROGRESS: {
            COURSE: (slug: string) => `/progress/courses/${slug}/`,
            ENROLL: (slug: string) => `/progress/courses/${slug}/enroll/`,
            LESSON_COMPLETE: (slug: string, lesson: string) => `/progress/lessons/${slug}/${lesson}/complete/`,
            EXERCISE_COMPLETE: (slug: string, exercise: string) => `/progress/exercises/${slug}/${exercise}/complete/`,
        },

        // Estudo
        STUDY: {
            SESSION: '/study-session/',
        },

        // Busca
        SEARCH: {
            COURSES: '/search/',
        },
    },

    // Headers padrão
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
    },

    // Timeout
    TIMEOUT: 10000, // 10 segundos
};

// Função para construir URL completa
export const buildApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.DJANGO_API_URL}${endpoint}`;
};

// Função para obter headers com autenticação
export const getAuthHeaders = (token?: string): Record<string, string> => {
    const headers = { ...API_CONFIG.DEFAULT_HEADERS };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

// Função para fazer requisições à API Django
export const djangoApiRequest = async <T = any>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
): Promise<T> => {
    const url = buildApiUrl(endpoint);
    const headers = getAuthHeaders(token);

    const response = await fetch(url, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
};

// Função para fazer requisições à API Next.js (fallback)
export const nextjsApiRequest = async <T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const url = `${API_CONFIG.NEXTJS_API_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            ...API_CONFIG.DEFAULT_HEADERS,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
};








