import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/auth-context';

interface User {
    id: string;
    name: string;
    email: string;
    level: number;
    title: string;
    avatar: string;
    progress: number;
}

interface Stats {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalHours: number;
    thisWeekHours: number;
    streak: number;
    points: number;
    rank: number;
    certificates: number;
}

interface Course {
    id: number;
    title: string;
    progress: number;
    nextLesson: string;
    instructor: string;
    avatar: string;
    timeLeft: string;
    difficulty: string;
    color: string;
    totalLessons: number;
    completedLessons: number;
}

interface RecentActivity {
    id: number;
    type: string;
    title: string;
    time: string;
    icon: string;
    color: string;
}

interface UpcomingEvent {
    id: number;
    title: string;
    instructor: string;
    time: string;
    type: string;
    color: string;
}

interface DashboardData {
    user: User;
    stats: Stats;
    courses: Course[];
    recentActivity: RecentActivity[];
    upcomingEvents: UpcomingEvent[];
}

export function useDashboardData() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, isAuthenticated, checkAuth } = useAuth();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Verificar se o usuário está autenticado
                if (!isAuthenticated || !user) {
                    throw new Error('Usuário não autenticado. Faça login novamente.');
                }

                // Verificar se o token ainda é válido
                const isTokenValid = await checkAuth();
                if (!isTokenValid) {
                    throw new Error('Sessão expirada. Faça login novamente.');
                }

                // Obter token do localStorage
                const token = localStorage.getItem('fenix_token') || localStorage.getItem('token');

                if (!token) {
                    throw new Error('Token não encontrado. Faça login novamente.');
                }

                const response = await fetch('/api/dashboard/data', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Sessão expirada. Faça login novamente.');
                    }
                    throw new Error('Erro ao carregar dados do dashboard');
                }

                const result = await response.json();

                if (result.success) {
                    setData(result.data);
                } else {
                    throw new Error(result.error || 'Erro desconhecido');
                }
            } catch (err) {
                console.error('Erro ao buscar dados do dashboard:', err);
                const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
                setError(errorMessage);

                // Se for erro de autenticação, limpar dados locais
                if (errorMessage.includes('não autenticado') || errorMessage.includes('Sessão expirada') || errorMessage.includes('Token não encontrado')) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [isAuthenticated, user, checkAuth]);

    const refetch = () => {
        setLoading(true);
        setError(null);
        // Re-executar o useEffect
        window.location.reload();
    };

    return { data, loading, error, refetch };
}

