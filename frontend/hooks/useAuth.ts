'use client';

import { useState, useEffect, useCallback } from 'react';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    bio?: string;
    avatar?: string;
    preferred_language?: string;
    learning_goals?: string;
    skill_level?: string;
    subscription_status?: string;
    date_joined: string;
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface UseAuthReturn {
    user: User | null;
    tokens: AuthTokens | null;
    loading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    register: (data: RegisterData) => Promise<boolean>;
    logout: () => void;
    refreshToken: () => Promise<boolean>;
    isAuthenticated: boolean;
}

const AUTH_STORAGE_KEY = 'fenix_auth_data';
const TOKEN_STORAGE_KEY = 'fenix_tokens';

export default function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<User | null>(null);
    const [tokens, setTokens] = useState<AuthTokens | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Carregar dados de autenticação do localStorage
    useEffect(() => {
        const loadAuthData = () => {
            try {
                const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
                const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);

                if (storedAuth && storedTokens) {
                    const userData = JSON.parse(storedAuth);
                    const tokenData = JSON.parse(storedTokens);

                    setUser(userData);
                    setTokens(tokenData);
                }
            } catch (err) {
                console.error('Erro ao carregar dados de autenticação:', err);
                // Limpar dados corrompidos
                localStorage.removeItem(AUTH_STORAGE_KEY);
                localStorage.removeItem(TOKEN_STORAGE_KEY);
            } finally {
                setLoading(false);
            }
        };

        loadAuthData();
    }, []);

    // Salvar dados de autenticação no localStorage
    const saveAuthData = useCallback((userData: User, tokenData: AuthTokens) => {
        try {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
            localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokenData));
        } catch (err) {
            console.error('Erro ao salvar dados de autenticação:', err);
        }
    }, []);

    // Limpar dados de autenticação
    const clearAuthData = useCallback(() => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setUser(null);
        setTokens(null);
    }, []);

    // Função de login
    const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro no login');
            }

            if (data.success && data.data) {
                const { user: userData, access_token, refresh_token } = data.data;

                const tokensData: AuthTokens = {
                    access_token,
                    refresh_token,
                };

                setUser(userData);
                setTokens(tokensData);
                saveAuthData(userData, tokensData);

                return true;
            } else {
                throw new Error(data.error || 'Resposta inválida do servidor');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido no login';
            setError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, [saveAuthData]);

    // Função de registro
    const register = useCallback(async (data: RegisterData): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'Erro no registro');
            }

            if (responseData.success && responseData.data) {
                const { user: userData, access_token, refresh_token } = responseData.data;

                const tokensData: AuthTokens = {
                    access_token,
                    refresh_token,
                };

                setUser(userData);
                setTokens(tokensData);
                saveAuthData(userData, tokensData);

                return true;
            } else {
                throw new Error(responseData.error || 'Resposta inválida do servidor');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido no registro';
            setError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, [saveAuthData]);

    // Função de logout
    const logout = useCallback(() => {
        clearAuthData();
    }, [clearAuthData]);

    // Função para renovar token
    const refreshToken = useCallback(async (): Promise<boolean> => {
        if (!tokens?.refresh_token) {
            return false;
        }

        try {
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh_token: tokens.refresh_token,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao renovar token');
            }

            if (data.success && data.data) {
                const { access_token, refresh_token } = data.data;

                const newTokens: AuthTokens = {
                    access_token,
                    refresh_token,
                };

                setTokens(newTokens);

                // Atualizar tokens no localStorage
                if (user) {
                    saveAuthData(user, newTokens);
                }

                return true;
            } else {
                throw new Error(data.error || 'Resposta inválida do servidor');
            }
        } catch (err) {
            console.error('Erro ao renovar token:', err);
            // Se falhar ao renovar, fazer logout
            logout();
            return false;
        }
    }, [tokens, user, saveAuthData, logout]);

    // Verificar se o usuário está autenticado
    const isAuthenticated = !!user && !!tokens?.access_token;

    return {
        user,
        tokens,
        loading,
        error,
        login,
        register,
        logout,
        refreshToken,
        isAuthenticated,
    };
}
