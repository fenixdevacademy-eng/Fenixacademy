'use client';

import { useState, useEffect } from 'react';

interface DashboardData {
    courses: any[];
    progress: any[];
    stats: {
        totalCourses: number;
        completedCourses: number;
        totalHours: number;
    };
}

export function useDashboardData() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Mock data por enquanto
                const mockData: DashboardData = {
                    courses: [],
                    progress: [],
                    stats: {
                        totalCourses: 0,
                        completedCourses: 0,
                        totalHours: 0
                    }
                };

                setData(mockData);
            } catch (err) {
                setError('Erro ao carregar dados do dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}