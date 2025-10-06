'use client';

﻿import { useState, useCallback, useRef } from 'react';
import { api, tokenManager } from '../lib/http-client';
import { extractErrorMessage } from '../lib/api';

// Estados possíveis para uma requisição
export type ApiState = 'idle' | 'loading' | 'success' | 'error';

// Interface para o estado da API
export interface ApiStateData<T = any> {
    data: T | null;
    error: string | null;
    state: ApiState;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

// Interface para opções do hook
export interface UseApiOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
    onFinally?: () => void;
    autoExecute?: boolean;
    initialData?: any;
}

// Hook principal para gerenciar estado da API
export function useApi<T = any>(options: UseApiOptions = {}): [
    ApiStateData<T>,
    {
        execute: (endpoint: string, requestOptions?: any) => Promise<void>;
        reset: () => void;
        setData: (data: T) => void;
        setError: (error: string) => void;
    }
] {
    const {
        onSuccess,
        onError,
        onFinally,
        autoExecute = false,
        initialData = null
    } = options;

    const [state, setState] = useState<ApiStateData<T>>({
        data: initialData,
        error: null,
        state: 'idle',
        isLoading: false,
        isSuccess: false,
        isError: false
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const execute = useCallback(async (endpoint: string, requestOptions: any = {}) => {
        // Cancelar requisição anterior se existir
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Criar novo AbortController
        abortControllerRef.current = new AbortController();

        setState(prev => ({
            ...prev,
            state: 'loading',
            isLoading: true,
            isSuccess: false,
            isError: false,
            error: null
        }));

        try {
            const response = await api(endpoint, {
                ...requestOptions,
                signal: abortControllerRef.current.signal
            });

            setState(prev => ({
                ...prev,
                data: response.data,
                state: 'success',
                isLoading: false,
                isSuccess: true,
                isError: false,
                error: null
            }));

            onSuccess?.(response.data);
        } catch (error: any) {
            const errorMessage = extractErrorMessage(error);

            setState(prev => ({
                ...prev,
                error: errorMessage,
                state: 'error',
                isLoading: false,
                isSuccess: false,
                isError: true
            }));

            onError?.(errorMessage);
        } finally {
            onFinally?.();
        }
    }, [onSuccess, onError, onFinally]);

    const reset = useCallback(() => {
        setState({
            data: initialData,
            error: null,
            state: 'idle',
            isLoading: false,
            isSuccess: false,
            isError: false
        });
    }, [initialData]);

    const setData = useCallback((data: T) => {
        setState(prev => ({
            ...prev,
            data,
            state: 'success',
            isSuccess: true,
            isError: false,
            error: null
        }));
    }, []);

    const setError = useCallback((error: string) => {
        setState(prev => ({
            ...prev,
            error,
            state: 'error',
            isSuccess: false,
            isError: true
        }));
    }, []);

    return [
        state,
        {
            execute,
            reset,
            setData,
            setError
        }
    ];
}

// Hook para requisições GET
export function useGet<T = any>(endpoint: string, options: UseApiOptions = {}) {
    const [state, { execute, reset, setData, setError }] = useApi<T>(options);

    const get = useCallback(async (customEndpoint?: string) => {
        await execute(customEndpoint || endpoint, { method: 'GET' });
    }, [execute, endpoint]);

    return [state, { get, reset, setData, setError }] as const;
}

// Hook para requisições POST
export function usePost<T = any>(endpoint: string, options: UseApiOptions = {}) {
    const [state, { execute, reset, setData, setError }] = useApi<T>(options);

    const post = useCallback(async (data: any, customEndpoint?: string) => {
        await execute(customEndpoint || endpoint, {
            method: 'POST',
            data
        });
    }, [execute, endpoint]);

    return [state, { post, reset, setData, setError }] as const;
}

// Hook para requisições PUT
export function usePut<T = any>(endpoint: string, options: UseApiOptions = {}) {
    const [state, { execute, reset, setData, setError }] = useApi<T>(options);

    const put = useCallback(async (data: any, customEndpoint?: string) => {
        await execute(customEndpoint || endpoint, {
            method: 'PUT',
            data
        });
    }, [execute, endpoint]);

    return [state, { put, reset, setData, setError }] as const;
}

// Hook para requisições DELETE
export function useDelete<T = any>(endpoint: string, options: UseApiOptions = {}) {
    const [state, { execute, reset, setData, setError }] = useApi<T>(options);

    const del = useCallback(async (customEndpoint?: string) => {
        await execute(customEndpoint || endpoint, { method: 'DELETE' });
    }, [execute, endpoint]);

    return [state, { delete: del, reset, setData, setError }] as const;
}

// Hook para requisições PATCH
export function usePatch<T = any>(endpoint: string, options: UseApiOptions = {}) {
    const [state, { execute, reset, setData, setError }] = useApi<T>(options);

    const patch = useCallback(async (data: any, customEndpoint?: string) => {
        await execute(customEndpoint || endpoint, {
            method: 'PATCH',
            data
        });
    }, [execute, endpoint]);

    return [state, { patch, reset, setData, setError }] as const;
}

// Hook para upload de arquivos
export function useUpload<T = any>(endpoint: string, options: UseApiOptions = {}) {
    const [state, { execute, reset, setData, setError }] = useApi<T>(options);

    const upload = useCallback(async (file: File, customEndpoint?: string) => {
        const formData = new FormData();
        formData.append('file', file);

        await execute(customEndpoint || endpoint, {
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }, [execute, endpoint]);

    return [state, { upload, reset, setData, setError }] as const;
}

// Hook para requisições com retry automático
export function useApiWithRetry<T = any>(
    endpoint: string,
    options: UseApiOptions & { maxRetries?: number; retryDelay?: number } = {}
) {
    const { maxRetries = 3, retryDelay = 1000, ...apiOptions } = options;
    const [state, { execute, reset, setData, setError }] = useApi<T>(apiOptions);
    const [retryCount, setRetryCount] = useState(0);

    const executeWithRetry = useCallback(async (requestOptions?: any) => {
        let currentRetry = 0;

        const attemptRequest = async (): Promise<void> => {
            try {
                await execute(endpoint, requestOptions);
                setRetryCount(0);
            } catch (error) {
                if (currentRetry < maxRetries) {
                    currentRetry++;
                    setRetryCount(currentRetry);
                    setTimeout(attemptRequest, retryDelay);
                } else {
                    throw error;
                }
            }
        };

        await attemptRequest();
    }, [execute, endpoint, maxRetries, retryDelay]);

    return [
        { ...state, retryCount },
        { execute: executeWithRetry, reset, setData, setError }
    ] as const;
}