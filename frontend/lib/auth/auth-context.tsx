'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    access_level?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
    logout: () => void;
    register: (email: string, password: string, name: string) => Promise<{ success: boolean; user?: User; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verificar se há usuário salvo no localStorage
        if (typeof window !== 'undefined') {
            try {
                const savedUser = localStorage.getItem('user');
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error('Erro ao carregar usuário:', error);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // Simulação de login
            const mockUser = {
                id: '1',
                email,
                name: 'Usuário Teste'
            };

            setUser(mockUser);

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('auth_token', 'mock-token');
            }

            return {
                success: true,
                user: mockUser
            };
        } catch (error) {
            return {
                success: false,
                error: 'Erro no login'
            };
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            // Simulação de registro
            const mockUser = {
                id: '1',
                email,
                name
            };

            setUser(mockUser);

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('auth_token', 'mock-token');
            }

            return {
                success: true,
                user: mockUser
            };
        } catch (error) {
            return {
                success: false,
                error: 'Erro no registro'
            };
        }
    };

    const logout = () => {
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('auth_token');
        }
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        // Retornar valores padrão durante SSR
        return {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            login: async () => ({ success: false, error: 'Context not available' }),
            logout: () => { },
            register: async () => ({ success: false, error: 'Context not available' })
        };
    }
    return context;
}