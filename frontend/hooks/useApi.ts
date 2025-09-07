import { useState, useCallback, useRef } from 'react';
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
    const [state, setState] = useState<ApiStateData<T>>({
        data: options.initialData || null,
        error: null,
        state: 'idle',
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    // Função para executar a requisição
    const execute = useCallback(async (endpoint: string, requestOptions: any = {}) => {
        // Cancelar requisição anterior se existir
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Criar novo controller
        abortControllerRef.current = new AbortController();

        try {
            setState(prev => ({
                ...prev,
                state: 'loading',
                isLoading: true,
                isSuccess: false,
                isError: false,
                error: null,
            }));

            const response = await api.get<T>(endpoint, {
                ...requestOptions,
                signal: abortControllerRef.current.signal,
            });

            if (response.ok && response.data) {
                setState(prev => ({
                    ...prev,
                    data: response.data,
                    state: 'success',
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                }));

                options.onSuccess?.(response.data);
            } else {
                throw new Error('Request failed');
            }
        } catch (error: any) {
            // Ignorar erros de abort
            if (error.name === 'AbortError') return;

            const errorMessage = extractErrorMessage(error);

            setState(prev => ({
                ...prev,
                error: errorMessage,
                state: 'error',
                isLoading: false,
                isSuccess: false,
                isError: true,
            }));

            options.onError?.(errorMessage);
        } finally {
            options.onFinally?.();
        }
    }, [options]);

    // Função para resetar o estado
    const reset = useCallback(() => {
        setState({
            data: options.initialData || null,
            error: null,
            state: 'idle',
            isLoading: false,
            isSuccess: false,
            isError: false,
        });
    }, [options.initialData]);

    // Função para definir dados manualmente
    const setData = useCallback((data: T) => {
        setState(prev => ({
            ...prev,
            data,
            state: 'success',
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: null,
        }));
    }, []);

    // Função para definir erro manualmente
    const setError = useCallback((error: string) => {
        setState(prev => ({
            ...prev,
            error,
            state: 'error',
            isLoading: false,
            isSuccess: false,
            isError: true,
        }));
    }, []);

    return [state, { execute, reset, setData, setError }];
}

// Hook para requisições POST
export function useApiPost<T = any>(options: UseApiOptions = {}) {
    const [state, setState] = useState<ApiStateData<T>>({
        data: options.initialData || null,
        error: null,
        state: 'idle',
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const execute = useCallback(async (endpoint: string, data: any = {}, requestOptions: any = {}) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        try {
            setState(prev => ({
                ...prev,
                state: 'loading',
                isLoading: true,
                isSuccess: false,
                isError: false,
                error: null,
            }));

            const response = await api.post<T>(endpoint, data, {
                ...requestOptions,
                signal: abortControllerRef.current.signal,
            });

            if (response.ok && response.data) {
                setState(prev => ({
                    ...prev,
                    data: response.data,
                    state: 'success',
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                }));

                options.onSuccess?.(response.data);
            } else {
                throw new Error('Request failed');
            }
        } catch (error: any) {
            if (error.name === 'AbortError') return;

            const errorMessage = extractErrorMessage(error);

            setState(prev => ({
                ...prev,
                error: errorMessage,
                state: 'error',
                isLoading: false,
                isSuccess: false,
                isError: true,
            }));

            options.onError?.(errorMessage);
        } finally {
            options.onFinally?.();
        }
    }, [options]);

    const reset = useCallback(() => {
        setState({
            data: options.initialData || null,
            error: null,
            state: 'idle',
            isLoading: false,
            isSuccess: false,
            isError: false,
        });
    }, [options.initialData]);

    const setData = useCallback((data: T) => {
        setState(prev => ({
            ...prev,
            data,
            state: 'success',
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: null,
        }));
    }, []);

    const setError = useCallback((error: string) => {
        setState(prev => ({
            ...prev,
            error,
            state: 'error',
            isLoading: false,
            isSuccess: false,
            isError: true,
        }));
    }, []);

    return [state, { execute, reset, setData, setError }];
}

// Hook para requisições PUT
export function useApiPut<T = any>(options: UseApiOptions = {}) {
    const [state, setState] = useState<ApiStateData<T>>({
        data: options.initialData || null,
        error: null,
        state: 'idle',
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const execute = useCallback(async (endpoint: string, data: any = {}, requestOptions: any = {}) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        try {
            setState(prev => ({
                ...prev,
                state: 'loading',
                isLoading: true,
                isSuccess: false,
                isError: false,
                error: null,
            }));

            const response = await api.put<T>(endpoint, data, {
                ...requestOptions,
                signal: abortControllerRef.current.signal,
            });

            if (response.ok && response.data) {
                setState(prev => ({
                    ...prev,
                    data: response.data,
                    state: 'success',
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                }));

                options.onSuccess?.(response.data);
            } else {
                throw new Error('Request failed');
            }
        } catch (error: any) {
            if (error.name === 'AbortError') return;

            const errorMessage = extractErrorMessage(error);

            setState(prev => ({
                ...prev,
                error: errorMessage,
                state: 'error',
                isLoading: false,
                isSuccess: false,
                isError: true,
            }));

            options.onError?.(errorMessage);
        } finally {
            options.onFinally?.();
        }
    }, [options]);

    const reset = useCallback(() => {
        setState({
            data: options.initialData || null,
            error: null,
            state: 'idle',
            isLoading: false,
            isSuccess: false,
            isError: false,
        });
    }, [options.initialData]);

    const setData = useCallback((data: T) => {
        setState(prev => ({
            ...prev,
            data,
            state: 'success',
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: null,
        }));
    }, []);

    const setError = useCallback((error: string) => {
        setState(prev => ({
            ...prev,
            error,
            state: 'error',
            isLoading: false,
            isSuccess: false,
            isError: true,
        }));
    }, []);

    return [state, { execute, reset, setData, setError }];
}

// Hook para requisições DELETE
export function useApiDelete<T = any>(options: UseApiOptions = {}) {
    const [state, setState] = useState<ApiStateData<T>>({
        data: options.initialData || null,
        error: null,
        state: 'idle',
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const execute = useCallback(async (endpoint: string, requestOptions: any = {}) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        try {
            setState(prev => ({
                ...prev,
                state: 'loading',
                isLoading: true,
                isSuccess: false,
                isError: false,
                error: null,
            }));

            const response = await api.delete<T>(endpoint, {
                ...requestOptions,
                signal: abortControllerRef.current.signal,
            });

            if (response.ok) {
                setState(prev => ({
                    ...prev,
                    state: 'success',
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                    error: null,
                }));

                options.onSuccess?.(response.data);
            } else {
                throw new Error('Request failed');
            }
        } catch (error: any) {
            if (error.name === 'AbortError') return;

            const errorMessage = extractErrorMessage(error);

            setState(prev => ({
                ...prev,
                error: errorMessage,
                state: 'error',
                isLoading: false,
                isSuccess: false,
                isError: true,
            }));

            options.onError?.(errorMessage);
        } finally {
            options.onFinally?.();
        }
    }, [options]);

    const reset = useCallback(() => {
        setState({
            data: options.initialData || null,
            error: null,
            state: 'idle',
            isLoading: false,
            isSuccess: false,
            isError: false,
        });
    }, [options.initialData]);

    const setData = useCallback((data: T) => {
        setState(prev => ({
            ...prev,
            data,
            state: 'success',
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: null,
        }));
    }, []);

    const setError = useCallback((error: string) => {
        setState(prev => ({
            ...prev,
            error,
            state: 'error',
            isLoading: false,
            isSuccess: false,
            isError: true,
        }));
    }, []);

    return [state, { execute, reset, setData, setError }];
}

// Hook para upload de arquivos
export function useApiUpload<T = any>(options: UseApiOptions = {}) {
    const [state, setState] = useState<ApiStateData<T>>({
        data: options.initialData || null,
        error: null,
        state: 'idle',
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const [uploadProgress, setUploadProgress] = useState(0);

    const execute = useCallback(async (endpoint: string, file: File, requestOptions: any = {}) => {
        try {
            setState(prev => ({
                ...prev,
                state: 'loading',
                isLoading: true,
                isSuccess: false,
                isError: false,
                error: null,
            }));

            setUploadProgress(0);

            const response = await api.upload<T>(endpoint, file, (progress) => {
                setUploadProgress(progress);
            });

            if (response.ok && response.data) {
                setState(prev => ({
                    ...prev,
                    data: response.data,
                    state: 'success',
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                }));

                options.onSuccess?.(response.data);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error: any) {
            const errorMessage = extractErrorMessage(error);

            setState(prev => ({
                ...prev,
                error: errorMessage,
                state: 'error',
                isLoading: false,
                isSuccess: false,
                isError: true,
            }));

            options.onError?.(errorMessage);
        } finally {
            setUploadProgress(0);
            options.onFinally?.();
        }
    }, [options]);

    const reset = useCallback(() => {
        setState({
            data: options.initialData || null,
            error: null,
            state: 'idle',
            isLoading: false,
            isSuccess: false,
            isError: false,
        });
        setUploadProgress(0);
    }, [options.initialData]);

    const setData = useCallback((data: T) => {
        setState(prev => ({
            ...prev,
            data,
            state: 'success',
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: null,
        }));
    }, []);

    const setError = useCallback((error: string) => {
        setState(prev => ({
            ...prev,
            error,
            state: 'error',
            isLoading: false,
            isSuccess: false,
            isError: true,
        }));
    }, []);

    return [state, uploadProgress, { execute, reset, setData, setError }];
}

// Hook para verificar autenticação
export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        if (typeof window !== 'undefined') {
            return tokenManager.getAccessToken() !== null;
        }
        return false;
    });

    const checkAuth = useCallback(() => {
        const hasToken = tokenManager.getAccessToken() !== null;
        setIsAuthenticated(hasToken);
        return hasToken;
    }, []);

    const logout = useCallback(async () => {
        try {
            await tokenManager.clearTokens();
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }, []);

    return {
        isAuthenticated,
        checkAuth,
        logout,
    };
}






