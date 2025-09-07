'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface UserProfile {
    id: number;
    user_info: {
        name: string;
        email: string;
        phone?: string;
        location?: string;
        bio?: string;
        avatar?: string;
        joinDate: string;
        completedCourses: number;
        studyHours: number;
        level: string;
    };
    study_stats: {
        current_streak: number;
        longest_streak: number;
        total_study_time: number;
        weekly_goal: number;
        weekly_progress: number;
    };
    certificates: Array<{
        id: number;
        courseName: string;
        issueDate: string;
        certificateUrl: string;
        instructor: string;
    }>;
    enrolled_courses: Array<{
        id: number;
        title: string;
        progress: number;
        lastAccessed: string;
        instructor: string;
        image: string;
    }>;
    achievements: Array<{
        id: number;
        name: string;
        description: string;
        icon: string;
        earnedDate: string;
    }>;
    preferences: {
        emailNotifications: boolean;
        pushNotifications: boolean;
        weeklyReports: boolean;
        language: string;
        timezone: string;
    };
}

export interface UseUserProfileReturn {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    refreshProfile: () => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; message?: string; error?: string }>;
}

export default function useUserProfile(): UseUserProfileReturn {
    const { user, isAuthenticated } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar dados do perfil da API
    const fetchProfile = useCallback(async (): Promise<UserProfile | null> => {
        if (!isAuthenticated) {
            return null;
        }

        try {
            // Por enquanto, vamos retornar dados mockados baseados no usuário logado
            // Em produção, isso seria uma chamada para a API
            const mockProfile: UserProfile = {
                id: user?.id || 1,
                user_info: {
                    name: user?.name || 'Usuário',
                    email: user?.email || 'usuario@email.com',
                    phone: '(11) 99999-9999',
                    location: 'São Paulo, SP',
                    bio: user?.role === 'CEO' ? 'CEO da Fenix Academy' : 'Estudante da Fenix Academy',
                    avatar: '/avatars/default.jpg',
                    joinDate: new Date().toISOString().split('T')[0] || new Date().toISOString(),
                    completedCourses: user?.role === 'CEO' ? 10 : 3,
                    studyHours: user?.role === 'CEO' ? 500 : 120,
                    level: user?.role === 'CEO' ? 'Avançado' : 'Intermediário'
                },
                study_stats: {
                    current_streak: user?.role === 'CEO' ? 15 : 7,
                    longest_streak: user?.role === 'CEO' ? 30 : 12,
                    total_study_time: user?.role === 'CEO' ? 500 : 120,
                    weekly_goal: 10,
                    weekly_progress: user?.role === 'CEO' ? 8 : 5
                },
                certificates: user?.role === 'CEO' ? [
                    {
                        id: 1,
                        courseName: 'Fundamentos de Desenvolvimento Web',
                        issueDate: '2024-01-15',
                        certificateUrl: '/certificates/web-fundamentals.pdf',
                        instructor: 'Prof. Alexandre Mendes'
                    },
                    {
                        id: 2,
                        courseName: 'React.js Avançado',
                        issueDate: '2024-01-10',
                        certificateUrl: '/certificates/react-advanced.pdf',
                        instructor: 'Prof. Maria Santos'
                    }
                ] : [
                    {
                        id: 1,
                        courseName: 'Fundamentos de Desenvolvimento Web',
                        issueDate: '2024-01-15',
                        certificateUrl: '/certificates/web-fundamentals.pdf',
                        instructor: 'Prof. Alexandre Mendes'
                    }
                ],
                enrolled_courses: user?.role === 'CEO' ? [
                    {
                        id: 1,
                        title: 'Fundamentos de Desenvolvimento Web',
                        progress: 100,
                        lastAccessed: '2024-01-15',
                        instructor: 'Prof. Alexandre Mendes',
                        image: '/courses/web-fundamentals.jpg'
                    },
                    {
                        id: 2,
                        title: 'React.js Avançado',
                        progress: 85,
                        lastAccessed: '2024-01-10',
                        instructor: 'Prof. Maria Santos',
                        image: '/courses/react-advanced.jpg'
                    },
                    {
                        id: 3,
                        title: 'Python para Data Science',
                        progress: 70,
                        lastAccessed: '2024-01-08',
                        instructor: 'Prof. Ana Costa',
                        image: '/courses/python-data.jpg'
                    }
                ] : [
                    {
                        id: 1,
                        title: 'Fundamentos de Desenvolvimento Web',
                        progress: 75,
                        lastAccessed: '2024-01-15',
                        instructor: 'Prof. Alexandre Mendes',
                        image: '/courses/web-fundamentals.jpg'
                    },
                    {
                        id: 2,
                        title: 'React.js Avançado',
                        progress: 45,
                        lastAccessed: '2024-01-10',
                        instructor: 'Prof. Maria Santos',
                        image: '/courses/react-advanced.jpg'
                    }
                ],
                achievements: user?.role === 'CEO' ? [
                    {
                        id: 1,
                        name: 'CEO Fundador',
                        description: 'Fundador da Fenix Academy',
                        icon: '👑',
                        earnedDate: '2024-01-01'
                    },
                    {
                        id: 2,
                        name: 'Mestre dos Cursos',
                        description: 'Completou 10 cursos',
                        icon: '🎓',
                        earnedDate: '2024-01-15'
                    }
                ] : [
                    {
                        id: 1,
                        name: 'Primeiro Curso',
                        description: 'Iniciou sua jornada',
                        icon: '🚀',
                        earnedDate: '2024-01-01'
                    }
                ],
                preferences: {
                    emailNotifications: true,
                    pushNotifications: true,
                    weeklyReports: true,
                    language: 'pt-BR',
                    timezone: 'America/Sao_Paulo'
                }
            };

            return mockProfile;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar perfil';
            console.error('Erro ao buscar perfil:', err);
            throw new Error(errorMessage);
        }
    }, [isAuthenticated, user]);

    // Função para atualizar perfil
    const updateProfile = useCallback(async (data: Partial<UserProfile>): Promise<{ success: boolean; message?: string; error?: string }> => {
        if (!isAuthenticated) {
            return { success: false, error: 'Usuário não autenticado' };
        }

        try {
            // Por enquanto, vamos simular uma atualização bem-sucedida
            // Em produção, isso seria uma chamada para a API
            if (profile) {
                const updatedProfile = { ...profile, ...data };
                setProfile(updatedProfile);
            }

            return { success: true, message: 'Perfil atualizado com sucesso' };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar perfil';
            console.error('Erro ao atualizar perfil:', err);
            return { success: false, error: errorMessage };
        }
    }, [isAuthenticated, profile]);

    // Função para atualizar o perfil
    const refreshProfile = useCallback(async (): Promise<void> => {
        if (!isAuthenticated) {
            setProfile(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const profileData = await fetchProfile();
            setProfile(profileData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar perfil';
            setError(errorMessage);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, fetchProfile]);

    // Carregar perfil quando o usuário mudar
    useEffect(() => {
        refreshProfile();
    }, [refreshProfile]);

    // Retornar dados mockados apenas se não houver usuário autenticado
    const getMockProfile = (): UserProfile | null => {
        if (isAuthenticated) {
            return null; // Não retornar dados mockados se estiver autenticado
        }

        // Dados mockados apenas para demonstração quando não há usuário
        return {
            id: 0,
            user_info: {
                name: "Usuário Demo",
                email: "demo@fenixacademy.com",
                phone: "(11) 99999-9999",
                location: "São Paulo, SP",
                bio: "Este é um perfil de demonstração. Faça login para ver seus dados reais.",
                avatar: "/avatars/default.jpg",
                joinDate: new Date().toISOString().split('T')[0] || new Date().toISOString(),
                completedCourses: 0,
                studyHours: 0,
                level: "Iniciante"
            },
            study_stats: {
                current_streak: 0,
                longest_streak: 0,
                total_study_time: 0,
                weekly_goal: 10,
                weekly_progress: 0
            },
            certificates: [],
            enrolled_courses: [],
            achievements: [],
            preferences: {
                emailNotifications: true,
                pushNotifications: true,
                weeklyReports: true,
                language: "pt-BR",
                timezone: "America/Sao_Paulo"
            }
        };
    };

    // Se não estiver autenticado e não houver perfil, mostrar dados mockados
    useEffect(() => {
        if (!isAuthenticated && !profile && !loading) {
            const mockProfile = getMockProfile();
            if (mockProfile) {
                setProfile(mockProfile);
            }
        }
    }, [isAuthenticated, profile, loading]);

    return {
        profile,
        loading,
        error,
        refreshProfile,
        updateProfile,
    };
}
