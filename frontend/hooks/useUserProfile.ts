'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface UserProfile {
    id: number;
    userId: number;
    phone?: string;
    location?: string;
    bio?: string;
    avatar?: string;
    joinDate: string;
    skills?: string[];
    interests?: string[];
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        createdAt: string;
    }
    stats?: {
        coursesCompleted: number;
        totalHours: number;
        certificates: number;
        totalPoints: number;
        rank: string;
    }
    preferences?: {
        publicProfile: boolean;
        showProgress: boolean;
        notifications: boolean;
        emailUpdates: boolean;
    }
}

export interface UserCourse {
    id: string;
    title: string;
    progress: number;
    enrolledAt: string;
    updatedAt: string;
    course?: {
        id: string;
        title: string;
        description?: string;
        slug: string;
        price: number;
        duration: number;
        level: string;
        category: string;
    }
}

export function useUserProfile() {
    const { user, isAuthenticated } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [courses, setCourses] = useState<UserCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar dados do perfil
    const fetchProfile = useCallback(async (): Promise<UserProfile | null> => {
        try {
            console.log('🔍 Buscando perfil do usuário...', { isAuthenticated, user: user?.name });

            if (!isAuthenticated || !user) {
                console.log('❌ Usuário não autenticado');
                return null;
            }

            const token = localStorage.getItem('fenix_token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado');
            }

            const response = await fetch('/api/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'}
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log('✅ Perfil carregado da API:', {
                    id: data.profile.id,
                    userId: data.profile.userId,
                    userName: data.profile.user?.name,
                    userEmail: data.profile.user?.email,
                    bio: data.profile.bio
                });
                return data.profile;
            } else {
                console.error('❌ Erro ao carregar perfil:', data.error);
                throw new Error(data.error || 'Erro ao carregar perfil');
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar perfil';
            console.error('❌ Erro ao buscar perfil:', error);
            throw new Error(errorMessage);
        }
    }, [isAuthenticated, user]);

    // Função para buscar cursos do usuário
    const fetchCourses = useCallback(async (): Promise<UserCourse[]> => {
        try {
            if (!isAuthenticated || !user) {
                return [];
            }

            const token = localStorage.getItem('fenix_token');
            if (!token) {
                return [];
            }

            const response = await fetch('/api/users/courses', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'}
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log('✅ Cursos carregados da API:', data.courses.length);
                return data.courses;
            } else {
                console.error('❌ Erro ao carregar cursos:', data.error);
                return [];
            }

        } catch (error) {
            console.error('❌ Erro ao buscar cursos:', error);
            return [];
        }
    }, [isAuthenticated, user]);

    // Função para atualizar perfil
    const updateProfile = useCallback(async (data: Partial<UserProfile>): Promise<{ success: boolean; message?: string; error?: string }> => {
        try {
            console.log('💾 Atualizando perfil com dados:', data);

            if (!isAuthenticated || !user) {
                console.log('❌ Usuário não autenticado para atualização');
                return { success: false, error: 'Usuário não autenticado' }
            }

            const token = localStorage.getItem('fenix_token');
            if (!token) {
                return { success: false, error: 'Token de autenticação não encontrado' }
            }

            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'},
                body: JSON.stringify(data)});

            const result = await response.json();

            if (response.ok && result.success) {
                setProfile(result.profile);
                console.log('✅ Perfil atualizado na API:', result.profile.name);
                return { success: true, message: 'Perfil atualizado com sucesso' }
            } else {
                console.error('❌ Erro ao atualizar perfil:', result.error);
                return { success: false, error: result.error || 'Erro ao atualizar perfil' }
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar perfil';
            console.error('❌ Erro ao atualizar perfil:', error);
            return { success: false, error: errorMessage }
        }
    }, [isAuthenticated, user]);

    // Função para adicionar curso
    const addCourse = useCallback(async (courseId: string, courseTitle: string): Promise<{ success: boolean; message?: string; error?: string }> => {
        try {
            if (!isAuthenticated || !user) {
                return { success: false, error: 'Usuário não autenticado' }
            }

            const token = localStorage.getItem('fenix_token');
            if (!token) {
                return { success: false, error: 'Token de autenticação não encontrado' }
            }

            const response = await fetch('/api/users/courses', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    courseId,
                    courseTitle
                })});

            const result = await response.json();

            if (response.ok && result.success) {
                // Recarregar cursos após adicionar
                const updatedCourses = await fetchCourses();
                setCourses(updatedCourses);
                console.log('✅ Curso adicionado:', courseTitle);
                return { success: true, message: 'Curso adicionado com sucesso' }
            } else {
                console.error('❌ Erro ao adicionar curso:', result.error);
                return { success: false, error: result.error || 'Erro ao adicionar curso' }
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao adicionar curso';
            console.error('❌ Erro ao adicionar curso:', error);
            return { success: false, error: errorMessage }
        }
    }, [isAuthenticated, user, fetchCourses]);

    // Função para upload de avatar
    const uploadAvatar = useCallback(async (file: File): Promise<{ success: boolean; message?: string; error?: string; avatar?: string }> => {
        try {
            if (!isAuthenticated || !user) {
                return { success: false, error: 'Usuário não autenticado' }
            }

            const token = localStorage.getItem('fenix_token');
            if (!token) {
                return { success: false, error: 'Token de autenticação não encontrado' }
            }

            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch('/api/users/avatar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`},
                body: formData});

            const result = await response.json();

            if (response.ok && result.success) {
                // Atualizar perfil local com novo avatar
                setProfile(prev => prev ? { ...prev, avatar: result.avatar } : null);
                console.log('✅ Avatar atualizado:', result.avatar);
                return { success: true, message: 'Avatar atualizado com sucesso', avatar: result.avatar }
            } else {
                console.error('❌ Erro ao fazer upload do avatar:', result.error);
                return { success: false, error: result.error || 'Erro ao fazer upload do avatar' }
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer upload do avatar';
            console.error('❌ Erro ao fazer upload do avatar:', error);
            return { success: false, error: errorMessage }
        }
    }, [isAuthenticated, user]);

    // Função para recarregar dados
    const refreshData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const [profileData, coursesData] = await Promise.all([
                fetchProfile(),
                fetchCourses()
            ]);

            setProfile(profileData);
            setCourses(coursesData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
            setProfile(null);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    }, [fetchProfile, fetchCourses]);

    // Carregar dados quando o componente montar ou quando a autenticação mudar
    useEffect(() => {
        if (isAuthenticated && user) {
            refreshData();
        } else {
            setProfile(null);
            setCourses([]);
            setLoading(false);
        }
    }, [refreshData, isAuthenticated, user]);

    return {
        profile,
        courses,
        loading,
        error,
        refreshData,
        updateProfile,
        addCourse,
        uploadAvatar}
}