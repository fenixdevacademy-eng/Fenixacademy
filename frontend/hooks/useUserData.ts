'use client';

import { useState, useEffect } from 'react';

// Tipos para os dados do usuário
interface UserCourse {
    id: string;
    title: string;
    progress: number;
    nextLesson: string;
    instructor: string;
    duration: string;
    completed: number;
    total: number;
    lastAccessed: string;
    thumbnail: string;
}

interface UserAchievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    earned: boolean;
    date: string | null;
    earnedDate?: string;
    points?: number;
}

interface UserActivity {
    id: string;
    type: 'lesson' | 'quiz' | 'project' | 'certificate';
    title: string;
    time: string;
    progress: number;
}

interface UserStats {
    totalHours: number;
    completedLessons: number;
    certificates: number;
    streak: number;
    weeklyGoal: number;
    weeklyProgress: number;
}

// Hook para cursos do usuário
export function useUserCourses() {
    const [courses, setCourses] = useState<UserCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/users/courses');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setCourses(data.courses || []);
            } catch (err) {
                console.error('Erro ao carregar cursos:', err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

    return { courses, loading, error }
}

// Hook para conquistas do usuário
export function useUserAchievements() {
    const [achievements, setAchievements] = useState<UserAchievement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/users/achievements');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setAchievements(data.achievements || []);
            } catch (err) {
                console.error('Erro ao carregar conquistas:', err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        }

        fetchAchievements();
    }, []);

    return { achievements, loading, error }
}

// Hook para atividade do usuário
export function useUserActivity() {
    const [activity, setActivity] = useState<UserActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/users/activity');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setActivity(data.activity || []);
            } catch (err) {
                console.error('Erro ao carregar atividade:', err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        }

        fetchActivity();
    }, []);

    return { activity, loading, error }
}

// Hook para estatísticas do usuário
export function useUserStats() {
    const [stats, setStats] = useState<UserStats>({
        totalHours: 0,
        completedLessons: 0,
        certificates: 0,
        streak: 0,
        weeklyGoal: 10,
        weeklyProgress: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/users/stats');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setStats(data.stats || stats);
            } catch (err) {
                console.error('Erro ao carregar estatísticas:', err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return { stats, loading, error }
}

// Hook para perfil do usuário
interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
    twitter: string;
    skills: string[];
    interests: string[];
    experience: string;
    level: number;
    points: number;
    joinDate: string;
    lastActive: string;
    preferences: {
        theme: string;
        language: string;
        notifications: boolean;
        emailUpdates: boolean;
        publicProfile: boolean;
        showProgress: boolean;
    }
    stats: {
        totalCourses: number;
        completedCourses: number;
        coursesCompleted: number;
        totalHours: number;
        certificates: number;
        streak: number;
        totalPoints: number;
        rank: string;
    }
}

export function useUserProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/users/profile');

                if (!response.ok) {
                    throw new Error('Erro ao carregar perfil');
                }

                const data = await response.json();
                setProfile(data.profile);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar perfil');
                console.error('Erro ao carregar perfil:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const updateProfile = async (updatedData: Partial<UserProfile>) => {
        try {
            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify(updatedData)});

            if (!response.ok) {
                throw new Error('Erro ao atualizar perfil');
            }

            const data = await response.json();
            setProfile(data.profile);
            return { success: true, message: 'Perfil atualizado com sucesso' }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar perfil';
            setError(errorMessage);
            return { success: false, errorMessage }
        }
    }

    return { profile, loading, error, updateProfile }
}