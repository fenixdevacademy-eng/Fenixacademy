'use client';

import { useState, useEffect, useCallback } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'super_admin' | 'admin' | 'student';
    position?: string;
    permissions?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null
    });

    // Verificar autenticação ao carregar
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = useCallback(async () => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

            // Verificar se há token no localStorage
            const token = localStorage.getItem('fenix-jwt-token');
            const userData = localStorage.getItem('fenix-user');

            if (token && userData) {
                const user = JSON.parse(userData);
                setAuthState({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            } else {
                setAuthState({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null
                });
            }
        } catch (error) {
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: 'Erro ao verificar autenticação'
            });
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

            const response = await fetch('/api/auth/login-simple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // Salvar dados no localStorage
                localStorage.setItem('fenix-jwt-token', data.token);
                localStorage.setItem('fenix-user', JSON.stringify(data.user));

                setAuthState({
                    user: data.user,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });

                return { success: true, user: data.user };
            } else {
                setAuthState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: data.message || 'Erro no login'
                }));
                return { success: false, error: data.message };
            }
        } catch (error) {
            const errorMessage = 'Erro de conexão. Tente novamente.';
            setAuthState(prev => ({
                ...prev,
                isLoading: false,
                error: errorMessage
            }));
            return { success: false, error: errorMessage };
        }
    }, []);

    const logout = useCallback(() => {
        // Limpar dados do localStorage
        localStorage.removeItem('fenix-jwt-token');
        localStorage.removeItem('fenix-user');
        localStorage.removeItem('fenix-refresh-token');

        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
        });
    }, []);

    const register = useCallback(async (name: string, email: string, password: string, confirmPassword: string) => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

            if (password !== confirmPassword) {
                setAuthState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: 'Senhas não coincidem'
                }));
                return { success: false, error: 'Senhas não coincidem' };
            }

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, confirmPassword })
            });

            const data = await response.json();

            if (data.success) {
                setAuthState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: null
                }));
                return { success: true, message: data.message };
            } else {
                setAuthState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: data.message || 'Erro no cadastro'
                }));
                return { success: false, error: data.message };
            }
        } catch (error) {
            const errorMessage = 'Erro de conexão. Tente novamente.';
            setAuthState(prev => ({
                ...prev,
                isLoading: false,
                error: errorMessage
            }));
            return { success: false, error: errorMessage };
        }
    }, []);

    const clearError = useCallback(() => {
        setAuthState(prev => ({ ...prev, error: null }));
    }, []);

    return {
        ...authState,
        login,
        logout,
        register,
        clearError,
        checkAuth
    };
};