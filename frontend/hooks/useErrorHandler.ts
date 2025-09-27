'use client';

import { useState, useCallback } from 'react';

interface ErrorState {
    hasError: boolean;
    error: Error | null;
    errorInfo: string | null;
}

export function useErrorHandler() {
    const handleError = useCallback((error: Error, errorInfo?: string) => {
        console.error('Error caught by useErrorHandler:', error, errorInfo);

        // Log do erro para debugging
        if (typeof window !== 'undefined') {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                errorInfo,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });
        }
    }, []);

    return {
        handleError
    }
}

// Hook para tratamento de erros de API
export function useApiErrorHandler() {
    const [apiError, setApiError] = useState<string | null>(null);
    const [isRetrying, setIsRetrying] = useState(false);

    const handleApiError = useCallback((error: any) => {
        console.error('API Error:', error);

        let errorMessage = 'Erro desconhecido';

        if (error?.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error?.message) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        setApiError(errorMessage);
    }, []);

    const clearApiError = useCallback(() => {
        setApiError(null);
    }, []);

    const retryApiCall = useCallback(async (apiCall: () => Promise<any>) => {
        setIsRetrying(true);
        clearApiError();

        try {
            const result = await apiCall();
            return result;
        } catch (error) {
            handleApiError(error);
            throw error;
        } finally {
            setIsRetrying(false);
        }
    }, [handleApiError, clearApiError]);

    return {
        apiError,
        isRetrying,
        handleApiError,
        clearApiError,
        retryApiCall
    }
}
