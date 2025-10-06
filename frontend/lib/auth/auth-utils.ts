'use client';

﻿/**
 * Utilitários de autenticação
 */

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

export interface AuthResponse {
    user: User;
    token: string;
}

/**
 * Faz logout do usuário
 */
export async function logout(): Promise<void> {
    try {
        // Remove o token do localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user-data');
        }

        // Aqui você pode adicionar uma chamada para a API para invalidar o token no servidor
        // await fetch('/api/auth/logout', { method: 'POST' });

        console.log('Logout realizado com sucesso');
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        throw error;
    }
}

/**
 * Obtém o token de autenticação
 */
export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth-token');
}

/**
 * Salva o token de autenticação
 */
export function setAuthToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth-token', token);
}

/**
 * Obtém os dados do usuário
 */
export function getUserData(): User | null {
    if (typeof window === 'undefined') return null;

    const userData = localStorage.getItem('user-data');
    if (!userData) return null;

    try {
        return JSON.parse(userData);
    } catch (error) {
        console.error('Erro ao parsear dados do usuário:', error);
        return null;
    }
}

/**
 * Salva os dados do usuário
 */
export function setUserData(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user-data', JSON.stringify(user));
}

/**
 * Verifica se o usuário está autenticado
 */
export function isAuthenticated(): boolean {
    const token = getAuthToken();
    const user = getUserData();
    return !!(token && user);
}

/**
 * Limpa todos os dados de autenticação
 */
export function clearAuthData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-data');
}



